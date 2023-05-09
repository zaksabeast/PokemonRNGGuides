---
title: 'Transporter Patches'
description: 'Various patches for use with Transporter'
slug: 'transporter-patches'
subCategory: '3DS'
---

## Tools

- A 3DS with CFW (Custom Firmware)
  - [Instructions for installing CFW](https://3ds.hacks.guide/).

## Update Luma Settings

1. Boot the console while holding `Select`.
2. Select "Enable game patches".

## Offline Patch + PKSM Patch

This patch enables the use of Transporter offline and ensures a stable delay when RNGing Pokémon transferred from VC games. PKSM is required as a destination for the transferred Pokémon.

1. Download the [code.ips file](https://github.com/zaksabeast/Transporter-Offline-Patch/releases) and copy it to the SD card at `/luma/titles/00040000000C9C00/code.ips`.

2. Open PKSM, enable "Edit during transfers", and create a new bank named `transport`.

- For more information, refer to the [PKSM wiki](https://github.com/FlagBrew/PKSM/wiki/Storage).

3. Transfer Pokemon using Transporter.

### Troubleshooting

Q: Why does Transporter display the message, "At least one Pokemon remains in the Transport Box from your previous session"?

A: This issue can be caused by the following:

- You don't have a PKSM bank named `transport`
- You have Pokemon in Box 1 of your PKSM `transport` bank
- Your PKSM `transport` bank is invalid

## Cart Redirect Patch

This patch redirects Transporter and Dream Radar to use a .sav file on the SD card instead of a game cartridge. It allows the use of saves from an emulator without the need to inject them into a cartridge.

1. Download and unzip the [zip file](https://github.com/zaksabeast/DreamRadarCartRedirect/releases).

- The zip contains `radar` and `transporter` folders with patches for the supported games.

2. Copy the IPS patch of your choice to the SD card.

- For Pokemon Transporter: `/luma/titles/00040000000C9C00/code.ips`.
- For Japanese Pokemon Dream Radar: `/luma/titles/0004000000073200/code.ips`.
- For All Regions Pokemon Dream Radar: `/luma/titles/00040000000AE100/code.ips`.

3. Ensure you have a save file at `/roms/nds/saves/white2.sav`, `/roms/nds/saves/black2.sav`, `/roms/nds/saves/black.sav`, or `/roms/nds/saves/white.sav`.

- If you're using [TWiLightMenu](https://github.com/DS-Homebrew/TWiLightMenu), this means having a game file at `/roms/nds/white2.nds`, `/roms/nds/black2.nds`, `/roms/nds/black.nds`, or `/roms/nds/white.nds`.

```
Note: Black and White are only supported by Transporter.
```
