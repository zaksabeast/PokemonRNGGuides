import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-jyHeP0dh.js";var n=e(),r={title:`火红叶绿孵化乱数`,navDrawerTitle:`Egg RNG`,description:`在火红/叶绿中进行蛋的乱数`,slug:`zh-emulator-frlg-egg`,translation:{enSlug:`emulator-frlg-egg`,language:`zh`}};function i(e){let r={a:`a`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`带有 Lua 脚本的 mGBA 模拟器`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:`父母个体值与相性（向培育屋老爷爷询问）`}),`
`,(0,n.jsx)(r.li,{children:`表 ID 与里 ID（如需孵化闪光个体）`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`简介`}),`
`,(0,n.jsx)(r.p,{children:`在火红/叶绿中，蛋的 PID 是分两步生成的：蛋生成时会决定 PID 的前半部分，而领取蛋时决定后半部分。`}),`
`,(0,n.jsx)(r.h2,{children:`准备阶段`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`将宝可梦交给培育屋。请确保父母都未携带道具，放入顺序没有影响。`}),`
`,(0,n.jsx)(r.li,{children:`待在培育屋内行走，直到 Lua 脚本显示步数计数为 1。必须在培育屋内部完成这一步。`}),`
`,(0,n.jsx)(r.li,{children:`达成条件后，在此处建立即时存档点。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Egg/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsx)(r.h2,{children:`设置 PokeFinder`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 PokeFinder，选择第三世代孵化乱数，并确保切换到火红/叶绿的标签页。`}),`
`,(0,n.jsx)(r.li,{children:`输入双亲的所有信息，包括他们的相性。`}),`
`,(0,n.jsx)(r.li,{children:`帧数范围可以自由设定，但“生成帧”（Frame Held）上限必须低于“领取帧”（Pickup Frame）下限。`}),`
`,(0,n.jsx)(r.li,{children:`输入 Lua 脚本中显示的初始种子，开始查找个体组合。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Egg/Initial-Seed.png`,alt:`初始种子`})}),`
`,(0,n.jsxs)(r.ol,{start:`5`,children:[`
`,(0,n.jsx)(r.li,{children:`找到目标组合后，请注意需要命中两个不同的帧数。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`生成帧乱数`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`在 PokeFinder 中，从目标帧中减去 18，并在该帧数上走一步。在模拟器暂停状态下使用 CTRL + N 推进帧数。到达目标帧时，按住方向键并取消暂停。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`若未生成蛋，请检查输入是否有误；若确认无误，可尝试延迟为 17 或 19。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`行走后，Lua 脚本会显示 PID 的后半部分。若与目标匹配，可继续进行；若不符，请反查延迟后并再次尝试。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Egg/Held.png`,alt:`Held Frame`})}),`
`,(0,n.jsxs)(r.ol,{start:`3`,children:[`
`,(0,n.jsx)(r.li,{children:`至此，生成帧的乱数已完成。接下来是领取帧的乱数。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`领取帧乱数`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`为防止错过按键时机，建议先建立一个即时存档点。`}),`
`,(0,n.jsx)(r.li,{children:`离开培育屋，与老爷爷对话并接受蛋。在出现最后一句对话（“请好好照顾它。”）时暂停模拟器。`}),`
`,(0,n.jsxs)(r.li,{children:[`推进到目标帧数，按住 A 键并取消暂停。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`领取帧的标准延迟为 3。如果不匹配，可尝试延迟 2 或 4。`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`如果成功，蛋的后半 PID 就会与目标一致。`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Egg/Success.png`,alt:`成功！`})}),`
`,(0,n.jsx)(r.p,{children:`若失败，请重新检查操作步骤，并合理利用即时存档进行调整与重试。`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};