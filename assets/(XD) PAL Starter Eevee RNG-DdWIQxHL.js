import{u as i,j as e}from"./index-VB2BNfLm.js";const a={title:"(XD) Eevee PAL RNG",description:"How to RNG the starter Eevee with a PAL Pokemon XD",slug:"pal-xd-eevee",subCategory:"Emulator",isRoughDraft:!1};function s(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Dolphin with Lua support (available on Discord)"}),`
`,e.jsx(n.li,{children:"Lua scripts for Gamecube (available on Discord)"}),`
`,e.jsx(n.li,{children:"PokeFinder"}),`
`,e.jsxs(n.li,{children:["PAL-Pal (",e.jsx(n.a,{href:"https://github.com/KapitalRoser/PAL-Pal",children:"https://github.com/KapitalRoser/PAL-Pal"}),") by Kapital#9267"]}),`
`,e.jsx(n.li,{children:"A new save of PAL XD"}),`
`,e.jsxs(n.li,{children:["List of shiny Eevee spreads by Parzival#3035 (",e.jsx(n.a,{href:"https://pastebin.com/0Dh740Kg",children:"https://pastebin.com/0Dh740Kg"}),") for Method 2"]}),`
`,e.jsx(n.li,{children:"RunAsDate (x64) for Method 2"}),`
`]}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"This guide covers two methods to RNG Eevee in PAL XD. Choose based on your needs: one with a known Eevee spread list using Initial Seed RNG, and a simpler method using any Initial Seed for more random spreads."}),`
`,e.jsx(n.p,{children:"This guide assumes basic knowledge of emulator setup and Initial Seed RNG for PAL XD."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This guide only works for PAL XD; it doesn't apply to the NTSC version.
`})}),`
`,e.jsx(n.h2,{children:"Advancing the RNG"}),`
`,e.jsx(n.p,{children:"Understand how to advance the RNG since the PAL version freezes in the name menu. Use these methods:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['Rerolls: Triggered in the main menu by going to "VS Mode" => "Quick Battle" => "Battle vs CPU" => Ultimate. Each reroll is when Pokémon are shown. Press ',e.jsx(n.code,{children:"No"})," and redo for multiple advances."]}),`
`,e.jsxs(n.li,{children:["Memory Card Reloads: Press ",e.jsx(n.code,{children:"B"})," and ",e.jsx(n.code,{children:"A"})," in the main menu to reload Memory Card Data, shown by an in-game message. Each reload counts as +1."]}),`
`,e.jsx(n.li,{children:"Options Saves: Change the Rumbling setting in Settings, save, then return to the main menu."}),`
`,e.jsxs(n.li,{children:["Name Screen Blackout: Start a New Game and press ",e.jsx(n.code,{children:"B"})," when asked about using a specific name. Do not select a name as it's irreversible."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Set your trainer's name when the Current Seed matches your target Seed. Avoid Name Screen Blackout at this point.
`})}),`
`,e.jsx(n.h2,{children:"Method 1: Using PAL-Pal Only"}),`
`,e.jsx(n.p,{children:"This method is straightforward for hitting any Eevee not listed but can take time and yield less favorable spreads."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open Dolphin, load the Luas, note the Current Seed in the main menu, and pause the emulator."}),`
`,e.jsx(n.li,{children:"Open PAL-Pal, go to the Speedrun tab, set filters for your desired Eevee (Shiny, IVs, gender, Nature), and save."}),`
`,e.jsx(n.li,{children:"Input the Current Seed in the 'Current Seed (Hex)' window and search for results."}),`
`,e.jsx(n.li,{children:"Cycle between results using 'Next' and 'Previous.'"}),`
`,e.jsx(n.li,{children:"Once you find the right result, follow instructions to get the path and perform necessary advances."}),`
`]}),`
`,e.jsx(n.h2,{children:"Method 2: Using the Shiny Eevee Spread List"}),`
`,e.jsx(n.p,{children:"This method needs Initial Seed RNG but quickly accesses great spreads."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder, go to the Gamecube RTC tab, and input the Seed of your desired Eevee in the Target Seed section. Ensure the Initial Seed is around 15-20k advances, nothing earlier."}),`
`,e.jsx(n.li,{children:"Do the Initial Seed RNG with RunAsDate, Dolphin, and the Lua script. Pause the emulator on the main screen."}),`
`,e.jsx(n.li,{children:"Open PAL-Pal, go to the Custom Tab, and input your Current Seed."}),`
`,e.jsx(n.li,{children:"For the Target Title Seed, input the Seed that allows hitting the target, not the Target Seed. Use the Researcher in PokeFinder, select XDRNG[R], put the Target Seed in the Seed box, set Max Advance to 1010, and generate results. Check Advance 1000; it's your Target Title Seed to input in PAL-Pal."}),`
`,e.jsx(n.li,{children:"Click on Search; your Eevee should be first. Follow the path to advance your Seeds and get your shiny Eevee."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The delay may not be exactly 1000 but slightly different. Stick with 1000; if it doesn't match the Target Seed, you'll perform a few extra advances in-game. To adjust, use results from Advance 1002 and 1004 in the Researcher.
`})})]})}function o(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{o as default,a as frontmatter};
