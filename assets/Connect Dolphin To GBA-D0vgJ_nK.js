import{ii as s,j as n}from"./index-LvUs4p4f.js";const o={title:"使 Dolphin 与 mGBA 联动",description:"学习如何领取基拉祈，或将你的乱数宝可梦传输至 GBA 游戏。",slug:"zh-connect-dolphin-to-gba",translation:{enSlug:"connect-dolphin-to-gba",language:"zh"}};function e(i){const l={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...s(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(l.h2,{children:"所需工具"}),`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:n.jsx(l.a,{href:"https://dolphin-emu.org/download/",children:"Dolphin"})}),`
`,n.jsx(l.li,{children:n.jsx(l.a,{href:"https://github.com/ez-me/gba-bios/releases/tag/1.0",children:"开源的 GBA Bios"})}),`
`,n.jsx(l.li,{children:"Gamecube 和 GBA 游戏 ROM"}),`
`]}),`
`,n.jsx(l.h2,{children:"步骤 1: 设置 Dolphin"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:'打开 Dolphin 并点击 "设置" 按钮。'}),`
`,n.jsx(l.li,{children:'点击 "GameCube" 标签页。'}),`
`,n.jsx(l.li,{children:"将 GBA Bios 设置为你刚才下载的那个。"}),`
`,n.jsx(l.li,{children:'关闭设置窗口并点击 "控制器" 按钮。'}),`
`,n.jsx(l.li,{children:'将端口 2 设置为 "GBA (集成)" 然后关闭设置。'}),`
`]}),`
`,n.jsx(l.h2,{children:"步骤 2: 启动你的游戏"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:"在 Dolphin 中启动你的 NGC 游戏。"}),`
`,n.jsx(l.li,{children:'右键单击弹出的 mGBA 窗口，选择 "载入 ROM"。'}),`
`,n.jsx(l.li,{children:"在弹出的窗口中选择你的 GBA ROM。"}),`
`,n.jsx(l.li,{children:'右键单击 mGBA 窗口，选择 "游戏存档" -> "导入游戏存档"。'}),`
`,n.jsx(l.li,{children:'如果 Dolphin 未识别到 GBA 已连接，右键单击 mGBA 窗口并选择 "重置游戏"。'}),`
`]}),`
`,n.jsx(l.p,{children:"OK！现在你可以通过 Dolphin 和 mGBA，在 GBA 游戏与 NGC 游戏之间传输宝可梦。"}),`
`,n.jsx(l.h2,{children:"特别鸣谢"}),`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:"中文翻译：白希洛/Hakuhiro"}),`
`]})]})}function r(i={}){const{wrapper:l}={...s(),...i.components};return l?n.jsx(l,{...i,children:n.jsx(e,{...i})}):e(i)}export{r as default,o as frontmatter};
