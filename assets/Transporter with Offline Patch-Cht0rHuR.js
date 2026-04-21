import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-OZ62x8fR.js";var n=e(),r={title:`Transporter RNG using the Offline Patch`,navDrawerTitle:`Offline Patch RNG`,description:`Use the offline patch to stabilize delay and make RNG with Pokémon Transporter more consistent.`,slug:`transporter-rng-offline`,category:`Transporter and Dream Radar`,section:`pokemon_rng`,variant:`cfw-emu`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components},{Transporter:i}=r;return i||o(`Transporter`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`This guide allows for RNGing the IVs of Pokemon transferred from Gen 1/2 using Transporter. For a stable delay a patch is used to allow for transferring Pokemon without needing to connect to online servers. The Pokemon are still transferred the same as if the patch was not used.`}),`
`,(0,n.jsx)(r.p,{children:`Shininess and nature are predetermined in the Gen 1/2 game the Pokemon are coming from.`}),`
`,(0,n.jsxs)(r.p,{children:[`You can check the `,(0,n.jsx)(r.a,{href:`/misc-3ds-transporter-nature-tables`,children:`nature table here`}),` for what nature your Pokemon will have when transferred.`]}),`
`,(0,n.jsxs)(r.p,{children:[`If you do not want to use the patch, you can follow the `,(0,n.jsx)(r.a,{href:`transporter-rng`,children:`Transporter RNG guide here`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/install-pokereader`,children:`A 3DS with PokeReader`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Ensure a Stable Delay`}),`
`,(0,n.jsxs)(r.p,{children:[`Set up the offline Transporter patch to ensure a stable delay by following the instructions `,(0,n.jsx)(r.a,{href:`/transporter-patches`,children:`here`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Find a target advance`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Make sure you have a Pokemon in Box 1, Slot 1 of your Gen 1/2 game.`}),`
`,(0,n.jsx)(r.li,{children:`Load Pokemon Transporter with PokeReader on your 3DS.`}),`
`,(0,n.jsx)(r.li,{children:`Enter the initial seed displayed by PokeReader into the tool below for "Seed".`}),`
`,(0,n.jsx)(r.li,{children:`Set "Delay" to 28.`}),`
`,(0,n.jsxs)(r.li,{children:[`In Transporter, press `,(0,n.jsx)(r.code,{children:`Start`}),` to select the game you would like to use with Transporter.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`This is the final `,(0,n.jsx)(r.code,{children:`A`}),` press before Pokemon are generated.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`Start + Select`}),` to pause the game.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Adjust the IV filters to find a desired spread.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Nature, ability, and shininess are determined in the Gen 1/2 game before Transporter.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Set the "Initial Advance" to your current advance.`}),`
`,(0,n.jsx)(r.li,{children:`Set the "Max Advances" to the highest advance you want to search for spreads.`}),`
`,(0,n.jsx)(r.li,{children:`Click "Search".`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`All the displayed results are potential target advances. Choose your preferred one.`}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Hit the target`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Unpause the game by pressing `,(0,n.jsx)(r.code,{children:`Start`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Wait at the game selection screen until you are close to the target advance.`}),`
`,(0,n.jsxs)(r.li,{children:[`When you are close, press `,(0,n.jsx)(r.code,{children:`Start + Select`}),` to pause the game.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Use `,(0,n.jsx)(r.code,{children:`Select`}),` to advance one by one until you reach the target advance.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Once you reach the target advance, press and hold `,(0,n.jsx)(r.code,{children:`A`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Check if you obtained the desired Pokemon. If not, do not transfer the Pokemon and try again.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: When asked if you want to transfer your Pokemon, clicking "No" will cause the Pokemon to be generated again. This allows for infinite retries in case you miss the RNG.
`})}),`
`,(0,n.jsx)(i,{})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};