---
title: 'Difference between Live and Dry Battery'
description: 'Discover the two way to RNG on Ruby / Sapphire and learn their differences'
slug: 'rs-battery'
subCategory: 'Basic Knowledge'
isRoughDraft: false
---

For once, this guide will not imply to do any manip, open anything. Let's see this guide more as an introduction to Ruby / Sapphire RNG. This applies to any RNGer : Emu, Retail, the idea is to answer to all the question you can have if you're new to RNG Abuse and interested by Ruby / Sapphire RNG.

I'll just take each case, explain how it works, what you can do and can't do with it, and in the end a little conclusion to help you decide which one to go for.

## Dry Battery

The Dry Battery will sounds really familiar to you if you know how Emerald works.

Exactly like Emerald, having a dead battery means that everything related to the RTC (Real Time Clock) is now impossible. So everything implying time (like Berry growth) is quite frozen in the time. And, bad luck (or good ?), seeding and RNGing is based on the time.

**So once your battery is dead, you end up with only one Initial Seed : 5A0**

This is in general a huge advantage for Retail RNGers, allowing you to just go for hitting your frame like you would do on Emerald. In the end, everything works the same. 

Only two major differences exist between RS Dry Battery and Emerald :
- The Initial Seed is not set to 0 but 5A0 as seen before.
- Battle Video isn't a thing.

However, because of recent discoveries, even the initial seed can be changed with the Painting Seed method. It implies to do a little manip before going for your target, but opens the possibilities of hitting any Initial Seed without any issue, making it really close to Live Battery.

As a little note, Dry Battery is necessary for Wishmaker Jirachi RNG

## Live Battery 

Live Battery is more emulator oriented. To make it simple, one minute (based on the clock of the game) = one initial seed. So during a timeframe of a specific minute, you'll always hit the same Initial Seed. Using PokeFinder, it's really easy to know which one you did it... Assuming that you know exactly the time of your clock in your game.

In the past, Live Battery used to more interesting because you could go for any Initial Seed easily and hit really many spreads, avoiding the bad parts of a fix Initial Seed. But Painting changing quite the landscape and now the idea is that going for Live Battery will just skip the Painting Part. Find the Initial Seed you want, the corresponding time and use it at your advantage, so still important for users who can control the RTC of the game easily like on Emulator.

How Live Battery would work for Retail ? Well it's simple. You'd either have to remove the Battery, put it back in order to reset the clock, and then wait the right time, at the right date to go for your RNG. You'd pretty much have one try to do your RNG since only one minute to be on the right Initial Seed. Seems tedious right ? To avoid that hassle, there's a tool that allows you to fix / set an RTC : https://github.com/megaboyexe/GBA_RTCRead With that you can easily set any RTC to a working battery game and then do your Live Battery RNG. The method is up to you if you want to go for that method.

## In the end, what's the better method ?

If you're able to control the RTC easily, you'll want to go for the Live Battery. If you can't you'll go for the Dry Battery, and if you have enough skill, you'll want to try the Painting method in order to have a desired Initial Seed.

Outside that, the RNG doesn't change between the two. As it'll be covered in all the guides, you'll just have to follow the steps the same way, and just adjust the Initial Seed based on the method. 
