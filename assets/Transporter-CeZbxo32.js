import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-DLFhP4kJ.js";var n=e(),r={title:`Transporter RNG for Gen 1 and 2`,navDrawerTitle:`Transporter RNG`,description:`Learn how to RNG your Virtual Console Pokémon so they transfer to Gen 7 with perfect 6IVs.`,slug:`transporter-rng`,category:`Transporter and Dream Radar`,section:`pokemon_rng`,variant:`cfw-emu`,addedOn:`2025-05-08`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components},{Transporter:i}=r;return i||o(`Transporter`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`This guide allows for RNGing the IVs of Pokemon transferred from Gen 1/2 using Transporter. Shininess and nature are predetermined in the Gen 1/2 game the Pokemon are coming from.`}),`
`,(0,n.jsxs)(r.p,{children:[`You can check the `,(0,n.jsx)(r.a,{href:`/misc-3ds-transporter-nature-tables`,children:`nature table here`}),` for what nature your Pokemon will have when transferred.`]}),`
`,(0,n.jsxs)(r.p,{children:[`If you would like a stable delay for easier RNG, you can follow the `,(0,n.jsx)(r.a,{href:`transporter-rng-offline`,children:`Offline Patch Transporter RNG guide here`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/install-pokereader`,children:`A 3DS with PokeReader`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Useful note`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`When asked if you want to transfer your Pokémon, clicking "No" will cause the Pokémon to be generated again. This allows infinite retries if you miss the RNG.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Calibrate your delay`}),`
`,(0,n.jsxs)(r.p,{children:[`RNGing with Transporter has a delay between pressing `,(0,n.jsx)(r.code,{children:`A`}),` and Pokémon generation. The delay must be calibrated before RNGing.`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Make sure you have at least one Pokémon in Box 1, Slot 1 of your Gen 1/2 game.`}),`
`,(0,n.jsx)(r.li,{children:`Load Pokémon Transporter with PokeReader on your 3DS.`}),`
`,(0,n.jsx)(r.li,{children:`Enter your Initial seed in the tool below.`}),`
`,(0,n.jsxs)(r.li,{children:[`In Transporter, press `,(0,n.jsx)(r.code,{children:`Start`}),` to select the game for Transporter.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`Start + Select`}),` to pause the game.`]}),`
`,(0,n.jsx)(r.li,{children:`Note your current advance; this is your starting advance.`}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`A`}),` to unpause and let Transporter generate the Pokémon.`]}),`
`,(0,n.jsx)(r.li,{children:`Search for the exact IVs PokeReader indicates using the tool below to find your hit advance.`}),`
`,(0,n.jsxs)(r.li,{children:[`Subtract your hit advance from your starting advance to get your delay.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Example: If you started on advance 1000 and hit advance 1197, your delay is 197.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`When asked to transfer the Pokémon, click "No."`}),`
`,(0,n.jsx)(r.li,{children:`Repeat the process 5-10 times to get 5-10 delays.`}),`
`,(0,n.jsx)(r.li,{children:`Input the most frequent delay or an average into the "Delay" box.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Find a spread to RNG`}),`
`,(0,n.jsx)(r.p,{children:`Follow these steps with the tool below to find a desired spread:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Change the "Transporter Gender" to match the Pokémon you want to RNG.`}),`
`,(0,n.jsxs)(r.li,{children:[`Change IVs to find a spread you want.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Nature, ability, and shininess are determined in the Gen 1/2 game before Transporter.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Change the "Initial Advance" box to your current advance.`}),`
`,(0,n.jsx)(r.li,{children:`Change the "Max Advances" box to the maximum advance you want to search.`}),`
`,(0,n.jsx)(r.li,{children:`Click "Generate."`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`All results are potential wanted advances. Pick your favorite!`}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Hit the target`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Wait at the game selection screen until you get close to your wanted advance.`}),`
`,(0,n.jsxs)(r.li,{children:[`Once close, press `,(0,n.jsx)(r.code,{children:`Start + Select`}),` to pause the game.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`Select`}),` to advance one by one until you reach your wanted advance.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Once at your wanted advance, press and hold `,(0,n.jsx)(r.code,{children:`A`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Check if you got the Pokémon you wanted; if not, don't transfer your Pokémon and try again.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`This may take several attempts.`}),`
`,(0,n.jsx)(r.h2,{children:`20 Pokemon Method`}),`
`,(0,n.jsx)(r.p,{children:`Transporter generates 20 Pokémon at once. If you have 20 of the same Pokémon, you can have 20 chances at landing on the right advance.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Catch 20 of the same Pokémon (or clone them).`}),`
`,(0,n.jsx)(r.li,{children:`Make sure all 20 are in Box 1 of your Gen 1/2 game.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`In the tool below:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Change the "Filters" box to have the IVs you want to RNG.`}),`
`,(0,n.jsx)(r.li,{children:`Search for spreads using the initial seed PokeReader shows.`}),`
`,(0,n.jsx)(r.li,{children:`Ensure the number of consecutive advances is at least 10.`}),`
`,(0,n.jsx)(r.li,{children:`Aim for the middle advance as your target advance.`}),`
`]}),`
`,(0,n.jsx)(i,{})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};