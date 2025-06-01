import{u as r,j as n}from"./index-CsrGO9EE.js";const c=[{title:"黑白2孵蛋乱数",description:"学习如何在黑白2的培育屋中进行孵蛋乱数，获取异色高个体宝可梦",slug:"zh-bw2-egg",translation:{enSlug:"bw2-egg",language:"zh"}}];function l(i){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,n.jsxs(e.li,{children:["根据你的方法所需的所有工具（",n.jsx(e.a,{href:"/mystic-timer",children:"神秘计时器"})," 或 ",n.jsx(e.a,{href:"/desmume-setup",children:"Lua脚本"}),"）"]}),`
`,n.jsx(e.li,{children:"可进入培育屋"}),`
`,n.jsx(e.li,{children:"双亲宝可梦的个体值"}),`
`]}),`
`,n.jsx(e.h2,{children:"第一部分：准备工作"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 PokeFinder。"}),`
`,n.jsx(e.li,{children:"前往 Gen 5 标签页 -> Egg。"}),`
`,n.jsx(e.li,{children:"输入双亲宝可梦的相关信息。"}),`
`,n.jsx(e.li,{children:"将父母放入培育屋。"}),`
`,n.jsx(e.li,{children:"行走直到老爷爷准备好一个蛋。"}),`
`,n.jsx(e.li,{children:"存档，建议在培育屋内存档，以避免推进帧数。"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：黑白2的蛋乱数与黑白不同。IV 会先生成，之后才生成 PID。如果你只关心其中一部分，可以跳到相应部分。
`})}),`
`,n.jsx(e.h2,{children:"第二部分：个体值 + 性格乱数"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`重要提示：如果你要孵化尼多兰或晃晃斑/粉蝶虫，这一步将决定蛋的种类。请确保在 PokeFinder 中选择正确的蛋种类，这样就能知道性别（尼多朗为雄性、尼多兰为雌性，晃晃斑为雄性、粉蝶虫为雌性）。
`})}),`
`,n.jsxs(e.p,{children:["与第六世代蛋乱数不同，你只需命中初始seed并生成对应的个体值，不需要命中特定帧数。",n.jsx(e.strong,{children:"只需命中初始种子即可"}),"。"]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"在 PokeFinder 中输入你想要的个体、性格与特性（此时不要添加其他筛选条件）。"}),`
`,n.jsx(e.li,{children:"搜索符合条件的初始种子。"}),`
`,n.jsx(e.li,{children:"启动游戏并命中该初始种子。"}),`
`,n.jsx(e.li,{children:"与老爷爷对话并拒绝接收蛋。"}),`
`,n.jsx(e.li,{children:"再次行走直到下一个蛋准备好。"}),`
`,n.jsx(e.li,{children:"在老爷爷旁边存档。"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：如果你只在意个体而不在意 PID，可以直接拿蛋，乱数操作已完成。
`})}),`
`,n.jsx(e.h2,{children:"第三部分：PID 乱数"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"移除所有 IV 条件，仅输入与 PID 相关的过滤条件（如性别、异色等）。"}),`
`,n.jsx(e.li,{children:"搜索生成目标 PID 的初始种子。"}),`
`,n.jsx(e.li,{children:"启动游戏并命中该初始种子。"}),`
`,n.jsx(e.li,{children:"推进乱帧数直到目标 PID 帧数。"}),`
`,n.jsx(e.li,{children:"与老爷爷对话并接受蛋。"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：使用 PokeFinder 时，有时需在目标前一帧与老爷爷对话。例如目标在第 100 帧时，请在第 99 帧交谈。
`})}),`
`,n.jsx(e.p,{children:"现在，你应该就获得了满足所有条件的蛋啦！"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})}function d(i={}){const{wrapper:e}={...r(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(l,{...i})}):l(i)}export{d as default,c as frontmatter};
