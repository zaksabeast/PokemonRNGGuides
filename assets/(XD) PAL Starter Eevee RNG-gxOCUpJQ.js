import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-jyHeP0dh.js";var n=e(),r={title:`XD Eevee PAL RNG`,description:`How to RNG the starter Eevee with a PAL Pokemon XD.`,slug:`pal-xd-eevee`,category:`Gamecube`,isRoughDraft:!1,section:`pokemon_rng`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Dolphin with Lua support (available on Discord)`}),`
`,(0,n.jsx)(r.li,{children:`Lua scripts for Gamecube (available on Discord)`}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsxs)(r.li,{children:[`PAL-Pal (`,(0,n.jsx)(r.a,{href:`https://github.com/KapitalRoser/PAL-Pal`,children:`https://github.com/KapitalRoser/PAL-Pal`}),`) by Kapital#9267`]}),`
`,(0,n.jsx)(r.li,{children:`A new save of PAL XD`}),`
`,(0,n.jsxs)(r.li,{children:[`List of shiny Eevee spreads by Parzival#3035 (`,(0,n.jsx)(r.a,{href:`https://pastebin.com/0Dh740Kg`,children:`https://pastebin.com/0Dh740Kg`}),`) for Method 2`]}),`
`,(0,n.jsx)(r.li,{children:`RunAsDate (x64) for Method 2`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Intro`}),`
`,(0,n.jsx)(r.p,{children:`This guide covers two methods to RNG Eevee in PAL XD. Choose based on your needs: one with a known Eevee spread list using Initial Seed RNG, and a simpler method using any Initial Seed for more random spreads.`}),`
`,(0,n.jsx)(r.p,{children:`This guide assumes basic knowledge of emulator setup and Initial Seed RNG for PAL XD.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: This guide only works for PAL XD; it doesn't apply to the NTSC version.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Advancing the RNG`}),`
`,(0,n.jsx)(r.p,{children:`Understand how to advance the RNG since the PAL version freezes in the name menu. Use these methods:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Rerolls: Triggered in the main menu by going to "VS Mode" => "Quick Battle" => "Battle vs CPU" => Ultimate. Each reroll is when Pokémon are shown. Press `,(0,n.jsx)(r.code,{children:`No`}),` and redo for multiple advances.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Memory Card Reloads: Press `,(0,n.jsx)(r.code,{children:`B`}),` and `,(0,n.jsx)(r.code,{children:`A`}),` in the main menu to reload Memory Card Data, shown by an in-game message. Each reload counts as +1.`]}),`
`,(0,n.jsx)(r.li,{children:`Options Saves: Change the Rumbling setting in Settings, save, then return to the main menu.`}),`
`,(0,n.jsxs)(r.li,{children:[`Name Screen Blackout: Start a New Game and press `,(0,n.jsx)(r.code,{children:`B`}),` when asked about using a specific name. Do not select a name as it's irreversible.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Set your trainer's name when the Current Seed matches your target Seed. Avoid Name Screen Blackout at this point.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Method 1: Using PAL-Pal Only`}),`
`,(0,n.jsx)(r.p,{children:`This method is straightforward for hitting any Eevee not listed but can take time and yield less favorable spreads.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open Dolphin, load the Luas, note the Current Seed in the main menu, and pause the emulator.`}),`
`,(0,n.jsx)(r.li,{children:`Open PAL-Pal, go to the Speedrun tab, set filters for your desired Eevee (Shiny, IVs, gender, Nature), and save.`}),`
`,(0,n.jsx)(r.li,{children:`Input the Current Seed in the 'Current Seed (Hex)' window and search for results.`}),`
`,(0,n.jsx)(r.li,{children:`Cycle between results using 'Next' and 'Previous.'`}),`
`,(0,n.jsx)(r.li,{children:`Once you find the right result, follow instructions to get the path and perform necessary advances.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Method 2: Using the Shiny Eevee Spread List`}),`
`,(0,n.jsx)(r.p,{children:`This method needs Initial Seed RNG but quickly accesses great spreads.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open PokeFinder, go to the Gamecube RTC tab, and input the Seed of your desired Eevee in the Target Seed section. Ensure the Initial Seed is around 15-20k advances, nothing earlier.`}),`
`,(0,n.jsx)(r.li,{children:`Do the Initial Seed RNG with RunAsDate, Dolphin, and the Lua script. Pause the emulator on the main screen.`}),`
`,(0,n.jsx)(r.li,{children:`Open PAL-Pal, go to the Custom Tab, and input your Current Seed.`}),`
`,(0,n.jsx)(r.li,{children:`For the Target Title Seed, input the Seed that allows hitting the target, not the Target Seed. Use the Researcher in PokeFinder, select XDRNG[R], put the Target Seed in the Seed box, set Max Advance to 1010, and generate results. Check Advance 1000; it's your Target Title Seed to input in PAL-Pal.`}),`
`,(0,n.jsx)(r.li,{children:`Click on Search; your Eevee should be first. Follow the path to advance your Seeds and get your shiny Eevee.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: The delay may not be exactly 1000 but slightly different. Stick with 1000; if it doesn't match the Target Seed, you'll perform a few extra advances in-game. To adjust, use results from Advance 1002 and 1004 in the Researcher.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};