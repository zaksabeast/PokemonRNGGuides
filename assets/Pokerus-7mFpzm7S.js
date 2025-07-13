import{A as a,j as e}from"./index-DfFHvFlP.js";const c=[{title:"Pokérus in Emerald",navDrawerTitle:"Pokérus",description:"How to be infected by Pokérus",slug:"emerald-pokerus-emu",category:"Emerald",tag:"emu",addedOn:"2025-05-09"},{title:"Pokérus in Ruby & Sapphire",navDrawerTitle:"Pokérus",description:"How to be infected by Pokérus",slug:"rs-pokerus-emu",category:"Ruby and Sapphire",tag:"emu",addedOn:"2025-05-09"}];function o(i){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...a(),...i.components},{Gist:s,ShowIf:t,YouTubeVideo:l}=n;return s||r("Gist"),t||r("ShowIf"),l||r("YouTubeVideo"),e.jsxs(e.Fragment,{children:[e.jsx(s,{children:"Gist: Be infected by Pokérus"}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA"})}),`
`,e.jsxs(n.li,{children:["Download ",e.jsx(n.a,{href:"https://raw.githubusercontent.com/RainingChain/pk_emu_scripts/refs/heads/main/Gen3/pokerus.lua",children:"Pokérus lua script"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"Pokérus"}),`
`,e.jsx(n.p,{children:"After each wild battle, there is a 1 / 21,845 chance that one of your Pokémon will be infected with Pokérus. While infected by Pokérus, EVs gained from battling are doubled. Pokérus is notably required to get optimal low-level Pokémon such as Level 5 Smeargle with Dragon Rage."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Emerald/pokerus.png",alt:"Pokémon infected by Pokérus"})}),`
`,e.jsx(n.h2,{children:"Step 1 : Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(t,{slug:"/emerald-pokerus-emu",children:"Open mGBA."}),`
`,e.jsx(t,{slug:"/rs-pokerus-emu",children:e.jsx(n.p,{children:`Open mGBA. Make sure that "Reatime clock" is disabled (Tools -> Game
overrides...).`})}),`
`]}),`
`,e.jsxs(n.li,{children:["Start your game and load the ",e.jsx(n.code,{children:"pokerus.lua"})," script."]}),`
`,e.jsxs(n.li,{children:["Restart the game with ",e.jsx(n.code,{children:"Ctrl + R"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2 : Calibration"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Start a Pokémon battle and attack the wild Pokémon until it faints."}),`
`,e.jsx(n.li,{children:'Make a savestate on the message "XXX gained YY EXP.Points.".'}),`
`,e.jsxs(n.li,{children:["Pause the game with ",e.jsx(n.code,{children:"Ctrl + P"}),"."]}),`
`,e.jsx(n.li,{children:"Write down the Current advance, which is displayed in the Scripting window."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"})," with the game paused, and while holding ",e.jsx(n.code,{children:"A"}),", unpause the game with ",e.jsx(n.code,{children:"Ctrl + P"}),"."]}),`
`,e.jsx(n.li,{children:"If the scripting window says the current battle can't yield Pokérus, end the battle and return to Step 1 of the calibration."}),`
`,e.jsx(n.li,{children:'Otherwise, calculate your target advance by summing the current advance from Step 4 with the "Advance Difference" shown in the scripting window.'}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 3: Hitting your target"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Reload your previous savestate (taken during the battle), and advance time with ",e.jsx(n.code,{children:"Ctrl + N"})," until the Current advance matches the target advance calculated in the last step."]}),`
`,e.jsxs(n.li,{children:["Once they match, press ",e.jsx(n.code,{children:"A"})," with the game paused, and while holding ",e.jsx(n.code,{children:"A"}),", unpause the game with ",e.jsx(n.code,{children:"Ctrl + P"}),"."]}),`
`,e.jsx(n.li,{children:"Check the summary of all your Pokémon to verify if one of them has Pokérus."}),`
`]}),`
`,e.jsx(l,{src:"https://www.youtube.com/embed/ySpe6-4xCNc"}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Guide and scripts: RainingChain."}),`
`,e.jsx(n.li,{children:"Script inspiration: Real96."}),`
`,e.jsxs(n.li,{children:["Decompil projects: ",e.jsx(n.a,{href:"https://github.com/pret/pokeemerald",children:"pret team"}),"."]}),`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]})}function h(i={}){const{wrapper:n}={...a(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}function r(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,c as frontmatter};
