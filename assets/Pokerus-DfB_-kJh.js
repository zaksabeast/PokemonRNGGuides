import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-D9rvoGGh.js";var n=e(),r=[{title:`Pokérus in Emerald`,navDrawerTitle:`Pokérus`,description:`How to be infected by Pokérus`,slug:`emerald-pokerus-emu`,category:`Emerald`,section:`other_rng`,variant:`cfw-emu`,addedOn:`2025-05-09`},{title:`Pokérus in Ruby & Sapphire`,navDrawerTitle:`Pokérus`,description:`How to be infected by Pokérus`,slug:`rs-pokerus-emu`,category:`Ruby and Sapphire`,section:`other_rng`,variant:`cfw-emu`,guideKey:`rs-pokerus`,addedOn:`2025-05-09`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components},{Gist:i,ShowIf:a,YouTubeVideo:s}=r;return i||o(`Gist`,!0),a||o(`ShowIf`,!0),s||o(`YouTubeVideo`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:`Gist: Be infected by Pokérus`}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA`})}),`
`,(0,n.jsxs)(r.li,{children:[`Download `,(0,n.jsx)(r.a,{href:`https://raw.githubusercontent.com/RainingChain/pk_emu_scripts/refs/heads/main/Gen3/pokerus.lua`,children:`Pokérus lua script`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Pokérus`}),`
`,(0,n.jsx)(r.p,{children:`After each wild battle, there is a 1 / 21,845 chance that one of your Pokémon will be infected with Pokérus. While infected by Pokérus, EVs gained from battling are doubled. Pokérus is notably required to get optimal low-level Pokémon such as Level 5 Smeargle with Dragon Rage.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/pokerus.png`,alt:`Pokémon infected by Pokérus`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 1 : Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(a,{slug:`/emerald-pokerus-emu`,children:`Open mGBA.`}),`
`,(0,n.jsx)(a,{slug:`/rs-pokerus-emu`,children:(0,n.jsx)(r.p,{children:`Open mGBA. Make sure that "Reatime clock" is disabled (Tools -> Game
overrides...).`})}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Start your game and load the `,(0,n.jsx)(r.code,{children:`pokerus.lua`}),` script.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Restart the game with `,(0,n.jsx)(r.code,{children:`Ctrl + R`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2 : Calibration`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Start a Pokémon battle and attack the wild Pokémon until it faints.`}),`
`,(0,n.jsx)(r.li,{children:`Make a savestate on the message "XXX gained YY EXP.Points.".`}),`
`,(0,n.jsxs)(r.li,{children:[`Pause the game with `,(0,n.jsx)(r.code,{children:`Ctrl + P`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Write down the Current advance, which is displayed in the Scripting window.`}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`A`}),` with the game paused, and while holding `,(0,n.jsx)(r.code,{children:`A`}),`, unpause the game with `,(0,n.jsx)(r.code,{children:`Ctrl + P`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`If the scripting window says the current battle can't yield Pokérus, end the battle and return to Step 1 of the calibration.`}),`
`,(0,n.jsx)(r.li,{children:`Otherwise, calculate your target advance by summing the current advance from Step 4 with the "Advance Difference" shown in the scripting window.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Hitting your target`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Reload your previous savestate (taken during the battle), and advance time with `,(0,n.jsx)(r.code,{children:`Ctrl + N`}),` until the Current advance matches the target advance calculated in the last step.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Once they match, press `,(0,n.jsx)(r.code,{children:`A`}),` with the game paused, and while holding `,(0,n.jsx)(r.code,{children:`A`}),`, unpause the game with `,(0,n.jsx)(r.code,{children:`Ctrl + P`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Check the summary of all your Pokémon to verify if one of them has Pokérus.`}),`
`]}),`
`,(0,n.jsx)(s,{id:`ySpe6-4xCNc`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Guide and scripts: RainingChain.`}),`
`,(0,n.jsx)(r.li,{children:`Script inspiration: Real96.`}),`
`,(0,n.jsxs)(r.li,{children:[`Decompil projects: `,(0,n.jsx)(r.a,{href:`https://github.com/pret/pokeemerald`,children:`pret team`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`German translation: Parasite.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};