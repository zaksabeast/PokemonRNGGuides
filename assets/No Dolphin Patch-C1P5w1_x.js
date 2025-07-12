const e=`---
title: "No Dolphin Patch"
description: "Use this patch to RNG the Wishmaker Jirachi without needing the Dolphin emulator."
slug: "no-dolphin-patch"
category: "GBA Tools"
tag: "emu"
addedOn: "2025-04-03"
---

## Tools

- A GBA emulator, such as [mGBA](https://mgba.io/downloads.html#desktop-os-1)
- [No Dolphin Patch](https://github.com/zaksabeast/Multiboot-Jirachi-Patches/releases/latest)
- A Jirachi multiboot ROM (e.g. the Wishmaker \`client.bin\`)

## Intro

This patch lets you obtain a multibooted Wishmaker Jirachi without using Dolphin. It bypasses the GameCube connection requirement, allowing you to use only a GBA emulator.

## Video Guide

<YouTubeVideo src="https://www.youtube.com/embed/X_XV3EgzSIc?si=-K4fZ4m0Nl-LIRV6" />

## Step 1: Download the Patch

1. Download \`patches.zip\` from the [No Dolphin Patch releases page](https://github.com/zaksabeast/Multiboot-Jirachi-Patches/releases/latest).
2. Unzip the zip file to get a \`patches\` folder.
3. Choose the appropriate patch for your emulator using the table below.

| Emulator | Multiboot ROM        | Patch File                   |
| -------- | -------------------- | ---------------------------- |
| mGBA     | Wishmaker Jirachi    | \`mgba/client.ips\`            |
| mGBA     | Meteor Jirachi       | \`mgba/client.2003_1112.ips\`  |
| mGBA     | Wishing Star Jirachi | \`mgba/sample0519.ips\`        |
| Other    | Wishmaker Jirachi    | \`other/client.ips\`           |
| Other    | Meteor Jirachi       | \`other/client.2003_1112.ips\` |
| Other    | Wishing Star Jirachi | \`other/sample0519.ips\`       |

\`\`\`
Note: If an 'other' patch doesn't work, try the 'mGBA' patch, even for non-mGBA emulators.
\`\`\`

## Step 2: Apply the Patch

1. Go to [this IPS patching website](https://www.marcrobledo.com/RomPatcher.js/).
2. Upload your multiboot rom as the ROM file (e.g. \`client.bin\`) and patch file.
3. Click \`Apply Patch\` and download the patched ROM (e.g. \`client.patched.bin\`).

## Step 3: Load the Patched ROM

1. Rename your Ruby or Sapphire save to match the patched ROM name (e.g. \`client.patched.sav\`).
2. Load the patched ROM in your emulator.
3. Confirm the distribution succeeds.

## Step 4: Verify Jirachi in Your Save

1. Once the transfer completes, rename the save file back to its original name.
2. Load your Ruby or Sapphire ROM in your emulator.
3. Check your party to make sure the Jirachi is there.

Congrats! You've now got your Jirachi without needing Dolphin!
`;export{e as default};
