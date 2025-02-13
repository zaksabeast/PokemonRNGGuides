import{u as l,j as e}from"./index-CpyEa1Z6.js";const o={title:"SOS RNG",description:"One of the most challenging Gen 7 RNGs with fun rewards",slug:"retail-usum-sos",subCategory:"Custom Firmware"};function t(i){const n={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Recommended reading/references"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://pastebin.com/W59vsi0H",children:"SOS call rates"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Can Ctrl + F for Pokemon wanting to SOS."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://gist.github.com/SciresM/a539739085e24af55dffdf443cb70eb2",children:"Encounter slots Ultra Sun"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://gist.github.com/SciresM/deecdcf5fc49fc8191a29d111643c6b6",children:"Encounter slots Ultra Moon"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Can Ctrl + F for Pokemon wanting to SOS."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Regarding SOS RNG"}),`
`,e.jsx(n.p,{children:"SOS RNG consists of calls to two different processes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["G7 SFMT (32bit) (the SOS RNG) - Encounter slot, call success, level.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This is the RNG that will allow you to RNG that 1% Salamence."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Main RNG - IV spread, nature, gender and PID (shininess)."}),`
`]}),`
`,e.jsx(n.p,{children:'There are also two "types" of calls for help to consider within the SOS RNG:'}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Two Pokemon on the field and one is KO'd."}),`
`,e.jsxs(n.li,{children:["Last call failed and you need to use an item to get them to call for help.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This type of call is the more stable one for delays and the recommended one to use for RNG."}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.p,{children:["This RNG is best used to get shiny Pokemon since a chain of 31 will allow you to shoot for PID re-roll blocks of up to 13-15 frames if you have the ",e.jsx(n.code,{children:"Shiny Charm"}),". The SOS chain length has an affect on being able to get Hidden Abilities as well. You can shoot for individual frames but will not be likely to hit them."]}),`
`,e.jsx(n.p,{children:"With that noted, the two types of SOS calls will result in different delays. While progressing up to the desired chain length you can try to find the delay that is most consistent for each call type."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: It is recommended to set up for the SOS chaining first before starting the RNG process. Having the Pokemon on low health and the Adrenaline Orb used will increase the chances of an SOS call being successful.
`})}),`
`,e.jsx(n.h2,{children:"Step 1: Set Up 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["In the upper right, input your game version and your TSV.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["With PCalc, you can find your TSV by pressing ",e.jsx(n.code,{children:"Start + Up"})," to bring up the Game View window. Your TSV is listed by where it says ",e.jsx(n.code,{children:"YOUR TSV"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Also in the upper right, input the initial seed. You can find this by pressing ",e.jsx(n.code,{children:"Start + Up"})," to bring up the Game View window. The initial seed is found where it says ",e.jsx(n.code,{children:"Init Seed:"}),"."]}),`
`,e.jsxs(n.li,{children:["If you have the Shiny Charm check the ",e.jsx(n.code,{children:"Shiny Charm"})," box."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Find the SOS Pokemon and setup Misc. RNG Tool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["You can either wander around until you find the correct Pokemon to SOS or you can RNG it.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A guide to Gen 7 wild RNG can be found ",e.jsx(n.a,{href:"https://www.pokemonrng.com/retail-usum-wild",children:"here"}),"."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Once in the encounter open the "Tools" menu on 3DSRNGTool and select "Misc. RNG Tool". Switch the RNG type to "G7 SFMT (32bit)" and choose the "SOS" tab.'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Setup.png",alt:"Setup"})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["Within PCalc, you can open the Extended Game View by using ",e.jsx(n.code,{children:"B + Up"})," while the Game View window is open. Press ",e.jsx(n.code,{children:"Down + B"})," to reset the SOS information within PCalc.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If the SOS Init Seed is all 0's, you must press ",e.jsx(n.code,{children:"Down + B"})," during the first turn of battle to have the SOS information show correctly."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["In the bottom right of the PCalc window you will find the ",e.jsx(n.code,{children:"SOS Init seed"}),".",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"SOS Init seed"}),' - This goes in the box for "Seed" within the Misc. RNG Tool on 3DSRNGTool.']}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:['You will also want to find the info on "Call Rate" and enter that in for the Pokemon you are SOSing.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["This info can be found ",e.jsx(n.a,{href:"https://pastebin.com/W59vsi0H",children:"here"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Fill in rest of the info in the SOS tab as needed.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"HP should be set to what the current caller's HP level is."}),`
`,e.jsxs(n.li,{children:["Check ",e.jsx(n.code,{children:"Adrenaline Orb"})," if you have used an Adrenaline Orb."]}),`
`,e.jsxs(n.li,{children:["If there is weather effects such as rain check the ",e.jsx(n.code,{children:"Weather"})," box."]}),`
`,e.jsxs(n.li,{children:["If your Pokemon currently out has the Intimidate, Unnerve, or Pressure ability check the ",e.jsx(n.code,{children:"Intimidate"})," box."]}),`
`,e.jsx(n.li,{children:"Ignore the Super Effective checkbox. Based on recent discoveries, its effect could be more specific / less effective than what was figured out years ago."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The "Same Caller" box should be checked as long as the Pokemon that does the SOS call is the same as last turn. If it faints and the other Pokemon calls for help, then uncheck the box.
`})}),`
`,e.jsxs(n.ol,{start:"5",children:[`
`,e.jsxs(n.li,{children:[`Press "Search" button to see results and let's examine what we see.`,`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"On the Misc RNG Tool results window you will see a few different fields and the meaning of each will follow:"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Frame | Adv. | SOS | Rand#"})}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"SOS: call? new Pokemon? / lead / encounter slot / level / held item / IVs at 31 / Ability"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Frame - This is the SOS frame which starts at 0 and advances based on each turn."}),`
`,e.jsx(n.li,{children:"Adv. - This is the amount of frames that will advance after the turn (this will be higher when a successful call occurs)."}),`
`,e.jsxs(n.li,{children:["SOS - This field has multiple values separated by '/'.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The first value is for the Pokemon to call in.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A ",e.jsx(n.code,{children:"O"})," means it will call."]}),`
`,e.jsxs(n.li,{children:["A ",e.jsx(n.code,{children:"X"})," means it will not call."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["The second value is for the new Pokemon to appear.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A ",e.jsx(n.code,{children:"O"})," means a new Pokemon will appear."]}),`
`,e.jsxs(n.li,{children:["A ",e.jsx(n.code,{children:"X"})," means a new Pokemon will not appear."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["The third value is for the lead (Synchronize / Static / Magnetic / Pressure / Hustle / Vital Spirit / Cute Charm)",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"O"})," means ability for lead Pokemon will be a success."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"X"})," means failure for ability of lead Pokemon to work."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["The fourth value is for Encounter slots",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"W1 - Weather slot 1 (1%)"}),`
`,e.jsx(n.li,{children:"W2 - Weather slot 2 (10%)"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Slot 1-7: 1% / 1% / 1% / 10% / 10% / 10% / 67%"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"The fifth value is the Level"}),`
`,e.jsx(n.li,{children:"The sixth value is the held item"}),`
`,e.jsxs(n.li,{children:["The seventh value is the IVs being bumped",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["IVs that will be 31 show up as ",e.jsx(n.code,{children:"V"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["The eighth value is the Ability",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"NA = Normal Ability"}),`
`,e.jsx(n.li,{children:"HA = Hidden Ability"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Rand# - This will be the SOS Curr Seed for that specific SOS frame."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Some of these fields will be used in the guide and some will not but they should be self-explanatory.
`})}),`
`,e.jsx(n.h2,{children:"Step 3: Advancing SOS Frames"}),`
`,e.jsx(n.p,{children:'At this point you would be best off waiting until you have a longer SOS chain for better odds and increased IVs before trying your ideal target. This is a good opportunity to work on finding the delay for the two different "types" of SOS calls.'}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"First we will want to go ahead and get everything set up for your SOS such as Leppa Berry and Harvest, Adrenaline Orb, Sync, etc."}),`
`,e.jsx(n.li,{children:"You can find what SOS frame you are currently on using the Extended Game View window of PCalc."}),`
`,e.jsxs(n.li,{children:["After each battle turn, make sure to update all the relevant info in 3DSRNGTool based on what occured that turn.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'In Misc. RNG Tool: SOS "Length", SOS "Frame", "Last Call Failed", "Same Caller"'}),`
`,e.jsx(n.li,{children:'In main window: "Frame" (for current SOS frame), "Chain Length"'}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Results.png",alt:"Results"})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["After inputting all of the needed info you can now figure out if the SOS call will be successful or not for the upcoming SOS frames.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If the first two values shown in the SOS column are ",e.jsx(n.code,{children:"O"})," then the call will be successful."]}),`
`,e.jsx(n.li,{children:"If not, then you can tell which value you will land on next by looking at the Adv. field."}),`
`,e.jsxs(n.li,{children:["If your previous call failed make sure to check the ",e.jsx(n.code,{children:"Last Call Failed"})," field before searching again."]}),`
`,e.jsxs(n.li,{children:["To filter for what frames will be a successful call, you can check the ",e.jsx(n.code,{children:"Success Only"}),' box and then "Calculate".']}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Adjusting.png",alt:"Adjusting"})}),`
`,e.jsxs(n.ol,{start:"5",children:[`
`,e.jsxs(n.li,{children:["Once your current SOS frame will trigger an encounter on the next SOS call (has ",e.jsx(n.code,{children:"O"})," for first two values) you will want to use it to calibrate for the main RNG delay.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You can advance SOS frames by using an Adrenaline Orb (this has no effect if already used one and item will not be consumed) or by knocking out the non-caller Pokemon."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Pay attention to the SOS Current Seed shown in PCalc and compare to what it should be in the Misc. RNG Tool window (Rand#) for the SOS frame you are on.

Sometimes SOS frames do not advance as predicted and will throw off results if not corrected. If the SOS Current Seed does not match, then find the SOS frame in Misc. RNG Tool that matches the SOS Current Seed that PCalc shows. Adjust the SOS frame as needed in both Misc. RNG Tool and the main window.

As of this time, fishing SOS RNG is not as accurate as wild SOS RNG and almost every time will result in SOS frame advances not being predictable.
`})}),`
`,e.jsx(n.h2,{children:"Step 4: Finding the Main RNG delay"}),`
`,e.jsx(n.h3,{children:"Fill out the main window of 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Choose the "Wild RNG" tab and check the "SOS Call" box. Choose the correct "Location".'}),`
`,e.jsx(n.li,{children:'Make sure to select "Day" or "Night" depending on the time in your game.'}),`
`,e.jsx(n.li,{children:'In "Wild Encounter Setting" the "Seed" box is for the Initial SOS seed. This should be the same seed as the SOS Initial seed in Misc. RNG Tool.'}),`
`,e.jsx(n.li,{children:'In "Wild Encounter Setting" the "Frame" box is for your current SOS frame. This should be the same frame as the SOS "Starting Frame" in Misc. RNG Tool.'}),`
`,e.jsx(n.li,{children:'Choose the correct dropdown for the "Lead" box if you have a Pokemon in the lead with one of those abilities.'}),`
`,e.jsx(n.li,{children:'"Chain Length" is for your current SOS chain length. This should be the same number as the SOS "Length" in Misc. RNG Tool.'}),`
`,e.jsx(n.li,{children:'Choose the correct dropdown for "Weather" if there are weather affects in play for the battle.'}),`
`]}),`
`,e.jsx(n.h3,{children:"Find the frame on the main RNG for the Pokemon you want"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Switch to the main 3DSRNGTool window and input your current main RNG frame as the starting frame."}),`
`,e.jsxs(n.li,{children:["The current main RNG frame can be found by pressing ",e.jsx(n.code,{children:"Start + Up"})," to bring up the Game View window in PCalc if it is not already up."]}),`
`,e.jsxs(n.li,{children:["Then press ",e.jsx(n.code,{children:"Start + Select"})," to pause the game and use the number after ",e.jsx(n.code,{children:"Frame:"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/MainRNG-Setup.png",alt:"Main RNG Setup"})}),`
`,e.jsx(n.h3,{children:"Choose a random main RNG frame to attempt to hit for calibration"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Right click on your chosen frame and choose "Set as Target Frame".'}),`
`,e.jsxs(n.li,{children:["After that you can then trigger the last input for the turn on that frame. - If two Pokemon are on the field the delay will be longer and the final input will be hitting ",e.jsx(n.code,{children:"A"})," while targeting a Pokemon. - If only one Pokemon is on the field the delay will be shorter and the final input will be hitting ",e.jsx(n.code,{children:"A"})," while hovering over ",e.jsx(n.code,{children:"Use"})," on the Adrenaline Orb."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsx(n.h3,{children:"Finding your hit frame"}),`
`,e.jsx(n.p,{children:"Once the Pokemon appears you will need to find out the frame you actually hit by using the stats of the Pokemon that appeared."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"You can do this by setting the delay to 0 and searching for the frame that was actually hit and adjusting based on the Shift/F value from the target frame."}),`
`,e.jsxs(n.li,{children:["Then adjust the number in the ",e.jsx(n.code,{children:"Consider Delay"})," box to get the frame you actually hit to match the frame you pressed ",e.jsx(n.code,{children:"A"})," on."]}),`
`,e.jsx(n.li,{children:"If there are no results, then the SOS frame inputted was not correct. Double check that everything matches between 3DSRNGTool and PCalc (especially SOS frame and Rand#) before trying again."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you are not finding the IVs for the Pokemon you got, double check that SOS frame was correct. Not having the correct SOS frame in the main window will not show the correct results for the Pokemon you got.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Frame from Pokemon's stats - Target Frame = Delay
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You can find out what the Pokemon's stats are by pressing Start + Left to bring up the Wild Pokemon view and then switch which Pokemon to view with Select + Right.
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Delay.png",alt:"Delay"})}),`
`,e.jsx(n.h2,{children:"Step 5: Repeat to find consistent delay"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Repeat steps 3 and 4 a number of times and keep track of your results."}),`
`,e.jsx(n.li,{children:"Once you get to a point where you are getting more shiny frames in a block you can try for your actual target (might as well max IVs and PID rolls out at 31 chain)"}),`
`,e.jsx(n.li,{children:"You can either go for your most common delay, or choose the middle of them if they're consistent."}),`
`,e.jsxs(n.li,{children:["For example if the delays are ",e.jsx(n.code,{children:"56, 58, 62"})," 58 would be safe to use since in a block of frames there's a good chance will hit one of them."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 6: Getting your SOS target"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'To find the desired SOS target you will want to make sure you can hit your desired Encounter Slot, Sync and/or HA. To do this you will want to navigate to the "SOS2" tab and select the encounter slot of the Pokemon you are wanting, whether you want sync to be successful or not, and if you want HA.'}),`
`,e.jsxs(n.li,{children:['Enter in all the relevant info on the "SOS" tab to determine what SOS frames will be successful.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You can filter for successful SOS frames by checking the ",e.jsx(n.code,{children:"Success Only"})," box."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:['Now you can search for your target by entering what you are looking for in the filters and hitting "Calculate".',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You will want ",e.jsx(n.code,{children:"OO"})," as the first two values for the SOS call to be successful."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you are going for a hard target such as a 1% encounter you can try to play with some frames as you get close to manipulate success by using Intimidate.
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Target.png",alt:"Target"})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["When you've landed on your target SOS frame it is now time to find your main RNG target frame.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You will want to make sure you have all the relevant info filled out in the 3DSRNGTool main window."}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Don't forget to set the delay for the right SOS call type!"})}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Then set up the filters for your target Pokemon.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Be aware of the IVs you can set for this based on the seventh value in the Misc. RNG Tool (should look something like VVXVVX)."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Filters.png",alt:"Filters"})}),`
`,e.jsxs(n.ol,{start:"6",children:[`
`,e.jsx(n.li,{children:"Set up your game to the point that it is ready for the final input."}),`
`,e.jsx(n.li,{children:"When you get close to your target pause and advance your frames until you are in the middle of the bunch of frames and enter the final input."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Final-Input.png",alt:"Final Input"})}),`
`,e.jsx(n.p,{children:"Congrats! You should now have the Pokemon you wanted."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Success.png",alt:"Success"})}),`
`,e.jsx(n.h2,{children:"If you did not obtain the Pokemon you wanted"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Double check that all info is correct on the two windows. Sometimes the Initial Seed is not typed in correctly, or SOS Frame is not correct."}),`
`,e.jsxs(n.li,{children:["Restart the guide from the beginning and make sure to follow ",e.jsx(n.em,{children:"all"})," instructions given. Not getting the correct Pokemon is usually a result of user error."]}),`
`,e.jsxs(n.li,{children:["Make sure you are using the correct delay based on the type of SOS call. Additionally, each type of SOS call may have multiple delays associated with it. As mentioned previously in the guide, you can either go for your most common delay, or choose the middle of them if they're consistent.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For example if the delays are ",e.jsx(n.code,{children:"56, 58, 62"})," 58 would be safe to use since in a block of frames there's a good chance will hit one of them."]}),`
`]}),`
`]}),`
`]})]})}function r(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{r as default,o as frontmatter};
