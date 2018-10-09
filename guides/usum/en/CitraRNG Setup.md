/!\ Rough Draft /!\

This guide is JUST THE SETUP. NOT HOW TO RNG.

Requirement (A LOT) :
- Citra. Take canary build atm. Supports the frame advancing. Don't forget to dump informations from your 3DS here https://citra-emu.org/wiki/dumping-system-archives-and-the-shared-fonts-from-a-3ds-console/
- A 3DS DECRYPTED GAME. https://citra-emu.org/wiki/dumping-game-cartridges/
- The update of the wanted game. (link to the script in discord ????)
- CitraRNG https://github.com/Admiral-Fish/CitraRNG (which means you need Python 3.7 + pyside2)

First download a recent build of canary. The advancing frame is quite recent and so you should take care to take the most recent release.
Set it up with your 3DS files. You'll have to change the country of your console later. This is optional.

Once Citra is downloaded, put your game in the folder read by citra. 
Now it's time to install the update. For that just select "File" => "Install CIA" and select your the .cia of your update.
Wait.

Your Citra + Game is now READY for some RNGing.

To know the basic frame advancement hotkeys :
- F4 does a BASIC pause of the game. BUT NOT ALLOW FRAME ADVANCEMENT.
- Ctrl+A pause the game BUT ALLOWS the frame advancement. Once done, you just have to press "\" to advance frame by frame

/!\ For some keyboards (like mine) you need to press differents keys (like "AltGr"+"\" for me, but the goal is to input "\" and can't be changed atm /!\

Now it's time to setup CitraRNG.

You'll need Python 3.7 : https://www.python.org/downloads/
Once downloaded, take care to check the option "Add Python to PATH" it'll be necessary for the next step.
After, with a cmd with ADMIN PERMISSION, type "pip install pyzmq pyside2" : pyside2 should install.
Once everything installed, you just have to donwload CitraRNG "clone or download" => "Download ZIP"
Select the CitraRNG folder inside the CitraRNG-master folder and put it inside the "scripting" folder of your citra.

You're done for the setup !

To see if it works : Load your game (if you don't do so the script will crash) and click on "main.py" inside the citraRNG folder.

CitraRNG would load.

On the windows of the tool, select between Sun / Moon or Ultra-Sun / Ultra-Moon and click on connect.
Basic info should be displayed (like initial seed etc etc)

The auto-refresher allows frames to be updated (if it isn't the case, just change the delay, disconnect and reconenct. Should fix)

/!\ Don't put a refresh delay under 750. It'll crash way too fast. 2000 is the max. Also don't hesitate to pause your game from times to times. If the script updates TOO MUCH the frame count, the script will crash quite fast /!\

Troubleshoot :
- CitraRNG doesn't work and crash : Check to have installed the UPDATE of the game.
