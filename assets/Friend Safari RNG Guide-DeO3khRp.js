import{ig as s,j as n}from"./index-BSl5j9_V.js";const r={title:"X/Y 朋友狩猎区乱数指南",description:"学习如何在《宝可梦 X/Y》中通过朋友狩猎区乱数获取异色六V宝可梦，包括百变怪和其他稀有种类。",slug:"zh-pcalc-xy-friend-safari",translation:{enSlug:"pcalc-xy-friend-safari",language:"zh"}};function e(l){const i={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(i.h2,{children:"所需工具"}),`
`,n.jsxs(i.ul,{children:[`
`,n.jsxs(i.li,{children:["已安装 PCalc 的 3DS（",n.jsx(i.a,{href:"/misc-3ds-installing-pcalc",children:"PCalc 安装教程"}),"）"]}),`
`,n.jsx(i.li,{children:n.jsx(i.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`,n.jsx(i.li,{children:n.jsx(i.a,{href:"https://github.com/Bambo-Rambo/TinyFinder/releases",children:"TinyFinder"})}),`
`]}),`
`,n.jsx(i.h2,{children:"必读资料"}),`
`,n.jsxs(i.ul,{children:[`
`,n.jsx(i.li,{children:n.jsx(i.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/wiki/Gen6-TinyMT-Timeline-Calibration",children:"TinyMT 时间线校准说明"})}),`
`,n.jsx(i.li,{children:n.jsx(i.a,{href:"/ntr-helper-usage",children:"NTR 助手使用指南"})}),`
`]}),`
`,n.jsx(i.h2,{children:"Tiny Timeline 工具中 TinyMT 各字段说明"}),`
`,n.jsxs(i.ul,{children:[`
`,n.jsxs(i.li,{children:[n.jsx(i.strong,{children:"Main RNG Frame"}),"：每个 TinyMT 帧对应的主 RNG 帧范围。通过操控 TinyMT 时间线使目标帧重叠。"]}),`
`,n.jsxs(i.li,{children:[n.jsx(i.strong,{children:"Enctr?"}),"：决定是否会遇敌。若值小于 13（即 0–12），则确保会遇敌。"]}),`
`,n.jsxs(i.li,{children:[n.jsx(i.strong,{children:"Sync?"}),"：是否能同步性格",`
`,n.jsxs(i.ul,{children:[`
`,n.jsxs(i.li,{children:[n.jsx(i.code,{children:"X"})," = 否，",n.jsx(i.code,{children:"O"})," = 是。"]}),`
`]}),`
`]}),`
`,n.jsxs(i.li,{children:[n.jsx(i.strong,{children:"Slot"}),"：决定出现哪一栏的宝可梦（从左到右排列）。"]}),`
`,n.jsxs(i.li,{children:[n.jsx(i.strong,{children:"HA"}),"：是否拥有隐藏特性",`
`,n.jsxs(i.ul,{children:[`
`,n.jsxs(i.li,{children:[n.jsx(i.code,{children:"X"})," = 否，",n.jsx(i.code,{children:"O"})," = 是。"]}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(i.h2,{children:"第一步：准备工作"}),`
`,n.jsxs(i.ol,{children:[`
`,n.jsx(i.li,{children:"打开游戏《X/Y》，在 3DSRNGTool 中连接 NTR 助手。"}),`
`,n.jsx(i.li,{children:"进入想要乱数的朋友狩猎区。"}),`
`,n.jsxs(i.li,{children:["走到区域左侧、草地外侧并存档。",`
`,n.jsxs(i.ul,{children:[`
`,n.jsx(i.li,{children:"你可以进行测试运行，或重启游戏使用本指南后面介绍的重抽种子方法寻找目标帧。"}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(i.pre,{children:n.jsx(i.code,{children:`注意：本指南假定你已掌握第六世代的基本乱数流程。建议先从如孵化乱数这类更简单的目标入门。
`})}),`
`,n.jsx(i.h2,{children:"第二步：操控 TinyMT"}),`
`,n.jsx(i.p,{children:"要在目标帧成功触发遇敌，需要借助以下方式操控 TinyMT。推荐先通过测试帧练习操控 TinyMT。"}),`
`,n.jsxs(i.ol,{children:[`
`,n.jsxs(i.li,{children:["选择一个测试帧作为目标帧。",`
`,n.jsxs(i.ul,{children:[`
`,n.jsxs(i.li,{children:["在 3DSRNGTool 的 ",n.jsx(i.code,{children:"野生乱数"})," 页面中搜索帧。"]}),`
`,n.jsx(i.li,{children:"如果使用同步特性，可暂不考虑性格。"}),`
`,n.jsx(i.li,{children:'右键点击目标帧，选择"设为目标帧"。'}),`
`]}),`
`]}),`
`,n.jsx(i.li,{children:"角色走进草地的第一格。"}),`
`,n.jsxs(i.li,{children:["按 ",n.jsx(i.code,{children:"X"})," 打开菜单防止角色自动晃动，避免 TinyMT 进位干扰。"]}),`
`,n.jsxs(i.li,{children:["回到 ",n.jsx(i.code,{children:"野生乱数"})," 页，打开 ",n.jsx(i.code,{children:"TinyMT 时间线工具"}),"。",`
`,n.jsxs(i.ul,{children:[`
`,n.jsxs(i.li,{children:["勾选 ",n.jsx(i.code,{children:"考虑延迟"})," 并设置延迟为 6。"]}),`
`]}),`
`]}),`
`,n.jsxs(i.li,{children:["点击 ",n.jsx(i.code,{children:"校准"})," 开始校准 Tiny Seeds，等待完成。"]}),`
`,n.jsxs(i.li,{children:["若目标 TinyMT 帧未与主 RNG 帧重叠，则退出草地再重新进入并再次打开菜单，然后重新校准。",`
`,n.jsxs(i.ul,{children:[`
`,n.jsx(i.li,{children:"重复此操作直至 TinyMT 帧与目标帧对齐。"}),`
`,n.jsx(i.li,{children:"微调 TinyMT 帧可原地转向"}),`
`,n.jsx(i.li,{children:"快速推进 TinyMT 帧可在左侧草地上下移动。"}),`
`,n.jsx(i.li,{children:"若触发遇敌事件，需在之后走至少 5 步才能再次遇敌。即使成功乱数也需记住此规则。"}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(i.h2,{children:"第三步：命中目标帧"}),`
`,n.jsxs(i.ol,{children:[`
`,n.jsxs(i.li,{children:["为避免随机 TinyMT 索引进位（+2），需在目标帧对应索引时关闭菜单，并按下 ",n.jsx(i.code,{children:"Start + Select"})," 暂停游戏。",`
`,n.jsxs(i.ul,{children:[`
`,n.jsxs(i.li,{children:["使用 ",n.jsx(i.code,{children:"Select"})," 每次推进一帧，直至达到目标帧。"]}),`
`,n.jsx(i.li,{children:"操作需在草地格上完成。"}),`
`]}),`
`]}),`
`,n.jsxs(i.li,{children:["按 ",n.jsx(i.code,{children:"A"})," 解除暂停，然后用方向键转向触发遇敌。"]}),`
`,n.jsx(i.li,{children:"若需要，也可校准延迟，但在朋友狩猎区中，转向时一般设定延迟为 6，移动触发则为 14。"}),`
`]}),`
`,n.jsx(i.h2,{children:"重新抽种子法"}),`
`,n.jsx(i.p,{children:"在你掌握 TinyMT 操控后，可使用 NTR 助手快速寻找更高帧的目标。该方法有助于快速筛选理想帧。"}),`
`,n.jsxs(i.ol,{children:[`
`,n.jsxs(i.li,{children:["打开游戏《X/Y》并连接 NTR 助手。",`
`,n.jsxs(i.ul,{children:[`
`,n.jsxs(i.li,{children:["点击 ",n.jsx(i.code,{children:"One Click"})," 自动连接并获取初始种子。"]}),`
`,n.jsxs(i.li,{children:["具体操作请参考 ",n.jsx(i.a,{href:"/ntr-helper-usage",children:"NTR 助手使用指南"}),"。"]}),`
`]}),`
`]}),`
`,n.jsxs(i.li,{children:["按 ",n.jsx(i.code,{children:"A"})," 进入继续游戏界面，种子即在此时确定。"]}),`
`,n.jsxs(i.li,{children:["使用当前种子搜索目标帧，若结果不理想可重新抽种：",`
`,n.jsxs(i.ul,{children:[`
`,n.jsxs(i.li,{children:["按 ",n.jsx(i.code,{children:"B"})," 返回标题界面后再次按 ",n.jsx(i.code,{children:"A"})," 进入继续界面。"]}),`
`,n.jsx(i.li,{children:"每次这样操作都会刷新初始种子。"}),`
`]}),`
`]}),`
`,n.jsx(i.li,{children:"重复操作直到出现理想目标帧。"}),`
`,n.jsx(i.li,{children:"正式进入存档后，照前述方法操控 TinyMT，并在目标帧触发遇敌获得目标宝可梦。"}),`
`]}),`
`,n.jsx(i.pre,{children:n.jsx(i.code,{children:`注意：战斗中帧推进速度是场外的两倍。你可以通过进入战斗快速推进 RNG 帧，然后再操控 TinyMT。但要预留额外操作时间，以免错过目标帧。
`})}),`
`,n.jsx(i.h2,{children:"特别鸣谢"}),`
`,n.jsxs(i.ul,{children:[`
`,n.jsx(i.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function d(l={}){const{wrapper:i}={...s(),...l.components};return i?n.jsx(i,{...l,children:n.jsx(e,{...l})}):e(l)}export{d as default,r as frontmatter};
