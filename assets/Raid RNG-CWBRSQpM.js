import{u as s,j as e}from"./index-CUW7P-dy.js";const o={title:"Raid RNG",description:"RNG raid Pokémon (even G-max!) found in Dens! Use this after getting your den seed.",slug:"retail-swsh-raid",subCategory:"General"};function t(i){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})," or ",e.jsx(n.a,{href:"https://leanny.github.io/seedchecker/index.html",children:"Leanny's Mobile Seed Checker"})]}),`
`,e.jsxs(n.li,{children:["(Optional) CFW Seed Finding: ",e.jsx(n.a,{href:"https://github.com/Leanny/PKHeX_Raid_Plugin",children:"Leanny's PKHeX Raid Plugin"})," or ",e.jsx(n.a,{href:"https://github.com/zaksabeast/CaptureSight/releases",children:"Zaksabeast’s CaptureSight"})]}),`
`,e.jsxs(n.li,{children:["(Optional) CFW Advancing: ",e.jsx(n.a,{href:"https://github.com/3096/luxray/releases/tag/0.1.0",children:"Luxray"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Get your raid seed"}),`
`,e.jsx(n.p,{children:"Follow one of these two guides to get your raid seed:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"/retail-swsh-get-seed-with-cfw",children:"Get your raid seed with custom firmware"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"/retail-swsh-get-seed-without-cfw",children:"Get your raid seed without custom firmware"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 2: Find your desired Pokémon"}),`
`,e.jsx(n.p,{children:"Once you have the seed for your desired den, you can use PokeFinder or the Mobile Seed Checker to find your desired Pokémon."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The PKHeX raid plugin shows the current Pokémon in 0 advances, while PokeFinder shows the current Pokémon in 1 advance.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Shiny charm doesn't increase shiny odds in raids.
`})}),`
`,e.jsx(n.h2,{children:"Step 3: Advance the RNG"}),`
`,e.jsx(n.p,{children:"There are several methods to advance the RNG:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Day by day:"})," use this if you do not have Nintendo online or a friend with a Switch."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"VS battle glitch:"})," use this if you have Nintendo online or a friend with a Switch."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Luxray:"})," a custom firmware only bot to advance for you."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Arduino:"})," a hardware bot to advance for you. This method is not covered in this guide, but you can find an example of an RNG advancing tool ",e.jsx(n.a,{href:"https://github.com/nnguy132/Switch-Frame-Advancer",children:"here"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:"At any point, you can check your seed again using the instructions in Step 1 to confirm you haven't made a mistake."}),`
`,e.jsx(n.h3,{children:"Day by day"}),`
`,e.jsx(n.p,{children:"Your Switch must be in local mode; airplane mode will not work."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open your raid menu."}),`
`,e.jsx(n.li,{children:'Go to "Invite others."'}),`
`,e.jsxs(n.li,{children:["While the game is searching, press the ",e.jsx(n.code,{children:"Home"})," button."]}),`
`,e.jsx(n.li,{children:'Go to "Date and Time" settings in the Switch settings menu.'}),`
`,e.jsx(n.li,{children:"Edit your day/month/year by one."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"OK"}),"."]}),`
`,e.jsx(n.li,{children:"Enter back into the game."}),`
`,e.jsx(n.li,{children:"Cancel the raid search."}),`
`,e.jsx(n.li,{children:"Go back in the game."}),`
`,e.jsx(n.li,{children:"Cancel the raid search."}),`
`,e.jsx(n.li,{children:"Go back to the overworld. The den should be red again. This advances the RNG one time."}),`
`,e.jsx(n.li,{children:"Continue until you reach three advances from your desired Pokémon."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You can only advance one day at a time. Skipping more than one day will only advance the RNG once. Going back in time does not advance the RNG, so update both the month and day at the end of the month.
`})}),`
`,e.jsx(n.h3,{children:"VS battle glitch"}),`
`,e.jsx(n.p,{children:"Make sure to do this method inside a Pokémon center, or your game might crash."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Connect your Switch online and go to the VS Menu."}),`
`,e.jsx(n.li,{children:"Start a battle and let your Switch find another player."}),`
`,e.jsxs(n.li,{children:["The moment your game finds a player, hold the ",e.jsx(n.code,{children:"Home"})," button and enable airplane mode (you will see a connection error if done correctly)."]}),`
`,e.jsx(n.li,{children:'Go to "Date and Time" settings in the Switch settings menu.'}),`
`,e.jsx(n.li,{children:"Edit your day/month/year by one. This advances the RNG one time."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"OK"}),"."]}),`
`,e.jsx(n.li,{children:"Continue with steps 5 & 6 until you reach three advances from your desired Pokémon."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Some people have issues advancing a specific amount and ending up beyond expected, so check your seed often to make sure you're still on track.
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You can only advance one day at a time. Skipping more than one day will only advance the RNG once. Going back in time does not advance the RNG, so update both the month and day at the end of the month.
`})}),`
`,e.jsx(n.h3,{children:"Luxray"}),`
`,e.jsx(n.p,{children:"Make sure to do this method inside a Pokémon center, or your game might crash."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Update the Date/Time setting to use server time."}),`
`,e.jsx(n.li,{children:"Set the amount of RNG advances you want using the overlay menu."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"Step"})," to have Luxray advance the RNG."]}),`
`]}),`
`,e.jsx(n.p,{children:"You can use Luxray to fix your Switch's clock, as it edits the internal server time."}),`
`,e.jsx(n.h2,{children:"Step 4: Reset to get your desired Pokémon"}),`
`,e.jsx(n.p,{children:`A den's spawns are predetermined for the current raid and the next two advances.
However the third advance is not predetermined and can be reset to obtain the desired Pokemon.`}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Advance the RNG until you reach three advances from your desired Pokémon."}),`
`,e.jsx(n.li,{children:"Save the game."}),`
`,e.jsx(n.li,{children:"Advance three times."}),`
`,e.jsx(n.li,{children:"Start the raid and see if the Pokémon is your desired species."}),`
`,e.jsx(n.li,{children:"Restart the game and repeat the above steps until you get your desired species."}),`
`]}),`
`,e.jsx(n.h2,{children:"Natural raid RNG"}),`
`,e.jsx(n.p,{children:"Every den has its own seed. Even if it's inactive, the advancement works the same—day by day, and every RNG advancement will advance every den."}),`
`,e.jsx(n.p,{children:"Most people do raid RNG using a wishing piece to reset a den's seed until a good seed is found. However, it's possible to get a shiny Pokémon using the seed each den already has."}),`
`,e.jsx(n.p,{children:"A den's seed is typically reset to get a specific den with exact Pokémon properties, such as nature, shininess, and IVs. With natural raid RNG, an existing seed is selected, leading to less control over Pokémon properties and potential spawns. This method is only recommended if you want quick shiny Pokémon."}),`
`,e.jsx(n.p,{children:"This method is faster because instead of focusing on one specific den, every den is RNG'd at the same time."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:`Use CaptureSight's "all den view" or the PKHeX raid plugin to find a den with a nearby shiny.`}),`
`,e.jsx(n.li,{children:"Advance the RNG until you reach three advances from the shiny raid."}),`
`,e.jsx(n.li,{children:"Save the game."}),`
`,e.jsx(n.li,{children:"Advance the RNG three times and check to see if the den is active."}),`
`,e.jsx(n.li,{children:"If not, reset the game and try again until the den is active."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Tip: Save time by throwing wishing pieces on a random den to do advances without moving to different dens. The wishing piece den might be usable for RNG later too!
`})})]})}function d(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{d as default,o as frontmatter};
