import{g7 as l,j as n}from"./index-BHpZFTvZ.js";const d={title:"心金魂银初始种子乱数",description:"学习如何在《心金》和《魂银》中进行初始种子乱数。",slug:"zh-hgss-initial-seed",translation:{enSlug:"hgss-initial-seed",language:"zh"}};function i(s){const e={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...l(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.pre,{children:n.jsx(e.code,{children:`本指南假设你已经找到了目标种子。开始前请准备好目标种子和对应延迟值。
`})}),`
`,n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/desmume-setup",children:"Desmume 模拟器"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://www.nirsoft.net/utils/run_as_date.html",children:"RunAsDate 工具"})}),`
`]}),`
`,n.jsx(e.h3,{children:"什么是 RunAsDate？"}),`
`,n.jsx(e.p,{children:"RunAsDate 是 Nirsoft 提供的一款工具，可以让你指定任意时间运行某个程序。在第四世代乱数中非常实用，可以帮助你更轻松地命中目标种子。"}),`
`,n.jsx(e.h2,{children:"配置 RunAsDate"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"启动 RunAsDate。"}),`
`,n.jsx(e.li,{children:"按照下图进行设置："}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/HeartGold-SoulSilver/Initial-Seed/Setup.png",alt:"Setup"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`此设置只需配置一次，适用于第三、第四和第五世代的所有乱数操作。你已经完成了大部分准备！
`})}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsx(e.li,{children:"点击“Browse...”选择你想要设置日期时间的程序（即 Desmume 模拟器）。"}),`
`,n.jsx(e.li,{children:"将日期和时间设置为你在 PokeFinder 中对应目标种子所需的时间。"}),`
`,n.jsx(e.li,{children:"点击“Run”按钮，即可使用设定好的时间启动 Desmume。"}),`
`]}),`
`,n.jsx(e.h2,{children:"命中目标种子"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`请在操作过程中多使用即时存档。
`})}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"载入 Lua 脚本。"}),`
`,n.jsxs(e.li,{children:["快速按 ",n.jsx(e.code,{children:"A"})," 跳转到“继续游戏”画面。"]}),`
`,n.jsxs(e.li,{children:["使用 ",n.jsx(e.code,{children:"Ctrl + P"})," 暂停模拟器。"]}),`
`,n.jsx(e.li,{children:"保存多个即时存档，以备不时之需。"}),`
`,n.jsx(e.li,{children:"解除暂停，运行游戏直到接近目标延迟。"}),`
`,n.jsx(e.li,{children:"一旦接近目标延迟，再次暂停模拟器。"}),`
`,n.jsx(e.li,{children:"再次保存一个即时存档（以防万一）。"}),`
`,n.jsxs(e.li,{children:["每按一次 ",n.jsx(e.code,{children:"N"}),"，会推进一帧画面，也就相当于增加一单位延迟。"]}),`
`,n.jsxs(e.li,{children:["当你达到目标延迟时，按住 ",n.jsx(e.code,{children:"A"})," 键并解除暂停，开始游戏。"]}),`
`]}),`
`,n.jsx(e.h2,{children:"常见问题排查"}),`
`,n.jsxs(e.p,{children:["有时即使你在正确延迟按下了 ",n.jsx(e.code,{children:"A"}),"，实际命中的延迟也可能偏差 ±1。这是第四世代乱数的特性之一，因为延迟值可能被固定为全是偶数或全是奇数。你可以使用以下方法切换奇偶延迟。"]}),`
`,n.jsx(e.h3,{children:"改变年份"}),`
`,n.jsx(e.p,{children:"关闭模拟器，并将 RunAsDate 中的年份修改为前一年或后一年。这个变化会切换延迟的奇偶性。你可以在 PokeFinder 的“Seed to Time”窗口中更换年份来验证延迟是否变化。确认无误后，使用新的时间设置重新运行 Desmume 并载入即时存档，再次尝试乱数。"}),`
`,n.jsx(e.h3,{children:"载入 GBA 游戏"}),`
`,n.jsx(e.p,{children:"在模拟器的 GBA 插槽中加载一款 GBA 游戏，也可以切换延迟的奇偶性。"}),`
`,n.jsx(e.h3,{children:"使用继续游戏画面切换"}),`
`,n.jsx(e.p,{children:"在“继续游戏”画面，使用触摸屏点击下箭头把画面向下滚动，再点击上箭头把画面拉回原位，随后返回游戏标题界面再次进入。这个操作也可以切换延迟的奇偶性。"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function h(s={}){const{wrapper:e}={...l(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(i,{...s})}):i(s)}export{h as default,d as frontmatter};
