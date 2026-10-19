// Usage: bun scripts/emerald-audio-durations.ts <pokeemerald checkout>
// Reads the checkout without modifying it. No MIDI dependencies required.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2];
if (!root) throw new Error("Supply the pokeemerald checkout path");
const read = (path: string) => readFileSync(join(root, path), "utf8");
const config = read("sound/songs/midi/midi.cfg");
const songNames = [...read("sound/song_table.inc").matchAll(/^\s*song\s+(\w+),/gm)].map(match => match[1]);
const songIds = new Map([...read("include/constants/songs.h").matchAll(/^#define\s+(MUS_\w+)\s+(\d+)\b/gm)].map(match => [match[1], Number(match[2])]));
type Event = { tick: number; type: number; data: Buffer };
const cache = new Map<string, string>();

function duration(song: string): string {
  if (cache.has(song)) return cache.get(song)!;
  const name = songNames[songIds.get(song)!];
  if (!name) throw new Error(`Missing song table entry: ${song}`);
  const bytes = readFileSync(join(root, "sound/songs/midi", `${name}.mid`));
  const division = bytes.readUInt16BE(12);
  if (division & 0x8000) throw new Error("Unsupported SMPTE timing");
  const events: Event[] = [];
  let pos = 8 + bytes.readUInt32BE(4);
  for (let track = 0; track < bytes.readUInt16BE(10); track++) {
    if (bytes.toString("ascii", pos, pos + 4) !== "MTrk") throw new Error("Missing track");
    const end = pos + 8 + bytes.readUInt32BE(pos + 4);
    pos += 8;
    let tick = 0;
    let running = 0;
    const vlq = () => {
      let value = 0;
      let byte: number;
      do { byte = bytes[pos++]; value = value * 128 + (byte & 127); } while (byte & 128);
      return value;
    };
    while (pos < end) {
      tick += vlq();
      let status = bytes[pos];
      if (status & 128) { pos++; if (status < 0xf0) running = status; }
      else status = running;
      if (status === 0xff) {
        const type = bytes[pos++];
        const length = vlq();
        events.push({ tick, type, data: bytes.subarray(pos, pos + length) });
        pos += length;
      } else if (status === 0xf0 || status === 0xf7) {
        const length = vlq(); pos += length;
      } else {
        if (status < 0x80 || status >= 0xf0) throw new Error("Invalid MIDI status");
        pos += [0xc0, 0xd0].includes(status & 0xf0) ? 1 : 2;
      }
    }
    if (pos !== end) throw new Error("Track size mismatch");
  }
  const clocks = config.split("\n").find(line => line.startsWith(`${name}.mid:`))?.includes("-X") ? 48 : 24;
  const ticks = (tick: number) => Math.floor(tick * clocks / division);
  const markers = events.filter(e => e.type >= 1 && e.type <= 7);
  const starts = [...new Set(markers.filter(e => e.data.toString() === "[").map(e => ticks(e.tick)))];
  const ends = [...new Set(markers.filter(e => e.data.toString() === "]").map(e => ticks(e.tick)))];
  if (starts.length !== 1 || ends.length !== 1) throw new Error(`${song}: ambiguous loop markers ${starts}/${ends}`);
  const tempos = new Map<number, number>();
  for (const event of events.filter(e => e.type === 0x51)) {
    // mid2agb rounds BPM then emits BPM * clocksPerBeat / 2; ply_tempo doubles it.
    const tempo = 2 * Math.floor(Math.round(60000000 / event.data.readUIntBE(0, 3)) * (clocks / 24) / 2);
    const tick = ticks(event.tick);
    if (tempos.has(tick) && tempos.get(tick) !== tempo) throw new Error("Conflicting tempos");
    tempos.set(tick, tempo);
  }
  const points = [...tempos].sort((a, b) => a[0] - b[0]);
  function frames(from: number, to: number): number {
    let current = 150;
    let cursor = from;
    let result = 0;
    for (const [tick, tempo] of points) {
      if (tick <= from) current = tempo;
      else if (tick < to) { result += (tick - cursor) * 150 / current; cursor = tick; current = tempo; }
    }
    return result + (to - cursor) * 150 / current;
  }
  // Loop tempo must be restored or equal to the tempo at its beginning.
  const tempoAt = (tick: number) => points.filter(p => p[0] <= tick).at(-1)?.[1] ?? 150;
  if (!tempos.has(starts[0]) && tempoAt(starts[0]) !== tempoAt(ends[0] - 1)) throw new Error("Loop tempo carries over");
  const fmt = (n: number) => Number(n.toFixed(6)).toString();
  const result = `${song}: ${fmt(frames(starts[0], ends[0]))} (intro ${fmt(frames(0, starts[0]))})`;
  cache.set(song, result);
  return result;
}

const maps = new Map<string, any>();
for (const directory of readdirSync(join(root, "data/maps"), { withFileTypes: true })) {
  if (!directory.isDirectory()) continue;
  const map = JSON.parse(read(`data/maps/${directory.name}/map.json`));
  maps.set(map.id, map);
}
const groups = JSON.parse(read("src/data/wild_encounters.json")).wild_encounter_groups;
const encounters = groups.filter((g: any) => g.for_maps).flatMap((g: any) => g.encounters);
const rows: string[] = [];
const seen = new Set<string>();
for (const encounter of encounters) {
  // Altering Cave has multiple species tables for the same map.
  if (seen.has(encounter.map)) {
    const first = encounters.find((entry: any) => entry.map === encounter.map);
    for (const key of ["land_mons", "water_mons", "fishing_mons", "rock_smash_mons"]) {
      if (Boolean(first[key]) !== Boolean(encounter[key])) throw new Error(`Different encounter methods: ${encounter.map}`);
    }
    continue;
  }
  seen.add(encounter.map);
  const map = maps.get(encounter.map);
  if (!map) throw new Error(`Missing ${encounter.map}`);
  const actions = [["land_mons", "Land"], ["water_mons", "Surf"], ["fishing_mons", "Fish"], ["rock_smash_mons", "Smash"]].filter(([key]) => encounter[key]).map(([, label]) => label).join(", ");
  let music = duration(map.music === "MUS_ROUTE118" ? "MUS_ROUTE110" : map.music);
  if (map.music === "MUS_ROUTE118") music += `; east (x >= 24): ${duration("MUS_ROUTE119")}`;
  if (map.id === "MAP_ROUTE111") music += `; sandstorm: ${duration("MUS_DESERT")}`;
  rows.push(`| ${map.name} | ${actions} | ${music} | ${map.allow_cycling ? "Yes" : "No"} |`);
}

const output = `# Emerald wild-encounter background music durations

Generated from the local pokeemerald checkout with \`bun scripts/emerald-audio-durations.ts <checkout>\`.
Includes all ${rows.length} entries in map-based wild encounter tables, including unused/duplicate-layout maps. Static/gift encounters are outside this table.

Durations are video-frame equivalents per repeating loop; parentheses give the non-repeating intro in frames. These are music sequencer durations, not CPU cycles or encounter delays. Fractional values are intentional: the sequencer accumulates tempo each frame, so constant-tempo loops can take the floor or ceiling of this duration depending on phase. For songs with tempo changes, values are nominal frame equivalents obtained by summing the intervals; accumulator carry at tempo boundaries can introduce additional sub-frame rounding differences. An integer duration does not describe the distribution of audio processing costs within that loop. One GBA frame is 280896 CPU cycles (approximately 59.7275 frames/second).

## Shared overrides

- Both bikes, immediately after mounting: ${duration("MUS_CYCLING")}. The bike column says whether the map permits cycling, not that cycling music is guaranteed: map transitions can replace it with destination music even while riding.
- Surfing: ${duration("MUS_SURF")}. Applies to Surf encounters and fishing while surfing; fishing from shore retains the current land music.
- Underwater: ${duration("MUS_UNDERWATER")}; underwater map headers below already select it.
- Story weather override: ${duration("MUS_ABNORMAL_WEATHER")}. With FLAG_SYS_WEATHER_CTRL set, affects LilycoveCity, MossdeepCity, SootopolisCity, EverGrandeCity and Routes 124-128; Routes 129-131 also require VAR_SOOTOPOLIS_CITY_STATE >= 4. This override prevents the normal surfing override and prevents switching to cycling music through Overworld_ChangeMusicTo.
- SootopolisCity is silent when VAR_SKY_PILLAR_STATE == 1. Saved music and scripted changes can override normal map music. The table describes default map music after story overrides have cleared.

## Per-map table

| Map | Encounter tables | Default music: loop frames (intro frames) | Cycling allowed |
| --- | --- | --- | --- |
${rows.join("\n")}

## Derivation and limits

- Map coverage: src/data/wild_encounters.json, groups with for_maps = true. Music and cycling permissions: data/maps/*/map.json.
- Music selection: src/overworld.c, GetCurrLocationDefaultMusic, Overworld_PlaySpecialMapMusic, TransitionMapMusic; src/bike.c, GetOnOffBike.
- Timing: sound/songs/midi/*.mid text markers '[' and ']' delimit the loop. tools/mid2agb/midi.cpp scales MIDI time to 24 clocks/beat (48 with -X); tools/mid2agb/agb.cpp rounds MIDI BPM and emits integer TEMPO. src/m4a_1.s ply_tempo doubles TEMPO; MPlayMain accumulates that value against 150 each audio update. Each constant-tempo interval therefore lasts sequence_ticks * 150 / effective_tempo video frames. Tempo changes are integrated separately. This uses the game's quantized tempo, not the MIDI's nominal microsecond timing.
- This is a source-derived duration table, not emulator measurement. Playback phase, active notes, mixing channels, stereo/mono, sound effects and cries can change CPU cost inside a video frame. These durations alone cannot supply min/mid/max cycle-at-start values for the generator; that requires profiling the relevant music phases and action sound effects.
`;
writeFileSync("emerald-wild-audio-durations.md", output);
console.log(`Validated ${rows.length} maps and ${cache.size} music sequences; wrote emerald-wild-audio-durations.md`);
