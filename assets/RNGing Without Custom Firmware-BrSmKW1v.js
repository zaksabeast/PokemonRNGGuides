import{u as r,j as e}from"./index-NUjML0_o.js";const o={title:"RNGing without Custom Firmware",description:"Get your perfect Pokemon without custom firmware",slug:"retail-usum-no-cfw",subCategory:"Retail"};function t(i){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Calculator: ",e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})]}),`
`,e.jsxs(n.li,{children:["Timer: Any two-stage timer",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.dropbox.com/s/tqf13ht2f4bxt66/EonTimer-1_6.zip?dl=0#download",children:"EonTimer 1.6"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://emtimer.mizdra.net/SimpleTimer",children:"Emtimer"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.dropbox.com/s/aurp9y34j5rdbhv/ZomgTimer-V2_21.jar#download",children:"ZomgTimer 2.21"})}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["If you want to RNG a shiny Pokemon",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Know your TSV. You can check your TSV via Battle Videos without Homebrew. Check ",e.jsx(n.a,{href:"https://www.reddit.com/r/SVExchange/wiki/keysave",children:"here"})]}),`
`,e.jsx(n.li,{children:"Having the Shiny Charm will give you more chance to hit the shiny frame."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"At the very beginning, you may need a video camera to record the clock hands position."}),`
`,e.jsx(n.li,{children:"1% luck + 99% patience!!!"}),`
`]}),`
`,e.jsx(n.h2,{children:"Understanding mechanics"}),`
`,e.jsx(n.h3,{children:'"Frame" and "F"'}),`
`,e.jsx(n.p,{children:`In this guide, let's call a row of 3DSRNGTool results "Frame". If you trigger the battle or receive the Pokemon at one frame number, we say we hit the frame.`}),`
`,e.jsx(n.p,{children:'"F" refers to real time: 1F = 1/60 second, which is the notation in Gen3 and in Eontimer.'}),`
`,e.jsx(n.h3,{children:"Timer setting"}),`
`,e.jsx(n.p,{children:"You can use any timer which can set two stages independently. The total time span = Pre-Timer Countdown (Part A) + Standby Time (Part B) ."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Part A: The systematic error caused by loading game, some edge frame advancement and human reaction time."}),`
`,e.jsx(n.li,{children:"Part B: The time of waiting from starting frame to target frame, which varies according to the seed and target frame."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Set Up EonTimer"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"../../images/UltraSun-UltraMoon/No-CFW/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.p,{children:"We are using Gen 3 Mode of EonTimer"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Pre-Timer: in milliseconds. For example, 2133 means 2.133 seconds. - For old 3DS user, the Pre-Timer should be around 3100. For new 3DS user, the Pre-Timer should be around 2500."}),`
`,e.jsxs(n.li,{children:["Target Frame: in F (1/60 seconds). For example, 3600 means 60 seconds. Note that EonTimer may not be so accurate since it's designed for Gen3 consoles. - ",e.jsx(n.strong,{children:"This is number different from the target frame in 3DSRNGTool"}),' - We have to convert the Gen 7 frame into real time("F") using 3DSRNGTool']}),`
`,e.jsx(n.li,{children:"Lag: in milliseconds. This number will add to total time."}),`
`,e.jsx(n.li,{children:"Frame Hit: in F. When we do calibration, we can put the frame we actually hit and click update. A new Lag will be calculated."}),`
`]}),`
`,e.jsx(n.p,{children:"In summary, the total time span in seconds = (Pre-Timer + Lag) / 1000 + (Target Frame) / 60."}),`
`,e.jsx(n.h2,{children:"Step 2: Preparation"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Prepare a Synchronize lead, some tool Pokemon will help you catch and a bunch of balls."}),`
`,e.jsxs(n.li,{children:["Save in front of your target Pokemon or the person who will give you the Pokemon.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For legends in Wormholes, please stand as close as possible."}),`
`,e.jsx(n.li,{children:"For Mystery Gifts, standing behind the delivery man in the first PC (Route 1) will have the minimum NPC number."}),`
`,e.jsx(n.li,{children:"For wilds and roaming UBs, stand at specific spots with the least NPC number."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Set up 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"In the upper right, input your game version and TSV. If you have the Shiny Charm, check the Shiny Charm box."}),`
`,e.jsxs(n.li,{children:["Set the Pokemon you are RNGing for.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:['For Stationary or Wild encounters, choose the "Category", select the "Pokemon"',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For most of cases, you don't have to change other settings, like delay. Some RNG noise can be absorbed in Pre-Timer, don't worry."}),`
`,e.jsx(n.li,{children:`If you are battling the UBs in Ultra Wormholes for the first time, choose "UB(first Encounter)". But it's not recommended because of the inconsistent delay.`}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:['For Mystery Gifts, change the "Event Setting" area yourself according the event you are RNGing.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You can find the WonderCard files (a .wc7) ",e.jsx(n.a,{href:"https://github.com/projectpokemon/EventsGallery",children:"here"})," for the event you are RNGing. Simply drag-and-drop that directly into 3DSRNGTool and have it automatically populate the settings."]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: Load your game or soft-resetting"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"L+R+Select/Start to soft reset the game."}),`
`,e.jsx(n.li,{children:"Once you failed, you have to start over from step 0. Since the initial seed is different when you restart the game."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 5: Find initial seed via continue screen clock needles"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Check ",e.jsx(n.a,{href:"https://www.pokemonrng.com/retail-usum-initial-seed-clocks",children:"here"})]}),`
`,e.jsx(n.li,{children:"Once you get only one seed result, the tool will update it to main window. The starting frame in Time Calculator is updated as well. (417/477 + the number of frames you saw for clocks)"}),`
`,e.jsx(n.li,{children:"Be sure to double check your seed, most of failures are from the wrong seed ;)"}),`
`,e.jsx(n.li,{children:"Do not enter your save yet."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 6: Find the target frame you would like to hit"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Set up the filters of your choosing",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'"Safe Frame Only": This box will appear for non-zero NPC case. Recommended for the initial pre-timer calibration purpose.'}),`
`,e.jsx(n.li,{children:'"Blink Frame Only": This box will appear for zero NPC case. Those frames can survive for around 1 seconds and super easy to hit, but they are rare.'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Set a reasonable Frame Range, right-click on the frame you would like to hit, and Set as Target Frame.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Gen7 Main RNG Tool will update this simultaneously."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 7: Calculate waiting time, set up timer"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go back to Gen Main RNG Tool. In the bottom right, everything should be updated. Hit the Calculate."}),`
`,e.jsxs(n.li,{children:['A message box will pop up with "Set EonTimer for XXXXF. (YY.YYs) Z;". Set XXXX as Target Frame of EonTimer. - ',e.jsx(n.code,{children:"Z"})," is how long this target frame will exist. For Blink Frame, it should be above 30."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 8: Press A at continue screen, start the timer at the same time"}),`
`,e.jsxs(n.p,{children:["Wait at the final screen until timer ends. ",e.jsx(n.strong,{children:"Be focused!"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For gifts or battles triggered by A pressing, proceed to the ",e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/blob/master/README.md#final-screen",children:"final screen"})," as soon as possible."]}),`
`,e.jsx(n.li,{children:"For battles triggered by one step, please open the X menu to freeze the character movement."}),`
`,e.jsx(n.li,{children:"For wild encounters triggered by Honey, open the X menu and hover the cursor over Bag."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 9: Trigger the battle or receive the Pokemon, once the timer ends"}),`
`,e.jsx(n.p,{children:"Press A to trigger the Pokemon Generation."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If the final input is a step, quit the X menu ~2-3 seconds before timer ends and push the circle pad hard when timer ends."}),`
`,e.jsx(n.li,{children:"If you are doing wild encounters, use the Honey item. Don't need to be rush, since the RNG will stop in bag."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 10: If you didn't get the Pokemon"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Adjust the Pre-Timer and restart from step 3."}),`
`,e.jsxs(n.li,{children:["Check ",e.jsx(n.code,{children:"Using Stats"}),", put the stats of the Pokemon you got. Check ",e.jsx(n.code,{children:"+-100 frames"})," in ",e.jsx(n.code,{children:"RNG Info"}),", hit Calculate again, you will see the frames which have the spread you hit. If you can't find the Pokemon you hit, please make sure you got the initial seed correctly."]}),`
`,e.jsxs(n.li,{children:["Check your pre-timer. Look at the ",e.jsx(n.code,{children:"Shift/F"})," Column.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If the number is between -4F and 4F, you are doing good and just because of the luck. Start over again and try to find a good seed and hit frame clusters with the same spread."}),`
`,e.jsxs(n.li,{children:["If the number is way off like +12 for example. This means you hit the frame too late. There are two ways you can adjust the timer.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Decrease your pre-timer. ",e.jsx(n.code,{children:"+ 12 / 60 * (-1000) = -200"}),", add that to you current Pre-Timer."]}),`
`,e.jsxs(n.li,{children:["Put ",e.jsx(n.code,{children:"Taget Frame + 12"})," into Frame Hit, Click Update, EonTimer will do the math and subtract 200 from lag."]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The Pre-Timer calibration is the key of Gen7 main RNG.
You may need to recalibrate the Pre-Timer when you change the RNG target.
`})}),`
`,e.jsx(n.h2,{children:"Additional notes"}),`
`,e.jsx(n.h3,{children:"QR method"}),`
`,e.jsx(n.p,{children:"This is a variant of above basic steps. Sometimes, we might want to hit a high frame number for perfect IVs and shiny. We can first consume tons of frames in Festival Plaza or Hau'Oli Shopping Mall."}),`
`,e.jsx(n.p,{children:"And then check what frame you are on via the QR Scanner, since QR scanner needles also use the numbers generated from main RNG."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"../../images/UltraSun-UltraMoon/No-CFW/QR-Scanner.png",alt:"QR Scanner"})}),`
`,e.jsxs(n.p,{children:["Go to ",e.jsx(n.code,{children:"Gen7 Main RNG Tool"}),", check ",e.jsx(n.code,{children:"Locate Current Frame via QR"}),", put the estimated current frame range below, input the needle sequence, until you get one result."]}),`
`,e.jsx(n.p,{children:"The Starting Frame of Time Calculator will also be updated."}),`
`,e.jsx(n.p,{children:"So Step 4 will be press B to quit QR Scanner and start the timer at same time."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This method is also reducing the system error of timer with long time period.
`})}),`
`,e.jsx(n.h3,{children:"Measuring NPC count"}),`
`,e.jsx(n.p,{children:"Sometimes, the results might be far away from your target, then might it's due to the NPC count required changes. Especially for Xurkitree, Magearna and standing spots of wilds."}),`
`,e.jsx(n.p,{children:"The idea is simple, change the NPC count of Time Calculator and see what number of NPCs is giving the closet actual time you was waiting."}),`
`,e.jsx(n.p,{children:"Or you can waiting a fixed amount of time and using QR method to check how many frames are used."}),`
`,e.jsx(n.h3,{children:"Xurkitree"}),`
`,e.jsx(n.p,{children:"The NPC number changes between 1 and 2 in a period of 10.7 seconds due to the wandering Xurkitree in the background. So we have to use X menu to freeze the varying NPC count. Here's the mindset:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Save while you're standing behind it",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Which will allow you have long time window for 1 NPC (~7 seconds)"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Find the initial seed, load the game and open the X menu as soon as possible."}),`
`,e.jsxs(n.li,{children:["Use QR needles measure NPC count to make sure there is 1 NPC.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Close X menu, wait several seconds and reopen it again to refresh background situation."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Wait with X menu opened to advance close to your target frame"}),`
`,e.jsx(n.li,{children:"Quit X menu and trigger the battle as fast as you can to avoid NPC changes."}),`
`]})]})}function a(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{a as default,o as frontmatter};
