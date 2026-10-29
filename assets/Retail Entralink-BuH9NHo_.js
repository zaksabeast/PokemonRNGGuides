import{t as e}from"./jsx-runtime-CLxixnhA.js";import{S as t}from"./index-jzB9fByq.js";var n=e(),r={title:`黑/白实机连入乱数`,navDrawerTitle:`连入乱数`,description:`学习在黑/白的连入之森中进行乱数，包括阿尔宙斯等活动限定宝可梦。`,slug:`zh-retail-bw-entralink`,translation:{enSlug:`retail-bw-entralink`,language:`zh`}};function i(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:(0,n.jsx)(r.em,{children:`原始指南由 Discord 上的 NickPlayeZ 撰写。`})}),`
`,(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://ci.appveyor.com/project/Bambo-Rambo/rngreporter/build/artifacts`,children:`Rambo 的 RNG Reporter`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mystic-timer`,children:`Mystic Timer`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`了解 C-Gear 乱数`}),`
`,(0,n.jsx)(r.p,{children:`黑/白的 C-Gear 乱数分为三个阶段：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`命中初始种子`}),`：决定性格对应的 PID 结果。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`命中 C-Gear 种子`}),`：决定个体值。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`推进到目标性格`}),`：利用初始种子确保获得正确性格。`]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`进入`,(0,n.jsx)(r.strong,{children:`连入`}),`时会设置 `,(0,n.jsx)(r.strong,{children:`C-Gear 种子`}),`，它与初始种子独立，取决于：`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`准确日期和时间`}),`，精确到秒。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Delay`}),`，即游戏加载后经过的画面帧数，帧率为 30fps。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`准备工作`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`连入之森中要有可进行乱数的宝可梦。建议最初的中央区域中`,(0,n.jsx)(r.strong,{children:`只放一只`}),`，避免额外推进。`]}),`
`,(0,n.jsxs)(r.li,{children:[`可选：使用 `,(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.a,{href:`https://github.com/kuroppoi/entralinked`,children:`Entralinked`})}),`，模拟黑/白的游戏同步服务。`]}),`
`,(0,n.jsxs)(r.li,{children:[`推荐准备 `,(0,n.jsx)(r.strong,{children:`20-30 颗神奇糖果`}),`。多数连入宝可梦只有 10 级，升级有助于确定准确个体值。如果糖果不足，可以通过第五世代捡拾乱数收集。`]}),`
`,(0,n.jsxs)(r.li,{children:[`站在`,(0,n.jsx)(r.strong,{children:`没有活动 NPC 的地点`}),`。推荐奇妙大桥，没有 NPC，背景声音也较少，便于通过聒噪鸟验证种子。`]}),`
`,(0,n.jsxs)(r.li,{children:[`至少准备`,(0,n.jsx)(r.strong,{children:`一只聒噪鸟`}),`，用于验证第五世代的推进数。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：寻找目标种子`}),`
`,(0,n.jsx)(r.h3,{children:`寻找 C-Gear 种子`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 PokeFinder。`}),`
`,(0,n.jsx)(r.li,{children:`进入第五世代的“Stationary”，切换到“Searcher”标签页。`}),`
`,(0,n.jsxs)(r.li,{children:[`设置参数。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Method`}),`：IVs C-Gear。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Min Delay`}),`：3000；`,(0,n.jsx)(r.strong,{children:`Max Delay`}),`：12000，也可以按需调整。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Min Advances`}),`：15；`,(0,n.jsx)(r.strong,{children:`Max Advances`}),`：20。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`IV Filters`}),`：目标个体值。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Date Range`}),`：任意年份，范围为该年 01-01 至 12-31。`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`点击“Search”。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`如果没有结果，提高 Max Delay，或放宽个体值条件。`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`寻找初始种子`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 RNG Reporter。`}),`
`,(0,n.jsx)(r.li,{children:`复制黑/白配置档案中的数据。`}),`
`,(0,n.jsxs)(r.li,{children:[`进入 `,(0,n.jsx)(r.code,{children:`5th Gen Tools > Entralink Seed Search`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`粘贴 C-Gear 种子。`}),`
`,(0,n.jsxs)(r.li,{children:[`设置参数。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Year`}),`：与 C-Gear 种子的年份一致。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Max Advances`}),`：60。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Target Nature`}),`：目标性格。`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`点击“Search”。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`如果出现“invalid seed”，换用 PokeFinder 中的另一个种子。`}),`
`,(0,n.jsx)(r.li,{children:`个体值显示为 0 是显示错误，可以忽略。`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`选择目标初始种子。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`DS/Lite/i`}),`：优先选择秒数为 20-30 的结果。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`3DS/2DS`}),`：优先选择秒数为 40-50 的结果。`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：设置工具`}),`
`,(0,n.jsx)(r.h3,{children:`Adjacent Seed Tool：验证初始种子`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`打开 `,(0,n.jsx)(r.code,{children:`5th Gen Tools > Adjacent Seed Tool`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`选择黑/白配置档案。`}),`
`,(0,n.jsxs)(r.li,{children:[`设置参数。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Method`}),`：IVs (Standard Seed)。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Min & Max Frame`}),`：均为 1。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Seconds ±`}),`：DS/Lite/i 为 1，3DS/2DS 为 3。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Date & Time`}),`：填写 Entralink Seed Search 的结果。`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`点击“Generate”。`}),`
`,(0,n.jsx)(r.li,{children:`根据聒噪鸟音调确认初始种子。`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Seed to Time：命中 C-Gear 种子`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开“Seed to Time”。`}),`
`,(0,n.jsx)(r.li,{children:`将 C-Gear 种子粘贴到“Seed”栏。`}),`
`,(0,n.jsx)(r.li,{children:`选择“BW (C-Gear Seed)”。`}),`
`,(0,n.jsxs)(r.li,{children:[`设置参数。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Year`}),`：与初始种子的年份一致。`]}),`
`,(0,n.jsxs)(r.li,{children:[`取消勾选 `,(0,n.jsx)(r.strong,{children:`Seconds`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`选择黑/白配置档案。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`点击右上角的“Generate”。`}),`
`,(0,n.jsx)(r.li,{children:`在结果中找到 Entralink Seed Search 给出的 C-Gear 目标日期和时间。`}),`
`,(0,n.jsxs)(r.li,{children:[`调整参数。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Delays`}),`：±100，必要时扩大到 ±300。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Seconds ±`}),`：7。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Frame Min`}),`：21；`,(0,n.jsx)(r.strong,{children:`Frame Max`}),`：31。`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`点击右下角的“Generate”。`}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`NOTE`,children:[`
`,(0,n.jsx)(r.p,{children:`每走 128 步，IVRNG 会按照当前队伍中的宝可梦数量推进。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第三步：设置 Mystic Timer`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`打开 `,(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.a,{href:`/mystic-timer`,children:`Mystic Timer`})}),`，选择第五世代标签页。`]}),`
`,(0,n.jsx)(r.li,{children:`将 Mode 设为“Entralink”。`}),`
`,(0,n.jsxs)(r.li,{children:[`设置校准值。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`DS/Lite/i`}),`：约 -95。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`3DS/DSi`}),`：约 -400 至 -500。`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`根据 Seed to Time 设置 target delay 和 target seconds。`}),`
`,(0,n.jsx)(r.li,{children:`将“Entralink Calibration”设为 315，之后可按需调整。`}),`
`,(0,n.jsx)(r.li,{children:`忽略“Minutes before target: 1”，按照 Adjacent Seed Tool 的结果设置日期和时间。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第四步：执行乱数`}),`
`,(0,n.jsx)(r.h3,{children:`阶段一：命中初始种子`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`按照 Adjacent Seed Tool 的结果设置主机日期和时间。`}),`
`,(0,n.jsx)(r.li,{children:`启动 Mystic Timer，再确认主机时间设置。`}),`
`,(0,n.jsxs)(r.li,{children:[`计时器结束时启动游戏，`,(0,n.jsx)(r.strong,{children:`不要按其他按键`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`等待季节画面自行消失。`}),`
`,(0,n.jsx)(r.li,{children:`听 5-10 次聒噪鸟叫声，参照 Adjacent Seed Tool 的音调验证种子。`}),`
`,(0,n.jsx)(r.li,{children:`如果没有命中，对照相邻种子查找实际结果。`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`阶段二：命中 C-Gear 种子`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`开启 C-Gear，关闭提示，再按 `,(0,n.jsx)(r.code,{children:`X > B`}),` 跳过加载。`]}),`
`,(0,n.jsxs)(r.li,{children:[`点击“Wireless > Entralink”，但`,(0,n.jsxs)(r.strong,{children:[`暂时不要按 `,(0,n.jsx)(r.code,{children:`A`}),` 或 `,(0,n.jsx)(r.code,{children:`B`})]}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`计时器发声时，按下 `,(0,n.jsx)(r.code,{children:`A`}),` 或 `,(0,n.jsx)(r.code,{children:`B`}),` 进入连入。`]}),`
`,(0,n.jsx)(r.li,{children:`立即捕捉宝可梦，计算准确个体值。`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`阶段三：检查实际种子`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开“Seed to Time”，使用“Search IVs”。`}),`
`,(0,n.jsx)(r.li,{children:`如果没有匹配，将 delay 搜索范围扩大到 ±300 后重试。`}),`
`,(0,n.jsx)(r.li,{children:`如果仍无结果，重新检查日期和时间。`}),`
`,(0,n.jsx)(r.li,{children:`如果已接近目标 delay，暂时不要校准。`}),`
`,(0,n.jsx)(r.li,{children:`如果偏差超过 5，将实际命中值填入 Mystic Timer 并更新。`}),`
`,(0,n.jsx)(r.li,{children:`校准值会相应调整，例如从 0 变为 -90。`}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`TIP`,children:[`
`,(0,n.jsx)(r.p,{children:`如果结果不稳定，可以适当扩大搜索参数范围。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第四步：推进帧数`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`留意 IVRNG 帧数。`}),`
`,(0,n.jsxs)(r.li,{children:[`从目标帧数减去 `,(0,n.jsx)(r.strong,{children:`13`}),`，将结果作为需要推进到的位置。`]}),`
`,(0,n.jsx)(r.li,{children:`通过走路推进。队伍中只保留 1 只宝可梦，避免每次推进过多。`}),`
`,(0,n.jsx)(r.li,{children:`到达所需 IVRNG 帧数时，立即与目标宝可梦互动。创建即时存档，再进入战斗。`}),`
`,(0,n.jsx)(r.li,{children:`操作正确后，目标就会具有正确个体值。`}),`
`,(0,n.jsx)(r.li,{children:`要获得目标性格，继续原稿所述的第六步，或读取即时存档重新捕捉宝可梦。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`恭喜你！已经获得目标宝可梦了！`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};