import{u as r,j as e}from"./index-CPDhDZJw.js";const i={title:"Special Wild RNG",description:"Special Wild RNG",slug:"emulator-hgss-special-wild",category:"HeartGold and SoulSilver",isRoughDraft:!0,tag:"emu"};function o(n){const t={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"This covers:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Bug Catching Contest (BCC) with and without cute charm."}),`
`,e.jsx(t.li,{children:"Safari Zone with and without cute charm."}),`
`,e.jsx(t.li,{children:"Headbutt."}),`
`]}),`
`,e.jsx(t.p,{children:"You'll need:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Desmume."}),`
`,e.jsx(t.li,{children:"Lua scripts."}),`
`,e.jsx(t.li,{children:"RNG Reporter."}),`
`]}),`
`,e.jsx(t.p,{children:"You should already know how to do Wild RNG."}),`
`,e.jsx(t.h2,{children:"Bug Catching Contest"}),`
`,e.jsx(t.p,{children:"Encounter slots are limited to 10. Search between 0 and 9 for Encounter Slots. Refer to Serebii's Pokearth data for accurate information. Save in front of the guy on the right day, as you need to walk to a grass patch."}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"If you have cute charm, open the 4gen Time Finder, select Bug Catching Contest in Encounter Type, and search for ANY frame."}),`
`,e.jsx(t.li,{children:"If you don't have cute charm, select your lead (any or sync). The game may skip frames if it doesn't meet certain conditions. Avoid this by choosing a target frame with at least ONE IV = 31 on ANY stat. Nothing else."}),`
`]}),`
`,e.jsx(t.h2,{children:"Safari Zone"}),`
`,e.jsx(t.p,{children:"Encounter slots are limited to 10 and influenced by items/days. Use Serebii's Pokearth to know the conditions and available Pokémon. Encounter slots vary, so you must determine which slot corresponds to which Pokémon. After saving in front of the entry guy, enter the safari with any initial seed, go to the main tab of RNG Reporter (Method K => Encounter Type: Safari Zone with the initial seed), and create your own encounter table by checking the slots. Once you find your target's slot, search for a target frame."}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"If you have cute charm, it's the same as BCC, and you can go for ANY given frame."}),`
`,e.jsx(t.li,{children:"If you don't have cute charm, it's the same as BCC. The game may skip frames under certain conditions. Avoid this by choosing a target frame with at least ONE IV = 31 on ANY stat. Nothing else."}),`
`]}),`
`,e.jsx(t.h2,{children:"Headbutt"}),`
`,e.jsx(t.p,{children:"Encounter slots are not well-known. Refer to any site with encounter slots to get an idea of the species in the trees. Every tree seems to change encounter slots daily, including special trees (like Combee or Slakoth in the north of Cerulean). After saving in front of the tree, reload with any initial seed. Use the main window of RNG Reporter (Method K => Encounter Type: Headbutt tree with initial seed) to create your own encounter table. Once verified, you can search for a target frame."}),`
`,e.jsx(t.p,{children:"Put a sync as the lead for better results."}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`You might need to subtract -1 from your target frame to hit it. For example, if your target frame is 130, adjust your PIDRNGFrame to 129 and use headbutt. It's a good idea to create a save state to test both -1 and the target frame. In some cases, hitting the right frame works, and sometimes it doesn't.
`})}),`
`,e.jsx(t.p,{children:"Update 3: The seed seems random. Sometimes you'll have to do the -1 frame, and sometimes you won't."})]})}function s(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{s as default,i as frontmatter};
