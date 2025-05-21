import{u as s,j as e}from"./index-DtYX_4r6.js";const a={title:"X and Y TID RNG",navDrawerTitle:"TID RNG",description:"Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in X and Y.",slug:"pcalc-xy-tid",category:"X and Y",tag:"cfw"};function t(r){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Intro"}),`
`,e.jsxs(n.p,{children:["You need a new save file to RNG the Trainer ID, Secret ID, or Trainer Shiny Value. To delete an existing save file, press ",e.jsx(n.code,{children:"X + B + Up"})," on the d-pad at the title screen. This deletes the current save file and brings you to the language select screen."]}),`
`,e.jsxs(n.p,{children:["Make sure to back up your save file using a save file manager like ",e.jsx(n.a,{href:"https://github.com/FlagBrew/Checkpoint/releases",children:"Checkpoint"})," if you want to return to a previous save file."]}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"/install-pokereader",children:"A 3DS with PokeReader"})," OR ",e.jsx(n.a,{href:"/citrarng-setup",children:"Azahar with PokeReader"})]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: 3DSRNGTool Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"In the upper right corner, select your game version. Seed and TSV can be blank."}),`
`,e.jsx(n.li,{children:'In the "ID RNG" tab, fill in your desired TID, SID, or TSV. 3DSRNGTool can search for parts of numbers or the full number. It is recommended to RNG for only one at a time.'}),`
`,e.jsx(n.li,{children:'Under "Frame Range," start from "0".'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Game Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Select the game language."}),`
`,e.jsx(n.li,{children:"Continue playing until you reach the screen asking if your name is correct."}),`
`,e.jsxs(n.li,{children:["Pause the game by pressing ",e.jsx(n.code,{children:"Start + Select"})," on that screen."]}),`
`,e.jsx(n.li,{children:'Input the 4 TinyMT seeds from PokeReader into the 4 boxes in 3DSRNGTool. Use the numbers directly listed under "TinyMT seed".'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Finding a Target Frame"}),`
`,e.jsx(n.p,{children:"The frames in 3DSRNGTool track 4 values known as tiny seeds. These seeds generate trainer info like TID, SID, and TSV. Each advancement in tiny seeds equals a frame advancement. Note that these frames differ from the MT Advances in PokeReader."}),`
`,e.jsx(n.p,{children:"In X/Y, tiny seeds advance throughout the introduction at a random pace, but in a predictable order that 3DSRNGTool can track."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Press "Calculate" in the main window to get a list of frames available for RNG.'}),`
`,e.jsx(n.li,{children:"Adjust the range as needed. Higher frames take longer to obtain the desired TID/SID/TSV."}),`
`,e.jsxs(n.li,{children:["If the target frame is too high or the TID/SID/TSV combination is not possible with your initial seed, reboot the system for a different initial seed. Press ",e.jsx(n.code,{children:"Select + L + Down"})," in the Rosalina menu to access the reboot option."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: Advancing the Tiny Seeds"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Unpause the game by pressing ",e.jsx(n.code,{children:"Start"}),"."]}),`
`,e.jsxs(n.li,{children:["After confirming your character selection, advance to the next screen.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'"(name)... Tres bien! What a fantastic name!"'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Allow tiny seeds to advance on this screen.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'The number from "Frame" in 3DSRNGTool is the same as the "Advances" number in PokeReader underneath "TinyMT seed".'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["When your desired TID/SID/TSV is about 12 frames away from the current seeds, pause the game using ",e.jsx(n.code,{children:"Start + Select"}),"."]}),`
`,e.jsxs(n.li,{children:["Advance frames and tiny seeds by pressing ",e.jsx(n.code,{children:"Select"})," while the game is paused."]}),`
`,e.jsxs(n.li,{children:["Once on the correct frame, hold ",e.jsx(n.code,{children:"A"})," so you unpause at that exact frame to hit the right tiny seeds."]}),`
`,e.jsx(n.li,{children:"After gaining control of your character, check your TID via the trainer card."}),`
`]})]})}function o(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{o as default,a as frontmatter};
