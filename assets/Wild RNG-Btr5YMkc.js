import{u as l,j as e}from"./index-Dqb6kI9x.js";const h=[{title:"FireRed and LeafGreen Wild RNG",navDrawerTitle:"Wild RNG",description:"Learn how to RNG wild Pokémon in FireRed and LeafGreen using the Sweet Scent method.",slug:"emulator-frlg-wild",category:"FireRed and LeafGreen",tag:"emu"},{title:"火红叶绿野生乱数",navDrawerTitle:"Wild RNG",description:"在《火红·叶绿》中使用甜甜香气进行野生宝可梦的乱数",slug:"zh-emulator-frlg-wild",category:"FireRed and LeafGreen",tag:"emu",translation:{enSlug:"emulator-frlg-wild",language:"zh"}}];function r(i){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...l(),...i.components},{ShowIf:s}=n;return s||t("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsxs(s,{slug:"/emulator-frlg-wild",children:[e.jsx(n.h2,{children:"Tools"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:"TID and SID (if going for shiny)"}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you are doing this RNG for a shiny, make sure to set up a profile in PokeFinder with the TID and SID of the save.
`})}),e.jsx(n.h2,{children:"Step 1: Set up PokeFinder"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:`Open PokeFinder and select "Wild" for Gen 3. Make sure you're on the "Generator" tab.`}),`
`,e.jsx(n.li,{children:'Set "Method" to Method H-1.'}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: While there are other methods in FireRed/LeafGreen, H-1 is the most common and recommended. The other methods rely on v-blank and occur rarely.
`})}),e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:'Set "Location" to where the RNG will take place.'}),`
`,e.jsxs(n.li,{children:['If you want a specific Pokémon, select it in "Pokemon" after selecting its location.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`If the Pokémon you want isn't listed or you need a specific encounter slot, choose the number in the "Encounter Slot" box and leave "Pokemon" at the default.`}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.a,{href:"https://sites.google.com/site/pokemonslots/gen-iii/emerald",children:"this site"})," to find a specific encounter slot."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Set "Encounter" to "Grass" or "Surfing" since this guide focuses on using Sweet Scent to start an encounter.'}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: For "Lead," leave it as "Any" since Cute Charm and Synchronize do not work in FireRed/LeafGreen.
`})}),e.jsxs(n.ol,{start:"6",children:[`
`,e.jsxs(n.li,{children:['Check the "Use Delay" box and input the delay for the Pokémon you are RNGing.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["This ",e.jsx(n.a,{href:"https://docs.google.com/spreadsheets/d/1cVweVvJXCXeTZOBVKVCBbcSI46rqBXV3ahbuoSGOnzk/edit#gid=1091733147",children:"Google Doc"})," has the delays for each area."]}),`
`,e.jsx(n.li,{children:"Keep in mind there could still be a variation of +/- 1 delay."}),`
`]}),`
`]}),`
`]}),e.jsx(n.h2,{children:"Step 2: Finding the initial seed"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Save the game in the location where you'll RNG the Pokémon."}),`
`,e.jsx(n.li,{children:"Restart the emulator."}),`
`,e.jsx(n.li,{children:"Once the game loads, enter the continue screen."}),`
`,e.jsx(n.li,{children:"Pause the game to find your seed."}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: FireRed/LeafGreen generates different seeds every time the game loads, unlike repeating seeds in dry battery Ruby and Sapphire, and Emerald. This can be used to reset for different seeds if needed.
`})}),e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"The initial seed will be displayed on the screen from the Lua script."}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Wild/Initial-Seed.png",alt:"Initial Seed"})}),e.jsx(n.h2,{children:"Step 3: Find a target advance"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Enter the initial seed into "Seed."'}),`
`,e.jsxs(n.li,{children:["Enter your target settings for the Pokémon you wish to search for (shiny, IVs, nature, etc.).",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Finding a shiny perfect Pokémon may take a while to find a seed, which will likely have very high advances."}),`
`,e.jsx(n.li,{children:"If no results show up, try lowering the filters."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Click "Generate."'}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Wild/Setup.png",alt:"Setup"})}),e.jsx(n.p,{children:"In the example above, the filters are set for any shiny on Route 5."}),e.jsx(n.pre,{children:e.jsx(n.code,{children:"Note: The initial seed can be changed by pressing `B` on the continue screen to play the intro again. The seed will change when pressing `A` to advance to the continue screen. You can repeat this process as needed to find a better seed if wanted.\n"})}),e.jsx(n.h2,{children:"Step 4: RNG for the Pokémon"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Once you have a target advance, continue into the game."}),`
`,e.jsx(n.li,{children:"Advance to within a few thousand advances of the target advance."}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Teachy TV can be used to advance much faster. The RNG advances 313 times faster, allowing you to advance millions of frames in a few minutes.

Open Teachy TV in Key Items and close it when a few thousand away from your target advance.
`})}),e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["Open your Trainer Card and press ",e.jsx(n.code,{children:"A"})," to flip it.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Flipping the Trainer Card resets the delay, which becomes more off the more advances you make."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Select the Pokémon in your party with Sweet Scent and hover over the move."}),`
`,e.jsx(n.li,{children:"When close to your target advance, pause the emulator and create a save state, then advance a frame at a time to the target advance."}),`
`,e.jsxs(n.li,{children:["Hold ",e.jsx(n.code,{children:"A"})," and unpause the emulator at the same time on your target advance.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If the Pokémon is not the one wanted, load the previous save state and try one advance before and/or one advance after."}),`
`]}),`
`]}),`
`]}),e.jsx(n.p,{children:"If you followed all the above steps, the Pokémon should be what you wanted. Tada, you did your Gen 3 Wild RNG!"}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Wild/Success.png",alt:"Success"})}),e.jsx(n.h2,{children:"Troubleshooting"}),e.jsx(n.p,{children:"If after trying the one advance difference above it didn't work, you'll have to adjust for your own delay."}),e.jsx(n.p,{children:"Find what advance you are hitting and adjust as needed."}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(s,{slug:"/zh-emulator-frlg-wild",children:[e.jsx(n.h2,{children:"所需工具"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"带有 Lua 脚本的 mGBA 模拟器"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:"表 ID 和里 ID（若目标为异色宝可梦）"}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`提示：如果你只是为了异色宝可梦而进行乱数，请确保在 PokeFinder 中设置含有该存档 TID 与 SID 的配置档。
`})}),e.jsx(n.h2,{children:"第一步：设置 PokeFinder"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"打开 PokeFinder，选择第三世代的 “野生乱数”，并确保你位于 “生成器” 标签页。"}),`
`,e.jsx(n.li,{children:"将 “方式” 设置为 方式 1。"}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`提示：《火红·叶绿》中确实存在其他方法，但 H-1 是最常见、最推荐的。其他方法依赖于 v-blank，出现几率极低。
`})}),e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"将“地点” 设置为你将要进行乱数的地点。"}),`
`,e.jsxs(n.li,{children:["如果你有指定目标宝可梦，在选择地点后可在 “宝可梦” 中选择该宝可梦。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"若宝可梦未出现在列表中，或者你想要指定的遭遇槽，请选择 “遇敌种类” 中对应的数字，并将 “宝可梦” 留空。"}),`
`,e.jsxs(n.li,{children:["可参考 ",e.jsx(n.a,{href:"https://sites.google.com/site/pokemonslots/gen-iii/emerald",children:"此网站"}),"获取具体遭遇槽数据："]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"“遇敌” 设置为 “草” 或 “冲浪”，本指南聚焦于使用甜甜香气触发战斗。"}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`提示：《火红·叶绿》中迷人之躯和同步并不会影响乱数。
`})}),e.jsxs(n.ol,{start:"6",children:[`
`,e.jsxs(n.li,{children:["填写目标地点的延迟值。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["可参考 ",e.jsx(n.a,{href:"https://docs.google.com/spreadsheets/d/1cVweVvJXCXeTZOBVKVCBbcSI46rqBXV3ahbuoSGOnzk/edit#gid=1091733147",children:"Google Doc"})," 获取每个区域的延迟值。"]}),`
`,e.jsx(n.li,{children:"注意：通常存在 ±1 的误差范围。"}),`
`]}),`
`]}),`
`]}),e.jsx(n.h2,{children:"第二步：获取初始种子"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"在你想进行乱数的地点存档。"}),`
`,e.jsx(n.li,{children:"重启模拟器。"}),`
`,e.jsx(n.li,{children:"游戏加载后，进入继续画面。"}),`
`,e.jsx(n.li,{children:"暂停游戏，此时 Lua 脚本会在屏幕上显示初始种子。"}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`提示：《火红·叶绿》每次加载游戏都会生成不同的种子，和《红蓝宝石》无电电池或《绿宝石》的固定种子不同。这意味着你可以反复重置来刷更理想的种子。
`})}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Wild/Initial-Seed.png",alt:"初始种子"})}),e.jsx(n.h2,{children:"第三步：寻找目标帧数"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"在 Seed 输入框中填写初始种子。"}),`
`,e.jsxs(n.li,{children:["设定目标宝可梦的条件（是否异色、个体值、性格等）。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"如果目标为完美个体的异色，可能需要等待非常高的帧数。"}),`
`,e.jsx(n.li,{children:"若无结果，请放宽筛选条件。"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"点击 “生成”。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Wild/Setup.png",alt:"Setup"})}),e.jsx(n.p,{children:"如图所示，本例的筛选条件是“任意异色宝可梦（Route 5）”。"}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`提示：你可以按 B 键回到开场动画，再按 A 进入继续画面，借此更换初始种子。重复操作直到得到一个更合适的种子。
`})}),e.jsx(n.h2,{children:"第四步：开始乱数"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"找到目标帧数后，进入游戏。"}),`
`,e.jsx(n.li,{children:"推进到接近目标帧数前几千帧的位置。"}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`提示：教学电视可以极大地加速推进帧数。使用它可使乱数每帧推进速度提升 313 倍，可在几分钟内推进数百万帧。

在背包中打开教学电视并关闭它，即可迅速推进帧数。
`})}),e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["打开训练师卡片并按下 A 翻转 一次。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"翻转能刷新延迟，有助于避免因帧数过高而导致延迟偏移。"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"选择拥有“甜甜香气”的宝可梦，移动光标至该技能上。"}),`
`,e.jsx(n.li,{children:"当接近目标帧数时，暂停游戏并建立即时存档。然后使用 Ctrl + N 逐帧推进至目标帧。"}),`
`,e.jsxs(n.li,{children:["在目标帧时，同时按住 A 并取消暂停。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"如果遇到的宝可梦不是目标个体，请尝试在前后各一帧进行操作。"}),`
`]}),`
`]}),`
`]}),e.jsx(n.p,{children:"若上述操作正确无误，你将成功遇到目标宝可梦。完成了第三世代的野生乱数！"}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Wild/Success.png",alt:"成功！"})}),e.jsx(n.h2,{children:"问题排除"}),e.jsx(n.p,{children:"如果尝试了 ±1 帧仍未命中目标，请手动判断你实际命中的帧数，并据此调整。"}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function o(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}function t(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{o as default,h as frontmatter};
