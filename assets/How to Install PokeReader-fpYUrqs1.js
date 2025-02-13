import{u as t,j as e}from"./index-DLt_I1kn.js";const o={title:"How to Install PokeReader",description:"Installing a tool on your 3DS or Citra to help RNG Pokémon",slug:"install-pokereader",subCategory:"3DS"};function l(s){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"PokeReader is a 3gx plugin that replaces PokeCalc. It has more features for RNG purposes."}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A 3DS with CFW (Custom Firmware). Instructions for installing CFW can be found at ",e.jsx(n.a,{href:"https://3ds.hacks.guide/",children:"3ds.hacks.guide"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/LumaTeam/Luma3DS/releases",children:"Luma version 13.0.0 or higher"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Install PokeReader on 3DS"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Download the ",e.jsx(n.a,{href:"https://github.com/zaksabeast/PokeReader/releases/latest",children:"latest release of PokeReader"}),"."]}),`
`,e.jsxs(n.li,{children:["Copy ",e.jsx(n.code,{children:"pokereader.3gx"})," to ",e.jsx(n.code,{children:"/luma/plugins/default.3gx"})," on your SD card, or to ",e.jsx(n.code,{children:"/luma/plugins/<title_id>/plugin.3gx"})," for each Pokémon game. Create the directory if it does not exist."]}),`
`,e.jsx(n.li,{children:'Open Rosalina and enable the "Plugin Loader".'}),`
`]}),`
`,e.jsxs(n.p,{children:["If you are migrating from the Plug n' Play version of PokeReader, follow the ",e.jsx(n.a,{href:"https://github.com/zaksabeast/3ds-Plug-n-play#uninstalling",children:"Plug n' Play uninstallation guide"}),"."]}),`
`,e.jsx(n.h2,{children:"Install PokeReader on Citra"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Download the ",e.jsx(n.a,{href:"https://github.com/zaksabeast/PokeReader/releases/latest",children:"latest release of PokeReader"}),"."]}),`
`,e.jsxs(n.li,{children:['Follow the "Using 3gx Plugins" section in ',e.jsx(n.a,{href:"https://citra-emu.org/help/feature/game-modding/",children:"Citra's game modding guide"}),"."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`This guide should make installation clear and straightforward.
`})})]})}function r(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(l,{...s})}):l(s)}export{r as default,o as frontmatter};
