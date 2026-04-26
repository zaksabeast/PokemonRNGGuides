import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-B5eGYVya.js";var n=e(),r={title:`固定宝可梦乱数`,description:`在《火红·叶绿》中获取闪光六项个体值的传说宝可梦`,slug:`zh-emulator-flrg-stationary-and-gift`,translation:{enSlug:`emulator-flrg-stationary-and-gift`,language:`zh`}};function i(e){let r={a:`a`,h2:`h2`,li:`li`,ol:`ol`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`带有 Lua 脚本的 mGBA 模拟器`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：设置 PokeFinder`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`加载游戏并启用 Lua 脚本。`}),`
`,(0,n.jsx)(r.li,{children:`在游戏进入“继续”画面时暂停模拟器。`}),`
`,(0,n.jsx)(r.li,{children:`查看 Lua 脚本中显示的初始种子。`}),`
`,(0,n.jsx)(r.li,{children:`打开 PokeFinder，进入“第三世代 定点乱数”下的“生成”标签页。`}),`
`,(0,n.jsx)(r.li,{children:`将种子填写到“Seed”输入框中。`}),`
`,(0,n.jsxs)(r.li,{children:[`设置目标筛选条件（如闪光、个体值、性格等），然后点击“生成”。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`方式 应设为“方式 1”。`}),`
`,(0,n.jsx)(r.li,{children:`如果没有结果，请放宽筛选条件或重启游戏以获取新种子。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`从生成的结果中选择一个目标帧数。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：计算延迟`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`角色应站在传说宝可梦、NPC 或宝可梦球前。`}),`
`,(0,n.jsx)(r.li,{children:`建立一个即时存档以防出错。`}),`
`,(0,n.jsxs)(r.li,{children:[`推进至宝可梦生成前的最后画面。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`若出现叫声或对话提示，一般表示已到达最后画面。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`在目标帧数时按下 A 键开始战斗或领取宝可梦。`}),`
`,(0,n.jsx)(r.li,{children:`检查该宝可梦的个体值。`}),`
`,(0,n.jsx)(r.li,{children:`将个体值输入 PokeFinder，查找你实际命中的帧数。`}),`
`,(0,n.jsx)(r.li,{children:`计算延迟：延迟 = 目标帧数 - 实际命中帧数`}),`
`,(0,n.jsx)(r.li,{children:`将该延迟输入回 PokeFinder 中，并重新生成目标列表。`}),`
`,(0,n.jsx)(r.li,{children:`记录新的目标帧数。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第三步：获取目标宝可梦`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`根据新的目标帧数重新进行尝试。`}),`
`,(0,n.jsx)(r.li,{children:`若成功，你将命中正确的个体组合。`}),`
`,(0,n.jsx)(r.li,{children:`若仍不匹配，确认偏差帧数，加载存档并调整后再次尝试。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};