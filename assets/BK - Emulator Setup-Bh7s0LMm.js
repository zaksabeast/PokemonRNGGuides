const n=`---
title: "How to set up Ryujinx & CheatEngine"
navDrawerTitle: "Ryujinx Set Up"
description: "How to set up Ryujinx or Yuzu and Cheat Engine to RNG in Brilliant Diamond and Shining Pearl using lua scripts."
slug: "bdsp-emulator-setup"
category: "Brilliant Diamond and Shining Pearl"
tag: "emu"
---

## Tools

- [Ryujinx](https://ryujinx.app/download)
- [Cheat Engine](https://www.cheatengine.org/downloads.php)
- [BDSP_RNG.lua](https://github.com/Real96/BDSP-CheatEngine-Lua)
- Updated game to version 1.1.1 or higher

## Usage

1. Open Ryujinx, run the game, and pause it at the title screen.
2. Open Cheat Engine, click on \`Edit > Settings\`, select \`Scan Settings\`, and check the \`MEM_MAPPED\` option.
3. Click on \`File > Open Process\` and select the Yuzu or Ryujinx process.
   - Yuzu looks like \`xxxx-yuzu xxx | game name\`.
   - Ryujinx looks like \`xxxx-Ryujinx x.x.xxxx - game name\`.
4. Click on \`Table > Show Cheat Table Lua Script\`. A new window called \`Lua Script: Cheat Table\` will appear.
5. Open the \`BDSP_RNG.lua\` for your game version, copy all its content, and paste it in the window that just opened.
6. Click \`Execute Script\`. It will freeze for a bit, just wait until it prints all the RNG info in a new window.

## Notes

- To change the info view tab mode, press the keys shown in the script output.
- If you want to stop the script, press \`0\` or \`NumPad 0\`. It won't stop otherwise.
- If you want to restart the game, follow the previous steps and then restart the game and the script. It won't work otherwise.
- To avoid text flickering, make sure to enlarge the \`Lua Engine\` window enough.

## What next?

Try to RNG for a shiny starter or legendary! [BDSP Static RNG Guide](/cfw-bdsp-stationary)
`;export{n as default};
