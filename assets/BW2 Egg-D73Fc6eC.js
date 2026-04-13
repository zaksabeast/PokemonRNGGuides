import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-DUsdE6jN.js";var n=e(),r=[{title:`黑白2孵蛋乱数`,description:`学习如何在黑白2的培育屋中进行孵蛋乱数，获取异色高个体宝可梦`,slug:`zh-bw2-egg`,translation:{enSlug:`bw2-egg`,language:`zh`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsxs)(r.li,{children:[`根据你的方法所需的所有工具（`,(0,n.jsx)(r.a,{href:`/mystic-timer`,children:`神秘计时器`}),` 或 `,(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Lua脚本`}),`）`]}),`
`,(0,n.jsx)(r.li,{children:`可进入培育屋`}),`
`,(0,n.jsx)(r.li,{children:`双亲宝可梦的个体值`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一部分：准备工作`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 PokeFinder。`}),`
`,(0,n.jsx)(r.li,{children:`前往 Gen 5 标签页 -> Egg。`}),`
`,(0,n.jsx)(r.li,{children:`输入双亲宝可梦的相关信息。`}),`
`,(0,n.jsx)(r.li,{children:`将父母放入培育屋。`}),`
`,(0,n.jsx)(r.li,{children:`行走直到老爷爷准备好一个蛋。`}),`
`,(0,n.jsx)(r.li,{children:`存档，建议在培育屋内存档，以避免推进帧数。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：黑白2的蛋乱数与黑白不同。IV 会先生成，之后才生成 PID。如果你只关心其中一部分，可以跳到相应部分。
`})}),`
`,(0,n.jsx)(r.h2,{children:`第二部分：个体值 + 性格乱数`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`重要提示：如果你要孵化尼多兰或晃晃斑/粉蝶虫，这一步将决定蛋的种类。请确保在 PokeFinder 中选择正确的蛋种类，这样就能知道性别（尼多朗为雄性、尼多兰为雌性，晃晃斑为雄性、粉蝶虫为雌性）。
`})}),`
`,(0,n.jsxs)(r.p,{children:[`与第六世代蛋乱数不同，你只需命中初始seed并生成对应的个体值，不需要命中特定帧数。`,(0,n.jsx)(r.strong,{children:`只需命中初始种子即可`}),`。`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在 PokeFinder 中输入你想要的个体、性格与特性（此时不要添加其他筛选条件）。`}),`
`,(0,n.jsx)(r.li,{children:`搜索符合条件的初始种子。`}),`
`,(0,n.jsx)(r.li,{children:`启动游戏并命中该初始种子。`}),`
`,(0,n.jsx)(r.li,{children:`与老爷爷对话并拒绝接收蛋。`}),`
`,(0,n.jsx)(r.li,{children:`再次行走直到下一个蛋准备好。`}),`
`,(0,n.jsx)(r.li,{children:`在老爷爷旁边存档。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：如果你只在意个体而不在意 PID，可以直接拿蛋，乱数操作已完成。
`})}),`
`,(0,n.jsx)(r.h2,{children:`第三部分：PID 乱数`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`移除所有 IV 条件，仅输入与 PID 相关的过滤条件（如性别、异色等）。`}),`
`,(0,n.jsx)(r.li,{children:`搜索生成目标 PID 的初始种子。`}),`
`,(0,n.jsx)(r.li,{children:`启动游戏并命中该初始种子。`}),`
`,(0,n.jsx)(r.li,{children:`推进乱帧数直到目标 PID 帧数。`}),`
`,(0,n.jsx)(r.li,{children:`与老爷爷对话并接受蛋。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：使用 PokeFinder 时，有时需在目标前一帧与老爷爷对话。例如目标在第 100 帧时，请在第 99 帧交谈。
`})}),`
`,(0,n.jsx)(r.p,{children:`现在，你应该就获得了满足所有条件的蛋啦！`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};