import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-DUsdE6jN.js";var n=e(),r=[{title:`Ultra Sun and Ultra Moon RNGing on retail`,navDrawerTitle:`Retail RNG`,description:`RNG perfect Pokémon in Ultra Sun and Ultra Moon without using custom firmware.`,slug:`retail-usum-no-cfw`,category:`Ultra Sun and Ultra Moon`,section:`rng_technique`,variant:`retail`},{title:`Sun and Moon RNGing on retail`,navDrawerTitle:`Retail RNG`,description:`RNG perfect Pokémon in Sun and Moon without using custom firmware.`,slug:`retail-sm-no-cfw`,category:`Sun and Moon`,section:`rng_technique`,variant:`retail`,canonical:`retail-usum-no-cfw`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Calculator: `,(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`/mystic-timer`,children:`Mystic Timer`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`If you want to RNG a shiny Pokémon, know your TSV. Check your TSV via Battle Videos without Homebrew. Check `,(0,n.jsx)(r.a,{href:`https://www.reddit.com/r/SVExchange/wiki/keysave`,children:`here`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Having the Shiny Charm will increase your chances of hitting the shiny frame.`}),`
`,(0,n.jsx)(r.li,{children:`You may need a video camera to record the clock hands position at the beginning.`}),`
`,(0,n.jsx)(r.li,{children:`1% luck + 99% patience!`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Understanding mechanics`}),`
`,(0,n.jsx)(r.h3,{children:`"Frame" and "F"`}),`
`,(0,n.jsx)(r.p,{children:`In this guide, a row of 3DSRNGTool results is called a "Frame". If you trigger the battle or receive the Pokémon at a frame number, we say you hit the frame.`}),`
`,(0,n.jsx)(r.p,{children:`"F" refers to real time: 1F = 1/60 second, which is the notation in Gen 3 and in Mystic Timer.`}),`
`,(0,n.jsx)(r.h3,{children:`Timer setting`}),`
`,(0,n.jsx)(r.p,{children:`You can use any timer that can set two stages independently. The total time span = Pre-Timer Countdown (Part A) + Standby Time (Part B).`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Part A: Systematic error caused by loading the game, some edge frame advancements, and human reaction time.`}),`
`,(0,n.jsx)(r.li,{children:`Part B: Time from starting frame to target frame, varying according to the seed and target frame.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Set Up Mystic Timer`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Sun-Moon/No-CFW/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsx)(r.p,{children:`We are using Gen 3 Mode of Mystic Timer.`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Pre-Timer: in milliseconds. For example, 2133 means 2.133 seconds. For old 3DS users, the Pre-Timer should be around 3100. For new 3DS users, the Pre-Timer should be around 2500.`}),`
`,(0,n.jsx)(r.li,{children:`Target Frame: in F (1/60 seconds). For example, 3600 means 60 seconds. Mystic Timer may not be accurate since it's designed for Gen 3 consoles. This number is different from the target frame in 3DSRNGTool. We need to convert the Gen 7 frame into real time ("F") using 3DSRNGTool.`}),`
`,(0,n.jsx)(r.li,{children:`Lag: in milliseconds. This number adds to the total time.`}),`
`,(0,n.jsx)(r.li,{children:`Frame Hit: in F. When we do calibration, input the frame we actually hit and click update. A new Lag will be calculated.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`In summary, the total time span in seconds = (Pre-Timer + Lag) / 1000 + (Target Frame) / 60.`}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Preparation`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Prepare a Synchronize lead, some tool Pokémon to help you catch, and a bunch of balls.`}),`
`,(0,n.jsxs)(r.li,{children:[`Save in front of your target Pokémon or the person who will give you the Pokémon.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`For legends in Wormholes, stand as close as possible.`}),`
`,(0,n.jsx)(r.li,{children:`For Mystery Gifts, stand behind the delivery man in the first PC (Route 1) to minimize NPC numbers.`}),`
`,(0,n.jsx)(r.li,{children:`For wilds and roaming UBs, stand at specific spots with the least NPCs.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Set up 3DSRNGTool`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`In the upper right, input your game version and TSV. If you have the Shiny Charm, check the Shiny Charm box.`}),`
`,(0,n.jsxs)(r.li,{children:[`Set the Pokémon you are RNGing for.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`For Stationary or Wild encounters, choose the "Category" and select the "Pokémon".`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`In most cases, you don't need to change other settings, like delay. Some RNG noise can be absorbed in Pre-Timer.`}),`
`,(0,n.jsx)(r.li,{children:`If battling UBs in Ultra Wormholes for the first time, choose "UB (first Encounter)". It’s not recommended because of inconsistent delay.`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`For Mystery Gifts, change the "Event Setting" area according to the event you are RNGing.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`You can find the WonderCard files (a .wc7) `,(0,n.jsx)(r.a,{href:`https://github.com/projectpokemon/EventsGallery`,children:`here`}),` for the event you are RNGing. Drag-and-drop that into 3DSRNGTool to automatically populate the settings.`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 4: Load your game or soft-reset`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`L`}),` + `,(0,n.jsx)(r.code,{children:`R`}),` + `,(0,n.jsx)(r.code,{children:`Select`}),`/`,(0,n.jsx)(r.code,{children:`Start`}),` to soft reset the game.`]}),`
`,(0,n.jsx)(r.li,{children:`If you fail, start over from step 0. The initial seed changes when you restart the game.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 5: Find initial seed via continue screen clock needles`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Check `,(0,n.jsx)(r.a,{href:`/retail-usum-initial-seed-clocks`,children:`here`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`When you get one seed result, the tool will update it in the main window. The starting frame in the Time Calculator will also update (417/477 + number of frames you saw for clocks).`}),`
`,(0,n.jsx)(r.li,{children:`Double check your seed; most failures are from wrong seeds.`}),`
`,(0,n.jsx)(r.li,{children:`Do not enter your save yet.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 6: Find the target frame to hit`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Set up your filter preferences.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`"Safe Frame Only": This box appears for non-zero NPC cases. Recommended for initial pre-timer calibration.`}),`
`,(0,n.jsx)(r.li,{children:`"Blink Frame Only": This box appears for zero NPC cases. These frames can survive for around 1 second and are easy to hit but are rare.`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Set a reasonable Frame Range, right-click on the frame you want to hit, and click Set as Target Frame.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`The Gen 7 Main RNG Tool will update this simultaneously.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 7: Calculate waiting time and set up timer`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Go back to the Gen Main RNG Tool. In the bottom right, everything should be updated. Click Calculate.`}),`
`,(0,n.jsxs)(r.li,{children:[`A message box will pop up with "Set EonTimer for XXXXF. (YY.YYs) Z". Set XXXX as the Target Frame of Mystic Timer. `,(0,n.jsx)(r.code,{children:`Z`}),` is how long this target frame will exist. For Blink Frame, it should be above 30.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 8: Press A at the continue screen, start the timer at the same time`}),`
`,(0,n.jsxs)(r.p,{children:[`Wait at the final screen until the timer ends. `,(0,n.jsx)(r.strong,{children:`Stay focused!`})]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`For gifts or battles triggered by pressing `,(0,n.jsx)(r.code,{children:`A`}),`, proceed to the `,(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/blob/master/README.md#final-screen`,children:`final screen`}),` as soon as possible.`]}),`
`,(0,n.jsxs)(r.li,{children:[`For battles based on one step, open the `,(0,n.jsx)(r.code,{children:`X`}),` menu to freeze character movement.`]}),`
`,(0,n.jsxs)(r.li,{children:[`For wild encounters triggered by Honey, open the `,(0,n.jsx)(r.code,{children:`X`}),` menu and hover over the Bag.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 9: Trigger the battle or receive the Pokémon once the timer ends`}),`
`,(0,n.jsxs)(r.p,{children:[`Press `,(0,n.jsx)(r.code,{children:`A`}),` to trigger the Pokémon Generation.`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`If the final input is a step, quit the `,(0,n.jsx)(r.code,{children:`X`}),` menu ~2-3 seconds before the timer ends and push the circle pad hard when the timer ends.`]}),`
`,(0,n.jsx)(r.li,{children:`If you are doing wild encounters, use the Honey item. Don’t rush, since the RNG will stop in the Bag.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 10: If you didn't get the Pokémon`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Adjust the Pre-Timer and restart from step 3.`}),`
`,(0,n.jsxs)(r.li,{children:[`Check `,(0,n.jsx)(r.code,{children:`Using Stats`}),`, input the stats of the Pokémon you got. Check `,(0,n.jsx)(r.code,{children:`+-100 frames`}),` in `,(0,n.jsx)(r.code,{children:`RNG Info`}),`, click Calculate again to see the frames that have the spread you hit. If you can't find the Pokémon, ensure you got the initial seed right.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Check your pre-timer. Look at the `,(0,n.jsx)(r.code,{children:`Shift/F`}),` column.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`If the number is between -4F and 4F, you are doing well, just some bad luck. Start over to find a good seed and hit frame clusters with the same spread.`}),`
`,(0,n.jsxs)(r.li,{children:[`If the number is way off, like +12, you hit the frame too late. Adjust the timer two ways:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Decrease your pre-timer: `,(0,n.jsx)(r.code,{children:`+ 12 / 60 * (-1000) = -200`}),`, add that to your current Pre-Timer.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Put `,(0,n.jsx)(r.code,{children:`Target Frame + 12`}),` into Frame Hit, click "Set Timer", and Mystic Timer will do the math and subtract 200 from Lag.`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: The Pre-Timer calibration is key for Gen 7 main RNG.
You may need to recalibrate the Pre-Timer when changing the RNG target.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Additional notes`}),`
`,(0,n.jsx)(r.h3,{children:`QR method`}),`
`,(0,n.jsx)(r.p,{children:`This is a variation of the basic steps. Sometimes, we want to hit a high frame number for perfect IVs and shininess. We can consume many frames in Festival Plaza or Hau'Oli Shopping Mall first.`}),`
`,(0,n.jsx)(r.p,{children:`Then, check what frame you are on via the QR Scanner, since QR scanner needles also use numbers generated from main RNG.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Sun-Moon/No-CFW/QR-Scanner.png`,alt:`QR Scanner`})}),`
`,(0,n.jsxs)(r.p,{children:[`Go to `,(0,n.jsx)(r.code,{children:`Gen7 Main RNG Tool`}),`, check `,(0,n.jsx)(r.code,{children:`Locate Current Frame via QR`}),`, input the estimated current frame range, and input the needle sequence until you get a result.`]}),`
`,(0,n.jsx)(r.p,{children:`The Starting Frame of the Time Calculator will also be updated.`}),`
`,(0,n.jsxs)(r.p,{children:[`So for Step 4, press `,(0,n.jsx)(r.code,{children:`B`}),` to quit QR Scanner and start the timer at the same time.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: This method reduces system error of the timer with long time periods.
`})}),`
`,(0,n.jsx)(r.h3,{children:`Measuring NPC count`}),`
`,(0,n.jsx)(r.p,{children:`If results are far from your target, NPC count may need adjustments, especially for Xurkitree, Magearna, and wild standing spots.`}),`
`,(0,n.jsx)(r.p,{children:`To check NPC count, change it in the Time Calculator to see which number gives the closest actual time you waited.`}),`
`,(0,n.jsx)(r.p,{children:`Alternatively, wait a fixed amount of time and use the QR method to check how many frames were consumed.`}),`
`,(0,n.jsx)(r.h3,{children:`Xurkitree`}),`
`,(0,n.jsxs)(r.p,{children:[`The NPC number changes between 1 and 2 every 10.7 seconds due to wandering Xurkitree in the background. Use the `,(0,n.jsx)(r.code,{children:`X`}),` menu to freeze the varying NPC count. Here's the mindset:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Save while standing behind it for a longer time window for 1 NPC (~7 seconds).`}),`
`,(0,n.jsxs)(r.li,{children:[`Find the initial seed, load the game, and open the `,(0,n.jsx)(r.code,{children:`X`}),` menu as soon as possible.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Use QR needles to measure NPC count to ensure there is 1 NPC.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Close the `,(0,n.jsx)(r.code,{children:`X`}),` menu, wait several seconds, and reopen it to refresh the background situation.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Wait with the `,(0,n.jsx)(r.code,{children:`X`}),` menu open to get close to your target frame.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Quit the `,(0,n.jsx)(r.code,{children:`X`}),` menu and trigger the battle quickly to avoid NPC changes.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};