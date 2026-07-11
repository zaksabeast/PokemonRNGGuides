import{t as e}from"./jsx-runtime-DE3yYTa1.js";import{m as t}from"./index-wZDcYfXo.js";var n=e(),r={title:`Pokémon Emerald RNG with ACE Guide (Seed Manipulation & Setup)`,description:`Step-by-step guide to RNG manipulation in Pokémon Emerald using ACE. Learn how to set custom seeds, generate targets, calibrate advances, and reliably hit perfect Pokémon.`,navDrawerTitle:`RNG With ACE`,slug:`emerald-rng-with-ace`,category:`Emerald`,section:`rng_technique`,addedOn:`2026-05-05`,variant:`retail`};function i(e){let r={a:`a`,blockquote:`blockquote`,br:`br`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Admiral-Fish/PokeFinder/releases`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://e-sh4rk.github.io/ACE3/emerald/getting-started/introduction/`,children:`A stable ACE species`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mystic-timer`,children:`Mystic Timer`})}),`
`,(0,n.jsx)(r.li,{children:`A Pokémon with Sweet Scent (only for wild)`}),`
`,(0,n.jsx)(r.li,{children:`At least one free slot in the party (optional, recommended to calibrate faster)`}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`IMPORTANT`,children:[`
`,(0,n.jsxs)(r.p,{children:[`This guide assumes a basic knowledge of Gen 3 RNG.`,(0,n.jsx)(r.br,{}),`
`,`Pokémon obtained with this method are not illegal despite the use of ACE.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Preparation of the Seed and the Code`}),`
`,(0,n.jsx)(r.p,{children:`Prepare your target and generate the ACE code to change the Initial Seed.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open PokeFinder → Gen 3 → Wild/Static.`}),`
`,(0,n.jsxs)(r.li,{children:[`Go to the "Researcher" tab and filter the target Pokémon. If it is wild, select "Wild 2". Do not close PokeFinder.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/SearchingTarget.webp`,alt:`Searching target with PokeFinder`})}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Copy the Seed of your target.`}),`
`,(0,n.jsxs)(r.li,{children:[`Use `,(0,n.jsx)(r.a,{href:`https://e-sh4rk.github.io/CodeGenerator/scripts/seed/index.html`,children:`this script by E-Sh4rk`}),` to obtain the seed to use for the code.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/1stScript.webp`,alt:`First Script`})}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Paste the Seed adding `,(0,n.jsx)(r.code,{children:`0x`}),` at the beginning.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Enter `,(0,n.jsx)(r.code,{children:`5`}),` as category.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Set the range to `,(0,n.jsx)(r.code,{children:`-900 -900`}),` (~15 seconds).`]}),`
`,(0,n.jsx)(r.li,{children:`Copy the Seed generated in output.`}),`
`,(0,n.jsxs)(r.li,{children:[`Use the `,(0,n.jsx)(r.a,{href:`https://e-sh4rk.github.io/CodeGenerator/index.html`,children:`ACE script generator by E-Sh4rk`}),` to obtain the code.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/2ndScript.webp`,alt:`ACE Script Generator`})}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Go to "RNG and PID Manipulation" and select "Change PRNG Seed".`}),`
`,(0,n.jsxs)(r.li,{children:[`Paste the Seed keeping `,(0,n.jsx)(r.code,{children:`0x`}),` and finally click "Compute".`]}),`
`,(0,n.jsx)(r.li,{children:`Enter all the codes into the game.`}),`
`,(0,n.jsx)(r.li,{children:`Save and execute the script to verify that it works.`}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`WARNING`,children:[`
`,(0,n.jsx)(r.p,{children:`If the game crashes or freezes, check the codes and make sure there are no Pokémon or ghost data in Boxes 12, 13, 14 and in the last row of Box 11. Repeat until the Pokédex diploma appears.`}),`
`,(0,n.jsx)(`br`,{}),`
`,(0,n.jsx)(r.p,{children:`This is how to remove ghost data. Do this in Box 11, 12, 13, 14 if you encounter issues.`}),`
`,(0,n.jsx)(`br`,{}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/RemoveGhostData.webp`,alt:`Remove Ghost Data`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: RNG of the Pokémon`}),`
`,(0,n.jsx)(r.p,{children:`Perform the RNG after setting the new Initial Seed.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Save in the correct spot to capture your target.`}),`
`,(0,n.jsx)(r.li,{children:`Open Mystic Timer and select Gen 3.`}),`
`,(0,n.jsxs)(r.li,{children:[`Set the timer with `,(0,n.jsx)(r.code,{children:`Target Advance = 900`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Start the timer and open the ACE species info at the same time.`}),`
`,(0,n.jsx)(r.li,{children:`Proceed as in a classic RNG.`}),`
`]}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsx)(r.tr,{children:(0,n.jsx)(r.th,{children:`Mystic Timer Config`})})}),(0,n.jsx)(r.tbody,{children:(0,n.jsx)(r.tr,{children:(0,n.jsx)(r.td,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/TimerConfig.webp`,alt:`Mystic Timer and ACE`})})})})]}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Calibration`}),`
`,(0,n.jsx)(r.p,{children:`Calibration is different because the Seed has been modified directly.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`In PokeFinder, right-click on the Seed.`}),`
`,(0,n.jsxs)(r.li,{children:[`Click `,(0,n.jsx)(r.code,{children:`Generate times for seed`}),` and click "Find".`]}),`
`,(0,n.jsxs)(r.li,{children:[`Note `,(0,n.jsx)(r.code,{children:`Initial Advances`}),` and `,(0,n.jsx)(r.code,{children:`Initial Seed (16/32-bit)`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Copy the Seed into the "Generator" section.`}),`
`,(0,n.jsx)(r.li,{children:`Take the Advances and subtract 100.`}),`
`,(0,n.jsxs)(r.li,{children:[`Enter the result in `,(0,n.jsx)(r.code,{children:`Initial Advances`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Set `,(0,n.jsx)(r.code,{children:`Max Advances`}),` to 100.`]}),`
`,(0,n.jsx)(r.li,{children:`Configure the settings based on the capture location. If it is wild, select "Wild 2".`}),`
`,(0,n.jsx)(r.li,{children:`Find the obtained Advance. Subtract this value from the original target (the ones noted before).`}),`
`,(0,n.jsxs)(r.li,{children:[`Calibrate using as value `,(0,n.jsx)(r.code,{children:`900 + (Target Advance - obtained Advance)`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Repeat until you obtain the desired Pokémon.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Troubleshooting`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`The IVs may be incorrect even if everything else is correct. The use of ACE can in fact alter audio or graphics. This affects the cycle counter of the wild method, generating one different from Wild 2.`}),`
`,(0,n.jsx)(r.li,{children:`If the IVs do not match, the only solution is to try again.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Fiask for writing this Guide.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};