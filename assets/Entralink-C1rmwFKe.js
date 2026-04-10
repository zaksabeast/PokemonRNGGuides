import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-Bh0-R9ZM.js";var n=e(),r=[{title:`Black and White Entralink RNG`,navDrawerTitle:`Entralink RNG`,description:`Learn how to RNG Pokémon exclusive to the Entralink in Black and White, including event-only encounters like Arceus.`,slug:`emulator-bw-entralink`,category:`Black and White`,section:`pokemon_rng`,variant:`cfw-emu`}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Admiral-Fish/RNGReporter/releases`,children:`RNG Reporter`})}),`
`,(0,n.jsx)(r.li,{children:`A save with access to the C-Gear (and with the profile/calibration set up)`}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://projectpokemon.org/home/forums/topic/37801-gen-5-generation-5-save-tool-entralink-medals-join-avenue-and-others-not-in-pokegen/`,children:`Suloku's Gen V Save Tool (optional)`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Inject an RNG Target (optional)`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open Suloku's Gen V Save Tool.`}),`
`,(0,n.jsx)(r.li,{children:`Add the Pokémon you want to RNG.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Finding a Frame/Target Seed/IVs`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open RNG Reporter and go to Generation 5 Time Finder.`}),`
`,(0,n.jsx)(r.li,{children:`Set up Time Finder like this.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Entralink/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsxs)(r.ol,{start:`3`,children:[`
`,(0,n.jsx)(r.li,{children:`Change Delay/Frame as needed.`}),`
`,(0,n.jsx)(r.li,{children:`Set minimum frame to at least 21. You cannot hit anything lower.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Finding the Delay you need to hit`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`The seed listed may be significantly shorter than normal Generation 5 seeds.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`You still need to hit the Initial Seed (the 32-digit one).`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Right-click your selected spread and hit `,(0,n.jsx)(r.code,{children:`Generate Entralink Nature Seeds`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Choose a list of desired natures.`}),`
`,(0,n.jsxs)(r.li,{children:[`Click `,(0,n.jsx)(r.code,{children:`Generate`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 4: Hitting C-Gear Seed and Initial Seed`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Go to the text where it says `,(0,n.jsx)(r.code,{children:`[Player] warped to the Entralink!`}),` and make a save state. Pause the game and note the delay.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`You will find out how long it takes for the C-Gear Seed to generate after pressing `,(0,n.jsx)(r.code,{children:`A`}),`.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`A`}),`, and the Lua will tell you the C-Gear Seed you hit.`]}),`
`,(0,n.jsx)(r.li,{children:`Go back to RNG Reporter and go to Generation 5 Tools > Seed To Time.`}),`
`,(0,n.jsx)(r.li,{children:`Type in the C-Gear Seed you got.`}),`
`,(0,n.jsxs)(r.li,{children:[`Subtract the delay where you pressed `,(0,n.jsx)(r.code,{children:`A`}),` from the delay when the C-Gear Seed was generated.`]}),`
`,(0,n.jsx)(r.li,{children:`Subtract the result from your target delay. For example, if my target delay was 4288 and the difference was 200, I would hit delay 4088.`}),`
`,(0,n.jsxs)(r.li,{children:[`Hit your Initial Seed again and do delay advances. Press `,(0,n.jsx)(r.code,{children:`N`}),` to add 1 to the delay to inch closer.`]}),`
`,(0,n.jsxs)(r.li,{children:[`If you fail, just try again. There may be a small gap between when you unpause the emulator and press `,(0,n.jsx)(r.code,{children:`A`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 5: Advancing frames`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Pay attention to the `,(0,n.jsx)(r.strong,{children:`IVRNG Frame`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Subtract `,(0,n.jsx)(r.strong,{children:`13`}),` from your target frame. You will advance frames until you hit that.`]}),`
`,(0,n.jsx)(r.li,{children:`Advance frames by walking around. Only have 1 Pokémon in your party to avoid advancing too many frames at once.`}),`
`,(0,n.jsx)(r.li,{children:`When you hit your IVRNG Frame, interact with your target Pokémon immediately. Make a save state and enter the battle.`}),`
`,(0,n.jsx)(r.li,{children:`If done correctly, you will get the correct IVs on your target. Yay!`}),`
`,(0,n.jsx)(r.li,{children:`To get your Nature, move to Step 6 or reload the save state and re-catch the Pokémon.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Make sure to hit a different PIDRNG Frame each time, or you will get the same nature.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 6: Getting a good Nature`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Go back to RNG Reporter and go to Entralink Seed Search. Note the Frame: that is the PIDRNG Frame you need to hit.`}),`
`,(0,n.jsx)(r.li,{children:`Go back to your save state and wait until you are 6 frames before the frame listed in RNG Reporter.`}),`
`,(0,n.jsx)(r.li,{children:`Enter the battle again and catch the Pokémon.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Make sure to have the correct Gender ratio set up!
`})}),`
`,(0,n.jsx)(r.h3,{children:`Congrats!`}),`
`,(0,n.jsx)(r.p,{children:`You have just completed your Entralink RNG!`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};