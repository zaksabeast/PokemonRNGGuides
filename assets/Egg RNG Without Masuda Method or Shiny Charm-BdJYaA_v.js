import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-BWlJUHS5.js";var n=e(),r=[{title:`不使用 Masuda 法或闪耀护符的孵化乱数（ORAS）`,description:`学习如何在《宝可梦 欧米伽红宝石／阿尔法蓝宝石》中通过培育屋进行孵化乱数，实现高个体或异色宝可梦孵化。`,slug:`zh-retail-oras-egg-no-mmsc`,translation:{enSlug:`retail-oras-egg-no-mmsc`,language:`zh`}},{title:`不使用 Masuda 法或闪耀护符的孵化乱数（XY）`,description:`学习如何在《宝可梦 X/Y》中通过培育屋进行孵化乱数，实现高个体或异色宝可梦孵化。`,slug:`zh-retail-xy-egg-no-mmsc`,translation:{enSlug:`retail-xy-egg-no-mmsc`,language:`zh`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components},{ShowIf:i}=r;return i||o(`ShowIf`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(i,{slug:`/zh-retail-oras-egg-no-mmsc`,children:[(0,n.jsxs)(r.p,{children:[`本教程适用于`,(0,n.jsx)(r.strong,{children:`欧米伽红宝石／阿尔法蓝宝石`}),`。`]}),(0,n.jsx)(r.p,{children:`想查看其他版本的教程？请前往：`}),(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/zh-retail-xy-egg-no-mmsc`,children:`XY 孵化乱数教程（无 Masuda/闪耀护符）`})}),`
`]})]}),`
`,(0,n.jsxs)(i,{slug:`/zh-retail-xy-egg-no-mmsc`,children:[(0,n.jsxs)(r.p,{children:[`本教程适用于`,(0,n.jsx)(r.strong,{children:`X/Y`}),`。`]}),(0,n.jsx)(r.p,{children:`想查看其他版本的教程？请前往：`}),(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/zh-retail-oras-egg-no-mmsc`,children:`ORAS 孵化乱数教程（无 Masuda/闪耀护符）`})}),`
`]})]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`本方法与使用 Masuda 法或携带闪耀护符的方法不同。你需要先进行蛋性状的乱数，再在领蛋时对蛋的 ESV（及 PID）进行乱数。相比之下，这种方式等待时间可能更短。
`})}),`
`,(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/zh-install-pokereader`,children:`已安装 PokeReader 的 3DS`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：输入乱数信息`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`输入你的游戏版本和 TSV。`}),`
`,(0,n.jsx)(r.li,{children:`输入初始种子。`}),`
`,(0,n.jsx)(r.li,{children:`请勿勾选闪耀护符选项——本方法不支持使用闪耀护符。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`想让蛋的 ESV 与他人 TSV 匹配？点击"TSV列表"添加 TSV，并勾选"其他TSV异色"。但右上角仍需填写你自己的 TSV，否则结果会错误。
`})}),`
`,(0,n.jsx)(r.h2,{children:`第二步：填写亲代信息`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`根据所用的亲代填写信息。`}),`
`,(0,n.jsx)(r.li,{children:`不要勾选 Masuda Method。`}),`
`,(0,n.jsx)(r.li,{children:`如果亲代语言不同，此方法将无法使用。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：地区不影响 Masuda 法，语言才是关键。

另外，当使用无性别宝可梦和百变怪繁殖时，系统会将百变怪视为雌性。
`})}),`
`,(0,n.jsx)(r.h2,{children:`第三步：设置蛋种子、筛选条件与目标帧`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在孵化seed输入当前的蛋种子。`}),`
`,(0,n.jsx)(r.li,{children:`在筛选条件中填写你希望孵出的蛋状态。`}),`
`,(0,n.jsx)(r.li,{children:`不要勾选仅异色帧，异色部分将在后续处理。`}),`
`,(0,n.jsxs)(r.li,{children:[`游戏中按下 `,(0,n.jsx)(r.code,{children:`Start + Select`}),` 暂停。`]}),`
`,(0,n.jsx)(r.li,{children:`输入当前帧，并设置搜索范围，范围越大，找到的帧越多。`}),`
`,(0,n.jsx)(r.li,{children:`点击 "接受" 表示接受第一个蛋，或 "拒绝" 表示拒绝第一个蛋。建议接受第一个蛋以验证其是否为帧数 -1。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`提示：选择拒绝蛋时，考虑延迟计数器会归零。
`})}),`
`,(0,n.jsxs)(r.ol,{start:`7`,children:[`
`,(0,n.jsx)(r.li,{children:`设置完成后点击"计算"生成目标帧列表。若无结果，可扩大搜索范围再试一次。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第四步：乱数目标蛋的状态（不含 PID / ESV）`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`选择一个目标帧。`}),`
`,(0,n.jsx)(r.li,{children:`如果你当前帧为偶数，而目标帧为奇数（或反之），可以解冻并保存游戏一次以切换奇偶性。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`记住以下要点：`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`非战斗中帧数每次增加 2。`}),`
`,(0,n.jsx)(r.li,{children:`帧数始终保持奇数或偶数。`}),`
`,(0,n.jsx)(r.li,{children:`保存一次可切换奇偶性。`}),`
`,(0,n.jsx)(r.li,{children:`第一个领取或拒绝的蛋并不是你乱数的目标。`}),`
`,(0,n.jsx)(r.li,{children:`蛋的状态在你领取或拒绝前一个蛋时已被决定。`}),`
`,(0,n.jsx)(r.li,{children:`PID 和 ESV 在你领取蛋时才会生成。`}),`
`,(0,n.jsx)(r.li,{children:`下一个蛋的状态在你领取或拒绝第一个蛋时已被决定。`}),`
`,(0,n.jsx)(r.li,{children:`第二个蛋（即你真正要领取的目标蛋）才具备你预期的状态。`}),`
`,(0,n.jsx)(r.li,{children:`帧数 -1 对应的是当前可领取的那个蛋。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第五步：命中目标帧`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`与培育屋大叔对话，看到以下提示：`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`若要领蛋："你会想要这颗蛋，对吧？"（ORAS）或 "你是想要它的吧？"（XY），停留在"是"的选项上等待目标帧。`}),`
`,(0,n.jsx)(r.li,{children:`若要拒绝："那我就先帮你保管吧，谢谢！"（XY / ORAS），在你选择"否"之后出现。`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`接近目标帧时按 `,(0,n.jsx)(r.code,{children:`Start + Select`}),` 暂停，然后反复按 `,(0,n.jsx)(r.code,{children:`Select`}),` 逐帧推进。`]}),`
`,(0,n.jsx)(r.li,{children:`到达目标帧时，按住 A 解除暂停并领取/拒绝蛋。`}),`
`,(0,n.jsx)(r.li,{children:`第一个蛋不是你乱数的目标蛋。`}),`
`,(0,n.jsx)(r.li,{children:`游戏中的蛋种子应与 3DSRNGTool 中所显示的目标帧一致。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第六步：乱数目标蛋的 ESV`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在目标帧上右键并点击 "将该帧设为当前状态"。`}),`
`,(0,n.jsx)(r.li,{children:`重置筛选条件并勾选 "仅异色帧"。`}),`
`,(0,n.jsx)(r.li,{children:`输入当前帧和搜索范围。`}),`
`,(0,n.jsx)(r.li,{children:`点击 "计算" 显示符合条件的帧。`}),`
`,(0,n.jsx)(r.li,{children:`像之前一样选择一个目标帧。`}),`
`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`若需切换奇偶性，请解除暂停并保存游戏一次。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第七步：命中目标帧（重复前述方法）`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`与培育屋大叔对话，看到以下提示：`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`若要领蛋："你会想要这颗蛋，对吧？"（ORAS）或 "你是想要它的吧？"（XY），停留在"是"的选项上等待目标帧。`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`接近目标帧时按 `,(0,n.jsx)(r.code,{children:`Start + Select`}),` 暂停，然后反复按 `,(0,n.jsx)(r.code,{children:`Select`}),` 逐帧推进。`]}),`
`,(0,n.jsx)(r.li,{children:`到达目标帧时按住 A 解冻并领取蛋。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`恭喜！你现在应该拿到了目标状态与 ESV 的蛋！`}),`
`,(0,n.jsx)(r.h2,{children:`故障排查`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`确认 3DSRNGTool 右上角的 TSV 与主界面中的 TSV 一致。`}),`
`,(0,n.jsx)(r.li,{children:`如果第一个蛋的状态与帧数 -1 不符，请确认你是否使用了正确的培育屋视角（ORAS）。`}),`
`,(0,n.jsx)(r.li,{children:`每次领取或拒绝蛋后，蛋种子应发生变化。若无变化，请确保已安装最新版 PokeReader，且游戏更新至最新版本。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};