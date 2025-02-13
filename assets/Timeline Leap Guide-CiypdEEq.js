import{u as t,j as e}from"./index-DtinywFa.js";const l={title:"Timeline Leap",description:"A timeline can predict Pokemon a player can obtain. Timeline leap allows a player to leap onto specific timelines",slug:"retail-usum-timeleap",subCategory:"Custom Firmware"};function s(i){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Find your target frame"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['In "Filters" set it to search for the Pokemon you are wanting.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Do not check "Safe F Only".'}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Search using "Frame Range" to find a frame you want to land on.'}),`
`,e.jsxs(n.li,{children:['Right click on the frame and "Set as Target Frame".',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This frame will be referred to as Frame 2 from here on."}),`
`,e.jsx(n.li,{children:"Any frame that shows up can be landed on with this method, so if the frame isn't a safe frame you can still use it as a target frame."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Advance frames"}),`
`,e.jsx(n.p,{children:"Use Festival Plaza or Hau'Oli shopping mall to advance frames."}),`
`,e.jsx(n.h2,{children:"Step 3: Position your character"}),`
`,e.jsx(n.p,{children:"When you are getting close to Frame 2, either leave Festival Plaza or fly to where you are going to battle or receive the Pokemon."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For Mystery Gifts, fly to the the first PokeCenter.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure you're standing behind the delivery man but facing the red counter. Check that you have 4 NPCs while standing there."}),`
`,e.jsx(n.li,{children:"4 NPCs are optimal for finding safe frames, which is why your character should stand behind the delivery man. If you are getting 5 NPCs instead, exit and re-enter the PokeCenter."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["For Xurkitree, stand behind it.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This is so there is a longer time window for having 1 NPC due to the wandering Xurkitree in the background. (There will be about a 7 second window of 1 NPC when you stand behind.)"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: Advance to leap screen"}),`
`,e.jsx(n.p,{children:"Get to the screen which will trigger the timeline leap."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For Mystery Gifts, talk to the delivery man until you get to the Yes/No dialogue."}),`
`,e.jsxs(n.li,{children:["For menu method, open X menu.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For Xurkitree, press ",e.jsx(n.code,{children:"X"})," to open the menu as soon as the NPC counter in PCalc changes from 2 to 1."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["For in-game gifts and other stationary, the last dialogue will advance 1 frame.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'If the final screen is "You received xxx", the leap screen is the 3rd or 4th to last A pressing.'}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Timeline leap is not viable for wild Pokemon since there is not a way to jump between timelines when using Honey.

Also, this method is not guaranteed to work with Poipole since it is unstable to RNG because of NPCs.
`})}),`
`,e.jsx(n.h2,{children:"Step 5: Pause at a safe frame"}),`
`,e.jsx(n.p,{children:`You can use "Safe F Only" filter to find safe frames. You'll have to reset filters before searching for a safe frame for results to show up.`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For Mystery Gifts with 4 NPCs this can be done by advancing frames one at a time and checking the last digit.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If you are on safe frames, the last digit will repeat itself like A-B-A-B-A-B because frames will be advancing 5 each time."}),`
`,e.jsxs(n.li,{children:["For an example, frames can advance with last digits being 2-7-2-7-2-7. (2+5=",e.jsx(n.strong,{children:"7"}),", 7+5=1",e.jsx(n.strong,{children:"2"}),", 12+5=1",e.jsx(n.strong,{children:"7"}),", 17+5=2",e.jsx(n.strong,{children:"2"})," - notice how the last digits are always 2 and 7.)"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 6: Calculate the timeline leap frame"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'After confirming your current frame is a safe frame, input it into the "Frame Range" starting frame.'}),`
`,e.jsx(n.li,{children:'Choose "Timeline Leap" and click on "Calculate".'}),`
`,e.jsxs(n.li,{children:["A window will pop up with the frame you will press ",e.jsx(n.code,{children:"A"})," on. This is Frame 1.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For Mystery Gifts this is when you press ",e.jsx(n.code,{children:"A"}),' on "Yes" to accept the Pokemon']}),`
`,e.jsx(n.li,{children:"For menu method, this is the frame to close the menu on."}),`
`,e.jsxs(n.li,{children:["For the other Pokemon, it is the 3rd or 4th to last dialogue before final screen when you'll press ",e.jsx(n.code,{children:"A"})," to advance the dialogue to final sceen."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 7: Double check if the target frame is your desired frame"}),`
`,e.jsx(n.p,{children:'Due to the inaccurate assumption of 3DSRNGTool "Frame Range" mode, Frame 2 may or may not always have the same spread. Checking it before advancing to the next step is advised, especially for the varying NPC count case.'}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['Within the window that popped up, choosing "Yes" will allow you to check that Frame 2 still has the spread you wanted.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Choosing "No" will allow you to check if there are any other Frame 1 that can make Frame 2 have the spread you wanted.'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:['If Frame 2 does not have the spread you wanted, search for your target spread within the timeline created. (Choose "Yes" when the window pops up.)',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If you did not mess with filters after finding your target frame, it will be easy to find."}),`
`,e.jsx(n.li,{children:'Right click and "Set as Target Frame" on the desired spread. This is now your new Frame 2.'}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:`If Frame 2 is not on the timeline, then you'll have to find the new frame the spread is on. Choose "Frame Range" and see what frame the spread is now on and then redo the "Timeline Leap" to find the new Frame 1.`}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 8: Profit"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Advance to Frame 1, when you land on it, press ",e.jsx(n.code,{children:"A"})," to advance the dialogue to final screen",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For menu method, Hold ",e.jsx(n.code,{children:"X"})," and then ",e.jsx(n.code,{children:"A"})," to both unpause the game and close the menu, then immediately press ",e.jsx(n.code,{children:"Start + Select"})," to pause the game again, but this time with the menu closed."]}),`
`,e.jsxs(n.li,{children:["Be prepared to press ",e.jsx(n.code,{children:"A"})," for Frame 2 afterwards as there is about a 1~10 second interval in between the frames."]}),`
`,e.jsx(n.li,{children:'The time interval range can be found above the "Calculate" button.'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"})," or make a step forward on Frame 2 to obtain the Pokemon you wanted. Congratulations!"]}),`
`]}),`
`,e.jsx(n.h3,{children:"The following are possible ways of leaping for now:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Dialogue",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The game will use 1 RNG call while loading the next line of text."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Closing the X menu",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The game will use 2 RNG calls for the next timing of the character fidgets."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"})," at YES/NO screen (Mystery Gifts)",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The game will use around 10 RNG calls to generate 1 Pokemon for testing."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"Since you can jump between different timelines by choosing the leap timing, you can land on any frame of your choosing."})]})}function a(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{a as default,l as frontmatter};
