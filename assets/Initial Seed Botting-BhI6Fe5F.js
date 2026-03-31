import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-DLFhP4kJ.js";var n=e(),r={title:`初始种子自动刷取`,description:`使用初始种子自动脚本，实现更高自由度的乱数控制`,slug:`zh-frlg-seeding-bot`,translation:{enSlug:`frlg-seeding-bot`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h3,{children:`所需工具：`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`带有 Lua 脚本的 mGBA 模拟器`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsxs)(r.li,{children:[`由 Real96 开发的 `,(0,n.jsx)(r.a,{href:`https://github.com/Real96/FRLGRSEInitialSeedsFinder`,children:`FRLGRSEInitialSeedsFinder`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`简介`}),`
`,(0,n.jsx)(r.p,{children:`本教程介绍一种适用于《火红》《叶绿》的替代乱数方式，借助 Lua 自动脚本实现对初始种子的更高控制。`}),`
`,(0,n.jsx)(r.h3,{children:`设置步骤：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`首先确定你的目标。在 PokeFinder 中进入 第三世代 => 定点乱数 或 野生乱数（两者操作方式相似）。`}),`
`,(0,n.jsx)(r.li,{children:`在 "检索器" 标签页中设置所需的筛选条件。`}),`
`,(0,n.jsx)(r.li,{children:`生成结果后，记录你选中的种子。`}),`
`,(0,n.jsx)(r.li,{children:`运行 FRLGRSEInitialSeedsFinder 工具。它会要求输入一个种子，此时输入刚刚记录的那个。`}),`
`,(0,n.jsx)(r.li,{children:`当工具提示“请输入想生成的结果数量”时，建议输入一个较大的数字，例如 100。`}),`
`,(0,n.jsx)(r.li,{children:`等待工具生成结果，它将输出一个文本文件，列出所有可能的初始种子。打开该文件并复制全部内容。`}),`
`,(0,n.jsxs)(r.li,{children:[`打开 FRLG 的 Lua 脚本，找到如下行： 'local botTargetInitSeeds ='。将你复制的种子内容以 `,` 括起来并填入该行。`]}),`
`,(0,n.jsx)(r.li,{children:`保存脚本。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`对于刚开始游戏、尚未获得教学电视的初始 ID 乱数，建议只考虑较低帧范围内的结果。
`})}),`
`,(0,n.jsx)(r.h3,{children:`自动执行流程：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`编辑 Lua 脚本的第一行。`}),`
`,(0,n.jsx)(r.li,{children:`进入游戏的继续画面（读取存档的界面）。`}),`
`,(0,n.jsx)(r.li,{children:`同时按下电脑的 Shift 键和 GBA 的 SELECT 键启动自动脚本。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`一旦脚本完成命中，游戏将自动暂停。此时记录下你命中的初始种子，在 PokeFinder 中输入该种子后续进行乱数操作。你现在可以确定当前帧可用于继续乱数流程。`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};