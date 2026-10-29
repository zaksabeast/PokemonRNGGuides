import{t as e}from"./jsx-runtime-CLxixnhA.js";import{S as t}from"./index-jzB9fByq.js";var n=e(),r={title:`设置 3DS 模拟器（Azahar/Lime3DS/Citra）`,navDrawerTitle:`设置 Azahar`,description:`设置 3DS 模拟器用于乱数，包括导出游戏及安装更新。`,slug:`zh-citrarng-setup`,translation:{enSlug:`citrarng-setup`,language:`zh`}};function i(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`本教程介绍如何设置 3DS 模拟器，在电脑上进行乱数操作。你需要一台自制固件已更新的 3DS，用于导出游戏数据。`}),`
`,(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/azahar-emu/azahar/releases/latest`,children:`Azahar`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/d0k3/GodMode9/releases`,children:`最新版 GodMode9`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://3ds.hacks.guide/`,children:`已安装自制固件（CFW）的 3DS`})}),`
`,(0,n.jsx)(r.li,{children:`3DS 上已安装的最新版游戏更新`}),`
`,(0,n.jsxs)(r.li,{children:[`可选：`,(0,n.jsx)(r.a,{href:`/downloads/Dump_PKMN_Updates.gm9`,children:`Dump_PKMN_Update.gm9 脚本`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`导出游戏数据`}),`
`,(0,n.jsx)(r.p,{children:`选择以下任意一种方式导出游戏及更新。`}),`
`,(0,n.jsx)(r.h3,{children:`自动导出游戏及更新`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`将 `,(0,n.jsx)(r.code,{children:`Dump_PKMN_Update.gm9`}),` 脚本放入 3DS SD 卡的 `,(0,n.jsx)(r.code,{children:`sdmc:\\gm9\\scripts`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`按住 `,(0,n.jsx)(r.code,{children:`Start`}),` 开机，启动 GodMode9。`]}),`
`,(0,n.jsxs)(r.li,{children:[`按下主机的 `,(0,n.jsx)(r.code,{children:`Home`}),` 键打开菜单。`]}),`
`,(0,n.jsx)(r.li,{children:`选择“Scripts...”。`}),`
`,(0,n.jsx)(r.li,{children:`选择“Dump_PKMN_Updates”脚本，并按屏幕提示操作。`}),`
`,(0,n.jsxs)(r.li,{children:[`将 `,(0,n.jsx)(r.code,{children:`/gm9/out`}),` 中的文件复制到电脑。`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`手动导出实体卡带`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`选择 `,(0,n.jsx)(r.code,{children:`[C:] GAMECART`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`选择 `,(0,n.jsx)(r.code,{children:`trim.3ds`}),` 文件。`]}),`
`,(0,n.jsx)(r.li,{children:`选择“NCSD image options...”。`}),`
`,(0,n.jsx)(r.li,{children:`选择“Build CIA from file”。`}),`
`,(0,n.jsxs)(r.li,{children:[`退出 GodMode9，将 `,(0,n.jsx)(r.code,{children:`sdmc:\\gm9\\out`}),` 中的文件传到电脑。`]}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`NOTE`,children:[`
`,(0,n.jsx)(r.p,{children:`游戏更新只以数字形式安装。`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`手动导出数字版游戏及更新`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`将光标移到 `,(0,n.jsx)(r.code,{children:`[A:] SYSNAND SD`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`按住 `,(0,n.jsx)(r.code,{children:`R`}),`，再按下 `,(0,n.jsx)(r.code,{children:`A`}),` 打开驱动器选项。`]}),`
`,(0,n.jsx)(r.li,{children:`选择“Open title manager...”。`}),`
`,(0,n.jsxs)(r.li,{children:[`在要导出的游戏或更新上按下 `,(0,n.jsx)(r.code,{children:`A`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`选择“Manage Title...”。`}),`
`,(0,n.jsx)(r.li,{children:`选择“Build CIA (standard)”。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`在模拟器中安装游戏`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`运行模拟器。`}),`
`,(0,n.jsx)(r.li,{children:`选择“File”，再选择“Install cia...”。`}),`
`,(0,n.jsxs)(r.li,{children:[`分别安装游戏本体和更新的 `,(0,n.jsx)(r.code,{children:`.cia`}),` 文件。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`设置乱数工具`}),`
`,(0,n.jsxs)(r.p,{children:[`参考 `,(0,n.jsx)(r.a,{href:`/install-pokereader-emu`,children:`PokeReader 安装指南`}),`。`]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};