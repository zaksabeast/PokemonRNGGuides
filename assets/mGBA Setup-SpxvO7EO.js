import{w as i,j as n}from"./index-m1a04MGk.js";const h=[{title:"设置 mGBA",description:"学习如何设置适用于 GBA 宝可梦乱数操作的 mGBA，包括 Lua 脚本支持功能。",slug:"zh-mgba-setup",translation:{enSlug:"mgba-setup",language:"zh"}}];function s(l){const e={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...i(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["对应版本的",n.jsx(e.a,{href:"https://mgba.io/downloads.html#desktop-os-1",children:"mGBA (development build)"})]}),`
`,n.jsxs(e.li,{children:["mGBA 专用的",n.jsx(e.a,{href:"https://github.com/Real96/PokeLua/tree/main/Gen%203/mGBA",children:"Lua 脚本"})]}),`
`]}),`
`,n.jsx(e.h2,{children:"设置 Lua 脚本"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开模拟选择 工具 -> 脚本..."}),`
`,n.jsx(e.li,{children:"选择 文件 -> 载入脚本... 并选择对应游戏版本的lua脚本。"}),`
`]}),`
`,n.jsxs(e.p,{children:["每次需要即时存档或即时读档时，在游戏未暂停时可以按下 ",n.jsx(e.code,{children:"Shift + F(n)"})," 或 ",n.jsx(e.code,{children:"F(n)"}),` 。
此操作会快速载入即时存档，以确保脚本能正确读取游戏进度。`]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["比如, 按 ",n.jsx(e.code,{children:"Shift + F1"})," 可以快速存档到即时存档(1)或按 ",n.jsx(e.code,{children:"F1"})," 快速读档到即时存档(1)。"]}),`
`]}),`
`,n.jsx(e.h2,{children:"疑难解答"}),`
`,n.jsxs(e.h3,{children:["Error: ",n.jsx(e.code,{children:"attempt to call a nil value (method 'setWatchpoint')"})]}),`
`,n.jsx(e.p,{children:"请确保你的mGBA是上方链接下载的开发版。其他版本才会出现此错误。"}),`
`,n.jsxs(e.h3,{children:["Error: ",n.jsx(e.code,{children:"attempt to index a nil value (global 'emu')"})]}),`
`,n.jsx(e.p,{children:"在运行 Lua 脚本前，请确保已加载游戏 ROM。"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：白希洛/Hakuhiro"}),`
`]})]})}function r(l={}){const{wrapper:e}={...i(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(s,{...l})}):s(l)}export{r as default,h as frontmatter};
