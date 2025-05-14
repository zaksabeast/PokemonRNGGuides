import{u as s,j as e}from"./index-DEWqpSh9.js";const a=[{title:"Ultra Sun and Ultra Moon SOS RNG",navDrawerTitle:"SOS RNG",description:"Learn how to RNG SOS battles in Ultra Sun and Ultra Moon for shinies, IVs, and hidden abilities.",slug:"retail-usum-sos",category:"Ultra Sun and Ultra Moon",tag:"cfw"},{title:"Sun and Moon SOS RNG",navDrawerTitle:"SOS RNG",description:"Learn how to RNG SOS battles in Sun and Moon for shinies, IVs, and hidden abilities.",slug:"retail-sm-sos",category:"Sun and Moon",tag:"cfw"}];function t(i){const n={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...i.components},{ShowIf:l}=n;return l||r("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"/misc-3ds-installing-pcalc",children:"PCalc Installation Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Recommended Reading"}),`
`,e.jsx(l,{slug:"/retail-usum-sos",children:e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://pastebin.com/W59vsi0H",children:"SOS Call Rates"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use Ctrl + F to quickly find Pokémon for SOS."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://gist.github.com/SciresM/a539739085e24af55dffdf443cb70eb2",children:"Encounter slots Ultra Sun"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://gist.github.com/SciresM/deecdcf5fc49fc8191a29d111643c6b6",children:"Encounter slots Ultra Moon"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Can Ctrl + F for Pokemon wanting to SOS."}),`
`]}),`
`]}),`
`]})}),`
`,e.jsx(l,{slug:"/retail-sm-sos",children:e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://pastebin.com/W59vsi0H",children:"SOS Call Rates"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use Ctrl + F to quickly find Pokémon for SOS."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://gist.github.com/RichardPaulAstley/42fbabe24250969f22d18fe8b919c520",children:"Encounter Slots for Sun"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Encounter slots for Moon are missing, but the differences are minimal. We'll update this guide later."}),`
`]}),`
`]}),`
`]})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The steps below are based on USUM, but SOS RNG for SM is exactly the same. Just follow this guide with your profile settings without worrying about minor differences.
`})}),`
`,e.jsx(n.h2,{children:"Understanding SOS RNG"}),`
`,e.jsx(n.p,{children:"SOS RNG involves two key processes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["G7 SFMT (32bit): The SOS RNG. This controls encounter slots, call success, and level.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This RNG allows you to target specific Pokémon, like that 1% Salamence."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Main RNG: Determines IVs, nature, gender, and PID (including shininess)."}),`
`]}),`
`,e.jsx(n.p,{children:"There are two types of SOS calls:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Two Pokémon on the field, and one faints."}),`
`,e.jsx(n.li,{children:"The last call failed, and you need an item to trigger another call (more stable and ideal for RNG)."}),`
`]}),`
`,e.jsx(n.p,{children:"SOS RNG is ideal for obtaining shiny Pokémon. A chain of 31 SOS calls improves your chances of hitting PID re-roll blocks (13-15 frames) if you have the Shiny Charm. SOS chain length also affects your chances of getting Hidden Abilities. You can target individual frames, but it’s less reliable."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Set up the SOS chain before starting RNG. Use low-health Pokémon and an Adrenaline Orb to maximize call success.
`})}),`
`,e.jsx(n.h2,{children:"Step 1: Set Up 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Enter your game version and TSV (",e.jsx(n.code,{children:"Start + Up"})," in PCalc will reveal TSV in the Game View window)."]}),`
`,e.jsx(n.li,{children:'Also, input the initial seed. Find it in the Game View window where it says "Init Seed".'}),`
`,e.jsxs(n.li,{children:["If you have the Shiny Charm, check the ",e.jsx(n.code,{children:"Shiny Charm"})," box."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Find the SOS Pokémon and Set Up the Misc. RNG Tool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Wander around or RNG the correct Pokémon for SOS."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For a guide to Gen 7 wild RNG, check ",e.jsx(n.a,{href:"/retail-usum-wild",children:"here"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Once you’re in an encounter, open the Tools menu in 3DSRNGTool and select Misc. RNG Tool. Set the RNG type to G7 SFMT (32bit) and go to the SOS tab."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Setup.png",alt:"Setup"})}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Open PCalc's Extended Game View by pressing ",e.jsx(n.code,{children:"B + Up"})," with the Game View open. Reset the SOS info in PCalc by pressing ",e.jsx(n.code,{children:"Down + B"}),"."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If the SOS Init Seed shows all 0's, press ",e.jsx(n.code,{children:"Down + B"})," during the first turn of battle to refresh it."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Find the SOS Init seed in PCalc’s window and input it into the Seed field in 3DSRNGTool."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Find the Call Rate and input it into 3DSRNGTool."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You can check the Call Rate ",e.jsx(n.a,{href:"https://pastebin.com/W59vsi0H",children:"here"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Complete the rest of the info in the SOS tab:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Set HP to the current caller's HP."}),`
`,e.jsx(n.li,{children:"Check the Adrenaline Orb box if used."}),`
`,e.jsx(n.li,{children:"Check the Weather box if applicable."}),`
`,e.jsx(n.li,{children:"If the current Pokémon has an Intimidate, Unnerve, or Pressure ability, check the Intimidate box."}),`
`,e.jsx(n.li,{children:"Ignore the Super Effective box; it may be less effective than previously assumed."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Check the Same Caller box as long as the same Pokémon is calling. If the original Pokémon faints, uncheck it.
`})}),`
`,e.jsxs(n.ol,{start:"7",children:[`
`,e.jsxs(n.li,{children:["Press Search and analyze the results.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You'll see several fields with the following meanings:"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Frame | Adv. | SOS | Rand#
SOS: call? new Pokémon? / lead / encounter slot / level / held item / IVs at 31 / Ability
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Frame: The SOS frame (starts at 0)."}),`
`,e.jsx(n.li,{children:"Adv.: Frames advanced after the turn (higher with successful calls)."}),`
`,e.jsxs(n.li,{children:["SOS: Information about the call success:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["First value: Will the Pokémon call for help? (",e.jsx(n.code,{children:"O"})," = Yes, ",e.jsx(n.code,{children:"X"})," = No)"]}),`
`,e.jsx(n.li,{children:"Second value: Will a new Pokémon appear?"}),`
`,e.jsx(n.li,{children:"Third value: Will the lead Pokémon's ability activate?"}),`
`,e.jsx(n.li,{children:"Fourth value: Encounter slot (weather slots, 1% chances, etc.)."}),`
`,e.jsx(n.li,{children:"Fifth value: Pokémon level."}),`
`,e.jsx(n.li,{children:"Sixth value: Held item."}),`
`,e.jsx(n.li,{children:"Seventh value: IVs bumped to 31."}),`
`,e.jsx(n.li,{children:"Eighth value: Ability (Normal vs Hidden)."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Rand#: The SOS Current Seed for that frame."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Some fields may not be used, but they should be self-explanatory.
`})}),`
`,e.jsx(n.h2,{children:"Step 3: Advancing SOS Frames"}),`
`,e.jsx(n.p,{children:"The ideal time to advance SOS frames is when your chain is longer and you have better odds, higher IVs, and the desired Pokémon."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Set up the SOS conditions (Leppa Berry, Harvest, Adrenaline Orb, Synchronize, etc.)."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Check the current SOS frame using PCalc's Extended Game View."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"After each battle turn, update the relevant info in 3DSRNGTool."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"In Misc. RNG Tool: SOS Length, SOS Frame, Last Call Failed, Same Caller."}),`
`,e.jsx(n.li,{children:"In the main window: Frame, Chain Length."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Results.png",alt:"Results"})}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"After entering the details, determine if the SOS call will succeed on the next turn:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If the first two values in the SOS field are ",e.jsx(n.code,{children:"O"}),", the call will succeed."]}),`
`,e.jsx(n.li,{children:"If not, use the Adv. field to determine the next possible call outcome."}),`
`,e.jsxs(n.li,{children:["If the previous call failed, make sure to check the ",e.jsx(n.code,{children:"Last Call Failed"})," box before searching again."]}),`
`,e.jsx(n.li,{children:'For successful calls, filter results by checking the Success Only box and pressing "Calculate".'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Adjusting.png",alt:"Adjusting"})}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Once you hit a frame with a successful SOS call (",e.jsx(n.code,{children:"O"})," for both values), use it to calibrate for the Main RNG delay."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You can advance SOS frames by using an Adrenaline Orb or by knocking out the non-caller Pokémon."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Compare the SOS Current Seed in PCalc to the Rand# in 3DSRNGTool for consistency. If the seeds don’t match, adjust the frame in both tools accordingly. SOS frame advances may not always follow expectations, especially with fishing SOS RNG.
`})}),`
`,e.jsx(n.h2,{children:"Step 4: Finding the Main RNG Delay"}),`
`,e.jsx(n.h3,{children:"Configure the Main RNG Tool in 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go to the Wild RNG tab and check the SOS Call box. Select the correct Location."}),`
`,e.jsx(n.li,{children:"Choose Day or Night based on your game’s time."}),`
`,e.jsx(n.li,{children:"Input the SOS Initial Seed (from Misc. RNG Tool) into the Seed box."}),`
`,e.jsx(n.li,{children:"Enter the current SOS Frame from Misc. RNG Tool into the Frame box."}),`
`,e.jsx(n.li,{children:"Set the correct Lead Pokémon if it has a relevant ability."}),`
`,e.jsx(n.li,{children:"Enter the Chain Length as shown in Misc. RNG Tool."}),`
`,e.jsx(n.li,{children:"If there’s weather in play, select the correct option for Weather."}),`
`]}),`
`,e.jsx(n.h3,{children:"Find the frame on the main RNG for the Pokémon you want"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Switch to the main 3DSRNGTool window and input your current main RNG frame as the starting frame."}),`
`,e.jsxs(n.li,{children:["The current main RNG frame can be found by pressing ",e.jsx(n.code,{children:"Start + Up"})," to bring up the Game View window in PCalc if it is not already visible."]}),`
`,e.jsxs(n.li,{children:["Then press ",e.jsx(n.code,{children:"Start + Select"})," to pause the game and use the number after ",e.jsx(n.code,{children:"Frame:"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/MainRNG-Setup.png",alt:"Main RNG Setup"})}),`
`,e.jsx(n.h3,{children:"Choose a random main RNG frame to attempt to hit for calibration"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Right-click on your chosen frame and choose "Set as Target Frame".'}),`
`,e.jsxs(n.li,{children:["After that, you can trigger the last input for the turn on that frame. If two Pokémon are on the field, the delay will be longer, and the final input will be hitting ",e.jsx(n.code,{children:"A"})," while targeting a Pokémon. If only one Pokémon is on the field, the delay will be shorter, and the final input will be hitting ",e.jsx(n.code,{children:"A"})," while hovering over ",e.jsx(n.code,{children:"Use"})," on the Adrenaline Orb."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsx(n.h3,{children:"Finding your hit frame"}),`
`,e.jsx(n.p,{children:"Once the Pokémon appears, you will need to find out the frame you actually hit by using the stats of the Pokémon that appeared."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Set the delay to 0 and search for the frame that was actually hit, adjusting based on the Shift/F value from the target frame."}),`
`,e.jsxs(n.li,{children:["Then, adjust the number in the ",e.jsx(n.code,{children:"Consider Delay"})," box to match the frame you pressed ",e.jsx(n.code,{children:"A"})," on."]}),`
`,e.jsx(n.li,{children:"If no results appear, the SOS frame inputted was likely incorrect. Double-check that everything matches between 3DSRNGTool and PCalc (especially SOS frame and Rand#) before trying again."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you are not finding the IVs for the Pokémon you got, double-check that the SOS frame was correct. An incorrect SOS frame will not show the correct results for the Pokémon obtained.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Frame from Pokémon's stats - Target Frame = Delay
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You can find out what the Pokémon's stats are by pressing Start + Left to bring up the Wild Pokémon view, and then switch which Pokémon to view with Select + Right.
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Delay.png",alt:"Delay"})}),`
`,e.jsx(n.h2,{children:"Step 5: Repeat to find consistent delay"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Repeat steps 3 and 4 a number of times, keeping track of your results."}),`
`,e.jsx(n.li,{children:"Once you begin hitting shiny frames in a block, you can attempt your actual target (aiming for maximum IVs and PID rolls at 31 chain)."}),`
`,e.jsxs(n.li,{children:["You can either go for your most common delay or choose the middle of them if they're consistent.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For example, if the delays are ",e.jsx(n.code,{children:"56, 58, 62"}),", 58 would be a safe choice, as it's likely to hit within the block of frames."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 6: Getting your SOS target"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'To find the desired SOS target, ensure you can hit your desired Encounter Slot, Sync, and/or HA. To do this, navigate to the "SOS2" tab and select the encounter slot of the Pokémon you want, whether you want Sync to be successful, and if you want HA.'}),`
`,e.jsxs(n.li,{children:['Fill out all relevant info on the "SOS" tab to determine which SOS frames will be successful.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You can filter for successful SOS frames by checking the ",e.jsx(n.code,{children:"Success Only"})," box."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`Now, search for your target by entering the information you're looking for in the filters and hitting "Calculate".`,`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You want ",e.jsx(n.code,{children:"OO"})," as the first two values for a successful SOS call."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you're aiming for a rare target like a 1% encounter, try manipulating success by using Intimidate as you get close.
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Target.png",alt:"Target"})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["When you've landed on your target SOS frame, it's time to find your main RNG target frame.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure you've filled out all the relevant information in the 3DSRNGTool main window."}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"Don't forget to set the delay for the correct SOS call type!"})}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Set up the filters for your target Pokémon.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Be aware of the IVs you can set, based on the seventh value in the Misc. RNG Tool (it should look something like VVXVVX)."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Filters.png",alt:"Filters"})}),`
`,e.jsxs(n.ol,{start:"6",children:[`
`,e.jsx(n.li,{children:"Set up your game to the point where it's ready for the final input."}),`
`,e.jsx(n.li,{children:"When close to your target, pause and advance your frames until you're in the middle of the group of frames, then enter the final input."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Final-Input.png",alt:"Final Input"})}),`
`,e.jsx(n.p,{children:"Congrats! You should now have the Pokémon you wanted."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/UltraSun-UltraMoon/SOS/Success.png",alt:"Success"})}),`
`,e.jsx(n.h2,{children:"If you did not obtain the Pokémon you wanted"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Double-check that all information is correct on both windows. Sometimes, the Initial Seed or SOS Frame might be incorrectly entered."}),`
`,e.jsxs(n.li,{children:["Restart the guide from the beginning, making sure to follow ",e.jsx(n.em,{children:"all"})," instructions carefully. Failing to get the correct Pokémon is usually a result of user error."]}),`
`,e.jsxs(n.li,{children:["Ensure you're using the correct delay for the type of SOS call. Each SOS call type may have multiple delays associated with it. As mentioned earlier, you can either go for your most common delay or choose the middle of them if they're consistent.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For example, if the delays are ",e.jsx(n.code,{children:"56, 58, 62"}),", 58 would be the safest choice, as it's likely to hit one of them in a block of frames."]}),`
`]}),`
`]}),`
`]})]})}function h(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}function r(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,a as frontmatter};
