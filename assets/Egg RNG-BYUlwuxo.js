import{u as h,j as e}from"./index-BxIveO3R.js";const c=[{title:"Emerald Egg RNG",navDrawerTitle:"Egg RNG",description:"Learn how to RNG eggs in Pokémon Emerald using the Daycare. Get perfect IVs, natures, and shinies.",slug:"emulator-emerald-egg",category:"Emerald",tag:"emu",addedOn:"2025-03-09"},{title:"孵化乱数",description:"通过培育屋进行乱数孵蛋",slug:"zh-emulator-emerald-egg",category:"Emerald",tag:"emu",addedOn:"2025-04-07",translation:{enSlug:"emulator-emerald-egg",language:"zh"}}];function o(t){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...h(),...t.components},{EmeraldHeldEgg:r,EmeraldPickupEgg:a,ShowIf:l,YouTubeVideo:s}=n;return r||i("EmeraldHeldEgg"),a||i("EmeraldPickupEgg"),l||i("ShowIf"),s||i("YouTubeVideo"),e.jsxs(e.Fragment,{children:[e.jsxs(l,{slug:"/emulator-emerald-egg",children:[e.jsx(n.h2,{children:"Tools:"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`]}),e.jsx(n.h2,{children:"Intro"}),e.jsx(n.p,{children:"Eggs in Emerald are generated in two steps: the PID is set when you take a step that creates the egg, and the IVs are set when you pick it up from the daycare man. You'll need to do two RNGs to get a perfect shiny egg."}),e.jsx(n.h2,{children:"Video Guide"}),e.jsx(s,{src:"https://www.youtube.com/embed/JtwSZgw6Q4U?si=Fvmg7KLqI9J06wAa"}),e.jsx(n.h2,{children:"Getting a Shiny Pokémon"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open the "Pokemon Info" tab in the Lua script to view the IVs and Nature of your parent Pokémon. Write them down for later.'}),`
`,e.jsx(n.li,{children:"Place both Pokémon in the Daycare. The first parent given to the Daycare is Parent 1, the second is Parent 2. Write this down for later."}),`
`,e.jsx(n.li,{children:"Talk to the Daycare Man to check Pokémon compatibility, and input this into the RNG tool below."}),`
`,e.jsx(n.li,{children:"Walk inside the Daycare until the Lua script's step counter is 1."}),`
`,e.jsx(n.li,{children:"Save the game, restart, and pause after loading the save."}),`
`,e.jsx(n.li,{children:`Switch to the Lua script's "Breeding" tab and input the "Calibration", "Initial Seed", "TID", "SID", and "Advances" (as "Initial advances") into the RNG tool. Also, enter the Nature of the non-Ditto or female parent. Optionally, filter for shininess, nature, and gender.`}),`
`,e.jsx(n.li,{children:'Click "Generate" to get a list of potential PIDs, and choose one to target. If there are no results, increase the "Max Advances."'}),`
`,e.jsx(n.li,{children:"Unpause your game."}),`
`,e.jsxs(n.li,{children:["If there are redraws, open the game menu (press ",e.jsx(n.code,{children:"Start"}),"), then open and close the Pokedex for each redraw."]}),`
`,e.jsx(n.li,{children:"Pause the game near your target advance, then create a save state."}),`
`,e.jsxs(n.li,{children:["Manually advance the game (",e.jsx(n.code,{children:"Ctrl + N"})," for Windows, ",e.jsx(n.code,{children:"Cmd + N"})," for Mac) until you reach your target advance."]}),`
`,e.jsxs(n.li,{children:["Hold the movement button to make your character walk, then unpause while holding the button. Walk in the same direction your character is facing (e.g., if facing left, hold the ",e.jsx(n.code,{children:"Left"})," button)."]}),`
`,e.jsx(n.li,{children:"The egg you receive should have your target PID."}),`
`,e.jsx(n.li,{children:"If you missed the target, input the nature in the RNG tool to find the advance you landed on."}),`
`,e.jsx(n.li,{children:`Subtract the advance you hit from your target, and enter the difference in the RNG tool's "Delay" field, then regenerate the results and try again.`}),`
`]}),e.jsx(n.p,{children:e.jsx(n.strong,{children:"Congrats! You now have a shiny egg!"})}),e.jsx(r,{lua:!0}),e.jsx(n.h2,{children:"Getting IVs"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Walk outside next to the Daycare man, save the game, then restart."}),`
`,e.jsx(n.li,{children:"After loading your save, view your Trainer Card, flip it once, and close the menu."}),`
`,e.jsx(n.li,{children:'Talk to the Daycare man until you see the text "Take good care of it." Pause the game and make a save state.'}),`
`,e.jsx(n.li,{children:'Input the current advance into the "Initial advances" field in the RNG tool.'}),`
`,e.jsx(n.li,{children:"Enter the IVs of your parent Pokémon into the RNG tool."}),`
`,e.jsx(n.li,{children:'Click "Generate" to get a list of possible results, and choose a target advance.'}),`
`,e.jsx(n.li,{children:"Pause the game near your target advance, then create a save state."}),`
`,e.jsxs(n.li,{children:["Manually advance the game (",e.jsx(n.code,{children:"Ctrl + N"})," for Windows, ",e.jsx(n.code,{children:"Cmd + N"})," for Mac) until you reach the target advance."]}),`
`,e.jsx(n.li,{children:'Hold "A" and unpause to finish receiving the egg at the target advance.'}),`
`,e.jsx(n.li,{children:`Use the Lua script's "Pokemon Info" tab to check the received Pokémon's IVs.`}),`
`,e.jsx(n.li,{children:'If you missed the target, input the IVs in the RNG tool to find the advance you landed on. You might need to change the "Method" field to find a match.'}),`
`,e.jsx(n.li,{children:`Subtract the advance you hit from your target, and enter the difference in the RNG tool's "Delay" field, then regenerate the results and try again.`}),`
`]}),e.jsx(n.p,{children:e.jsx(n.strong,{children:"Congrats! Your egg now has fantastic IVs!"})}),e.jsx(a,{lua:!0}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Thanks to all ",e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder",children:"PokeFinder"})," contributors, whose work this tool is built upon."]}),`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(l,{slug:"/zh-emulator-emerald-egg",children:[e.jsx(n.h2,{children:"所需工具"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"可以使用Lua脚本的mGBA模拟器"})}),`
`]}),e.jsx(n.h2,{children:"介绍"}),e.jsx(n.p,{children:"在《绿宝石》版本中，蛋的生成分为两个步骤：当你走出让蛋生成的那一步时，PID 会被确定，而当你从培育屋爷爷手中领取蛋时，个体会被确定。为了获得完美的异色蛋，你需要进行两次乱数操作。"}),e.jsx(n.h2,{children:"视频指南"}),e.jsx(s,{src:"https://www.youtube.com/embed/JtwSZgw6Q4U?si=Fvmg7KLqI9J06wAa"}),e.jsx(n.h2,{children:"获取异色宝可梦"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'打开 Lua 脚本的 "Pokemon Info" 选项卡，查看亲代的个体值和性格，并记录下来。'}),`
`,e.jsx(n.li,{children:"将两只宝可梦放入培育屋。第一个放入的宝可梦为亲代A，第二个放入的为亲代B，记录下来。"}),`
`,e.jsx(n.li,{children:"与培育屋奶奶对话检查宝可梦的配对情况，并将信息输入下方的 RNG 工具。"}),`
`,e.jsx(n.li,{children:"在培育屋内部行走，直到 Lua 脚本的步数计数器显示为 1。"}),`
`,e.jsx(n.li,{children:"存档、重启游戏，并在加载存档后立即暂停。"}),`
`,e.jsx(n.li,{children:'切换到 Lua 脚本的 "Breeding" 选项卡，输入 "Calibration（标定）"、"Initial Seed"、"TID"、"SID" 以及 "Advances"（作为 "初始帧"）到乱数工具中。同时输入非百变怪或母亲的性格。设置异色、性格和性别筛选。'}),`
`,e.jsx(n.li,{children:"计算结果，并选择一个作为目标。如果没有结果，增加搜索帧数上限。"}),`
`,e.jsx(n.li,{children:"解除游戏暂停。"}),`
`,e.jsx(n.li,{children:"如果出现重绘（redraws），打开游戏菜单（按 Start），然后打开并关闭图鉴，每次重绘执行一次。"}),`
`,e.jsx(n.li,{children:"在接近目标帧数时暂停游戏，并创建即时存档。"}),`
`,e.jsx(n.li,{children:"手动推进游戏 (Windows: Ctrl + N, Mac: Cmd + N)，直到达到目标帧。"}),`
`,e.jsx(n.li,{children:"按住移动方向键，让角色走动，然后在按住方向键的同时取消暂停。继续朝角色面对的方向行走（例如，角色面向左方，则按住 Left 键）。"}),`
`,e.jsx(n.li,{children:"领取的蛋应该拥有目标 PID。"}),`
`,e.jsx(n.li,{children:"如果错过目标，在乱数工具中输入孵化后宝可梦的性格，以确定实际命中的帧数。"}),`
`,e.jsx(n.li,{children:'用命中的帧数减去目标帧数，并将结果输入乱数工具的 "Delay" 字段，然后重新生成结果并尝试再次进行操作。'}),`
`]}),e.jsx(n.p,{children:e.jsx(n.strong,{children:"恭喜！你现在获得了一颗异色蛋！"})}),e.jsx(r,{lua:!0}),e.jsx(n.h2,{children:"获取个体值"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"走到培育屋爷爷旁边，存档后重启游戏。"}),`
`,e.jsx(n.li,{children:"加载存档后，查看训练家卡片，翻页一次后关闭菜单。"}),`
`,e.jsx(n.li,{children:'与培育屋爷爷对话，直到出现 "Take good care of it." 的文本，此时暂停游戏并创建即时存档。'}),`
`,e.jsx(n.li,{children:'在乱数工具的 "pickup advances" 字段中输入当前帧数。'}),`
`,e.jsx(n.li,{children:"输入亲代宝可梦的个体值到乱数工具中。"}),`
`,e.jsx(n.li,{children:"计算结果，并选择目标帧数。"}),`
`,e.jsx(n.li,{children:"在接近目标帧数时暂停游戏，并创建存档状态。"}),`
`,e.jsx(n.li,{children:"手动推进游戏 (Windows: Ctrl + N, Mac: Cmd + N)，直到达到目标帧数。"}),`
`,e.jsx(n.li,{children:'按住 "A" 并取消暂停，以确保在目标帧数领取蛋。'}),`
`,e.jsx(n.li,{children:'通过 Lua 脚本的 "Pokemon Info" 选项卡检查领取蛋的个体。'}),`
`,e.jsx(n.li,{children:'如果错过目标，在乱数工具中输入蛋的个体值，以确定实际命中的帧数。可能需要更改 "方式" 选项才能匹配结果。'}),`
`,e.jsx(n.li,{children:'用命中的帧数减去目标帧数，并将结果输入乱数工具的 "Delay" 字段，然后重新生成结果并尝试再次进行操作。'}),`
`]}),e.jsx(n.p,{children:e.jsx(n.strong,{children:"恭喜！你的蛋现在有极高的个体值！"})}),e.jsx(a,{lua:!0}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Thanks to all ",e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder",children:"PokeFinder"})," contributors, whose work this tool is built upon."]}),`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function u(t={}){const{wrapper:n}={...h(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}function i(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default,c as frontmatter};
