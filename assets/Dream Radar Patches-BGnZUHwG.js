import{t as e}from"./jsx-runtime-Bl9_0yti.js";import{S as t}from"./index-9x-tX0ur.js";var n=e(),r={title:`梦境雷达免卡带补丁`,description:`让梦境雷达读取 TWiLightMenu、nds-bootstrap 或模拟器存档，无需插入游戏卡带。`,slug:`zh-dream-radar-patches`,translation:{enSlug:`dream-radar-patches`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`卡带重定向补丁`}),`
`,(0,n.jsxs)(r.p,{children:[`此补丁会改为从 SD 卡读取 `,(0,n.jsx)(r.code,{children:`.sav`}),` 文件，让梦境雷达认为已插入卡带。`]}),`
`,(0,n.jsxs)(r.p,{children:[`你可以使用 `,(0,n.jsx)(r.a,{href:`https://github.com/DS-Homebrew/TWiLightMenu`,children:`TWiLightMenu`}),` 或 `,(0,n.jsx)(r.a,{href:`https://github.com/ahezard/nds-bootstrap`,children:`nds-bootstrap`}),` 的存档，也可以直接使用模拟器存档，无需注入卡带。`]}),`
`,(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`已安装自制固件（CFW）的 3DS`}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://3ds.hacks.guide/`,children:`自制固件安装指南`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`更新 Luma 设置`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`按住 `,(0,n.jsx)(r.code,{children:`Select`}),` 开机。`]}),`
`,(0,n.jsx)(r.li,{children:`勾选“Enable game patches”。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`安装补丁`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`下载并解压 `,(0,n.jsx)(r.a,{href:`https://github.com/zaksabeast/DreamRadarCartRedirect/releases`,children:`zip 文件`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`将所需的 IPS 补丁复制到 SD 卡对应目录。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`日版：`,(0,n.jsx)(r.code,{children:`/luma/titles/0004000000073200`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`其他地区版本：`,(0,n.jsx)(r.code,{children:`/luma/titles/00040000000AE100`}),`。`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`将文件重命名为 `,(0,n.jsx)(r.code,{children:`code.ips`}),`。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`例如，梦境雷达的补丁路径应为 `,(0,n.jsx)(r.code,{children:`/luma/titles/00040000000AE100/code.ips`}),`。`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`准备存档`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`确保存档位于 `,(0,n.jsx)(r.code,{children:`/roms/nds/saves/white2.sav`}),`、`,(0,n.jsx)(r.code,{children:`/roms/nds/saves/black2.sav`}),`、`,(0,n.jsx)(r.code,{children:`/roms/nds/saves/black.sav`}),` 或 `,(0,n.jsx)(r.code,{children:`/roms/nds/saves/white.sav`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`如果使用 TWiLightMenu，还需要在 `,(0,n.jsx)(r.code,{children:`/roms/nds/white2.nds`}),`、`,(0,n.jsx)(r.code,{children:`/roms/nds/black2.nds`}),`、`,(0,n.jsx)(r.code,{children:`/roms/nds/black.nds`}),` 或 `,(0,n.jsx)(r.code,{children:`/roms/nds/white.nds`}),` 放置对应游戏文件。`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`设置正确后，梦境雷达会像插入卡带一样识别存档，并允许传送。`}),`
`,(0,n.jsx)(r.h2,{children:`疑难解答`}),`
`,(0,n.jsx)(r.h3,{children:`Error: Cart not inserted`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`确保存档文件名及存放位置正确。`}),`
`,(0,n.jsx)(r.li,{children:`确认已在 Luma 中启用游戏补丁。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};