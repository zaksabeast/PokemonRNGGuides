import{t as e}from"./jsx-runtime-Bl9_0yti.js";import{S as t}from"./index-9x-tX0ur.js";var n=e(),r={title:`设置 Ryujinx 与 Cheat Engine`,navDrawerTitle:`设置 Ryujinx`,description:`设置 Ryujinx 或 Yuzu 及 Cheat Engine，通过 Lua 脚本辅助晶灿钻石/明亮珍珠乱数。`,slug:`zh-bdsp-emulator-setup`,translation:{enSlug:`bdsp-emulator-setup`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://ryujinx.app/download`,children:`Ryujinx`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://www.cheatengine.org/downloads.php`,children:`Cheat Engine`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Real96/BDSP-CheatEngine-Lua`,children:`BDSP_RNG.lua`})}),`
`,(0,n.jsx)(r.li,{children:`已更新到 1.1.1 或以上版本的游戏`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`操作流程`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 Ryujinx，运行游戏，在标题画面暂停。`}),`
`,(0,n.jsxs)(r.li,{children:[`打开 Cheat Engine，进入 `,(0,n.jsx)(r.code,{children:`Edit > Settings`}),`，选择“Scan Settings”，勾选 `,(0,n.jsx)(r.code,{children:`MEM_MAPPED`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`点击 `,(0,n.jsx)(r.code,{children:`File > Open Process`}),`，选择 Yuzu 或 Ryujinx 进程。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Yuzu 的格式类似 `,(0,n.jsx)(r.code,{children:`xxxx-yuzu xxx | game name`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`Ryujinx 的格式类似 `,(0,n.jsx)(r.code,{children:`xxxx-Ryujinx x.x.xxxx - game name`}),`。`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`点击 `,(0,n.jsx)(r.code,{children:`Table > Show Cheat Table Lua Script`}),`，打开“Lua Script: Cheat Table”窗口。`]}),`
`,(0,n.jsxs)(r.li,{children:[`打开对应游戏版本的 `,(0,n.jsx)(r.code,{children:`BDSP_RNG.lua`}),`，复制全部内容，粘贴到刚才的窗口。`]}),`
`,(0,n.jsx)(r.li,{children:`点击“Execute Script”。程序可能暂时卡住，等待新的窗口输出乱数信息即可。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`注意事项`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`按脚本输出中显示的按键，可以切换信息页面。`}),`
`,(0,n.jsxs)(r.li,{children:[`停止脚本需要按下 `,(0,n.jsx)(r.code,{children:`0`}),` 或 `,(0,n.jsx)(r.code,{children:`NumPad 0`}),`，否则脚本会继续运行。`]}),`
`,(0,n.jsx)(r.li,{children:`如果要重启游戏，需要按上述步骤重新操作，并重启游戏与脚本，否则脚本无法正常工作。`}),`
`,(0,n.jsx)(r.li,{children:`将“Lua Engine”窗口拉大，避免文字闪烁。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`接下来做什么？`}),`
`,(0,n.jsxs)(r.p,{children:[`可以尝试异色御三家或传说宝可梦：`,(0,n.jsx)(r.a,{href:`/cfw-bdsp-stationary`,children:`晶灿钻石/明亮珍珠定点乱数指南`}),`。`]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};