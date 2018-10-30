# Installing and Using PCalc


## Installing NTR

The first step is to install NTR, do this by installing [BootNTR Selector](https://github.com/Nanquitas/BootNTR/releases).
  - **N3DS and N2DSXL:** Download and install BootNTR Selector.
    - Download either of the CIAs that are _not_ Mode 3. (Difference is Banner when loading BootNTR Selector, so you can choose either one.) Then copy CIA to SD card and install using FBI.

  - **O3DS and O2DS:** Download and install _BOTH_ BootNTR Selector and BootNTR Selector Mode 3. (Mode 3 is for Ultra Sun/Ultra Moon and Sun/Moon ONLY. ORAS, XY, and Transporter do not use mode 3.)
    - Download one of the Mode 3 CIA and one of the regular CIA. (Difference is Banner when loading BootNTR Selector, so you can choose either one.) Then copy both of the CIAs to SD card and install using FBI.

```
Note: To install a CIA using FBI, launch FBI on the console, then navigate to the CIA file on the SD card and press A on it to install.
```

Launch BootNTR Selector and choose default for settings.
  - Version 3.6 (replaced 3.4 and 3.5) is the only version that will work for plugins, so choose that one every time you boot NTR.
  - **For O3DS and O2DS only:** Afterwards launch BootNTR Selector Mode 3 and do same steps as above.

## Installing PCalc

After NTR is installed, the next step is to install the PCalc plugin.

- [Ultra Sun/Ultra Moon](https://pokemonrng.com/downloads/pcalc/pcalc-usum.zip)
- [Sun/Moon](https://pokemonrng.com/downloads/pcalc/pcalc-sm.zip)
- [OR/AS](https://pokemonrng.com/downloads/pcalc/pcalc-oras.zip)
- [X/Y](https://pokemonrng.com/downloads/pcalc/pcalc-xy.zip)
- [Transporter](https://pokemonrng.com/downloads/pcalc/pcalc-tport.zip)


1. Download .zip for the version you are wanting and unzip contents.

2. Move plugin folder from zip to root of SD card. Merge and overwrite contents if prompted.

3. On SD card should now have `Plugin` folder on the root of the SD card and two/four/six/eight folders (depends on which PCalcs you downloaded and installed) inside of it. Inside each of those folders should be a `cheat.plg`.

## Launching PCalc

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

If you updated to 11.6 and NTR isn’t working, make sure you have the latest BootNTR Selector and/or BootNTR Selector Mode 3.
  - You can easily update by holding X while launching them.
  - **O3DS and O2DS:** Update BOTH versions of BootNTR Selector.

If using Ultra Sun/Ultra Moon or Sun/Moon and PCalc displays `Init Seed` as 0:
  - Then you are missing the v1.2 update for Sun and Moon or the v1.2 update for Ultra Sun and Ultra Moon.
  - This can be downloaded from the Eshop or extracted from another console.

If using XY/ORAS and PCalc is not working:
  - Make sure you have latest update for the game.
  - XY is 1.5, ORAS is 1.4. Game version can be found at continue screen.
  - Update can be downloaded from the Eshop or extracted from another console using CFW.

If game is updated to latest version and PCalc and/or NTR isn't loading:
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
