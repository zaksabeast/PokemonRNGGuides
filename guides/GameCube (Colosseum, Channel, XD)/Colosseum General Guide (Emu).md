---
title: 'Colosseum General RNG'
description: 'Colosseum General RNG'
slug: 'emulator-colosseum-general'
subCategory: 'Emulator'
isRoughDraft: true
---

# Pokemon Colosseum RNG Guide

This guide will explain how to RNG Pokemon Colosseum using emulators. It is based on my experience and what I've picked after years of extensive research, so I don't claim it to be exhaustive or entirely accurate. As a minimum, I recommend having experience on how to RNG Gamecube games previously (XD) as well as advanced knowledge on how to operate with Dolphin & VBA (Visual Boy Advance). Keep in mind that the images shown might differ from what you actually have, regardless, the process should be the same.

## Prerequisites:

In order to RNG abuse Pokemon Colosseum you will need:

- PokeFinder
- An ISO of Pokemon Colosseum
- Dolphin version 4.0-6848. (This version is known to work with RTC for Colosseum)
- RunAsDate (x64)
- A calculator

## Setting up your work

Open Pokefinder and click on Stationary on the Gen 3 column:
Go to Profile > Manager > Click on “New” and fill out your Pokemon Colosseum’s data. Make sure you pick “Colosseum” as the game as otherwise you won’t be able to search through Colo/XD Method.

Once done, click on “Accept” and once back on Profile Manager, click on “Done.”
On the Gen 3 Stationary Window, now pick your new profile and PokeFinder will automatically pick Colo/XD as the Search method. You should be able to see it as shown in the screenshot below:

## Configuration

We need to set up Dolphin appropriately for this RNG since we will be working on an outdated version that will allow us to use RTC only with RunAsDate.
On RunAsDate, on “Application to run” pick the path where your Dolphin.exe is located on your computer.
On “Date / Time” make sure that Absolute date / time is picked. Don’t touch the dates yet.
On “Parameters” type: “ -d “. This is extremely important as this will trigger the Developer Mode of Dolphin when we start it from RunAsDate since the old version of Dolphin lacks the RTC function the newer versions have.
Make sure that any other checkbox else is unticked / unchecked.
Your RunAsDate window should look into something similar to this:

Contrary to what the screenshot shows, we will be picking 1/1/2000 at 12:00:00 AM as the Date / Time to be used on RunAsDate in order to figure out our initial seed and hit a desired spread.
Click on Run and you should be able to see Dolphin’s developer mode booting up from start up. If not, make sure you have the right directory path.
On Dolphin, open your game (Developer mode pauses your game from boot, but don’t unpause yet) go to View and check Watch. You should be able to see on the left side a gray square with some black colored rows.
On address, enter the following numbers and you should be able to see the cell getting white at the moment you enter the values. Make sure you label them properly so you know which value you are looking at. These will be the PRNG states you will need to RNG Colo:

US Colosseum:
Main PRNG: 80478c90
AI Slot 1: 80473070
AI Slot 2: 804731a8
AI Slot 3: 804732e0
AI Slot 4: 80473418
AI Slot 5: 80473550
AI Slot 6: 80473688

PAL Colosseum:
Main PRNG: 804c6130
AI Slot 1: 804c0508
AI Slot 2: 804c0640
AI Slot 3: 804c0778
AI Slot 4: 804c08b0
AI Slot 5: 804c09e8
AI Slot 6: 804c0b20

JPN Colosseum:
Main PRNG: 80464360
AI Slot 1: 8045e750
AI Slot 2: 8045e888
AI Slot 3: 8045e9c0
AI Slot 4: 8045eaf8
AI Slot 5: 8045ec30
AI Slot 6: 8045ed68

Click on the Save button with the screw image and your RAM Watch table will be saved on Dolphin. This way, we do not have to re-enter these values each time we boot our game. It should look into something similar to this:

Now unpause your game and press pause again. Check your PRNG state and this should be your initial seed.

Make sure you save this value on a notepad or sticky note as we will be using it each time we will RNG abuse Colo in the future. At this point you can close your game window but make sure you keep the big window with our RAM Watch still open.

## The RNG Process

To get the initial seed required to hit your spread at a comfortable frame range, we will need to find the seed that generates your spread:
On the main PokeFinder window, go to Gen 3 Tools > IVs to PID
Enter the IVs and Nature of the spread you are looking for.
On the results table, click on Seed and then press Ctrl + C to copy that value as we will be needing it.
Now open the Gamecube RTC window (Gen 3 Tools). Enter your initial seed obtained at 1/1/2000. On Target seed, enter the seed you obtained from the IVs to PID window. Enter a frame range where you feel comfortable waiting for (I’d recommend setting 4000 as a min and you can set up a max of whichever you feel like). Then click on Search and wait for the results.
Once done, the Gamecube RTC will give you the time you need to set up on RunAsDate in order to boot your game with the specific initial seed required to hit your spread.

Now change your RunAsDate’s date and time values to the ones shown in Gamecube RTC.

Once you boot up your game, you should be able to see the PRNG state on the RAM Watch matching the same seed value shown on the Gamecube RTC window. If these values do not match, make sure you are either using a compatible Dolphin version with RunAsDate, the correct Date / Time or the PRNG value.

Now go to the Gen 3 stationary window of PokeFinder and enter your new initial seed. Enter your spread information, load your profile and hit on Calculate. As you can see, our target frame is 770742.

When you are done, it is time to start with our Shiny Colosseum RNG hunt. Depending on the place and the Pokemon you are targeting some Shadows might be easier or harder to RNG for.

Boot your game and enter into the game’s overworld. Since Colosseum saves from the PC make sure you are booting from a point where you can reach the location of your Shadow Pokemon without exceeding from your target frame.

Once you have reached the place where you encounter the Pokemon you intend to RNG, create a save state.

Depending on the area you are RNGing before the encounter, there are several ways you can advance your PRNG accordingly and adjust in order to get close to your target frame.

On noiseless areas:
Over 10,000 frames: You can check a Shadow Pokemon’s summary either on the Shadow Monitor or in your party. The Shadow particles advance A LOT of frames, so make sure you keep a close track and pause accordingly before you exceed your target frame
Less than 3,000 frames: You can advance frames by just viewing a regular Pokemon’s summary. If there is movement, they will advance a certain amount of frames.
Less than 500 frames: By going back and forth from the PDA Menu to the Shadow Monitor, you are advancing exactly 7 frames which makes it perfect once you are closing into your target frame.

On noisy areas:
Bayleff method: By checking back and forth the summary of two non-shadow Pokemons you can change how frequently the PRNG is advancing on noisy areas. It is recommendable to do this with Espeon & Umbreon on your summary since both DO NOT advance the PRNG on their summary screens which makes the advancement minimal when swapping summaries.

During battles:
Sometimes, you will be stuck on situations where you will have to advance the PRNG while being on a battle. A notable example are the final 6 Shadow Pokemon on Realgem Tower. You’ll have to advance frames while battling the previous trainer before your target Shadow Pokemon. Attacks with longer animations such as Solarbeam or Fire Blast will consume a lot of PRNG, while others like Body Slam use less. Plan accordingly before facing these Pokemons.

It’s worth mentioning that on noisy areas, we do not have control on how the PRNG will advance even if we change the advancements and you will just have to hope you hit the correct PRNG state that will trigger your spread. However, since we are doing this on a noiseless area, we can control the advancements. Take into account that since there are other variables that might influence the RNG such as forced dialogues or scenes before the encounter is triggered, this may influence as well how your PRNG advances and the frames you are trying to hit.

Advance frames accordingly using the techniques I have shared earlier. Make save states as you keep getting closer to your target.

Once you are on the intended target frame (5 frames away from target) trigger the encounter and you should be able to see your spread on the corresponding Shadow Pokemon’s AI slot.

To double check, enter the PRNG address of the corresponding slot on Memory View (View > Memory) and you should be able to see the Pokemon’s name scribbled all over on ASCI View (Right click > View > As ASCI)

From this point forward, since once you encounter a Shadow Pokemon, its PID and IVs are stored, you can either KO the Pokemon to capture it later. Once you are on post-game you can export Dive / Repeat / Luxury Balls from the mainline GBA games and use it to capture your Shiny Shadow Pokemon.
If that is not your cup of tea, capture it and once the battle is over, you can now watch your Shiny Shadow Pokemon in all of its glory. You’ll notice the difference when you check the party sprites since shiny sprites are always different from non-shinies.

Congratulations! You are now the proud owner of a Shiny Shadow Pokemon. All that is left is purify it and enjoy your Colosseum Shiny.

Guide provided by Jellal.
