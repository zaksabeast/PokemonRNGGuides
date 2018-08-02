# How To Find DS Parameters in Generation 5 (EmuAbuse)

#### Things To Download
- [Latest Build of RNG Reporter](https://ci.appveyor.com/project/Admiral-Fish/rngreporter/build/artifacts)
- [DeSmuMe Dev Build](https://sourceforge.net/projects/desmume/files/desmume/0.9.11/desmume-0.9.11-win32-dev.zip/download)
- Lua .dlls
  - [x86 .dlls](https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0)
  - [x64 .dlls](https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0)
- Pokemon BW or BW2 .nds files (You can dump the carts yourself using a CFW 3DS with Godmode9)
- [The Lua Scripts corresponding to your rom's language](http://pokerng.forumcommunity.net/?t=56443955)
- [RunAsDate (Optional)](https://runasdate.en.softonic.com/)

#### Things To Know
Finding your DS Parameters is **MANDATORY**. There are no RNGs you can do without finding these parameters. As such, you should get comfortable with doing this procedure. (Though you only have to do it once per save/console/emulator)

#### The RNG Process
1. DS Parameters Search
- Open RNG reporter and click the "DS Parameters Search."
- Set Seed Encryption Variables as seen here: 

![DS](https://snag.gy/QF6Rfk.jpg)

- Unlike on consoles, DeSmuMe's DS MAC Address is always 0009BF123456.

2. The Seed
 - Open runasdate and type in any time. Make sure to check Immediate Mode. Put that time in DS Parameter Finder. Now hit "Run" on runasdate and load your rom.
 - Open your lua script and do not do any keypresses. Copy the seed you get and paste it into the DS Parameters finder. Hit Search and wait.
 ![DS](https://snag.gy/hTDiae.jpg)
 - When you get a result, hit "Send Results to Profile." Good luck on your future RNGS!


- **Note: You may have to redo this process if you change emulation settings, saves or redownload the emulator.**
