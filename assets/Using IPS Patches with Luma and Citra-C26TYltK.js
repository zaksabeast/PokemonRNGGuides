import{q as l,j as e}from"./index-D7t2JwvR.js";const c={title:"How to Use IPS Patches on a 3DS or Emulator (Luma3DS, Azahar, Citra)",navDrawerTitle:"IPS Patches",description:"Learn how to apply IPS patches like instant text and no outlines using Luma3DS, Azahar, or Citra. Includes 3DS setup, emulator mods, and a merge tool.",slug:"misc-3ds-ips-luma-citra",category:"3DS Tools",tag:"cfw"};function i(s){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...l(),...s.components},{IpsMerger:t,YouTubeVideo:r}=n;return t||o("IpsMerger"),r||o("YouTubeVideo"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"What are IPS Patches?"}),`
`,e.jsx(n.p,{children:"IPS patches are small files that change how a game runs without modifying the full ROM. Common patches include instant text, no outlines, or minor fixes. You can use them on real 3DS hardware or in emulators."}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://3ds.hacks.guide/",children:"A 3DS with CFW"})," OR ",e.jsx(n.a,{href:"https://github.com/azahar-emu/azahar/releases/latest",children:"Azahar"})]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"code.ips"})," file that you want to use"]}),`
`]}),`
`,e.jsx(n.h2,{children:"3DS Instructions"}),`
`,e.jsx(n.h3,{children:"Update Luma Settings"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Boot the console while holding ",e.jsx(n.code,{children:"Select"}),"."]}),`
`,e.jsx(n.li,{children:'Select "Enable game patches".'}),`
`]}),`
`,e.jsx(n.h3,{children:"Install the Patch"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Find your game's title ID ",e.jsx(n.a,{href:"http://www.3dsdb.com/",children:"using 3dsdb"}),"."]}),`
`,e.jsxs(n.li,{children:["Place your ",e.jsx(n.code,{children:"code.ips"})," patch in ",e.jsx(n.code,{children:"/luma/titles/_title ID_/code.ips"}),"."]}),`
`]}),`
`,e.jsxs(n.p,{children:["For example, Ultra Moon would be at ",e.jsx(n.code,{children:"/luma/title/00040000001B5100/code.ips"}),"."]}),`
`,e.jsx(n.h2,{children:"Azahar Instructions"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Right click your game in Azahar."}),`
`,e.jsx(n.li,{children:'Select "Open Mods Location" to open the mods folder.'}),`
`,e.jsxs(n.li,{children:["Copy your ",e.jsx(n.code,{children:"code.ips"})," into the mods folder."]}),`
`]}),`
`,e.jsx(n.h3,{children:"Azahar patch video guide"}),`
`,e.jsx(r,{src:"https://www.youtube.com/embed/klBkGQDaQR8?si=CbGCOKODlGu27Du4&start=241"}),`
`,e.jsx(n.h2,{children:"Merging patches"}),`
`,e.jsx(t,{}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Click the ",e.jsx(n.code,{children:"Upload"})," button above."]}),`
`,e.jsx(n.li,{children:"Select your IPS patches."}),`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"Download"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Suggested Patches"}),`
`,e.jsxs(n.p,{children:["Use Dream Radar without needing a cartridge! ",e.jsx(n.a,{href:"/dream-radar-patches",children:"Dream Radar No-Cart Patch"})]}),`
`,e.jsxs(n.p,{children:["Use Transporter Offline! ",e.jsx(n.a,{href:"/transporter-patches",children:"Offline Transporter Patch"})]})]})}function h(s={}){const{wrapper:n}={...l(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}function o(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,c as frontmatter};
