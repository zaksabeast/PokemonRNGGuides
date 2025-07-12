const e=`---
title: "Diamond, Pearl, and Platinum Retail Initial Seed RNG"
navDrawerTitle: "Initial Seed RNG"
description: "Learn how to RNG your initial seed in Diamond, Pearl, and Platinum on a physical console."
slug: "dppt-initial-seed-retail"
category: "Diamond, Pearl, and Platinum"
tag: "retail"
addedOn: "2025-04-08"
---

\`\`\`
This guide assumes you have found a target seed already. You need your target seed and delay before following this guide.
\`\`\`

## Tools

- [Mystic Timer](/mystic-timer)

## Calibrated Values

Diamond/Pearl:

- Delay: 600
- Seconds: 14

Platinum:

- Delay: 575
- Seconds: 14

## Step 1: Set Up Mystic Timer

1. Open Mystic Timer and enter the values above for your game.
2. Input your target delay and target seconds.
3. Note the "Minutes Before Target" value.

## Step 2: Set the Console Time

1. Set the console clock to the target time minus the "Minutes Before Target" value.
2. Press \`A\` to confirm the time and start Mystic Timer at the same time.

## Step 3: Hitting the Initial Seed

1. When the first timer ends, start the game.
2. When the second timer ends, press \`A\` to continue your save.

## Step 4: Adjust Delay

1. Refer to the guide of the RNG you are doing for how to calibrate your seed.
2. Input the delay hit into Delay Hit and update the timer.
3. Try again from Step 2 by setting the console time.
4. Repeat as needed to hit the target seed.

## Adjusting Even/Odd Delays

Gen 4 delays are always either odd or even. If your delay is off by 1, use one of the methods below to switch between odd and even delays.

### Change the Year

Set the year one year forward or backward. This will also change the delay. Verify the new delay in PokeFinder under "Seed to Time."

### Load a GBA Game

Insert a GBA game into the DS’s GBA slot to switch the delay from even to odd, or vice versa.

### Continue Screen Method

Select "New Game," then press \`B\` to cancel and return to the continue screen. This will switch the delay from even to odd, or vice versa.
`;export{e as default};
