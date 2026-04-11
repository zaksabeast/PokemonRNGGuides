import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-Dg958C8T.js";var n=e(),r={title:`RNG Advancing Techniques`,description:`Understanding the key concepts to speed up RNG manipulations with Painting Reseeding and Battle Video Reseeding.`,slug:`emerald-advancing-rng-techniques`,category:`Emerald`,section:`technical_info`};function i(e){let r={a:`a`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components},{Gist:i}=r;return i||o(`Gist`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:(0,n.jsx)(r.p,{children:`Gist: Understanding the key concepts to speed up RNG manipulations with
Painting Reseeding and Battle Video Reseeding.`})}),`
`,(0,n.jsx)(r.h2,{children:`Basic RNG manipulation`}),`
`,(0,n.jsx)(r.p,{children:`The outcome of a Pokémon generation depends on the RNG state. To get the wanted Pokémon, players need to advance the RNG state to a specific value (target advance), then perform the action to encounter the Pokémon.`}),`
`,(0,n.jsx)(r.p,{children:`In Emerald, the RNG state starts at 0 and advances by 1 every visual frame (60 advances per second). It also advances through in-game actions like NPC movement, and menu interactions.`}),`
`,(0,n.jsx)(r.p,{children:`The easiest way to advance the RNG state to the target advance is to simply wait a specific number of frames (ex: 597.275 seconds), then try to perform the action at the exact right timing (with a 1/60 second precision). Each attempt requires rebooting the game and waiting the full delay again.`}),`
`,(0,n.jsx)(r.h2,{children:`Battle Video Technique`}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`Battle Video is a technique to save and restore the RNG state.`}),` Using that technique, players only need to wait the full delay once, then each RNG manipulation retry is very quick.`]}),`
`,(0,n.jsx)(r.p,{children:`This technique doesn't require frame-perfect input. If you are 1 frame too early or too late, the RNG saved state will only be 1 advance too late or too early.`}),`
`,(0,n.jsx)(r.p,{children:`Here's an example to understand Battle Video for the target advance 36,000 (10 minutes).`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`You wait 9.5 minutes (~34K advances), then create a Battle Video.`}),`
`,(0,n.jsx)(r.li,{children:`You go to the map where you want to encounter your wanted Pokémon.`}),`
`,(0,n.jsx)(r.li,{children:`You watch your Battle Video. The RNG state is now at ~34K advances.`}),`
`,(0,n.jsx)(r.li,{children:`You wait 0.5 minutes and trigger the Pokémon battle.`}),`
`,(0,n.jsx)(r.li,{children:`If you miss your target, you calibrate, watch the Battle Video again to set the RNG state back to ~34K advances, and wait only 0.5 minute to try the encounter again.`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Check out the `,(0,n.jsx)(r.a,{href:`/emerald-battle-video`,children:`Battle Video technique detailed guide and webtool`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Speeding Up Advances`}),`
`,(0,n.jsx)(r.p,{children:`During battle, the RNG state advances by 2 for every visual frame instead of 1. For example, reaching advance 36,000 would only take 5 minutes in battle instead of 10 minutes out of battle.`}),`
`,(0,n.jsx)(r.h2,{children:`Painting Reseeding`}),`
`,(0,n.jsx)(r.p,{children:`Pokémon with very rare traits (ex: 6 perfect IVs) sometimes require the RNG state to be very high (ex: 100,000,000 advances which is ~20 days wait).`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Painting Reseeding is a technique to make the RNG state jump by millions of advances instantly.`})}),`
`,(0,n.jsx)(r.p,{children:`For example, performing Painting Reseeding can set the RNG state to 99,966,396 advances instantly. Afterwards, only 33,604 advances (~10 minutes) need to be waited to reach the target advance 100,000,000 (instead of ~20 days).`}),`
`,(0,n.jsx)(r.p,{children:`Hitting your final target with Painting Reseeding requires 2 actions, each with a different wait time:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Frames before painting: Visual frames before doing the Painting Reseeding technique`}),`
`,(0,n.jsx)(r.li,{children:`Advances after painting: Advances to the RNG state after doing the Painting Reseeding technique`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`For example, to hit the final target advance of 100,000,000:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Frames before painting: 44,572 (which sets RNG state to 99,966,396 advances)`}),`
`,(0,n.jsx)(r.li,{children:`Advances after painting: 33,604 (which brings the RNG state to 100,000,000 advances)`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Performing Painting Reseeding successfully requires a frame-perfect input. The number of advances to the RNG state depends on the exact timing of the button press. Doing it one frame too late or too early will completely change the outcome (ex: doing the technique at 44,571 frames instead of 44,572 sets the RNG state to 3,400,311,113 advances, instead of 99,966,396).`}),`
`,(0,n.jsx)(r.p,{children:`After performing it, players need to validate whether they successfully hit their target frames before painting. If succesful, players then create a Battle Video to save and restore their RNG state in case they miss their target advances after painting for the Pokémon encounter. Note that the Battle Video can't also be used to speed up hitting the target frames before painting, because Battle Video only alters the RNG state, not the frame counter.`}),`
`,(0,n.jsx)(r.p,{children:`Here's an example to understand Painting Reseeding with Battle Video for the target advance 100,000,000, which has "Frames before painting: 44,572" and "Advances after painting: 33,604".`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`You go in front of the painting.`}),`
`,(0,n.jsx)(r.li,{children:`You wait ~12 minutes and try to perform Painting Reseeding at frame 44,572.`}),`
`,(0,n.jsx)(r.li,{children:`You fly to Victory Road and catch a Pokemon. Based on the Pokémon stats, you determine whether you hit the target frames before painting. (Whether the caught Pokemon exists near the RNG advance 99,966,396).`}),`
`,(0,n.jsx)(r.li,{children:`If you failed, you calibrate, and go back to step 1.`}),`
`,(0,n.jsx)(r.li,{children:`If you succeed to hit your target frames before painting, you wait until the advance is close to the target (ex: ~99,998,000), and make a Battle Video.`}),`
`,(0,n.jsx)(r.li,{children:`You go to the map where you want to encounter your wanted Pokémon.`}),`
`,(0,n.jsx)(r.li,{children:`You watch your Battle Video. The RNG state is now at ~99,998,000 advances.`}),`
`,(0,n.jsx)(r.li,{children:`You wait 0.5 minutes and trigger the Pokémon battle at advance 100,000,000.`}),`
`,(0,n.jsx)(r.li,{children:`If you miss your target, you watch the Battle Video again to set the RNG state back to 99,998,000 advances, and wait only 0.5 minute to try the encounter again.`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Check out the `,(0,n.jsx)(r.a,{href:`/emerald-painting-rng`,children:`Painting Reseeding detailed guide and webtool`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`German translation: Parasite.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};