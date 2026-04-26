import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-widtYTN0.js";var n=e(),r={title:`X/Y 朋友狩猎区乱数教程`,description:`学习如何在《宝可梦 X/Y》中通过朋友狩猎区乱数获取异色六V宝可梦，包括百变怪和其他稀有种类。`,slug:`zh-pcalc-xy-friend-safari`,translation:{enSlug:`pcalc-xy-friend-safari`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`已安装 PCalc 的 3DS（`,(0,n.jsx)(r.a,{href:`/misc-3ds-installing-pcalc`,children:`PCalc 安装教程`}),`）`]}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Bambo-Rambo/TinyFinder/releases`,children:`TinyFinder`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`必读资料`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/wiki/Gen6-TinyMT-Timeline-Calibration`,children:`TinyMT 时间线校准说明`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/ntr-helper-usage`,children:`NTR 助手使用教程`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Tiny Timeline 工具中 TinyMT 各字段说明`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Main RNG Frame`}),`：每个 TinyMT 帧对应的主 RNG 帧范围。通过操控 TinyMT 时间线使目标帧重叠。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Enctr?`}),`：决定是否会遇敌。若值小于 13（即 0–12），则确保会遇敌。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Sync?`}),`：是否能同步性格`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`X`}),` = 否，`,(0,n.jsx)(r.code,{children:`O`}),` = 是。`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Slot`}),`：决定出现哪一栏的宝可梦（从左到右排列）。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`HA`}),`：是否拥有隐藏特性`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`X`}),` = 否，`,(0,n.jsx)(r.code,{children:`O`}),` = 是。`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：准备工作`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开游戏《X/Y》，在 3DSRNGTool 中连接 NTR 助手。`}),`
`,(0,n.jsx)(r.li,{children:`进入想要乱数的朋友狩猎区。`}),`
`,(0,n.jsxs)(r.li,{children:[`走到区域左侧、草地外侧并存档。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`你可以进行测试运行，或重启游戏使用本教程后面介绍的重抽种子方法寻找目标帧。`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：本教程假定你已掌握第六世代的基本乱数流程。建议先从如孵化乱数这类更简单的目标入门。
`})}),`
`,(0,n.jsx)(r.h2,{children:`第二步：操控 TinyMT`}),`
`,(0,n.jsx)(r.p,{children:`要在目标帧成功触发遇敌，需要借助以下方式操控 TinyMT。推荐先通过测试帧练习操控 TinyMT。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`选择一个测试帧作为目标帧。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`在 3DSRNGTool 的 `,(0,n.jsx)(r.code,{children:`野生乱数`}),` 页面中搜索帧。`]}),`
`,(0,n.jsx)(r.li,{children:`如果使用同步特性，可暂不考虑性格。`}),`
`,(0,n.jsx)(r.li,{children:`右键点击目标帧，选择"设为目标帧"。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`角色走进草地的第一格。`}),`
`,(0,n.jsxs)(r.li,{children:[`按 `,(0,n.jsx)(r.code,{children:`X`}),` 打开菜单防止角色自动晃动，避免 TinyMT 进位干扰。`]}),`
`,(0,n.jsxs)(r.li,{children:[`回到 `,(0,n.jsx)(r.code,{children:`野生乱数`}),` 页，打开 `,(0,n.jsx)(r.code,{children:`TinyMT 时间线工具`}),`。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`勾选 `,(0,n.jsx)(r.code,{children:`考虑延迟`}),` 并设置延迟为 6。`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`点击 `,(0,n.jsx)(r.code,{children:`校准`}),` 开始校准 Tiny Seeds，等待完成。`]}),`
`,(0,n.jsxs)(r.li,{children:[`若目标 TinyMT 帧未与主 RNG 帧重叠，则退出草地再重新进入并再次打开菜单，然后重新校准。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`重复此操作直至 TinyMT 帧与目标帧对齐。`}),`
`,(0,n.jsx)(r.li,{children:`微调 TinyMT 帧可原地转向`}),`
`,(0,n.jsx)(r.li,{children:`快速推进 TinyMT 帧可在左侧草地上下移动。`}),`
`,(0,n.jsx)(r.li,{children:`若触发遇敌事件，需在之后走至少 5 步才能再次遇敌。即使成功乱数也需记住此规则。`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第三步：命中目标帧`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`为避免随机 TinyMT 索引进位（+2），需在目标帧对应索引时关闭菜单，并按下 `,(0,n.jsx)(r.code,{children:`Start + Select`}),` 暂停游戏。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`使用 `,(0,n.jsx)(r.code,{children:`Select`}),` 每次推进一帧，直至达到目标帧。`]}),`
`,(0,n.jsx)(r.li,{children:`操作需在草地格上完成。`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`按 `,(0,n.jsx)(r.code,{children:`A`}),` 解除暂停，然后用方向键转向触发遇敌。`]}),`
`,(0,n.jsx)(r.li,{children:`若需要，也可校准延迟，但在朋友狩猎区中，转向时一般设定延迟为 6，移动触发则为 14。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`重新抽种子法`}),`
`,(0,n.jsx)(r.p,{children:`在你掌握 TinyMT 操控后，可使用 NTR 助手快速寻找更高帧的目标。该方法有助于快速筛选理想帧。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`打开游戏《X/Y》并连接 NTR 助手。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`点击 `,(0,n.jsx)(r.code,{children:`One Click`}),` 自动连接并获取初始种子。`]}),`
`,(0,n.jsxs)(r.li,{children:[`具体操作请参考 `,(0,n.jsx)(r.a,{href:`/ntr-helper-usage`,children:`NTR 助手使用教程`}),`。`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`按 `,(0,n.jsx)(r.code,{children:`A`}),` 进入继续游戏界面，种子即在此时确定。`]}),`
`,(0,n.jsxs)(r.li,{children:[`使用当前种子搜索目标帧，若结果不理想可重新抽种：`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`按 `,(0,n.jsx)(r.code,{children:`B`}),` 返回标题界面后再次按 `,(0,n.jsx)(r.code,{children:`A`}),` 进入继续界面。`]}),`
`,(0,n.jsx)(r.li,{children:`每次这样操作都会刷新初始种子。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`重复操作直到出现理想目标帧。`}),`
`,(0,n.jsx)(r.li,{children:`正式进入存档后，照前述方法操控 TinyMT，并在目标帧触发遇敌获得目标宝可梦。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：战斗中帧推进速度是场外的两倍。你可以通过进入战斗快速推进 RNG 帧，然后再操控 TinyMT。但要预留额外操作时间，以免错过目标帧。
`})}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};