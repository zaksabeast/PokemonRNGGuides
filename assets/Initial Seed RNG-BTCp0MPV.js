import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CRE-SdEk.js";var n=e(),r={title:`初始种子乱数`,description:`如何使用 Dolphin 设置适用于所有 GameCube 游戏的初始种子乱数`,slug:`zh-gc-initial`,translation:{enSlug:`gc-initial`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`支持 Lua 的 Dolphin 模拟器（仅在 Discord 提供）`}),`
`,(0,n.jsx)(r.li,{children:`GameCube 专用的 Lua 脚本（仅在 Discord 提供）`}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:`RunAsDate（ 64 位）`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`简介`}),`
`,(0,n.jsx)(r.p,{children:`本教程将教你如何使用 Dolphin 与 Lua 脚本，对所有 GameCube 游戏（包括宝可梦 Channel）执行初始种子乱数操作。
掌握这一流程是理解本节中其他乱数教程的基础。`}),`
`,(0,n.jsx)(r.h2,{children:`如何获取你的起始种子（Origin Seed）`}),`
`,(0,n.jsx)(r.p,{children:`起始种子是某一特定日期与时间下启动游戏时的初始种子，用来进行种子搜索校准。获取方法非常简单：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`打开 RunAsDate，将日期与时间设为 `,(0,n.jsx)(r.code,{children:`2000-01-01 00:00`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`使用此配置启动 Dolphin，加载游戏与 Lua 脚本。`}),`
`,(0,n.jsx)(r.li,{children:`在 Lua 脚本窗口中记录显示的初始种子，这就是你的起始种子。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：不同的游戏其起始种子是不同的。例如 Colosseum 与 XD 的起始种子不一样。建议记录每个游戏的起始种子以便下次使用，避免重复操作。
`})}),`
`,(0,n.jsx)(r.h2,{children:`方法一：进行一次初始种子乱数`}),`
`,(0,n.jsx)(r.p,{children:`现在你已经获得了起始种子，可以开始初始种子乱数操作。这一步的目的是找到某一特定目标种子在一定帧数范围内的初始种子。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`打开 PokeFinder，进入菜单：
`,(0,n.jsx)(r.code,{children:`Gen 3 Tool`}),` > `,(0,n.jsx)(r.code,{children:`GameCube`}),` > `,(0,n.jsx)(r.code,{children:`GameCube RTC`}),`，填写以下字段：`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Origin Seed：刚才获取到的起始种子`}),`
`,(0,n.jsx)(r.li,{children:`Target Seed：你想要达成的种子（可以通过 PokeFinder 或其他工具获取）`}),`
`,(0,n.jsx)(r.li,{children:`End Date：建议设定为未来几年内的日期，扩大搜索范围`}),`
`,(0,n.jsx)(r.li,{children:`Min Advance / Max Advance：设定推进范围，通常为 1000 左右，视具体目标而定`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`点击开始搜索，等待出现搜索结果。`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`找到合适结果后，记录其对应的时间（Time），并将其设为 RunAsDate 的启动时间。`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`使用 RunAsDate 启动 Dolphin，加载游戏与 Lua 脚本。此时脚本中显示的初始种子应该与你选中的初始种子完全一致，说明乱数成功。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：如果你是第一次接触 GameCube 乱数，可以随意挑选一个目标种子进行练习，以熟悉整个流程。
`})}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};