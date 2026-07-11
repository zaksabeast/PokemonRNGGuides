import{t as e}from"./jsx-runtime-DE3yYTa1.js";import{m as t}from"./index-T_zNIUOz.js";var n=e(),r=[{title:`Starter, Legend, and Fossil RNG`,description:`Starter, legend, and fossil encounters in Emerald`,slug:`emerald-static`,category:`Emerald`,section:`pokemon_rng`,variant:`retail`},{title:`Starter, Legend, and Fossil RNG`,description:`Starter, legend, and fossil encounters in Ruby and Sapphire`,slug:`rs-static`,category:`Ruby and Sapphire`,section:`pokemon_rng`,variant:`retail`,isRoughDraft:!0},{title:`Starter, Legend, and Fossil RNG`,description:`Starter, legend, and fossil encounters in FireRed and LeafGreen`,slug:`frlg-static`,category:`FireRed and LeafGreen`,section:`pokemon_rng`,variant:`retail`,isRoughDraft:!0}];function i(e){let r={a:`a`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components},{EmeraldStaticAceChangeSid_WithTargetSetup:i,EmeraldStaticPaintingReseeding_WithTargetSetup:a,ShowIf:s,Static3Calib_WithTargetSetupAndBattleVideo:c,Static3TargetSetupSearcher:l,Static3TargetSetupSearcher_WithSetTargetSetup:u,Step:d,Stepper:f}=r;return i||o(`EmeraldStaticAceChangeSid_WithTargetSetup`,!0),a||o(`EmeraldStaticPaintingReseeding_WithTargetSetup`,!0),s||o(`ShowIf`,!0),c||o(`Static3Calib_WithTargetSetupAndBattleVideo`,!0),l||o(`Static3TargetSetupSearcher`,!0),u||o(`Static3TargetSetupSearcher_WithSetTargetSetup`,!0),d||o(`Step`,!0),f||o(`Stepper`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s,{slug:`/rs-static`,children:(0,n.jsx)(l,{game:`rs`})}),`
`,(0,n.jsx)(s,{slug:`/frlg-static`,children:(0,n.jsx)(l,{game:`frlg`})}),`
`,(0,n.jsxs)(s,{slug:`/emerald-static`,children:[(0,n.jsx)(r.h2,{children:`General Overview`}),(0,n.jsx)(r.p,{children:`This guide is about RNG manipulating static encounters (starter, legendary, fossil, and roamer Pokémon). Manipulating static encounters only requires 1 frame-perfect input. Calibrating is fast and reliable.
Many static Pokémon can be captured with the Pokéball of your choice.`}),(0,n.jsx)(r.p,{children:`There are some canveats however:`}),(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Not all Pokémon stats and natures combinations are possible. Most notably, a Pokémon with 6 perfects IVs generated from a static encounter can have only 4 possible natures (Calm, Docile, Modest, Timid) and it can only be shiny for 6 specific PSV (TID/SID combo).`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`The shininess restriction can be bypassed with ACE by temporarily changing your TID/SID.`}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`/retail-emerald-egg`,children:`RNG-manipulated Egg Pokémon`}),` don't have nature and shininess restrictions.`]}),`
`]}),`
`]}),`
`]}),(0,n.jsx)(r.h2,{children:`Steps Overview`}),(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Step 1:`}),` Determine the RNG advance to obtain the target Pokémon.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Step 2:`}),` Optional: Create a Battle Video (possibly combined with Painting Reseeding) to speedup RNG manipulation attempts.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Step 3:`}),` Catch Pokémon and calibrate until obtaining the target Pokémon.`]}),`
`]}),(0,n.jsx)(r.p,{children:`If you already know your target advance and setup, you can skip to Step 2 directly. If you have already created a Battle Video, skip to Step 3.`}),(0,n.jsxs)(f,{titles:[`Find Best Setup`,`Create Battle Video & More`,`Catch and Calibrate`],children:[(0,n.jsxs)(d,{step:0,children:[(0,n.jsx)(r.h3,{children:`Find Best Setup`}),(0,n.jsx)(r.p,{children:`Determine the best setup (map, advance, lead) to obtain the target Pokémon.`}),(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Fill the criterias of the Target Pokémon (ex: shiny, IVs, nature).`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Specify the considered setups (ex: painting reseeding).`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`TID/SID are only relevant if aiming for a shiny Pokémon. How to `,(0,n.jsx)(r.a,{href:`/gen3-sid/`,children:`find your SID`}),`.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Press "Generate" to create a list of Pokémon respecting the criterias.`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Select the Target Pokémon with the lowest advances.`}),`
`]}),`
`]}),(0,n.jsx)(u,{})]}),(0,n.jsxs)(d,{step:1,children:[(0,n.jsx)(i,{}),(0,n.jsx)(r.h3,{children:`Create Battle Video`}),(0,n.jsx)(r.p,{children:`Battle Video is a RNG technique to save and restore the RNG state. Using that technique, players only need to wait the full delay of their RNG manipulation once. Afterwards, each retry is very quick.`}),(0,n.jsx)(r.p,{children:`After winning or losing a battle at the Battle Frontier, players can record their battle. The RNG state at the start of the battle is saved into the battle record. Players can watch their battle anywhere by opening their trainer card and selecting "Battle Record". By doing so, the current RNG state is reseeded with the RNG state at the start of the recorded battle.`}),(0,n.jsx)(r.p,{children:`Creating a Battle Video is optional if Painting Reseeding is not used.`}),(0,n.jsx)(r.p,{children:`Battle Video requires entering the Hall of Fame. This technique can't be used for the starter Pokémon when starting a new game. By using ACE, it is possible to respawn all static Pokémon and use RNG manipulation to catch them again.`}),(0,n.jsx)(a,{})]}),(0,n.jsxs)(d,{step:2,children:[(0,n.jsx)(r.h3,{children:`Catch and Calibrate`}),(0,n.jsx)(c,{})]})]}),(0,n.jsx)(r.h2,{children:`Coming soon`}),(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Add species-specific information (ex: on what screen to wait, tips).`}),`
`,(0,n.jsx)(r.li,{children:`Add ACE code to respawn Pokémon or access event Pokémon.`}),`
`]})]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`RainingChain: Web tool and searcher.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};