import{O as r,j as n}from"./index-Mcf0XAZ1.js";const d={title:"初始种子自动刷取",description:"使用初始种子自动脚本，实现更高自由度的乱数控制",slug:"zh-frlg-seeding-bot",translation:{enSlug:"frlg-seeding-bot",language:"zh"}};function l(i){const e={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h3,{children:"所需工具："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/mgba-setup",children:"带有 Lua 脚本的 mGBA 模拟器"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,n.jsxs(e.li,{children:["由 Real96 开发的 ",n.jsx(e.a,{href:"https://github.com/Real96/FRLGRSEInitialSeedsFinder",children:"FRLGRSEInitialSeedsFinder"})]}),`
`]}),`
`,n.jsx(e.h2,{children:"简介"}),`
`,n.jsx(e.p,{children:"本指南介绍一种适用于《火红》《叶绿》的替代乱数方式，借助 Lua 自动脚本实现对初始种子的更高控制。"}),`
`,n.jsx(e.h3,{children:"设置步骤："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"首先确定你的目标。在 PokeFinder 中进入 第三世代 => 定点乱数 或 野生乱数（两者操作方式相似）。"}),`
`,n.jsx(e.li,{children:'在 "检索器" 标签页中设置所需的筛选条件。'}),`
`,n.jsx(e.li,{children:"生成结果后，记录你选中的种子。"}),`
`,n.jsx(e.li,{children:"运行 FRLGRSEInitialSeedsFinder 工具。它会要求输入一个种子，此时输入刚刚记录的那个。"}),`
`,n.jsx(e.li,{children:"当工具提示“请输入想生成的结果数量”时，建议输入一个较大的数字，例如 100。"}),`
`,n.jsx(e.li,{children:"等待工具生成结果，它将输出一个文本文件，列出所有可能的初始种子。打开该文件并复制全部内容。"}),`
`,n.jsxs(e.li,{children:["打开 FRLG 的 Lua 脚本，找到如下行： 'local botTargetInitSeeds ='。将你复制的种子内容以 "," 括起来并填入该行。"]}),`
`,n.jsx(e.li,{children:"保存脚本。"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`对于刚开始游戏、尚未获得教学电视的初始 ID 乱数，建议只考虑较低帧范围内的结果。
`})}),`
`,n.jsx(e.h3,{children:"自动执行流程："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"编辑 Lua 脚本的第一行。"}),`
`,n.jsx(e.li,{children:"进入游戏的继续画面（读取存档的界面）。"}),`
`,n.jsx(e.li,{children:"同时按下电脑的 Shift 键和 GBA 的 SELECT 键启动自动脚本。"}),`
`]}),`
`,n.jsx(e.p,{children:"一旦脚本完成命中，游戏将自动暂停。此时记录下你命中的初始种子，在 PokeFinder 中输入该种子后续进行乱数操作。你现在可以确定当前帧可用于继续乱数流程。"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function h(i={}){const{wrapper:e}={...r(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(l,{...i})}):l(i)}export{h as default,d as frontmatter};
