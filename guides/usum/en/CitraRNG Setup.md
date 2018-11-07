---
# CitraRng Setup
---

This guide is for setting up CitraRng on a PC. An updated CFW console is required to be able to dump system specific information and game data. The console also needs to have the latest game update installed to be dumped. Canary version of Citra will be used as they have support for scripting and othings used for CitraRNG. This version may be unstable compared to other versions of Citra, so make sure to backup anything useful.

---
## Tools
---

- Canary version of [Citra](https://github.com/citra-emu/citra-canary/releases)
- [CitraRNG](https://github.com/Admiral-Fish/CitraRNG)
    - Clone or download the entire repository
- [Python 3.7](9https://www.python.org/downloads/)
    - In the install selection add python to your `PATH`
- [Latest Godmode9](https://github.com/d0k3/GodMode9/releases)
- [Dump_PKMN_Update.gm9 Script](https://cdn.discordapp.com/attachments/389206049401470976/435566091457134598/Dump_PKMN_Updates.gm9)
- Latest game update installed on the 3DS

---
## Dumping system and game data
---

- Place the `Dump_PKMN_Update.gm9` script in  your 3DS sd card in sdmc:\gm9\scripts
- Boot your 3DS into GodMode9 by holding `Start` while powering on the 3DS
- Press the `Home button` then select `scripts...`
    - Select `GM9Megascript`
    - Select `Dump Options` 
    - Select `Dump Citra Files` to dump Citra files
- Exit back to Godemode9 main menu and select `scripts...` once more 
    - Select `Dump_PKMN_Updates` script and follow the on screen directions
- To dump a game installed on the 3DS do the following
    - Hover over [A:] SYSNAND SD  
    - Hold `R` and press `A` at the same time to open the drive options
    - Select “Search for titles”
    - Press `A` to continue
    - Press `A` on the .tmd file for the game
    - Select `TMD file options…`
    - select `Build CIA (standard)`
- To dump a game from a cart do the following
    - select `[C:] GAMECART`
    - Select the `trim.3ds` file
    - Select `NCSD image options...`
    - Select `build CIA from file`
- Exit godmode9 and transfer the files from sdmc:\gm9\out to your PC

---
## Settings
---

### Setting up Citra 

- Open Citra, under the `File` option choose `Install cia...`
    - Install both the game(s) and update(s) .cia
- Place the nand folder in the user directory for Citra
    - For Windows, the path is `C:\Users\[your-user-name]\AppData\Roaming\Citra\.`
```Note that the folder AppData is hidden by default, so you need to change the configuration to view it.```
    - For macOS and Linux, the path is `~/.local/share/citra-emu/.`
```Note that the folder .local is hidden on most machines, so you need to change the configuration to view it.```

### Setting up CitraRNG

Python 3.7 needs to be installed for CitraRng to work. Python also needs to be added to your `Path` or else the command will not be recognized. If it's not installed then it can be added by editing the installation.

- Open a command prompt anywhere and type `pip install pyzmq pyside2`
    - This may need administration privileges 
- Copy all the .py files in the CitraRNG folder into <your Citra directory>/scripting
- Open Citra and your Gen 7 Pokémon game, and load your save file
Double-click the main.py file to run the script

``` Note: If this does not work then right click "main.py" and select "Edit with IDLE". Make sure that you open with Python 3.7 if you have both Python2 and Python3 installed. Then hit "F5" to run the script.```

- In the CitraRng window select your game and click connect
- The tool will update with information from the game such as initial seed, frames, ivs etc...
- The tool has an auto refresher to allow frames to be updated periodically, this may make the program crash if left on long enough

``` Note: The higher the delay for the refresh rate the less often the program will crash, 2000 is max. Pause and reconnect CitraRng every once in a while, to keep it from crashing.
```
The [Citra wiki](https://citra-emu.org/wiki/home/) has more information on how to run Citra and how to trouble shoot issues.
