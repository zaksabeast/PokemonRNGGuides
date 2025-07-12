const e=`---
title: "Desmume Setup"
description: "Learn how to set up DeSmuME for RNG, including cart dumping, save extraction, and using lua scripts."
slug: "desmume-setup"
category: "NDS Tools"
tag: "emu"
---

This guide helps you set up Desmume on a Windows PC. Mac and Linux users can try using Wine to run Desmume.exe, but this may not work. An updated CFW (Custom Firmware) 3DS console is needed to dump DS game data. Other methods for dumping DS games exist, but this guide won't cover them.

## Tools

- [Desmume v0.9.11](https://sourceforge.net/projects/desmume/files/desmume/0.9.11/desmume-0.9.11-win32-dev.zip/download)
- [Lua dll](https://sourceforge.net/projects/luabinaries/files/5.1.5/Windows%20Libraries/Dynamic/lua-5.1.5_Win32_dll17_lib.zip/download)
- Lua Scripts - [Gen 4](https://github.com/Real96/PokeLua/tree/main/Gen%204) [Gen 5](https://github.com/Real96/PokeLua/tree/main/Gen%205)
- [A 3DS with CFW (Custom Firmware)](https://3ds.hacks.guide/)
- [Latest Godmode9](https://github.com/d0k3/GodMode9/releases)
- [Checkpoint for the 3DS](https://github.com/FlagBrew/Checkpoint/releases)

## Dumping Game Data

1. Load Godmode9 by holding \`Start\` while turning on the console.
2. Select \`[C:] GAMECART\`.
3. Choose the \`.nds\` file.
4. Select \`Copy to 0:/gm9/out\`.
5. Exit GodMode9 and transfer the \`.nds\` file from \`sdmc:\\gm9\\out\` to your PC.

## Extracting Save

1. Load Checkpoint on your 3DS.
2. Dump the save from the DS cart.
3. The save is saved in \`sdmc:\\3ds\\Checkpoint\\saves\`.

## Setting Up Desmume

1. Download both Desmume and the lua dll.
2. Rename \`lua5.1.dll\` to \`lua51.dll\`.
3. Place the dll in the same folder as the Desmume executable.
4. Download the lua script for your game version.
5. Open Desmume and go to \`File\`, select \`Open ROM\`.
6. Open the \`.nds\` file extracted from the DS cart.
7. Go to \`Tools\`, select \`Lua Scripting\`, then \`New Lua Script Window...\`.
8. Choose the Lua Script you downloaded earlier.

Desmume should now be running with your game and displaying RNG information.

## Importing a Save

1. Go to \`File\` and select \`Import Backup Memory...\`.
2. Load the \`.sav\` file extracted from the DS cart.

## Exporting a Save

1. Go to \`File\` and select \`Export Backup Memory...\`.
2. Name your \`.sav\` file and choose where to save it.

Everytime you restart the game, press the \`Restart\` button in the lua window.

Every time you need to save or load a state, pause the game and hold \`Shift + F(n)\` / \`F(n)\` until you see the message \`Saved State (n)\` / \`Loaded State (n)\` appearing on the lower screen for less than a second.

For example, \`Shift + F1\` to save a state in slot 1 or \`F1\` to load the state in slot 1.

## Troubleshooting

### lua 51.dll was not found.

![Lua Error](/images/Tools-and-Emulators/Desmume/Lua.png)

If you see an error like the one above, the lua dll may be missing. Redownload the dll and ensure it is in the same folder as the Desmume executable. Verify that the dll was renamed correctly.
`;export{e as default};
