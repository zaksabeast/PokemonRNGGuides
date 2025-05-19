import{u as i,j as e}from"./index-BxIveO3R.js";const h=[{title:"White Forest RNG",navDrawerTitle:"White Forest RNG",description:"Learn how to RNG Pokémon found exclusively in White Forest in Pokémon White for desired IVs, nature, and shininess.",slug:"emulator-bw-white-forest",category:"Black and White",tag:"emu"},{title:"白森林乱数",description:"白森林乱数",slug:"zh-emulator-bw-white-forest",category:"Black and White",tag:"emu",translation:{enSlug:"emulator-bw-white-forest",language:"zh"}}];function o(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...t.components},{ShowIf:r}=n;return r||s("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsxs(r,{slug:"/emulator-bw-white-forest",children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This guide assumes you have basic knowledge. You should be able to set up a profile, do a Wild RNG, and understand noise advancing the Seeding.
`})}),e.jsx(n.h2,{children:"Tools"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:"Pokémon White"}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You can edit Trainers/Pokémon available in the White Forest using the PokeCGear Tool (http://projectpokemon.org/forums/attachment.php?attachmentid=10632&d=1362758021), but this won't be covered in this guide.
`})}),e.jsx(n.h2,{children:"Setup"}),e.jsxs(n.p,{children:["The White Forest has a large pool of Pokémon, making it interesting for RNG. Although the game doesn't allow you to use Sweet Scent, it has a helpful feature: ",e.jsx(n.strong,{children:"The first step in grass or water upon entering the White Forest will lead to an encounter 100% of the time."})]}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open Desmume and load the Lua scripts. Find a Target Spread on PokeFinder, preferably around 150-200 PID Frames."}),`
`,e.jsx(n.li,{children:"Go outside the White Forest. It's best to save at Route 14, near the gates. The grass patch seems closer there, but you can also do this from Route 15."}),`
`,e.jsx(n.li,{children:"Walk until your IV Frame Count increases. This means when you reset for RNG, you can reach the grass patch without worrying about random IV Frame advances."}),`
`,e.jsx(n.li,{children:"Save and perform the Initial Seed RNG. Do not load the C-Gear."}),`
`,e.jsx(n.li,{children:"Once in-game, enter quickly and go next to the patch that will trigger an encounter. Open the menu."}),`
`,e.jsx(n.li,{children:"Create a save state here. Let the game run briefly and find a long advance (a moment when the PID Frame doesn't advance at all) to do a step. Once you find one, reload the state, advance to it again, and go into the party as soon as you hit it. Use Chatots to reach your target frame. Close all menus and take your step."}),`
`]}),e.jsx(n.p,{children:"Congrats! You've set up your RNG in White Forest!"}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(r,{slug:"/zh-emulator-bw-white-forest",children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`注意：本指南假设你已具备基础知识。你应当能够建立配置文件、进行野生乱数，并理解种子生成过程中的噪音推进。
`})}),e.jsx(n.h2,{children:"所需工具"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:"Pokémon White"}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`注意：你可以使用 PokeCGear 工具（http://projectpokemon.org/forums/attachment.php?attachmentid=10632&d=1362758021）编辑白森林中的训练家/可遇宝可梦，但本指南不会涉及此内容。
`})}),e.jsx(n.h2,{children:"设置"}),e.jsx(n.p,{children:"白森林拥有丰富的宝可梦种类，因此乱数操作非常有趣。虽然无法使用甜甜香，但有一个非常有利的机制：每次进入白森林后，在草地或水面上迈出的第一步将 100% 遇敌。"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"打开 Desmume 并加载 Lua 脚本。在 PokeFinder 中选择目标个体（建议 PID 帧数为 150～200 左右）。"}),`
`,e.jsx(n.li,{children:"将位置移动至白森林门外，建议在 14 号道路附近的门口保存。那里离草地更近，也可以从 15 号道路进入。"}),`
`,e.jsx(n.li,{children:"行走一段距离，直到 IV 帧数开始计数。这表示重置后你可以安全走到草地而不会触发随机 IV 帧推进。"}),`
`,e.jsx(n.li,{children:"保存并执行初始种子乱数。不要开启 C-Gear。"}),`
`,e.jsx(n.li,{children:"进入游戏后，迅速进入白森林并走到能够触发遇敌的草丛旁。打开菜单。"}),`
`,e.jsx(n.li,{children:"在此处创建即时存档。让游戏运行片刻，寻找一个“长推进”时机（即 PID 帧长时间不变的时候），以便在该帧推进一步。找到后，重新读取即时存档，再次推进至该帧，并立即进入宝可梦菜单。使用聒噪鸟提升到目标帧，关闭所有菜单并迈出那一步。"}),`
`]}),e.jsx(n.p,{children:"恭喜！你已成功完成白森林的乱数设置！"}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function l(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}function s(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default,h as frontmatter};
