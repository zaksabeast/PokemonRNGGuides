import{u as s,j as e}from"./index-Cx4QpB68.js";const a={title:"(XD) Eevee PAL RNG",description:"How to RNG the starter Eevee with a PAL Pokemon XD",slug:"pal-xd-eevee",subCategory:"Emulator",isRoughDraft:!1};function i(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Requirements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Dolphin with the Lua support (Only available on the Discord at the moment)"}),`
`,e.jsx(n.li,{children:"The Lua scripts for Gamecube (Only available on the Discord at the moment)"}),`
`,e.jsx(n.li,{children:"PokeFinder"}),`
`,e.jsxs(n.li,{children:["PAL-Pal (",e.jsx(n.a,{href:"https://github.com/KapitalRoser/PAL-Pal",children:"https://github.com/KapitalRoser/PAL-Pal"}),") done by Kapital#9267"]}),`
`,e.jsx(n.li,{children:"A new save of PAL XD"}),`
`,e.jsxs(n.li,{children:["The list of Shiny Eevee spreads done by Parzival#3035 (",e.jsx(n.a,{href:"https://pastebin.com/0Dh740Kg",children:"https://pastebin.com/0Dh740Kg"}),") if you follow the Method 2"]}),`
`,e.jsx(n.li,{children:"RunAsDate (x64) if you follow the Method 2"}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"This guide covers two methods to RNG Eevee in the PAL XD version. Choose the one that suits your needs: one based on a known Eevee spread list, involving Initial Seed RNG, and the other, simpler, using any Initial Seed, allowing more random spreads."}),`
`,e.jsx(n.p,{children:"This guide assumes basic knowledge of emulator setup and Initial Seed RNG, specifically for PAL XD."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This guide only works for PAL XD; it doesn't apply to the NTSC version.
`})}),`
`,e.jsx(n.h2,{children:"Advancing the RNG"}),`
`,e.jsx(n.p,{children:"Before diving into RNG, understand how to advance the RNG as the PAL version freezes in the name menu. Use these four methods:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Rerolls"}),': Triggered in the main menu by navigating to "VS Mode" => "Quick Battle" => "Battle vs CPU" => Ultimate. Each reroll is initiated when Pokémon are shown. Press "No" and redo for multiple advances.']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Memory Card Reloads"}),": Simply press B and A in the main menu to reload Memory Card Data, indicated by an in-game message. Each reload counts as +1."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Options Saves"}),": Go to Settings, change the Rumbling setting, and save before returning to the main menu."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Name Screen Blackout"}),": Start a New Game and press B when asked about using a specific or custom name. Avoid selecting a name as it's irreversible."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Set your trainer's name when the Current Seed matches your target Seed. Avoid Name Screen Blackout at this point.
`})}),`
`,e.jsx(n.h2,{children:"Method 1: Using PAL-Pal Only"}),`
`,e.jsx(n.p,{children:"This is a straightforward setup for hitting any Eevee not listed but can be time-consuming and yield less favorable spreads."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open Dolphin, load the Luas, note the Current Seed in the main menu, and pause the emulator."}),`
`,e.jsx(n.li,{children:"Open PAL-Pal, go to the Speedrun tab, configure filters for your desired Eevee (Shiny, IVs, gender, Nature), and save."}),`
`,e.jsx(n.li,{children:"Input the Current Seed in the 'Current Seed (Hex)' window and search for results."}),`
`,e.jsx(n.li,{children:"Cycle between results using 'Next' and 'Previous.'"}),`
`,e.jsx(n.li,{children:"Once you find the right result, follow the instructions to get the path and perform the necessary advances."}),`
`]}),`
`,e.jsx(n.h2,{children:"Method 2: Using the Shiny Eevee Spread List"}),`
`,e.jsx(n.p,{children:"This method requires Initial Seed RNG but provides fast access to amazing spreads."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder, go to the Gamecube RTC tab, and input the Seed of your desired Eevee in the Target Seed section. Ensure the Initial Seed is around 15-20k advances and nothing earlier."}),`
`,e.jsx(n.li,{children:"Do the Initial Seed RNG with runasdate, Dolphin, and the lua script. Pause the emulator on the main screen."}),`
`,e.jsx(n.li,{children:"Open PAL-Pal, go to the Custom Tab, and input your Current Seed."}),`
`,e.jsx(n.li,{children:"For the Target Title Seed, you don't input your Target Seed but the Seed that allows hitting the target. Use the Researcher in PokeFinder, select XDRNG[R], put the Target Seed in the Seed box, set Max Advance to 1010, and generate results. Check Advance 1000; it's your Target Title Screen to input in PAL-Pal."}),`
`,e.jsx(n.li,{children:"Click on Search, and your Eevee should be the first one. Follow the path to advance your Seeds and obtain your Shiny Eevee."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The delay may not be exactly 1000 but slightly different. Stick with 1000; if it doesn't match the Target Seed, you'll perform a few extra advances in-game. To adjust, use the results from Advance 1002 and 1004 in the Researcher.
`})})]})}function o(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{o as default,a as frontmatter};
