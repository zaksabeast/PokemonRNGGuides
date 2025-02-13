import{u as r,j as e}from"./index-DtinywFa.js";const a={title:"Wild RNG",description:"Wild RNG",slug:"emulator-b2w2-wild",subCategory:"Emulator",isRoughDraft:!0};function o(t){const n={li:"li",p:"p",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"Requirement :"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The game's profile (other guide)"}),`
`,e.jsx(n.li,{children:"Desmume"}),`
`,e.jsx(n.li,{children:"Lua scripts (noob forum)"}),`
`,e.jsx(n.li,{children:"RNG Reporter"}),`
`,e.jsx(n.li,{children:"Encounter Slot page"}),`
`,e.jsx(n.li,{children:"Chattot with chatter"}),`
`,e.jsx(n.li,{children:"Sweet Scent / Honey"}),`
`]}),`
`,e.jsx(n.p,{children:"/!\\ There's a problem with the lua / rng reporter and PIDRNGFrame. You'll have to count one frame LESS ALWAYS compared to RNG Reporter. If Reporter gives a target frame at 100. You need to up your PIDRNGFrame to 99 on the script /!\\"}),`
`,e.jsx(n.p,{children:"The huge difference in gen 5 is that the RNG is divided in two parts : the PIDRNG Frame and the IVRNG Frame. The first control Shiny, Nature, Gender etc while the other focus only on IVs"}),`
`,e.jsx(n.p,{children:"Setup :"}),`
`,e.jsx(n.p,{children:`go to the route you want WITH THE SCRIPT ALREADY ON. This will allow you to check if the map is noisy or not, which is a huge point of Gen 5 RNG.
Once you have your route / target in mind, just save an close your game.`}),`
`,e.jsx(n.p,{children:"Open RNG Reporter, and open the 5th gen time finder."}),`
`,e.jsx(n.p,{children:"Stay on Capture, select your game profile and now time to explain the meaning of the 2 methods that are interesting for us :"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`IVs (Standard Seed) : Will allow you to check for a good IVRNG Frame. You can check the "Search for a Nearby Shiny Frame" to allow this IVs Frame to be Shiny
Note : We'll ignore IVs (C-Gear Seed) since more used for other methods`}),`
`,e.jsx(n.li,{children:"PIDRNG : Will allow you to find for a PIDFrame, but you'll not know the linked IVs Frame. You'll be able to see it on the main window and choose the IVs Frame that suits you well AFTER."}),`
`]}),`
`,e.jsx(n.p,{children:"For the Encounter Type, select your method. Special Encounters like Bubbling Spot / Shaking Grass will be covered in an other guide."}),`
`,e.jsx(n.p,{children:`Select your options, even if IVs Seed is more interesting. Once done, enter your parameters in both case but you can't search for IVs in PIDRNG while you can use filters for the PID in IVs (Standard Seed)
Hit generate.`}),`
`,e.jsx(n.p,{children:"Here's how to advance PIDRNG or IVRNG Frame :"}),`
`,e.jsx(n.p,{children:"For PID :"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chattot same as Gen 4. With Chatter they'll +1 every time you check their profile"}),`
`,e.jsx(n.li,{children:"Saving the game (more useful for specific case like Starters)"}),`
`,e.jsx(n.li,{children:"NPC advancement (really hard but can be abused with weather which allows you to up to crazy amount of PIDFRNG Frame in a few seconds)"}),`
`]}),`
`,e.jsx(n.p,{children:"For IVs :"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Doing 128 Steps will up your IVRNG Frame count of X which X is the amount of Pokemon in your team. If you have 6 Pokemon in your team, doing 128 steps will up the IVRNG Frame to 7 (1 of base + 6 from your team)"}),`
`,e.jsx(n.li,{children:"Storing a pokemon in the pc up the IVRNGFrame by 7"}),`
`,e.jsx(n.li,{children:"Battling a Pokemon (but not really reliable since it ups in crazy amount like weather for PID)"}),`
`]}),`
`,e.jsx(n.p,{children:"Once you have your target, find the date / time corresponding and use runasdate.exe (guide linked) or any other method you like."}),`
`,e.jsx(n.p,{children:"The Seed should be good without doing anything. If wrong, recheck your parameters (profile / runasdate)"}),`
`,e.jsx(n.p,{children:"Go as fast as possible in game and open the menu."}),`
`,e.jsx(n.p,{children:"Advance the frames the way you want. Don't forget the -1 for PIDRNGFrame difference and use sweet scent / honey."}),`
`,e.jsx(n.p,{children:"/!\\ DON'T HESITATE TO ABUSE OF SAVE STATES ESPECIALLY ON NOISY AREA /!\\"}),`
`,e.jsx(n.p,{children:"Tada, you should have your Shiny."}),`
`,e.jsx(n.p,{children:"ofc it was the easy part. Here comes the hard and BORING part."}),`
`,e.jsx(n.p,{children:`You got your Shiny if you were in a quiet area. But Gen 5 has a AWFUL problem. During Sweet Scent / Honey animation, if the area is noisy, PIDRNGFRame WILL CONTINUE TO ADVANCE.
So you'll not get what you want if you hit the sc / honey on your target frame.`}),`
`,e.jsx(n.p,{children:"And for that there's no miracle solution. You need to adjust / calibrate until your find your Shiny."}),`
`,e.jsx(n.p,{children:"/!\\ However. Fishing doesn't advance PIDRNGFrame, so you can fish without any problem. /!\\"})]})}function s(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{s as default,a as frontmatter};
