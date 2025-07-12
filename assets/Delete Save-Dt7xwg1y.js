const e=`---
title: "How to delete Pokemon save files"
navDrawerTitle: "Delete Save Files"
description: "How to delete a Pokemon save file to start a new game."
slug: "delete-pokemon-save"
category:
  - "GBA Tools"
  - "NDS Tools"
  - "3DS Tools"
  - "Switch Tools"
tag: "any"
---

This page has directions for how to delete Pokemon save files for every cartridge/console to start a new save, including how to redeem multiple Manaphy Eggs from Pokemon Ranger.

## Delete a save file from a GB/GBC cartridge

Start a new game and save. This will overwrite the older save file.

## Delete a save file from a GBA cartridge

Start a new game and save. This will overwrite the older save file.

You can also hold \`Up + Select + B\` on the title screen.

Alternatively, you can use homebrew on a Custom Firmware Wii to erase the save file.

- [Guide for how to install Custom Firmware on a Wii](https://wii.hacks.guide/).
- [GBA Link Cable Dumper](https://github.com/FIX94/gba-link-cable-dumper).

## Delete a save file from a DS cartridge

Hold \`Up + Select + B\` on the title screen.

### Pokemon Ranger

For Pokemon Ranger, deleting the save file will not make it possible to claim another Manaphy Egg.

However, with a [Custom Firmware 3DS](https://3ds.hacks.guide/) it is possible to reset the cartridge entirely.

1. With Pokemon Ranger inserted, go to [FBI](https://github.com/Steveice10/FBI/releases) -> titles -> game.
2. Go to erase save data and press \`A\`.
3. If you use [Checkpoint](https://github.com/BernardoGiordano/Checkpoint/releases) to back up the save right before transferring the Manaphy Egg you can easily get the Manaphy Egg repeatedly.

## Delete a save file from a 3DS cartridge

Hold \`Up + B + X\` on the title screen.

## Delete a save file from an Nintendo Switch

1. Go to the HOME Menu and select "System Settings".
2. Scroll down and select "Data Management".
3. Choose "Delete Save Data".
4. Select the game title you want to delete the save data for.
5. Confirm the deletion when prompted.
`;export{e as default};
