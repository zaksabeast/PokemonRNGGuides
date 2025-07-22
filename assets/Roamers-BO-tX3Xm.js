import{E as l,j as n}from"./index-266lr8R7.js";const c=[{title:"第五世代游走宝可梦乱数",description:"在模拟器中对第五世代的游走宝可梦进行乱数",slug:"zh-emulator-bw-roamers",translation:{enSlug:"emulator-bw-roamers",language:"zh"}}];function i(r){const e={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...l(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/Bambo-Rambo/RNGReporter",children:"RNG Reporter"})}),`
`]}),`
`,n.jsx(e.h2,{children:"第一步：寻找个体组合"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"在 RNG Reporter 中，将月份设置为 2 月或 11 月。"}),`
`,n.jsx(e.li,{children:"将遭遇类型设为「Roaming Pokémon」，方式选择「IVs (Standard Seed)」。"}),`
`,n.jsx(e.li,{children:"选择一个理想的个体值组合，此时暂时不用考虑异色。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Black-and-White/Roamer/Setup.png",alt:"Setup"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：如果你选择其他月份，帧数会非常不稳定，完全靠运气。
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`提示：生成目标组合可能会花上一段时间。
`})}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Black-and-White/Roamer/Target.png",alt:"目标种子"})}),`
`,n.jsx(e.h2,{children:"第二步：获取 PID 与性格"}),`
`,n.jsx(e.p,{children:"刚才我们只是筛选了个体值组合，因为建议先通过 TID/SID 乱数获取一个适合异色的 ID。"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`如果你只想要高个体值或只想要异色，而不是两者兼得，可以跳过这一步和下一步。
`})}),`
`,n.jsx(e.p,{children:"选择一个帧数（建议至少 1500 帧，如果是 2 月或 11 月以外的月份则建议 2000 以上），并记录下目标 PID 与帧数。"}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Black-and-White/Roamer/Pandora.png",alt:"Pandora's Box"})}),`
`,n.jsx(e.h2,{children:"第三步：准备存档"}),`
`,n.jsx(e.p,{children:"和第三、第四世代一样，推荐使用 ID 乱数（TID/SID）先拿到一个适合的异色 ID。若只在意个体或异色可跳过此步骤。"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"选择你喜欢的 TID/SID 组合（或指定一个组合）并进行乱数。"}),`
`,n.jsx(e.li,{children:"命中初始种子后，推进帧数。"}),`
`,n.jsx(e.li,{children:"记下你获得的 TID/SID，推进到可以释放游走宝可梦的剧情处。"}),`
`,n.jsx(e.li,{children:"然后在屋内存档。"}),`
`]}),`
`,n.jsx(e.p,{children:"你应该在这里存档（7号道路的小屋）："}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Black-and-White/Roamer/Save.png",alt:"存档地点"})}),`
`,n.jsx(e.h2,{children:"第四步：校准"}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Black-and-White/Roamer/Final-Screen.png",alt:"判定界面"})}),`
`,n.jsx(e.p,{children:"RNG Reporter 中会提供一个帧数，通常是 1 到 6 之间："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"在屋子里通过走动来推进个体帧数。"}),`
`,n.jsx(e.li,{children:"建立即时存档，然后走出屋外，到达如上图所示的画面。"}),`
`,n.jsx(e.li,{children:"开始推进性格帧数。"}),`
`,n.jsxs(e.li,{children:["到达目标帧数时按下 ",n.jsx(e.code,{children:"A"})," 键。"]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：第一次大概率不会命中目标帧数。你可以查看图鉴确认是否成功（前提是你在追求异色）。
`})}),`
`,n.jsxs(e.ol,{start:"5",children:[`
`,n.jsx(e.li,{children:"遇到游走宝可梦后，记录它的 PID。你可以使用 Lua 脚本查看，或直接捕捉后用 PkHeX 查看数据。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Black-and-White/Roamer/Calibration.png",alt:"校准"})}),`
`,n.jsx(e.h2,{children:"第五步：命中目标"}),`
`,n.jsx(e.p,{children:"此时你应该知道你命中了哪个 PID。"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"返回 RNG Reporter。"}),`
`,n.jsx(e.li,{children:"主界面输入你的种子，并确保是在 Generation 5 的 PIDRNG abuse 页面。"}),`
`,n.jsx(e.li,{children:"点击「Search」，寻找你的 PID。"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:"提示：你也可以导出结果为 .txt 文档，然后用 `Ctrl + F` 查找 PID。\n"})}),`
`,n.jsxs(e.ol,{start:"4",children:[`
`,n.jsxs(e.li,{children:["确定你从按下 ",n.jsx(e.code,{children:"A"})," 后实际推进了多少帧，将这个数值从原本的目标帧数中减去，得到新的目标帧。"]}),`
`,n.jsx(e.li,{children:"尝试命中这个新帧数。如果没命中："}),`
`,n.jsx(e.li,{children:"请重复上述步骤。"}),`
`,n.jsx(e.li,{children:"有可能需要多次尝试，但最终一定可以成功。"}),`
`,n.jsxs(e.li,{children:["推荐记录你尝试过的帧数以及你按下 ",n.jsx(e.code,{children:"A"})," 的实际帧数。"]}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Black-and-White/Roamer/Success.png",alt:"成功！"})}),`
`,n.jsx(e.h2,{children:"恭喜！"}),`
`,n.jsx(e.p,{children:"使用大师球捕捉你的游走宝可梦，或使用锁定技能如黑色目光、踩影、影子标签等手段。然后在群里或朋友面前炫耀你的成果吧！"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function d(r={}){const{wrapper:e}={...l(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(i,{...r})}):i(r)}export{d as default,c as frontmatter};
