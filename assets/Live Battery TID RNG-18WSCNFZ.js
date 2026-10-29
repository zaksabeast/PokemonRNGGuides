import{t as e}from"./jsx-runtime-CLxixnhA.js";import{S as t}from"./index-jzB9fByq.js";var n=e(),r={title:`红宝石/蓝宝石模拟器 TID 乱数`,navDrawerTitle:`TID 乱数`,description:`学习如何在红宝石/蓝宝石中通过模拟器获得你想要的 TID 与 SID 组合。`,slug:`zh-emulator-rs-live-battery-tid`,translation:{enSlug:`emulator-rs-live-battery-tid`,language:`zh`}};function i(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`支持 Lua 脚本的 mGBA`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：寻找目标初始种子`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 PokeFinder，进入第三世代的 IDs 窗口，然后选择 RS 标签页。`}),`
`,(0,n.jsx)(r.li,{children:`选择筛选条件，输入你想要的 TID、SID 或 TSV。`}),`
`,(0,n.jsx)(r.li,{children:`保持当前的日期和时间，也可以按需调整。`}),`
`,(0,n.jsxs)(r.li,{children:[`点击“Generate”，查找符合条件的 TID。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`如果没有搜索结果，可以尝试调整日期、时间，或提高最大推进帧数。`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：命中初始种子`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`在 mGBA 中打开 `,(0,n.jsx)(r.code,{children:`Tools -> Game Overrides...`}),`，启用“Realtime clock”。`]}),`
`,(0,n.jsxs)(r.li,{children:[`然后打开 `,(0,n.jsx)(r.code,{children:`Tools -> Game Pak Sensors...`}),`，选择“Start time at”，输入目标日期和时间。`]}),`
`,(0,n.jsx)(r.li,{children:`启动游戏，推进开场对话，直到小田卷博士说稍后再见。`}),`
`,(0,n.jsx)(r.li,{children:`等待游戏推进到目标帧数，期间按需创建即时存档。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`在下方画面等待帧数推进：`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Ruby-Sapphire/Live-Battery-TID/Final-Screen.png`,alt:`最终等待界面`})}),`
`,(0,n.jsx)(r.h2,{children:`第三步：校准延迟`}),`
`,(0,n.jsxs)(r.p,{children:[`从按下 `,(0,n.jsx)(r.code,{children:`A`}),` 到游戏实际生成 TID/SID 之间存在延迟，因此需要提前按键来抵消这段延迟。`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`记下你的目标帧数。`}),`
`,(0,n.jsxs)(r.li,{children:[`到达目标帧数时，按下 `,(0,n.jsx)(r.code,{children:`A`}),` 生成 TID。`]}),`
`,(0,n.jsx)(r.li,{children:`将实际获得的 TID 输入 PokeFinder，搜索对应结果。`}),`
`,(0,n.jsxs)(r.li,{children:[`对比实际命中的帧数与目标帧数，计算延迟。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`例如：目标是第 `,(0,n.jsx)(r.strong,{children:`89103`}),` 帧，实际命中第 `,(0,n.jsx)(r.strong,{children:`89175`}),` 帧，那么延迟就是 `,(0,n.jsx)(r.strong,{children:`72`}),` 帧，需要提前 `,(0,n.jsx)(r.strong,{children:`72`}),` 帧按下 `,(0,n.jsx)(r.code,{children:`A`}),`。`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`读取之前的即时存档，在调整后的帧数按下 `,(0,n.jsx)(r.code,{children:`A`}),`。`]}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`TIP`,children:[`
`,(0,n.jsxs)(r.p,{children:[`如果获得的 TID 和 SID 与目标正好相反，提前 1 帧按下 `,(0,n.jsx)(r.code,{children:`A`}),` 即可。`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`恭喜你！你已经获得了目标 TID！`}),`
`,(0,n.jsx)(r.p,{children:`以下是成功完成 ID 乱数的示例：`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Ruby-Sapphire/Live-Battery-TID/Success.png`,alt:`成功获得目标 ID`})}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};