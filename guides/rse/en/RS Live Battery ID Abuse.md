---
# Pokemon Ruby & Sapphire Live Battery ID Abuse
---

---
## Things You Will Need
---

- [VBA-RR](https://github.com/TASVideos/vba-rerecording/releases)
- Lua .dll files
    - [x86 lua.dll](https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0)
    - [x64 lua.dll](https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0)
- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder/releases)
- [The Ruby/Sapphire Lua Scripts for your language](http://pokerng.forumcommunity.net/?t=56443955)
- [Decimal to Hex Converter](https://www.binaryhexconverter.com/decimal-to-hex-converter)
- [runasdate (Optional)](https://runasdate.en.softonic.com/)

---
## How To RNG TID in Ruby & Sapphire
---

1. Decide on a Shiny Spread
    - If you have no intent on getting a shiny Pokemon and/or don't care about IVs on the given shiny, you may skip this step.
    - Open PokeFinder and click on "Gen 3 Tools". 
        - Then go to "IVs to PID". You should have a screen like this:

![IV To PID](https://snag.gy/bTkeXi.jpg)

    - Select your desired IVs and nature combo. Make sure that the methods that are outputted match the method for your target shiny Pokemon.

    - Put your desired TID in the ID box and note the SID it also gives.

2. Finding your Initial Seed

    - Typically for Ruby/Sapphire ID Abuse you would go to the Gen 3 IDs tab in PokeFinder. However, the Gen 3 IDs window only allows you to search through one date at a time. 

    - To save time we will use the Generation 3 Tools built into PokeFinder and a decimal to hex converter website.

    - Go to this [website](https://www.binaryhexconverter.com/decimal-to-hex-converter) and input your TID that you want. 
    
    - For an example, I want 02332 so I put in 02332 and I get 91C. 
    
    - Do the same for the SID listed in "PID From IVs" and convert it to hex as well. 
        - Since I want 46392, I input that and get B538. 

![Hex](https://snag.gy/EZkURB.jpg)

    - Go back in PokeFinder's Generation 3 Tools tab and open "PID to IVs". 
    
    - Combine the two hexadecimal combos and input them into PID to IVs.    - Make sure to put TID first, then SID. 

    - If you get a Method 1 Spread, you have a valid ID combo. If you get a non-method 1 spread, just add 1 to your SID and reconvert it to hex until you get a valid one.

    - Now take the seed it gives and go to "Generation 3 Tools" then "16-Bit Seed To Time". 
    
    - Enter the seed in the box and make sure the year is set to 2000.

    - Hit search and you will get some dates. 
    
    - Also, the seed will change to a 4-digit/lettered seed, which is your initial seed.

3. Hitting your Initial Seed

    - Either change your computer's date and time or open runasdate and enter the time from the "16-Bit Seed to Time" window. (Any of the results will work.) 
        - If you are using runasdate make sure you check "Immediate Mode".

    - Once loaded, pause the game and go to PokeFinder's "Gen 3 Stationary" window. 
    
    - Search for the IVs you got in the "PID to IVs" tool. 
        - The resulting frame is the frame you are aiming to hit.

    - Now start the game and advance to the screen where Prof. Birch says "Well, I'll be expecting you later." as shown below. 
    
    - Advance to the frame listed in "PID to IVs" and make save states along the way. 
        - You will more than likely miss your frame due to delays, so don't expect to hit your target the first time. 

![Frame](https://snag.gy/lte3bH.jpg)

4. Delay

    - Frames pass by between when you hit `A` and when the TID/SID is generated. 
        - You will need to find how many frames your delay is. 
        
    - Go to the "Gen 3 IDs" window in PokeFinder and input your Initial seed and the TID that was generated after you pressed `A` on your target frame.
     
    - The frame shown was the frame that you actually landed on. You can now adjust for your delay to hit your desired TID/SID. 
        - For example, if I wanted to hit frame 89103 but instead I hit Frame 89175, my delay was 72.
        - This means I need to hit `A` 72 Frames early. 
        
    - If your TID and SID are swapped press `A` one frame earlier than you had previously.


5. Enjoy your new TID!

Here is an example of a successful ID RNG:

![TID](https://snag.gy/yfJlxs.jpg)
        
