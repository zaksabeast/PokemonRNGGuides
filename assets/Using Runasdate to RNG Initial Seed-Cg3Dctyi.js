import{u as l,j as n}from"./index-nav2MFdL.js";const t=[{title:"黑白2初始seed乱数",description:"学习如何在黑白2中乱数你的初始seed",slug:"zh-emulator-b2w2-runasdate-inital-seed",translation:{enSlug:"emulator-b2w2-runasdate-inital-seed",language:"zh"}},{title:"黑白初始seed乱数",description:"学习如何在黑白中乱你的初始seed",slug:"zh-emulator-bw-runasdate-initial-seed",translation:{enSlug:"emulator-bw-runasdate-initial-seed",language:"zh"}}];function i(s){const e={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...l(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.pre,{children:n.jsx(e.code,{children:`本指南假设你已经选好目标种子。在跟随本指南操作之前，请确保已确认目标种子。
`})}),`
`,n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://www.nirsoft.net/utils/run_as_date.html",children:"RunAsDate"})}),`
`]}),`
`,n.jsx(e.h3,{children:"什么是 RunAsDate？"}),`
`,n.jsx(e.p,{children:"RunAsDate 是 Nirsoft 开发的一款工具，可以让程序以用户指定的时间启动。在第五世代乱数中，它可以帮助你更轻松地命中目标种子。本指南仅聚焦于 RunAsDate 的使用。"}),`
`,n.jsx(e.h2,{children:"第一步：设置 RunAsDate"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 RunAsDate。"}),`
`,n.jsx(e.li,{children:"按下方图片进行配置。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Black-and-White/Initial-Seed/Setup.png",alt:"Setup"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`这个配置只需设定一次。这是适用于第三、第四和第五世代乱数的通用 RunAsDate 配置。
`})}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsx(e.li,{children:"点击 Browse... 按钮，选择你希望伪装时间的程序（Desmume 模拟器）。"}),`
`,n.jsx(e.li,{children:"将日期和时间设置为 PokeFinder 给出的其中一个时间，以命中目标种子。"}),`
`,n.jsx(e.li,{children:"点击 Run，Desmume 将以你选择的日期和时间启动。"}),`
`]}),`
`,n.jsx(e.p,{children:"此时，Desmume 将运行在你设定的时间环境下。"}),`
`,n.jsx(e.h2,{children:"第二步：命中目标种子"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"加载你的游戏存档。"}),`
`,n.jsx(e.li,{children:"加载 Lua 脚本。"}),`
`,n.jsx(e.li,{children:"根据需要执行按键操作以命中目标种子。"}),`
`,n.jsx(e.li,{children:"完成后，即可像普通乱数那样继续操作！"}),`
`]}),`
`,n.jsx(e.h2,{children:"问题排除"}),`
`,n.jsx(e.p,{children:"如果使用 RunAsDate 后第一次未能命中正确的种子，请检查以下内容："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"RunAsDate 设置的时间是否正确。"}),`
`,n.jsx(e.li,{children:"乱数配置文件是否正确。"}),`
`,n.jsx(e.li,{children:"命中种子所需的按键操作是否正确执行。"}),`
`]}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})}function d(s={}){const{wrapper:e}={...l(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(i,{...s})}):i(s)}export{d as default,t as frontmatter};
