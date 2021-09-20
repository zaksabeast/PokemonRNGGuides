---
title: 'How to Install PCalc'
description: 'Installing a tool on your 3DS to help RNG Pokemon'
slug: 'misc-3ds-installing-pcalc'
subCategory: '3DS'
---

## Tools

- A 3DS with CFW (Custom Firmware)
  - https://3ds.hacks.guide/ has instructions for installing CFW

## Update Luma

The latest official Luma version is not compatible with NTR. You will need to use a fork of Luma that is compatible with NTR to be able to use NTR, and NTR plugins such as PCalc, on the latest firmware version.

- [NTR compatiable Luma](https://github.com/Nanquitas/Luma3DS/releases)
  - Download the `boot.firm` and overwrite the current `boot.firm` on the root of the SD card.

## Step 1: Installing NTR

The first step is to install NTR, do this by installing [BootNTR Selector](https://github.com/Nanquitas/BootNTR/releases).

- **N3DS and N2DSXL:** Download and install BootNTR Selector.
  - Download either of the CIAs that are _not_ Mode 3. The difference is the banner shown when loading BootNTR Selector, so you can choose either one.
  - Then copy the CIA to the SD card and install using FBI.
- **O3DS and O2DS:** Download and install _BOTH_ BootNTR Selector and BootNTR Selector Mode 3.
  - Mode 3 is for Ultra Sun/Ultra Moon and Sun/Moon ONLY. ORAS, XY, and Transporter do not use Mode 3.
  - Download one of the Mode 3 CIA and one of the regular CIA. The difference is the banner shown when loading BootNTR Selector, so you can choose either one.
  - Then copy both of the CIAs to the SD card and install using FBI.

```
Note: To install a CIA using FBI, launch FBI on the console, then navigate to the CIA file on the SD card and press A on it to install.
```

Launch BootNTR Selector and choose default for settings.

- Version 3.6 (replaced 3.4 and 3.5) is the only version that will work for plugins, so choose that one every time you boot NTR.
- **For O3DS and O2DS only:** Afterwards launch BootNTR Selector Mode 3 and do the same steps as above.

## Step 2: Installing PCalc

After NTR is installed, the next step is to install the PCalc plugin.

- [Ultra Sun/Ultra Moon](https://pokemonrng.com/downloads/pcalc/pcalc-usum.zip)
- [Sun/Moon](https://pokemonrng.com/downloads/pcalc/pcalc-sm.zip)
- [OR/AS](https://pokemonrng.com/downloads/pcalc/pcalc-oras.zip)
- [X/Y](https://pokemonrng.com/downloads/pcalc/pcalc-xy.zip)
- [Transporter](https://pokemonrng.com/downloads/pcalc/pcalc-tport.zip)

1. Download .zip for the version you are wanting and unzip contents.
2. Move the plugin folder from the zip to the root of SD card. Merge and overwrite contents if prompted.
3. On the SD card there should now be a `Plugin` folder on the root of the SD card and two/four/six/eight folders (depends on which PCalcs you downloaded and installed) inside of it. Inside each of those folders should be a `cheat.plg`.

## Step 3: Launching PCalc

Launch BootNTR Selector and then the application of your choice.

- **O3DS and O2DS Only:** Launch BootNTR Selector Mode 3 instead for Ultra Sun/Ultra Moon and Sun/Moon ONLY.
- Afterwards, press the home button to view the home screen and then launch Ultra Sun/Ultra Moon or Sun/Moon.
  - Mode 3 should be closed ONLY when asked to launch game.

If screen flashes green, congrats you did it!

```
Note: PCalc Menu can be opened by pressing X+Up on D-pad.

NTR Menu can be opened by pressing X+Y. Useful for taking screenshots for proofs, all screenshots are saved to root of SD card as .bmp files.
```

## Troubleshooting

If you updated to 3DS version 11.15 and NTR isn’t working, make sure you have the latest BootNTR Selector and/or BootNTR Selector Mode 3, and are using the Luma version that is compatible with NTR.

- You can easily update by holding X while launching them.
- **O3DS and O2DS:** Update BOTH versions of BootNTR Selector.
- At the beginning of this guide is a section for updating Luma for NTR.

If using Ultra Sun/Ultra Moon or Sun/Moon and PCalc displays `Init Seed` as 0:

- Then you are missing the v1.2 update for Sun and Moon or the v1.2 update for Ultra Sun and Ultra Moon.
- This can be downloaded from the Eshop or extracted from another console using CFW.

If using XY/ORAS and PCalc is not working:

- Make sure you have latest update for the game.
- XY is 1.5, ORAS is 1.4. The game version can be found at the continue screen.
- The update can be downloaded from the Eshop or extracted from another console using CFW.

If the game is updated to the latest version and PCalc and/or NTR isn't loading:

- Delete all NTR related files on the SD card.
  - Delete any NTR.bin files on root of the SD card.
  - Delete these folders and their contents:
    - SD:/Nintendo 3DS/EBNTR/
    - SD:/3ds/ntr/
    - SD:/3ds/BootNTRSelector/
- Redownload the needed NTR files again by launching BootNTR Selector and BootNTRSelector Mode 3.

About Pokemon Gen 6/7 Game Updates:

- If you have a firmware region changed console or emunand, this can be obtained from other sources, such as dumping your update from another console, emunand, or sysnand.
- Pokemon game updates are not region locked.
- Cartridge and digital updates are stored on the SD card and are console/emunand specific, and will have to be installed on the console/emunand you are using the game with.
