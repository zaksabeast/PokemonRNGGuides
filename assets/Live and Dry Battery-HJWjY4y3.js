import{g7 as i,j as n}from"./index-BQ_qSqp-.js";const h={title:"红蓝宝石 电池有电 vs 无电 乱数对比",description:"了解红宝石与蓝宝石在电池有电和电池耗尽情况下的乱数方法差异，以及这些差异如何影响宝可梦结果。",slug:"zh-rs-battery",translation:{enSlug:"rs-battery",language:"zh"}};function s(l){const e={a:"a",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...i(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"前言"}),`
`,n.jsx(e.p,{children:"本指南解释了红宝石与蓝宝石在电池有电和无电状态下的乱数原理，适用于模拟器和实机用户，同时解答新手常见疑问。"}),`
`,n.jsx(e.p,{children:"我们将分别介绍有电池与无电池的乱数方法，原理如何运作，并帮助你选择适合的方式。"}),`
`,n.jsx(e.h2,{children:"无电池"}),`
`,n.jsx(e.p,{children:"如果你熟悉绿宝石的乱数，这部分将会很眼熟。"}),`
`,n.jsx(e.p,{children:"所谓无电池（电池耗尽），意味着实时时钟不再工作。比如树果不再生长、时间事件失效。"}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"在无电池状态下，你的初始种子总是5A0。"})}),`
`,n.jsx(e.p,{children:"这对实机玩家非常友好。和绿宝石一样，每次启动游戏都从同一个地方开始，所以更容易命中目标帧。"}),`
`,n.jsx(e.p,{children:"与绿宝石相比，有两个主要区别："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"初始种子是5A0（不是0）"}),`
`,n.jsx(e.li,{children:"不能使用战斗录像功能"}),`
`]}),`
`,n.jsxs(e.p,{children:["现在你也可以使用",n.jsx(e.a,{href:"/emerald-painting-rng",children:"绘画种子法"}),"改变初始种子。这使得你可以像有电池那样自由选择种子。"]}),`
`,n.jsx(e.h2,{children:"有电池"}),`
`,n.jsx(e.p,{children:"有电池的方法最适合在模拟器上使用。原理如下："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"游戏内每过一分钟 = 一个新的初始种子"}),`
`,n.jsx(e.li,{children:"如果时钟设定相同，就会得到相同的种子"}),`
`,n.jsx(e.li,{children:"工具如 PokeFinder 可以根据种子反查具体时间"}),`
`]}),`
`,n.jsx(e.p,{children:"过去，有电池因为能任意选种子而被认为更强，但随着绘画法的发展，无电池现在也可以做到相似的效果。不过如果你能设置时钟，有电池依然很实用，特别是在模拟器上。"}),`
`,n.jsx(e.h3,{children:"那实机怎么办？"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"拆下电池再装回去，重置时钟"}),`
`,n.jsx(e.li,{children:"等待目标时间来临以命中种子"}),`
`]}),`
`,n.jsxs(e.p,{children:[`这种方式每分钟只有一次尝试机会。为了更方便，可以使用这个工具：
`,n.jsx(e.a,{href:"https://github.com/megaboyexe/GBA_RTCRead",children:"使用这个工具设置RTC"})]}),`
`,n.jsx(e.p,{children:"它可以在电池正常的游戏中直接设定时钟。"}),`
`,n.jsx(e.h2,{children:"哪种方式更好？"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"如果你能控制RTC（例如在模拟器中），使用有电池"}),`
`,n.jsx(e.li,{children:"如果不能（例如实机），使用无电池"}),`
`,n.jsx(e.li,{children:"无论哪种方式，都可以使用 绘画法 来命中任意种子"}),`
`]}),`
`,n.jsx(e.p,{children:"乱数的本质流程在两者之间是相同的。你只需根据实际情况决定如何获得初始种子即可。"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function c(l={}){const{wrapper:e}={...i(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(s,{...l})}):s(l)}export{c as default,h as frontmatter};
