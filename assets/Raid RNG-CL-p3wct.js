import{u as s,j as e}from"./index-NUjML0_o.js";const r={title:"Raid RNG",description:"RNG raid Pokemon (Even G-max!) found in Dens!  Use this after getting your den seed.",slug:"retail-swsh-raid",subCategory:"General"};function t(i){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Introduction"}),`
`,e.jsx(n.p,{children:"First, a huge thanks to the research team that spent days to find this: Leanny (u/LeanYosh), Admiral Fish (u/Admiral_Fish), Zaksabeast (u/Zaksabeast), wwwwwwzx (u/wwwwwwzx), Kaphotics (u/Kaphotics) and Vladcik (u/Aligatueur)."}),`
`,e.jsx(n.p,{children:"The shiny charm does not affect the shiny generation in Raids."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"GameFreak can patch this at any time, so wait to be told the update is safe before updating your game."})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/Admiral-Fish/RaidFinder/releases/",children:"Admiral Fish's RaidFinder"})," or ",e.jsx(n.a,{href:"https://leanny.github.io/seedchecker/index.html",children:"Leanny's Mobile Seed Checker"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/Leanny/PKHeX_Raid_Plugin",children:"Leanny's PKHeX Raid Plugin"})," or ",e.jsx(n.a,{href:"https://github.com/zaksabeast/CaptureSight/releases",children:"Zaksabeast’s CaptureSight"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Get your raid seed"}),`
`,e.jsx(n.p,{children:"Follow one of these two guides to get your raid seed:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"retail-swsh-get-seed-with-cfw",children:"Get your raid seed with custom firmware"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"retail-swsh-get-seed-without-cfw",children:"Get your raid seed without custom firmware"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Find your desired Pokemon"}),`
`,e.jsx(n.p,{children:"Use RaidFinder or the Mobile Seed Checker to find your desired Pokemon."}),`
`,e.jsx(n.p,{children:"Each den can has muliple spawns, and each spawn has predetermined properties such as Pokemon species and flawless IV count. The spawn used is generated with a cryptographically secure value that cannot be RNG'd, but the spawn can be reset after RNGing your Pokemon, so you can choose any spawn you want to RNG."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The PKHeX raid plugin shows the current Pokemon is in 0 advances while RaidFinder shows the current Pokemon is in 1 advance.
`})}),`
`,e.jsx(n.h2,{children:"Step 3: Advance the RNG"}),`
`,e.jsx(n.p,{children:"There are multiple methods to advance the RNG:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Day by day:"})," use this if you do not have Nintendo online or a friend with a switch"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"VS battle glitch:"})," use this if you have Nintendo online or a friend with a switch"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Luxray:"})," use this if you're okay with software botting and have custom firmware"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Arduino:"})," use this if you're okay with hardware botting. This method will not be covered in this guide, but you can find an example of an RNG advancing tool ",e.jsx(n.a,{href:"https://github.com/nnguy132/Switch-Frame-Advancer",children:"here"})]}),`
`]}),`
`,e.jsx(n.p,{children:"At any point during the process, you can check your seed again using the instructions in step 1 to make sure you did not make a mistake somewhere."}),`
`,e.jsx(n.h3,{children:"Day by day"}),`
`,e.jsx(n.p,{children:"Your Switch must be in local mode; airplane will not work."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open your raid's menu"}),`
`,e.jsx(n.li,{children:'Go to "Invite others"'}),`
`,e.jsx(n.li,{children:"While the game is searching, press the Home button"}),`
`,e.jsx(n.li,{children:'Go to the "Date and Time" settings in the switch settings menu'}),`
`,e.jsx(n.li,{children:"Edit your day/month/year by one"}),`
`,e.jsx(n.li,{children:'Press "OK"'}),`
`,e.jsx(n.li,{children:"Enter back into the game"}),`
`,e.jsx(n.li,{children:"Cancel the raid search"}),`
`,e.jsx(n.li,{children:"Go back in the game"}),`
`,e.jsx(n.li,{children:"Cancel the Raid search"}),`
`,e.jsx(n.li,{children:"Go back to the overworld. You should see the den being red again. This advances the RNG one time"}),`
`,e.jsx(n.li,{children:"Continue advancing until you reach three advances from your desired Pokemon."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You can only advance one day at a time.  Skipping more than one day will only advance the RNG once.  Going back in time does not advance the RNG, so update both the month and day at the end of the month.
`})}),`
`,e.jsx(n.h3,{children:"VS battle glitch"}),`
`,e.jsx(n.p,{children:"Make sure to do this method while inside of a Pokemon center, otherwise your game might crash."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Connect your Switch online, and go to the VS Menu"}),`
`,e.jsx(n.li,{children:"Start a battle and let your switch find another player"}),`
`,e.jsx(n.li,{children:'The moment your game has found a player, hold the "Home" button on your switch and enable airplane mode (you will see a connection error if this is done correctly)'}),`
`,e.jsx(n.li,{children:'Go to the "Date and Time" settings in the switch settings menu'}),`
`,e.jsx(n.li,{children:"Edit your day/month/year by one. This advances the RNG one time"}),`
`,e.jsx(n.li,{children:"Continue advancing until you reach three advances from your desired Pokemon"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Some people had issues by advancing a specific amount and getting more far than excepted, so make sure to check your seed often and make sure you're still on track.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You can only advance one day at a time.  Skipping more than one day will only advance the RNG once.  Going back in time does not advance the RNG, so update both the month and day at the end of the month.
`})}),`
`,e.jsx(n.h3,{children:"Luxray"}),`
`,e.jsx(n.p,{children:"Make sure to do this method while inside of a Pokemon center, otherwise your game might crash."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Update the Date/Time setting to be from the server"}),`
`,e.jsx(n.li,{children:"Set the amount of RNG advances you want with the overlay menu"}),`
`,e.jsx(n.li,{children:"Press Step in order to have Luxray to advance the RNG"}),`
`]}),`
`,e.jsx(n.p,{children:"You can use Luxray to fix your Switch's clock since it edits the internal server time."}),`
`,e.jsx(n.h2,{children:"Step 4: Reset to get your desired Pokemon"}),`
`,e.jsx(n.p,{children:"A den's spawns are predetermined for the current raid and the next two advances."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Advance the RNG until you reach three advances from your desired Pokemon"}),`
`,e.jsx(n.li,{children:"Save the game"}),`
`,e.jsx(n.li,{children:"Advance three times"}),`
`,e.jsx(n.li,{children:"Start the raid and see if the Pokemon is your desired species"}),`
`,e.jsx(n.li,{children:"Restart the game and repeat the above steps until you get your desired species."}),`
`]}),`
`,e.jsx(n.h2,{children:"Natural raid rng"}),`
`,e.jsx(n.p,{children:"Every den has its own Seed. Even if it's inactive, the advancement works the same, day by day, and every RNG advancement will advance every den."}),`
`,e.jsx(n.p,{children:"Most people do raid RNG by using a wishing piece to reset a den's seed until a good seed is found, but it's possible to get a shiny Pokemon using the seed each den already has."}),`
`,e.jsx(n.p,{children:"A den's seed is normally reset to get a specific den with exact Pokemon properties, such as nature, shininess, and IVs. With natural raid RNG, an existing seed is chosen to go after, so there's a lack of control over the Pokemon properties and potential spawns. As a result, this method is only recomended if you just want quick shiny Pokemon."}),`
`,e.jsx(n.p,{children:"This method is faster because instead of focusing on one specific den, every den is RNG'd at the same time."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:`Use CaptureSight's "all den view" or the PKHeX raid plugin to find a den with a nearby shiny`}),`
`,e.jsx(n.li,{children:"Advance the RNG until you reach three advances from the shiny raid"}),`
`,e.jsx(n.li,{children:"Save the game"}),`
`,e.jsx(n.li,{children:"Advance the RNG three times and check to see if the den is active"}),`
`,e.jsx(n.li,{children:"If not, reset the game and try again until the den is active"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Tip: Save time by throwing wishing pieces on a random den in order to do advances without moving to different dens.  The wishing piece den might be useable for RNG later too!
`})})]})}function o(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{o as default,r as frontmatter};
