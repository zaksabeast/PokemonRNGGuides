import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-xhnL4jIs.js";var n=e(),r={title:`X and Y TID RNG`,navDrawerTitle:`TID RNG`,description:`Learn how to obtain your desired Trainer ID (TID) and Secret ID (SID) combo in X and Y.`,slug:`pcalc-xy-tid`,category:`X and Y`,section:`other_rng`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Intro`}),`
`,(0,n.jsxs)(r.p,{children:[`You need a new save file to RNG the Trainer ID, Secret ID, or Trainer Shiny Value. To delete an existing save file, press `,(0,n.jsx)(r.code,{children:`X + B + Up`}),` on the d-pad at the title screen. This deletes the current save file and brings you to the language select screen.`]}),`
`,(0,n.jsxs)(r.p,{children:[`Make sure to back up your save file using a save file manager like `,(0,n.jsx)(r.a,{href:`https://github.com/FlagBrew/Checkpoint/releases`,children:`Checkpoint`}),` if you want to return to a previous save file.`]}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`/install-pokereader`,children:`A 3DS with PokeReader`}),` OR `,(0,n.jsx)(r.a,{href:`/citrarng-setup`,children:`Azahar with PokeReader`})]}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: 3DSRNGTool Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`In the upper right corner, select your game version. Seed and TSV can be blank.`}),`
`,(0,n.jsx)(r.li,{children:`In the "ID RNG" tab, fill in your desired TID, SID, or TSV. 3DSRNGTool can search for parts of numbers or the full number. It is recommended to RNG for only one at a time.`}),`
`,(0,n.jsx)(r.li,{children:`Under "Frame Range," start from "0".`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Game Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Select the game language.`}),`
`,(0,n.jsx)(r.li,{children:`Continue playing until you reach the screen asking if your name is correct.`}),`
`,(0,n.jsxs)(r.li,{children:[`Pause the game by pressing `,(0,n.jsx)(r.code,{children:`Start + Select`}),` on that screen.`]}),`
`,(0,n.jsx)(r.li,{children:`Input the 4 TinyMT seeds from PokeReader into the 4 boxes in 3DSRNGTool. Use the numbers directly listed under "Tiny u32 seed".`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Finding a Target Frame`}),`
`,(0,n.jsx)(r.p,{children:`The frames in 3DSRNGTool track 4 values known as tiny seeds. These seeds generate trainer info like TID, SID, and TSV. Each advancement in tiny seeds equals a frame advancement. Note that these frames differ from the MT Advances in PokeReader.`}),`
`,(0,n.jsx)(r.p,{children:`In X/Y, tiny seeds advance throughout the introduction at a random pace, but in a predictable order that 3DSRNGTool can track.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Press "Calculate" in the main window to get a list of frames available for RNG.`}),`
`,(0,n.jsx)(r.li,{children:`Adjust the range as needed. Higher frames take longer to obtain the desired TID/SID/TSV.`}),`
`,(0,n.jsxs)(r.li,{children:[`If the target frame is too high or the TID/SID/TSV combination is not possible with your initial seed, press `,(0,n.jsx)(r.code,{children:`Start + Select + L + R`}),` to soft reset for a different initial seed.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 4: Advancing the Tiny Seeds`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Unpause the game by pressing `,(0,n.jsx)(r.code,{children:`Start`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`After confirming your character selection, advance to the next screen.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`"(name)... Tres bien! What a fantastic name!"`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Allow tiny seeds to advance on this screen.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`The number from "Frame" in 3DSRNGTool is the same as the "Advances" number in PokeReader underneath "TinyMT seed".`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`When your desired TID/SID/TSV is about 12 frames away from the current seeds, pause the game using `,(0,n.jsx)(r.code,{children:`Start + Select`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Advance frames and tiny seeds by pressing `,(0,n.jsx)(r.code,{children:`Select`}),` while the game is paused.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Once on the correct frame, hold `,(0,n.jsx)(r.code,{children:`A`}),` so you unpause at that exact frame to hit the right tiny seeds.`]}),`
`,(0,n.jsx)(r.li,{children:`After gaining control of your character, check your TID via the trainer card.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};