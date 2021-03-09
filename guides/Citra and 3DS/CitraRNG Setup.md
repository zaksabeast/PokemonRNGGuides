---
title: 'CitraRNG Setup'
description: 'Setup Citra for RNG'
slug: 'citrarng-setup'
subCategory: 'Emulator'
---

This guide is for setting up CitraRNG on a PC. An updated CFW (Custom Firmware) console is required to be able to dump system specific information and game data. The console also needs to have the latest game update installed to be dumped.

## Tools

- [Citra](https://citra-emu.org/download/)
- [CitraRNG](https://github.com/Admiral-Fish/CitraRNG)
  - Clone or download the entire repository
- [Python 3.9](https://www.python.org/downloads/)
  - In the install selection add python to your `PATH`
- [Latest Godmode9](https://github.com/d0k3/GodMode9/releases)
- [Dump_PKMN_Update.gm9 Script](https://cdn.discordapp.com/attachments/389206049401470976/435566091457134598/Dump_PKMN_Updates.gm9)
- A 3DS with CFW (Custom Firmware)
  - https://3ds.hacks.guide/ has instructions for installing CFW
- Latest game update installed on the 3DS

## Dumping system and game data

1. Place the `Dump_PKMN_Update.gm9` script in your 3DS sd card in sdmc:\gm9\scripts.
2. Boot your 3DS into GodMode9 by holding `Start` while powering on the 3DS.
3. Press the `Home button` then select `scripts...`.
   - Select `GM9Megascript`
   - Select `Dump Options`
   - Select `Dump Citra Files` to dump Citra files
4. Exit back to Godemode9 main menu and select `scripts...` once more.
   - Select `Dump_PKMN_Updates` script and follow the on screen directions
5. To dump a game installed on the 3DS do the following.
   - Hover over [A:] SYSNAND SD
   - Hold `R` and press `A` at the same time to open the drive options
   - Select `Open title manager...`
   - Press `A` on the game you want to dump
   - Select `Manage Title...`
   - Select `Build CIA (standard)`
6. To dump a game from a cart do the following.
   - Select `[C:] GAMECART`
   - Select the `trim.3ds` file
   - Select `NCSD image options...`
   - Select `Build CIA from file`
7. Exit godmode9 and transfer the files from sdmc:\gm9\out to your PC.

## Settings

### Setting up Citra

1. Open Citra, under the `File` option choose `Install cia...`.
   - Install both the game(s) and update(s) .cia
2. Place the nand folder from the `sdmc:gm9\out\Citra\user\nand` into your user directory for Citra.
   - For Windows, the path is `C:\Users\[your-user-name]\AppData\Roaming\Citra\nand`
     - The folder AppData is hidden by default, so you need to change the configuration to view it
   - For macOS and Linux, the path is `~/.local/share/citra-emu/nand`
     - The folder .local is hidden on most machines, so you need to change the configuration to view it

### Setting up CitraRNG

Python 3.9 needs to be installed for CitraRNG to work. Python also needs to be added to your `Path` or else the command will not be recognized. If it's not installed then it can be added by editing the installation.

1. Open a command prompt anywhere and type `pip install pyside2`.
   - This may need administration privileges
2. Copy all the .py files in the CitraRNG folder into `<your Citra directory>/scripting`.
3. Open Citra and your Gen 7 Pokémon game, and load your save file.
   - [This](https://citra-emu.org/wiki/dumping-save-data-from-a-3ds-console/) has instructions for dumping and loading your save file from the 3DS
4. Double-click the citrarng.py file to run the script.

```
Note: If this does not work then right click "citrarng.py" and select "Edit with IDLE". Make sure that you open with Python 3.9 if you have both Python2 and Python3 installed. Then hit "F5" to run the script.

Alternatively, you can run the script by opening a command prompt in the scripting folder and using the command "py citrarng.py".
```

5. In the CitraRNG window select your game and click connect.
   - CitraRNG will update with information from the game such as initial seed, frames, ivs etc.
   - The tool has an auto refresher to allow frames to be updated periodically, this may make the program crash if left on long enough

```
Note: The higher the delay for the refresh rate the less often the program will crash, 2000 is max. Pause and reconnect CitraRNG every once in a while, to keep it from crashing.
```

The [Citra wiki](https://citra-emu.org/wiki/home/) has more information on how to run Citra and how to troubleshoot issues.
