const a=`---
- title: "HeartGold and SoulSilver Cute Charm Glitch Mechanics"
  navDrawerTitle: "Cute Charm Mechanics"
  description: "Learn about how the Cute Charm glitch works in HeartGold and SoulSilver."
  slug: "emulator-hgss-cute-charm"
  category: "HeartGold and SoulSilver"
  tag: "info"
  hideFromNavDrawer: true
  canonical: "hgss-cute-charm"
- title: "HeartGold and SoulSilver Cute Charm Glitch Mechanics"
  navDrawerTitle: "Cute Charm Mechanics"
  description: "Learn about how the Cute Charm glitch works in HeartGold and SoulSilver."
  slug: "hgss-cute-charm"
  category: "HeartGold and SoulSilver"
  tag: "info"
- title: "Diamond, Pearl, and Platinum Cute Charm Glitch Mechanics"
  navDrawerTitle: "Cute Charm Mechanics"
  description: "Learn about how the Cute Charm glitch works in Diamond, Pearl, and Platinum."
  slug: "emulator-dppt-cute-charm"
  category: "Diamond, Pearl, and Platinum"
  tag: "info"
  hideFromNavDrawer: true
  canonical: "dppt-cute-charm"
- title: "Diamond, Pearl, and Platinum Cute Charm Glitch Mechanics"
  navDrawerTitle: "Cute Charm Mechanics"
  description: "Learn about how the Cute Charm glitch works in Diamond, Pearl, and Platinum."
  slug: "dppt-cute-charm"
  category: "Diamond, Pearl, and Platinum"
  tag: "info"
---

## Intro

Cute Charm increases your chances of encountering shiny Pokémon if you have RNG'd a specific TID/SID combination. [Read our Cute Charm RNG guide here!](/dppt-tid-sid)

This page explains why Cute Charm works with specific TID/SID combinations.

## PID and Groups

Cute Charm works by forcing certain PIDs based on the **target** Pokémon's gender, gender ratio, and desired nature. It doesn't affect Method 1 Pokémon, genderless species, or Pokémon with a 100% male or female gender ratio.

If a TID/SID combination is RNG'd so that one of the Cute Charm PIDs is shiny, then all other PIDs in the same group will also produce shiny Pokémon.

For people who want shiny females, nature is usually the priority. For shiny males, the specific gender ratio (like Bulbasaur's 82.5/17.5) matters more, and should be matched with the right nature. Each scenario has its own PID tables.

<details>
  <summary><b>Male Lead (Target: Shiny Female, Gender Ratio ignored)</b></summary>

| PID Group 1      | PID Group 2      | PID Group 3      | PID Group 4     |
| ---------------- | ---------------- | ---------------- | --------------- |
| 00000000 Hardy   | 00000008 Impish  | 00000010 Mild    | 00000018 Quirky |
| 00000001 Lonely  | 00000009 Lax     | 00000011 Quiet   |                 |
| 00000002 Brave   | 0000000A Timid   | 00000012 Bashful |                 |
| 00000003 Adamant | 0000000B Hasty   | 00000013 Rash    |                 |
| 00000004 Naughty | 0000000C Serious | 00000014 Calm    |                 |
| 00000005 Bold    | 0000000D Jolly   | 00000015 Gentle  |                 |
| 00000006 Docile  | 0000000E Naive   | 00000016 Sassy   |                 |
| 00000007 Relaxed | 0000000F Modest  | 00000017 Careful |                 |

</details>

<details>
<summary><b>Female Lead (Target: Shiny Male, 87.5%)</b></summary>

| PID Group 1      | PID Group 2      | PID Group 3      | PID Group 4      |
| ---------------- | ---------------- | ---------------- | ---------------- |
| 00000032 Hardy   | 00000038 Docile  | 00000040 Naive   | 00000048 Sassy   |
| 00000033 Lonely  | 00000039 Relaxed | 00000041 Modest  | 00000049 Careful |
| 00000034 Brave   | 0000003A Impish  | 00000042 Mild    | 0000004A Quirky  |
| 00000035 Adamant | 0000003B Lax     | 00000043 Quiet   |                  |
| 00000036 Naughty | 0000003C Timid   | 00000044 Bashful |                  |
| 00000037 Bold    | 0000003D Hasty   | 00000045 Rash    |                  |
|                  | 0000003E Serious | 00000046 Calm    |                  |
|                  | 0000003F Jolly   | 00000047 Gentle  |                  |

</details>

<details>
<summary><b>Female Lead (Target: Shiny Male, 75%)</b></summary>

| PID Group 1      | PID Group 2      | PID Group 3      | PID Group 4      |
| ---------------- | ---------------- | ---------------- | ---------------- |
| 0000004B Hardy   | 00000050 Bold    | 00000058 Jolly   | 00000060 Gentle  |
| 0000004C Lonely  | 00000051 Docile  | 00000059 Naive   | 00000061 Sassy   |
| 0000004D Brave   | 00000052 Relaxed | 0000005A Modest  | 00000062 Careful |
| 0000004E Adamant | 00000053 Impish  | 0000005B Mild    | 00000063 Quirky  |
| 0000004F Naughty | 00000054 Lax     | 0000005C Quiet   |                  |
|                  | 00000055 Timid   | 0000005D Bashful |                  |
|                  | 00000056 Hasty   | 0000005E Rash    |                  |
|                  | 00000057 Serious | 0000005F Calm    |                  |

</details>

<details>
<summary><b>Female Lead (Target: Shiny Male, 50%)</b></summary>

| PID Group 1     | PID Group 2      | PID Group 3      | PID Group 4      |
| --------------- | ---------------- | ---------------- | ---------------- |
| 00000096 Hardy  | 00000098 Brave   | 000000A0 Timid   | 000000A8 Bashful |
| 00000097 Lonely | 00000099 Adamant | 000000A1 Hasty   | 000000A9 Rash    |
|                 | 0000009A Naughty | 000000A2 Serious | 000000AA Calm    |
|                 | 0000009B Bold    | 000000A3 Jolly   | 000000AB Gentle  |
|                 | 0000009C Docile  | 000000A4 Naive   | 000000AC Sassy   |
|                 | 0000009D Relaxed | 000000A5 Modest  | 000000AD Careful |
|                 | 0000009E Impish  | 000000A6 Mild    | 000000AE Quirky  |
|                 | 0000009F Lax     | 000000A7 Quiet   |                  |

</details>

<details>
<summary><b>Female Lead (Target: Shiny Male, 25%)</b></summary>

| PID Group 1      | PID Group 2      | PID Group 3      | PID Group 4     |
| ---------------- | ---------------- | ---------------- | --------------- |
| 000000C8 Hardy   | 000000D0 Impish  | 000000D8 Mild    | 000000E0 Quirky |
| 000000C9 Lonely  | 000000D1 Lax     | 000000D9 Quiet   |                 |
| 000000CA Brave   | 000000D2 Timid   | 000000DA Bashful |                 |
| 000000CB Adamant | 000000D3 Hasty   | 000000DB Rash    |                 |
| 000000CC Naughty | 000000D4 Serious | 000000DC Calm    |                 |
| 000000CD Bold    | 000000D5 Jolly   | 000000DD Gentle  |                 |
| 000000CE Docile  | 000000D6 Naive   | 000000DE Sassy   |                 |
| 000000CF Relaxed | 000000D7 Modest  | 000000DF Careful |                 |

</details>

## Credits

- Chinese translation: xuanyelin, Hakuhiro.
`;export{a as default};
