---
title: "Initial Seed RNG (RunAsDate edition)"
description: "How to control Gen 5 initial seeds without any difficulty"
slug: "emulator-b2w2-runasdate-inital-seed"
---

```
Note: Important note: This guide assumes that you have found your Target Seed, and that you know how to search for the wanted Seed. This guide is just explaining how to hit your Seed. It is necessary to have your target seed before following this guide.
```

## Tools

- [RunAsDate](https://www.nirsoft.net/utils/run_as_date.html) : Take care to choose the right version (32 or 64 bits) for your computer.
- [Lua Scripts for Gen 5](http://pokerng.forumcommunity.net/?t=56443955&p=396434991)

```
Note: This guide assumes you have an initial seed you'd like to hit already.
```

### What is RunAsDate?

RunAsDate is a tool developed by nirsoft that allows any program to load with a set time specified by the user. This tool is really usefull for Gen 4 RNG, and can be your best ally in order to hit your Seed without too much difficulty. Of course there are other ways, but this guide will only focus on RunAsDate.

## Step 1: Setup RunAsDate

1. Launch RunAsDate
2. Configure RunAsDate to look like the image below
   ![](https://i.imgur.com/HeUoPmv.png)

```
Note: You'll never have to change that after. This is the universal RunAsDate configuration for RNG (Gen 3, 4 or 5), so you're almost done!
```

3. Select the program you want to fake the date/time, with the "Browse..." button
4. Set the day/time you've got in order to hit your seed
5. After that, just hit "Run" and your desmume should be launched.

## Step 2: Hitting the target seed

Desmume is now running with the faked time.

1. Load the lua script.
2. Load your gaem.
3. Do any necessary keypress(es) required to hit your target seed.
4. There's nothing more to do, you can just continue as any basic any RNG!

## Troubleshooting

If you're not hitting the right seed at the first try with runasdate, check to make sure these things are correct:

- Runasdate time
- RNG profile
- Keypresses needed to hit your seed
