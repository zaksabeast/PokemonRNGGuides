const e=`---
title: "Ruby and Sapphire TID RNG"
navDrawerTitle: "TID RNG"
description: "Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in Ruby and Sapphire."
slug: "emulator-rs-live-battery-tid"
category: "Ruby and Sapphire"
tag: "emu"
---

## Tools

- [mGBA with lua scripts](/mgba-setup)
- [PokeFinder](/pokefinder)

## Step 1: Finding Your Initial Seed

1. Open PokeFinder and go to Gen 3 IDs, then select the RS tab.
2. Select the desired filter and enter the desired TIDs, SIDs, or TSVs.
3. Leave the time and date as is, or adjust if needed.
4. Click "Generate" and search for a matching TID.
   - If no results appear, try adjusting the time, date, or increasing max advances.

## Step 2: Hitting Your Initial Seed

1. In mGBA, go to \`Tools -> Game Overrides...\` and enable "Realtime clock."
2. Then go to \`Tools -> Game Pak Sensors...\`, select "Start time at," and enter the target time and date.
3. Start the game and play until Prof. Birch says he'll see you later.
4. Let the game advance to the target number of advances, making save states along the way.

Advance at this screen:

![Final Screen](/images/Ruby-Sapphire/Live-Battery-TID/Final-Screen.png)

## Step 3: Adjusting for Delay

There is a delay between pressing \`A\` and when the TID/SID is generated. You need to account for this.

1. Note your target advance.
2. When you reach it, press \`A\` to generate a TID.
3. Enter this TID into PokeFinder and search for the result.
4. Compare your actual advance with the target to calculate the delay.
   - Example: If you aimed for advance **89103** but hit **89175**, your delay is **72**, so you need to press \`A\` **72 advances earlier**.
5. Reload a save state from before and press \`A\` at the new calculated advance.

\`\`\`
If your TID/SID are swapped, go one advance earlier.
\`\`\`

Enjoy your new TID!

Here is an example of a successful ID RNG:

![Success](/images/Ruby-Sapphire/Live-Battery-TID/Success.png)
`;export{e as default};
