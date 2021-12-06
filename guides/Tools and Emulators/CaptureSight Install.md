---
title: 'How to Install CaptureSight'
description: 'Installing a tool on your Switch to help RNG Pokemon'
slug: 'misc-switch-install-capturesight'
subCategory: 'Switch'
---

## Tools

- A Switch with Atmosphere CFW (Custom Firmware)
  - https://switchgui.de/switch-guide/ has instructions for installing Atmosphere

## Step 1: Installing Tesla Overlay

- [nx-ovlloader](https://github.com/WerWolv/nx-ovlloader/releases)
- [Tesla Menu](https://github.com/WerWolv/Tesla-Menu/releases)

1. Download the latest release for both Tesla Menu and nx-ovlloader.
2. Unzip and merge folders onto the root of the SD card.
   - There should be an `atmosphere` and `switch` folder to merge.

## Step 2: Install CaptureSight

- [CaptureSight](https://github.com/zaksabeast/CaptureSight/releases)

1. Download `capturesight.ovl` and place it into the `switch/.overlays` directory on the SD card.

## Using CaptureSight

1. To open CaptureSight, first start Sword/Shield or Brilliant Diamond/Shining Pearl.
2. Press `L + D-pad Down + Click in right joystick` to toggle the Tesla Menu overlay.
3. Open CaptureSight overlay.

## Troubleshooting

### Error: `dmnt:cht is not running`

- If you see this error it is because you are not using Atmosphere (the Custom Firmware), or you have not installed it correctly. Follow [this guide](https://switchgui.de/switch-guide/extras/updating/) to update Atmosphere to the latest version.

### Error: `No cheat process! Is a game running? Is something else using dmnt:cht?`

- Make sure to launch the game first before trying to run CaptureSight. Check that you are not also using sysbot-base. These two cannot be used at the same time as they conflict with each other.

### Error: `Unsupported game update!`

- Updating the game to the latest version should fix this error.

### Error: `Unsupported game! Title Id: <titld_id>`

- You are not using a game that CaptureSight supports. The list of supported games are as follows:
  - Sword & Shield
  - Brilliant Diamond & Shining Pearl
