import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-BB5MVq97.js";var n=e(),r=[{title:`Ultra Sun and Ultra Moon Egg RNG with Masuda and/or Shiny Charm`,navDrawerTitle:`MM/SC Egg RNG`,description:`Learn how to RNG eggs from the Daycare in Ultra Sun and Ultra Moon for shiny, high-IV Pokémon.`,slug:`retail-usum-egg-mmsc`,category:`Ultra Sun and Ultra Moon`,section:`pokemon_rng`,variant:`cfw-emu`,guideKey:`mm-sc-egg`},{title:`Sun and Moon Egg RNG with Masuda and/or Shiny Charm`,navDrawerTitle:`MM/SC Egg RNG`,description:`Learn how to RNG eggs from the Daycare in Sun and Moon for shiny, high-IV Pokémon.`,slug:`retail-sm-egg-mmsc`,category:`Sun and Moon`,section:`pokemon_rng`,variant:`cfw-emu`,guideKey:`mm-sc-egg`,canonical:`retail-usum-egg-mmsc`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Differences with Masuda Method and/or Shiny Charm`}),`
`,(0,n.jsx)(r.p,{children:`Using the Masuda Method and/or Shiny Charm sets the ESVs of all eggs in a fixed order. To reach desired frames, you'll need to accept or reject eggs accordingly. Without these, any egg frame can have the ESV you want since ESVs are only generated once you accept an egg.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: ESV (Egg Shiny Value) determines if an egg will hatch shiny or not. If an ESV matches a TSV (Trainer Shiny Value), the egg will hatch shiny.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})}),`
`,(0,n.jsxs)(r.li,{children:[`Optional: `,(0,n.jsx)(r.a,{href:`/install-pokereader`,children:`A 3DS with PokeReader`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Setting Up 3DSRNGTool`}),`
`,(0,n.jsx)(r.h3,{children:`Configuration:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Enter your game version and TSV.`}),`
`,(0,n.jsx)(r.li,{children:`Ignore the initial seed as it won't be used.`}),`
`,(0,n.jsx)(r.li,{children:`Tick the "Shiny Charm" checkbox if you have the Shiny Charm.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: If you aim to RNG an egg with specific ESV that is not yours, click Edit TSV List, enter TSV(s), then tick the "Other TSVs Shiny". Do not enter the TSV in the top right. Only YOUR TSV should be in the top right or the RNG will be incorrect.
`})}),`
`,(0,n.jsx)(r.h3,{children:`Parents information:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Fill in details as per the parents you're using.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Tick the "Masuda Method" box if the parents have different languages.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Only language of the Pokémon matters for Masuda Method, not the region.
`})}),`
`,(0,n.jsx)(r.p,{children:`When using a Ditto with a genderless Pokémon, Ditto is considered the female parent. If not, Ditto is the opposite gender of the other parent.`}),`
`,(0,n.jsx)(r.h3,{children:`Current status:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Input your current egg seeds in the "Current Status" section of 3DSRNGTool.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Refer to Additional Notes for other methods to find egg seeds without PokeReader.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Avoid ticking the "Main RNG Egg (PID)" box.`}),`
`,(0,n.jsx)(r.li,{children:`Fill in "Filters" with the details of the egg you aim to RNG.`}),`
`,(0,n.jsx)(r.li,{children:`Tick "Shiny Only" if you want a shiny egg.`}),`
`,(0,n.jsx)(r.li,{children:`Enter "0" as the starting frame.`}),`
`,(0,n.jsx)(r.li,{children:`Click "Calculate".`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Selecting a Target Frame`}),`
`,(0,n.jsx)(r.p,{children:`Any given frame can be chosen, but lower frames are usually more convenient due to fewer egg accepts/rejects.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Right-click on your desired row and select "Set as Target Frame".`}),`
`,(0,n.jsxs)(r.li,{children:[`Click on "Shortest Path" and then "Calculate".`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`This calculates the shortest path for your target egg with the least number of accepts and rejects.`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Accept or reject the eggs from top to bottom as listed. A different order will yield the wrong egg seeds.`}),`
`,(0,n.jsxs)(r.li,{children:[`The final egg that you accept will be your target egg.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Confirm your egg frame using PokeReader by checking your egg seeds in-game.`}),`
`,(0,n.jsx)(r.li,{children:`If a specific shiny egg is what you're after, the frames could be quite high and demand a lot of egg accepts/rejects. This is due to the predetermined ESVs of the eggs.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Additional Notes`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`PokeReader is useful for checking your TSV, Shiny Charm, or Masuda Method.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`For TSV it is in the main RNG view. Look where it says `,(0,n.jsx)(r.code,{children:`TSV`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`For Shiny Charm and parents' info, it is in the Daycare view.`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Without PokeReader, your TSV can be found in other ways.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Via Homebrew or CFW with a save manager like Checkpoint. Extract save file, view it in PKHeX, then hover over TID and SID to find TSV.`}),`
`,(0,n.jsxs)(r.li,{children:[`In the `,(0,n.jsx)(r.a,{href:`https://www.discord.gg/d8JuAvg`,children:`Pokemon RNG Discord`}),`, someone else might be able to help you find it.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`If you aren't using PokeReader and don't know your egg seeds, try these methods.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`If you've accepted or rejected eggs and don't want to use Homebrew or CFW, use the `,(0,n.jsx)(r.a,{href:`/retail-usum-egg-seed-no-cfw`,children:`127 Magikarp method`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`If you haven't interacted with the daycare and don't want to use Homebrew or CFW, try the `,(0,n.jsx)(r.a,{href:`/retail-usum-egg-seed-no-cfw`,children:`8 egg method`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`With access to Homebrew or CFW, PKHeX can view your egg seeds after extracting the save file using a save manager like Checkpoint.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};