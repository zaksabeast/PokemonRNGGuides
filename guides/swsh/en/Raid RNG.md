# Raid RNG

As you may know, Raid RNG will be the only method of pure RNG Abuse in Gen 8. 

First, a huge thanks to the research team that spent days to find this, even if in the end the RNG is pretty slim : Leanny (u/LeanYosh), Admiral Fish (u/Admiral_Fish), Zaksabeast (u/Zaksabeast), wwwwwwzx (u/wwwwwwzx), Kaphotics (u/Kaphotics) and Vladcik (u/Aligatueur).

But Raid RNG is really powerful. You'll be able to go for almost any Pokemon (only starters, fossils, legendary and... Beheeyem can't be available), and also for any G-Max Pokemon. **Also, Shining Charm HAS NO INFLUENCE on the Shiny generation in Raids**

This guide will cover how to RNG a Raid with using a Wishing Piece AND how to RNG natural beams.

The RNG itself is something you do in 3 steps : 
* The Setup: You'll need to find a raid seed (by different methods).
* The Advancement: How to advance to your target frame.
* The Species Reset: How to get the Pokemon YOU want.

**Important note : GameFreak can patch this at any time. Take care to not update the game at the moment**

## Tools

In order to make it work you'll need a few tools. This can change with which method you'll use. that in ANY WAY, you’ll need a CFW  / Exploitable Switch or know someone with a CFW / Exploitable Switch.

Here's a list of tools used for the RNG process : 

* Admiral Fish's RaidFinder: https://github.com/Admiral-Fish/RaidFinder/releases/
* Leanny's PKHeX Raid Plugin: https://github.com/Leanny/PKHeX_Raid_Plugin (this implies you know how to add a plugin to PKHeX, be sure to authorize the plugin via the files' proprieties)
* Leanny's Mobile Seed Checker : https://leanny.github.io/seedchecker/index.html (It allows to find the closest Shiny Frame, to search by Nest and also let you to show / filter by IV Judge's values)
* Admiral Fish's Raid Solver: https://github.com/Admiral-Fish/RaidFinder/blob/master/raid_solver.py Use that if you can only get a pk8, or the PID / EC of a Pokemon. You'll need python and z3 for that. You'll have to input the PID / EC and the number of perfect IVs (From 1 to 6). After it'll give you your Raid seed.
* Zaksabeast’s CaptureSight: https://github.com/zaksabeast/CaptureSight/releases For that, you’ll need a CFW switch. The most effective tool with in real-time raid display (id and seed)

## The Setup

**The guide will be adjusted or updated to support OneStar soon**

This part is the most difficult and the most long depending your method. There're 3 different solutions : 

1. You have a CFW'd Switch.
2. You have a RCM vulnerable Switch.
3. You have a non CFW Switch but you have another CFW'd OR RCM vulnerable Switch (or you know somebody with one).

**There'll be no issue to do RNG on Yuzu. At the moment, the RTC is broken so advancing is not really possible. Once it'll be fixed, support will be looked into**


And also there're 3 different methods to get your seed: 

* Using CaptureSight. This tool will ask no dump, or anything. This can be used in solution 1. **However** this can be applied to the method 3. to help the non CFW Switch.
* By dumping the save file. This apply in the two first solutions. You'll need to dump your savefile to get each Raid Seed.
* By getting the Pokemon file. This will be used for the last solution only.

### CaptureSight 

First, download CaptureSight and put it in the switch directory on your switch's SD card. This tool allows to know anything about the data of your game. You can use it to know the PID / EC of the Pokemon, or even to know the Raid Seed. It also displays many pieces of information about your team, boxes, etc. You just need to have your game opened and go to the Homebrew Channel and run CaptureSight to get everything you want.

**This covers only Wishing Piece method. The natural method will be explained in the end with its own method**

#### If you are doing it only with CFW : 

Before anything, try to determine the ID of your den:
1. Start your game
2. Press the Home button and open CaptureSight
3. Look at the Active Den List and note which Den Ids are currently active
4. Go back to the game and save in front of your desired den
5. Use your wishing piece on the den
6. Press the Home button as fast as possible, before the game finishes saving
7. Load CaptureSight and go to the Active Den List
8. Find the new Den Id in the list
9. Close and reopen the game so it doesn't think the wishing piece was used

Input your seed in either RaidFinder or the PKHeX plugin. It should display all the informations you want.

If the seed gives you a result you want to RNG, go back in game and let the game save. You're ready to advance for the next step.
If not, close the game and retry. Do that until you get an interesting Seed.

#### If you’re a CFWless user who knows a CFW user:

I'm not sure we need to call out it's different since we have instructions showing how it's different. The CFWless Switch will just have to save in front of a den. You can use the Soft Reset method to focus only on Rare beams. 

Once you find a den to RNG:
1. Save the CFWless switch in front of the den and host the raid
2. Have the CFW switch join the raid
3. On the CFW switch, press the Home button and load CaptureSight
4. View the raid Pokemon in the "Wild Pokemon" menu and check the PID, EC, and IVs of the raid Pokemon
5. Use the raid solver in order to get the den's seed
6. Use RaidFinder or the PKHeX plugin to find a Pokemon you want to RNG
7. Have the CFWless switch restart the game without saving
8. If a good RNG isn't found, beat the raid or use a wishing piece, then start again.


Another solution which is faster for CFW users:
1. Have the CFWless switch catch a raid Pokemon
2. Have the CFWless switch join a trade with the CFW switch
3. On the CFW switch, press the Home button and open CaptureSight
4. In CaptureSight, view the trade Pokemon to get the PID, EC, and IVs
5. Exit the trade so the CFWless switch doesn't save
6. Restart the game on the CFWless switch so the den can be RNG'd

### Dumping the save file

In the process we'll not go in the details of HOW to do the dumping process. The guide assumes you can search/know about this since it’s not RNG Related.

1. Use CFW or RCM to get your save file
2. Open the "main" file with PKHeX
3. Go to "Tools" => "Display Raids" to see all your raids
4. Search for a den you're interested in and get the den seed
5. Use RaidFinder with the den seed to find Pokemon you can RNG

If you don't find anything interesting, just re-use a Wishing Piece / check for naturals dens.

### Dumping / Getting the Pokemon file

The process here is quite similar to the dumping file, except this allows a CFWless Switch to know their own Raid Seed with the help of either a CFW (using CaptureSight is easier) or a RCM Vulnerable switch (and so no CFW necessary)

1. Let the CFWLess Switch host a raid.
2. Invite the CFW / RCM Switch to the raid and defeat it. Let the CFW / RCM user to catch it. The CFWLess user must reset the game
3. Dump pthe Pokemon File to get the informations. 
4. Use Raid Solver to get your Raid Seed
5. Use RaidFinder with the den seed to find Pokemon you can RNG

If you're fine with the seed and your target, you can start the advance part. If not, kill the raid to use another Wishing Piece and redo the process or use a Wishing Piece in another den.


## The Advancement

This method is pretty known and is around since the release of Sword / Shield. This has been used to go for a desired Pokemon, or even just to farm infinite Watts. But in the end this method advances the Frames for the RNG process.

A Raid Seed work like any other Seed in any other game, with his list of seeds and frames to hit. In the end, when the game advances the day by one, **EACH** raid (active or not, wishing piece'd or not) will advance of one frame.

But since we can manipulate the time with the Switch settings, it makes Frame advancing really easy and allows Raid RNG to be doable in the end. 

In order to advance frames, you've 3 methods. Similar to the setup and to find your Raid Seed, you'll have the choice of the method(s) based on what your Switch setup is. You can either : 

* Advance frames offline, day by day. It was the original method.
* Advance frames using the VS Battle glitch, really fast, but online is necessary.
* Advance frames using Luxray. A Homebrew that makes advancing for you.
* Using Arduino / botting to do the advancement for you. It'll not be covered on that guide at this state, but you can find an example of a frame advancing tool [here](https://github.com/nnguy132/Switch-Frame-Advancer)

The following will assume that you KNOWS your Raid Seed, and you found a desired frame target.
**RaidFinder and the PKHeX plugin has a different frame indexing. the plugin starts with Frame 0 (your actual frame) while RaidFinder starts with Frame 1 (also being your actual Frame) take care of this**

In every method, you can advance the way you want. Day by day, month by month, year by year. The only important thing is to be able to track your advancements, since **changing your dates by X days at once will not do anything except advancing the frames by 1**. The same way you can roll back in the time in order to continue your frame advancement. **Chaning your time in the past WILL NOT influence your frame**

You have to take care of the daily advancement, which can happen. But you can also **do anything** in the game. Only time is a factor to advance your Seed.

Last point, you can use any method to find your Raid Seed in order to be sure that you didn't mess up. This will help to secure your RNG. Just be sure to NOT loose your Raid.

### Day by Day, offline method.

This is the longest method, but the original one. It'll be your only solution if you don't have online and cfw. The huge advantage of the method is the fact you farm Watt, and can get a huge amount in the end. Except that, if you can get online or cfw, it's more interesting to follow an other method.

**Your Switch must be AT LEAST in local mode, airplane will not work. If you're on CFW it's safe to go for the local mode if you delete any wi-fi connection**

1. Open your raid's menu
2. Go to "Invite others"
3. While the game is searching, press the Home button
4. Go to "Settings" => "Date and Time"
5. Edit your day / month / year by one (or more since it'll only advance by 1)
6. Press "OK"
7. Enter back into the game
8. Cancel the raid search

**The Date / Time settings must be set to be edited manually and not to be updated from the server** 

Go back in the game. Cancel the Raid search, and go back to the overworld. You'll see the den being red again. If you can collect the watts again, this means you advanced your frame correctly.

Repeat that until being 3 frames from your target.

### VS Battle glitch

This method is the most effective one if you don't have CFW. It allows to advance frames really fast, but requires to have online (and by online, it's subscription to the Nintendo Online). 

To do a little summary, after doing **a ranked battle** the game will not pause in the background. It allows to do all your advancements in the switch menu without going back in game or anything. 

1. Go to a Pokemon Center. It'll reduce the risk of crash.
2. Connect your Switch online, and go to the VS Menu
3. Launch a Ranked Battle. Solo or Duo is fine. Also winning, loosing or forfeiting  is fine.
4. As soon as the battle is over (when you see the results with the Trainer Cards), spam B as much as possible until being in the Pokemon Center, turn off the online and open the Switch Menu
5. Go to the Switch Settings, "Date and Time"
6. Edit your day / month / year, press "OK"
7. Re-do that as much as necessary until being 3 frames from your target.

**The Date / Time settings must be set to be edited manually and not to be updated from the server** 

**Some people had issues by advancing a specific amount and getting more far than excepted. So take that in consideration.

### Luxray

This is a homebrew tool done by Dualie_ink. This guide will only cover the basics. You can download it [here](https://github.com/3096/luxray) and install it to your switch. 

**With Luxray, you'll have to set the Date / Time setting to be from the server, as the opposite to every other method**

You'll need to launch the overlay by launching Luxray in the Homebrew application. You can activate / desactivate it by pressing the Up button and the up with the right stick. You can navigate in the overlay by using the directional buttons, and validate with the R button.

1. Go to a Pokemon Center to avoid any crash like for the online method
2. Set the amount of frames you'll need to advance with the overlay menu
3. Press Step in order to have Luxray to advance frames

DO that until being at 3 frames from your target, as always.

**You can use Luxray to fix your Switch's clock since it edits the internal server time.**


## The Species Reset

The final and last part of the guide. First of all let's do a little explanation of how it works : Raid RNG has a cryptosecure value for determing the species. This could be seen as a huge issue, but in the end, you could see this as a HUGE advantage because this allows to Soft Reset for ANY wanted Pokemon without caring of the others informations of the Pokemon. That way you don't need to search for days your G-Max Shiny Charizard since any Shiny Frame CAN be the G-Max Shiny Charizard.

For that, however we need to see how the games saves some data about Raids and how everything is generated.

Since we can predict every information about the Pokemon, we know that ONLY the species is something random. But the games stores species data for your actual frame but also **THE TWO NEXT FRAMES**.

So that's why you need to take care to end your advancement **BEFORE** your Shiny Frame, because if you save too late, the species will be generated and saved.

Once you get the idea that the game stores three frames, you just have to adapt from that and use that at your advantage : By saving 3 frames before your target frame, you can just do 3 advancement, see if your target is the Pokemon you wanted. If not, close the game and retry again.

IVs, Nature, Gender and Ability is linked to the Amount of IVs guaranteed by the Pokemon. It's not really linked to the species or by the amount of stars. It's something case by case (For example, many Pokemon with 3/4/5 stars will give 4IVs). You'll have to look the results for your target in order to know what you'll get.

By doing everything, you should finally get your Target Raid. 

It also works with Event Raids. Nothing different.



## Natural Raid RNG

**This is a method that can be interesting for doing some Shiny pretty fast. You won't be able to control anything except shininess easily with this.**

A little note about Natural Raid RNG and to explain how it works. Every den has its own Seed. Even if it's inactive, the advancement works the same, day by day. The goal here is to check if you have an interesting frame soon. You can either use CaptureSight or the PKHeX plugin to find each seed for each den. 

If you find something interesting, you'll have first to check where this den is. You'll have to know later to check the active dens and go for your target.

You'll also have to know how many frames you need to advance (the 3 frames rule will be really important, but for a different reason).

**Tip : Throw a wishing piece on a random den in order to do advances without moving to different dens. You can also throw it in a quite far away Shiny Frame to have a Seed reset on that den after**

Once you'll be at 3 frames from your target frame, save your game. It's really important. 

Now it'll be similar to the Species Reset, except you're gonna try to hit a SPECIFIC den. You do your 3 advances, go to your den and see if it's active or not. If it's active, you can save, the Raid  will be with your target frame. If not, just soft reset and try again until you have your target den active.

**If you're using CaptureSight, you can use the Active Den List, saving you a lot of time**


That's all for Raid RNG. Enjoy, and don't hesitate to ask in the subreddit or the discord if you have any question.
