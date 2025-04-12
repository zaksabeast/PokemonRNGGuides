import{u as l,j as e}from"./index-BMulREJZ.js";const r={title:"Trainer ID RNG",description:"RNG for that special TID/SID/TSV",slug:"retail-oras-tid",category:"Omega Ruby and Alpha Sapphire",tag:"cfw"};function s(i){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:"If a save file is present, delete it by pressing `X+Y+Down` on the d-pad at the title screen. This will remove the save file and start the game at the language select screen.\n"})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with PCalc (",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-installing-pcalc",children:"PCalc Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`,e.jsx(n.li,{children:"(Optional) A network connection"}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Setup 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['In the upper right corner, select your game version and click "Advance."',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Seed and TSV can be blank."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"In the ID tab, fill in your desired TID, SID, or TSV."}),`
`,e.jsxs(n.li,{children:["3DSRNGTool can search for multiple numbers partially or fully.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Finding a specific TID/SID/TSV combination is very rare. It is advised to RNG for only one at a time."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/OmegaRuby-AlphaSapphire/TID/Setup.png",alt:"Setup"})}),`
`,e.jsx(n.p,{children:"In this example, we will be getting the highlighted TID."}),`
`,e.jsx(n.h2,{children:"Step 2: Setup the game"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load BootNTR Selector, then the game."}),`
`,e.jsxs(n.li,{children:["Select game language.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'The bot used later can assist by selecting the "Mash A" option if set up early.'}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Continue playing until this screen appears."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/OmegaRuby-AlphaSapphire/TID/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsx(n.h2,{children:"Step 3: Advancing the frames"}),`
`,e.jsx(n.p,{children:'Every time "No" is selected when confirming the name, one frame advances. This can be tedious, especially for higher target frames. A bot can automate frame advancement.'}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`If a network connection is not available, manually fill in the tiny seeds.
`})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Press the home button and wait for the internet to connect."}),`
`,e.jsx(n.li,{children:"In 3DSRNGTool, go to Tools -> RNG Helper."}),`
`,e.jsxs(n.li,{children:["Fill in the IP address.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The IP address can be found on the Rosalina screen after enabling Input Redirection."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Open the Rosalina menu by pressing ",e.jsx(n.code,{children:"L+Down+Select"})," and enable Input Redirection on the 3DS."]}),`
`,e.jsxs(n.li,{children:['Click "One Click" in the RNG Helper window to connect.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This will fill in the tiny seeds."}),`
`,e.jsx(n.li,{children:"This information can also be filled in manually."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/OmegaRuby-AlphaSapphire/TID/NTR-Helper.png",alt:"NTR Helper"})}),`
`,e.jsxs(n.ol,{start:"6",children:[`
`,e.jsx(n.li,{children:'Press "Calculate" in the main window to get a list of possible frames for RNG.'}),`
`,e.jsx(n.li,{children:"Adjust the range as needed."}),`
`,e.jsxs(n.li,{children:["If the target frame is too high or the TID/SID/TSV combination is not possible with your seed, reboot the system to start over with a different seed.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Rosalina can reboot quickly by pressing ",e.jsx(n.code,{children:"L+Down+Select"})," and selecting the reboot option."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Soft resetting the game will hard lock the system!
`})}),`
`,e.jsx(n.p,{children:"In the RNG Helper window, fill in the starting and ending frames."}),`
`,e.jsx(n.p,{children:"At this point, you can use the bot to advance frames or do it manually."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The bot's speed depends on your 3DS's stability with your computer."}),`
`,e.jsx(n.li,{children:"Adjust the bot's speed to your liking."}),`
`]}),`
`,e.jsx(n.p,{children:"The bot will stop 1 frame before the target frame."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Name your character and confirm the selection."}),`
`,e.jsx(n.li,{children:"Wait until you can control your character to check if you got your TID/SID/TSV correct."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Press Start + Right then Select + Left to view TSV in the seventh party slot.
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.img,{src:"/images/OmegaRuby-AlphaSapphire/TID/Success.png",alt:"Success"}),`
`,e.jsx(n.img,{src:"/images/OmegaRuby-AlphaSapphire/TID/Success-2.png",alt:"Success"})]})]})}function a(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{a as default,r as frontmatter};
