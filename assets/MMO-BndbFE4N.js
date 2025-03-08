import{u as t,j as e}from"./index-BcYYhHNf.js";const a={title:"MMO RNG",description:"How to RNG MMOs using Sysbot and PermuteMMO",slug:"sysbot-lpa-mmo",subCategory:"Sysbot",tag:"cfw"};function i(s){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"A CFW Switch with sysbot"}),`
`,e.jsx(n.li,{children:'The "main" file (your save) of Legends Arceus'}),`
`,e.jsx(n.li,{children:"PermuteMMO from Kaphotics"}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/SteveCookTU/mmo_data_dumper/releases/tag/v0.1.0",children:"MMO Data Dumper"})," from EzPzStreamz"]}),`
`]}),`
`,e.jsx(n.p,{children:"For a smooth setup, place the MMO Data Dumper in the same folder as PermuteMMO. This ensures the required files are updated automatically. Also, put your main file in the PermuteMMO folder to help calculate the correct shiny rolls for each species."}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"MMO RNG in Legends Arceus is straightforward. This guide explains how to set up PermuteMMO, acquire the necessary files, and perform basic MMO RNG. It assumes sysbot is correctly configured."}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"In your game, check for available MMO(s)."}),`
`,e.jsx(n.li,{children:"Stay in Jubilife City and pause the game."}),`
`,e.jsxs(n.li,{children:["Run MMO Data Dumper via ",e.jsx(n.code,{children:"CMD"})," in your folder. Use ",e.jsx(n.code,{children:'"{file_name} {ip}"'})," where ",e.jsx(n.code,{children:"{file_name}"})," is your file name (usually ",e.jsx(n.code,{children:"mmo_data_dumper.exe"}),") and ",e.jsx(n.code,{children:"{ip}"})," is your Switch's IP address. This creates 'mo.bin' and 'mmo.bin' files in the PermuteMMO folder."]}),`
`,e.jsx(n.li,{children:"Run PermuteMMO to see MMO data and potential shinies. Locate your target and prepare for RNG."}),`
`]}),`
`,e.jsx(n.p,{children:"MMO can be tricky with skittish Pokémon. Start with aggressive targets. Save and reset if needed. Avoid rerunning the dumper tool on the map. Save in the village and retry if unsuccessful."}),`
`,e.jsx(n.h2,{children:"RNG"}),`
`,e.jsx(n.p,{children:"RNG involves deciphering PermuteMMO's tasks, like 'A3,' where the number represents Pokémon to despawn in multi-battles."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"A: Aggressive advances, easiest method. A4 requires defeating 4 Pokémon in a battle."}),`
`,e.jsx(n.li,{children:"B: Beta advances, a mix of skittish and aggressive Pokémon."}),`
`,e.jsx(n.li,{children:"O: Oblivious advances, ideal for Mr. Mime, Lickitung, and Magikarp. O2 means defeating 1 Oblivious and 1 Aggressive Pokémon."}),`
`,e.jsx(n.li,{children:"S: Scaring advances for skittish Pokémon. Look for a red '!' and fast travel when they flee."}),`
`,e.jsx(n.li,{children:"G: Ghost spawns triggered when only 4 Pokémon are left. G3 means despawning 3 Pokémon, moving away, and returning."}),`
`,e.jsx(n.li,{children:"CR: Clearing remaining Pokémon for the second wave if needed."}),`
`]}),`
`,e.jsx(n.p,{children:"Follow these steps to meet your target at the right time!"})]})}function o(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{o as default,a as frontmatter};
