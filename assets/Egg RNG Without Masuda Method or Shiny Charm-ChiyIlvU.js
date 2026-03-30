import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-BB5MVq97.js";var n=e(),r=[{title:`究极日月无不同语言/无闪耀呼符孵蛋乱数`,description:`学习如何在《究极日月》中不依赖不同语言或闪耀呼符进行高个体异色宝可梦的孵蛋乱数。`,slug:`zh-retail-usum-egg-no-mmsc`,translation:{enSlug:`retail-usum-egg-no-mmsc`,language:`zh`}},{title:`日月无不同语言/无闪耀呼符孵蛋乱数`,description:`学习如何在《日月》中不依赖不同语言或闪耀呼符进行高个体异色宝可梦的孵蛋乱数。`,slug:`zh-retail-sm-egg-no-mmsc`,translation:{enSlug:`retail-sm-egg-no-mmsc`,language:`zh`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`与使用不同语言法和/或闪耀呼符有何不同？`}),`
`,(0,n.jsx)(r.p,{children:`使用不同语言法和/或闪耀呼符时，蛋的异色值（ESV）是按固定模式生成的，唯一能控制帧数的方式是选择接受或拒绝蛋。但不使用这些时，ESV 是在你接受蛋的那一刻才生成的，因此任意帧都有可能生成任意 ESV。`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`说明：ESV决定蛋是否异色。当 ESV 与训练家的 TSV（训练家异色值）相同时，孵出的宝可梦就是异色。
`})}),`
`,(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`一台安装了 `,(0,n.jsx)(r.a,{href:`/install-pokereader`,children:`PokeReader`}),` 的 3DS`]}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})}),`
`]}),`
`,(0,n.jsx)(r.hr,{}),`
`,(0,n.jsx)(r.h2,{children:`第一步：设置 3DSRNGTool`}),`
`,(0,n.jsx)(r.h3,{children:`在 3DSRNGTool 右上角：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`输入你所玩的游戏版本和 TSV。`}),`
`,(0,n.jsx)(r.li,{children:`输入初始种子。`}),`
`,(0,n.jsx)(r.li,{children:`取消勾选 “闪耀护符” 选项。使用此方法时不能持有闪耀呼符。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`如果你要乱数目标不是自己的 ESV，请点击 "其他TSV异色" 并输入目标 TSV。但你自己的 TSV 仍需保留在右上角，否则会导致结果不正确。
`})}),`
`,(0,n.jsx)(r.h3,{children:`父母信息部分：`}),`
`,(0,n.jsx)(r.p,{children:`根据你使用的亲代宝可梦填写：`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`确保未勾选 “父母语言不同”。此方法不能使用不同语言亲代。`}),`
`,(0,n.jsx)(r.li,{children:`检查父母语言是否相同，以避免后续问题。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`说明：所谓“不同语言法”，指的是两只宝可梦语言不同，地区无关。
`})}),`
`,(0,n.jsx)(r.p,{children:`百变怪与无性别宝可梦配对时，百变怪视为雌性，否则为与另一只亲代相反性别的宝可梦。`}),`
`,(0,n.jsx)(r.p,{children:`关于岩狗狗（黄昏）孵蛋：`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`若特性为“我行我素”，设置特性为 1/2/H 都不会影响结果。`}),`
`,(0,n.jsx)(r.li,{children:`若不是我行我素，则可能是 [1]锐利目光，[2]干劲，[H]不屈之心。`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`当前状态部分：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在“当前状态”中输入当前蛋的种子。`}),`
`,(0,n.jsx)(r.li,{children:`暂时不要勾选 “主乱数蛋 (PID)”。`}),`
`,(0,n.jsx)(r.li,{children:`在“个体筛选”中填写你希望孵出的宝可梦条件。`}),`
`,(0,n.jsx)(r.li,{children:`即使想要异色，也不要勾选 “仅异色帧”。我们之后会另外进行 ESV 乱数。`}),`
`,(0,n.jsx)(r.li,{children:`起始帧设为 “0”。`}),`
`,(0,n.jsx)(r.li,{children:`点击 “计算”。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：寻找目标帧`}),`
`,(0,n.jsx)(r.p,{children:`你可以选择任何列出的帧。较低的帧通常意味着更少的接收/拒绝操作。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`右键点击你想要的行，选择 “将该帧设为目标”。`}),`
`,(0,n.jsx)(r.li,{children:`点击 “最短路径” 然后点 “计算”，会计算出最短的接受/拒绝路径。`}),`
`,(0,n.jsx)(r.li,{children:`按照该路径顺序接收或拒绝蛋。顺序错误将导致种子错乱。不要提前接收目标蛋（即路径中最后一个蛋）。`}),`
`,(0,n.jsx)(r.li,{children:`得到目标蛋种子后，继续下一步。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第三步：乱数目标蛋的 ESV`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`接受蛋前站在培育员面前存档，以防失误。`}),`
`,(0,n.jsx)(r.li,{children:`与培育员对话并开始接蛋流程。`}),`
`,(0,n.jsxs)(r.li,{children:[`当出现“是否接收蛋”的选项时，使用 `,(0,n.jsx)(r.code,{children:`Start + Select`}),` 暂停游戏。`]}),`
`,(0,n.jsxs)(r.li,{children:[`通过以下步骤创建时间线以锁定目标 ESV：`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`在 “当前状态” 中勾选 “主乱数蛋(PID)”。`}),`
`,(0,n.jsx)(r.li,{children:`点击齿轮图标重置筛选条件。`}),`
`,(0,n.jsxs)(r.li,{children:[`参考 `,(0,n.jsx)(r.a,{href:`/retail-usum-timeline`,children:`时间线创建教程`}),` 创建时间线。`]}),`
`,(0,n.jsx)(r.li,{children:`时间线用于识别由于 NPC 影响后仍可命中的帧。`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`时间线创建后，搜索目标帧：`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`若要给其他人乱数异色蛋，请点击 "TSV列表"，输入 TSV 并勾选 "其他TSV异色"。`}),`
`,(0,n.jsx)(r.li,{children:`勾选 “仅异色帧”。`}),`
`,(0,n.jsx)(r.li,{children:`点击 “计算” 查找符合条件的帧。`}),`
`,(0,n.jsx)(r.li,{children:`选择任意一个蓝色高亮帧（帧数越低越省时间）。`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`推进到对应帧数后，按 `,(0,n.jsx)(r.code,{children:`A`}),` 接受蛋。`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`恭喜！你现在应该成功拿到目标蛋，且已乱数出想要的 ESV。如果失败，只需读取接蛋前的存档重新尝试。`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};