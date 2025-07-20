import{E as h,j as e}from"./index-BDmOU5kO.js";const j={title:"红蓝宝石实机TID乱数指南",description:"学习如何在红宝石和蓝宝石中获取你想要的TID和SID组合。",slug:"zh-retail-rubysapphire-tid",translation:{enSlug:"retail-rubysapphire-tid",language:"zh"}};function o(i){const n={code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...h(),...i.components},{RsTidSearcher:l,RsTidSidGenerator:t,RsTidTimer:c,Step:s,Stepper:d}=n;return l||r("RsTidSearcher"),t||r("RsTidSidGenerator"),c||r("RsTidTimer"),s||r("Step"),d||r("Stepper"),e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"在第三世代中进行乱数操作，可以让你获得精确的TID与SID组合。这在想要获取特定异色宝可梦时非常有用，因为你可以预知自己的SID。"}),`
`,e.jsx(n.p,{children:"本指南适用于红宝石/蓝宝石电池已耗尽的卡带。如果你的卡带电池仍正常运作，本方法将无法使用。"}),`
`,e.jsxs(d,{titles:["寻找目标TID","进行TID乱数"],children:[e.jsxs(s,{step:0,children:[e.jsx(n.h2,{children:"第一步：寻找目标TID"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"使用下方工具搜索你想要的TID（可包含特定SID组合）；"}),`
`,e.jsx(n.li,{children:"如果没有搜索结果，可以尝试提高最大推进帧数，不过这会让每次尝试所需等待时间变长；"}),`
`,e.jsx(n.li,{children:"选择你要的目标TID，进入下一步。"}),`
`]}),e.jsx(t,{})]}),e.jsxs(s,{step:1,children:[e.jsx(n.h2,{children:"第二步：执行TID乱数"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"启动游戏；"}),`
`,e.jsxs(n.li,{children:["启动下方计时器。当第一个计时器结束时，同时按下 ",e.jsx(n.code,{children:"Start + Select + A + B"})," 重置游戏；"]}),`
`,e.jsx(n.li,{children:"一直进行游戏，直到出现最终等待界面（如下图所示）；"}),`
`,e.jsxs(n.li,{children:["等第二个计时器结束后，按 ",e.jsx(n.code,{children:"A"})," 来生成你的TID；"]}),`
`,e.jsx(n.li,{children:"将你获得的TID输入到下方工具的“Hit TID”栏，并点击“Generate”；"}),`
`,e.jsx(n.li,{children:"在结果中选择你命中的TID，用以更新计时器。若有多个结果，选择最接近目标TID的那一个；"}),`
`,e.jsx(n.li,{children:"重复以上操作，直到你命中目标TID。如果偏差在1~2帧以内，可以不必重新校准，直接再次尝试即可。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/TID/RubyTIDFinalScreen.png",alt:"最终等待界面"})}),e.jsx(c,{}),e.jsx(l,{})]})]}),`
`,e.jsx(n.h2,{children:"鸣谢"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"EzPz：工具逻辑与界面设计"}),`
`,e.jsx(n.li,{children:"Shiny_Sylveon：撰写本指南"}),`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function p(i={}){const{wrapper:n}={...h(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}function r(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default,j as frontmatter};
