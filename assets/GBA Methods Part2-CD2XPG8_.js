import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-Bh0-R9ZM.js";var n=e(),r={title:`《绿宝石》野生生成方式中的队首影响`,description:`解释为何队首影响会触发不同类型的野生生成方式`,slug:`zh-gba-methods-lead-impact`,translation:{enSlug:`gba-methods-lead-impact`,language:`zh`}};function i(e){let r={a:`a`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{Gen3PidSpeedCalculator:i,Gist:a}=r;return i||o(`Gen3PidSpeedCalculator`,!0),a||o(`Gist`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a,{children:`核心要点: 解释为何队首影响会触发不同类型的野生生成方式`}),`
`,(0,n.jsx)(r.h3,{children:`前置条件`}),`
`,(0,n.jsxs)(r.p,{children:[`确认已经阅读过 `,(0,n.jsx)(r.a,{href:`/zh-gba-methods`,children:`生成方式1-4`}),` 和 `,(0,n.jsx)(r.a,{href:`/zh-gba-vblank`,children:`VBlanks`})]}),`
`,(0,n.jsx)(r.h3,{children:`遭遇野生宝可梦（简略版）`}),`
`,(0,n.jsx)(r.p,{children:`以下是遭遇野生宝可梦时所执行代码的简化实例：`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`步骤`}),(0,n.jsx)(r.th,{children:`周期`}),(0,n.jsx)(r.th,{children:`总周期`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`1- 更新音频&画面`}),(0,n.jsx)(r.td,{children:`+ 50K`}),(0,n.jsx)(r.td,{children:`50K`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`2- 杂项更新`}),(0,n.jsx)(r.td,{children:`+ 5K`}),(0,n.jsx)(r.td,{children:`55K`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`3- 准备遭遇野生宝可梦`}),(0,n.jsx)(r.td,{children:`+ 15K-115K`}),(0,n.jsx)(r.td,{children:`70K-170K`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`4- 生成有效 PID`}),(0,n.jsx)(r.td,{children:`+ 10K`}),(0,n.jsx)(r.td,{children:`80K-180K`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`5- 生成无个体值的宝可梦`}),(0,n.jsx)(r.td,{children:`+ 115K`}),(0,n.jsx)(r.td,{children:`195K-295K`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`6- 生成防御、攻击、HP的个体值`}),(0,n.jsx)(r.td,{children:`+ 1K`}),(0,n.jsx)(r.td,{children:`196K-296K`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`7- 赋值防御、攻击、HP的个体值`}),(0,n.jsx)(r.td,{children:`+ 39K`}),(0,n.jsx)(r.td,{children:`235K-335K`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`8- 生成特防、特攻、速度的个体值`}),(0,n.jsx)(r.td,{children:`+ 1K`}),(0,n.jsx)(r.td,{children:`236K-336K`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`9- 赋值特防、特攻、速度的个体值`}),(0,n.jsx)(r.td,{children:`+ 39K`}),(0,n.jsx)(r.td,{children:`275K-375K`})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`注意：当周期数到达280K时，会触发一次VBlank。如果VBlank发生在步骤"5- 生成无个体值的宝可梦"的总周期内，会触发Wild-2生成方式。VBlank发生在步骤"7- 赋值防御、攻击、HP的个体值"的总周期内，会触发Wild-4生成方式。VBlank发生在这之后或没有触发VBlank，则会触发Wild-1生成方式。`}),`
`,(0,n.jsx)(r.p,{children:`在步骤"3- 准备遭遇野生宝可梦"的过程中，代码会多次读取队首宝可梦的特性, 这一过程所消耗的周期数会随队首宝可梦的不同而变化。`}),`
`,(0,n.jsx)(r.p,{children:`因此通过挑选特定队首宝可梦，我们可以控制最终触发哪一种野生生成方式。`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`步骤`}),(0,n.jsxs)(r.th,{children:[`最快队首`,(0,n.jsx)(`br`,{}),`Wild-1`]}),(0,n.jsxs)(r.th,{children:[`较快的队首`,(0,n.jsx)(`br`,{}),`Wild-4`]}),(0,n.jsxs)(r.th,{children:[`较慢的队首`,(0,n.jsx)(`br`,{}),`Wild-2`]})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`1- 更新音频&画面`}),(0,n.jsx)(r.td,{children:`50K`}),(0,n.jsx)(r.td,{children:`50K`}),(0,n.jsx)(r.td,{children:`50K`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`2- 杂项更新`}),(0,n.jsx)(r.td,{children:`55K`}),(0,n.jsx)(r.td,{children:`55K`}),(0,n.jsx)(r.td,{children:`100K`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`3- 准备遭遇野生宝可梦`}),(0,n.jsx)(r.td,{children:`70K (最快)`}),(0,n.jsx)(r.td,{children:`120K (较快)`}),(0,n.jsx)(r.td,{children:`170K (较慢)`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`4- 生成有效 PID`}),(0,n.jsx)(r.td,{children:`80K`}),(0,n.jsx)(r.td,{children:`130K`}),(0,n.jsx)(r.td,{children:`180K`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`5- 生成无个体值的宝可梦`}),(0,n.jsx)(r.td,{children:`195K`}),(0,n.jsx)(r.td,{children:`245K`}),(0,n.jsx)(r.td,{children:`295K (VBlank)`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`6- 生成防御、攻击、HP的个体值`}),(0,n.jsx)(r.td,{children:`196K`}),(0,n.jsx)(r.td,{children:`246K`}),(0,n.jsx)(r.td,{children:`...`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`7- 赋值防御、攻击、HP的个体值`}),(0,n.jsx)(r.td,{children:`235K`}),(0,n.jsx)(r.td,{children:`285K (VBlank)`}),(0,n.jsx)(r.td,{children:`...`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`8- 赋值特防、特攻、速度的个体值`}),(0,n.jsx)(r.td,{children:`236K ...`}),(0,n.jsx)(r.td,{children:`...`}),(0,n.jsx)(r.td,{children:`...`})]})]})]}),`
`,(0,n.jsx)(r.h3,{children:`判断队首宝可梦是慢速型还是快速型`}),`
`,(0,n.jsx)(r.p,{children:`有两个因素决定队首宝可梦是快速型还是慢速型：`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`是否是一颗蛋`}),`
`,(0,n.jsx)(r.li,{children:`宝可梦的PID`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`如果队首是蛋，游戏会跳过大量宝可梦的生成逻辑，从而节省大量周期。且蛋的PID不会产生任何影响。`}),`
`,(0,n.jsx)(r.p,{children:`如果队首不是蛋，代码会对其PID执行取模运算来获取它的特性。该取模运算所消耗的周期数取决于PID的数值。`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`当队首宝可梦的PID小于25时，取模运算最快，仅需18个周期。`}),`
`,(0,n.jsx)(r.li,{children:`最慢则需要900个周期（如：PID为59999995时）。`}),`
`,(0,n.jsx)(r.li,{children:`平均消耗为775个周期。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`一次普通的野生遭遇战会触发80次取模运算。`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`最快与最慢的队首PID之间，总周期差约为71K周期。`}),`
`,(0,n.jsx)(r.li,{children:`蛋与最慢的队首PID之间，总周期差约为100K周期。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`正是这种巨大的周期差，让我们可以通过队首宝可梦来控制触发哪一种野生生成方式。`}),`
`,(0,n.jsx)(i,{}),`
`,(0,n.jsx)(r.h3,{children:`遭遇野生宝可梦（完整版）`}),`
`,(0,n.jsx)(r.p,{children:`是实际中，野生遭遇战的逻辑比上面的简化版更复杂，因为大部分步骤消耗的周期数都不固定。
好在大多数情况下，每一步所消耗的周期数都是可与计算的。`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`步骤`}),(0,n.jsx)(r.th,{children:`周期`}),(0,n.jsx)(r.th,{children:`类型`}),(0,n.jsx)(r.th,{children:`取决于`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`1- 更新音频&画面`}),(0,n.jsx)(r.td,{children:`45K-65K`}),(0,n.jsx)(r.td,{children:`无法预测`}),(0,n.jsx)(r.td,{children:`音频帧数`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`2- 杂项更新`}),(0,n.jsx)(r.td,{children:`5K`}),(0,n.jsx)(r.td,{children:`可预计算`}),(0,n.jsx)(r.td,{children:`-`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`3- 准备遭遇野生宝可梦`}),(0,n.jsx)(r.td,{children:`15K-115K`}),(0,n.jsx)(r.td,{children:`可控`}),(0,n.jsx)(r.td,{children:`队首`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`4- 生成有效 PID`}),(0,n.jsx)(r.td,{children:`1K-1000K`}),(0,n.jsx)(r.td,{children:`可预计算`}),(0,n.jsx)(r.td,{children:`RNG状态 (# roll PID的次数)`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`5- 生成无个体值的宝可梦`}),(0,n.jsx)(r.td,{children:`36K-125K`}),(0,n.jsx)(r.td,{children:`可预计算`}),(0,n.jsx)(r.td,{children:`生成的宝可梦PID`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`6- 生成防御、攻击、HP的个体值`}),(0,n.jsx)(r.td,{children:`1K`}),(0,n.jsx)(r.td,{children:`可预计算`}),(0,n.jsx)(r.td,{children:`-`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`7- 赋值防御、攻击、HP的个体值`}),(0,n.jsx)(r.td,{children:`11K-43K`}),(0,n.jsx)(r.td,{children:`可预计算`}),(0,n.jsx)(r.td,{children:`生成的宝可梦PID`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`8- 赋值特防、特攻、速度的个体值`}),(0,n.jsx)(r.td,{children:`1K`}),(0,n.jsx)(r.td,{children:`可预计算`}),(0,n.jsx)(r.td,{children:`-`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`9- 赋值特防、特攻、速度的个体值`}),(0,n.jsx)(r.td,{children:`无关紧要`}),(0,n.jsx)(r.td,{}),(0,n.jsx)(r.td,{})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`波动最大的步骤是"4- 生成有效 PID"。在该步骤中，游戏会先生成一个随机性格，然后不断生成PID，直到其匹配所需性格。某些情况下，这会需要大量多次重新生成PID。如果队首宝可梦是迷人之躯特性，那么生成的PID还必须匹配所需性别，会导致重新生成PID的次数进一步增加。`}),`
`,(0,n.jsx)(r.p,{children:`如果该步骤消耗过多周期（如：150K周期），那么即便使用最快的队首宝可梦，也可能无法触发Wild-1。使用快速型队首宝可梦只会提高触发Wild-1的概率。同理，如果该步骤过快（如：1K周期），那么即便用最慢的队首宝可梦，也可能无法触发Wild-2。`}),`
`,(0,n.jsx)(r.p,{children:`步骤"1- 更新音频&画面"所消耗的周期取决于音频帧数，而音频帧数又取决于存档文件的加载帧以及其他因素。在实机上无法预测，且每次乱数操作尝试的结果都会不同。`}),`
`,(0,n.jsx)(r.h3,{children:`当VBlank生成有效PID时`}),`
`,(0,n.jsx)(r.p,{children:`若在步骤"4- 生成有效 PID"期间触发VBlank，将会触发Wild-3或Wild-5生成方式。这些生成方式将在下一篇文章中讲解。`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`RainingChain for the article.`}),`
`,(0,n.jsx)(r.li,{children:`mGBA team for providing the emulator for cycle research.`}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`https://github.com/pret/pokeemerald`,children:`pret team`}),` for providing the decompil projects.`]}),`
`,(0,n.jsx)(r.li,{children:`El Terapagos Mexicano for the Spanish translation.`}),`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};