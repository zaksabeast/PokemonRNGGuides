import{v as o,j as n}from"./index-CyfZOcUG.js";const h={title:"孵化乱数",description:"通过培育屋进行乱数孵蛋",slug:"zh-emulator-emerald-egg",translation:{enSlug:"emulator-emerald-egg",language:"zh"}};function c(i){const e={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...o(),...i.components},{EmeraldHeldEgg:r,EmeraldPickupEgg:s,YouTubeVideo:d}=e;return r||l("EmeraldHeldEgg"),s||l("EmeraldPickupEgg"),d||l("YouTubeVideo"),n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/mgba-setup",children:"可以使用Lua脚本的mGBA模拟器"})}),`
`]}),`
`,n.jsx(e.h2,{children:"介绍"}),`
`,n.jsx(e.p,{children:"在《绿宝石》版本中，蛋的生成分为两个步骤：当你走出让蛋生成的那一步时，PID 会被确定，而当你从培育屋爷爷手中领取蛋时，个体会被确定。为了获得完美的异色蛋，你需要进行两次乱数操作。"}),`
`,n.jsx(e.h2,{children:"视频指南"}),`
`,n.jsx(d,{src:"https://www.youtube.com/embed/JtwSZgw6Q4U?si=Fvmg7KLqI9J06wAa"}),`
`,n.jsx(e.h2,{children:"获取异色宝可梦"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:'打开 Lua 脚本的 "Pokemon Info" 选项卡，查看亲代的个体值和性格，并记录下来。'}),`
`,n.jsx(e.li,{children:"将两只宝可梦放入培育屋。第一个放入的宝可梦为亲代A，第二个放入的为亲代B，记录下来。"}),`
`,n.jsx(e.li,{children:"与培育屋奶奶对话检查宝可梦的配对情况，并将信息输入下方的 RNG 工具。"}),`
`,n.jsx(e.li,{children:"在培育屋内部行走，直到 Lua 脚本的步数计数器显示为 1。"}),`
`,n.jsx(e.li,{children:"存档、重启游戏，并在加载存档后立即暂停。"}),`
`,n.jsx(e.li,{children:'切换到 Lua 脚本的 "Breeding" 选项卡，输入 "Calibration（标定）"、"Initial Seed"、"TID"、"SID" 以及 "Advances"（作为 "初始帧"）到乱数工具中。同时输入非百变怪或母亲的性格。设置异色、性格和性别筛选。'}),`
`,n.jsx(e.li,{children:"计算结果，并选择一个作为目标。如果没有结果，增加搜索帧数上限。"}),`
`,n.jsx(e.li,{children:"解除游戏暂停。"}),`
`,n.jsx(e.li,{children:"如果出现重绘（redraws），打开游戏菜单（按 Start），然后打开并关闭图鉴，每次重绘执行一次。"}),`
`,n.jsx(e.li,{children:"在接近目标帧数时暂停游戏，并创建即时存档。"}),`
`,n.jsx(e.li,{children:"手动推进游戏 (Windows: Ctrl + N, Mac: Cmd + N)，直到达到目标帧。"}),`
`,n.jsx(e.li,{children:"按住移动方向键，让角色走动，然后在按住方向键的同时取消暂停。继续朝角色面对的方向行走（例如，角色面向左方，则按住 Left 键）。"}),`
`,n.jsx(e.li,{children:"领取的蛋应该拥有目标 PID。"}),`
`,n.jsx(e.li,{children:"如果错过目标，在乱数工具中输入孵化后宝可梦的性格，以确定实际命中的帧数。"}),`
`,n.jsx(e.li,{children:'用命中的帧数减去目标帧数，并将结果输入乱数工具的 "Delay" 字段，然后重新生成结果并尝试再次进行操作。'}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"恭喜！你现在获得了一颗异色蛋！"})}),`
`,n.jsx(r,{lua:!0}),`
`,n.jsx(e.h2,{children:"获取个体值"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"走到培育屋爷爷旁边，存档后重启游戏。"}),`
`,n.jsx(e.li,{children:"加载存档后，查看训练家卡片，翻页一次后关闭菜单。"}),`
`,n.jsx(e.li,{children:'与培育屋爷爷对话，直到出现 "Take good care of it." 的文本，此时暂停游戏并创建即时存档。'}),`
`,n.jsx(e.li,{children:'在乱数工具的 "pickup advances" 字段中输入当前帧数。'}),`
`,n.jsx(e.li,{children:"输入亲代宝可梦的个体值到乱数工具中。"}),`
`,n.jsx(e.li,{children:"计算结果，并选择目标帧数。"}),`
`,n.jsx(e.li,{children:"在接近目标帧数时暂停游戏，并创建存档状态。"}),`
`,n.jsx(e.li,{children:"手动推进游戏 (Windows: Ctrl + N, Mac: Cmd + N)，直到达到目标帧数。"}),`
`,n.jsx(e.li,{children:'按住 "A" 并取消暂停，以确保在目标帧数领取蛋。'}),`
`,n.jsx(e.li,{children:'通过 Lua 脚本的 "Pokemon Info" 选项卡检查领取蛋的个体。'}),`
`,n.jsx(e.li,{children:'如果错过目标，在乱数工具中输入蛋的个体值，以确定实际命中的帧数。可能需要更改 "方式" 选项才能匹配结果。'}),`
`,n.jsx(e.li,{children:'用命中的帧数减去目标帧数，并将结果输入乱数工具的 "Delay" 字段，然后重新生成结果并尝试再次进行操作。'}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"恭喜！你的蛋现在有极高的个体值！"})}),`
`,n.jsx(s,{lua:!0}),`
`,n.jsx(e.h2,{children:"Credits"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Thanks to all ",n.jsx(e.a,{href:"https://github.com/Admiral-Fish/PokeFinder",children:"PokeFinder"})," contributors, whose work this tool is built upon."]}),`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function x(i={}){const{wrapper:e}={...o(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(c,{...i})}):c(i)}function l(i,e){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default,h as frontmatter};
