import{Q as s,j as n}from"./index-DOlHlz85.js";const c={title:"钻石珍珠白金 实机初始种子乱数",description:"学习如何在实机上对钻石、珍珠与白金的初始种子进行乱数。",slug:"zh-dppt-initial-seed-retail",translation:{enSlug:"dppt-initial-seed-retail",language:"zh"}};function l(i){const e={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.pre,{children:n.jsx(e.code,{children:`本指南默认你已经找到目标种子。开始前请准备好目标种子和延迟值。
`})}),`
`,n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/mystic-timer",children:"Mystic Timer"})}),`
`]}),`
`,n.jsx(e.h2,{children:"校准值"}),`
`,n.jsx(e.p,{children:"钻石/珍珠："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"延迟：600"}),`
`,n.jsx(e.li,{children:"秒数：14"}),`
`]}),`
`,n.jsx(e.p,{children:"白金："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"延迟：575"}),`
`,n.jsx(e.li,{children:"秒数：14"}),`
`]}),`
`,n.jsx(e.h2,{children:"第一步：设置 Mystic Timer"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 Mystic Timer，并根据你的游戏版本输入上方的校准值。"}),`
`,n.jsx(e.li,{children:"填写你的目标延迟和目标秒数。"}),`
`,n.jsx(e.li,{children:"记下“距离目标前的分钟数（Minutes Before Target）”。"}),`
`]}),`
`,n.jsx(e.h2,{children:"第二步：设置主机时间"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"将主机时间设置为：目标时间减去“Minutes Before Target”所显示的时间。"}),`
`,n.jsxs(e.li,{children:["同时按下 ",n.jsx(e.code,{children:"A"})," 确认时间并启动 Mystic Timer。"]}),`
`]}),`
`,n.jsx(e.h2,{children:"第三步：命中初始种子"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"当第一个计时器结束时，启动游戏。"}),`
`,n.jsxs(e.li,{children:["当第二个计时器结束时，按 ",n.jsx(e.code,{children:"A"})," 进入存档。"]}),`
`]}),`
`,n.jsx(e.h2,{children:"第四步：调整延迟"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"根据你正在使用的乱数流程指南，校准种子。"}),`
`,n.jsx(e.li,{children:"将实际命中的延迟填写进 Mystic Timer 的 “Delay Hit” 栏，并点击更新计时器。"}),`
`,n.jsx(e.li,{children:"回到第二步，重新设置主机时间再尝试。"}),`
`,n.jsx(e.li,{children:"如有需要，多次重复直到命中目标种子。"}),`
`]}),`
`,n.jsx(e.h2,{children:"奇偶延迟调整（调整 Delay 的奇偶性）"}),`
`,n.jsx(e.p,{children:"第四世代的延迟只能为奇数或偶数之一。如果你总是差 1 延迟，可以通过以下方法切换奇偶性："}),`
`,n.jsx(e.h3,{children:"方法一：修改年份"}),`
`,n.jsx(e.p,{children:"将系统年份增加或减少一年。这样也会改变延迟。在 PokeFinder 的“Seed to Time”功能中确认新的延迟类型。"}),`
`,n.jsx(e.h3,{children:"方法二：插入 GBA 卡带"}),`
`,n.jsx(e.p,{children:"在 DS 主机上插入一张 GBA 卡带，可以让延迟从奇数变为偶数，或从偶数变为奇数。"}),`
`,n.jsx(e.h3,{children:"方法三：继续画面切换法"}),`
`,n.jsxs(e.p,{children:["进入游戏时选择“开始新游戏”，随后按 ",n.jsx(e.code,{children:"B"})," 返回“继续游戏”画面，这样也可以切换延迟的奇偶性。"]}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function h(i={}){const{wrapper:e}={...s(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(l,{...i})}):l(i)}export{h as default,c as frontmatter};
