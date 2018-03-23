# Seed RNG (RunAsDate edition)
_How to control the time without any difficulty_
```
Important note: This guide assumes that you have found your Target Seed, and that you know how to search for the wanted Seed. This guide is just explaining how to hit your Seed. It is necessary to have your target seed and delay before following this guide.
```

## Download section :
* [RunAsDate](https://www.nirsoft.net/utils/run_as_date.html) : Take care to choose the right version (32 or 64 bits) for your computer.
* [Lua Scripts for Gen 4](http://pokerng.forumcommunity.net/?t=56443955&p=396434984)

## What is RunAsDate?

RunAsDate is a tool developed by nirsoft that allows any program to load with a set time specified by the user. This tool is really usefull for Gen 4 RNG, and can be your best ally in order to hit your Seed without too much difficulty. Of course there are other ways, but this guide will only focus on RunAsDate.

## How to setup RunAsDate?

Once downloaded and launched, you should have this window:
![](https://i.imgur.com/HeUoPmv.png)

This screenshot shows runsadate after it has been configured. This means you'll have to uncheck ANY box, and to set to "Absolute day/time" (but should be set by default). Selecting 'Relative day/time' will not freeze the time and so you'll have no advantage to use RunAsDate.

You'll never have to change that after. This is the universal RunAsDate configuration for RNG (Gen 3, 4 or 5), so you're almost done! Now you just have to select the program you want to fake the date/time, with the "Browse..." button, and to set the day/time you've got in order to hit your seed.

After that, just hit "Run" and your desmume should be launched.

Congratulations, you've controlled the time! Now it's time to hit the wanted Seed.

### Hitting the target seed

Now that you've just faked the date and time on desmume, load the lua script.

Go as fast as possible to the "Continue" screen and pause your emulator (Ctrl + P). Before continuing, you should do the maximum save states as possible in order to have safe backup in case you miss your delay. After, you can un-pause your game and let the game run in order to get close as possible to your target seed.

1. Click `A` to get to the "Continue" screen as fast as possible.
2. Pause your emulator `Ctrl + P`.
3. Make plenty of save states in case you mess up.
4. Unpause your game, and let it run until you get close to your target seed.
5. Once you are close, pause your emulator.
6. Create another save state (you never know what might happen!).
7. Press `N` to advance the game one frame to increase the delay one time.
8. Once you're close to the target delay, hold `A` while unpausing your game.

##### Troubleshoot
_or the `I'm hitting +/-1 Initial seed part`_

Sometimes you'll find that even though you're pressing A on the right delay, the actual delay you hit is +/-1 of what you wanted. This is to be expected because of how Gen 4 delays can either be always odd or always even. There are two methods to switch delays from even to odd or vice versa listed below:

It's not an error from your part, and is related to odd/even numbers. Nothing too hard to fix! You have two solutions in order to hit your right seed:

  * Changing the year: This is a simple method with RunAsDate. You just have to close your emulator (assuming you did enough saves states, and that's why it was important to do a LOT of them), and change the year in RunAsDate from +/- 1 year. Take care through, because the delay will of course change to +/-1 from your original delay! You can verify the new delay with RNG Reporter in the "seed to time" tab. Once you've adjusted everything, relaunch your desmume with RunAsDate and load a state, and redo the process.

  * Load a GBA game : Doing that will just switch odd/even seed and so will correct this problem, making it easier since it's just a simple configuration and no new delay to hit again.
