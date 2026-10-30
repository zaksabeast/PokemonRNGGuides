import{t as e}from"./jsx-runtime-Bl9_0yti.js";import{S as t}from"./index-9x-tX0ur.js";var n=e(),r={title:`使用离线补丁进行宝可传送乱数`,navDrawerTitle:`离线补丁乱数`,description:`使用离线补丁稳定宝可传送的延迟，更可靠地进行个体值乱数。`,slug:`zh-transporter-rng-offline`,translation:{enSlug:`transporter-rng-offline`,language:`zh`}};function i(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components},{Transporter:i}=r;return i||o(`Transporter`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`本教程介绍如何通过宝可传送，对从第一、第二世代传送过来的宝可梦进行个体值乱数。为了稳定延迟，需要使用无需连接服务器即可传送宝可梦的补丁。打补丁后的宝可梦传送结果与正常传送相同。`}),`
`,(0,n.jsx)(r.p,{children:`宝可梦是否异色及其性格，已在来源的第一、第二世代游戏中确定。`}),`
`,(0,n.jsxs)(r.p,{children:[`可以通过`,(0,n.jsx)(r.a,{href:`/misc-3ds-transporter-nature-tables`,children:`性格对照表`}),`查询宝可梦传送后的性格。`]}),`
`,(0,n.jsxs)(r.p,{children:[`如果不想使用补丁，可以参考`,(0,n.jsx)(r.a,{href:`transporter-rng`,children:`宝可传送乱数教程`}),`。`]}),`
`,(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/install-pokereader`,children:`已安装 PokeReader 的 3DS`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：稳定延迟`}),`
`,(0,n.jsxs)(r.p,{children:[`按照`,(0,n.jsx)(r.a,{href:`/offline-bank-transporter-mod`,children:`此处说明`}),`安装宝可传送离线补丁，以获得稳定的延迟。`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：寻找目标帧数`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`确保第一、第二世代游戏的第 1 个盒子、第 1 个位置中有一只宝可梦。`}),`
`,(0,n.jsx)(r.li,{children:`在 3DS 上启动宝可传送，并加载 PokeReader。`}),`
`,(0,n.jsx)(r.li,{children:`将 PokeReader 显示的初始种子输入下方工具的“Seed”栏。`}),`
`,(0,n.jsx)(r.li,{children:`将“Delay”设为 28。`}),`
`,(0,n.jsxs)(r.li,{children:[`在宝可传送中按下 `,(0,n.jsx)(r.code,{children:`Start`}),`，选择要使用的游戏。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`此处就是生成宝可梦前最后一次按下 `,(0,n.jsx)(r.code,{children:`A`}),` 的界面。`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`按下 `,(0,n.jsx)(r.code,{children:`Start + Select`}),` 暂停游戏。`]}),`
`,(0,n.jsxs)(r.li,{children:[`调整个体值筛选条件，寻找你想要的结果。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`性格、特性和是否异色在传送前的第一、第二世代游戏中就已确定。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`将“Initial Advance”设为当前推进帧数。`}),`
`,(0,n.jsx)(r.li,{children:`将“Max Advances”设为你愿意搜索的最大推进帧数。`}),`
`,(0,n.jsx)(r.li,{children:`点击“Search”。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`显示的所有结果都可以作为目标帧数，选择你喜欢的一项即可。`}),`
`,(0,n.jsx)(r.h2,{children:`第三步：命中目标`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`按下 `,(0,n.jsx)(r.code,{children:`Start`}),` 解除暂停。`]}),`
`,(0,n.jsx)(r.li,{children:`在游戏选择界面等待，直到接近目标帧数。`}),`
`,(0,n.jsxs)(r.li,{children:[`接近目标时，按下 `,(0,n.jsx)(r.code,{children:`Start + Select`}),` 暂停游戏。`]}),`
`,(0,n.jsxs)(r.li,{children:[`按下 `,(0,n.jsx)(r.code,{children:`Select`}),` 逐帧推进，直到目标帧数。`]}),`
`,(0,n.jsxs)(r.li,{children:[`到达目标帧数后，按住 `,(0,n.jsx)(r.code,{children:`A`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`检查是否获得目标宝可梦。如果没有，不要传送，重新尝试即可。`}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`TIP`,children:[`
`,(0,n.jsx)(r.p,{children:`当系统询问是否传送宝可梦时，选择“No”会重新生成宝可梦。因此即使没有命中，也可以反复尝试。`}),`
`]}),`
`,(0,n.jsx)(i,{}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};