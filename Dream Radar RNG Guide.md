# How To Do Dream Radar RNG Abuse in Generation 5 (EmuAbuse)

###### Things To Download
- [Latest Build of RNG Reporter](https://ci.appveyor.com/project/Admiral-Fish/rngreporter/build/artifacts)
- [DeSmuMe Dev Build](https://sourceforge.net/projects/desmume/files/desmume/0.9.11/desmume-0.9.11-win32-dev.zip/download)
- Lua .dlls
  - [x86 .dlls](https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0)
  - [x64 .dlls](https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0)
- Pokemon Black and White2 .nds Files (You will need to dump this yourself via GM9)
- [The Lua Scripts corresponding to your rom's language](http://pokerng.forumcommunity.net/?t=56443955)
- [Suloku's Gen V Save Tool](https://github.com/suloku/BW_tool/releases) (Alternately, you could dump your BW2 Save if your community frowns upon injections)
- [RunAsDate (Optional)](https://runasdate.en.softonic.com/)

###### Things To Know
Dream Radar RNG can be used to obtain DBHA Legendaries and several other Pokemon. Pokemon here are Shiny-Locked, but other than that, there are no limitations. You will be advancing both types of frames present in Generation 5 (IVRNG and PIDRNG Frames) at the same time and by two each advance. Frames for this RNG are advanced using the key system. ![system](https://snag.gy/JN9Wu5.jpg)


###### Prepwork
Ensure that you have exported your BW2 Save File with the Dream Radar Pokemon to DeSmuMe **OR** inject it using Suloku's Gen V Tool. (Note: Some trading sites do not allow the latter method.) If you have done so, move onto the RNG Process.


###### The RNG Process
1. Finding a spread
- Open RNG Reporter and go to G5 Time Finder. Stay on the "Capture" tab and set the settings accordingly. Set the IVs you want, Encounter Type is "Wild Pokemon" and method is "IVs (Standard Seed). You set your Frame range depending on your target. For the Therian Trio (Tornadus, Thundurus, Landorus), set the minimum frame to 21. For other Pokemon, the minimum frame must be at least 8. The maximum frame is personal preference. Hit search and wait for some results.
  ![example](https://snag.gy/iTgKX3.jpg)
If you are going for a Generation 4 Legendary or a random Pokemon, target even IV frames, but if you are going for a Therian-Forme, target odd IV frames.
2. Getting a good nature
 - You may notice that Time Finder has not listed nature for Dream Radar. To get the nature we will hit by using a frame, we will go to the main RNGReporter screen and select Gen 5 PIDRNG. Unfortunately, you cannot control Dream Radar nature, only predict it. To find the nature we will get, we use a formula.
 - For example, if I want this: ![example](https://snag.gy/JpIxYQ.jpg) 
 -  I will take the seed and get the initial PIDRNG Frame for it using the button on RNGReporter. (This button will appear on the right when you have selected Gen 5 PIDRNG) Now that I have the initial PIDRNG Frame, I can plug the information in to the formulas below.
 
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
- Fortunately, a Rash HP Ice Landorus-T is fairly usable, so I will make the needed advancements (in this case, none) and collect the Landorus. 

And there we have it! A DBHA Landorus! 
 ![tada](https://snag.gy/pBY8Hc.jpg)
