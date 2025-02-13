import{u as l,j as e}from"./index-CpyEa1Z6.js";const o={title:"Using IPS Patches with Luma and Citra",description:"Use game patches for instant text, no outlines, and extra fun",slug:"misc-3ds-ips-luma-citra",subCategory:"3DS"};function i(s){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...l(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Using IPS files with Luma"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You will need Luma3DS installed on your 3DS for this.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Instructions for installing Luma3DS: ",e.jsx(n.a,{href:"https://3ds.hacks.guide/",children:"https://3ds.hacks.guide/"})]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Find your game's title ID ",e.jsx(n.a,{href:"http://www.3dsdb.com/",children:"using 3dsdb"})]}),`
`,e.jsxs(n.li,{children:["Put your code.ips patch at ",e.jsx(n.code,{children:"/luma/titles/_title ID_/code.ips"})]}),`
`]}),`
`,e.jsxs(n.p,{children:["For example, Ultra Moon would be ",e.jsx(n.code,{children:"/luma/title/00040000001B5100/code.ips"})]}),`
`,e.jsx(n.h2,{children:"Using IPS files with Citra"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Right click your game in Citra"}),`
`,e.jsx(n.li,{children:'Select "Open Mods Location" to open the mods folder'}),`
`,e.jsxs(n.li,{children:["Copy your ",e.jsx(n.code,{children:"code.ips"})," into the mods folder"]}),`
`]}),`
`,e.jsx(n.h2,{children:"Merging patches with IPSPatcher.js"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Some IPS patches use a feature called 'RLE' where one byte is repeated multiple times.  This method does not support RLE.
`})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Download any IPS files you want to apply"}),`
`,e.jsxs(n.li,{children:["Go to ",e.jsx(n.a,{href:"https://zaksabeast.github.io/ipspatcher.js/build/",children:"the IPSPatcher.js site"})]}),`
`,e.jsx(n.li,{children:'Click the "Merge" button'}),`
`,e.jsx(n.li,{children:"Select every IPS patch you want to apply"}),`
`,e.jsxs(n.li,{children:['Click "Open" or "Upload" (depending on your browser)',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A file called ",e.jsx(n.code,{children:"merged.ips"})," will be downloaded"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Rename the downloaded ",e.jsx(n.code,{children:"merged.ips"})," to ",e.jsx(n.code,{children:"code.ips"})]}),`
`]})]})}function d(s={}){const{wrapper:n}={...l(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{d as default,o as frontmatter};
