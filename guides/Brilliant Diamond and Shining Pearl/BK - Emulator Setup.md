---
title: 'Set up Yuzu/Ryujinx + CheatEngine'
description: 'How to set up Yuzu/Ryujinx and Cheat Engine in order to RNG in BDSP using lua scripts'
slug: 'bdsp-emulator-setup'
subCategory: 'Basic Knowledge'
isRoughDraft: true
---

## Requirements

- Installed [Cheat Engine](https://www.cheatengine.org/downloads.php)
- Installed [Yuzu](https://yuzu-emu.org/downloads/)/[Ryujinx](https://ryujinx.org/download)
- Updated game to any version after 1.1.0

## Usage

- Open Yuzu/Ryujinx, run the game and pause it at the title screen
- Open Cheat Engine, click on `Edit > Settings`, select `Scan Settings` and check `MEM_MAPPED` option
- Click on `File > Open Process` and select Yuzu/Ryujinx process (Yuzu will look like `xxxx-yuzu xxx | game name`, Ryujinx will look like `xxxx-Ryujinx x.x.xxxx - game name`)
- Click on `Table > Show Cheat Table Lua Script`. A new window called `Lua Script: Cheat Table` will appear
- Open [BDSP_RNG.lua](https://github.com/Real96/BDSP-CheatEngine-Lua) with a text editor, copy all its content and paste it in the window opened before.
- Click `Execute Script`. It will freeze for a bit, just wait until it will print all the rng info in a new window
- If you want to stop the script press 0 or NumPad 0. It won't stop otherwhise
