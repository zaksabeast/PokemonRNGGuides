import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CRE-SdEk.js";var n=e(),r={title:`定点乱数`,description:`如何在钻石珍珠和白金中对固定遇敌的宝可梦进行乱数`,slug:`zh-emulator-dppt-stationary`,translation:{enSlug:`emulator-dppt-stationary`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`包含lua脚本功能的Desmume模拟器`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`准备工作`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 PokeFinder -> 第四世代 -> 定点 -> 检索器，在设置中选择你想要的宝可梦。`}),`
`,(0,n.jsx)(r.li,{children:`设置或选择正确的个人资料，并根据需要调整筛选条件。`}),`
`,(0,n.jsx)(r.li,{children:`搜索目标种子以及目标帧。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`初始种子乱数`}),`
`,(0,n.jsxs)(r.p,{children:[`请参考`,(0,n.jsx)(r.a,{href:`/dppt-initial-seed`,children:`此教程`}),`来进行初始种子乱数。`]}),`
`,(0,n.jsx)(r.h2,{children:`推进帧数`}),`
`,(0,n.jsxs)(r.p,{children:[`请参考`,(0,n.jsx)(r.a,{href:`/dppt-advance-rng`,children:`此教程`}),`来推进帧数。`]}),`
`,(0,n.jsx)(r.h2,{children:`校准`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在 PokeFinder 中进入生成器选项卡。`}),`
`,(0,n.jsx)(r.li,{children:`输入初始种子并找到你的目标宝可梦的帧数。`}),`
`,(0,n.jsx)(r.li,{children:`搜索你实际遇到宝可梦的帧数。`}),`
`,(0,n.jsx)(r.li,{children:`根据帧数调整延迟并重试。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`目标帧 - 实际命中帧 = 延迟
`})}),`
`,(0,n.jsx)(r.h2,{children:`特殊情况`}),`
`,(0,n.jsx)(r.p,{children:`如果想在毁坏的世界乱数骑拉帝纳，会比较棘手。进入毁坏的世界时，RNG 会推进 11 次，在遇到骑拉帝纳时总共推进 12 次。因此，如果使用日记推进法，至少需要考虑 23 次的初始推进。`}),`
`,(0,n.jsx)(r.p,{children:`在钻石和珍珠中乱数御三家时，建议在进入湖泊前保存游戏，并使用 0 帧的异色目标会更容易。在白金中，由于干扰更大，难度较高。`}),`
`,(0,n.jsx)(r.p,{children:`克雷色利亚和艾姆利多在首次对话时生成，因此需要在它们逃跑前进行乱数。`}),`
`,(0,n.jsx)(r.p,{children:`与大木博士对话领取关都三圣鸟时，不同宝可梦的初始帧不同：火焰鸟为 1、闪电鸟为 6、急冻鸟为 11。建议使用四天王方法，即先打败目标宝可梦，再与大木博士对话进行乱数。`}),`
`,(0,n.jsx)(r.h2,{children:`玛纳霏蛋乱数`}),`
`,(0,n.jsx)(r.p,{children:`玛纳霏蛋的领取方式类似于神秘礼物宝可梦，但它的生成方式使用 Method 1。神秘礼物的乱数遵循常规规则。`}),`
`,(0,n.jsx)(r.p,{children:`玛纳霏有异色锁定，无法在获得它的游戏中孵出异色形态。要绕过这一限制，可以在不同游戏中进行乱数操作：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`确定游戏 A 的异色 PID。`}),`
`,(0,n.jsx)(r.li,{children:`在游戏 B 中获得与该 PID 匹配的蛋。`}),`
`,(0,n.jsx)(r.li,{children:`将蛋从游戏 B 交换到游戏 A。`}),`
`,(0,n.jsx)(r.li,{children:`在游戏 A 中孵化蛋。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`恭喜，你现在拥有一只异色玛纳霏了！`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};