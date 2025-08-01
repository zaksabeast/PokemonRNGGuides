import{E as s,j as n}from"./index-CFCUTKwJ.js";const d=[{title:"初始种子乱数",description:"如何在《钻石, 珍珠, 白金》中进行初始种子乱数",slug:"zh-dppt-initial-seed",translation:{enSlug:"dppt-initial-seed",language:"zh"}}];function l(i){const e={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.pre,{children:n.jsx(e.code,{children:`本指南假设你已经找到目标种子，在进行本教程前你需要知道目标种子和目标延迟。
`})}),`
`,n.jsx(e.h2,{children:"Tools"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://www.nirsoft.net/utils/run_as_date.html",children:"RunAsDate"})}),`
`]}),`
`,n.jsx(e.h3,{children:"什么是 RunAsDate?"}),`
`,n.jsx(e.p,{children:"RunAsDate 是一个让程序以指定时间启动的工具，适用于第四世代乱数，它可以让你精准地命中种子。"}),`
`,n.jsx(e.h2,{children:"设置 RunAsDate"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 RunAsDate。"}),`
`,n.jsx(e.li,{children:"按照下图进行配置。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Diamond-Pearl-Platinum/Initial-Seed/Setup.png",alt:"Setup"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`该配置适用于 Gen 3、Gen 4 和 Gen 5 乱数，不需要更改。
`})}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsx(e.li,{children:"点击 Browse... 选择Desmume。"}),`
`,n.jsxs(e.li,{children:["设置日期和时间，与 ",n.jsx(e.a,{href:"/pokefinder",children:"PokeFinder"})," 显示的目标时间一致。",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:'右键点击目标种子，选择 "为seed生成时间" 来获得具体时间。'}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:"点击 Run 以目标时间启动 Desmume。"}),`
`]}),`
`,n.jsx(e.h2,{children:"命中目标种子"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`在整个过程中经常进行即时保存，以防出错。
`})}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"加载 Lua 脚本（用于实时查看当前种子）。"}),`
`,n.jsx(e.li,{children:'快速点击 A 进入 "继续" 屏幕。'}),`
`,n.jsx(e.li,{children:"使用 Ctrl + P 暂停模拟器。"}),`
`,n.jsx(e.li,{children:"创建多个即时存档点。"}),`
`,n.jsx(e.li,{children:"取消暂停，让游戏运行，接近目标延迟。"}),`
`,n.jsx(e.li,{children:"接近目标延迟时，暂停模拟器。"}),`
`,n.jsx(e.li,{children:"创建一个新的即时存档点。"}),`
`,n.jsx(e.li,{children:"按 N 逐帧推进游戏，以精准调整延迟。"}),`
`,n.jsx(e.li,{children:"达到目标延迟时，按住 A 并取消暂停。"}),`
`]}),`
`,n.jsx(e.h2,{children:"问题排查"}),`
`,n.jsx(e.p,{children:"如果你 按 A 进入游戏的时机正确，但命中的延迟 偏差 ±1，可能是由于 Gen 4 的 Delay 只会是奇数或偶数。你可以通过以下方法切换奇数 / 偶数延迟："}),`
`,n.jsx(e.h3,{children:"修改年份"}),`
`,n.jsx(e.p,{children:'关闭模拟器，在 PokeFinder 的 "Seed to Time" 窗口中将年份调早或调晚一年并生成确认新延迟，修改RunAsDate 的年份时间，重新启动 Desmume ，使用新的延迟进行乱数。'}),`
`,n.jsx(e.h3,{children:"加载 GBA 游戏"}),`
`,n.jsx(e.p,{children:"在 Desmume 的 GBA 插槽中加载任意 GBA 游戏，可以切换 Delay 奇偶性。"}),`
`,n.jsx(e.h3,{children:"利用“继续游戏”画面"}),`
`,n.jsx(e.p,{children:"选择从头开始游戏，按 B 取消，返回继续游戏界面。这样可以切换当前延迟的奇偶性，再尝试乱数。"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function h(i={}){const{wrapper:e}={...s(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(l,{...i})}):l(i)}export{h as default,d as frontmatter};
