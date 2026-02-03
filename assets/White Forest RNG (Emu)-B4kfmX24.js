import{g7 as l,j as n}from"./index-Dw-l60qV.js";const t=[{title:"白森林乱数",description:"白森林乱数",slug:"zh-emulator-bw-white-forest",translation:{enSlug:"emulator-bw-white-forest",language:"zh"}}];function i(r){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...l(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：本指南假设你已具备基础知识。你应当能够建立配置文件、进行野生乱数，并理解种子生成过程中的噪音推进。
`})}),`
`,n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,n.jsx(e.li,{children:"Pokémon White"}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：你可以使用 PokeCGear 工具（http://projectpokemon.org/forums/attachment.php?attachmentid=10632&d=1362758021）编辑白森林中的训练家/可遇宝可梦，但本指南不会涉及此内容。
`})}),`
`,n.jsx(e.h2,{children:"设置"}),`
`,n.jsx(e.p,{children:"白森林拥有丰富的宝可梦种类，因此乱数操作非常有趣。虽然无法使用甜甜香，但有一个非常有利的机制：每次进入白森林后，在草地或水面上迈出的第一步将 100% 遇敌。"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 Desmume 并加载 Lua 脚本。在 PokeFinder 中选择目标个体（建议 PID 帧数为 150～200 左右）。"}),`
`,n.jsx(e.li,{children:"将位置移动至白森林门外，建议在 14 号道路附近的门口保存。那里离草地更近，也可以从 15 号道路进入。"}),`
`,n.jsx(e.li,{children:"行走一段距离，直到 IV 帧数开始计数。这表示重置后你可以安全走到草地而不会触发随机 IV 帧推进。"}),`
`,n.jsx(e.li,{children:"保存并执行初始种子乱数。不要开启 C-Gear。"}),`
`,n.jsx(e.li,{children:"进入游戏后，迅速进入白森林并走到能够触发遇敌的草丛旁。打开菜单。"}),`
`,n.jsx(e.li,{children:"在此处创建即时存档。让游戏运行片刻，寻找一个“长推进”时机（即 PID 帧长时间不变的时候），以便在该帧推进一步。找到后，重新读取即时存档，再次推进至该帧，并立即进入宝可梦菜单。使用聒噪鸟提升到目标帧，关闭所有菜单并迈出那一步。"}),`
`]}),`
`,n.jsx(e.p,{children:"恭喜！你已成功完成白森林的乱数设置！"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function c(r={}){const{wrapper:e}={...l(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(i,{...r})}):i(r)}export{c as default,t as frontmatter};
