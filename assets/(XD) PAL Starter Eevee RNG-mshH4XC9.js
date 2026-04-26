import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-B5eGYVya.js";var n=e(),r={title:`PAL 版宝可梦 XD 伊布乱数`,description:`如何在 PAL 版宝可梦 XD 中乱数初始伊布`,slug:`zh-pal-xd-eevee`,translation:{enSlug:`pal-xd-eevee`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`支持 Lua 的 Dolphin 模拟器（可在相关 Discord 获取）`}),`
`,(0,n.jsx)(r.li,{children:`GameCube 专用 Lua 脚本（可在相关 Discord 获取）`}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsxs)(r.li,{children:[`PAL-Pal 工具（由 Kapital#9267 开发）(`,(0,n.jsx)(r.a,{href:`https://github.com/KapitalRoser/PAL-Pal`,children:`https://github.com/KapitalRoser/PAL-Pal`}),`)`]}),`
`,(0,n.jsx)(r.li,{children:`一个全新的 PAL 版 XD 存档`}),`
`,(0,n.jsxs)(r.li,{children:[`Parzival#3035 整理的异色伊布个体值种子列表（适用于方法 2）(`,(0,n.jsx)(r.a,{href:`https://pastebin.com/0Dh740Kg`,children:`https://pastebin.com/0Dh740Kg`}),`)`]}),`
`,(0,n.jsx)(r.li,{children:`RunAsDate（64 位）工具，用于方法 2`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`简介`}),`
`,(0,n.jsx)(r.p,{children:`本教程介绍了两种在 PAL 版宝可梦 XD 中乱数初始伊布的方法。
根据你的需求选择使用哪一种：`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`方法 1：只使用 PAL-Pal 工具，适合找任意一只伊布（但不可预知性较高，个体可能不好）`}),`
`,(0,n.jsx)(r.li,{children:`方法 2：使用已知的异色伊布种子列表，通过初始种子乱数获取高素质个体`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`本教程默认你已了解基本的模拟器设置及 PAL XD 的初始种子乱数方法。`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：本教程只适用于 PAL 版的 XD，不适用于 NTSC（美版）！
`})}),`
`,(0,n.jsx)(r.h2,{children:`帧数推进方法说明`}),`
`,(0,n.jsx)(r.p,{children:`由于 PAL 版在命名界面时 RNG 会冻结，你需要以下方式推进帧数：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`重选宝可梦：主菜单中选择“VS 模式” -> “快速对战” -> “与 CPU 对战” -> 终极。每次出现宝可梦画面时会推进一次帧数。按“否”并重复。`}),`
`,(0,n.jsx)(r.li,{children:`记忆卡读取：在主菜单中按 B 和 A，会重新加载记忆卡数据，画面会提示，此操作推进 1 次。`}),`
`,(0,n.jsx)(r.li,{children:`设置保存：在设置中切换震动选项并保存，然后返回主菜单。`}),`
`,(0,n.jsx)(r.li,{children:`命名界面黑屏法：开始新游戏时，当询问是否使用特定名字时按 B 退出。不要选择名字，否则无法回退。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：只有当当前种子等于目标种子时，才设置训练师名字。否则请勿继续进入命名界面！
`})}),`
`,(0,n.jsx)(r.h2,{children:`方法一：仅使用 PAL-Pal 工具`}),`
`,(0,n.jsx)(r.p,{children:`这是最简单的方法，适合乱数任意伊布（可能无法获得理想个体，耗时也可能较长）：`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 Dolphin，加载 Lua 脚本，在主菜单查看当前种子，然后暂停模拟器。`}),`
`,(0,n.jsx)(r.li,{children:`打开 PAL-Pal，进入「Speedrun」标签页，设置筛选条件（是否异色、个体、性别、性格），点击保存。`}),`
`,(0,n.jsx)(r.li,{children:`将当前种子（Hex）输入 PAL-Pal 的对应栏位，搜索结果。`}),`
`,(0,n.jsx)(r.li,{children:`通过「Next」和「Previous」按钮浏览结果。`}),`
`,(0,n.jsx)(r.li,{children:`找到目标结果后，按说明进行推进，完成乱数。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`方法二：使用异色伊布种子列表`}),`
`,(0,n.jsx)(r.p,{children:`此方法需要进行初始种子乱数，但能快速获得高个体或理想性格的异色伊布。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 PokeFinder，进入「Gamecube RTC」标签页。将想要的异色伊布的种子输入 Target Seed 栏位。请确保初始种子位于推进 15,000 - 20,000 的区间。`}),`
`,(0,n.jsx)(r.li,{children:`使用 RunAsDate、Dolphin 和 Lua 脚本完成初始种子乱数。在主菜单暂停模拟器。`}),`
`,(0,n.jsx)(r.li,{children:`打开 PAL-Pal，进入「Custom」标签页，输入当前种子。`}),`
`,(0,n.jsx)(r.li,{children:`目标标题种子（Target Title Seed）并不是你想要的最终种子，而是用于命中它的中间种子。打开 PokeFinder 的 Researcher，模式设为 XDRNG[R]，将目标种子填入 Seed 栏位，设置最大推进为 1010，点击生成。查看推进 1000 处的种子，即为 Target Title Seed。`}),`
`,(0,n.jsx)(r.li,{children:`在 PAL-Pal 中输入该种子并点击 Search，你的目标伊布应该会出现在结果第一行。按提示推进种子并获取伊布。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：实际延迟可能不是刚好 1000，可能略微有出入。建议先按 1000 尝试，如果不符，则以帧数 1002 或 1004 的结果为准继续微调推进。
`})}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};