import{ih as i,j as n}from"./index-BsTu5YyI.js";const h=[{title:"究极日月 使用不同语言和/或闪耀呼符的孵蛋乱数",description:"学习如何在《究极日月》中使用闪耀呼符和/或不同语言亲代进行高个体异色宝可梦的孵蛋乱数。",slug:"zh-retail-usum-egg-mmsc",translation:{enSlug:"retail-usum-egg-mmsc",language:"zh"}},{title:"日月 使用不同语言和/或闪耀呼符的孵蛋乱数",description:"学习如何在《日月》中使用闪耀呼符和/或不同语言亲代进行高个体异色宝可梦的孵蛋乱数。",slug:"zh-retail-sm-egg-mmsc",translation:{enSlug:"retail-sm-egg-mmsc",language:"zh"}}];function s(l){const e={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"与不同语言法和/或闪耀呼符的区别"}),`
`,n.jsx(e.p,{children:"使用不同语言法和/或闪耀呼符时，蛋的异色值（ESV）是按固定顺序生成的。为了命中目标帧，你需要按顺序接受或拒绝蛋。而不使用这些时，ESV 是在你接蛋时才生成，因此任何帧都有可能成为目标。"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`说明：ESV（蛋异色值）决定蛋是否异色。当它与训练家异色值（TSV）相等时，孵化出的宝可梦将是异色。
`})}),`
`,n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`,n.jsxs(e.li,{children:["可选：",n.jsx(e.a,{href:"/zh-install-pokereader",children:"一台安装了 PokeReader 的 3DS"})]}),`
`]}),`
`,n.jsx(e.h2,{children:"第一步：设置 3DSRNGTool"}),`
`,n.jsx(e.h3,{children:"配置部分："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"输入你的游戏版本和 TSV。"}),`
`,n.jsx(e.li,{children:"初始种子可以忽略，本方法不会用到。"}),`
`,n.jsx(e.li,{children:'若持有闪耀呼符，请勾选 "闪耀护符"。'}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`说明：如果你想乱数出不是自己 TSV 的异色蛋，请点击 "TSV列表"，输入目标 TSV，并勾选 "其他TSV异色"。右上角只能保留你自己的 TSV，否则结果将不准确。
`})}),`
`,n.jsx(e.h3,{children:"亲代信息部分："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["根据你所使用的亲代宝可梦填写相关内容。",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:'若亲代语言不同，请勾选 "父母语言不同"。'}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`说明：不同语言法只取决于宝可梦的语言，与游戏地区无关。
`})}),`
`,n.jsx(e.p,{children:"当百变怪与无性别宝可梦配对时，百变怪视为雌性；否则为与另一只亲代性别相反的一方。"}),`
`,n.jsx(e.h3,{children:"当前状态部分："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:['在"当前状态"中输入当前蛋的种子。',`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:'若未使用 PokeReader，可参考"附加说明"中其他方法获取。'}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:'不要勾选 "主乱数蛋（PID）"。'}),`
`,n.jsx(e.li,{children:'在"个体筛选"中填写你目标蛋的个体条件。'}),`
`,n.jsx(e.li,{children:'若只想找异色蛋，可勾选 "仅异色帧"。'}),`
`,n.jsx(e.li,{children:'起始帧设为 "0"。'}),`
`,n.jsx(e.li,{children:'点击 "计算"。'}),`
`]}),`
`,n.jsx(e.h2,{children:"第二步：选择目标帧"}),`
`,n.jsx(e.p,{children:"你可以选择任意列出的帧。通常帧数越低，所需的接受/拒绝操作越少。"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:'右键点击你想要的帧，选择 "将该帧设为目标"。'}),`
`,n.jsxs(e.li,{children:['点击 "最短路径"，然后点击 "计算"。',`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"程序会计算出命中该帧所需的最短接受/拒绝路径。"}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:"按照顺序从上往下接受或拒绝蛋。顺序错误会导致蛋种子不一致。"}),`
`,n.jsxs(e.li,{children:["最后一个接受的蛋就是你的目标蛋。",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"建议使用 PokeReader 在游戏中确认帧数是否一致。"}),`
`,n.jsx(e.li,{children:"若目标为特定的异色蛋，可能会出现帧数极高、接受/拒绝次数多的情况，这是因为蛋的 ESV 是预先固定的。"}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.h2,{children:"附加说明"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["PokeReader 可以用于查看 TSV、闪耀呼符持有情况、是否为不同语言亲代等信息。",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["TSV：在主乱数视图中，标注为 ",n.jsx(e.code,{children:"TSV"}),"。"]}),`
`,n.jsx(e.li,{children:"闪耀呼符/亲代语言信息：在 Daycare视图中。"}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:["不使用 PokeReader 的情况下，也可以通过其他方式查到 TSV：",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"使用 Homebrew 或 CFW 和存档管理工具（如 Checkpoint）导出存档，在 PKHeX 中查看，鼠标悬停在 TID 或 SID 上即可查看 TSV。"}),`
`,n.jsxs(e.li,{children:["也可以到 ",n.jsx(e.a,{href:"https://www.discord.gg/d8JuAvg",children:"Pokemon RNG Discord"})," 请求他人协助查询 TSV。"]}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:["若未使用 PokeReader 且不清楚当前蛋种子，可尝试以下方法：",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["若已进行过接受/拒绝操作，且不使用 Homebrew 或 CFW，可使用 ",n.jsx(e.a,{href:"/retail-usum-egg-seed-no-cfw",children:"127 条鲤鱼王法"}),"。"]}),`
`,n.jsxs(e.li,{children:["若尚未在培育屋接过蛋，且不使用 Homebrew 或 CFW，可使用 ",n.jsx(e.a,{href:"/retail-usum-egg-seed-no-cfw",children:"8 个蛋法"}),"。"]}),`
`,n.jsx(e.li,{children:"若有 Homebrew 或 CFW，可用 PKHeX 在导出存档后直接查看蛋种子。"}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function c(l={}){const{wrapper:e}={...i(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(s,{...l})}):s(l)}export{c as default,h as frontmatter};
