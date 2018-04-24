# How To Do Live Battery Stationary RNG Abuse (Ruby & Sapphire EmuAbuse)

## Things You Will Need 
- [VBA-RR](https://github.com/TASVideos/vba-rerecording/releases)
- Lua .dll files
     - [x86 lua.dll](https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0)
     - [x64 lua.dll](https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0)
- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder/releases)
- [The Ruby/Sapphire Lua Scripts for your language](http://pokerng.forumcommunity.net/?t=56443955)
- [runasdate (Optional)](https://runasdate.en.softonic.com/)
- A Save File (ID Abused)

## Reasons To Do RS Stationary Live Battery RNG
With the advent of Ultra Sun & Ultra Moon RNG, you are able to get many Shiny Legendary Pokemon with almost any good spread. However, the spreads take a very large amount of time to obtain. Generation 3 RNG saves more time thanks to VBA having the ability to speed up to 1000%. 
In addition, certain Pokemon have access to tutor moves not available in future Generations, such as Mimic, Seismic Toss and Counter.

## Things To Know
This guide only applies to Ruby and Sapphire RNG. Fire Red and Leaf Green have random seeding and Emerald will always have the initial seed of 0 unless you didn't Soft Reset or turn off the game. Also, spreads are limited due to the limited amount of valid PID/IV combos. You can read about PID generation more in-depth [here](https://www.smogon.com/ingame/rng/pid_iv_creation).
Because of the limited amount of PIDs that are linked with a good IV spread, it is recommended that you attempt an ID abuse before attempting to get a Shiny 5IV Pokemon. (Or any specific Shiny/IV combo)

## How To Do RS Stationary Live Battery RNG Abuse
1.Find your spread
           - Select a spread in PokeFinder. Go to Gen 3 Stationary and click the searcher tab. Insert your desired spread and see what shows up. ![search](https://snag.gy/ec6wP4.jpg)
           - Input your chosen spread to get the seed and PID. Make sure it says Method 1!
2.Getting your Initial Seed
          - The seed you got from that screen was simply the seed you must hit when you press A on encounter. To get your initial seed, go to 3rd Gen Tools and hit Seed To Time. Copy and paste the seed into the highlighted bar. 
          
![Seed To Time](https://snag.gy/N6RZkM.jpg)
            
- This will give you your initial seed and the date you need to run the Ruby and Sapphire game on.

3.Finding the Frame to hit
            - On the screen of PokeFinder below, enter your initial seed and spread. Make sure that it is set to search Method 1. It should look something like this:
            
![M1](https://snag.gy/mQuEG8.jpg)
- Hit Generate and get results. If you don't get a result, try extending the max results.
            
4.Hitting the Initial Seed
            - Open runasdate (or change your computer clock) and set the date to one listed in Seed To Time. Set up the screen just like how it is shown below: 

![runasdate](https://snag.gy/Fw7Xk9.jpg)

- Note that (unlike Generations 4 and 5) only the hours and minutes matter for hitting the initial seed.
- Hit run and you will open VBA-RR.

5.Finding Delay
            - Go to the final screen before encountering the target Pokemon. Now, make a save state and note what frame you are on. Hit A and enter the encounter. Run the lua script, and get the IVs of the Pokemon. 

![IVS](https://snag.gy/wpUMTv.jpg)

- Now, open a new PokeFinder and insert your initial seed and IVS. 

![Finder](https://snag.gy/dVAqKe.jpg)
            - Since I hit A on Frame 89016, that means 54 Frames went by between my last input (hitting A) and the IVs and PID being generated. 
            - Therefore, to hit my 31/2/31/31/31/31 Modest spread, I must hit 180124.
6.Advance Frames
            - Advance frames, paying attention to the frame counts. I recommend making a save state every 20000 frames or so, just in case. 
7.Enjoy your new Pokemon!
            Catch your Pokemon! (Make sure to make a save state)
            
 ![Regice](https://snag.gy/Rs2qYH.jpg)
