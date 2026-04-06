import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CndXGoE5.js";var n=e(),r={title:`火红叶绿野生乱数`,navDrawerTitle:`Wild RNG`,description:`在《火红·叶绿》中使用甜甜香气进行野生宝可梦的乱数`,slug:`zh-emulator-frlg-wild`,translation:{enSlug:`emulator-frlg-wild`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`带有 Lua 脚本的 mGBA 模拟器`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:`表 ID 和里 ID（若目标为异色宝可梦）`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`提示：如果你只是为了异色宝可梦而进行乱数，请确保在 PokeFinder 中设置含有该存档 TID 与 SID 的配置档。
`})}),`
`,(0,n.jsx)(r.h2,{children:`第一步：设置 PokeFinder`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 PokeFinder，选择第三世代的 “野生乱数”，并确保你位于 “生成器” 标签页。`}),`
`,(0,n.jsx)(r.li,{children:`将 “方式” 设置为 方式 1。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`提示：《火红·叶绿》中确实存在其他方法，但 H-1 是最常见、最推荐的。其他方法依赖于 v-blank，出现几率极低。
`})}),`
`,(0,n.jsxs)(r.ol,{start:`3`,children:[`
`,(0,n.jsx)(r.li,{children:`将“地点” 设置为你将要进行乱数的地点。`}),`
`,(0,n.jsxs)(r.li,{children:[`如果你有指定目标宝可梦，在选择地点后可在 “宝可梦” 中选择该宝可梦。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`若宝可梦未出现在列表中，或者你想要指定的遭遇槽，请选择 “遇敌种类” 中对应的数字，并将 “宝可梦” 留空。`}),`
`,(0,n.jsxs)(r.li,{children:[`可参考 `,(0,n.jsx)(r.a,{href:`https://sites.google.com/site/pokemonslots/gen-iii/emerald`,children:`此网站`}),`获取具体遭遇槽数据：`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`“遇敌” 设置为 “草” 或 “冲浪”，本教程聚焦于使用甜甜香气触发战斗。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`提示：《火红·叶绿》中迷人之躯和同步并不会影响乱数。
`})}),`
`,(0,n.jsxs)(r.ol,{start:`6`,children:[`
`,(0,n.jsxs)(r.li,{children:[`填写目标地点的延迟值。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`可参考 `,(0,n.jsx)(r.a,{href:`https://docs.google.com/spreadsheets/d/1cVweVvJXCXeTZOBVKVCBbcSI46rqBXV3ahbuoSGOnzk/edit#gid=1091733147`,children:`Google Doc`}),` 获取每个区域的延迟值。`]}),`
`,(0,n.jsx)(r.li,{children:`注意：通常存在 ±1 的误差范围。`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：获取初始种子`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在你想进行乱数的地点存档。`}),`
`,(0,n.jsx)(r.li,{children:`重启模拟器。`}),`
`,(0,n.jsx)(r.li,{children:`游戏加载后，进入继续画面。`}),`
`,(0,n.jsx)(r.li,{children:`暂停游戏，此时 Lua 脚本会在屏幕上显示初始种子。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`提示：《火红·叶绿》每次加载游戏都会生成不同的种子，和《红蓝宝石》无电电池或《绿宝石》的固定种子不同。这意味着你可以反复重置来刷更理想的种子。
`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Wild/Initial-Seed.png`,alt:`初始种子`})}),`
`,(0,n.jsx)(r.h2,{children:`第三步：寻找目标帧数`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在 Seed 输入框中填写初始种子。`}),`
`,(0,n.jsxs)(r.li,{children:[`设定目标宝可梦的条件（是否异色、个体值、性格等）。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`如果目标为完美个体的异色，可能需要等待非常高的帧数。`}),`
`,(0,n.jsx)(r.li,{children:`若无结果，请放宽筛选条件。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`点击 “生成”。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Wild/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsx)(r.p,{children:`如图所示，本例的筛选条件是“任意异色宝可梦（Route 5）”。`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`提示：你可以按 B 键回到开场动画，再按 A 进入继续画面，借此更换初始种子。重复操作直到得到一个更合适的种子。
`})}),`
`,(0,n.jsx)(r.h2,{children:`第四步：开始乱数`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`找到目标帧数后，进入游戏。`}),`
`,(0,n.jsx)(r.li,{children:`推进到接近目标帧数前几千帧的位置。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`提示：教学电视可以极大地加速推进帧数。使用它可使乱数每帧推进速度提升 313 倍，可在几分钟内推进数百万帧。

在背包中打开教学电视并关闭它，即可迅速推进帧数。
`})}),`
`,(0,n.jsxs)(r.ol,{start:`3`,children:[`
`,(0,n.jsxs)(r.li,{children:[`打开训练师卡片并按下 A 翻转 一次。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`翻转能刷新延迟，有助于避免因帧数过高而导致延迟偏移。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`选择拥有“甜甜香气”的宝可梦，移动光标至该技能上。`}),`
`,(0,n.jsx)(r.li,{children:`当接近目标帧数时，暂停游戏并建立即时存档。然后使用 Ctrl + N 逐帧推进至目标帧。`}),`
`,(0,n.jsxs)(r.li,{children:[`在目标帧时，同时按住 A 并取消暂停。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`如果遇到的宝可梦不是目标个体，请尝试在前后各一帧进行操作。`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`若上述操作正确无误，你将成功遇到目标宝可梦。完成了第三世代的野生乱数！`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/FireRed-LeafGreen/Wild/Success.png`,alt:`成功！`})}),`
`,(0,n.jsx)(r.h2,{children:`问题排除`}),`
`,(0,n.jsx)(r.p,{children:`如果尝试了 ±1 帧仍未命中目标，请手动判断你实际命中的帧数，并据此调整。`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};