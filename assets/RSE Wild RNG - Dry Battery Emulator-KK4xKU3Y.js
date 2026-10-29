import{t as e}from"./jsx-runtime-CLxixnhA.js";import{S as t}from"./index-jzB9fByq.js";var n=e(),r={title:`红宝石/蓝宝石野生乱数`,navDrawerTitle:`野生乱数`,description:`学习在红宝石/蓝宝石中进行野生乱数，获得异色及高个体宝可梦。`,slug:`zh-emulator-rs-wild`,translation:{enSlug:`emulator-rs-wild`,language:`zh`}};function i(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`本指南介绍第三世代固定初始种子的野生乱数，适用于电池耗尽的红宝石/蓝宝石，以及绿宝石。`}),`
`,(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`支持 Lua 脚本的 mGBA`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：设置 PokeFinder`}),`
`,(0,n.jsx)(r.p,{children:`打开 PokeFinder，选择正确的配置档案，输入初始种子：`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`绿宝石为 `,(0,n.jsx)(r.code,{children:`0`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`电池耗尽的红宝石/蓝宝石为 `,(0,n.jsx)(r.code,{children:`5A0`}),`。`]}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`NOTE`,children:[`
`,(0,n.jsx)(r.p,{children:`在 VBA 选项中取消勾选实时时钟，即可模拟红宝石/蓝宝石电池耗尽的情况。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：寻找目标`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`确定想要的宝可梦，并前往对应地点。`}),`
`,(0,n.jsx)(r.li,{children:`保存游戏。`}),`
`,(0,n.jsxs)(r.li,{children:[`在 PokeFinder 的 `,(0,n.jsx)(r.code,{children:`Gen 3 => Wild`}),` 中选择地点并设置筛选条件。红宝石/蓝宝石使用 Method H-1，绿宝石使用 Method H-2；确定目标后，也可以尝试命中其他生成方式的结果。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第三步：校准`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`启动 VBA，并定期创建即时存档。`}),`
`,(0,n.jsxs)(r.li,{children:[`接近目标帧数时，按以下流程校准：`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`创建即时存档。`}),`
`,(0,n.jsx)(r.li,{children:`记下当前帧数。`}),`
`,(0,n.jsx)(r.li,{children:`使用甜甜香气遭遇宝可梦。`}),`
`,(0,n.jsx)(r.li,{children:`用 PokeFinder 搜索实际遭遇的结果。`}),`
`,(0,n.jsx)(r.li,{children:`计算延迟，填入“Delay”栏。`}),`
`,(0,n.jsx)(r.li,{children:`重新生成目标结果，获得调整后的目标帧数。`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第四步：捕捉目标宝可梦`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`推进到目标帧数，捕捉想要的宝可梦。`}),`
`,(0,n.jsx)(r.li,{children:`如果没有成功，请重新校准。`}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`NOTE`,children:[`
`,(0,n.jsx)(r.p,{children:`本指南约九成内容可参考作者的火红/叶绿指南，操作方式基于采用 Real 脚本更新之前的版本。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};