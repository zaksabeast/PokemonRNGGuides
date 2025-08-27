import{g5 as r,j as n}from"./index-CFYbhQRX.js";const h={title:"(PAL) Channel 乱数",description:"一步步教你乱数出 Channel 基拉祈",slug:"zh-channel-jirachi",translation:{enSlug:"channel-jirachi",language:"zh"}};function i(l){const e={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"一份已完成流程、可领取基拉祈的 Channel 存档"}),`
`,n.jsx(e.li,{children:"一份已通关的欧美版红宝石 / 蓝宝石存档"}),`
`,n.jsx(e.li,{children:"Toolbox 工具（由 Lincoln 开发）"}),`
`,n.jsx(e.li,{children:"支持 Lua 的 Dolphin 模拟器 + Real96 提供的 Channel 专用 Lua 脚本"}),`
`]}),`
`,n.jsx(e.h2,{children:"简介"}),`
`,n.jsx(e.p,{children:"在第三世代中，有两种方式能获取基拉祈：Wishmaker（美版 Bonus Disc）和 Channel（欧版 Bonus Disc）。Wishmaker 的乱数较简单，但能获取的个体值组合较少。本指南聚焦于通过 PAL 欧版 Channel 获取基拉祈，使用 Dolphin 模拟器配合更新后的工具简化流程。本指南默认你已掌握 GameCube 初始种子乱数的基础知识，特别是如何命中初始种子。"}),`
`,n.jsx(e.h2,{children:"事前设置"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 Toolbox，主界面选择「GameCube」。"}),`
`,n.jsx(e.li,{children:"点击「Searcher」标签页，在未加载 Profile 的情况下设定筛选条件（性格、异色、个体值等）。"}),`
`,n.jsx(e.li,{children:"找到目标个体后，记下其种子（Seed）。"}),`
`,n.jsx(e.li,{children:"转到 Gen 3 Tools => GameCube => GameCube RTC。输入你的初始种子（Origin Seed）与目标种子（Target Seed），设定查找范围为 10 到 100 之间。"}),`
`,n.jsx(e.li,{children:"得到结果后，将对应的日期时间设定给 RunAsDate 并启动 Dolphin。"}),`
`]}),`
`,n.jsx(e.h2,{children:"开始乱数与推进"}),`
`,n.jsx(e.p,{children:"现在，准备领取基拉祈。当你加载了 Dolphin 和 Lua 脚本时，主菜单暂停游戏，检查当前种子是否已与目标匹配。"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"在 Toolbox 中，导航至 Gen 3 Tools => GameCube => Jirachi Advancer。"}),`
`,n.jsx(e.li,{children:"在 Starting Seed 输入当前种子。"}),`
`,n.jsx(e.li,{children:"在 Target Seed 中输入目标基拉祈的种子。"}),`
`,n.jsx(e.li,{children:"将 Max Advances 设为 100 左右，和你之前 RTC 工具中设定的推进范围一致。"}),`
`,n.jsx(e.li,{children:"不要填写 Bruteforce Range，不要勾选 “Min Actions” 选项，然后点击Generate。"}),`
`]}),`
`,n.jsx(e.p,{children:"如果一切设置无误，工具会生成一系列操作步骤，用来推进至目标种子。你也可以更新 Origin Seed 来重新计算操作步骤。"}),`
`,n.jsx(e.p,{children:"完成所有操作后，领取基拉祈即可完成最终推进，成功获取目标个体。"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意: 如果没有搜索到结果，这种情况很少见，但确实可能发生。可以尝试换一个初始种子或再次搜索，通常都能解决。
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:"注意: 如果 Lua 脚本界面提示 “Reload Menu”，请按 Options 然后按下 `B` 键返回。\n"})}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function c(l={}){const{wrapper:e}={...r(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(i,{...l})}):i(l)}export{c as default,h as frontmatter};
