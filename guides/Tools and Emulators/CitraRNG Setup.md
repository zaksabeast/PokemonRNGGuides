---
title: 'CitraRNG Setup'
description: 'Setup Citra for RNG'
slug: 'citrarng-setup'
subCategory: '3DS'
---

This guide is for setting up CitraRNG on a PC. An updated CFW (Custom Firmware) console is required to be able to dump system specific information and game data. The console also needs to have the latest game update installed to be dumped.

## Tools

- [Citra](https://citra-emu.org/download/)
- [CitraRNG](https://github.com/Admiral-Fish/CitraRNG)
  - Clone or download the entire repository
- [Python 3.9](https://www.python.org/downloads/)
  - When installing, make sure to add python to your `PATH` by checking the box within the installer
- [Latest Godmode9](https://github.com/d0k3/GodMode9/releases)
- [Dump_PKMN_Update.gm9 Script](https://cdn.discordapp.com/attachments/389206049401470976/435566091457134598/Dump_PKMN_Updates.gm9)
- A 3DS with CFW (Custom Firmware)
  - https://3ds.hacks.guide/ has instructions for installing CFW
- Latest game update installed on the 3DS

## 3DS Preparation

1. Place the `Dump_PKMN_Update.gm9` script on your 3DS SD card in sdmc:\gm9\scripts.
2. Update Godmode9 if needed by copying the `gm9` folder to your SD card.

## Dumping system data

1. Boot your 3DS into GodMode9 by holding `Start` while powering on the 3DS.
2. Press the `Home button`.
3. Select `scripts...`.
4. Select `GM9Megascript`.
5. Select `Dump Options`.
6. Select `Dump Citra Files` to dump Citra files.

## Dumping game data

1. Exit back to the GodMode9 main menu and select `scripts...` once more.
2. Select `Dump_PKMN_Updates` script and follow the on screen directions.

### To dump a game installed on the 3DS do the following.

1. Hover over [A:] SYSNAND SD.
2. Hold `R` and press `A` at the same time to open the drive options.
3. Select `Open title manager...`.
4. Press `A` on the game you want to dump.
5. Select `Manage Title...`.
6. Select `Build CIA (standard)`.

### To dump a game from a cart do the following.

1. Select `[C:] GAMECART`.
2. Select the `trim.3ds` file.
3. Select `NCSD image options...`.
4. Select `Build CIA from file`.
5. Exit GodMode9 and transfer the files from `sdmc:\gm9\out` to your PC.

## Setting up Citra

1. Open Citra, then under the `File` option choose `Install cia...`.
   - Install both the game(s) and update(s) .cia.
2. Place the nand folder from the `sdmc:gm9\out\Citra\user\nand` into your user directory for Citra.
   - For Windows, the path is `C:\Users\[your-user-name]\AppData\Roaming\Citra\nand`.
     - The folder AppData is hidden by default, so you need to change the configuration to view it.
   - For macOS and Linux, the path is `~/.local/share/citra-emu/nand`.
     - The folder .local is hidden on most machines, so you need to change the configuration to view it.

## Setting up for Gen 6 RNG

In order to RNG in Gen 6 on Citra, a game patch is needed to be able to read the initial seed. This does not modify the gamecode in anyway that would result in illegal Pokemon. All the patch does is write the initial seed of the game to an unused part of memory that the script has access to later.

1. You can follow [this guide](https://www.pokemonrng.com/misc-3ds-ips-luma-citra) for installing the game patch on Citra.

- The patch needed is included in the CitraRNG download, within the `oras` and `xy` folders.

## Setting up CitraRNG

Python 3.9 needs to be installed for CitraRNG to work. Python also needs to be added to your `PATH` or else the command will not be recognized. To add Python to your `PATH` make sure to check the box in the installer.

1. Open a command prompt anywhere and type `pip install pyside6`.
   - This may need administration privileges.
2. Copy all the .py files in the CitraRNG folder into `<your Citra directory>/scripting`.
3. Open Citra and your Gen 7 Pokémon game, then load your save file.
   - [This](https://citra-emu.org/wiki/dumping-save-data-from-a-3ds-console/) has instructions for dumping and loading your save file from the 3DS.
4. Double-click the citrarng.py file to run the script.

```
Note: If this does not work then right click "citrarng.py" and select "Edit with IDLE". Make sure that you open with Python 3.9 if you have both Python2 and Python3 installed. Then hit "F5" to run the script.

Alternatively, you can run the script by opening a command prompt in the scripting folder and using the command "py citrarng.py".
```

5. In the CitraRNG window select your game and click connect.
   - CitraRNG will update with information from the game such as initial seed, frames, ivs etc.
   - The tool has an auto refresher to allow frames to be updated periodically, this may make the program crash if left on long enough.

```
Note: The higher the delay for the refresh rate the less often the program will crash, 2000 is the max. Pause and reconnect CitraRNG every once in a while, to keep it from crashing.
```

The [Citra wiki](https://citra-emu.org/wiki/home/) has more information on how to run Citra and how to troubleshoot issues.
