import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-DO7tO6lS.js";var n=e(),r=[{title:`究极日月 时间线跳跃乱数`,description:`学习如何在《究极之日／究极之月》中跳跃至特定时间线以获得目标宝可梦。`,slug:`zh-retail-usum-timeleap`,translation:{enSlug:`retail-usum-timeleap`,language:`zh`}},{title:`日月 时间线跳跃乱数`,description:`学习如何在《日月》中跳跃至特定时间线以获得目标宝可梦。`,slug:`zh-retail-sm-timeleap`,translation:{enSlug:`retail-sm-timeleap`,language:`zh`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`本教程使用「帧1」与「帧2」来指代时间线乱数的两个关键帧：`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`帧 1`}),`：你按下 `,(0,n.jsx)(r.code,{children:`A`}),` 来执行动作（例如推进对话），并跳跃到目标时间线的那一帧。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`帧 2`}),`：目标时间线中的目标帧，决定你获得的宝可梦。`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`目标是利用时间线跳跃，在正确的时机抵达帧1，并由此跳转至帧2（宝可梦所在的时间线）。`}),`
`,(0,n.jsx)(r.p,{children:`可跳跃的方法包括：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`推进对话`}),`：游戏在载入下一行文本时会进行 1 次乱数调用。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`关闭 X 菜单`}),`：游戏会进行 2 次乱数调用，通常对应角色小动作。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsxs)(r.strong,{children:[`在"是／否"界面按 `,(0,n.jsx)(r.code,{children:`A`}),`（如神秘礼物）`]}),`：游戏会进行约 10 次乱数调用，用于生成宝可梦。`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`说明：野生宝可梦不适用时间线跳跃乱数，因为使用甜蜜蜜时无法触发时间线间的跳跃。
`})}),`
`,(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/install-pokereader`,children:`一台安装了 PokeReader 的 3DS`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：选择目标帧`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开"筛选条件"，查找你想要的宝可梦。取消勾选 "仅准确帧"。`}),`
`,(0,n.jsx)(r.li,{children:`使用"帧数范围"功能搜索你希望命中的帧。`}),`
`,(0,n.jsx)(r.li,{children:`右键点击该帧，选择"设为目标帧"。该帧在下文中称为"帧2"。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：推进帧数`}),`
`,(0,n.jsx)(r.p,{children:`使用圆庆广场或好奥乐购物中心快速推进帧数。`}),`
`,(0,n.jsx)(r.h2,{children:`第三步：站位准备`}),`
`,(0,n.jsx)(r.p,{children:`接近帧2时，离开圆庆广场或飞往将要接受宝可梦的地点。`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`若目标是电束木，请站在它后方以确保只有 1 个 NPC。`}),`
`,(0,n.jsx)(r.li,{children:`若是神秘礼物，请前往首个宝可中心，站在收礼员背后面对红色柜台。确保 NPC 总数为 4。如果有 5 个，请离开重进。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第四步：进入跳跃画面`}),`
`,(0,n.jsxs)(r.p,{children:[`导航至最后一个 `,(0,n.jsx)(r.code,{children:`A`}),` 键推进的画面，这个动作将触发战斗或接收宝可梦。`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`对于神秘礼物，与收礼员对话至"是否接收"界面。`}),`
`,(0,n.jsx)(r.li,{children:`若是电束木，当 PokeReader 中 NPC 数从 2 变为 1 时打开菜单，以暂停 NPC 动作。`}),`
`,(0,n.jsx)(r.li,{children:`对于游戏内赠送或固定遇敌，最后一句对话会推进 1 帧。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第五步：停在任一准确帧`}),`
`,(0,n.jsx)(r.p,{children:`在 3DSRNGTool 中启用 "仅准确帧" 筛选器来寻找准确帧。在查找前重置筛选条件。`}),`
`,(0,n.jsx)(r.h2,{children:`第六步：查找时间线跳跃帧`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`确认你当前所在帧为准确帧后，将其作为起始帧填入 "帧数范围"。`}),`
`,(0,n.jsx)(r.li,{children:`选择 "时间线跳跃"，点击 "计算"。`}),`
`,(0,n.jsxs)(r.li,{children:[`弹出窗口会提示你应在哪一帧按下 `,(0,n.jsx)(r.code,{children:`A`}),`，这就是帧1。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`对神秘礼物来说，在那一帧"是否接收"中选择"是"。`}),`
`,(0,n.jsx)(r.li,{children:`菜单法中，这一帧关闭菜单。`}),`
`,(0,n.jsxs)(r.li,{children:[`其他宝可梦则通常是推进对话的第 3 或第 4 次 `,(0,n.jsx)(r.code,{children:`A`}),`。`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第七步：确认目标帧`}),`
`,(0,n.jsx)(r.p,{children:`由于 3DSRNGTool 的 "帧数范围" 模式可能略有偏差，请确认帧2是否仍为你想要的性格/个体/性别。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`在弹出窗口中选择 "Yes" 以确认帧2是否仍为目标性格个体。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`若选择 "No"，将可尝试其他帧1，查看能否跳到期望的帧2。`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`若帧2不符合期望，请在时间线中重新搜索目标性格个体（弹窗中选择 "Yes"）。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`找到后右键点击，选择 "设为目标帧"，此帧将作为新的帧2。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`若帧2不在当前时间线中，请用"帧数范围"功能搜索新的目标帧，再重新进行 时间线跳跃 找出新的帧1。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第八步：执行跳跃并接收宝可梦`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`推进至帧1并按 `,(0,n.jsx)(r.code,{children:`A`}),`，推进至最终对话画面。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`菜单法中，按住 `,(0,n.jsx)(r.code,{children:`X`}),` 后按 `,(0,n.jsx)(r.code,{children:`A`}),` 关闭菜单，立即使用 `,(0,n.jsx)(r.code,{children:`Start + Select`}),` 暂停。`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`在帧2等待时注意节奏，帧间通常间隔 1～10 秒。`}),`
`,(0,n.jsxs)(r.li,{children:[`在帧2按 `,(0,n.jsx)(r.code,{children:`A`}),` 接受宝可梦或向前迈出一步，恭喜你！你成功获得目标宝可梦。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};