import{t as e}from"./jsx-runtime-CLxixnhA.js";import{S as t}from"./index-jzB9fByq.js";var n=e(),r={title:`利用绘画重置种子`,navDrawerTitle:`绘画重置种子`,description:`利用绘画重置种子，快速到达原本需要长时间等待的乱数状态。`,slug:`zh-emerald-painting-reseeding`,translation:{enSlug:`emerald-painting-reseeding`,language:`zh`}};function i(e){let r={a:`a`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components},{EmeraldPaintingReseeding:i,Gist:a}=r;return i||o(`EmeraldPaintingReseeding`,!0),a||o(`Gist`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a,{children:`要点：利用绘画重置种子，快速到达很远的目标乱数状态。`}),`
`,(0,n.jsx)(r.h2,{children:`前置条件`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`已能前往对战开拓区。`}),`
`,(0,n.jsx)(r.li,{children:`拥有一颗蛋，以及一只会甜甜香气的宝可梦。`}),`
`,(0,n.jsx)(r.li,{children:`推荐准备大师球，或会点到为止的宝可梦。`}),`
`,(0,n.jsx)(r.li,{children:`推荐准备至少 5 颗神奇糖果。`}),`
`,(0,n.jsxs)(r.li,{children:[`建议先阅读`,(0,n.jsx)(r.a,{href:`/emerald-advancing-rng-techniques`,children:`帧数推进技巧概述`}),`。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`介绍`}),`
`,(0,n.jsx)(r.p,{children:`绘画重置种子可以让乱数状态瞬间跳跃数百万次推进，到达正常等待几乎无法实现的目标。`}),`
`,(0,n.jsx)(r.p,{children:`在水静市华丽大赛会场查看画作时，游戏会根据当前画面帧计数器重新设置乱数种子。无需参加华丽大赛，也可以查看这些画作。`}),`
`,(0,n.jsx)(r.p,{children:`此技巧需要精确到单帧的按键。操作后，需要捕捉一只高等级宝可梦，确认是否成功命中。`}),`
`,(0,n.jsx)(r.h3,{children:`流程概述`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`第一步`}),`：选择目标绘画前帧数和绘画后推进数，两者共同决定乱数能否到达最终目标。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`第二步`}),`：查看画作、创建对战录像，再确认是否命中绘画前帧数。没有命中时，需要重复此步骤。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`第三步`}),`：更新录像，使其更接近最终目标推进数，缩短之后每次乱数尝试的等待时间。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`网页工具与操作说明`}),`
`,(0,n.jsx)(i,{}),`
`,(0,n.jsx)(r.h2,{children:`技术说明`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`查看画作前的乱数状态不会影响新种子，因此无法利用对战录像缩短查看画作前的等待时间。`}),`
`,(0,n.jsxs)(r.li,{children:[`以蛋作为队首，可以确保用于校验的宝可梦按 `,(0,n.jsx)(r.a,{href:`/gba-methods-lead-impact`,children:`Wild-1`}),` 生成。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`RainingChain`}),`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};