const n=`---
title: "Connect Dolphin to mGBA"
description: "Learn how to redeem Jirachi or transfer your RNGs to a GBA game."
slug: "connect-dolphin-to-gba"
category: "GBA Tools"
tag: "emu"
---

## Tools

- [Dolphin](https://dolphin-emu.org/download/)
- [Open Source GBA Bios](https://github.com/ez-me/gba-bios/releases/tag/1.0)
- Gamecube and GBA roms

## Step 1: Set up Dolphin

1. Open Dolphin and click on the "Config" button.
2. Click on the "GameCube" tab.
3. Set the GBA Bios to the one you downloaded.
4. Close the settings and click on the "Controllers" button.
5. Set Port 2 to "GBA (Integrated)" and close the settings.

## Step 2: Start your game

1. Load your game in Dolphin.
2. Right click on the mGBA window that appears, then click "Load ROM".
3. Choose your GBA ROM in the window that appears.
4. Right click on the mGBA window and click "Save Game" -> "Import Save Game".
5. If Dolphin doesn't think the GBA is connected, right click on mGBA and click "Reset".

That's it! You should now be able to transfer Pokémon between your GBA and GameCube games using Dolphin and mGBA.
`;export{n as default};
