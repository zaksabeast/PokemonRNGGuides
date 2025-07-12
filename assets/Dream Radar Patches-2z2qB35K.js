const a=`---
title: "Dream Radar No-Cart Patch"
description: "Learn how to patch Pokémon Dream Radar on the 3DS to load saves from TWiLightMenu, nds-bootstrap, or emulators — no game cart needed."
slug: "dream-radar-patches"
category:
  - "3DS Tools"
  - "Transporter and Dream Radar"
tag: "cfw"
---

## Cart Redirect Patch

This patch tricks Dream Radar into thinking a cartridge is inserted by loading a .sav file from the SD card instead.

It allows you to use your save from [TWiLightMenu](https://github.com/DS-Homebrew/TWiLightMenu) or [nds-bootstrap](https://github.com/ahezard/nds-bootstrap). It also lets you use saves from an emulator without needing to inject them.

## Tools

- A 3DS with CFW (Custom Firmware)
- [Instructions for installing CFW](https://3ds.hacks.guide/)

## Update Luma Settings

1. Boot the console while holding \`Select\`.
2. Select "Enable game patches".

## Install the Patch

1. Download and unzip the [zip file](https://github.com/zaksabeast/DreamRadarCartRedirect/releases).
2. Copy the IPS patch of your choice to the SD card.

   - Japanese: \`/luma/titles/0004000000073200\`.
   - All Other Regions: \`/luma/titles/00040000000AE100\`.

3. Rename the file to \`code.ips\`.

- For example, if you're playing Dream Radar, you should now have a file at \`/luma/titles/00040000000AE100/code.ips\`.

## Prepare your save file

1. Make sure you have a save file at \`/roms/nds/saves/white2.sav\`, \`/roms/nds/saves/black2.sav\`, \`/roms/nds/saves/black.sav\`, or \`/roms/nds/saves/white.sav\`.

2. If using TWiLightMenu, have a game file at \`/roms/nds/white2.nds\`, \`/roms/nds/black2.nds\`, \`/roms/nds/black.nds\`, or \`/roms/nds/white.nds\`.

If working, Dream Radar should detect the save as if a cart was inserted and allow transfers.

## Troubleshooting

### Error: Cart not inserted

1. Make sure your save file is named correctly and in the right location.
2. Make sure game patching is enabled in Luma.
`;export{a as default};
