import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-OZ62x8fR.js";var n=e(),r={title:`Pokérus`,navDrawerTitle:`Pokérus`,description:`How Pokérus infection is triggered`,slug:`gba-pokerus-technical`,category:[`Ruby and Sapphire`,`FireRed and LeafGreen`,`Emerald`],section:`technical_info`,addedOn:`2025-05-13`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{Gist:i}=r;return i||o(`Gist`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:(0,n.jsx)(r.p,{children:`Gist: Technical info about how Pokérus is triggered and understanding its
optimal setup for Ruby & Sapphire.`})}),`
`,(0,n.jsx)(r.h2,{children:`What is Pokérus?`}),`
`,(0,n.jsx)(r.p,{children:`After each wild battle, there is a 1 / 21,845 chance that one of your Pokémon will be infected with Pokérus. While infected by Pokérus, EVs gained from battling are doubled.`}),`
`,(0,n.jsx)(r.h2,{children:`Retail RNG Manipulation`}),`
`,(0,n.jsx)(r.p,{children:`To RNG manipulate Pokérus on retail, we need the following technical information:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`The target advance when Pokérus is determined that will result in an infection.`}),`
`,(0,n.jsx)(r.li,{children:`The target player input advance (advance when the player must perform the last input).`}),`
`,(0,n.jsx)(r.li,{children:`How to calibrate (how to determine the actual hit player input advance).`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`The following sections will explain how each of those elements were determined to create the `,(0,n.jsx)(r.a,{href:`/rs-pokerus-retail`,children:`Pokérus RNG tool`}),`.`]}),`
`,(0,n.jsx)(r.h3,{children:`Target Advance when Pokérus is Determined`}),`
`,(0,n.jsx)(r.p,{children:`One Pokémon of the team becomes infected if the RNG value is 0x4000, 0x8000 or 0xC000. In Ruby & Sapphire, the first occurences are at advances 26923, 101199, 101236. In Emerald, it's 66610.`}),`
`,(0,n.jsx)(r.h3,{children:`Target Player Input Advance`}),`
`,(0,n.jsx)(r.p,{children:`To determine the target player input advance, we need to understand how the RNG evolves between the player input and the Pokérus trigger.`}),`
`,(0,n.jsxs)(r.p,{children:[`The last player input that triggers the Pokérus logic is pressing the `,(0,n.jsx)(r.code,{children:`A`}),` button on the message "XXX gained YY EXP.Points." at the end of a wild battle. Afterwards, the following occurs in Ruby & Sapphire:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`~94 RNG advances caused by vblanks and the battle loop.`}),`
`,(0,n.jsx)(r.li,{children:`For each party Pokémon that has the Pickup ability, the RNG updates to determine if the Pokémon picked up an item. 10% of time, it does and a second RNG update determines the item.`}),`
`,(0,n.jsx)(r.li,{children:`4 RNG advances caused by vblanks and the battle loop.`}),`
`,(0,n.jsx)(r.li,{children:`If the player has entered the hall of fame and has at least one TV Show slot available, RNG advances by 1.`}),`
`,(0,n.jsx)(r.li,{children:`If the player has entered the hall of fame and can trigger mass outbreak, RNG advances by 1. ~0.5% of the time, it does and a second RNG update determines the mass outbreak Pokémon.`}),`
`,(0,n.jsx)(r.li,{children:`Another RNG advance for TV Show.`}),`
`,(0,n.jsx)(r.li,{children:`74 RNG advances caused by vblanks and the battle loop.`}),`
`,(0,n.jsx)(r.li,{children:`2 additional RNG advances if the Pokemon levels-up after the battle.`}),`
`,(0,n.jsx)(r.li,{children:`RNG advance for Pokérus.`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Variables`}),`
`,(0,n.jsx)(r.p,{children:`These are the variables that affect Pokérus and that are under the control of the player:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Number of Pokémon with Pickup ability.`}),`
`,(0,n.jsx)(r.li,{children:`Whether the player has entered the hall of fame.`}),`
`,(0,n.jsx)(r.li,{children:`Whether the player can trigger a mass outbreak.`}),`
`,(0,n.jsx)(r.li,{children:`Whether the player has at least one TV Show slot available.`}),`
`,(0,n.jsx)(r.li,{children:`Whether the player's Pokémon will level-up after the battle.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Each combination of those variables gives a different target player input advance. For example, with 5 Pickup Pokémon, not having entered hall of fame, no mass outbreak, no TV Show slot and no level-up, the target player input advance is 26838, in order to hit advance 26923 for Pokérus.`}),`
`,(0,n.jsx)(r.h3,{children:`Calibration`}),`
`,(0,n.jsx)(r.p,{children:`There are many factors that affect Pokérus that are outside of the control of the player. Calibration is the process of adjusting the player inputs (ex: adjusting timers) to take into consider those factors.`}),`
`,(0,n.jsx)(r.p,{children:`To perform calibration, we must determine the hit player input advance.`}),`
`,(0,n.jsx)(r.p,{children:`For Pokérus, a list of possible hit player input advances can be determined by checking the items obtained from Pickup ability. In most cases, no items are obtained and this gives us little info. But in some cases (ex: obtaining a Rare Candy on 3rd Pokémon) gives us an accurate advance.`}),`
`,(0,n.jsx)(r.h2,{children:`Optimal Setups`}),`
`,(0,n.jsx)(r.p,{children:`The criterias to determine if a setup is better than another are:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Accuracy of calibration (number of Pickup Pokémon).`}),`
`,(0,n.jsx)(r.li,{children:`Requirements.`}),`
`,(0,n.jsx)(r.li,{children:`Time to retry an attempt (target advance).`}),`
`,(0,n.jsxs)(r.li,{children:[`Difficulty to perform. With certain specific setups, Pokérus can be triggered by pressing `,(0,n.jsx)(r.code,{children:`A`}),` on two possible advances, making it easier to perform.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`The setups I recommend are, from best to worst:`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Setup`}),(0,n.jsx)(r.th,{children:`Pickup Count`}),(0,n.jsx)(r.th,{children:`Hall of Fame`}),(0,n.jsx)(r.th,{children:`Mass Outbreak`}),(0,n.jsx)(r.th,{children:`TV Show Slot`}),(0,n.jsx)(r.th,{children:`Level-up`}),(0,n.jsx)(r.th,{children:`Target Input Adv`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`#1`}),(0,n.jsx)(r.td,{children:`5`}),(0,n.jsx)(r.td,{children:`No`}),(0,n.jsx)(r.td,{children:`*`}),(0,n.jsx)(r.td,{children:`*`}),(0,n.jsx)(r.td,{children:`No`}),(0,n.jsx)(r.td,{children:`26838`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`#2`}),(0,n.jsx)(r.td,{children:`2`}),(0,n.jsx)(r.td,{children:`No`}),(0,n.jsx)(r.td,{children:`*`}),(0,n.jsx)(r.td,{children:`*`}),(0,n.jsx)(r.td,{children:`No`}),(0,n.jsx)(r.td,{children:`26841 or 26842`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`#3`}),(0,n.jsx)(r.td,{children:`5`}),(0,n.jsx)(r.td,{children:`Yes`}),(0,n.jsx)(r.td,{children:`No`}),(0,n.jsx)(r.td,{children:`Yes`}),(0,n.jsx)(r.td,{children:`No`}),(0,n.jsx)(r.td,{children:`26837`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`#4`}),(0,n.jsx)(r.td,{children:`1`}),(0,n.jsx)(r.td,{children:`Yes`}),(0,n.jsx)(r.td,{children:`No`}),(0,n.jsx)(r.td,{children:`Yes`}),(0,n.jsx)(r.td,{children:`No`}),(0,n.jsx)(r.td,{children:`26841 or 26842`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Worst`}),(0,n.jsx)(r.td,{children:`>0`}),(0,n.jsx)(r.td,{children:`Yes`}),(0,n.jsx)(r.td,{children:`Yes`}),(0,n.jsx)(r.td,{children:`Yes`}),(0,n.jsx)(r.td,{children:`*`}),(0,n.jsx)(r.td,{children:`~101199`})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`For advanced users, it is possible to initially use setup #1 or #3 with 5 Pickup Pokémon which is the best for calibration. Once calibration is complete, switch to setup #2 or #4 which are easier to perform because they have a 2-advances window.`}),`
`,(0,n.jsx)(r.p,{children:`With the worst setup above, it is impossible to hit the target advance 26923 for Pokérus. The earliest Pokérus is at advance 101199.`}),`
`,(0,n.jsx)(r.h2,{children:`Advance Parity`}),`
`,(0,n.jsx)(r.p,{children:`While waiting in battle, RNG advances by 2 every frame. If your RNG advance is odd, then it will always stay odd, meaning that an even target advance (ex: 26838) is impossible to hit.
It is theorically possible to determine the advance parity based on the species fought. Using Sweet Scent and letting the opponent attack you will switch the parity from odd to even (or even to odd).`}),`
`,(0,n.jsx)(r.h2,{children:`Searcher info`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`TV Show function: `,(0,n.jsx)(r.a,{href:`https://github.com/pret/pokeruby/blob/master/src/tv.c#L797`,children:`PutPokemonTodayCaughtOnAir()`})]}),`
`,(0,n.jsxs)(r.li,{children:[`Pickup function: `,(0,n.jsx)(r.a,{href:`https://github.com/pret/pokeruby/blob/master/src/battle_script_commands.c#L9200`,children:`atkE5_pickup()`})]}),`
`,(0,n.jsxs)(r.li,{children:[`Pokérus function: `,(0,n.jsx)(r.a,{href:`https://github.com/pret/pokeruby/blob/master/src/pokemon_3.c#L817`,children:`RandomlyGivePartyPokerus()`})]}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/RainingChain/pk_emu_scripts/blob/main/Gen3/log_rng_advances.lua`,children:`Lua script to print RNG advance`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Guide and scripts: RainingChain.`}),`
`,(0,n.jsx)(r.li,{children:`Script inspiration: Real96.`}),`
`,(0,n.jsxs)(r.li,{children:[`Decompil projects: `,(0,n.jsx)(r.a,{href:`https://github.com/pret`,children:`pret team`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};