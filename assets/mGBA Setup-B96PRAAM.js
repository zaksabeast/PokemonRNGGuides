import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CNlyG6-4.js";var n=e(),r=[{title:`设置 mGBA`,description:`学习如何设置适用于 GBA 宝可梦乱数操作的 mGBA，包括 Lua 脚本支持功能。`,slug:`zh-mgba-setup`,translation:{enSlug:`mgba-setup`,language:`zh`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`对应版本的`,(0,n.jsx)(r.a,{href:`https://mgba.io/downloads.html#desktop-os-1`,children:`mGBA (development build)`})]}),`
`,(0,n.jsxs)(r.li,{children:[`mGBA 专用的`,(0,n.jsx)(r.a,{href:`https://github.com/Real96/PokeLua/tree/main/Gen%203/mGBA`,children:`Lua 脚本`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`设置 Lua 脚本`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开模拟选择 工具 -> 脚本...`}),`
`,(0,n.jsx)(r.li,{children:`选择 文件 -> 载入脚本... 并选择对应游戏版本的lua脚本。`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`每次需要即时存档或即时读档时，在游戏未暂停时可以按下 `,(0,n.jsx)(r.code,{children:`Shift + F(n)`}),` 或 `,(0,n.jsx)(r.code,{children:`F(n)`}),` 。
此操作会快速载入即时存档，以确保脚本能正确读取游戏进度。`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`比如, 按 `,(0,n.jsx)(r.code,{children:`Shift + F1`}),` 可以快速存档到即时存档(1)或按 `,(0,n.jsx)(r.code,{children:`F1`}),` 快速读档到即时存档(1)。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`疑难解答`}),`
`,(0,n.jsxs)(r.h3,{children:[`Error: `,(0,n.jsx)(r.code,{children:`attempt to call a nil value (method 'setWatchpoint')`})]}),`
`,(0,n.jsx)(r.p,{children:`请确保你的mGBA是上方链接下载的开发版。其他版本才会出现此错误。`}),`
`,(0,n.jsxs)(r.h3,{children:[`Error: `,(0,n.jsx)(r.code,{children:`attempt to index a nil value (global 'emu')`})]}),`
`,(0,n.jsx)(r.p,{children:`在运行 Lua 脚本前，请确保已加载游戏 ROM。`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};