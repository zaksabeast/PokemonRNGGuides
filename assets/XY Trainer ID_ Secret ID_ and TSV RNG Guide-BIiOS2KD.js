import{u as t,j as e}from"./index-NUjML0_o.js";const a={title:"Trainer ID, Secret ID, and/or TSV RNG",description:"RNG for a specific Trainer ID, SID, or TSV",slug:"pcalc-xy-tid",subCategory:"Custom Firmware"};function i(s){const n={a:"a",code:"code",em:"em",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Requirements"}),`
`,e.jsxs(n.p,{children:["A new save file is needed to RNG the Trainer ID, Secret ID, or Trainer Shiny Value. If a save file is already present then it can be deleted by pressing ",e.jsx(n.code,{children:"X + B + Up"})," on the d-pad while at the title screen. This will delete the current save file and begin the game at the language select screen."]}),`
`,e.jsxs(n.p,{children:["Make sure to back up your save file using a save file manager such as ",e.jsx(n.a,{href:"https://github.com/FlagBrew/Checkpoint/releases",children:"Checkpoint"})," if you ever want to return to your previous save file."]}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`,e.jsx(n.li,{children:"(Optional) A network connection"}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: 3DSRNGTool Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['In the upper right hand corner select your game version and click the "Advanced" option.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Seed and TSV can be blank."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:['In the "ID RNG" tab fill in your desired TID, SID, or TSV.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"3DSRNGTool can search for multiple numbers, in part or in full."}),`
`,e.jsx(n.li,{children:"Finding a specific TID/SID/TSV combination will be very rare. It is advised to only RNG for one or the other."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Under "Frame Range" start from "0".'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"../../images/X-Y/TID/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.h2,{children:"Step 2: Game Setup"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you are using a N3DS or N2DSXL you can speed up the game when the PCalc overlay is active by enabling L2 cache + 804 MHz in the Rosalina menu options (Select + L + Down to bring up menu).
`})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Load the game and connect to NTR Helper in 3DSRNGTool.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Instructions for doing so can be found [here]."}),`
`,e.jsx(n.li,{children:"If this is not possible due to not having an internet connection, then you will have to manually fill in the tiny seeds when needed later."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Select game language."}),`
`,e.jsx(n.li,{children:"Play the game until the below screen appears."}),`
`,e.jsxs(n.li,{children:["Pause the game by pressing ",e.jsx(n.code,{children:"Start + Select"})," at that screen."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"../../images/X-Y/TID/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsx(n.p,{children:"This is the final screen to change character selection."}),`
`,e.jsx(n.h2,{children:"Step 3: Finding a Target Frame"}),`
`,e.jsx(n.p,{children:'The "frames" in 3DSRNGTool keep track of 4 values known as "tiny seeds". The tiny seeds are used to generate trainer info such as TID, SID, and TSV. Each time the tiny seeds advance to the next set of tiny seeds a frame advancement happens. These frames are different from the frames shown in PCalc, as those frames are for a different RNG.'}),`
`,e.jsx(n.p,{children:"In X/Y the tiny seeds will constantly advance throughout the introduction. They will advance at a seemingly random pace but will be in a consistent order that 3DSRNGTool can predict."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"../../images/X-Y/TID/NTR-Helper.png",alt:"NTR Helper"})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Press "Calculate" in the main window to receive a list of possible frames that you can RNG for.'}),`
`,e.jsx(n.li,{children:"Increase or decrease range as needed. The higher the frames, the longer it will take to obtain the desired TID/SID/TSV."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"../../images/X-Y/TID/Target.png",alt:"Target"})}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"In this example we will be getting the highlighted trainer data"})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["If the target frame is too high or the TID/SID/TSV combination is not possible on your initial seed then reboot the system to start over with a different initial seed.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The Rosalina menu can be used to quickly reboot the system by pressing ",e.jsx(n.code,{children:"Select + L + Down"})," and selecting the reboot option."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Soft resetting the game will hard lock the system due to NTR! You must do a hard reset of the console.
`})}),`
`,e.jsx(n.h2,{children:"Step 4: Advancing the Tiny Seeds"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Unpause the game by pressing ",e.jsx(n.code,{children:"Start"}),"."]}),`
`,e.jsxs(n.li,{children:[`After confirming you character selection, advance to this screen.
`,e.jsx(n.img,{src:"../../images/X-Y/TID/Advance.png",alt:"Advance Screen"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This is the last screen for user input before the trainer data is generated."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Let the tiny seeds advance while on this final screen.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Pause the game using ",e.jsx(n.code,{children:"Start + Select"})," to compare the tiny seeds in 3DSRNGTool every few minutes to avoid missing your target."]}),`
`,e.jsx(n.li,{children:'To keep track how far along the tiny seeds have advanced you can update the tiny seeds in 3DSRNGTool and press "Calculate".'}),`
`,e.jsx(n.li,{children:"If NTR Helper is still running then this will automatically update the tiny seeds in 3DSRNGTool."}),`
`,e.jsx(n.li,{children:"Disable filters once the target frame is about 30 frames way to keep a more accurate count of frame advancements."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Once the wanted TID/SID/TSV is about 12 frames away from the current seeds pause the game using ",e.jsx(n.code,{children:"Start + Select"}),"."]}),`
`,e.jsxs(n.li,{children:["Advance the frames and tiny seeds by pressing ",e.jsx(n.code,{children:"Select"})," while the game is paused.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The frame counter in PCalc should advance by one for every two presses of ",e.jsx(n.code,{children:"Select"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["When on the correct frame, hold ",e.jsx(n.code,{children:"A"})," to make sure you unpause at that exact frame to hit the right tiny seeds.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure to do this on the first main RNG frame of your target (TinyMT) frame."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Once you can control your character you can check your TID by viewing the trainer card."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"../../images/X-Y/TID/Success.png",alt:"Success"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: PCalc can display TSV information by pressing Start + Right and then Select + Left
`})})]})}function l(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{l as default,a as frontmatter};
