---
title: 'How to RNG Shiny WISHMKR Jirachi using wishmaker-calc'
description: 'Unlimited Shiny Jirachis'
slug: 'emulator-rse-wishmaker'
subCategory: 'Emulator'
---

## Tools

- [VBA-RR](https://github.com/TASVideos/vba-rerecording/releases)
- Lua .dll files:
  - [x86.dll](https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0)
  - [x64.dll](https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0)
- [wishmaker-calc](https://zaksabeast.github.io/wishmaker-calc/build/)
- [wishmaker lua script](https://github.com/beatlynx/lua-stuff/blob/master/scripts/wishmakerlua.lua)

### Before beginning

- Make sure to not change your text speed as this will change your save delay.
- Speeding up the emulator might cause this method to fail.
- An alternative to starting a new file is waiting 30 minutes in-game.
- Don't choose the same name or starter every time you try with a new save.
- Try switching bewteen the male and female character.

```
Note: Sometimes, when the player is standing still certain bytes of game data can change that will cause the program to not work correctly. It may take many tries to obtain your Jirachi because of this.

It is not possible to RNG for a specific Jirachi spread with this method. This guide is only for RNGing a shiny Jirachi and you cannot choose a specific spread. Manipulating the block 0 checksum for a specific Jirachi spread is a complex process and is not covered in this guide.
```

## Step 1: Setting up

1. Find your save delay

   - Before beginning this process you need to find your save delay.
   - Start by opening up Ruby/Sapphire on VBA-RR and load the wishmaker lua script.

2. Open up the save menu and pause the game at the last line of dialogue over "YES".

   - Make note of the current time displayed by the lua script.

3. Next, hold down the `A` button and unpause the game at the same time.
   - Watch the current time. When the current time on the lua script freezes, pause the game and write that time down.

Here is an example of the time freezing while saving.

![](https://i.imgur.com/dVM5jnp.gif)

Your save delay will be the time when it froze minus the time when you paused the game before saving.

`Save delay = time froze - time paused`

4. Open up the lua script in a text editor, such as wordpad.
   - Put your save delay second and frame in the variables "savedelaySecond" and "savedelayFrame".

```
Note: Make sure not to modify anything in the lua script below the "DON'T EDIT ANYTHING BEYONG HERE" comment!
```

![](https://i.imgur.com/SfM5d39.png)

## Step 2: Finding a Jirachi seed

1. Prepare the save

   - You must use a save that has already obtained the Pokedex.
   - After obtaining the Pokedex, save your game.
   - In VBA-RR, export your battery file and upload it to wishmaker-calc by clicking the Jirachi.

2. If the website tells you to save the game again, do so and reupload the save to the website.
   - This may happen multiple times.

![](https://i.imgur.com/vDfWBpb.png)

3. If the website displays "No Results" you have a few options.
   - You can move to a different location, save, and check for a Jirachi again.
   - Collecting the Running Shoes, or doing wild battles may also work.
   - If you're still getting "No Results", then you will have to either wait 30 minutes ingame, or restart the game with a new save.

```
Note: The program searches through the next 30 minutes only for a match which is why waiting 30 minutes ingame may allow for new results to be found.
```

4. If you get a time to save, you have found a Jirachi.
   - Check the spread to see if it is one you want. If it isn't, repeat the above steps.

![](https://i.imgur.com/5gZ1w80.png)

## Step 3: Hitting the Target Seed

1. Open the lua script in wordpad (or your favorite text editor).
2. Input the time given by wishmaker-calc under targetSaveHour, Minute, Second, and sixtiethSecond.

   - Optionally, you can add your target Jirachi seed as well (for rng proofs/personal preference).

3. Restart the lua script.
   - You will notice that there are now two different times displayed in the lua script.
   - The target save time is the time to save at to obtain the desired Jirachi.
   - The real save time is the time you will actually be saving at and was calculated using your save delay.

```
Note: Target save time = Real save time + delay while saving
```

3. Advance to the last dialogue of the save menu and hover over "YES".

4. Pause the game here.
5. Wait for the ingame time to match the real save time displayed.
6. Unpause the game and wait until you are close to the time needed.
7. Once you are close to your real save time, pause the game and advance frames manually.
8. The default key for advancing frames while paused is `Ctrl + N` for Windows.
9. When you are on your real save time, hold down `A` and unpause the game at the same time.

![](https://i.imgur.com/Sl0KWy1.png)

10. After saving the game, export your battery file.

## Step 4: Verifying Target Seed

1. Upload your save to wishmaker-calc.

   - It should display a message to save your game again, but you can disregard it.

2. Next to the save your game message there should be text that says "Current checksum:".
   - If the seed next to it matches any of the [shiny Jirachi seeds](https://www.irccloud.com/pastebin/rdxEbTm4/) then congrats! Your save will redeem to a shiny Jirachi!

![](https://i.imgur.com/vDfWBpb.png)

## Troubleshooting

If your block 0 checksum does not match one of the shiny Jirachi seeds, you will need to restart the process from the beginning.

As mentioned previously, some bytes of game data that wishmaker calc does not account for might have caused the method to fail.

Alternatively, you might have saved at the wrong time or obtained your save delay incorrectly.

## Methods to redeem Jirachi

You can redeem your Jirachi by moving your save file to a real cartridge and using a real bonus disc, or by emulating the bonus disc with dolphin.

A guide on connecting VBA to Dolphin can be found [here](https://pokemonrng.com/guides/tools/en/How%20to%20Connect%20Dolphin%20to%20VBA/).
