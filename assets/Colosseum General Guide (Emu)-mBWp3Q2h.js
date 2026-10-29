import{t as e}from"./jsx-runtime-CLxixnhA.js";import{S as t}from"./index-jzB9fByq.js";var n=e(),r={title:`圆形竞技场模拟器乱数基础`,description:`学习使用模拟器在宝可梦圆形竞技场中进行乱数。`,slug:`zh-emulator-colosseum-general`,translation:{enSlug:`emulator-colosseum-general`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsx)(r.p,{children:`进行宝可梦圆形竞技场乱数，需要：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:`宝可梦圆形竞技场 ISO`}),`
`,(0,n.jsx)(r.li,{children:`Dolphin 4.0-6848（此版本支持圆形竞技场的 RTC）`}),`
`,(0,n.jsx)(r.li,{children:`RunAsDate（x64）`}),`
`,(0,n.jsx)(r.li,{children:`计算器`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`介绍`}),`
`,(0,n.jsx)(r.p,{children:`本指南介绍如何使用模拟器进行圆形竞技场乱数。需要具备 GameCube 乱数基础，尤其是 XD 乱数，并了解 Dolphin 与 VBA（Visual Boy Advance）的操作。`}),`
`,(0,n.jsx)(r.p,{children:`原始指南由 Jellal 提供。`}),`
`,(0,n.jsx)(r.h2,{children:`初始设置`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 PokeFinder，在第三世代中选择“Stationary”。`}),`
`,(0,n.jsx)(r.li,{children:`为圆形竞技场新建配置档案。`}),`
`,(0,n.jsx)(r.li,{children:`在第三世代定点乱数窗口中选择该档案，PokeFinder 会自动将搜索方式设为 Colo/XD。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`模拟器配置`}),`
`,(0,n.jsx)(r.p,{children:`本教程使用较旧的 Dolphin 版本，RTC 需要通过 RunAsDate 控制，因此正确配置十分重要。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`在 RunAsDate 中选择 `,(0,n.jsx)(r.code,{children:`Dolphin.exe`}),` 的路径。`]}),`
`,(0,n.jsx)(r.li,{children:`在 Date/Time 中选择“Absolute date/time”。`}),`
`,(0,n.jsxs)(r.li,{children:[`在“Parameters”中输入：`,(0,n.jsx)(r.code,{children:`" -d "`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`确保其他复选框均未勾选。`}),`
`,(0,n.jsx)(r.li,{children:`将日期和时间设为 2000 年 1 月 1 日凌晨 12:00:00。`}),`
`,(0,n.jsx)(r.li,{children:`通过 RunAsDate 启动 Dolphin。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`在 Dolphin 中打开游戏并暂停，在“View”中勾选“Watch”。向 RAM Watch 添加以下地址。`}),`
`,(0,n.jsx)(r.p,{children:`美版圆形竞技场：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`主 PRNG：`,(0,n.jsx)(r.code,{children:`80478c90`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 1：`,(0,n.jsx)(r.code,{children:`80473070`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 2：`,(0,n.jsx)(r.code,{children:`804731a8`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 3：`,(0,n.jsx)(r.code,{children:`804732e0`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 4：`,(0,n.jsx)(r.code,{children:`80473418`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 5：`,(0,n.jsx)(r.code,{children:`80473550`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 6：`,(0,n.jsx)(r.code,{children:`80473688`}),`。`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`欧版圆形竞技场：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`主 PRNG：`,(0,n.jsx)(r.code,{children:`804c6130`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 1：`,(0,n.jsx)(r.code,{children:`804c0508`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 2：`,(0,n.jsx)(r.code,{children:`804c0640`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 3：`,(0,n.jsx)(r.code,{children:`804c0778`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 4：`,(0,n.jsx)(r.code,{children:`804c08b0`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 5：`,(0,n.jsx)(r.code,{children:`804c09e8`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 6：`,(0,n.jsx)(r.code,{children:`804c0b20`}),`。`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`日版圆形竞技场：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`主 PRNG：`,(0,n.jsx)(r.code,{children:`80464360`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 1：`,(0,n.jsx)(r.code,{children:`8045e750`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 2：`,(0,n.jsx)(r.code,{children:`8045e888`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 3：`,(0,n.jsx)(r.code,{children:`8045e9c0`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 4：`,(0,n.jsx)(r.code,{children:`8045eaf8`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 5：`,(0,n.jsx)(r.code,{children:`8045ec30`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`AI 槽位 6：`,(0,n.jsx)(r.code,{children:`8045ed68`}),`。`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`点击“Save”保存，避免下次重复输入。`}),`
`,(0,n.jsx)(r.h2,{children:`乱数操作流程`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`在 PokeFinder 主窗口打开 `,(0,n.jsx)(r.code,{children:`Gen 3 Tools > IVs to PID`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`输入目标个体值和性格。`}),`
`,(0,n.jsx)(r.li,{children:`复制结果表中的种子。`}),`
`,(0,n.jsx)(r.li,{children:`打开第三世代工具中的 GameCube RTC，输入 2000 年 1 月 1 日对应的初始种子，以及 IVs to PID 窗口中的目标种子。`}),`
`,(0,n.jsx)(r.li,{children:`设置推进范围，例如最小 4000，然后点击“Search”。`}),`
`,(0,n.jsx)(r.li,{children:`GameCube RTC 会给出应在 RunAsDate 中设置的启动时间，用于命中所需初始种子。`}),`
`,(0,n.jsx)(r.li,{children:`将 RunAsDate 的日期和时间改为对应结果。`}),`
`,(0,n.jsx)(r.li,{children:`启动游戏，确认 RAM Watch 中的 PRNG 状态与 GameCube RTC 的种子一致。如果不同，请检查 Dolphin 版本、日期时间及 PRNG 数值。`}),`
`,(0,n.jsx)(r.li,{children:`在 PokeFinder 的第三世代定点窗口中，输入新初始种子和目标信息，选择配置档案，点击“Calculate”，查看目标推进数。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`推进并命中目标`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`启动游戏进入场景，确保可以从当前位置到达目标暗黑宝可梦。`}),`
`,(0,n.jsx)(r.li,{children:`遭遇前创建即时存档。`}),`
`,(0,n.jsxs)(r.li,{children:[`按环境选择推进方式。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`没有干扰的区域：距离目标超过 10,000 次推进时，查看暗黑宝可梦信息；少于 3,000 次时，查看普通宝可梦信息；少于 500 次时，在 PDA 菜单和暗黑宝可梦监视器之间切换。`}),`
`,(0,n.jsx)(r.li,{children:`有干扰的区域（Bayleef 法）：来回切换两只非暗黑宝可梦的信息界面。`}),`
`,(0,n.jsx)(r.li,{children:`战斗中：利用战斗推进乱数。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`无干扰区域可以控制推进数，有干扰区域的 PRNG 则会不受控制地推进，需要尝试命中正确状态。`}),`
`,(0,n.jsx)(r.li,{children:`使用上述方法推进，接近目标时不断创建即时存档。`}),`
`,(0,n.jsx)(r.li,{children:`距离目标还有 5 次推进时，触发遭遇，检查对应 AI 槽位中的暗黑宝可梦是否符合目标。`}),`
`,(0,n.jsx)(r.li,{children:`也可以在 Memory View 中输入 PRNG 地址进行确认。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`之后可以先击败目标、稍后再捕捉，也可以立即捕捉。通关后，可以使用从 GBA 正作传来的潜水球、重复球或豪华球，捕捉异色暗黑宝可梦。`}),`
`,(0,n.jsx)(r.p,{children:`恭喜你！已经获得异色暗黑宝可梦了。`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};