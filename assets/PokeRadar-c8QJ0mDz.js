import{ig as h,j as n}from"./index-Bi3LMQyL.js";const c={title:"X 与 Y PokéRadar 乱数",description:"学习如何在《宝可梦 X / Y》中使用 PokéRadar 进行乱数，以获取异色宝可梦。",slug:"zh-xy-pokeradar",translation:{enSlug:"xy-pokeradar",language:"zh"}};function s(i){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...h(),...i.components},{XyPokeRadar:l,YouTubeVideo:r}=e;return l||d("XyPokeRadar"),r||d("YouTubeVideo"),n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"视频指南"}),`
`,n.jsx(r,{id:"5Pkw195YiLQ"}),`
`,n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/install-pokereader",children:"PokeReader"})}),`
`,n.jsx(e.li,{children:"大量驱虫喷雾，用于避免普通野生宝可梦遭遇"}),`
`]}),`
`,n.jsx(e.h2,{children:"步骤 1：前期准备"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"确保你已安装并运行 PokeReader。"}),`
`,n.jsxs(e.li,{children:["打开 PokeReader，并按下 ",n.jsx(e.code,{children:"X"})," 与 ",n.jsx(e.code,{children:"Y"})," 将其锁定在屏幕上。"]}),`
`,n.jsx(e.li,{children:"使用 PokéRadar，并遭遇你想要进行异色乱数的宝可梦。"}),`
`,n.jsxs(e.li,{children:["击倒或捕捉该宝可梦，使连锁数变为 1，并锁定宝可梦种类。",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"连锁数为 0 的草丛判定方式与连锁数为 1 及以上不同。你必须通过随机遭遇或使用野生乱数来获取目标种类。"}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：请避免使用轮滑、进入错误种类的草丛，或踩入空草丛，这些都会中断连锁。
`})}),`
`,n.jsx(e.h2,{children:"步骤 2：输入数据"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开背包以暂停 TinyMT 的推进。"}),`
`,n.jsxs(e.li,{children:["将以下从 PokeReader 中读取的数据输入到本页面底部的乱数工具中：",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"TinyMT Seed"}),`
`,n.jsx(e.li,{children:"当前推进帧数"}),`
`,n.jsx(e.li,{children:"最大推进帧数（例如 20000）"}),`
`,n.jsx(e.li,{children:"队伍中的宝可梦数量"}),`
`,n.jsx(e.li,{children:"当前连锁数"}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:'点击 "Generate" 以显示可能的结果。'}),`
`]}),`
`,n.jsx(e.p,{children:"当你点击工具中的某一行时，下方会显示如下信息："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Sparkles"}),"：异色宝可梦草丛"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"绿色对勾"}),"：安全草丛，可继续连锁"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"红色叉号"}),"：危险草丛，会中断连锁（错误种类或空草丛）"]}),`
`]}),`
`,n.jsx(e.h2,{children:"步骤 3：推进 TinyMT"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"如果 PokéRadar 电量不足，请行走以进行充能。"}),`
`,n.jsx(e.li,{children:"使用宝可拍拍乐来快速推进 TinyMT。"}),`
`,n.jsx(e.li,{children:"当接近目标推进帧数时，打开背包以暂停推进。"}),`
`,n.jsxs(e.li,{children:["通过以下方式推进到目标帧数：",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"开关经验分享，每次会按队伍中宝可梦数量推进 3 帧"}),`
`,n.jsx(e.li,{children:"对宝可梦开始教学招式机并立刻退出，可推进 1 帧"}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.h2,{children:"步骤 4：寻找异色草丛"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"达到目标推进帧数后，使用 PokéRadar。"}),`
`,n.jsx(e.li,{children:"在不中断连锁的前提下，走入正确的草丛。"}),`
`,n.jsx(e.li,{children:"捕捉你的异色宝可梦！"}),`
`]}),`
`,n.jsx(e.p,{children:"恭喜，你已经成功完成一次 PokéRadar 异色乱数！"}),`
`,n.jsx(e.h2,{children:"乱数工具"}),`
`,n.jsx(l,{}),`
`,n.jsx(e.h2,{children:"Credits"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["wwwwwwzx for reverse engineering this logic, ",n.jsx(e.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool",children:"3DSRNGTool, and TinyTimeline"}),"."]}),`
`,n.jsxs(e.li,{children:["Bambo_Rambo for ",n.jsx(e.a,{href:"https://github.com/Bambo-Rambo/TinyFinder",children:"TinyFinder"}),", which this tool is based on, and their ",n.jsx(e.a,{href:"https://github.com/Bambo-Rambo/RNG-Guides/blob/main/DexNavRNG.md",children:"DexNav guide"}),", which has help info."]}),`
`,n.jsx(e.li,{children:"Vlad and Shiny_Sylveon for answering questions while this tool was being built."}),`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function x(i={}){const{wrapper:e}={...h(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(s,{...i})}):s(i)}function d(i,e){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default,c as frontmatter};
