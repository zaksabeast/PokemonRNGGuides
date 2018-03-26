# How To Do Dream Radar RNG Abuse in Generation 5 (EmuAbuse)

###### Things To Download
- [Latest Build of RNG Reporter](https://ci.appveyor.com/project/Admiral-Fish/rngreporter/build/artifacts)
- [DeSmuMe Dev Build](https://sourceforge.net/projects/desmume/files/desmume/0.9.11/desmume-0.9.11-win32-dev.zip/download)
- Lua .dlls
  - [x86 .dlls](https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0)
  - [x64 .dlls](https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0)
- Pokemon Black 2 or White 2 .nds files (You can dump the carts yourself using a CFW 3DS with Godmode9)
- [The Lua Scripts corresponding to your rom's language](http://pokerng.forumcommunity.net/?t=56443955)
- [Suloku's Gen V Save Tool](https://github.com/suloku/BW_tool/releases)
  - Alternatively, you can extract your BW2 save file after obtaining the Pokemon you wish to RNG from the Dream Radar if you rather not inject.
- [RunAsDate (Optional)](https://runasdate.en.softonic.com/)

###### Things To Know

Dream Radar RNG can be used to obtain DBHA Legendaries and several other Pokemon. Pokemon here are Shiny-Locked, but other than that, there are no limitations. You will be advancing both types of frames present in Generation 5 (IVRNG and PIDRNG Frames) at the same time and by two each advance. Frames for this RNG are advanced using the key system.

![](https://snag.gy/JN9Wu5.jpg)

In addition, you may have noticed a "Dream Radar" tab in RNG Reporter. During the time of this guide being written, that tab does not work. Therefore, the guide will explain an alternate method of finding seeds and desired IV/Nature combonations.


###### Prepwork

Ensure that you have exported your BW2 Save File with the Dream Radar Pokemon to DeSmuMe **OR** inject the Pokemon you wish to RNG using Suloku's Gen V Tool. If you have done either of these, you can then move onto the RNG Process.


###### The RNG Process

1. Finding a spread
    -Open RNG reporter and go to Gen 5 Time Finder. Stay on the "Capture" tab and adjust the settings accordingly.
    -Set IVs to what you want, Encounter Type is "Wild Pokemon", and the method is "IVs (Standard Seed)".
    -The IVs frame range depends on what Pokemon you are RNGing. For the Therian Trio (Tornadus, Thundurus, Landorus) set the minimum IV frame to 21. For the other Pokemon the minimum IV frame is 8. Maximum frame can be whatever you prefer.
    -Hit search and wait for results to show.

![](https://snag.gy/iTgKX3.jpg)

```
Note: If you are going for a Generation 4 Legendary or a random Pokemon, target even IV frames, but if you are going for a Therian-Forme, target odd IV frames.
```

2. Getting a good nature
   - You may notice that Time Finder has not listed nature for Dream Radar. To get the nature we will hit by using a frame we will go to the main RNGReporter screen and select Gen 5 PIDRNG.
   - Unfortunately, you cannot control Dream Radar nature, only predict it. To find the nature we will get, we use a formula.
   - For example, if I want this:

 ![](https://snag.gy/JpIxYQ.jpg)

    -  I will take the seed and get the initial PIDRNG Frame for it using the button on RNGReporter. (This button will appear on the right when you have selected Gen 5 PIDRNG)
    - Now that I have the initial PIDRNG Frame, I can plug the information in to the formulas below.

    Therian Trio

    `(Your IVFrame (The one in Time Finder) - 21) / 2 = Number of required Advancements`

    `Initial PIDRNG Frame + 7 + Advances required = PIDFrame you will hit`

    G4 Box Legends and Gendered Pokemon

    `(Your IVFrame - 8) / 2 = Number of required advancements`

    `Initial PIDRNG Frame + 2 + (2 * advances required) = PIDFrame you will hit`

    Genderless Pokemon

    `(Your IVFrame - 8) / 2 = Number of required advancements`

    `Initial PIDRNG Frame + 1 + (2 * advances required) = PIDFrame you will hit`

3. RNGing the Pokemon

    - My IVRNG Frame is 21, so I won't need to make any Frame Advancements. However, to make advancements, you should use Key System's "Send and Recieve Keys" function. It will advance both the PIDRNG and IVRNG Frames by 2.
    - Now that I have found a suitable nature with the IVs I desire, I will do my needed advancements (in this case, none) and collect my Landorus.

And there we have it! A DBHA Landorus!

 ![](https://snag.gy/pBY8Hc.jpg)
