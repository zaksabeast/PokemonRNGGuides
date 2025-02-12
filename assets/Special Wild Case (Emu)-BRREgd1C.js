import{u as a,j as e}from"./index-NUjML0_o.js";const i={title:"Special Wild RNG",description:"Special Wild RNG",slug:"emulator-hgss-special-wild",subCategory:"Emulator",isRoughDraft:!0};function o(n){const t={li:"li",ol:"ol",p:"p",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"So this covers :"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Bug Catching Contest (BCC) with and without cute charm"}),`
`,e.jsx(t.li,{children:"Safari Zone with and without cute charm"}),`
`,e.jsx(t.li,{children:"Headbutt"}),`
`]}),`
`,e.jsx(t.p,{children:"You'll need :"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Desmume"}),`
`,e.jsx(t.li,{children:"Lua Scripts"}),`
`,e.jsx(t.li,{children:"RNG Reporter"}),`
`]}),`
`,e.jsx(t.p,{children:"Ofc you have to know how to do Wild RNG without any problem."}),`
`,e.jsx(t.p,{children:"Bug Catching Contest :"}),`
`,e.jsx(t.p,{children:`Encounter Slots are restricted to 10. So you'll have to search between 0 and 9 for Encounter Slots. You can follow Serebii's pokearth data, it matches without any problem.
Save in front of the guy the right day so you'll have to anticipate the fact you'll have to walk TO a grass patch.`}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"If you have cute charm, just open the 4gen Time Finder, select the Bug Catching Contest in Encounter Type and search for ANY frame."}),`
`,e.jsx(t.li,{children:"If you don't have cute charm, select your lead (any or sync) but the game does some frame skips if it doesn't match some conditions. A way to avoid that is just to go for a target frame with at least ONE IV = 31 on ANY stat. Nothing else."}),`
`]}),`
`,e.jsx(t.p,{children:"Safari Zone :"}),`
`,e.jsx(t.p,{children:`Encounter Slots are restricted to 10 AND are influenced by items / days. You can follow Serebii's Pokearth to know which conditions you need and what you can find.
BUT. Encounter Slots are not always the same. So you'll have to figure YOURSELF which encounter slot = which pokemon.
For that, after saving in front of the guy which allows you to enter, you just need to enter in the safari with any given initial seed, going to the main tab of RNG Reporter (Method K => Encounter Type : Safari Zone w/ the initial seed) and create your own encounter table by checking the slots. Once you have the slot of your target you can search for a Target frame`}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"If you have cute charm, it's the same as BCC, and you can go on ANY given frame."}),`
`,e.jsx(t.li,{children:"If you don't have cute charm, it's the same as BCC, the game does some frame skips if it doesn't match some conditions. A way to avoid that is just to go for a target frame with at least ONE IV = 31 on ANY stat. Nothing else."}),`
`]}),`
`,e.jsx(t.p,{children:"Headbutt :"}),`
`,e.jsx(t.p,{children:`Encounter slots are not really known at all. You can follow any site with encounters slots in order to ONLY have an idea of species present in the tree. Every tree seems to change of encounter slots every day. Same for special trees (like Combee or Slakoth in the north of Cerulean).
After saving in front of the tree, reload your stuff with any initial seed. Use the main windows of RNG reporter (MEthod K => Encounter Type : Headbutt tree w/ initial seed) and creating your own encounter table. Once you've checked that, you can search for a target frame.
From the tests i did, PUT A SYNCR AS LEAD. I'm getting 100% of encounters with that. Without lead i'm almost failing all my target frames`}),`
`,e.jsx(t.p,{children:"/!\\ However, you MAY need to substract -1 from your target frame in order to hit it. For example, if your target frame is 130, you'll have to up your PIDRNGFrame to 129 and use headbutt. I suggest you to do a save state to try the -1 AND the target frame. During my tests, in some case hitting the right frame was enoughn, in some case it wasn't."}),`
`,e.jsx(t.p,{children:"Update 3 : Seems to be seed random. Sometimes you'll have do to the -1 frame sometimes not."})]})}function s(n={}){const{wrapper:t}={...a(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{s as default,i as frontmatter};
