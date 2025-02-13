import{u as s,j as e}from"./index-CV0XqbBP.js";const r={title:"Trainer ID RNG",description:"RNG for that special TID/SID/TSV",slug:"retail-oras-tid",subCategory:"Custom Firmware"};function t(i){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:"Note: If a save file is already present then it can be deleted by pressing `X+Y+Down` on the d-pad while at the title screen. This will delete the current save file and begin the game at the language select screen.\n"})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`,e.jsx(n.li,{children:"(Optional) A network connection"}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Setup 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['In the upper right hand corner select your game version and click the "Advance" option.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Seed and TSV can be blank."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"In the ID tab fill in your desired TID, SID, or TSV."}),`
`,e.jsxs(n.li,{children:["3DSRNGTool can search for multiple numbers in part or in full.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Finding a specific TID/SID/TSV combination will be very rare. It is advised to only RNG for one or the other."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/OmegaRuby-AlphaSapphire/TID/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.p,{children:"In this example we will be getting the highlighted TID."}),`
`,e.jsx(n.h2,{children:"Step 2: Setup the game"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load BootNTR Selector, then the game."}),`
`,e.jsxs(n.li,{children:["Select game language.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'The bot used later on can be used for this part by selecting "Mash A" option if setup early.'}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Continue to play the game until this screen appears."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/OmegaRuby-AlphaSapphire/TID/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsx(n.h2,{children:"Step 3: Advancing the frames"}),`
`,e.jsx(n.p,{children:'Every time "No" is selected when confirming name, one frame advancement happens. This can be a tedious task to complete manually, especially the higher the target frame is. A bot can be used to automatically do the frame advancement.'}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If having a network connection is not possible then manually fill in the tiny seeds.
`})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Press the home button and wait for the internet to connect."}),`
`,e.jsx(n.li,{children:"In 3DSRNGTool go to Tools -> RNG Helper."}),`
`,e.jsxs(n.li,{children:["Fill in IP address.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The IP address can be found on the Rosalina screen once Input Redirection is enabled."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Open the Rosalina menu by pressing ",e.jsx(n.code,{children:"L+down+select"})," and enable Input Redirection on the 3DS."]}),`
`,e.jsxs(n.li,{children:['Click "One Click" to connect in RNG Helper window within 3DSRNGTool.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This will fill in the tiny seeds."}),`
`,e.jsx(n.li,{children:"This information can be manually filled in instead."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/OmegaRuby-AlphaSapphire/TID/NTR-Helper.png",alt:"NTR Helper"})}),`
`,e.jsxs(n.ol,{start:"6",children:[`
`,e.jsx(n.li,{children:'Press "Calculate" in the main window to receive a list of possible frames that you can RNG for.'}),`
`,e.jsx(n.li,{children:"Increase or decrease range as needed."}),`
`,e.jsxs(n.li,{children:["If the target frame is too high or the TID/SID/TSV combination is not possible on your seed then reboot the system to start over with a different seed.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Rosalina can quickly reboot the system by pressing ",e.jsx(n.code,{children:"L+Down+Select"})," and selecting the reboot option."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Soft resetting the game will hard lock the system!
`})}),`
`,e.jsx(n.p,{children:"In RNG Helper window fill in the starting and ending frame."}),`
`,e.jsx(n.p,{children:"At this point you can use the bot to advance the frames, or do it manually."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The speed of the bot will be dependent on the stability of the 3DS to your computer."}),`
`,e.jsx(n.li,{children:"Increase or decrease the speed of the bot to your liking."}),`
`]}),`
`,e.jsx(n.p,{children:"The bot will stop at 1 frame before the target frame."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"From there just name your character and confirm the selection."}),`
`,e.jsx(n.li,{children:"Wait until you can control your character to check if you got your TID/SID/TSV correct."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Press Start + Right then Select + Left to view TSV in the seventh party slot.
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.img,{src:"/images/OmegaRuby-AlphaSapphire/TID/Success.png",alt:"Success"}),`
`,e.jsx(n.img,{src:"/images/OmegaRuby-AlphaSapphire/TID/Success-2.png",alt:"Success"})]})]})}function o(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{o as default,r as frontmatter};
