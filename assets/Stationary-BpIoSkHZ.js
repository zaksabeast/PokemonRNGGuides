import{u as s,j as e}from"./index-D-N1ChsP.js";const h=[{title:"Diamond, Pearl, and Platinum Static RNG",navDrawerTitle:"Static RNG",description:"Learn how to RNG static Pokémon in Diamond, Pearl, and Platinum for perfect IVs, natures, and shinies.",slug:"emulator-dppt-stationary",category:"Diamond, Pearl, and Platinum",tag:"emu"},{title:"定点乱数",description:"如何在钻石珍珠和白金中对固定遇敌的宝可梦进行乱数",slug:"zh-emulator-dppt-stationary",category:"Diamond, Pearl, and Platinum",tag:"emu",translation:{enSlug:"emulator-dppt-stationary",language:"zh"}}];function r(i){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...i.components},{ShowIf:t}=n;return t||a("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsxs(t,{slug:"/emulator-dppt-stationary",children:[e.jsx(n.h2,{children:"Tools"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume with lua scripts"})}),`
`]}),e.jsx(n.h2,{children:"Set up"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder -> Gen 4 -> Static -> Searcher. Select the Pokemon you want in Settings."}),`
`,e.jsx(n.li,{children:"Set up or select correct profile and adjust filters as wanted."}),`
`,e.jsx(n.li,{children:"Search for a target seed and its advances."}),`
`]}),e.jsx(n.h2,{children:"RNG Initial Seed"}),e.jsxs(n.p,{children:["Follow ",e.jsx(n.a,{href:"/dppt-initial-seed",children:"this guide to RNG the initial seed"})," found above."]}),e.jsx(n.h2,{children:"Advance RNG"}),e.jsxs(n.p,{children:["Follow ",e.jsx(n.a,{href:"/dppt-advance-rng",children:"this guide to advance the RNG"}),"."]}),e.jsx(n.h2,{children:"Calibration"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Navigate to the Generator tab in PokeFinder."}),`
`,e.jsx(n.li,{children:"Input the initial seed and the Pokemon you are RNGing."}),`
`,e.jsx(n.li,{children:"Search for the Pokemon you got."}),`
`,e.jsx(n.li,{children:"Adjust the delay and try again."}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Target Advance - Advance Hit = Delay
`})}),e.jsx(n.h2,{children:"Unique Cases"}),e.jsx(n.p,{children:"If you want to RNG Giratina in the Distortion World, it's trickier. When you enter the Distortion World, the RNG advances by 11, and you have 12 advances when encountering Giratina. So, you need to factor in an initial advance of 23 since you will load the Distortion World at least once if using the journal method."}),e.jsx(n.p,{children:"For Sinnoh starters in Diamond and Pearl, save on the route before entering the lake. It will also be easier with a shiny target advance of 0. In Platinum, it's more difficult due to noise."}),e.jsx(n.p,{children:"Cresselia and Mesprit are generated the first time you talk to them, so RNG them before they escape."}),e.jsx(n.p,{children:"When talking to Prof. Oak for the Kanto birds, Moltres has an initial advance of 1, Zapdos of 6, and Articuno of 11. It’s suggested to use the E4 method: defeat the target, then RNG by talking to Oak again."}),e.jsx(n.h2,{children:"Manaphy Egg RNG"}),e.jsx(n.p,{children:"The Manaphy egg is received like a Wondercard Pokémon, but it uses Method 1 generation. The Wondercard follows normal RNG rules."}),e.jsx(n.p,{children:"Manaphy has a shiny lock that prevents it from hatching shiny in the game it’s obtained in. To bypass this, RNG the Manaphy to hatch shiny in a different game."}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Know the shiny PID for Game A."}),`
`,e.jsx(n.li,{children:"In Game B, obtain the egg with that PID."}),`
`,e.jsx(n.li,{children:"Trade the egg from Game B to Game A."}),`
`,e.jsx(n.li,{children:"Hatch the egg in Game A."}),`
`]}),e.jsx(n.p,{children:"Congratulations, you now have a shiny Manaphy!"}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(t,{slug:"/zh-emulator-dppt-stationary",children:[e.jsx(n.h2,{children:"所需工具"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"包含lua脚本功能的Desmume模拟器"})}),`
`]}),e.jsx(n.h2,{children:"准备工作"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"打开 PokeFinder -> 第四世代 -> 定点 -> 检索器，在设置中选择你想要的宝可梦。"}),`
`,e.jsx(n.li,{children:"设置或选择正确的个人资料，并根据需要调整筛选条件。"}),`
`,e.jsx(n.li,{children:"搜索目标种子以及目标帧。"}),`
`]}),e.jsx(n.h2,{children:"初始种子乱数"}),e.jsxs(n.p,{children:["请参考",e.jsx(n.a,{href:"/dppt-initial-seed",children:"此指南"}),"来进行初始种子乱数。"]}),e.jsx(n.h2,{children:"推进帧数"}),e.jsxs(n.p,{children:["请参考",e.jsx(n.a,{href:"/dppt-advance-rng",children:"此指南"}),"来推进帧数。"]}),e.jsx(n.h2,{children:"校准"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"在 PokeFinder 中进入生成器选项卡。"}),`
`,e.jsx(n.li,{children:"输入初始种子并找到你的目标宝可梦的帧数。"}),`
`,e.jsx(n.li,{children:"搜索你实际遇到宝可梦的帧数。"}),`
`,e.jsx(n.li,{children:"根据帧数调整延迟并重试。"}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`目标帧 - 实际命中帧 = 延迟
`})}),e.jsx(n.h2,{children:"特殊情况"}),e.jsx(n.p,{children:"如果想在毁坏的世界乱数骑拉帝纳，会比较棘手。进入毁坏的世界时，RNG 会推进 11 次，在遇到骑拉帝纳时总共推进 12 次。因此，如果使用日记推进法，至少需要考虑 23 次的初始推进。"}),e.jsx(n.p,{children:"在钻石和珍珠中乱数御三家时，建议在进入湖泊前保存游戏，并使用 0 帧的异色目标会更容易。在白金中，由于干扰更大，难度较高。"}),e.jsx(n.p,{children:"克雷色利亚和艾姆利多在首次对话时生成，因此需要在它们逃跑前进行乱数。"}),e.jsx(n.p,{children:"与大木博士对话领取关都三圣鸟时，不同宝可梦的初始帧不同：火焰鸟为 1、闪电鸟为 6、急冻鸟为 11。建议使用四天王方法，即先打败目标宝可梦，再与大木博士对话进行乱数。"}),e.jsx(n.h2,{children:"玛纳霏蛋乱数"}),e.jsx(n.p,{children:"玛纳霏蛋的领取方式类似于神秘礼物宝可梦，但它的生成方式使用 Method 1。神秘礼物的乱数遵循常规规则。"}),e.jsx(n.p,{children:"玛纳霏有异色锁定，无法在获得它的游戏中孵出异色形态。要绕过这一限制，可以在不同游戏中进行乱数操作："}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"确定游戏 A 的异色 PID。"}),`
`,e.jsx(n.li,{children:"在游戏 B 中获得与该 PID 匹配的蛋。"}),`
`,e.jsx(n.li,{children:"将蛋从游戏 B 交换到游戏 A。"}),`
`,e.jsx(n.li,{children:"在游戏 A 中孵化蛋。"}),`
`]}),e.jsx(n.p,{children:"恭喜，你现在拥有一只异色玛纳霏了！"}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function d(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}function a(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default,h as frontmatter};
