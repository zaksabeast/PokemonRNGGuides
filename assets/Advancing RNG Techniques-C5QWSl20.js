import{w as o,j as t}from"./index-Bhg4Ffon.js";const d={title:"Overview of RNG Advancing Techniques",description:"Understanding the key concepts to speed up RNG manipulations with Painting Reseeding and Battle Video Reseeding.",slug:"emerald-advancing-rng-techniques",category:"Emerald",section:"technical_info"};function i(n){const e={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...o(),...n.components},{Gist:a}=e;return a||s("Gist"),t.jsxs(t.Fragment,{children:[t.jsx(a,{children:t.jsx(e.p,{children:`Gist: Understanding the key concepts to speed up RNG manipulations with
Painting Reseeding and Battle Video Reseeding.`})}),`
`,t.jsx(e.h2,{children:"Basic RNG manipulation"}),`
`,t.jsx(e.p,{children:"The outcome of a Pokémon generation depends on the RNG state. To get the wanted Pokémon, players need to advance the RNG state to a specific value (target advance), then perform the action to encounter the Pokémon."}),`
`,t.jsx(e.p,{children:"In Emerald, the RNG state starts at 0 and advances by 1 every visual frame (60 advances per second). It also advances through in-game actions like NPC movement, and menu interactions."}),`
`,t.jsx(e.p,{children:"The easiest way to advance the RNG state to the target advance is to simply wait a specific number of frames (ex: 597.275 seconds), then try to perform the action at the exact right timing (with a 1/60 second precision). Each attempt requires rebooting the game and waiting the full delay again."}),`
`,t.jsx(e.h2,{children:"Battle Video Technique"}),`
`,t.jsxs(e.p,{children:[t.jsx(e.strong,{children:"Battle Video is a technique to save and restore the RNG state."})," Using that technique, players only need to wait the full delay once, then each RNG manipulation retry is very quick."]}),`
`,t.jsx(e.p,{children:"This technique doesn't require frame-perfect input. If you are 1 frame too early or too late, the RNG saved state will only be 1 advance too late or too early."}),`
`,t.jsx(e.p,{children:"Here's an example to understand Battle Video for the target advance 36,000 (10 minutes)."}),`
`,t.jsxs(e.ol,{children:[`
`,t.jsx(e.li,{children:"You wait 9.5 minutes (~34K advances), then create a Battle Video."}),`
`,t.jsx(e.li,{children:"You go to the map where you want to encounter your wanted Pokémon."}),`
`,t.jsx(e.li,{children:"You watch your Battle Video. The RNG state is now at ~34K advances."}),`
`,t.jsx(e.li,{children:"You wait 0.5 minutes and trigger the Pokémon battle."}),`
`,t.jsx(e.li,{children:"If you miss your target, you calibrate, watch the Battle Video again to set the RNG state back to ~34K advances, and wait only 0.5 minute to try the encounter again."}),`
`]}),`
`,t.jsxs(e.p,{children:["Check out the ",t.jsx(e.a,{href:"/emerald-battle-video",children:"Battle Video technique detailed guide and webtool"}),"."]}),`
`,t.jsx(e.h2,{children:"Speeding Up Advances"}),`
`,t.jsx(e.p,{children:"During battle, the RNG state advances by 2 for every visual frame instead of 1. For example, reaching advance 36,000 would only take 5 minutes in battle instead of 10 minutes out of battle."}),`
`,t.jsx(e.h2,{children:"Painting Reseeding"}),`
`,t.jsx(e.p,{children:"Pokémon with very rare traits (ex: 6 perfect IVs) sometimes require the RNG state to be very high (ex: 100,000,000 advances which is ~20 days wait)."}),`
`,t.jsx(e.p,{children:t.jsx(e.strong,{children:"Painting Reseeding is a technique to make the RNG state jump by millions of advances instantly."})}),`
`,t.jsx(e.p,{children:"For example, performing Painting Reseeding can set the RNG state to 99,966,396 advances instantly. Afterwards, only 33,604 advances (~10 minutes) need to be waited to reach the target advance 100,000,000 (instead of ~20 days)."}),`
`,t.jsx(e.p,{children:"Hitting your final target with Painting Reseeding requires 2 actions, each with a different wait time:"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Advances before painting: Advances to the RNG state before doing the Painting Reseeding technique"}),`
`,t.jsx(e.li,{children:"Advances after painting: Advances to the RNG state after doing the Painting Reseeding technique"}),`
`]}),`
`,t.jsx(e.p,{children:"For example, to hit the final target advance of 100,000,000:"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Advances before painting: 44,572 (which sets RNG state to 99,966,396 advances)"}),`
`,t.jsx(e.li,{children:"Advances after painting: 33,604 (which brings the RNG state to 100,000,000 advances)"}),`
`]}),`
`,t.jsx(e.p,{children:"Performing Painting Reseeding successfully requires a frame-perfect input. The number of advances to the RNG state depends on the exact timing of the button press. Doing it one frame too late or too early will completely change the outcome (ex: doing the technique after 44,571 advances instead of 44,572 sets the RNG state to 3,400,311,113 advances, instead of 99,966,396)."}),`
`,t.jsx(e.p,{children:"After performing it, players need to validate whether they successfully hit their target advances before painting. If succesful, players then create a Battle Video to save and restore their RNG state in case they miss their target advances after painting for the Pokémon encounter. Battle Video can also be used to help the target advances before painting."}),`
`,t.jsx(e.p,{children:`Here's an example to understand Painting Reseeding with Battle Video for the target advance 100,000,000, which has "Advances before painting: 44,572" and "Advances after painting: 33,604".`}),`
`,t.jsxs(e.ol,{children:[`
`,t.jsx(e.li,{children:"You wait 10.5 minutes (~42K advances), then create a Battle Video."}),`
`,t.jsx(e.li,{children:"You go in front of the painting."}),`
`,t.jsx(e.li,{children:"You watch your Battle Video. The RNG state is now at ~42K advances."}),`
`,t.jsx(e.li,{children:"You wait 0.5 minutes and try to perform Painting Reseeding at advance 44,572."}),`
`,t.jsx(e.li,{children:"You fly to Victory Road and catch a Pokemon. Based on the Pokémon stats, you determine whether you hit the target advances before painting. (Whether the caught Pokemon exists near the RNG advance 99,966,396)."}),`
`,t.jsx(e.li,{children:"If you failed, you calibrate, and go back to step 2."}),`
`,t.jsx(e.li,{children:"If you succeed to hit your target advances before painting, you wait until the advance is close to the target (ex: ~99,998,000), and make a new Battle Video."}),`
`,t.jsx(e.li,{children:"You go to the map where you want to encounter your wanted Pokémon."}),`
`,t.jsx(e.li,{children:"You watch your Battle Video. The RNG state is now at ~99,998,000 advances."}),`
`,t.jsx(e.li,{children:"You wait 0.5 minutes and trigger the Pokémon battle at advance 100,000,000."}),`
`,t.jsx(e.li,{children:"If you miss your target, you watch the Battle Video again to set the RNG state back to 99,998,000 advances, and wait only 0.5 minute to try the encounter again."}),`
`]}),`
`,t.jsxs(e.p,{children:["Check out the ",t.jsx(e.a,{href:"/emerald-painting-rng",children:"Painting Reseeding detailed guide and webtool"}),"."]})]})}function c(n={}){const{wrapper:e}={...o(),...n.components};return e?t.jsx(e,{...n,children:t.jsx(i,{...n})}):i(n)}function s(n,e){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,d as frontmatter};
