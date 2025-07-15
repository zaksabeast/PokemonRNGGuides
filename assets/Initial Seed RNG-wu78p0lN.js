import{E as s,j as n}from"./index-BShVIXws.js";const c={title:"初始种子乱数",description:"如何使用 Dolphin 设置适用于所有 GameCube 游戏的初始种子乱数",slug:"zh-gc-initial",translation:{enSlug:"gc-initial",language:"zh"}};function l(i){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"支持 Lua 的 Dolphin 模拟器（仅在 Discord 提供）"}),`
`,n.jsx(e.li,{children:"GameCube 专用的 Lua 脚本（仅在 Discord 提供）"}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,n.jsx(e.li,{children:"RunAsDate（ 64 位）"}),`
`]}),`
`,n.jsx(e.h2,{children:"简介"}),`
`,n.jsx(e.p,{children:`本指南将教你如何使用 Dolphin 与 Lua 脚本，对所有 GameCube 游戏（包括宝可梦 Channel）执行初始种子乱数操作。
掌握这一流程是理解本节中其他乱数教程的基础。`}),`
`,n.jsx(e.h2,{children:"如何获取你的起始种子（Origin Seed）"}),`
`,n.jsx(e.p,{children:"起始种子是某一特定日期与时间下启动游戏时的初始种子，用来进行种子搜索校准。获取方法非常简单："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["打开 RunAsDate，将日期与时间设为 ",n.jsx(e.code,{children:"2000-01-01 00:00"}),"。"]}),`
`,n.jsx(e.li,{children:"使用此配置启动 Dolphin，加载游戏与 Lua 脚本。"}),`
`,n.jsx(e.li,{children:"在 Lua 脚本窗口中记录显示的初始种子，这就是你的起始种子。"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：不同的游戏其起始种子是不同的。例如 Colosseum 与 XD 的起始种子不一样。建议记录每个游戏的起始种子以便下次使用，避免重复操作。
`})}),`
`,n.jsx(e.h2,{children:"方法一：进行一次初始种子乱数"}),`
`,n.jsx(e.p,{children:"现在你已经获得了起始种子，可以开始初始种子乱数操作。这一步的目的是找到某一特定目标种子在一定帧数范围内的初始种子。"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[`打开 PokeFinder，进入菜单：
`,n.jsx(e.code,{children:"Gen 3 Tool"})," > ",n.jsx(e.code,{children:"GameCube"})," > ",n.jsx(e.code,{children:"GameCube RTC"}),"，填写以下字段："]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Origin Seed：刚才获取到的起始种子"}),`
`,n.jsx(e.li,{children:"Target Seed：你想要达成的种子（可以通过 PokeFinder 或其他工具获取）"}),`
`,n.jsx(e.li,{children:"End Date：建议设定为未来几年内的日期，扩大搜索范围"}),`
`,n.jsx(e.li,{children:"Min Advance / Max Advance：设定推进范围，通常为 1000 左右，视具体目标而定"}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:"点击开始搜索，等待出现搜索结果。"}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:"找到合适结果后，记录其对应的时间（Time），并将其设为 RunAsDate 的启动时间。"}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:"使用 RunAsDate 启动 Dolphin，加载游戏与 Lua 脚本。此时脚本中显示的初始种子应该与你选中的初始种子完全一致，说明乱数成功。"}),`
`]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：如果你是第一次接触 GameCube 乱数，可以随意挑选一个目标种子进行练习，以熟悉整个流程。
`})}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function d(i={}){const{wrapper:e}={...s(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(l,{...i})}):l(i)}export{d as default,c as frontmatter};
