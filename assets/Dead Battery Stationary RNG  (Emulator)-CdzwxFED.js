import{t as e}from"./jsx-runtime-Bl9_0yti.js";import{S as t}from"./index-9x-tX0ur.js";var n=e(),r={title:`红宝石/蓝宝石电池耗尽定点乱数`,navDrawerTitle:`电池耗尽定点乱数`,description:`学习在红宝石/蓝宝石中进行定点乱数，获得理想个体值、性格及异色宝可梦。`,slug:`zh-emulator-rs-dead-battery-stationary`,translation:{enSlug:`emulator-rs-dead-battery-stationary`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`大部分内容可以参考作者的火红/叶绿指南。本指南基于采用 Real 脚本更新之前的操作方式。`}),`
`,(0,n.jsx)(r.p,{children:`本指南介绍第三世代固定初始种子的情况，具体适用于电池耗尽的红宝石/蓝宝石，以及绿宝石。`}),`
`,(0,n.jsx)(r.p,{children:`由 Subject 基于 Rick 的指南修改，内容尚未完成。`}),`
`,(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`支持 Lua 脚本的 mGBA`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`]}),`
`,(0,n.jsx)(r.hr,{}),`
`,(0,n.jsx)(r.h2,{children:`设置`}),`
`,(0,n.jsx)(r.h3,{children:`设置 VBA-RR`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`正确设置存档类型。`}),`
`,(0,n.jsxs)(r.li,{children:[`打开 `,(0,n.jsx)(r.code,{children:`Options > Emulation > Save Type > Automatic & Flash 128K`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`关闭实时时钟，以使用电池耗尽时的种子。`}),`
`,(0,n.jsxs)(r.li,{children:[`对应选项位于 `,(0,n.jsx)(r.code,{children:`Options > Emulation > Real Time Clock`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`如果出现存档损坏、电池耗尽提示等加载问题，请重启 VBA。`}),`
`,(0,n.jsx)(r.li,{children:`加载 Lua 脚本。`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`设置 PokeFinder`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`启动 PokeFinder，选择第三世代的定点乱数。`}),`
`,(0,n.jsx)(r.li,{children:`选择配置档案，或输入 TID/SID。`}),`
`,(0,n.jsxs)(r.li,{children:[`输入对应的初始种子。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`绿宝石为 `,(0,n.jsx)(r.code,{children:`0`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`红宝石/蓝宝石为 `,(0,n.jsx)(r.code,{children:`5A0`}),`。`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`第三世代非野生宝可梦使用 Method 1。`}),`
`,(0,n.jsx)(r.li,{children:`搜索想要的结果，确定目标帧数。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`（原稿此处待补充 PokeFinder 示例截图。）`}),`
`,(0,n.jsx)(r.hr,{}),`
`,(0,n.jsx)(r.h2,{children:`命中目标帧数`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`寻找延迟`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`推进到遭遇目标宝可梦前的最终等待界面。`}),`
`,(0,n.jsx)(r.li,{children:`在遭遇前约 100 帧创建即时存档。`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`（原稿此处待补充等待界面截图。）`}),`
`,(0,n.jsxs)(r.ol,{start:`2`,children:[`
`,(0,n.jsxs)(r.li,{children:[`到达目标帧数时按下 `,(0,n.jsx)(r.code,{children:`A`}),`，触发遭遇。`]}),`
`,(0,n.jsxs)(r.li,{children:[`暂停时可以按句号键 `,(0,n.jsx)(r.code,{children:`.`}),` 逐帧推进。`]}),`
`,(0,n.jsx)(r.li,{children:`记下实际遭遇宝可梦的个体值，此时通常与目标不同。`}),`
`,(0,n.jsx)(r.li,{children:`新开一个 PokeFinder 窗口，输入实际遭遇宝可梦的个体值。`}),`
`,(0,n.jsx)(r.li,{children:`根据实际命中帧数与目标帧数的差值计算延迟。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.code,{children:`延迟 = 实际命中帧数 - 目标帧数`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.code,{children:`调整后的目标帧数 = 原目标帧数 - 延迟`})}),`
`,(0,n.jsxs)(r.ol,{start:`2`,children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`遭遇宝可梦`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`读取遭遇前的即时存档。`}),`
`,(0,n.jsx)(r.li,{children:`推进到调整后的目标帧数。`}),`
`,(0,n.jsx)(r.li,{children:`如果仍未获得目标宝可梦，请重新计算延迟。`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`（原稿此处待补充目标宝可梦截图。）`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};