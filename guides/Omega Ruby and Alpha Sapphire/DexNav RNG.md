---
title: 'DexNav RNG'
description: 'DexNav RNG for ORAS. Citra is 100% recommanded.'
slug: 'emulator-oras-dexnav'
subCategory: 'Emulator'
isRoughDraft: true
---

Introduction :

DexNav has been for a long time been seen as a no-way RNG. But for a few months ago, a basic method has been found. After some researches and some fixes, this guide will explain how to do DexNav RNG without any TinyMT setup.

This RNG could be done in theory on a 3DS with PCalc, but I'd not recommand it at all since it relies for some luck factors like triggering an encounter or even getting the right delay. So for this guide, it'll be applied to Citra, but you still can try and apply that method with PCalc. You'll most likely need to redo it many times. The 20 steps method is the way to go for PCalc, but it'll imply some TinyMT manipulation.

Setup :

- Citra (save-state builds) w/ CitraRNG
- 3DSRNGTool (Real96's fork if you want to use TimeFinder)
  Optional : - TimeFinder if you want a specific target.

First, let's setup the game itself : Go to the place you want to do this RNG with your target Pokémon, and activate some repel, you'll need it. Not really RNG related, but having a high total encounters will allow you to have more possibilities with Egg Moves, IVs etc.

Next, you'll have to find a target frame. You can either use TimeFinder for that (link will be necessary once the guide will be done) or you can do the good old way with SRing for some initial seed. 3DSRNGTool doesn't have any working DexNav RNG method. So you'll go to the "Normal Wild" section, and put 217 as delay. This delay is the default longer delay for DexNav RNG. So putting that will allow you to not skip your frame by accident if the delay is shorter than this. (It'll be explained at the right time)

Note : It's important to setup a high minimal frame for the frame range. You'll need to setup a DexNav encounter before, and so this need so time. I'd suggest you to not put under 5000 frames for the minimal. Also if the area is small / hard to DexNav, don't hesitate to put an even higher Minimal Frame.

Process :

Once you have your target frame, don't forget it to set it up as your Target Frame. It'll be important in the following step to keep track of it since the delay is random. (but not unstable)

Enter in the game, and as fast as possible, enter to the bag. Here create a save state. This save state will be used for the first part of the RNG, which consists to trigger an encounter. Once done, close the bag and click on "Search". You'll most likely have no encounter. That's logic and alright. Move around and open the bag again. Then create a save state, (or overwrite the one you have done but take care to not skip your Target Frame) close the bag and search. You'll have to repeat that until you get an encounter.

Note : If you want a specific egg move or a specific criteria, you can just check if the Pokémon triggered has what you want since these are independant of the main RNG factor. So you can continue to setup save states until you have the Pokémon with the right egg move / any criteria you want.

Once you trigger an encounter, reload the state in the bag. With that setup on a start of a chain, no TinyMT is necessary / implied, so you just have to stay in the bag and advances until you're near your target frame. If you want to avoid any fail, do all the save states you need.

The next step is to hit the default target frame with the 217 delay. For that you'll have to close your bag only a few hundred frames before your target Frame. I strongly suggest to go for 150 frames. Going for too much frames could mess with the possibility to trigger an encounter and so make you fail your RNG. Once you're back in the main screen, click on the "Search" button, hold it and pause the game.

Important : This whole process can be a little tedious if you don't take care, so you can slow down the game or advance everything frame by frame.

Now while you're still holding the Search button, advances frame by frame until your target.

Note : Your mouse must be clicking on the Search button all the time you advance frames. You can of course stop clicking if the game is paused and you're not advancing frames. It can be confusing but with a little practice it'll be really easy to master.

When you're on your target frame, you can unpause the game and also stop clicking. It'll trigger the encounter at the exact frame. Since you know you had an encounter, you'll get an encounter the same way. You just now have to go to the Pokémon and start the battle.

If the Pokémon matches then congratulations, you did your DexNav RNG.

However, in most of the cases, it'll not give what you want. DexNav RNG has a lot of random delay. They're not unstable. They're just linked to the lengh of the search animation. You'll see that the most commons delays are : 137, 177 and 217. You can of course find other values, but they always will be in the 130-250 frame range.

If it's the case, just write down the IVs, and compare the delay with what you've got. Adjust the delay, reload the state and repeat. You'll most likely get your encounter. If it's not the case, you'll have to adjust again.
