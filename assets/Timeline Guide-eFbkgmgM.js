import{g7 as s,j as n}from"./index-BQ_qSqp-.js";const c=[{title:"究极日月时间线乱数",description:"学习如何在《究极之日／究极之月》中创建时间线。",slug:"zh-retail-usum-timeline",translation:{enSlug:"retail-usum-timeline",language:"zh"}},{title:"日月时间线乱数",description:"学习如何在《日月》中创建时间线。",slug:"zh-retail-sm-timeline",translation:{enSlug:"retail-sm-timeline",language:"zh"}}];function i(l){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["一台安装了 ",n.jsx(e.a,{href:"/install-pokereader",children:"PokeReader"})," 的 3DS"]}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,n.jsx(e.h2,{children:"第一步：设置 3DSRNGTool"}),`
`,n.jsx(e.p,{children:"只有在当前区域存在一个或多个 NPC 时才需要创建时间线。如果是 0 个 NPC 的区域，则不需要时间线。"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"输入你所玩的游戏版本和 TSV。"}),`
`,n.jsxs(e.li,{children:["输入初始种子，可在主乱数视图中找到 ",n.jsx(e.code,{children:"Seed:"})," 一栏。"]}),`
`,n.jsx(e.li,{children:"如果持有闪耀呼符，勾选闪耀护符选项。"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`说明：在第七世代中，NPC 会推动帧数。通常每个 NPC 会使帧数前进 1，因此一个区域中如果有 4 个 NPC，帧数一般每次前进 5 帧。像洛托姆或主角眨眼等也会影响帧数。如果能正确创建时间线，就能精准预测帧数，避免因 NPC 干扰错过目标帧。
`})}),`
`,n.jsx(e.h2,{children:"第二步：创建时间线"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"在 3DSRNGTool 中勾选 “仅准确帧”。"}),`
`,n.jsx(e.li,{children:"输入当前区域的 NPC 数量。请使用 PokeReader 确认该数值。"}),`
`,n.jsx(e.li,{children:"游戏中推进至你要乱数的宝可梦的最终画面，在帧数范围中填写当前帧。"}),`
`,n.jsx(e.li,{children:"点击 “计算”，然后推进至标记列中为 “-” 的任意一帧。这些为“准确帧”，可用来进行精准帧数判断。"}),`
`,n.jsxs(e.li,{children:["按 ",n.jsx(e.code,{children:"Start"})," 解除暂停来推进帧数，接近目标帧后可使用 ",n.jsx(e.code,{children:"Start + Select"})," 暂停，再用 ",n.jsx(e.code,{children:"Select"})," 单步推进。"]}),`
`]}),`
`,n.jsx(e.h2,{children:"第三步：确认时间线与 NPC 数量"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"达到任一准确帧后，在 3DSRNGTool 中输入当前帧，勾选 “创建时间线”，再点击 “计算”。"}),`
`,n.jsxs(e.li,{children:["使用 ",n.jsx(e.code,{children:"Select"})," 键多次单步推进，并与 3DSRNGTool 中显示的后续帧进行比对。",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"如果一致，说明 NPC 数正确。"}),`
`,n.jsx(e.li,{children:"如果不一致，说明时间线错误，需重新创建。"}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.p,{children:"时间线制作是否正确，通常在此阶段就能发现。请确认初始种子是否正确，并确保在制作时间线期间 PokeReader 中的 NPC 数量没有发生变化。"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：制作时间线过程中请勿调整筛选器。此时仅应勾选 “仅准确帧”。若更改了其他筛选选项，请从头开始。
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：可通过以当前帧为基准重新制作时间线，再搜索目标帧，以确认目标帧是否仍在时间线范围内。若目标帧不在结果中，说明时间线已偏移。
`})}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function d(l={}){const{wrapper:e}={...s(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(i,{...l})}):i(l)}export{d as default,c as frontmatter};
