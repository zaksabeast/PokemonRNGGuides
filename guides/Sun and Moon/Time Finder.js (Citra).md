/!\ Rough Draft as always /!\

This will allow to search for specific seeds and hit them as much as you want with Citra's RTC Mode.

Requirement :
- Citra + CitraRNG (Need to be configured well. Check the other guide for that)
- Zaksabeast's Time Finder (http://zaksabeast.github.io/Gen7TimeFinder.js/build/)
- Knowing your parameters

So first, this tool allows ONLY for Stationary Pokemon (Gift / Fossils / Legendaries are included ofc) but allows to search for ANY Spread w/ TSV

Open the tool and let's do a summary of every options : 
- Time offset : It's something Set by citra when you start your game. For almost everybody, the time offset is 17016. 
/!\ If your time offset is different, come to the discord for some support about this, since no "user" method has been done to verify it atm /!\
- System Ticks : This means for how long the system has been on. Same as Time offset, it SHOULD BE 0x2B942C5
/!\ Same if your System Ticks is different, come to the discord for some support /!\
- Start / End Time : Select the time you want to be checked for your spreads. Adjust it by the "difficulty" to get a seed. You'll get a LOT of results. But if you go for ONE spread of a FEW spreads, don't hesitate to take more than one day; YY/MM/DD format.
- Upper / Lower IVs limit : the tool will search for any spread inside this criterias. if you set it by 6IVs at Upper and 5IVs at Lower, it'll search for any 5IVs (minus the IVs undesired) spread to any 6IVs spread
- TSV : Your Trainer Shiny Value if you want it to be Shiny.

/!\ A Support for nature will be added. BUT will ignore ANY lead team /!\

Check if "Guaranteed 3IVs" if it's the case and hit "Generate"

The script will  take a few moments to find all your spreads.

You can check their frame by inputting the initial seed in 3DSRNGTool.

Once you have your selected frame, open Citra. You'll have to change the time of Citra to a FIXED and SET time.
For that you'll need to do on the main windows of Citra :
"Emulation" => "Configure" => "System" => Change Clock from "System Clock" to "Fixed Time"
You'll have to input the date / time given by the Time Finder.

Save the settings.

Open your game, load the save and load CitraRNG. If you have the right initial seed, congratulations.

///////!!!!!!!!!!!!!!!!!!!!\\\\\\\\\\ Before asking for help with wrong settings, if your initial seed is wrong, just close AND ADD / REMOVE ONE HOUR. It can happen and it's COMMON, since Citra does daylight savings. It'll fix almost all the issues with Initial Seed /////////////////!!!!!!!!!!!!!!!!!\\\\\\\\\\\\\
