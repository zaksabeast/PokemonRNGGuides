---
title: 'How to Install PokeReader'
description: 'Installing a tool on your 3DS to help RNG Pokemon'
slug: 'install-pokereader'
subCategory: '3DS'
---

PokeReader is a Plug n' Play plugin, and is a replacement for PokeCalc. Unlike when using NTR, it is possible to soft reset the game without crashing the console. In addition, more features have been added for RNG purposes.

## Tools

- A 3DS with CFW (Custom Firmware)
  - https://3ds.hacks.guide/ has instructions for installing CFW

## Update Luma Settings

1. Boot the console while holding `Select`.
2. Select the "Enable loading external FIRMs and modules" option.

If you do not have this option, update Luma to version 12.0.0 or higher.

## Install Plug n' Play

1. Download the [latest release of Plug n' Play](https://github.com/zaksabeast/3ds-Plug-n-play/releases/latest).
2. Copy the cxi files to `sd:/luma/sysmodules/`. If a folder named `sysmodules` does not already exist, then create it.

   - N3DS should only copy `0004013000CB9702.cxi`.
   - O3DS/2DS should copy both cxi files.

3. Install the `pnp_launcher.cia` found inside the `pnp.zip`.

```
Note: To install a CIA, launch FBI on the 3ds and click 'A' on the file.
```

## Install PokeReader

1. Download the [latest release of PokeReader](https://github.com/zaksabeast/PokeReader/releases/latest).
2. Copy `pokereader.wasm` to `/pnp/pokereader.wasm` on your SD card.
   - Create the directory if it does not already exist.

## Launching PokeReader

1. Launch the Plug n' Play app from the home menu.
2. Open a compatible Pokemon game.

This must be done every time the console is turned off and back on to reload Plug n' Play.

```
Note: Plug n' Play support for Gen 7 games on O3DS/2DS is still in development.
```
