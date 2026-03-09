import{ie as s,j as n}from"./index-DBJVNOlg.js";const c=[{title:"《究极之日／究极之月》野生宝可梦乱数",description:"学习如何在《究极之日／究极之月》中进行野生宝可梦乱数，以获得异色与高个体值结果。",slug:"zh-retail-usum-wild",translation:{enSlug:"retail-usum-wild",language:"zh"}},{title:"《太阳／月亮》野生宝可梦乱数",description:"学习如何在《太阳／月亮》中进行野生宝可梦乱数，以获得异色与高个体值结果。",slug:"zh-retail-sm-wild",translation:{enSlug:"retail-sm-wild",language:"zh"}}];function i(l){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/zh-install-pokereader",children:"安装了 PokeReader 的 3DS"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：在游戏中，你需要使用道具「甜甜蜜」来触发野生遭遇。通关三个试炼后，可以在任意商店购买「甜甜蜜」。
`})}),`
`,n.jsx(e.p,{children:"建议事先站在你打算进行乱数的地点。"}),`
`,n.jsxs(e.p,{children:["对于《太阳／月亮》，请参考以下列表，选择 NPC 数量为 0 或尽量少的遭遇点：",n.jsx(e.a,{href:"/misc-sm-wild-spots",children:"0 NPC / 最少 NPC 的遭遇槽位一览"})]}),`
`,n.jsx(e.h2,{children:"步骤 1：设置 3DSRNGTool"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"在右上角输入你的游戏版本与 TSV。"}),`
`,n.jsxs(e.li,{children:["同样在右上角输入初始 Seed（可在主 RNG 画面中看到 ",n.jsx(e.code,{children:"Init Seed:"}),"）。"]}),`
`,n.jsx(e.li,{children:"如果你拥有闪耀护符，请勾选「闪耀护符」。"}),`
`,n.jsx(e.li,{children:"选择「野生乱数」标签页。普通野生宝可梦请选择「普通野外」。究极异兽请选择「UB」。然后选择「地点」，并在「类别」下拉选单中选择目标宝可梦，工具会自动填入相关信息。"}),`
`,n.jsx(e.li,{children:"如果队伍首位宝可梦拥有特性「同步」，请在「同步性格」下拉选单中选择对应性格。这是确保乱数结果准确的重要步骤。"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：对于野生宝可梦，同步特性有 50% 的概率使宝可梦性格与首位宝可梦一致。使用同步特性可以显著提高找到目标帧数的概率。
`})}),`
`,n.jsxs(e.ol,{start:"6",children:[`
`,n.jsx(e.li,{children:"根据当前游戏时间勾选「白天」或「夜晚」。如果当前地图正在下雨，请同时勾选「下雨」，以确保乱数计算正确。"}),`
`]}),`
`,n.jsx(e.h2,{children:"步骤 2（有 NPC）：制作时间线"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：如果所在区域的 NPC 数量为 0，请跳至「0 NPC」步骤。在存在 NPC 的情况下，请勿勾选「仅眨眼帧」。
`})}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["按照",n.jsx(e.a,{href:"/zh-retail-usum-timeline",children:"时间线指南"}),"制作时间线并寻找目标帧数。在制作时间线前，请按下 ",n.jsx(e.code,{children:"X"})," 打开菜单，并将光标停留在「包包」上。"]}),`
`]}),`
`,n.jsx(e.h2,{children:"步骤 2（0 NPC）："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"不要勾选「仅眨眼帧」。"}),`
`,n.jsxs(e.li,{children:["按下 ",n.jsx(e.code,{children:"X"})," 打开菜单并将光标停留在「包包」上。在帧数范围中输入当前帧数。你可以通过 ",n.jsx(e.code,{children:"Start + Select"})," 暂停游戏。"]}),`
`,n.jsxs(e.li,{children:["根据需要调整筛选条件，然后点击「计算」，从结果中任选一个作为目标帧数。如果没有结果，请扩大帧数范围，或重启游戏以获取新的初始 Seed。",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"若重启游戏，请从本指南最开始重新操作。"}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：在 0 NPC 的情况下，可以使用圆庆广场来更快地推进帧数。请在距离目标帧数约一千帧时退出圆庆广场，以避免错过目标帧数。
`})}),`
`,n.jsx(e.h2,{children:"步骤 3：获取目标宝可梦"}),`
`,n.jsx(e.p,{children:"当你已经拥有时间线（若有 NPC）与目标帧数后，即可开始进行乱数。"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["通过按下 ",n.jsx(e.code,{children:"Start"})," 解除暂停来推进帧数。接近目标帧数时，使用 ",n.jsx(e.code,{children:"Start + Select"})," 暂停游戏，并在暂停状态下多次按 ",n.jsx(e.code,{children:"Select"})," 缓慢推进帧数。"]}),`
`,n.jsxs(e.li,{children:["到达目标帧数后，按下 ",n.jsx(e.code,{children:"A"})," 打开包包。打开包包所产生的延迟已被 3DSRNGTool 计算在内，无需额外计算。"]}),`
`,n.jsx(e.li,{children:"使用「甜甜蜜」，等待动画结束并进入战斗。"}),`
`]}),`
`,n.jsx(e.p,{children:"恭喜！你现在应该已经获得了想要的宝可梦。如果没有成功，可能需要调整帧数修正值，请参阅下方内容。"}),`
`,n.jsx(e.h2,{children:"调整帧数修正值"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`请再次确认所有输入的信息是否正确，尤其是初始 Seed。并确保你根据是否存在 NPC 使用了正确的方法，否则目标帧数可能会被跳过。
`})}),`
`,n.jsx(e.p,{children:"如果按照流程操作后仍未获得目标宝可梦，请在 3DSRNGTool 中调整「帧数修正」。修正值用于补偿地图加载所消耗的帧数，不同站位会产生不同的修正值。"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"将「目标帧数」设置为你原本的目标帧数。"}),`
`,n.jsx(e.li,{children:"点击「筛选条件」中的齿轮图标，重置筛选条件。"}),`
`,n.jsx(e.li,{children:"在「类别」中选择你实际遇到的宝可梦。"}),`
`,n.jsx(e.li,{children:"将「性格」设置为该宝可梦的性格。"}),`
`,n.jsx(e.li,{children:"点击「搜索」，在目标帧数附近寻找符合条件的帧数。由于修正值不正确，初始结果的个体值可能不一致。"}),`
`,n.jsx(e.li,{children:"逐步调整修正值（每次增减 1），并重复点击「搜索」，直到个体值与实际遇到的宝可梦一致。"}),`
`]}),`
`,n.jsx(e.p,{children:"一旦找到正确的修正值，只要你不移动角色，该修正值在之后的野生乱数中都会保持稳定。如果移动了角色，则可能需要重新调整。"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function d(l={}){const{wrapper:e}={...s(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(i,{...l})}):i(l)}export{d as default,c as frontmatter};
