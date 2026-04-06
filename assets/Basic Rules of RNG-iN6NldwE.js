import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CndXGoE5.js";var n=e(),r={title:`乱数介绍`,description:`如何推进乱数以及提高稳定性的技巧`,slug:`zh-e-tips-rng`,translation:{enSlug:`e-tips-rng`,language:`zh`}};function i(e){let r={a:`a`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`生成方式`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`定点宝可梦：Method 1`}),`
`,(0,n.jsx)(r.li,{children:`野生遭遇：Method H-2`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`野生遭遇的不同方法由 vblank 影响，但 H-2 是最常见的。`}),`
`,(0,n.jsx)(r.h3,{children:`绘画乱数`}),`
`,(0,n.jsxs)(r.p,{children:[`绘画乱数是一种极佳的方法，可以获得任意所需的初始种子。这是一项更高级的技巧，具体内容请参考`,(0,n.jsx)(r.a,{href:`/emerald-painting-rng`,children:`本教程`}),`。`]}),`
`,(0,n.jsx)(r.h2,{children:`训练师卡片翻转`}),`
`,(0,n.jsx)(r.p,{children:`在第三世代中，翻转训练师卡片可以重置干扰相关的延迟，使你更容易命中默认延迟。这几乎是每次乱数操作都应该执行的步骤。`}),`
`,(0,n.jsx)(r.p,{children:`要翻转训练师卡片，请进入训练师卡片界面并按 A 键。`}),`
`,(0,n.jsx)(r.p,{children:`建议在距离目标帧 5000 - 10000 之间进行此操作。`}),`
`,(0,n.jsx)(r.h2,{children:`加速帧数推进`}),`
`,(0,n.jsx)(r.h3,{children:`对战录像`}),`
`,(0,n.jsx)(r.p,{children:`此方法可用于保存当前乱数状态，并作为初始种子使用。在对战开拓区进行一场战斗，并将其保存为录像。录像会保留战斗时的种子，使其成为加载时的初始种子。例如，如果目标帧数为 100 万，可以先推进至 95 万，保存战斗录像，再加载录像，这样初始帧数就从 95 万开始。`}),`
`,(0,n.jsx)(r.p,{children:`虽然此方法有效，但相比画画乱数稍显过时。不过，如果需要多次命中特定推进值，它仍然是一个有用的工具。`}),`
`,(0,n.jsx)(r.h3,{children:`战斗中推进`}),`
`,(0,n.jsx)(r.p,{children:`在战斗中，帧数推进速度会翻倍。此方法在野生宝可梦乱数时尤为有用。`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};