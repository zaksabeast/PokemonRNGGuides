# Seed RNG (RunAsDate edition)
_How to control the time without any difficulty_
```
Important note: This guide assumes that you have found your Target Seed, and that you know how to search for the wanted Seed. This guide is just explaining how to hit your Seed. It is necessary to have your target seed before following this guide.
```

## Download section :
* [RunAsDate](https://www.nirsoft.net/utils/run_as_date.html) : Take care to choose the right version (32 or 64 bits) for your computer.
* [Lua Scripts for Gen 5](http://pokerng.forumcommunity.net/?t=56443955&p=396434991)
 - Make sure to download the revised versions

## What is RunAsDate?

RunAsDate is a tool developed by nirsoft that allows any program to load with a set time specified by the user. This tool is really usefull for Gen 4 RNG, and can be your best ally in order to hit your Seed without too much difficulty. Of course there are other ways, but this guide will only focus on RunAsDate.

## How to setup RunAsDate?

Once downloaded and launched, you should have this window:
![](https://i.imgur.com/HeUoPmv.png)

This screenshot shows runsadate after it has been configured. This means you'll have to uncheck ANY box, and to set to "Absolute day/time" (but should be set by default). Selecting 'Relative day/time' will not freeze the time and so you'll have no advantage to use RunAsDate.

You'll never have to change that after. This is the universal RunAsDate configuration for RNG (Gen 3, 4 or 5), so you're almost done! Now you just have to select the program you want to fake the date/time, with the "Browse..." button, and to set the day/time you've got in order to hit your seed.

After that, just hit "Run" and your desmume should be launched.

Congratulations, you've controlled the time! Now it's time to hit the wanted Seed.

## Hitting the target seed

Desmume is now running with the faked time.

Load the lua script, then your game, and do any necessary keypress(es) required to hit your target seed. There's nothing more to do, you can just continue as any basic any RNG!

### Troubleshoot

If you're not hitting the right seed at the first try with runasdate, check to make sure these things are correct:
- Runasdate time
- RNG profile
- Keypresses needed to hit your seed
