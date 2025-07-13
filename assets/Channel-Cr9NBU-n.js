const e=`---
title: "(PAL) Channel RNG"
description: "Step-by-step guide to RNG the Channel Jirachi."
slug: "channel-jirachi"
category: "Gamecube"
tag: "emu"
---

## Tools

- A finished save of Channel with the Jirachi option unlocked
- A finished save of Ruby/Sapphire
- Toolbox from Lincoln
- Dolphin-Lua + Channel Lua from Real96

## Intro

In Gen 3, there are two ways to RNG Jirachi: Wishmaker and Channel. Wishmaker is easier but has limited spreads. This guide focuses on Channel using Dolphin and updates to simplify the RNG. It assumes you have basic knowledge of GC RNG, especially how to hit an initial seed.

## Setup

1. Open Toolbox and access GameCube in the main window.
2. Go to "Searcher" without a profile and apply your filters.
3. Once you find a spread, note its Seed.
4. Go to Gen 3 Tools => GameCube => GameCube RTC. Enter your Origin Seed and Target Seed. Search for a 10-100 advance range.
5. After obtaining a result, enter the date/time in runasdate and run Dolphin.

## RNG and Advancing

Next, obtain Jirachi. When Dolphin and the Lua are loaded, the initial seed should match. Pause Dolphin at the main menu.

1. In Toolbox, navigate to Gen 3 Tools => GameCube => Jirachi Advancer.
2. Input the Current Seed in the Starting Seed box.
3. For Target Seed, enter the Jirachi seed.
4. Max Advances, related to the earlier range, should be around 100.
5. Leave the Bruteforce Range empty and don't check the "Min Actions" box. Then, hit generate.

If everything was done correctly, you'll have a list of actions to follow. You can adjust by updating the Origin Seed to see the current steps.

Once all steps are completed, claim Jirachi for a final advance and obtain your desired target.

\`\`\`
Note: If no result is found, it’s rare but possible. Try another initial seed or search again. It should work.
\`\`\`

\`\`\`
Note: If you see "Reload Menu," go to Options and press \`B\`.
\`\`\`

## Credits

- Chinese translation: xuanyelin, Hakuhiro.
`;export{e as default};
