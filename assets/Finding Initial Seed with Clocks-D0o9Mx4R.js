import{ii as s,j as n}from"./index-CLgpAzd3.js";const c=[{title:"究极之日 / 究极之月 使用时钟寻找初始 Seed",description:"学习如何通过时钟指针的规律来寻找《究极之日 / 究极之月》的初始 Seed —— 无需破解系统。",slug:"zh-retail-usum-initial-seed-clocks",translation:{enSlug:"retail-usum-initial-seed-clocks",language:"zh"}},{title:"日 / 月 使用时钟寻找初始 Seed",description:"学习如何通过时钟指针的规律来寻找《日 / 月》的初始 Seed —— 无需破解系统。",slug:"zh-retail-sm-initial-seed-clocks",translation:{enSlug:"retail-sm-initial-seed-clocks",language:"zh"}}];function i(l){const e={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...s(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"摄像设备（手机摄像头即可）"}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,n.jsx(e.h2,{children:"基本原理"}),`
`,n.jsxs(e.p,{children:["每次启动游戏时，都会生成一个 ",n.jsx(e.code,{children:"initial seed"}),"（也称为 ",n.jsx(e.code,{children:"seed"}),"）。这个 seed 会用于野生宝可梦、事件、游戏内赠送宝可梦等内容的乱数判定。"]}),`
`,n.jsxs(e.p,{children:['在游戏的"Continue（继续）"画面中，在角色头像加载出来之前，你可以看到一个时钟。通过观察时钟指针最终停留的位置，我们就可以反推出初始 Seed。在不重启游戏的情况下，你需要记录 8～10 次时钟。你可以按下 ',n.jsx(e.code,{children:"B"}),' 键离开"Continue"画面。']}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/UltraSun-UltraMoon/Initial-Seed/ClockNeedles.gif",alt:"Clocks Needles"})}),`
`,n.jsx(e.h2,{children:"第一步：设置 3DSRNGTool"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开你下载的 3DSRNGTool。"}),`
`,n.jsx(e.li,{children:'在右上角选择你的游戏版本（"太阳""月亮""究极之日" 或 "究极之月"）。'}),`
`,n.jsx(e.li,{children:'进入 "工具" > "7代主乱数工具"。'}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/UltraSun-UltraMoon/Initial-Seed/Setup.png",alt:"Setup"})}),`
`,n.jsxs(e.ol,{start:"4",children:[`
`,n.jsxs(e.li,{children:["确认 ",n.jsx(e.code,{children:"输入"})," 中选择了 ",n.jsx(e.code,{children:"结束位置"}),"，并且数值为 ",n.jsx(e.code,{children:"4"}),"。"]}),`
`,n.jsxs(e.li,{children:["同时勾选 ",n.jsx(e.code,{children:"通过指针检索初始seed"})," 选项。"]}),`
`]}),`
`,n.jsx(e.h2,{children:"第二步：录制时钟指针"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:['启动 3DS 并进入游戏，停留在 "按 Start 键" 画面。',`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"可以让动画正常播放，它们不会影响 Seed 或帧数。"}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:"使用摄像设备开始录制你的 3DS 屏幕。"}),`
`,n.jsxs(e.li,{children:["按下 ",n.jsx(e.code,{children:"A"})," 或 ",n.jsx(e.code,{children:"Start"}),' 进入 "继续游戏" 画面。',`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:'需要完整录下整个时钟的运动过程：从进入 "继续游戏" 画面开始，到角色头像出现为止。'}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:["按下 ",n.jsx(e.code,{children:"B"}),' 返回 "按 Start 键" 画面。']}),`
`,n.jsx(e.li,{children:'在 "按 Start 键" 与 "继续游戏" 画面之间来回切换，直到记录到 10 次时钟指针的运动。'}),`
`]}),`
`,n.jsx(e.h2,{children:"第三步：查找 Seed"}),`
`,n.jsx(e.p,{children:"在录制好 10 次时钟后，将结果输入工具以查找初始 Seed。"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["在 ",n.jsx(e.code,{children:"输入"})," 中，选择每一次时钟最终停留位置所对应的选项。",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"这里的结束位置指的是角色头像加载出来之前的最终位置。"}),`
`,n.jsx(e.li,{children:"在本文开头展示的 gif 中，对应的结束位置是7代主乱数工具中的最后一个选项。"}),`
`,n.jsxs(e.li,{children:["你会看到一个数字出现在 ",n.jsx(e.code,{children:"指针列表"})," 中（gif 示例中为 12）。"]}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:"当你输入了 8 个指针位置后，工具就会尝试计算初始 Seed。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/UltraSun-UltraMoon/Initial-Seed/Result.png",alt:"Result"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["仅输入 8 个指针位置时，可能会得到多个结果，这也是我们要记录 10 次时钟的原因。继续输入剩余的 2 个指针位置，直到只剩下一个 Seed。",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"最后 2 个指针位置用于确认 Seed 是否正确。"}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:"如果没有任何结果，请重新检查录像，确认指针位置是否有录入错误。"}),`
`,n.jsx(e.li,{children:"如果仍然无法得到结果，请重启游戏并重新录制 10 次时钟。"}),`
`]}),`
`,n.jsxs(e.p,{children:["如果操作正确，最终你的初始 Seed 会显示在 ",n.jsx(e.code,{children:"检索结果"})," 栏中。"]}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function r(l={}){const{wrapper:e}={...s(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(i,{...l})}):i(l)}export{r as default,c as frontmatter};
