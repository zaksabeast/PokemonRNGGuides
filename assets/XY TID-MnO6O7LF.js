import{ii as i,j as e}from"./index-CXw3cuDA.js";const d={title:"X 与 Y TID 乱数",description:"学习如何在《宝可梦 X／Y》中获取目标的训练家 ID（TID）与秘密 ID（SID）组合。",slug:"zh-pcalc-xy-tid",translation:{enSlug:"pcalc-xy-tid",language:"zh"}};function s(l){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...i(),...l.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"简介"}),`
`,e.jsxs(n.p,{children:["要对训练家 ID、秘密 ID 或训练家异色值进行乱数，你需要一个全新的存档。如需删除现有存档，请在标题画面按下 ",e.jsx(n.code,{children:"X + B + 方向键上"}),"。这会删除当前存档，并进入语言选择画面。"]}),`
`,e.jsxs(n.p,{children:["如果你之后还想恢复原存档，请务必使用存档管理器（如 ",e.jsx(n.a,{href:"https://github.com/FlagBrew/Checkpoint/releases",children:"Checkpoint"}),"）提前备份。"]}),`
`,e.jsx(n.h2,{children:"工具"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"/install-pokereader",children:"一台安装了 PokeReader 的 3DS"})," 或 ",e.jsx(n.a,{href:"/citrarng-setup",children:"安装了 PokeReader 的 Azahar 模拟器"})]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,e.jsx(n.h2,{children:"步骤 1：设置 3DSRNGTool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"在右上角选择你的游戏版本。Seed 与 TSV 可保持为空。"}),`
`,e.jsxs(n.li,{children:["在 ",e.jsx(n.code,{children:"ID 乱数"})," 标签页中，输入你想要的 TID、SID 或 TSV。3DSRNGTool 支持搜索部分数字或完整数字，建议一次只针对一个目标进行乱数。"]}),`
`,e.jsxs(n.li,{children:["在 ",e.jsx(n.code,{children:"帧数范围"})," 中，将起始值设为 ",e.jsx(n.code,{children:"0"}),"。"]}),`
`]}),`
`,e.jsx(n.h2,{children:"步骤 2：游戏准备"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"选择游戏语言。"}),`
`,e.jsx(n.li,{children:"继续游戏流程，直到出现确认名字是否正确的画面。"}),`
`,e.jsxs(n.li,{children:["在该画面按下 ",e.jsx(n.code,{children:"Start + Select"})," 暂停游戏。"]}),`
`,e.jsxs(n.li,{children:["将 PokeReader 中显示的 4 个 TinyMT 种子输入到 3DSRNGTool 的 4 个输入框中。请直接使用 ",e.jsx(n.code,{children:"Tiny u32 seed"})," 下方显示的数值。"]}),`
`]}),`
`,e.jsx(n.h2,{children:"步骤 3：寻找目标帧"}),`
`,e.jsx(n.p,{children:"3DSRNGTool 中的帧用于追踪 4 个被称为 tiny seed 的数值。这些种子会生成训练家信息，包括 TID、SID 与 TSV。每推进一次 tiny seed，就等同于推进一帧。请注意，这里的帧与 PokeReader 中显示的 MT 推进数不同。"}),`
`,e.jsx(n.p,{children:"在 X/Y 中，tiny seed 会在序章过程中以随机速度推进，但推进顺序是固定的，因此可以被 3DSRNGTool 精确追踪。"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["在主窗口中点击 ",e.jsx(n.code,{children:"计算"}),"，生成可用于乱数的帧列表。"]}),`
`,e.jsx(n.li,{children:"根据需要调整范围。目标帧越高，获取目标 TID／SID／TSV 所需时间越长。"}),`
`,e.jsxs(n.li,{children:["如果目标帧过高，或当前初始种子无法生成该 TID／SID／TSV 组合，请按下",e.jsx(n.code,{children:"Start + Select + L + R"})," 进行软重置，以获取新的初始种子。"]}),`
`]}),`
`,e.jsx(n.h2,{children:"步骤 4：推进 Tiny Seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["按下 ",e.jsx(n.code,{children:"Start"})," 解除暂停，继续游戏。"]}),`
`,e.jsxs(n.li,{children:["确认角色选择后，进入下一画面。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'"(name)... Tres bien! What a fantastic name!"'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["在该画面中让 tiny seed 自然推进。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'3DSRNGTool 中 "Frame" 显示的数值，与 PokeReader 中 "TinyMT seed" 下方的 "Advances" 数值是一致的。'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["当目标 TID／SID／TSV 距离当前 seed 约 12 帧时，按下 ",e.jsx(n.code,{children:"Start + Select"})," 暂停游戏。"]}),`
`,e.jsxs(n.li,{children:["在暂停状态下按 ",e.jsx(n.code,{children:"Select"}),"，以手动推进帧数与 tiny seed。"]}),`
`,e.jsxs(n.li,{children:["到达目标帧后，按住 ",e.jsx(n.code,{children:"A"})," 键，使游戏在该帧解除暂停，从而命中正确的 tiny seeds。"]}),`
`,e.jsx(n.li,{children:"当你可以控制角色后，通过训练家卡片确认你获得的 TID 是否正确。"}),`
`]}),`
`,e.jsx(n.h2,{children:"特别鸣谢"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function r(l={}){const{wrapper:n}={...i(),...l.components};return n?e.jsx(n,{...l,children:e.jsx(s,{...l})}):s(l)}export{r as default,d as frontmatter};
