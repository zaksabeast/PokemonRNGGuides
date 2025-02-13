import{u as a,j as e}from"./index-DlzSnQqK.js";const i={title:"White Forest RNG",description:"White Forest RNG",slug:"emulator-bw-white-forest",subCategory:"Emulator",isRoughDraft:!1};function o(n){const t={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.pre,{children:e.jsx(t.code,{children:`Note : As always, the guide will assume you have the basic knowledge necessary. Being able to set up a profile, do a Wild RNG, and even being a little used to noise advancing the Seeding.
`})}),`
`,e.jsx(t.h2,{children:"Requirements"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Desmume (9.11 is the best option)"}),`
`,e.jsx(t.li,{children:"Lua Script (Only available on the Discord at the moment)"}),`
`,e.jsx(t.li,{children:"Pokemon White"}),`
`,e.jsx(t.li,{children:"RNG Reporter"}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`Note : You can edit Trainers / Pokémon available in the White Forest using the PokeCGear Tool (http://projectpokemon.org/forums/attachment.php?attachmentid=10632&d=1362758021) but it'll not be covered in this guide.
`})}),`
`,e.jsx(t.h2,{children:"Setup"}),`
`,e.jsx(t.p,{children:"As you may know, the White Forest is known to have a large pool (and almost every time exclusive) of Pokemon, making this place something interesting to RNG. However, the game decided to not be fun, and you can do Sweet Scent at all."}),`
`,e.jsxs(t.p,{children:["But in order to help us to achieve what we want, the game left us a really nice option : ",e.jsx(t.strong,{children:"When you enter in the White Forest, from the outside, the first step in the grass or water will lead to an encounter. 100% of the time"})]}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"Open Desmume and load the Luas. Find a Target Spread on PokeFinder. I'd suggest to find for targets around 150-200 PID Frames."}),`
`,e.jsx(t.li,{children:"Go outside the White Forest. I'd suggest to save Route 14-side, right next to the gates. I'm not 100% sure, but the grass patch seems to be closer there. However you can do that the same way at the Route 15."}),`
`,e.jsx(t.li,{children:"Walk until your IVFrame Count goes up. That way, when you'll reset to do your RNG, you'll be able to have all the necessary steps to go to the grass patch without being worry about a random IVFrame advance."}),`
`,e.jsx(t.li,{children:"Save and do the Initial Seed RNG. Don't load the C-Gear."}),`
`,e.jsx(t.li,{children:"Once you're in game, enter as fast and go next to the patch that will trigger an encounter. Open the menu"}),`
`,e.jsx(t.li,{children:"Make a save state here. Let the game run a little, and notice when you have a long advance (a enough long moment where the PIDFrame doesn't advance at all to do a step). Once you've found one, reload the state, advance to it again and go in the party as soon as you hit it. Advance with Chatots to your target frame. Close all the menus and do the step."}),`
`]})]})}function r(n={}){const{wrapper:t}={...a(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{r as default,i as frontmatter};
