# How to RNG Shiny WISHMKR Jirachi using wishmaker-calc

### Things you will need
- [VBA-RR](https://github.com/TASVideos/vba-rerecording/releases)
- Lua .dll files:
[x86.dll](https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0)
[x64.dll](https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0)
- [wishmaker-calc](https://zaksabeast.github.io/wishmaker-calc/build/)
- [wishmaker lua script](https://github.com/beatlynx/lua-stuff/blob/master/scripts/wishmakerlua.lua)

## About WISHMKR Jirachi and wishmaker-calc

### Basic info

WISHMKR Jirachi are generated using the block 0 checksum of your save file. wishmaker-calc is a program made by Zaksabeast which reads a Ruby or Sapphire save file and calculates a time for the user to save at.

When saved at the time provided by wishmaker-calc, if that save file is used to redeem a bonus disc Jirachi, it will be the spread given by the program. This is because saving at that time will make the game's block 0 checksum match the one required for the specified Jirachi.

[Here is a list of the 9 possible wishmaker jirachi.](https://www.irccloud.com/pastebin/rdxEbTm4/)

### Caveats to this method

Sometimes, when the player is standing still, certain bytes of game data can change that will cause the program to not work correctly. It may take many tries to obtain your Jirachi.

It is not possible to target a single Jirachi spread with this method.

### Before you begin

Before beginning this process, you need to find your save delay. Start by opening up Ruby/Sapphire on VBA-RR and load the wishmaker lua script.

Open up the save menu and pause the game at the last line of dialogue over "YES". Make note of the current time displayed by the lua script.

Next, hold down the a button, unpause the game while still holding down a, and watch the current time. When the current time on the lua script freezes, pause the game and write that time down.

Your save delay will be the time when it froze minus the time when you paused the game before saving. Open up the lua script in wordpad. Put your save delay second and frame in the variables "savedelaySecond" and "savedelayFrame".

```
Make sure not to modify anything in the lua script below the "DON'T EDIT ANYTHING BEYONG HERE" comment!
```

## Steps to obtain your Jirachi

### Play the game

Before searching for a Jirachi, you need to play through the game up until you receive your Pokedex, so do that now.

### Save and upload your battery file

After obtaining your Pokedex, save your game. In VBA-RR, export your battery file and upload it to wishmaker-calc by clicking the Jirachi.

### Possible results

If the website tells you to save the game again, do it and reupload it to the website. This may occur multiple times.

![](https://i.imgur.com/vDfWBpb.png)

If the website tells you No Results, you have a few options. One option is to restart your save and play to the Pokedex again. Another option is to move to a different location, save, and check for a Jirachi again (this doesn't always work).

If you get a time to save, you have found a Jirachi. Check the spread to see if it is one you want. If it isn't, repeat the above steps.

![](https://i.imgur.com/5gZ1w80.png)

### Once you have found a Jirachi you want

Open the lua script in wordpad again and input the time given by wishmaker-calc under targetSaveHour, Minute, Second, and sixtiethSecond. Optionally, you can add your target Jirachi seed as well (for rng proofs/personal preference). Restart the lua script.

You will notice that two different times display on your screen. The target save time is the time wishmaker-calc gave you. The real save time is the time you will actually be saving at, calculated using your save delay.

### Once you have your real save time

Once you have your real save time, get to the last dialogue screen of the save menu and hover over "YES". Pause the game here.

Now you need to wait for the time on your screen to match the real save time displayed on your screen. Unpause the game and begin waiting.

Once you get close to your real save time, pause the game and advance frames manually. Once you reach your real save time, hold down a, and while still holding it down, unpause the game.

![](https://i.imgur.com/Sl0KWy1.png)

After saving, export your battery file.

### Let's see if it worked:

To check if the save you made will redeem to a shiny Jirachi, upload your save to wishmaker-calc again. It should tell you to save your game again, but don't do that.

Next to the save your game message, there should be some text that says "Current checksum:". If the seed next to it matches any of the [shiny jirachi seeds](https://www.irccloud.com/pastebin/rdxEbTm4/), congrats, your save will redeem to a shiny Jirachi!

![](https://i.imgur.com/vDfWBpb.png)

### If it didn't work

If your block 0 checksum does not match one of the shiny jirachi seeds, you will need to restart the process from a new save. As I mentioned in the caveats section, some bytes of game data that wishmaker calc does not account for might have caused the method to fail.

Alternatively, you might have saved at the wrong time or obtained your save delay incorrectly.

## Notes

- Make sure to not change your text speed, this will change your save delay
- Speeding up your emulator might cause this method to fail

## Methods to redeem your Jirachi

You can redeem your Jirachi by moving your save file to a real cartridge and using a real bonus disc, or by emulating the bonus disc with dolphin.

A guide on connecting VBA to Dolphin can be found [here](https://pokemonrng.com/guides/tools/en/connect%20dolphin%20to%20vba.md).

## Credits
- Zaksabeast for making this great tool
