import{t as e}from"./jsx-runtime-Bl9_0yti.js";import{S as t}from"./index-9x-tX0ur.js";var n=e(),r={title:`第一、第二世代宝可传送乱数`,navDrawerTitle:`宝可传送乱数`,description:`通过宝可传送，对 VC 宝可梦进行个体值乱数，获得完美六项个体。`,slug:`zh-transporter-rng`,translation:{enSlug:`transporter-rng`,language:`zh`}};function i(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components},{Transporter:i}=r;return i||o(`Transporter`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`本教程介绍如何通过宝可传送，对从第一、第二世代传送过来的宝可梦进行个体值乱数。是否异色和性格已在来源游戏中确定。`}),`
`,(0,n.jsxs)(r.p,{children:[`可以通过`,(0,n.jsx)(r.a,{href:`/misc-3ds-transporter-nature-tables`,children:`性格对照表`}),`查询宝可梦传送后的性格。`]}),`
`,(0,n.jsxs)(r.p,{children:[`如果希望通过稳定延迟降低乱数难度，可以参考`,(0,n.jsx)(r.a,{href:`transporter-rng-offline`,children:`离线补丁宝可传送乱数教程`}),`。`]}),`
`,(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/install-pokereader`,children:`已安装 PokeReader 的 3DS`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`实用提示`}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`TIP`,children:[`
`,(0,n.jsx)(r.p,{children:`当系统询问是否传送宝可梦时，选择“No”会重新生成宝可梦。因此即使没有命中，也可以反复尝试。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：校准延迟`}),`
`,(0,n.jsxs)(r.p,{children:[`从按下 `,(0,n.jsx)(r.code,{children:`A`}),` 到宝可梦实际生成之间存在延迟，需要先进行校准。`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`确保第一、第二世代游戏的第 1 个盒子、第 1 个位置中有宝可梦。`}),`
`,(0,n.jsx)(r.li,{children:`在 3DS 上启动宝可传送，并加载 PokeReader。`}),`
`,(0,n.jsx)(r.li,{children:`将初始种子输入下方工具。`}),`
`,(0,n.jsxs)(r.li,{children:[`在宝可传送中按下 `,(0,n.jsx)(r.code,{children:`Start`}),`，选择用于传送的游戏。`]}),`
`,(0,n.jsxs)(r.li,{children:[`按下 `,(0,n.jsx)(r.code,{children:`Start + Select`}),` 暂停游戏。`]}),`
`,(0,n.jsx)(r.li,{children:`记下当前推进帧数，作为起始帧数。`}),`
`,(0,n.jsxs)(r.li,{children:[`按下 `,(0,n.jsx)(r.code,{children:`A`}),` 解除暂停，让宝可传送生成宝可梦。`]}),`
`,(0,n.jsx)(r.li,{children:`将 PokeReader 显示的准确个体值输入下方工具，搜索实际命中的帧数。`}),`
`,(0,n.jsxs)(r.li,{children:[`根据起始帧数与实际命中帧数的差值，计算延迟。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`例如：从第 1000 帧开始，实际命中第 1197 帧，那么延迟就是 197 帧。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`系统询问是否传送宝可梦时，选择“No”。`}),`
`,(0,n.jsx)(r.li,{children:`重复此流程 5-10 次，获得 5-10 个延迟值。`}),`
`,(0,n.jsx)(r.li,{children:`将出现次数最多的延迟，或这些延迟的平均值，填入“Delay”栏。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：寻找目标结果`}),`
`,(0,n.jsx)(r.p,{children:`在下方工具中按以下步骤操作：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`将“Transporter Gender”设为你想进行乱数的宝可梦对应的性别设置。`}),`
`,(0,n.jsxs)(r.li,{children:[`调整个体值筛选条件，寻找想要的结果。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`性格、特性和是否异色在传送前的第一、第二世代游戏中就已确定。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`将“Initial Advance”设为当前推进帧数。`}),`
`,(0,n.jsx)(r.li,{children:`将“Max Advances”设为你愿意搜索的最大推进帧数。`}),`
`,(0,n.jsx)(r.li,{children:`点击“Generate”。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`所有搜索结果都可以作为目标，选择你喜欢的一项即可。`}),`
`,(0,n.jsx)(r.h2,{children:`第三步：命中目标`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在游戏选择界面等待，直到接近目标帧数。`}),`
`,(0,n.jsxs)(r.li,{children:[`接近目标时，按下 `,(0,n.jsx)(r.code,{children:`Start + Select`}),` 暂停游戏。`]}),`
`,(0,n.jsxs)(r.li,{children:[`按下 `,(0,n.jsx)(r.code,{children:`Select`}),` 逐帧推进，直到目标帧数。`]}),`
`,(0,n.jsxs)(r.li,{children:[`到达目标帧数后，按住 `,(0,n.jsx)(r.code,{children:`A`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`检查是否获得目标宝可梦。如果没有，不要传送，重新尝试即可。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`可能需要多次尝试才能成功。`}),`
`,(0,n.jsx)(r.h2,{children:`20 只宝可梦法`}),`
`,(0,n.jsx)(r.p,{children:`宝可传送会一次生成 20 只宝可梦。如果准备 20 只相同的宝可梦，就能有 20 次机会落在正确的帧数上。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`捕捉 20 只相同的宝可梦，也可以通过复制获得。`}),`
`,(0,n.jsx)(r.li,{children:`将这 20 只宝可梦全部放入第一、第二世代游戏的第 1 个盒子。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`然后在下方工具中：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在“Filters”中设置想要的个体值。`}),`
`,(0,n.jsx)(r.li,{children:`使用 PokeReader 显示的初始种子搜索结果。`}),`
`,(0,n.jsx)(r.li,{children:`确保符合条件的连续推进帧数至少有 10 帧。`}),`
`,(0,n.jsx)(r.li,{children:`选择这段连续帧数的中间位置作为目标。`}),`
`]}),`
`,(0,n.jsx)(i,{}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};