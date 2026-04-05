import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CNlyG6-4.js";var n=e(),r={title:`绿宝石中的垂直空白（VBlank）`,description:`什么是 VBlank 以及它在宝可梦生成中的影响。`,slug:`zh-gba-vblank`,translation:{enSlug:`gba-vblank`,language:`zh`}};function i(e){let r={a:`a`,h2:`h2`,li:`li`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{Gist:i,Text:a}=r;return i||o(`Gist`,!0),a||o(`Text`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:`要点：什么是 VBlank，以及它在宝可梦生成中的影响。`}),`
`,(0,n.jsx)(r.h2,{children:`什么是 VBlank？`}),`
`,(0,n.jsx)(r.p,{children:`VBlank 中断是 GBA 用于刷新画面的机制。它每 1/60 秒触发一次，独立于正常的游戏逻辑执行。`}),`
`,(0,n.jsx)(r.p,{children:`当 VBlank 中断发生时，正常的游戏程序执行会被暂停，转而执行与 VBlank 相关的代码，完成后再恢复原本的游戏程序流程。`}),`
`,(0,n.jsx)(r.p,{children:`在 GBA 的宝可梦游戏中，VBlank 相关的代码会将乱数值推进一次。也就是说，每 1/60 秒，乱数会推进 1 帧。`}),`
`,(0,n.jsx)(r.h2,{children:`VBlank 的影响`}),`
`,(0,n.jsx)(r.p,{children:`以下是宝可梦生成的简化流程：`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`步骤`}),(0,n.jsx)(r.th,{children:`在该步骤开始时推进的帧数`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`生成 PID`}),(0,n.jsx)(r.td,{children:`1`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`生成个体值 IV`}),(0,n.jsx)(r.td,{children:`2`})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`在大多数情况下，流程正如所示，宝可梦的 PID 用的是第 1 帧的乱数值，IV 用的是第 2 帧的乱数值。`}),`
`,(0,n.jsx)(r.p,{children:`但在少数情况下，会在过程中突发 VBlank，从而改变了生成结果：`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`步骤`}),(0,n.jsx)(r.th,{children:`在该步骤开始时推进的帧数`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`生成 PID`}),(0,n.jsx)(r.td,{children:`1`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Green`,strong:!0,children:`VBLANK：乱数推进`})}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Green`,strong:!0,children:`2`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`生成个体值 IV`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Red`,strong:!0,children:`3`})})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`尽管宝可梦的生成流程是在同一乱数帧开始的，但最终 IV 却不同，因为本应使用第 2 帧的乱数值，现在使用的是第 3 帧。`}),`
`,(0,n.jsx)(r.h2,{children:`VBlank 发生频率`}),`
`,(0,n.jsx)(r.p,{children:`如前所述，VBlank 每 1/60 秒发生一次，确切地说是每 280,896 条 CPU 指令周期。GBA 执行的每一项操作（例如加法、读取数据）都会占用一定的 CPU 指令周期。`}),`
`,(0,n.jsx)(r.p,{children:`宝可梦生成中的某个步骤所花的周期越多，就越有可能在执行时碰到 VBlank。`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`例：一个步骤如果耗时 28,000 指令周期，约有 10% 的几率发生 VBlank。`}),`
`,(0,n.jsx)(r.li,{children:`例：一个步骤耗时 300,000 指令周期，几乎必定会遇到 1 次甚至 2 次 VBlank。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`定点宝可梦生成的指令很少，因此 VBlank 比较罕见。`}),`
`,(0,n.jsx)(r.p,{children:`相反，野生宝可梦若遇到同步特性作为首发宝可梦，会触发更多的乱数判定，导致指令周期大幅上升，因此 VBlank 更为常见。`}),`
`,(0,n.jsxs)(r.p,{children:[`幸运的是，在大多数情况下，宝可梦生成中发生的 VBlank 并不会影响结果。但在某些时候，它确实会影响宝可梦的生成，造成我们所说的 `,(0,n.jsx)(r.a,{href:`/gba-methods`,children:`方法 2-4`}),`。`]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};