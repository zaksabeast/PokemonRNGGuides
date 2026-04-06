import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CndXGoE5.js";var n=e(),r=[{title:`Ultra Sun and Ultra Moon SOS RNG`,navDrawerTitle:`SOS RNG`,description:`Learn how to RNG SOS battles in Ultra Sun and Ultra Moon for shinies, IVs, and hidden abilities.`,slug:`retail-usum-sos`,category:`Ultra Sun and Ultra Moon`,section:`pokemon_rng`,variant:`cfw-emu`},{title:`Sun and Moon SOS RNG`,navDrawerTitle:`SOS RNG`,description:`Learn how to RNG SOS battles in Sun and Moon for shinies, IVs, and hidden abilities.`,slug:`retail-sm-sos`,category:`Sun and Moon`,section:`pokemon_rng`,variant:`cfw-emu`,canonical:`retail-usum-sos`}];function i(e){let r={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components},{ShowIf:i}=r;return i||o(`ShowIf`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`A 3DS with PCalc (`,(0,n.jsx)(r.a,{href:`/misc-3ds-installing-pcalc`,children:`PCalc Installation Guide`}),`)`]}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Recommended Reading`}),`
`,(0,n.jsx)(i,{slug:`/retail-usum-sos`,children:(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/sos-call-rates`,children:`SOS Call Rates`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://gist.github.com/SciresM/a539739085e24af55dffdf443cb70eb2`,children:`Encounter slots Ultra Sun`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://gist.github.com/SciresM/deecdcf5fc49fc8191a29d111643c6b6`,children:`Encounter slots Ultra Moon`})}),`
`]})}),`
`,(0,n.jsx)(i,{slug:`/retail-sm-sos`,children:(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/sos-call-rates`,children:`SOS Call Rates`})}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`https://gist.github.com/RichardPaulAstley/42fbabe24250969f22d18fe8b919c520`,children:`Encounter Slots for Sun`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Encounter slots for Moon are missing, but the differences are minimal. We'll update this guide later.`}),`
`]}),`
`]}),`
`]})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: The steps below are based on USUM, but SOS RNG for SM is exactly the same. Just follow this guide with your profile settings without worrying about minor differences.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Understanding SOS RNG`}),`
`,(0,n.jsx)(r.p,{children:`SOS RNG involves two key processes:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`G7 SFMT (32bit): The SOS RNG. This controls encounter slots, call success, and level.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`This RNG allows you to target specific Pokémon, like that 1% Salamence.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Main RNG: Determines IVs, nature, gender, and PID (including shininess).`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`There are two types of SOS calls:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Two Pokémon on the field, and one faints.`}),`
`,(0,n.jsx)(r.li,{children:`The last call failed, and you need an item to trigger another call (more stable and ideal for RNG).`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`SOS RNG is ideal for obtaining shiny Pokémon. A chain of 31 SOS calls improves your chances of hitting PID re-roll blocks (13-15 frames) if you have the Shiny Charm. SOS chain length also affects your chances of getting Hidden Abilities. You can target individual frames, but it’s less reliable.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Set up the SOS chain before starting RNG. Use low-health Pokémon and an Adrenaline Orb to maximize call success.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Set Up 3DSRNGTool`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Enter your game version and TSV (`,(0,n.jsx)(r.code,{children:`Start + Up`}),` in PCalc will reveal TSV in the Game View window).`]}),`
`,(0,n.jsx)(r.li,{children:`Also, input the initial seed. Find it in the Game View window where it says "Init Seed".`}),`
`,(0,n.jsxs)(r.li,{children:[`If you have the Shiny Charm, check the `,(0,n.jsx)(r.code,{children:`Shiny Charm`}),` box.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Find the SOS Pokémon and Set Up the Misc. RNG Tool`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Wander around or RNG the correct Pokémon for SOS.`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`For a guide to Gen 7 wild RNG, check `,(0,n.jsx)(r.a,{href:`/retail-usum-wild`,children:`here`}),`.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Once you’re in an encounter, open the Tools menu in 3DSRNGTool and select Misc. RNG Tool. Set the RNG type to G7 SFMT (32bit) and go to the SOS tab.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/SOS/Setup.png`,alt:`Setup`})}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Open PCalc's Extended Game View by pressing `,(0,n.jsx)(r.code,{children:`B + Up`}),` with the Game View open. Reset the SOS info in PCalc by pressing `,(0,n.jsx)(r.code,{children:`Down + B`}),`.`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`If the SOS Init Seed shows all 0's, press `,(0,n.jsx)(r.code,{children:`Down + B`}),` during the first turn of battle to refresh it.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Find the SOS Init seed in PCalc’s window and input it into the Seed field in 3DSRNGTool.`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Find the Call Rate and input it into 3DSRNGTool.`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`You can check the Call Rate `,(0,n.jsx)(r.a,{href:`https://pastebin.com/W59vsi0H`,children:`here`}),`.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Complete the rest of the info in the SOS tab:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Set HP to the current caller's HP.`}),`
`,(0,n.jsx)(r.li,{children:`Check the Adrenaline Orb box if used.`}),`
`,(0,n.jsx)(r.li,{children:`Check the Weather box if applicable.`}),`
`,(0,n.jsx)(r.li,{children:`If the current Pokémon has an Intimidate, Unnerve, or Pressure ability, check the Intimidate box.`}),`
`,(0,n.jsx)(r.li,{children:`Ignore the Super Effective box; it may be less effective than previously assumed.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Check the Same Caller box as long as the same Pokémon is calling. If the original Pokémon faints, uncheck it.
`})}),`
`,(0,n.jsxs)(r.ol,{start:`7`,children:[`
`,(0,n.jsxs)(r.li,{children:[`Press Search and analyze the results.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`You'll see several fields with the following meanings:`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Frame | Adv. | SOS | Rand#
SOS: call? new Pokémon? / lead / encounter slot / level / held item / IVs at 31 / Ability
`})}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Frame: The SOS frame (starts at 0).`}),`
`,(0,n.jsx)(r.li,{children:`Adv.: Frames advanced after the turn (higher with successful calls).`}),`
`,(0,n.jsxs)(r.li,{children:[`SOS: Information about the call success:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`First value: Will the Pokémon call for help? (`,(0,n.jsx)(r.code,{children:`O`}),` = Yes, `,(0,n.jsx)(r.code,{children:`X`}),` = No)`]}),`
`,(0,n.jsx)(r.li,{children:`Second value: Will a new Pokémon appear?`}),`
`,(0,n.jsx)(r.li,{children:`Third value: Will the lead Pokémon's ability activate?`}),`
`,(0,n.jsx)(r.li,{children:`Fourth value: Encounter slot (weather slots, 1% chances, etc.).`}),`
`,(0,n.jsx)(r.li,{children:`Fifth value: Pokémon level.`}),`
`,(0,n.jsx)(r.li,{children:`Sixth value: Held item.`}),`
`,(0,n.jsx)(r.li,{children:`Seventh value: IVs bumped to 31.`}),`
`,(0,n.jsx)(r.li,{children:`Eighth value: Ability (Normal vs Hidden).`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Rand#: The SOS Current Seed for that frame.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Some fields may not be used, but they should be self-explanatory.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Advancing SOS Frames`}),`
`,(0,n.jsx)(r.p,{children:`The ideal time to advance SOS frames is when your chain is longer and you have better odds, higher IVs, and the desired Pokémon.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Set up the SOS conditions (Leppa Berry, Harvest, Adrenaline Orb, Synchronize, etc.).`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Check the current SOS frame using PCalc's Extended Game View.`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`After each battle turn, update the relevant info in 3DSRNGTool.`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`In Misc. RNG Tool: SOS Length, SOS Frame, Last Call Failed, Same Caller.`}),`
`,(0,n.jsx)(r.li,{children:`In the main window: Frame, Chain Length.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/SOS/Results.png`,alt:`Results`})}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`After entering the details, determine if the SOS call will succeed on the next turn:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`If the first two values in the SOS field are `,(0,n.jsx)(r.code,{children:`O`}),`, the call will succeed.`]}),`
`,(0,n.jsx)(r.li,{children:`If not, use the Adv. field to determine the next possible call outcome.`}),`
`,(0,n.jsxs)(r.li,{children:[`If the previous call failed, make sure to check the `,(0,n.jsx)(r.code,{children:`Last Call Failed`}),` box before searching again.`]}),`
`,(0,n.jsx)(r.li,{children:`For successful calls, filter results by checking the Success Only box and pressing "Calculate".`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/SOS/Adjusting.png`,alt:`Adjusting`})}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Once you hit a frame with a successful SOS call (`,(0,n.jsx)(r.code,{children:`O`}),` for both values), use it to calibrate for the Main RNG delay.`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`You can advance SOS frames by using an Adrenaline Orb or by knocking out the non-caller Pokémon.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Compare the SOS Current Seed in PCalc to the Rand# in 3DSRNGTool for consistency. If the seeds don’t match, adjust the frame in both tools accordingly. SOS frame advances may not always follow expectations, especially with fishing SOS RNG.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 4: Finding the Main RNG Delay`}),`
`,(0,n.jsx)(r.h3,{children:`Configure the Main RNG Tool in 3DSRNGTool`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Go to the Wild RNG tab and check the SOS Call box. Select the correct Location.`}),`
`,(0,n.jsx)(r.li,{children:`Choose Day or Night based on your game’s time.`}),`
`,(0,n.jsx)(r.li,{children:`Input the SOS Initial Seed (from Misc. RNG Tool) into the Seed box.`}),`
`,(0,n.jsx)(r.li,{children:`Enter the current SOS Frame from Misc. RNG Tool into the Frame box.`}),`
`,(0,n.jsx)(r.li,{children:`Set the correct Lead Pokémon if it has a relevant ability.`}),`
`,(0,n.jsx)(r.li,{children:`Enter the Chain Length as shown in Misc. RNG Tool.`}),`
`,(0,n.jsx)(r.li,{children:`If there’s weather in play, select the correct option for Weather.`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Find the frame on the main RNG for the Pokémon you want`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Switch to the main 3DSRNGTool window and input your current main RNG frame as the starting frame.`}),`
`,(0,n.jsxs)(r.li,{children:[`The current main RNG frame can be found by pressing `,(0,n.jsx)(r.code,{children:`Start + Up`}),` to bring up the Game View window in PCalc if it is not already visible.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Then press `,(0,n.jsx)(r.code,{children:`Start + Select`}),` to pause the game and use the number after `,(0,n.jsx)(r.code,{children:`Frame:`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/SOS/MainRNG-Setup.png`,alt:`Main RNG Setup`})}),`
`,(0,n.jsx)(r.h3,{children:`Choose a random main RNG frame to attempt to hit for calibration`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Right-click on your chosen frame and choose "Set as Target Frame".`}),`
`,(0,n.jsxs)(r.li,{children:[`After that, you can trigger the last input for the turn on that frame. If two Pokémon are on the field, the delay will be longer, and the final input will be hitting `,(0,n.jsx)(r.code,{children:`A`}),` while targeting a Pokémon. If only one Pokémon is on the field, the delay will be shorter, and the final input will be hitting `,(0,n.jsx)(r.code,{children:`A`}),` while hovering over `,(0,n.jsx)(r.code,{children:`Use`}),` on the Adrenaline Orb.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/SOS/Final-Screen.png`,alt:`Final Screen`})}),`
`,(0,n.jsx)(r.h3,{children:`Finding your hit frame`}),`
`,(0,n.jsx)(r.p,{children:`Once the Pokémon appears, you will need to find out the frame you actually hit by using the stats of the Pokémon that appeared.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Set the delay to 0 and search for the frame that was actually hit, adjusting based on the Shift/F value from the target frame.`}),`
`,(0,n.jsxs)(r.li,{children:[`Then, adjust the number in the `,(0,n.jsx)(r.code,{children:`Consider Delay`}),` box to match the frame you pressed `,(0,n.jsx)(r.code,{children:`A`}),` on.`]}),`
`,(0,n.jsx)(r.li,{children:`If no results appear, the SOS frame inputted was likely incorrect. Double-check that everything matches between 3DSRNGTool and PCalc (especially SOS frame and Rand#) before trying again.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: If you are not finding the IVs for the Pokémon you got, double-check that the SOS frame was correct. An incorrect SOS frame will not show the correct results for the Pokémon obtained.
`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Frame from Pokémon's stats - Target Frame = Delay
`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: You can find out what the Pokémon's stats are by pressing Start + Left to bring up the Wild Pokémon view, and then switch which Pokémon to view with Select + Right.
`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/SOS/Delay.png`,alt:`Delay`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 5: Repeat to find consistent delay`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Repeat steps 3 and 4 a number of times, keeping track of your results.`}),`
`,(0,n.jsx)(r.li,{children:`Once you begin hitting shiny frames in a block, you can attempt your actual target (aiming for maximum IVs and PID rolls at 31 chain).`}),`
`,(0,n.jsxs)(r.li,{children:[`You can either go for your most common delay or choose the middle of them if they're consistent.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`For example, if the delays are `,(0,n.jsx)(r.code,{children:`56, 58, 62`}),`, 58 would be a safe choice, as it's likely to hit within the block of frames.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 6: Getting your SOS target`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`To find the desired SOS target, ensure you can hit your desired Encounter Slot, Sync, and/or HA. To do this, navigate to the "SOS2" tab and select the encounter slot of the Pokémon you want, whether you want Sync to be successful, and if you want HA.`}),`
`,(0,n.jsxs)(r.li,{children:[`Fill out all relevant info on the "SOS" tab to determine which SOS frames will be successful.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`You can filter for successful SOS frames by checking the `,(0,n.jsx)(r.code,{children:`Success Only`}),` box.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Now, search for your target by entering the information you're looking for in the filters and hitting "Calculate".`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`You want `,(0,n.jsx)(r.code,{children:`OO`}),` as the first two values for a successful SOS call.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: If you're aiming for a rare target like a 1% encounter, try manipulating success by using Intimidate as you get close.
`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/SOS/Target.png`,alt:`Target`})}),`
`,(0,n.jsxs)(r.ol,{start:`4`,children:[`
`,(0,n.jsxs)(r.li,{children:[`When you've landed on your target SOS frame, it's time to find your main RNG target frame.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Make sure you've filled out all the relevant information in the 3DSRNGTool main window.`}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.strong,{children:`Don't forget to set the delay for the correct SOS call type!`})}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Set up the filters for your target Pokémon.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Be aware of the IVs you can set, based on the seventh value in the Misc. RNG Tool (it should look something like VVXVVX).`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/SOS/Filters.png`,alt:`Filters`})}),`
`,(0,n.jsxs)(r.ol,{start:`6`,children:[`
`,(0,n.jsx)(r.li,{children:`Set up your game to the point where it's ready for the final input.`}),`
`,(0,n.jsx)(r.li,{children:`When close to your target, pause and advance your frames until you're in the middle of the group of frames, then enter the final input.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/SOS/Final-Input.png`,alt:`Final Input`})}),`
`,(0,n.jsx)(r.p,{children:`Congrats! You should now have the Pokémon you wanted.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/SOS/Success.png`,alt:`Success`})}),`
`,(0,n.jsx)(r.h2,{children:`If you did not obtain the Pokémon you wanted`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Double-check that all information is correct on both windows. Sometimes, the Initial Seed or SOS Frame might be incorrectly entered.`}),`
`,(0,n.jsxs)(r.li,{children:[`Restart the guide from the beginning, making sure to follow `,(0,n.jsx)(r.em,{children:`all`}),` instructions carefully. Failing to get the correct Pokémon is usually a result of user error.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Ensure you're using the correct delay for the type of SOS call. Each SOS call type may have multiple delays associated with it. As mentioned earlier, you can either go for your most common delay or choose the middle of them if they're consistent.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`For example, if the delays are `,(0,n.jsx)(r.code,{children:`56, 58, 62`}),`, 58 would be the safest choice, as it's likely to hit one of them in a block of frames.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};