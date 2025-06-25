import{v as r,j as n}from"./index-BTqsL3Gv.js";const d={title:"固定宝可梦乱数",description:"在《火红·叶绿》中获取闪光六项个体值的传说宝可梦",slug:"zh-emulator-flrg-stationary-and-gift",translation:{enSlug:"emulator-flrg-stationary-and-gift",language:"zh"}};function e(i){const l={a:"a",h2:"h2",li:"li",ol:"ol",ul:"ul",...r(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(l.h2,{children:"所需工具"}),`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:n.jsx(l.a,{href:"/mgba-setup",children:"带有 Lua 脚本的 mGBA 模拟器"})}),`
`,n.jsx(l.li,{children:n.jsx(l.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`]}),`
`,n.jsx(l.h2,{children:"第一步：设置 PokeFinder"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:"加载游戏并启用 Lua 脚本。"}),`
`,n.jsx(l.li,{children:"在游戏进入“继续”画面时暂停模拟器。"}),`
`,n.jsx(l.li,{children:"查看 Lua 脚本中显示的初始种子。"}),`
`,n.jsx(l.li,{children:"打开 PokeFinder，进入“第三世代 定点乱数”下的“生成”标签页。"}),`
`,n.jsx(l.li,{children:"将种子填写到“Seed”输入框中。"}),`
`,n.jsxs(l.li,{children:["设置目标筛选条件（如闪光、个体值、性格等），然后点击“生成”。",`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:"方式 应设为“方式 1”。"}),`
`,n.jsx(l.li,{children:"如果没有结果，请放宽筛选条件或重启游戏以获取新种子。"}),`
`]}),`
`]}),`
`,n.jsx(l.li,{children:"从生成的结果中选择一个目标帧数。"}),`
`]}),`
`,n.jsx(l.h2,{children:"第二步：计算延迟"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:"角色应站在传说宝可梦、NPC 或宝可梦球前。"}),`
`,n.jsx(l.li,{children:"建立一个即时存档以防出错。"}),`
`,n.jsxs(l.li,{children:["推进至宝可梦生成前的最后画面。",`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:"若出现叫声或对话提示，一般表示已到达最后画面。"}),`
`]}),`
`]}),`
`,n.jsx(l.li,{children:"在目标帧数时按下 A 键开始战斗或领取宝可梦。"}),`
`,n.jsx(l.li,{children:"检查该宝可梦的个体值。"}),`
`,n.jsx(l.li,{children:"将个体值输入 PokeFinder，查找你实际命中的帧数。"}),`
`,n.jsx(l.li,{children:"计算延迟：延迟 = 目标帧数 - 实际命中帧数"}),`
`,n.jsx(l.li,{children:"将该延迟输入回 PokeFinder 中，并重新生成目标列表。"}),`
`,n.jsx(l.li,{children:"记录新的目标帧数。"}),`
`]}),`
`,n.jsx(l.h2,{children:"第三步：获取目标宝可梦"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:"根据新的目标帧数重新进行尝试。"}),`
`,n.jsx(l.li,{children:"若成功，你将命中正确的个体组合。"}),`
`,n.jsx(l.li,{children:"若仍不匹配，确认偏差帧数，加载存档并调整后再次尝试。"}),`
`]}),`
`,n.jsx(l.h2,{children:"特别鸣谢"}),`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function h(i={}){const{wrapper:l}={...r(),...i.components};return l?n.jsx(l,{...i,children:n.jsx(e,{...i})}):e(i)}export{h as default,d as frontmatter};
