# Seed RNG (runasdate edition)
_How to control the time without any difficulty_
```
Important note : This guide assumes that you have found your Target Seed, and that you know how to do it. This guide is just explaining how to hit your Seed. Write it somewhere with the delay necessary.
```

## What is runasdate?

runasdate is a tool developped by nirsoft that allows to load any program with a specified fake time. This tool is really usefull for Gen 4 RNG, and can be your best ally in order to hit your Seed without too much difficulty. Of course there are other ways, but this guide will only focus on runasdate.

You can download it [here](https://www.nirsoft.net/utils/run_as_date.html), but take care to choose the right version: If you have a desmume 64-bits or 32-bits, you'll have to download the matching runasdate. It's really important.

## How to setup runasdate?

Once downloaded and launched, you should have this windows : 
![](https://i.imgur.com/HeUoPmv.png)

This screenshot show runsadate once well configured. This means you'll have to uncheck ANY box, and to set to Absolute day/time (but should be set by default).

You'll never have to change that after. This is the universal runasdate configuration for RNG (Gen 3, 4 or 5), so you're almost done ! Now you just have to select the program you want to fake the date/time, with the "Browse..." button, and to set the day/time you've got in order to hit your seed.

After that, just hit "Run" and your desmume should be launched.

Congratulations, you've controled the time ! Now it's time to hit the wanted Seed.

### Hitting the target seed

On your desmume you just faked date and time, load your script.
```
Note : You'll have to use the script that shows the delay and both seeds (initial + current). You can find it [here](http://pokerng.forumcommunity.net/?t=56443955&p=396434984) and take care to download the Lua Script and not the Ram Watch !
```
Go as fast as possible to the "Continue" screen and pause your emulator (Ctrl + P). Before continuing, you should do the maximum save states as possible in order to have safe backup in case you miss your delay. After, you can un-pause your game and let the game run in order to get close as possible to your target seed. 

Once you're enough close, re-pause your emulator, and re-do another save state (we never know what can happen !) and press N (default configuration) to advance the game frame by frame, and so the delay 1 by 1. This way, there's no way to miss your delay. When you're on the RIGHT delay, just hold your A button and unpause your game. 

The initial seed should be the one wanted and shown in RNG Reporter, you can go and do the RNG in the proper way and hit your frame now !

##### Troubleshoot
_or 'I'm hitting +/-1 Initial seed part_

Really often, even if you hit the RIGHT delay, you'll find that your delay is not matching, but you have a difference of + or - 1. Like you want a seed ending in 95, and you keep hitting 94 or 96. 

It's not an error from your part, and is related to odd / even numbers. Nothing too hard to fix ! You have two solutions in order to hit your right seed :

* Changing the year : This is a simple method with runasdate. You just have to close your emulator (assuming you did enough saves states, and that's why it was important to do a LOT of them), and change the year in runasdate from +/- 1 year. Take care through, because the delay will of course change to +/-1 from your original delay ! You can verify the new delay with RNG Reporter in the "seed to time" tab. Once you've adjusted everything, relaunch your desmume with runasdate and load a state, and redo the process.
* Load a GBA game : Doing that will just switch odd / even seed and so will correct this problem, making it easier since it's just a simple configuration and no new delay to hit again.
