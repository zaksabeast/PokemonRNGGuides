import{u as r,j as e}from"./index-BrqZTQW1.js";const o=[{title:"Ultra Sun and Ultra Moon RNGing on retail",navDrawerTitle:"Retail RNG",description:"RNG perfect Pokémon in Ultra Sun and Ultra Moon without using custom firmware.",slug:"retail-usum-no-cfw",category:"Ultra Sun and Ultra Moon",tag:"retail"},{title:"Sun and Moon RNGing on retail",navDrawerTitle:"Retail RNG",description:"RNG perfect Pokémon in Sun and Moon without using custom firmware.",slug:"retail-sm-no-cfw",category:"Sun and Moon",tag:"retail",canonical:"retail-usum-no-cfw"}];function i(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Calculator: ",e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"/mystic-timer",children:"Mystic Timer"}),"."]}),`
`,e.jsxs(n.li,{children:["If you want to RNG a shiny Pokémon, know your TSV. Check your TSV via Battle Videos without Homebrew. Check ",e.jsx(n.a,{href:"https://www.reddit.com/r/SVExchange/wiki/keysave",children:"here"}),"."]}),`
`,e.jsx(n.li,{children:"Having the Shiny Charm will increase your chances of hitting the shiny frame."}),`
`,e.jsx(n.li,{children:"You may need a video camera to record the clock hands position at the beginning."}),`
`,e.jsx(n.li,{children:"1% luck + 99% patience!"}),`
`]}),`
`,e.jsx(n.h2,{children:"Understanding mechanics"}),`
`,e.jsx(n.h3,{children:'"Frame" and "F"'}),`
`,e.jsx(n.p,{children:'In this guide, a row of 3DSRNGTool results is called a "Frame". If you trigger the battle or receive the Pokémon at a frame number, we say you hit the frame.'}),`
`,e.jsx(n.p,{children:'"F" refers to real time: 1F = 1/60 second, which is the notation in Gen 3 and in Mystic Timer.'}),`
`,e.jsx(n.h3,{children:"Timer setting"}),`
`,e.jsx(n.p,{children:"You can use any timer that can set two stages independently. The total time span = Pre-Timer Countdown (Part A) + Standby Time (Part B)."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Part A: Systematic error caused by loading the game, some edge frame advancements, and human reaction time."}),`
`,e.jsx(n.li,{children:"Part B: Time from starting frame to target frame, varying according to the seed and target frame."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Set Up Mystic Timer"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Sun-Moon/No-CFW/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.p,{children:"We are using Gen 3 Mode of Mystic Timer."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Pre-Timer: in milliseconds. For example, 2133 means 2.133 seconds. For old 3DS users, the Pre-Timer should be around 3100. For new 3DS users, the Pre-Timer should be around 2500."}),`
`,e.jsx(n.li,{children:`Target Frame: in F (1/60 seconds). For example, 3600 means 60 seconds. Mystic Timer may not be accurate since it's designed for Gen 3 consoles. This number is different from the target frame in 3DSRNGTool. We need to convert the Gen 7 frame into real time ("F") using 3DSRNGTool.`}),`
`,e.jsx(n.li,{children:"Lag: in milliseconds. This number adds to the total time."}),`
`,e.jsx(n.li,{children:"Frame Hit: in F. When we do calibration, input the frame we actually hit and click update. A new Lag will be calculated."}),`
`]}),`
`,e.jsx(n.p,{children:"In summary, the total time span in seconds = (Pre-Timer + Lag) / 1000 + (Target Frame) / 60."}),`
`,e.jsx(n.h2,{children:"Step 2: Preparation"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Prepare a Synchronize lead, some tool Pokémon to help you catch, and a bunch of balls."}),`
`,e.jsxs(n.li,{children:["Save in front of your target Pokémon or the person who will give you the Pokémon.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For legends in Wormholes, stand as close as possible."}),`
`,e.jsx(n.li,{children:"For Mystery Gifts, stand behind the delivery man in the first PC (Route 1) to minimize NPC numbers."}),`
`,e.jsx(n.li,{children:"For wilds and roaming UBs, stand at specific spots with the least NPCs."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Set up 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"In the upper right, input your game version and TSV. If you have the Shiny Charm, check the Shiny Charm box."}),`
`,e.jsxs(n.li,{children:["Set the Pokémon you are RNGing for.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:['For Stationary or Wild encounters, choose the "Category" and select the "Pokémon".',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"In most cases, you don't need to change other settings, like delay. Some RNG noise can be absorbed in Pre-Timer."}),`
`,e.jsx(n.li,{children:'If battling UBs in Ultra Wormholes for the first time, choose "UB (first Encounter)". It’s not recommended because of inconsistent delay.'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:['For Mystery Gifts, change the "Event Setting" area according to the event you are RNGing.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You can find the WonderCard files (a .wc7) ",e.jsx(n.a,{href:"https://github.com/projectpokemon/EventsGallery",children:"here"})," for the event you are RNGing. Drag-and-drop that into 3DSRNGTool to automatically populate the settings."]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: Load your game or soft-reset"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"L"})," + ",e.jsx(n.code,{children:"R"})," + ",e.jsx(n.code,{children:"Select"}),"/",e.jsx(n.code,{children:"Start"})," to soft reset the game."]}),`
`,e.jsx(n.li,{children:"If you fail, start over from step 0. The initial seed changes when you restart the game."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 5: Find initial seed via continue screen clock needles"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Check ",e.jsx(n.a,{href:"/retail-usum-initial-seed-clocks",children:"here"}),"."]}),`
`,e.jsx(n.li,{children:"When you get one seed result, the tool will update it in the main window. The starting frame in the Time Calculator will also update (417/477 + number of frames you saw for clocks)."}),`
`,e.jsx(n.li,{children:"Double check your seed; most failures are from wrong seeds."}),`
`,e.jsx(n.li,{children:"Do not enter your save yet."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 6: Find the target frame to hit"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Set up your filter preferences.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'"Safe Frame Only": This box appears for non-zero NPC cases. Recommended for initial pre-timer calibration.'}),`
`,e.jsx(n.li,{children:'"Blink Frame Only": This box appears for zero NPC cases. These frames can survive for around 1 second and are easy to hit but are rare.'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Set a reasonable Frame Range, right-click on the frame you want to hit, and click Set as Target Frame.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The Gen 7 Main RNG Tool will update this simultaneously."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 7: Calculate waiting time and set up timer"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go back to the Gen Main RNG Tool. In the bottom right, everything should be updated. Click Calculate."}),`
`,e.jsxs(n.li,{children:['A message box will pop up with "Set EonTimer for XXXXF. (YY.YYs) Z". Set XXXX as the Target Frame of Mystic Timer. ',e.jsx(n.code,{children:"Z"})," is how long this target frame will exist. For Blink Frame, it should be above 30."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 8: Press A at the continue screen, start the timer at the same time"}),`
`,e.jsxs(n.p,{children:["Wait at the final screen until the timer ends. ",e.jsx(n.strong,{children:"Stay focused!"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For gifts or battles triggered by pressing ",e.jsx(n.code,{children:"A"}),", proceed to the ",e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/blob/master/README.md#final-screen",children:"final screen"})," as soon as possible."]}),`
`,e.jsxs(n.li,{children:["For battles based on one step, open the ",e.jsx(n.code,{children:"X"})," menu to freeze character movement."]}),`
`,e.jsxs(n.li,{children:["For wild encounters triggered by Honey, open the ",e.jsx(n.code,{children:"X"})," menu and hover over the Bag."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 9: Trigger the battle or receive the Pokémon once the timer ends"}),`
`,e.jsxs(n.p,{children:["Press ",e.jsx(n.code,{children:"A"})," to trigger the Pokémon Generation."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If the final input is a step, quit the ",e.jsx(n.code,{children:"X"})," menu ~2-3 seconds before the timer ends and push the circle pad hard when the timer ends."]}),`
`,e.jsx(n.li,{children:"If you are doing wild encounters, use the Honey item. Don’t rush, since the RNG will stop in the Bag."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 10: If you didn't get the Pokémon"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Adjust the Pre-Timer and restart from step 3."}),`
`,e.jsxs(n.li,{children:["Check ",e.jsx(n.code,{children:"Using Stats"}),", input the stats of the Pokémon you got. Check ",e.jsx(n.code,{children:"+-100 frames"})," in ",e.jsx(n.code,{children:"RNG Info"}),", click Calculate again to see the frames that have the spread you hit. If you can't find the Pokémon, ensure you got the initial seed right."]}),`
`,e.jsxs(n.li,{children:["Check your pre-timer. Look at the ",e.jsx(n.code,{children:"Shift/F"})," column.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If the number is between -4F and 4F, you are doing well, just some bad luck. Start over to find a good seed and hit frame clusters with the same spread."}),`
`,e.jsxs(n.li,{children:["If the number is way off, like +12, you hit the frame too late. Adjust the timer two ways:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Decrease your pre-timer: ",e.jsx(n.code,{children:"+ 12 / 60 * (-1000) = -200"}),", add that to your current Pre-Timer."]}),`
`,e.jsxs(n.li,{children:["Put ",e.jsx(n.code,{children:"Target Frame + 12"}),' into Frame Hit, click "Set Timer", and Mystic Timer will do the math and subtract 200 from Lag.']}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The Pre-Timer calibration is key for Gen 7 main RNG.
You may need to recalibrate the Pre-Timer when changing the RNG target.
`})}),`
`,e.jsx(n.h2,{children:"Additional notes"}),`
`,e.jsx(n.h3,{children:"QR method"}),`
`,e.jsx(n.p,{children:"This is a variation of the basic steps. Sometimes, we want to hit a high frame number for perfect IVs and shininess. We can consume many frames in Festival Plaza or Hau'Oli Shopping Mall first."}),`
`,e.jsx(n.p,{children:"Then, check what frame you are on via the QR Scanner, since QR scanner needles also use numbers generated from main RNG."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Sun-Moon/No-CFW/QR-Scanner.png",alt:"QR Scanner"})}),`
`,e.jsxs(n.p,{children:["Go to ",e.jsx(n.code,{children:"Gen7 Main RNG Tool"}),", check ",e.jsx(n.code,{children:"Locate Current Frame via QR"}),", input the estimated current frame range, and input the needle sequence until you get a result."]}),`
`,e.jsx(n.p,{children:"The Starting Frame of the Time Calculator will also be updated."}),`
`,e.jsxs(n.p,{children:["So for Step 4, press ",e.jsx(n.code,{children:"B"})," to quit QR Scanner and start the timer at the same time."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This method reduces system error of the timer with long time periods.
`})}),`
`,e.jsx(n.h3,{children:"Measuring NPC count"}),`
`,e.jsx(n.p,{children:"If results are far from your target, NPC count may need adjustments, especially for Xurkitree, Magearna, and wild standing spots."}),`
`,e.jsx(n.p,{children:"To check NPC count, change it in the Time Calculator to see which number gives the closest actual time you waited."}),`
`,e.jsx(n.p,{children:"Alternatively, wait a fixed amount of time and use the QR method to check how many frames were consumed."}),`
`,e.jsx(n.h3,{children:"Xurkitree"}),`
`,e.jsxs(n.p,{children:["The NPC number changes between 1 and 2 every 10.7 seconds due to wandering Xurkitree in the background. Use the ",e.jsx(n.code,{children:"X"})," menu to freeze the varying NPC count. Here's the mindset:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Save while standing behind it for a longer time window for 1 NPC (~7 seconds)."}),`
`,e.jsxs(n.li,{children:["Find the initial seed, load the game, and open the ",e.jsx(n.code,{children:"X"})," menu as soon as possible."]}),`
`,e.jsxs(n.li,{children:["Use QR needles to measure NPC count to ensure there is 1 NPC.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Close the ",e.jsx(n.code,{children:"X"})," menu, wait several seconds, and reopen it to refresh the background situation."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Wait with the ",e.jsx(n.code,{children:"X"})," menu open to get close to your target frame."]}),`
`,e.jsxs(n.li,{children:["Quit the ",e.jsx(n.code,{children:"X"})," menu and trigger the battle quickly to avoid NPC changes."]}),`
`]})]})}function a(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{a as default,o as frontmatter};
