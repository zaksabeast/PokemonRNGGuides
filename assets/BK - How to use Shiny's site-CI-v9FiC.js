import{t as e}from"./jsx-runtime-Bl9_0yti.js";import{S as t}from"./index-9x-tX0ur.js";var n=e(),r={title:`晶灿钻石/明亮珍珠 Chatot 工具使用指南`,navDrawerTitle:`Chatot 乱数工具`,description:`学习使用 chatot.pokemonrng.com，进行晶灿钻石/明亮珍珠乱数。`,slug:`zh-bdsp-chatot`,translation:{enSlug:`bdsp-chatot`,language:`zh`}};function i(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`本指南介绍如何使用 Chatot 网站，设置晶灿钻石/明亮珍珠的乱数参数。`}),`
`,(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`已设置好的 CaptureSight，或 Ryujinx/Yuzu 的 Lua 脚本`}),`
`,(0,n.jsxs)(r.li,{children:[`Chatot 网站：`,(0,n.jsx)(r.a,{href:`https://chatot.pokemonrng.com/#/bdsp`,children:`https://chatot.pokemonrng.com/#/bdsp`})]}),`
`,(0,n.jsx)(r.li,{children:`最新版晶灿钻石或明亮珍珠`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：设置网站`}),`
`,(0,n.jsx)(r.p,{children:`打开网站后，可以看到野生、定点和地下大洞窟标签页。选择需要的乱数类型，填写 delay、最小和最大推进数等参数。具体字段填写方式及筛选条件，请参考对应的乱数指南。`}),`
`,(0,n.jsx)(r.p,{children:`其他条件设置好后，只需输入种子。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`使用 CaptureSight 时：启动游戏，在标题画面打开 Tesla Menu。打开 CaptureSight，进入“Main RNG”，将 4 个种子按顺序填入 Chatot。CaptureSight 的第一个种子对应 Seed 0，其余依次对应，这样即可正确追踪推进数。`}),`
`,(0,n.jsxs)(r.li,{children:[`使用 Lua 脚本时：输入 Initial Seed 区域显示的数值，顺序与网站一致。确认 StateSize 为 `,(0,n.jsx)(r.code,{children:`u32`}),`；如果显示 `,(0,n.jsx)(r.code,{children:`u64`}),`，按下 `,(0,n.jsx)(r.code,{children:`3`}),` 切换。`]}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`TIP`,children:[`
`,(0,n.jsxs)(r.p,{children:[`如果操作期间丢失了推进数追踪，可以重新打开 Tesla Menu，尝试按下 `,(0,n.jsx)(r.code,{children:`A`}),`，将 Main RNG 的推进计数停在 0。成功后输入新种子，即可重新追踪。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：生成结果`}),`
`,(0,n.jsx)(r.p,{children:`完成设置后，点击生成，查找需要命中的目标帧数。`}),`
`,(0,n.jsxs)(r.p,{children:[`按下 Switch 的方向键 `,(0,n.jsx)(r.code,{children:`上`}),`，切回控制游戏。再次按下相同按键，可切回控制浮层。`]}),`
`,(0,n.jsx)(r.p,{children:`之后就可以推进帧数，完成乱数了！`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};