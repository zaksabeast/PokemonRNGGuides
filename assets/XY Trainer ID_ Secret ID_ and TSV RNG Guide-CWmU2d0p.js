import{u as i,j as e}from"./index-CaiZuilK.js";const a={title:"Trainer ID, Secret ID, and/or TSV RNG",description:"RNG for a specific Trainer ID, SID, or TSV",slug:"pcalc-xy-tid",subCategory:"Custom Firmware"};function t(s){const n={a:"a",code:"code",em:"em",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.p,{children:["You need a new save file to RNG the Trainer ID, Secret ID, or Trainer Shiny Value. To delete an existing save file, press ",e.jsx(n.code,{children:"X + B + Up"})," on the d-pad at the title screen. This deletes the current save file and brings you to the language select screen."]}),`
`,e.jsxs(n.p,{children:["Make sure to back up your save file using a save file manager like ",e.jsx(n.a,{href:"https://github.com/FlagBrew/Checkpoint/releases",children:"Checkpoint"})," if you want to return to a previous save file."]}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`,e.jsx(n.li,{children:"(Optional) A network connection."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: 3DSRNGTool Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'In the upper right corner, select your game version and click the "Advanced" option. Seed and TSV can be blank.'}),`
`,e.jsx(n.li,{children:'In the "ID RNG" tab, fill in your desired TID, SID, or TSV. 3DSRNGTool can search for parts of numbers or the full number. It is recommended to RNG for only one at a time.'}),`
`,e.jsx(n.li,{children:'Under "Frame Range," start from "0".'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/X-Y/TID/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.h2,{children:"Step 2: Game Setup"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:"Note: If you use a N3DS or N2DSXL, you can speed up the game when the PCalc overlay is active by enabling L2 cache + 804 MHz in the Rosalina menu options (press `Select + L + Down` to access).\n"})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load the game and connect to NTR Helper in 3DSRNGTool. Instructions are found [here]. If you can't connect to the internet, fill in the tiny seeds manually later."}),`
`,e.jsx(n.li,{children:"Select the game language."}),`
`,e.jsx(n.li,{children:"Continue playing until you reach the final screen shown below."}),`
`,e.jsxs(n.li,{children:["Pause the game by pressing ",e.jsx(n.code,{children:"Start + Select"})," on that screen."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/X-Y/TID/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsx(n.p,{children:"This is the final screen to change character selection."}),`
`,e.jsx(n.h2,{children:"Step 3: Finding a Target Frame"}),`
`,e.jsx(n.p,{children:"The frames in 3DSRNGTool track 4 values known as tiny seeds. These seeds generate trainer info like TID, SID, and TSV. Each advancement in tiny seeds equals a frame advancement. Note that these frames differ from those in PCalc."}),`
`,e.jsx(n.p,{children:"In X/Y, tiny seeds advance throughout the introduction at a random pace, but in a predictable order that 3DSRNGTool can track."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/X-Y/TID/NTR-Helper.png",alt:"NTR Helper"})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Press "Calculate" in the main window to get a list of frames available for RNG.'}),`
`,e.jsx(n.li,{children:"Adjust the range as needed. Higher frames take longer to obtain the desired TID/SID/TSV."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/X-Y/TID/Target.png",alt:"Target"})}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"In this example, we will get the highlighted trainer data."})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["If the target frame is too high or the TID/SID/TSV combination is not possible with your initial seed, reboot the system for a different initial seed. Press ",e.jsx(n.code,{children:"Select + L + Down"})," in the Rosalina menu to access the reboot option."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Soft resetting the game will hard lock the system due to NTR! You must do a hard reset of the console.
`})}),`
`,e.jsx(n.h2,{children:"Step 4: Advancing the Tiny Seeds"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Unpause the game by pressing ",e.jsx(n.code,{children:"Start"}),"."]}),`
`,e.jsxs(n.li,{children:[`After confirming your character selection, advance to this screen.
`,e.jsx(n.img,{src:"/images/X-Y/TID/Advance.png",alt:"Advance Screen"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This is the last screen for user input before generating trainer data."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Allow tiny seeds to advance on this final screen.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Pause the game with ",e.jsx(n.code,{children:"Start + Select"})," to compare tiny seeds in 3DSRNGTool every few minutes to avoid missing your target."]}),`
`,e.jsx(n.li,{children:'You can update tiny seeds in 3DSRNGTool and press "Calculate" to track progress.'}),`
`,e.jsx(n.li,{children:"If NTR Helper is running, it will automatically update tiny seeds in 3DSRNGTool."}),`
`,e.jsx(n.li,{children:"Disable filters once the target frame is about 30 frames away for a more accurate count."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["When your desired TID/SID/TSV is about 12 frames away from the current seeds, pause the game using ",e.jsx(n.code,{children:"Start + Select"}),"."]}),`
`,e.jsxs(n.li,{children:["Advance frames and tiny seeds by pressing ",e.jsx(n.code,{children:"Select"})," while the game is paused.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The frame counter in PCalc should go up by one for every two presses of ",e.jsx(n.code,{children:"Select"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Once on the correct frame, hold ",e.jsx(n.code,{children:"A"})," so you unpause at that exact frame to hit the right tiny seeds.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure to do this on the first main RNG frame of your target (TinyMT) frame."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"After gaining control of your character, check your TID via the trainer card."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/X-Y/TID/Success.png",alt:"Success"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:"Note: PCalc can display TSV information by pressing `Start + Right` and then `Select + Left`.\n"})})]})}function l(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{l as default,a as frontmatter};
