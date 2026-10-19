# Emerald wild-encounter background music durations

Generated from the local pokeemerald checkout with `bun scripts/emerald-audio-durations.ts <checkout>`.
Includes all 116 entries in map-based wild encounter tables, including unused/duplicate-layout maps. Static/gift encounters are outside this table.

Durations are video-frame equivalents per repeating loop; parentheses give the non-repeating intro in frames. These are music sequencer durations, not CPU cycles or encounter delays. Fractional values are intentional: the sequencer accumulates tempo each frame, so constant-tempo loops can take the floor or ceiling of this duration depending on phase. For songs with tempo changes, values are nominal frame equivalents obtained by summing the intervals; accumulator carry at tempo boundaries can introduce additional sub-frame rounding differences. An integer duration does not describe the distribution of audio processing costs within that loop. One GBA frame is 280896 CPU cycles (approximately 59.7275 frames/second).

## Shared overrides

- Both bikes, immediately after mounting: MUS_CYCLING: 2921.73913 (intro 104.347826). The bike column says whether the map permits cycling, not that cycling music is guaranteed: map transitions can replace it with destination music even while riding.
- Surfing: MUS_SURF: 4214.634146 (intro 65.853659). Applies to Surf encounters and fishing while surfing; fishing from shore retains the current land music.
- Underwater: MUS_UNDERWATER: 3683.72093 (intro 1506.976744); underwater map headers below already select it.
- Story weather override: MUS_ABNORMAL_WEATHER: 2133.333333 (intro 33.333333). With FLAG_SYS_WEATHER_CTRL set, affects LilycoveCity, MossdeepCity, SootopolisCity, EverGrandeCity and Routes 124-128; Routes 129-131 also require VAR_SOOTOPOLIS_CITY_STATE >= 4. This override prevents the normal surfing override and prevents switching to cycling music through Overworld_ChangeMusicTo.
- SootopolisCity is silent when VAR_SKY_PILLAR_STATE == 1. Saved music and scripted changes can override normal map music. The table describes default map music after story overrides have cleared.

## Per-map table

| Map | Encounter tables | Default music: loop frames (intro frames) | Cycling allowed |
| --- | --- | --- | --- |
| Route101 | Land | MUS_ROUTE101: 2021.052632 (intro 15.789474) | Yes |
| Route102 | Land, Surf, Fish | MUS_ROUTE101: 2021.052632 (intro 15.789474) | Yes |
| Route103 | Land, Surf, Fish | MUS_ROUTE101: 2021.052632 (intro 15.789474) | Yes |
| Route104 | Land, Surf, Fish | MUS_ROUTE104: 2260.266393 (intro 225) | Yes |
| Route105 | Surf, Fish | MUS_ROUTE104: 2260.266393 (intro 225) | Yes |
| Route110 | Land, Surf, Fish | MUS_ROUTE110: 2181.818182 (intro 13.636364) | Yes |
| Route111 | Land, Surf, Fish, Smash | MUS_ROUTE110: 2181.818182 (intro 13.636364); sandstorm: MUS_DESERT: 2400 (intro 120) | Yes |
| Route112 | Land | MUS_ROUTE110: 2181.818182 (intro 13.636364) | Yes |
| Route113 | Land | MUS_ROUTE113: 4050 (intro 14.0625) | Yes |
| Route114 | Land, Surf, Fish, Smash | MUS_ROUTE110: 2181.818182 (intro 13.636364) | Yes |
| Route116 | Land | MUS_ROUTE104: 2260.266393 (intro 225) | Yes |
| Route117 | Land, Surf, Fish | MUS_ROUTE110: 2181.818182 (intro 13.636364) | Yes |
| Route118 | Land, Surf, Fish | MUS_ROUTE110: 2181.818182 (intro 13.636364); east (x >= 24): MUS_ROUTE119: 3388.235294 (intro 1005.882353) | Yes |
| Route124 | Surf, Fish | MUS_ROUTE120: 3438.80597 (intro 0) | Yes |
| PetalburgWoods | Land | MUS_PETALBURG_WOODS: 2326.153846 (intro 207.692308) | Yes |
| RusturfTunnel | Land | MUS_PETALBURG_WOODS: 2326.153846 (intro 207.692308) | Yes |
| GraniteCave_1F | Land | MUS_PETALBURG_WOODS: 2326.153846 (intro 207.692308) | Yes |
| GraniteCave_B1F | Land | MUS_PETALBURG_WOODS: 2326.153846 (intro 207.692308) | Yes |
| MtPyre_1F | Land | MUS_MT_PYRE: 3200 (intro 0) | No |
| VictoryRoad_1F | Land | MUS_VICTORY_ROAD: 2686.567164 (intro 537.313433) | Yes |
| SafariZone_South | Land | MUS_SAFARI_ZONE: 1216.901408 (intro 12.676056) | Yes |
| Underwater_Route126 | Surf | MUS_UNDERWATER: 3683.72093 (intro 1506.976744) | Yes |
| AbandonedShip_Rooms_B1F | Surf, Fish | MUS_ABANDONED_SHIP: 2304 (intro 54) | Yes |
| GraniteCave_B2F | Land, Smash | MUS_PETALBURG_WOODS: 2326.153846 (intro 207.692308) | Yes |
| FieryPath | Land | MUS_PETALBURG_WOODS: 2326.153846 (intro 207.692308) | Yes |
| MeteorFalls_B1F_2R | Land, Surf, Fish | MUS_CAVE_OF_ORIGIN: 2592 (intro 36) | Yes |
| JaggedPass | Land | MUS_PETALBURG_WOODS: 2326.153846 (intro 207.692308) | Yes |
| Route106 | Surf, Fish | MUS_ROUTE104: 2260.266393 (intro 225) | Yes |
| Route107 | Surf, Fish | MUS_ROUTE104: 2260.266393 (intro 225) | Yes |
| Route108 | Surf, Fish | MUS_ROUTE104: 2260.266393 (intro 225) | Yes |
| Route109 | Surf, Fish | MUS_ROUTE104: 2260.266393 (intro 225) | Yes |
| Route115 | Land, Surf, Fish | MUS_ROUTE104: 2260.266393 (intro 225) | Yes |
| NewMauville_Inside | Land | MUS_MT_PYRE: 3200 (intro 0) | Yes |
| Route119 | Land, Surf, Fish | MUS_ROUTE119: 3388.235294 (intro 1005.882353) | Yes |
| Route120 | Land, Surf, Fish | MUS_ROUTE120: 3438.80597 (intro 0) | Yes |
| Route121 | Land, Surf, Fish | MUS_ROUTE120: 3438.80597 (intro 0) | Yes |
| Route122 | Surf, Fish | MUS_ROUTE122: 2787.096774 (intro 232.258065) | Yes |
| Route123 | Land, Surf, Fish | MUS_ROUTE122: 2787.096774 (intro 232.258065) | Yes |
| MtPyre_2F | Land | MUS_MT_PYRE: 3200 (intro 0) | No |
| MtPyre_3F | Land | MUS_MT_PYRE: 3200 (intro 0) | No |
| MtPyre_4F | Land | MUS_MT_PYRE: 3200 (intro 0) | No |
| MtPyre_5F | Land | MUS_MT_PYRE: 3200 (intro 0) | No |
| MtPyre_6F | Land | MUS_MT_PYRE: 3200 (intro 0) | No |
| MtPyre_Exterior | Land | MUS_MT_PYRE_EXTERIOR: 3670.588235 (intro 1270.588235) | Yes |
| MtPyre_Summit | Land | MUS_MT_PYRE_EXTERIOR: 3670.588235 (intro 1270.588235) | Yes |
| GraniteCave_StevensRoom | Land | MUS_PETALBURG_WOODS: 2326.153846 (intro 207.692308) | Yes |
| Route125 | Surf, Fish | MUS_ROUTE120: 3438.80597 (intro 0) | Yes |
| Route126 | Surf, Fish | MUS_ROUTE120: 3438.80597 (intro 0) | Yes |
| Route127 | Surf, Fish | MUS_ROUTE120: 3438.80597 (intro 0) | Yes |
| Route128 | Surf, Fish | MUS_ROUTE120: 3438.80597 (intro 0) | Yes |
| Route129 | Surf, Fish | MUS_ROUTE119: 3388.235294 (intro 1005.882353) | Yes |
| Route130 | Land, Surf, Fish | MUS_ROUTE119: 3388.235294 (intro 1005.882353) | Yes |
| Route131 | Surf, Fish | MUS_ROUTE119: 3388.235294 (intro 1005.882353) | Yes |
| Route132 | Surf, Fish | MUS_ROUTE119: 3388.235294 (intro 1005.882353) | Yes |
| Route133 | Surf, Fish | MUS_ROUTE119: 3388.235294 (intro 1005.882353) | Yes |
| Route134 | Surf, Fish | MUS_ROUTE119: 3388.235294 (intro 1005.882353) | Yes |
| AbandonedShip_HiddenFloorCorridors | Surf, Fish | MUS_ABANDONED_SHIP: 2304 (intro 54) | Yes |
| SeafloorCavern_Room1 | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| SeafloorCavern_Room2 | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| SeafloorCavern_Room3 | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| SeafloorCavern_Room4 | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| SeafloorCavern_Room5 | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| SeafloorCavern_Room6 | Land, Surf, Fish | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| SeafloorCavern_Room7 | Land, Surf, Fish | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| SeafloorCavern_Room8 | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| SeafloorCavern_Entrance | Surf, Fish | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| CaveOfOrigin_Entrance | Land | MUS_CAVE_OF_ORIGIN: 2592 (intro 36) | Yes |
| CaveOfOrigin_1F | Land | MUS_CAVE_OF_ORIGIN: 2592 (intro 36) | Yes |
| CaveOfOrigin_UnusedRubySapphireMap1 | Land | MUS_CAVE_OF_ORIGIN: 2592 (intro 36) | Yes |
| CaveOfOrigin_UnusedRubySapphireMap2 | Land | MUS_CAVE_OF_ORIGIN: 2592 (intro 36) | Yes |
| CaveOfOrigin_UnusedRubySapphireMap3 | Land | MUS_CAVE_OF_ORIGIN: 2592 (intro 36) | Yes |
| NewMauville_Entrance | Land | MUS_MT_PYRE: 3200 (intro 0) | Yes |
| SafariZone_Southwest | Land, Surf, Fish | MUS_SAFARI_ZONE: 1216.901408 (intro 12.676056) | Yes |
| SafariZone_North | Land, Smash | MUS_SAFARI_ZONE: 1216.901408 (intro 12.676056) | Yes |
| SafariZone_Northwest | Land, Surf, Fish | MUS_SAFARI_ZONE: 1216.901408 (intro 12.676056) | Yes |
| VictoryRoad_B1F | Land, Smash | MUS_VICTORY_ROAD: 2686.567164 (intro 537.313433) | Yes |
| VictoryRoad_B2F | Land, Surf, Fish | MUS_VICTORY_ROAD: 2686.567164 (intro 537.313433) | Yes |
| MeteorFalls_1F_1R | Land, Surf, Fish | MUS_CAVE_OF_ORIGIN: 2592 (intro 36) | Yes |
| MeteorFalls_1F_2R | Land, Surf, Fish | MUS_CAVE_OF_ORIGIN: 2592 (intro 36) | Yes |
| MeteorFalls_B1F_1R | Land, Surf, Fish | MUS_CAVE_OF_ORIGIN: 2592 (intro 36) | Yes |
| ShoalCave_LowTideStairsRoom | Land | MUS_MT_PYRE: 3200 (intro 0) | Yes |
| ShoalCave_LowTideLowerRoom | Land | MUS_MT_PYRE: 3200 (intro 0) | Yes |
| ShoalCave_LowTideInnerRoom | Land, Surf, Fish | MUS_MT_PYRE: 3200 (intro 0) | Yes |
| ShoalCave_LowTideEntranceRoom | Land, Surf, Fish | MUS_MT_PYRE: 3200 (intro 0) | Yes |
| LilycoveCity | Surf, Fish | MUS_LILYCOVE: 3354.689154 (intro 0) | Yes |
| DewfordTown | Surf, Fish | MUS_DEWFORD: 3982.978723 (intro 0) | Yes |
| SlateportCity | Surf, Fish | MUS_SLATEPORT: 4877.419355 (intro 58.064516) | Yes |
| MossdeepCity | Surf, Fish | MUS_RUSTBORO: 3600 (intro 98.4375) | Yes |
| PacifidlogTown | Surf, Fish | MUS_LILYCOVE: 3354.689154 (intro 0) | Yes |
| EverGrandeCity | Surf, Fish | MUS_EVER_GRANDE: 3600 (intro 478.125) | Yes |
| PetalburgCity | Surf, Fish | MUS_PETALBURG: 1828.571429 (intro 114.285714) | Yes |
| Underwater_Route124 | Surf | MUS_UNDERWATER: 3683.72093 (intro 1506.976744) | Yes |
| ShoalCave_LowTideIceRoom | Land | MUS_MT_PYRE: 3200 (intro 0) | Yes |
| SkyPillar_1F | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| SootopolisCity | Surf, Fish | MUS_SOOTOPOLIS: 3255.882353 (intro 13.235294) | Yes |
| SkyPillar_3F | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| SkyPillar_5F | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| SafariZone_Southeast | Land, Surf, Fish | MUS_SAFARI_ZONE: 1216.901408 (intro 12.676056) | Yes |
| SafariZone_Northeast | Land, Smash | MUS_SAFARI_ZONE: 1216.901408 (intro 12.676056) | Yes |
| MagmaHideout_1F | Land | MUS_AQUA_MAGMA_HIDEOUT: 2440.677966 (intro 0) | Yes |
| MagmaHideout_2F_1R | Land | MUS_AQUA_MAGMA_HIDEOUT: 2440.677966 (intro 0) | Yes |
| MagmaHideout_2F_2R | Land | MUS_AQUA_MAGMA_HIDEOUT: 2440.677966 (intro 0) | Yes |
| MagmaHideout_3F_1R | Land | MUS_AQUA_MAGMA_HIDEOUT: 2440.677966 (intro 0) | Yes |
| MagmaHideout_3F_2R | Land | MUS_AQUA_MAGMA_HIDEOUT: 2440.677966 (intro 0) | Yes |
| MagmaHideout_4F | Land | MUS_AQUA_MAGMA_HIDEOUT: 2440.677966 (intro 0) | Yes |
| MagmaHideout_3F_3R | Land | MUS_AQUA_MAGMA_HIDEOUT: 2440.677966 (intro 0) | Yes |
| MagmaHideout_2F_3R | Land | MUS_AQUA_MAGMA_HIDEOUT: 2440.677966 (intro 0) | Yes |
| MirageTower_1F | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| MirageTower_2F | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| MirageTower_3F | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| MirageTower_4F | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| DesertUnderpass | Land | MUS_MT_CHIMNEY: 5400 (intro 232.258065) | Yes |
| ArtisanCave_B1F | Land | MUS_PETALBURG_WOODS: 2326.153846 (intro 207.692308) | Yes |
| ArtisanCave_1F | Land | MUS_PETALBURG_WOODS: 2326.153846 (intro 207.692308) | Yes |
| AlteringCave | Land | MUS_RG_SEVII_CAVE: 5525.619515 (intro 0) | Yes |
| MeteorFalls_StevensCave | Land | MUS_CAVE_OF_ORIGIN: 2592 (intro 36) | Yes |

## Derivation and limits

- Map coverage: src/data/wild_encounters.json, groups with for_maps = true. Music and cycling permissions: data/maps/*/map.json.
- Music selection: src/overworld.c, GetCurrLocationDefaultMusic, Overworld_PlaySpecialMapMusic, TransitionMapMusic; src/bike.c, GetOnOffBike.
- Timing: sound/songs/midi/*.mid text markers '[' and ']' delimit the loop. tools/mid2agb/midi.cpp scales MIDI time to 24 clocks/beat (48 with -X); tools/mid2agb/agb.cpp rounds MIDI BPM and emits integer TEMPO. src/m4a_1.s ply_tempo doubles TEMPO; MPlayMain accumulates that value against 150 each audio update. Each constant-tempo interval therefore lasts sequence_ticks * 150 / effective_tempo video frames. Tempo changes are integrated separately. This uses the game's quantized tempo, not the MIDI's nominal microsecond timing.
- This is a source-derived duration table, not emulator measurement. Playback phase, active notes, mixing channels, stereo/mono, sound effects and cries can change CPU cost inside a video frame. These durations alone cannot supply min/mid/max cycle-at-start values for the generator; that requires profiling the relevant music phases and action sound effects.
