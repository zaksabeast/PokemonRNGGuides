import{u as s,j as t}from"./index-C-XK6apt.js";const l={title:"Pokérus",navDrawerTitle:"Pokérus",description:"How Pokérus infection is triggered",slug:"gba-pokerus-technical",category:"GBA Technical Documentation",tag:"any",addedOn:"2025-05-13"};function r(n){const e={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...n.components},{Gist:i}=e;return i||a("Gist"),t.jsxs(t.Fragment,{children:[t.jsx(i,{children:t.jsx(e.p,{children:`Gist: Technical info about how Pokérus is triggered and understanding its
optimal setup for Ruby & Sapphire.`})}),`
`,t.jsx(e.h2,{children:"What is Pokérus?"}),`
`,t.jsx(e.p,{children:"After each wild battle, there is a 1 / 21,845 chance that one of your Pokémon will be infected with Pokérus. While infected by Pokérus, EVs gained from battling are doubled."}),`
`,t.jsx(e.h2,{children:"Retail RNG Manipulation"}),`
`,t.jsx(e.p,{children:"To RNG manipulate Pokérus on retail, we need the following technical information:"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"The target advance when Pokérus is determined that will result in an infection."}),`
`,t.jsx(e.li,{children:"The target player input advance (advance when the player must perform the last input)."}),`
`,t.jsx(e.li,{children:"How to calibrate (how to determine the actual hit player input advance)."}),`
`]}),`
`,t.jsxs(e.p,{children:["The following sections will explain how each of those elements were determined to create the ",t.jsx(e.a,{href:"/rs-pokerus-retail",children:"Pokérus RNG tool"}),"."]}),`
`,t.jsx(e.h3,{children:"Target Advance when Pokérus is Determined"}),`
`,t.jsx(e.p,{children:"One Pokémon of the team becomes infected if the RNG value is 0x4000, 0x8000 or 0xC000. In Ruby & Sapphire, the first occurences are at advances 26923, 101199, 101236. In Emerald, it's 66610."}),`
`,t.jsx(e.h3,{children:"Target Player Input Advance"}),`
`,t.jsx(e.p,{children:"To determine the target player input advance, we need to understand how the RNG evolves between the player input and the Pokérus trigger."}),`
`,t.jsxs(e.p,{children:["The last player input that triggers the Pokérus logic is pressing the ",t.jsx(e.code,{children:"A"}),' button on the message "XXX gained YY EXP.Points." at the end of a wild battle. Afterwards, the following occurs in Ruby & Sapphire:']}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"~94 RNG advances caused by vblanks and the battle loop."}),`
`,t.jsx(e.li,{children:"For each party Pokémon that has the Pickup ability, the RNG updates to determine if the Pokémon picked up an item. 10% of time, it does and a second RNG update determines the item."}),`
`,t.jsx(e.li,{children:"4 RNG advances caused by vblanks and the battle loop."}),`
`,t.jsx(e.li,{children:"If the player has entered the hall of fame and has at least one TV Show slot available, RNG advances by 1."}),`
`,t.jsx(e.li,{children:"If the player has entered the hall of fame and can trigger mass outbreak, RNG advances by 1. ~0.5% of the time, it does and a second RNG update determines the mass outbreak Pokémon."}),`
`,t.jsx(e.li,{children:"Another RNG advance for TV Show."}),`
`,t.jsx(e.li,{children:"74 RNG advances caused by vblanks and the battle loop."}),`
`,t.jsx(e.li,{children:"2 additional RNG advances if the Pokemon levels-up after the battle."}),`
`,t.jsx(e.li,{children:"RNG advance for Pokérus."}),`
`]}),`
`,t.jsx(e.h3,{children:"Variables"}),`
`,t.jsx(e.p,{children:"These are the variables that affect Pokérus and that are under the control of the player:"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Number of Pokémon with Pickup ability."}),`
`,t.jsx(e.li,{children:"Whether the player has entered the hall of fame."}),`
`,t.jsx(e.li,{children:"Whether the player can trigger a mass outbreak."}),`
`,t.jsx(e.li,{children:"Whether the player has at least one TV Show slot available."}),`
`,t.jsx(e.li,{children:"Whether the player's Pokémon will level-up after the battle."}),`
`]}),`
`,t.jsx(e.p,{children:"Each combination of those variables gives a different target player input advance. For example, with 5 Pickup Pokémon, not having entered hall of fame, no mass outbreak, no TV Show slot and no level-up, the target player input advance is 26838, in order to hit advance 26923 for Pokérus."}),`
`,t.jsx(e.h3,{children:"Calibration"}),`
`,t.jsx(e.p,{children:"There are many factors that affect Pokérus that are outside of the control of the player. Calibration is the process of adjusting the player inputs (ex: adjusting timers) to take into consider those factors."}),`
`,t.jsx(e.p,{children:"To perform calibration, we must determine the hit player input advance."}),`
`,t.jsx(e.p,{children:"For Pokérus, a list of possible hit player input advances can be determined by checking the items obtained from Pickup ability. In most cases, no items are obtained and this gives us little info. But in some cases (ex: obtaining a Rare Candy on 3rd Pokémon) gives us an accurate advance."}),`
`,t.jsx(e.h2,{children:"Optimal Setups"}),`
`,t.jsx(e.p,{children:"The criterias to determine if a setup is better than another are:"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Accuracy of calibration (number of Pickup Pokémon)."}),`
`,t.jsx(e.li,{children:"Requirements."}),`
`,t.jsx(e.li,{children:"Time to retry an attempt (target advance)."}),`
`,t.jsxs(e.li,{children:["Difficulty to perform. With certain specific setups, Pokérus can be triggered by pressing ",t.jsx(e.code,{children:"A"})," on two possible advances, making it easier to perform."]}),`
`]}),`
`,t.jsx(e.p,{children:"The setups I recommend are, from best to worst:"}),`
`,t.jsxs(e.table,{children:[t.jsx(e.thead,{children:t.jsxs(e.tr,{children:[t.jsx(e.th,{children:"Setup"}),t.jsx(e.th,{children:"Pickup Count"}),t.jsx(e.th,{children:"Hall of Fame"}),t.jsx(e.th,{children:"Mass Outbreak"}),t.jsx(e.th,{children:"TV Show Slot"}),t.jsx(e.th,{children:"Level-up"}),t.jsx(e.th,{children:"Target Input Adv"})]})}),t.jsxs(e.tbody,{children:[t.jsxs(e.tr,{children:[t.jsx(e.td,{children:"#1"}),t.jsx(e.td,{children:"5"}),t.jsx(e.td,{children:"No"}),t.jsx(e.td,{children:"*"}),t.jsx(e.td,{children:"*"}),t.jsx(e.td,{children:"No"}),t.jsx(e.td,{children:"26838"})]}),t.jsxs(e.tr,{children:[t.jsx(e.td,{children:"#2"}),t.jsx(e.td,{children:"2"}),t.jsx(e.td,{children:"No"}),t.jsx(e.td,{children:"*"}),t.jsx(e.td,{children:"*"}),t.jsx(e.td,{children:"No"}),t.jsx(e.td,{children:"26841 or 26842"})]}),t.jsxs(e.tr,{children:[t.jsx(e.td,{children:"#3"}),t.jsx(e.td,{children:"5"}),t.jsx(e.td,{children:"Yes"}),t.jsx(e.td,{children:"No"}),t.jsx(e.td,{children:"Yes"}),t.jsx(e.td,{children:"No"}),t.jsx(e.td,{children:"26837"})]}),t.jsxs(e.tr,{children:[t.jsx(e.td,{children:"#4"}),t.jsx(e.td,{children:"1"}),t.jsx(e.td,{children:"Yes"}),t.jsx(e.td,{children:"No"}),t.jsx(e.td,{children:"Yes"}),t.jsx(e.td,{children:"No"}),t.jsx(e.td,{children:"26841 or 26842"})]}),t.jsxs(e.tr,{children:[t.jsx(e.td,{children:"Worst"}),t.jsx(e.td,{children:">0"}),t.jsx(e.td,{children:"Yes"}),t.jsx(e.td,{children:"Yes"}),t.jsx(e.td,{children:"Yes"}),t.jsx(e.td,{children:"*"}),t.jsx(e.td,{children:"~101199"})]})]})]}),`
`,t.jsx(e.p,{children:"For advanced users, it is possible to initially use setup #1 or #3 with 5 Pickup Pokémon which is the best for calibration. Once calibration is complete, switch to setup #2 or #4 which are easier to perform because they have a 2-advances window."}),`
`,t.jsx(e.p,{children:"With the worst setup above, it is impossible to hit the target advance 26923 for Pokérus. The earliest Pokérus is at advance 101199."}),`
`,t.jsx(e.h2,{children:"Advance Parity"}),`
`,t.jsx(e.p,{children:`While waiting in battle, RNG advances by 2 every frame. If your RNG advance is odd, then it will always stay odd, meaning that an even target advance (ex: 26838) is impossible to hit.
It is theorically possible to determine the advance parity based on the species fought. Using Sweet Scent and letting the opponent attack you will switch the parity from odd to even (or even to odd).`}),`
`,t.jsx(e.h2,{children:"Searcher info"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:["TV Show function: ",t.jsx(e.a,{href:"https://github.com/pret/pokeruby/blob/master/src/tv.c#L797",children:"PutPokemonTodayCaughtOnAir()"})]}),`
`,t.jsxs(e.li,{children:["Pickup function: ",t.jsx(e.a,{href:"https://github.com/pret/pokeruby/blob/master/src/battle_script_commands.c#L9200",children:"atkE5_pickup()"})]}),`
`,t.jsxs(e.li,{children:["Pokérus function: ",t.jsx(e.a,{href:"https://github.com/pret/pokeruby/blob/master/src/pokemon_3.c#L817",children:"RandomlyGivePartyPokerus()"})]}),`
`,t.jsx(e.li,{children:t.jsx(e.a,{href:"https://github.com/RainingChain/pk_emu_scripts/blob/main/Gen3/log_rng_advances.lua",children:"Lua script to print RNG advance"})}),`
`]}),`
`,t.jsx(e.h2,{children:"Credits"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Guide and scripts: RainingChain."}),`
`,t.jsx(e.li,{children:"Script inspiration: Real96."}),`
`,t.jsxs(e.li,{children:["Decompil projects: ",t.jsx(e.a,{href:"https://github.com/pret",children:"pret team"}),"."]}),`
`]})]})}function o(n={}){const{wrapper:e}={...s(),...n.components};return e?t.jsx(e,{...n,children:t.jsx(r,{...n})}):r(n)}function a(n,e){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{o as default,l as frontmatter};
