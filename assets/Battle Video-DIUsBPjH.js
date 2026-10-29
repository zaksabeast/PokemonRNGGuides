import{t as e}from"./jsx-runtime-CLxixnhA.js";import{S as t}from"./index-jzB9fByq.js";var n=e(),r={title:`对战录像`,navDrawerTitle:`对战录像`,description:`学习创建或更新合适的对战录像，用于保存和恢复乱数状态。`,slug:`zh-emerald-battle-video`,translation:{enSlug:`emerald-battle-video`,language:`zh`}};function i(e){let r={a:`a`,h2:`h2`,li:`li`,p:`p`,ul:`ul`,...t(),...e.components},{BattleVideo:i,Gist:a}=r;return i||o(`BattleVideo`,!0),a||o(`Gist`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a,{children:`要点：如何创建合适的对战录像，或更新已有录像。`}),`
`,(0,n.jsx)(r.h2,{children:`前置条件`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`已能前往对战开拓区。`}),`
`,(0,n.jsxs)(r.li,{children:[`建议先阅读`,(0,n.jsx)(r.a,{href:`/emerald-advancing-rng-techniques`,children:`帧数推进技巧概述`}),`。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`介绍`}),`
`,(0,n.jsx)(r.p,{children:`对战录像可以保存和恢复乱数状态。利用此技巧，只需完整等待一次，后续每次乱数重试都会快很多。`}),`
`,(0,n.jsx)(r.p,{children:`在对战开拓区结束一场战斗后，无论胜负都可以保存录像。录像会记录战斗开始时的乱数状态。打开训练家卡，选择“Battle Record”，就能在任意地点播放录像，并将当前乱数状态重置为录像中战斗开始时的状态。`}),`
`,(0,n.jsx)(r.p,{children:`录像保存的乱数状态必须为后续乱数操作留出足够的时间。`}),`
`,(0,n.jsx)(r.h2,{children:`适用情况`}),`
`,(0,n.jsx)(r.p,{children:`对战录像主要用于以下三种情况：`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`从头创建一份对战录像。`}),`
`,(0,n.jsx)(r.li,{children:`更新已有录像，缩短当前过长的等待时间。`}),`
`,(0,n.jsx)(r.li,{children:`成功通过绘画重置种子后，创建对战录像。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`本指南介绍前两种情况。结合绘画重置种子使用的方法，会在另一篇指南中介绍。`}),`
`,(0,n.jsx)(r.p,{children:`创建录像时，需要等待乱数推进到合适的位置。最简单的方式是在对战设施的接待员面前等待，也可以将大部分等待时间放在战斗中，利用两倍推进速度加快进度。下方工具支持这两种方式。`}),`
`,(0,n.jsx)(r.h2,{children:`网页工具与操作说明`}),`
`,(0,n.jsx)(i,{}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`RainingChain`}),`
`,(0,n.jsx)(r.li,{children:`Parasite：德语翻译。`}),`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};