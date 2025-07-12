const e=`---
title: "PokeReader Azahar"
description: "Learn how to install PokeReader on a 3DS emulator to assist with RNG and perfect Pokémon hunting."
slug: "install-pokereader-emu"
category: "3DS Tools"
tag: "emu"
---

PokeReader is a plugin to help RNG on emulators.

For how to install PokeReader on a 3DS console, [go here](/install-pokereader).

## Tools

- [Azahar](https://github.com/azahar-emu/azahar/releases/latest)

## Install PokeReader on Azahar/Lime3DS/Citra

1. Download the [latest release of PokeReader](https://github.com/zaksabeast/PokeReader/releases/latest).
2. Open the emulator's preferences.
3. Navigate to \`System\` settings.
4. Check the \`Enable 3GX Plugin Loader\` box.
5. Go to the \`Storage\` tab.
6. Click \`Open\` next to \`SDMC Directory\`.
7. Create the \`/luma/plugins\` folder if it does not exist.
8. Copy \`default.3gx\` to the \`/luma/plugins/\` folder.
9. Update your Pokémon games - PokeReader requires the latest version.

**We will update with more instructions once Azahar is released.**

## PokeReader Controls

- \`Start\` + \`Up\`: Opens and closes the overlay
- \`Start\` + \`Select\`: Pauses the game
- \`Select\` while paused: Advances the game by 1 frame
- \`Start\` while paused: Unpauses the game
- Crystal VC only
  - \`L\` + \`R\`: Pauses the game
  - \`L\` while paused: Advances the game by 1 frame
  - \`R\` while paused: Unpauses the game

## Troubleshooting

**PokeReader does not load and my game crashes!**

Make sure you have updated the game to the latest version. PokeReader will not work on older game versions.

[This guide](/citrarng-setup) has instructions for how to dump a game update from a CFW 3DS console.

## What next?

Try some of these RNGs!

- [Shiny Celebi in Crystal](/gen2-celebi)
- [XY Friend Safari RNG](/pcalc-xy-friend-safari)
- [Island Scan RNG](/retail-usum-island-scan)
`;export{e as default};
