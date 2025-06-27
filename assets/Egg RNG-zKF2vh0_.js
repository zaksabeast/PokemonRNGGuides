import{v as s,j as n}from"./index-Djrs8QSX.js";const c={title:"孵化乱数",description:"从培育屋乱数孵化宝可梦蛋",slug:"zh-emulator-rs-egg",translation:{enSlug:"emulator-rs-egg",language:"zh"}};function l(i){const e={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/mgba-setup",children:"带有 Lua 脚本的 mGBA 模拟器"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,n.jsx(e.li,{children:"父母个体值与相性（向培育屋老爷爷询问）"}),`
`,n.jsx(e.li,{children:"表 ID 与里 ID（如需孵化闪光个体）"}),`
`]}),`
`,n.jsx(e.h2,{children:"简介"}),`
`,n.jsx(e.p,{children:"在红宝石/蓝宝石中，蛋的PID是分为两部分生成的。蛋生成时会决定 PID 的前半部分，领取蛋时决定后半部分。"}),`
`,n.jsx(e.p,{children:"红宝石/蓝宝石的蛋乱数在实电池与干电池环境下都可以进行。"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：在红宝石与蓝宝石中，持有不变之石并不能遗传性格。
`})}),`
`,n.jsx(e.h2,{children:"准备阶段"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"将宝可梦交给培育屋。请确保父母都未携带道具，放入顺序没有影响。"}),`
`,n.jsx(e.li,{children:"待在培育屋内行走，直到 Lua 脚本显示步数计数为 FE。必须在培育屋内部完成这一步。"}),`
`,n.jsx(e.li,{children:"达成条件后，在此处建立即时存档点。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Ruby-Sapphire/Egg/Setup.png",alt:"Setup"})}),`
`,n.jsx(e.h2,{children:"PokeFinder 设置"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 PokeFinder，选择第 3 世代孵化乱数，并确保切换到红宝石/蓝宝石的标签页。"}),`
`,n.jsx(e.li,{children:"输入双亲的所有信息，包括他们的相性。"}),`
`,n.jsx(e.li,{children:"帧数范围可以自由设定，但“生成帧”（Frame Held）上限必须低于“领取帧”（Pickup Frame）下限。"}),`
`,n.jsx(e.li,{children:"输入 Lua 脚本中显示的初始种子，开始查找个体组合。如果是干电池，红宝石/蓝宝石的初始种子固定为 5A0。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Ruby-Sapphire/Egg/Initial-Seed.png",alt:"Initial Seed"})}),`
`,n.jsxs(e.ol,{start:"5",children:[`
`,n.jsx(e.li,{children:"找到目标组合后，请注意需要命中两个不同的帧数。"}),`
`]}),`
`,n.jsx(e.h2,{children:"生成帧乱数"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"在正确的帧数上向前走一步以生成蛋。在模拟器暂停时可使用 CTRL + N 一帧一帧推进。当推进到目标帧数时，按住方向键并取消暂停。对于 PokeFinder，需要从目标帧数中减去 18，在这个帧数上行走一步。如果未生成蛋，请确认输入信息并尝试使用延迟 17 或 19。"}),`
`,n.jsx(e.li,{children:"行走后，脚本会显示 PID 的后半部分。如果匹配目标，就可以继续；若不匹配，请重启模拟器或尝试下一个生成帧。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Ruby-Sapphire/Egg/Held.png",alt:"Held Frame"})}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsx(e.li,{children:"至此，生成帧的乱数已完成。接下来是领取帧的乱数。"}),`
`]}),`
`,n.jsx(e.h2,{children:"领取帧乱数"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"为防止错过按键时机，建议先建立一个即时存档点。"}),`
`,n.jsx(e.li,{children:"离开培育屋，与老爷爷对话并接受蛋。在出现最后一句对话（“请好好照顾它。”）时暂停模拟器。"}),`
`,n.jsx(e.li,{children:"推进到目标帧数，暂停，按住 A 键并取消暂停。领取帧的标准延迟为 3。如果蛋的 PID 不正确，可尝试延迟 2 或 4。"}),`
`]}),`
`,n.jsx(e.p,{children:"这样你就会获得目标 PID 的第二部分，从而完成整个蛋乱数。"}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Ruby-Sapphire/Egg/Success.png",alt:"Success"})}),`
`,n.jsx(e.p,{children:"若结果不符，请重新检查整个流程，并善用即时存档点进行尝试。"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function h(i={}){const{wrapper:e}={...s(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(l,{...i})}):l(i)}export{h as default,c as frontmatter};
