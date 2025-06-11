import{q as r,j as n}from"./index-C8jU3vOd.js";const c={title:"火红叶绿孵化乱数",navDrawerTitle:"Egg RNG",description:"在火红/叶绿中进行蛋的乱数",slug:"zh-emulator-frlg-egg",translation:{enSlug:"emulator-frlg-egg",language:"zh"}};function i(l){const e={a:"a",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...r(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/mgba-setup",children:"带有 Lua 脚本的 mGBA 模拟器"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,n.jsx(e.li,{children:"父母个体值与相性（向培育屋老爷爷询问）"}),`
`,n.jsx(e.li,{children:"表 ID 与里 ID（如需孵化闪光个体）"}),`
`]}),`
`,n.jsx(e.h2,{children:"简介"}),`
`,n.jsx(e.p,{children:"在火红/叶绿中，蛋的 PID 是分两步生成的：蛋生成时会决定 PID 的前半部分，而领取蛋时决定后半部分。"}),`
`,n.jsx(e.h2,{children:"准备阶段"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"将宝可梦交给培育屋。请确保父母都未携带道具，放入顺序没有影响。"}),`
`,n.jsx(e.li,{children:"待在培育屋内行走，直到 Lua 脚本显示步数计数为 1。必须在培育屋内部完成这一步。"}),`
`,n.jsx(e.li,{children:"达成条件后，在此处建立即时存档点。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/FireRed-LeafGreen/Egg/Setup.png",alt:"Setup"})}),`
`,n.jsx(e.h2,{children:"设置 PokeFinder"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 PokeFinder，选择第三世代孵化乱数，并确保切换到火红/叶绿的标签页。"}),`
`,n.jsx(e.li,{children:"输入双亲的所有信息，包括他们的相性。"}),`
`,n.jsx(e.li,{children:"帧数范围可以自由设定，但“生成帧”（Frame Held）上限必须低于“领取帧”（Pickup Frame）下限。"}),`
`,n.jsx(e.li,{children:"输入 Lua 脚本中显示的初始种子，开始查找个体组合。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/FireRed-LeafGreen/Egg/Initial-Seed.png",alt:"初始种子"})}),`
`,n.jsxs(e.ol,{start:"5",children:[`
`,n.jsx(e.li,{children:"找到目标组合后，请注意需要命中两个不同的帧数。"}),`
`]}),`
`,n.jsx(e.h2,{children:"生成帧乱数"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["在 PokeFinder 中，从目标帧中减去 18，并在该帧数上走一步。在模拟器暂停状态下使用 CTRL + N 推进帧数。到达目标帧时，按住方向键并取消暂停。",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"若未生成蛋，请检查输入是否有误；若确认无误，可尝试延迟为 17 或 19。"}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:"行走后，Lua 脚本会显示 PID 的后半部分。若与目标匹配，可继续进行；若不符，请反查延迟后并再次尝试。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/FireRed-LeafGreen/Egg/Held.png",alt:"Held Frame"})}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsx(e.li,{children:"至此，生成帧的乱数已完成。接下来是领取帧的乱数。"}),`
`]}),`
`,n.jsx(e.h2,{children:"领取帧乱数"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"为防止错过按键时机，建议先建立一个即时存档点。"}),`
`,n.jsx(e.li,{children:"离开培育屋，与老爷爷对话并接受蛋。在出现最后一句对话（“请好好照顾它。”）时暂停模拟器。"}),`
`,n.jsxs(e.li,{children:["推进到目标帧数，按住 A 键并取消暂停。",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"领取帧的标准延迟为 3。如果不匹配，可尝试延迟 2 或 4。"}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.p,{children:"如果成功，蛋的后半 PID 就会与目标一致。"}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/FireRed-LeafGreen/Egg/Success.png",alt:"成功！"})}),`
`,n.jsx(e.p,{children:"若失败，请重新检查操作步骤，并合理利用即时存档进行调整与重试。"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function d(l={}){const{wrapper:e}={...r(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(i,{...l})}):i(l)}export{d as default,c as frontmatter};
