import{q as r,j as n}from"./index-BEKxRXjV.js";const d={title:"定点乱数",description:"如何在钻石珍珠和白金中对固定遇敌的宝可梦进行乱数",slug:"zh-emulator-dppt-stationary",translation:{enSlug:"emulator-dppt-stationary",language:"zh"}};function i(l){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/desmume-setup",children:"包含lua脚本功能的Desmume模拟器"})}),`
`]}),`
`,n.jsx(e.h2,{children:"准备工作"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 PokeFinder -> 第四世代 -> 定点 -> 检索器，在设置中选择你想要的宝可梦。"}),`
`,n.jsx(e.li,{children:"设置或选择正确的个人资料，并根据需要调整筛选条件。"}),`
`,n.jsx(e.li,{children:"搜索目标种子以及目标帧。"}),`
`]}),`
`,n.jsx(e.h2,{children:"初始种子乱数"}),`
`,n.jsxs(e.p,{children:["请参考",n.jsx(e.a,{href:"/dppt-initial-seed",children:"此指南"}),"来进行初始种子乱数。"]}),`
`,n.jsx(e.h2,{children:"推进帧数"}),`
`,n.jsxs(e.p,{children:["请参考",n.jsx(e.a,{href:"/dppt-advance-rng",children:"此指南"}),"来推进帧数。"]}),`
`,n.jsx(e.h2,{children:"校准"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"在 PokeFinder 中进入生成器选项卡。"}),`
`,n.jsx(e.li,{children:"输入初始种子并找到你的目标宝可梦的帧数。"}),`
`,n.jsx(e.li,{children:"搜索你实际遇到宝可梦的帧数。"}),`
`,n.jsx(e.li,{children:"根据帧数调整延迟并重试。"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`目标帧 - 实际命中帧 = 延迟
`})}),`
`,n.jsx(e.h2,{children:"特殊情况"}),`
`,n.jsx(e.p,{children:"如果想在毁坏的世界乱数骑拉帝纳，会比较棘手。进入毁坏的世界时，RNG 会推进 11 次，在遇到骑拉帝纳时总共推进 12 次。因此，如果使用日记推进法，至少需要考虑 23 次的初始推进。"}),`
`,n.jsx(e.p,{children:"在钻石和珍珠中乱数御三家时，建议在进入湖泊前保存游戏，并使用 0 帧的异色目标会更容易。在白金中，由于干扰更大，难度较高。"}),`
`,n.jsx(e.p,{children:"克雷色利亚和艾姆利多在首次对话时生成，因此需要在它们逃跑前进行乱数。"}),`
`,n.jsx(e.p,{children:"与大木博士对话领取关都三圣鸟时，不同宝可梦的初始帧不同：火焰鸟为 1、闪电鸟为 6、急冻鸟为 11。建议使用四天王方法，即先打败目标宝可梦，再与大木博士对话进行乱数。"}),`
`,n.jsx(e.h2,{children:"玛纳霏蛋乱数"}),`
`,n.jsx(e.p,{children:"玛纳霏蛋的领取方式类似于神秘礼物宝可梦，但它的生成方式使用 Method 1。神秘礼物的乱数遵循常规规则。"}),`
`,n.jsx(e.p,{children:"玛纳霏有异色锁定，无法在获得它的游戏中孵出异色形态。要绕过这一限制，可以在不同游戏中进行乱数操作："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"确定游戏 A 的异色 PID。"}),`
`,n.jsx(e.li,{children:"在游戏 B 中获得与该 PID 匹配的蛋。"}),`
`,n.jsx(e.li,{children:"将蛋从游戏 B 交换到游戏 A。"}),`
`,n.jsx(e.li,{children:"在游戏 A 中孵化蛋。"}),`
`]}),`
`,n.jsx(e.p,{children:"恭喜，你现在拥有一只异色玛纳霏了！"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function h(l={}){const{wrapper:e}={...r(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(i,{...l})}):i(l)}export{h as default,d as frontmatter};
