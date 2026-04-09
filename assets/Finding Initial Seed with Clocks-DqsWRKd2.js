import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-5uoNgSDO.js";var n=e(),r=[{title:`究极之日 / 究极之月 使用时钟寻找初始 Seed`,description:`学习如何通过时钟指针的规律来寻找《究极之日 / 究极之月》的初始 Seed —— 无需破解系统。`,slug:`zh-retail-usum-initial-seed-clocks`,translation:{enSlug:`retail-usum-initial-seed-clocks`,language:`zh`}},{title:`日 / 月 使用时钟寻找初始 Seed`,description:`学习如何通过时钟指针的规律来寻找《日 / 月》的初始 Seed —— 无需破解系统。`,slug:`zh-retail-sm-initial-seed-clocks`,translation:{enSlug:`retail-sm-initial-seed-clocks`,language:`zh`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`摄像设备（手机摄像头即可）`}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`基本原理`}),`
`,(0,n.jsxs)(r.p,{children:[`每次启动游戏时，都会生成一个 `,(0,n.jsx)(r.code,{children:`initial seed`}),`（也称为 `,(0,n.jsx)(r.code,{children:`seed`}),`）。这个 seed 会用于野生宝可梦、事件、游戏内赠送宝可梦等内容的乱数判定。`]}),`
`,(0,n.jsxs)(r.p,{children:[`在游戏的"Continue（继续）"画面中，在角色头像加载出来之前，你可以看到一个时钟。通过观察时钟指针最终停留的位置，我们就可以反推出初始 Seed。在不重启游戏的情况下，你需要记录 8～10 次时钟。你可以按下 `,(0,n.jsx)(r.code,{children:`B`}),` 键离开"Continue"画面。`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/Initial-Seed/ClockNeedles.gif`,alt:`Clocks Needles`})}),`
`,(0,n.jsx)(r.h2,{children:`第一步：设置 3DSRNGTool`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开你下载的 3DSRNGTool。`}),`
`,(0,n.jsx)(r.li,{children:`在右上角选择你的游戏版本（"太阳""月亮""究极之日" 或 "究极之月"）。`}),`
`,(0,n.jsx)(r.li,{children:`进入 "工具" > "7代主乱数工具"。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/Initial-Seed/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsxs)(r.ol,{start:`4`,children:[`
`,(0,n.jsxs)(r.li,{children:[`确认 `,(0,n.jsx)(r.code,{children:`输入`}),` 中选择了 `,(0,n.jsx)(r.code,{children:`结束位置`}),`，并且数值为 `,(0,n.jsx)(r.code,{children:`4`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`同时勾选 `,(0,n.jsx)(r.code,{children:`通过指针检索初始seed`}),` 选项。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：录制时钟指针`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`启动 3DS 并进入游戏，停留在 "按 Start 键" 画面。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`可以让动画正常播放，它们不会影响 Seed 或帧数。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`使用摄像设备开始录制你的 3DS 屏幕。`}),`
`,(0,n.jsxs)(r.li,{children:[`按下 `,(0,n.jsx)(r.code,{children:`A`}),` 或 `,(0,n.jsx)(r.code,{children:`Start`}),` 进入 "继续游戏" 画面。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`需要完整录下整个时钟的运动过程：从进入 "继续游戏" 画面开始，到角色头像出现为止。`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`按下 `,(0,n.jsx)(r.code,{children:`B`}),` 返回 "按 Start 键" 画面。`]}),`
`,(0,n.jsx)(r.li,{children:`在 "按 Start 键" 与 "继续游戏" 画面之间来回切换，直到记录到 10 次时钟指针的运动。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第三步：查找 Seed`}),`
`,(0,n.jsx)(r.p,{children:`在录制好 10 次时钟后，将结果输入工具以查找初始 Seed。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`在 `,(0,n.jsx)(r.code,{children:`输入`}),` 中，选择每一次时钟最终停留位置所对应的选项。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`这里的结束位置指的是角色头像加载出来之前的最终位置。`}),`
`,(0,n.jsx)(r.li,{children:`在本文开头展示的 gif 中，对应的结束位置是7代主乱数工具中的最后一个选项。`}),`
`,(0,n.jsxs)(r.li,{children:[`你会看到一个数字出现在 `,(0,n.jsx)(r.code,{children:`指针列表`}),` 中（gif 示例中为 12）。`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`当你输入了 8 个指针位置后，工具就会尝试计算初始 Seed。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/UltraSun-UltraMoon/Initial-Seed/Result.png`,alt:`Result`})}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`仅输入 8 个指针位置时，可能会得到多个结果，这也是我们要记录 10 次时钟的原因。继续输入剩余的 2 个指针位置，直到只剩下一个 Seed。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`最后 2 个指针位置用于确认 Seed 是否正确。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`如果没有任何结果，请重新检查录像，确认指针位置是否有录入错误。`}),`
`,(0,n.jsx)(r.li,{children:`如果仍然无法得到结果，请重启游戏并重新录制 10 次时钟。`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`如果操作正确，最终你的初始 Seed 会显示在 `,(0,n.jsx)(r.code,{children:`检索结果`}),` 栏中。`]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};