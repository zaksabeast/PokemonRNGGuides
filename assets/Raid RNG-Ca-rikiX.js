import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-B3ekRtZG.js";var n=e(),r={title:`Sword and Shield Raid RNG`,navDrawerTitle:`Raid RNG`,description:`Learn how to RNG raid Pokémon (including G-Max) in Sword and Shield Dens.`,slug:`retail-swsh-raid`,category:`Sword and Shield`,section:`pokemon_rng`,variant:[`retail`,`cfw-emu`],guideKey:`raid`};function i(e){let r={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`}),` or `,(0,n.jsx)(r.a,{href:`https://leanny.github.io/seedchecker/index.html`,children:`Leanny's Mobile Seed Checker`})]}),`
`,(0,n.jsxs)(r.li,{children:[`(Optional) CFW Seed Finding: `,(0,n.jsx)(r.a,{href:`https://github.com/Leanny/PKHeX_Raid_Plugin`,children:`Leanny's PKHeX Raid Plugin`}),` or `,(0,n.jsx)(r.a,{href:`https://github.com/zaksabeast/CaptureSight/releases`,children:`Zaksabeast’s CaptureSight`})]}),`
`,(0,n.jsxs)(r.li,{children:[`(Optional) CFW Advancing: `,(0,n.jsx)(r.a,{href:`https://github.com/3096/luxray/releases/tag/0.1.0`,children:`Luxray`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Info`}),`
`,(0,n.jsxs)(r.p,{children:[`The Shiny Charm does `,(0,n.jsx)(r.em,{children:`not`}),` affect shiny odds in raids.`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Get your raid seed`}),`
`,(0,n.jsx)(r.p,{children:`Follow one of these two guides to get your raid seed:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`/retail-swsh-get-seed-with-cfw`,children:`Get your raid seed with custom firmware`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`/retail-swsh-get-seed-without-cfw`,children:`Get your raid seed without custom firmware`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Find your desired Pokémon`}),`
`,(0,n.jsx)(r.p,{children:`Once you have the seed for your desired den, you can use PokeFinder or the Mobile Seed Checker to find your desired Pokémon.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Select the den you are RNGing for and its rarity.`}),`
`,(0,n.jsx)(r.li,{children:`Adjust the filters for desired stats and/or shininess.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: The PKHeX raid plugin shows the current Pokémon in 0 advances, while PokeFinder shows the current Pokémon in 1 advance.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Advance the RNG`}),`
`,(0,n.jsx)(r.p,{children:`There are several methods to advance the RNG:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Day by day:`}),` use this if you do not have Nintendo online or a friend with a Switch.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`VS battle glitch:`}),` use this if you have Nintendo online or a friend with a Switch.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Luxray:`}),` a custom firmware only bot to advance for you.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Arduino:`}),` a hardware bot to advance for you. This method is not covered in this guide, but you can find an example of an RNG advancing tool `,(0,n.jsx)(r.a,{href:`https://github.com/nnguy132/Switch-Frame-Advancer`,children:`here`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`At any point, you can check your seed again to confirm you haven't made a mistake.
To recheck your current RNG advance, follow the same steps from Step 1: Get your raid seed.`}),`
`,(0,n.jsx)(r.h3,{children:`Step 3A: Day by Day`}),`
`,(0,n.jsx)(r.p,{children:`Use this if you don't have online or a second Switch.`}),`
`,(0,n.jsx)(r.p,{children:`Your Switch must be in local mode (airplane mode won't work).`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Interact with the den and select “Invite Others.”`}),`
`,(0,n.jsxs)(r.li,{children:[`Press the `,(0,n.jsx)(r.code,{children:`Home`}),` button while it's searching.`]}),`
`,(0,n.jsx)(r.li,{children:`Open “System Settings” > “Date and Time.”`}),`
`,(0,n.jsxs)(r.li,{children:[`Move the date forward by 1 day and press `,(0,n.jsx)(r.code,{children:`OK`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Return to the game and cancel the search.`}),`
`,(0,n.jsx)(r.li,{children:`Exit the raid screen. The den should now be red again — that’s advanced the RNG by 1.`}),`
`,(0,n.jsx)(r.li,{children:`Repeat until you're 3 advances away from your target.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: You can only advance once per day change. Setting the date back does nothing. If it's the end of a month, increase both the month and day to avoid going backward.
`})}),`
`,(0,n.jsx)(r.h3,{children:`Step 3B: VS battle glitch`}),`
`,(0,n.jsx)(r.p,{children:`Make sure to do this method inside a Pokémon center. Doing this elsewhere may crash the game.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Connect your Switch online and go to the VS Menu.`}),`
`,(0,n.jsx)(r.li,{children:`Start a battle and let your Switch find another player.`}),`
`,(0,n.jsxs)(r.li,{children:[`The moment your game finds a player, hold the `,(0,n.jsx)(r.code,{children:`Home`}),` button and enable airplane mode (you will see a connection error if done correctly).`]}),`
`,(0,n.jsx)(r.li,{children:`Go to "Date and Time" settings in the Switch settings menu.`}),`
`,(0,n.jsxs)(r.li,{children:[`Edit the day forward by one and press `,(0,n.jsx)(r.code,{children:`OK`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Continue repeating step 5 until you reach three advances from your desired Pokémon.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Some people have issues advancing a specific amount and ending up beyond expected, so check your seed often to make sure you're still on track.`}),`
`,(0,n.jsx)(r.li,{children:`To recheck your current RNG advance, follow the same steps from Step 1: Get your raid seed.`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Note: Setting an earlier date won’t advance the RNG, so update both the month and day at the end of the month.
`})}),`
`,(0,n.jsx)(r.h3,{children:`Step 3C: Luxray`}),`
`,(0,n.jsx)(r.p,{children:`Make sure to do this method inside a Pokémon center. Doing this elsewhere may crash the game.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Update the Date/Time setting to use server time.`}),`
`,(0,n.jsx)(r.li,{children:`Set the amount of RNG advances you want using the overlay menu.`}),`
`,(0,n.jsxs)(r.li,{children:[`Press `,(0,n.jsx)(r.code,{children:`Step`}),` to have Luxray advance the RNG.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`You can use Luxray to fix your Switch's clock, as it edits the internal server time.`}),`
`,(0,n.jsx)(r.h2,{children:`Step 4: Reset to get your desired Pokémon`}),`
`,(0,n.jsx)(r.p,{children:`A den's spawns are predetermined for the current raid and the next two advances.
However the third advance is not predetermined and can be reset to obtain the desired Pokemon.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Advance the RNG until you are three advances away from your desired Pokemon.`}),`
`,(0,n.jsx)(r.li,{children:`Save the game.`}),`
`,(0,n.jsx)(r.li,{children:`Advance three times.`}),`
`,(0,n.jsx)(r.li,{children:`Start the raid and check if it's your desired Pokemon.`}),`
`,(0,n.jsx)(r.li,{children:`If not, reset the game and try again.`}),`
`]}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Advance`}),(0,n.jsx)(r.th,{children:`Pokemon`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`0`}),(0,n.jsx)(r.td,{children:`Current Advance`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`1`}),(0,n.jsx)(r.td,{children:`Not your target`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`2`}),(0,n.jsx)(r.td,{children:`Not your target`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`3`}),(0,n.jsx)(r.td,{children:`✅ Desired Pokémon - randomly determined`})]})]})]}),`
`,(0,n.jsx)(r.h2,{children:`Natural raid RNG`}),`
`,(0,n.jsx)(r.p,{children:`Every den has its own seed. Even if it's inactive, the advancement works the same—day by day, and every RNG advancement will advance every den.`}),`
`,(0,n.jsx)(r.p,{children:`Most people do raid RNG using a wishing piece to reset a den's seed until a good seed is found. However, it's possible to get a shiny Pokémon using the seed each den already has.`}),`
`,(0,n.jsx)(r.p,{children:`A den's seed is typically reset to get a specific den with exact Pokémon properties, such as nature, shininess, and IVs. With natural raid RNG, an existing seed is selected, leading to less control over Pokémon properties and potential spawns. This method is only recommended if you want quick shiny Pokémon.`}),`
`,(0,n.jsx)(r.p,{children:`This method is faster because instead of focusing on one specific den, every den is RNG'd at the same time.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Use CaptureSight's "all den view" or the PKHeX raid plugin to find a den with a nearby shiny.`}),`
`,(0,n.jsx)(r.li,{children:`Advance the RNG until you reach three advances from the shiny raid.`}),`
`,(0,n.jsx)(r.li,{children:`Save the game.`}),`
`,(0,n.jsx)(r.li,{children:`Advance three days and see if the red beam appears.`}),`
`,(0,n.jsx)(r.li,{children:`If not, reset the game and try again until the den is active.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Tip: Save time by throwing wishing pieces on a random den to do advances without moving to different dens. The wishing piece den might be usable for RNG later too!
`})})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};