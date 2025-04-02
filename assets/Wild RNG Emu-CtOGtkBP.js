import{u as o,j as e}from"./index-ie4x0hg9.js";const s={title:"Wild RNG",description:"Wild RNG",slug:"emulator-b2w2-wild",subCategory:"Emulator",isRoughDraft:!0,tag:"emu"};function t(r){const n={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Requirement"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The game's profile (see another guide)"}),`
`,e.jsx(n.li,{children:"DeSmuME"}),`
`,e.jsx(n.li,{children:"Lua scripts (noob forum)"}),`
`,e.jsx(n.li,{children:"RNG Reporter"}),`
`,e.jsx(n.li,{children:"Encounter Slot page"}),`
`,e.jsx(n.li,{children:"Chattot with chatter"}),`
`,e.jsx(n.li,{children:"Sweet Scent/Honey"}),`
`]}),`
`,e.jsx(n.p,{children:"There’s a problem with the Lua/RNG Reporter and PIDRNGFrame. You need to count one frame LESS than what RNG Reporter shows. If Reporter gives a target frame at 100, set your PIDRNGFrame to 99 in the script."}),`
`,e.jsx(n.p,{children:"In Gen 5, the RNG is divided into two parts: the PIDRNG Frame and the IVRNG Frame. The PIDRNG Frame controls shiny, nature, gender, etc., while the IVRNG Frame focuses only on IVs."}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsx(n.p,{children:"Go to the route you want WITH THE SCRIPT ALREADY ON. This lets you check if the map is noisy, which is important for Gen 5 RNG. Once you have your route/target, save and close your game."}),`
`,e.jsx(n.p,{children:"Open RNG Reporter and select the 5th gen time finder."}),`
`,e.jsx(n.p,{children:"Stay on Capture, select your game profile, and now let's explain the two methods important for us:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'IVs (Standard Seed): This lets you check for a good IVRNG Frame. You can check "Search for a Nearby Shiny Frame" to make this IV Frame shiny.'}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Ignore IVs (C-Gear Seed) since it's used for other methods.
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"PIDRNG: This helps you find a PIDFrame, but you won’t know the linked IVs Frame. You can see it on the main window and choose an IVs Frame that suits you afterward."}),`
`]}),`
`,e.jsx(n.p,{children:"For the Encounter Type, select your method. Special Encounters, like Bubbling Spot/Shaking Grass, will be covered in another guide."}),`
`,e.jsx(n.p,{children:"Select your options, even if IVs Seed is more interesting. Once done, enter your parameters for both cases. You can't search for IVs in PIDRNG, but you can use filters for PID in IVs (Standard Seed). Hit generate."}),`
`,e.jsx(n.h2,{children:"Advancing PIDRNG or IVRNG Frame"}),`
`,e.jsx(n.p,{children:"For PID:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chattot: Use Chatter to advance +1 every time you check their profile."}),`
`,e.jsx(n.li,{children:"Save the game: This is useful for specific cases like Starters."}),`
`,e.jsx(n.li,{children:"NPC advancement: This can be tricky but can be managed with weather to advance PIDFRNG Frame quickly."}),`
`]}),`
`,e.jsx(n.p,{children:"For IVs:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"128 Steps will increase your IVRNG Frame count by X, where X is the number of Pokémon in your team. If you have 6 Pokémon, doing 128 steps will increase IVRNG Frame to 7 (1 base + 6 for your team)."}),`
`,e.jsx(n.li,{children:"Storing a Pokémon in the PC increases IVRNG Frame by 7."}),`
`,e.jsx(n.li,{children:"Battling a Pokémon increases it as well, but results can be unpredictable."}),`
`]}),`
`,e.jsx(n.p,{children:"Once you have your target, find the date/time corresponding and use runasdate.exe (guide linked) or another method you prefer."}),`
`,e.jsx(n.p,{children:"The Seed should be good without changes. If it’s wrong, recheck your parameters (profile/runasdate)."}),`
`,e.jsx(n.p,{children:"Go quickly in-game and open the menu."}),`
`,e.jsx(n.p,{children:"Advance the frames as needed, remembering the -1 for PIDRNGFrame difference and use Sweet Scent/Honey."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Don't hesitate to use save states, especially in noisy areas.
`})}),`
`,e.jsx(n.p,{children:"Congratulations, you should have your shiny Pokémon!"}),`
`,e.jsx(n.p,{children:"The easy part is done. Here comes the harder and more tedious part."}),`
`,e.jsx(n.p,{children:"You got your shiny if you were in a quiet area. However, Gen 5 has a HUGE problem. During Sweet Scent/Honey animation, PIDRNGFrame WILL CONTINUE TO ADVANCE if the area is noisy. So, you may not get the shiny you want if you use Sweet Scent/Honey on your target frame."}),`
`,e.jsx(n.p,{children:"There's no miracle solution. You need to adjust and calibrate until you find your shiny."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`However, fishing doesn't advance PIDRNGFrame, so you can fish without any problems.
`})})]})}function a(r={}){const{wrapper:n}={...o(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{a as default,s as frontmatter};
