import{t as e}from"./jsx-runtime-Bl9_0yti.js";import{S as t}from"./index-DPRP8y_N.js";var n=e(),r={title:`Ultra Sun and Ultra Moon Egg RNG`,navDrawerTitle:`Egg RNG`,description:`Learn how to RNG eggs in Ultra Sun and Ultra Moon for perfect IVs, natures, and shinies.`,slug:`usum-egg`,category:`Ultra Sun and Ultra Moon`,section:`pokemon_rng`,variant:`cfw-emu`,isRoughDraft:!0};function i(e){let r={a:`a`,blockquote:`blockquote`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components},{Gen7EggActions:i,Gen7EggSearch:a,Gen7EggTargetSummary:s,Step:c,Stepper:l}=r;return i||o(`Gen7EggActions`,!0),a||o(`Gen7EggSearch`,!0),s||o(`Gen7EggTargetSummary`,!0),c||o(`Step`,!0),l||o(`Stepper`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Optional: `,(0,n.jsx)(r.a,{href:`/install-pokereader`,children:`A 3DS with PokeReader`}),` or `,(0,n.jsx)(r.a,{href:`/install-pokereader-emu`,children:`Azahar with PokeReader`})]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`You can still use this guide without PokeReader, as long as you can find your egg seeds and TSV. See `,(0,n.jsx)(r.a,{href:`/retail-usum-egg-seed-no-cfw`,children:`Getting Your Egg Seeds Without CFW`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`How Egg RNG Works`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Egg seeds`}),` are four numbers the game uses to decide what the next egg will be: its IVs, nature, ability, gender, and more. They change every time you accept or reject an egg.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`TSV`}),` (Trainer Shiny Value) is a number tied to your save file. An egg hatches shiny if its shiny value matches your TSV.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`The tool uses your egg seeds to look ahead at upcoming eggs. You pick the one you want, then accept and reject eggs in the order the tool gives you until that egg is next.`}),`
`,(0,n.jsx)(r.h2,{children:`Masuda Method, Shiny Charm, or Neither?`}),`
`,(0,n.jsx)(r.p,{children:`Use this guide if you have at least one of these:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Masuda Method`}),`: the two parents come from games in different languages.`]}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.strong,{children:`Shiny Charm`})}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`If you have neither, use the `,(0,n.jsx)(r.a,{href:`/retail-usum-egg-no-mmsc`,children:`Egg RNG without Masuda Method or Shiny Charm guide`}),` instead.`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`NOTE`,children:[`
`,(0,n.jsx)(r.p,{children:`Why it matters: with either one, your egg seeds decide whether the egg is shiny. Without them, shininess is decided separately at the moment you accept the egg, which needs a different method.`}),`
`]}),`
`,(0,n.jsxs)(l,{titles:[`Find a Target`,`Accept and Reject Eggs`,`Get the Egg`],children:[(0,n.jsxs)(c,{step:0,children:[(0,n.jsx)(r.h2,{children:`Getting Your Egg Seeds and TSV`}),(0,n.jsx)(r.h3,{children:`With PokeReader`}),(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open PokeReader and find your TSV and TRV in the main RNG view.`}),`
`,(0,n.jsx)(r.li,{children:`Go to the Daycare view to find your egg seeds and whether you have the Shiny Charm.`}),`
`]}),(0,n.jsx)(r.h3,{children:`Without PokeReader`}),(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`To find your egg seeds without custom firmware, follow the `,(0,n.jsx)(r.a,{href:`/retail-usum-egg-seed-no-cfw`,children:`Find Egg Seeds guide`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`With homebrew or custom firmware, back up your save with a save manager like Checkpoint and open it in PKHeX to see your egg seeds, TSV, and TRV.`}),`
`,(0,n.jsxs)(r.li,{children:[`If you can't find your TSV or TRV, ask in the `,(0,n.jsx)(r.a,{href:`https://www.discord.gg/d8JuAvg`,children:`Pokemon RNG Discord`}),`.`]}),`
`]}),(0,n.jsx)(r.h2,{children:`Find a Target`}),(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Enter your four egg seeds in the same order PokeReader or your seed finder shows them, then enter your TSV and TRV.`}),`
`,(0,n.jsx)(r.li,{children:`Turn on "Masuda Method" if the parents are from games in different languages. Turn on "Shiny Charm" if you have it.`}),`
`,(0,n.jsx)(r.li,{children:`Choose the "Gender Ratio" of the Pokemon that will hatch. If you're breeding Nidoran or Volbeat/Illumise, pick "Nidoran or Volbeat/Illumise".`}),`
`,(0,n.jsx)(r.li,{children:`Turn on "Same Species" if both parents are the same species.`}),`
`,(0,n.jsx)(r.li,{children:`Fill in each parent's IVs, held item, and ability. If a parent is a Ditto, turn on "Ditto" for it. If you're breeding a genderless or male-only Pokemon with Ditto, enter Ditto as the female parent.`}),`
`,(0,n.jsx)(r.li,{children:`Set the filters for the egg you want, such as shiny or a specific nature, and click "Generate".`}),`
`,(0,n.jsx)(r.li,{children:`Click "Select" on the egg you want. A lower "Accepts + Rejects" number means fewer eggs to go through before you reach it.`}),`
`]}),(0,n.jsxs)(r.blockquote,{"alert-type":`TIP`,children:[`
`,(0,n.jsx)(r.p,{children:`Shiny eggs can take a while to reach. If none of the results work for you, increase "Max Advances" to search further ahead.`}),`
`]}),(0,n.jsx)(a,{})]}),(0,n.jsxs)(c,{step:1,children:[(0,n.jsx)(r.h2,{children:`Deposit the Parents`}),(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Give each parent the held item you entered in the tool.`}),`
`,(0,n.jsx)(r.li,{children:`Leave both parents at the Nursery on Route 5.`}),`
`,(0,n.jsx)(r.li,{children:`Walk around until the Nursery lady has an egg for you.`}),`
`,(0,n.jsx)(r.li,{children:`Save your game in front of her before talking to her.`}),`
`]}),(0,n.jsx)(r.h2,{children:`Accept and Reject Eggs`}),(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Talk to the Nursery lady. Answer "Yes" to accept the egg or "No" to reject it, as shown below.`}),`
`,(0,n.jsx)(r.li,{children:`Click "Accepted, next egg" or "Rejected, next egg" to move on. Use "Previous" to look back at earlier eggs.`}),`
`,(0,n.jsx)(r.li,{children:`Walk around until she has another egg, and repeat until the tool says "All done". Then click "Continue".`}),`
`,(0,n.jsx)(r.li,{children:`If you have PokeReader, check that your egg seeds match the ones shown before each egg.`}),`
`,(0,n.jsx)(r.li,{children:`Save every so often so you don't lose your progress.`}),`
`]}),(0,n.jsxs)(r.blockquote,{"alert-type":`WARNING`,children:[`
`,(0,n.jsx)(r.p,{children:`Follow the exact order shown. Accepting or rejecting eggs in a different order changes your egg seeds, and you won't get your target. Don't accept your target egg in this step.`}),`
`]}),(0,n.jsx)(i,{}),(0,n.jsxs)(r.blockquote,{"alert-type":`TIP`,children:[`
`,(0,n.jsx)(r.p,{children:`If your egg seeds stop matching, enter your current egg seeds in the "Find a Target" step and pick a new target.`}),`
`]})]}),(0,n.jsxs)(c,{step:2,children:[(0,n.jsx)(r.h2,{children:`Get the Egg`}),(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Walk around until the Nursery lady has the next egg. If you have PokeReader, check that your egg seeds match the ones below.`}),`
`,(0,n.jsx)(r.li,{children:`Accept the egg. This is your target.`}),`
`,(0,n.jsx)(r.li,{children:`Hatch the egg by walking around with it in your party.`}),`
`,(0,n.jsx)(r.li,{children:`To RNG another egg, click "Use as current egg seeds". The tool goes back to "Find a Target" with your new egg seeds already filled in.`}),`
`]}),(0,n.jsx)(s,{}),(0,n.jsx)(r.p,{children:`Congrats! You should now have the Pokemon you wanted.`}),(0,n.jsx)(r.h2,{children:`If You Didn't Get the Egg You Wanted`}),(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Check that your egg seeds were entered in the right order and that your TSV is correct.`}),`
`,(0,n.jsx)(r.li,{children:`Check the parents' IVs, held items, abilities, and Ditto settings in the tool, and that the parents in the Nursery are holding the right items.`}),`
`,(0,n.jsx)(r.li,{children:`Check the "Masuda Method" setting. The parents need to be from games in different languages.`}),`
`,(0,n.jsx)(r.li,{children:`Check that the "Shiny Charm" setting matches whether you have it.`}),`
`,(0,n.jsx)(r.li,{children:`Make sure you accepted and rejected the eggs in the exact order shown.`}),`
`]})]})]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`wwwwwwzx for `,(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool`,children:`3DSRNGTool`}),`, which this tool's logic is based on.`]}),`
`,(0,n.jsx)(r.li,{children:`Chinese translation of the original egg guides: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};