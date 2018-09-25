# How To Find DS Parameters in Generation 5 (EmuAbuse)

#### Things To Download

- [Latest Build of RNG Reporter](https://ci.appveyor.com/project/Admiral-Fish/rngreporter/build/artifacts)
- [DeSmuMe Dev Build](https://sourceforge.net/projects/desmume/files/desmume/0.9.11/desmume-0.9.11-win32-dev.zip/download)
- Lua .dlls
  - [x86 .dlls](https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0)
  - [x64 .dlls](https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0)
- Pokemon BW or BW2 .nds files (You can dump the carts yourself using a CFW 3DS with Godmode9)
- [The Lua Scripts corresponding to your rom's language](http://pokerng.forumcommunity.net/?t=56443955)
  - Password for the lua script archive is `allyouneedisnoob`.
- [RunAsDate (Optional)](https://runasdate.en.softonic.com/)

#### Things To Know

Finding your DS Parameters is **MANDATORY**. There are no RNGs you can do without finding these parameters. As such, you should get comfortable with doing this procedure.
  

#### The RNG Process

1. Setting up DS Parameters Search

- Open RNG reporter and click the "DS Parameters Search."
- Set Seed Encryption Variables as seen here: 

![DS](https://i.imgur.com/VpwKrLW.png)

- Unlike on consoles, DeSmuMe's DS MAC Address is always 0009BF123456.

```
DS Type: Lite/Original
DS Mac Address: 0009BF123456
VCount: 0-70
Timer0: 300-1200
GxStat: 6-6
VFrame: 0-15
```

If the above values do not find anything you can extend the values further, however the search will take much longer.

```
VCount: 0-FF
Timer0: 0-FFFF
GxStat: 6-6
VFrame: 0-15
```

2. Finding the Timer0

 - Open runasdate and type in any time and date. 
  - Make sure to check "Immediate Mode". 
  - Put the same date and time from runasdate into the "DS Parameter Finder" window. 
  - Now hit "Run" on runasdate and load the game in Desmume.
 - Open the lua script and do not press any keys. 
  - Copy the seed you get and paste it into the "DS Parameter Finder" window in the box above the date and time settings. 
  - Hit "Search" and wait.

 - When you get a result, hit "Send Results to Profile." 
 
 Good luck on your future RNGS!


```
Note: You may have to redo this process if you change emulation settings, saves, or redownload the emulator.
```
