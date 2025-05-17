import{u as t,j as e}from"./index-CqsvxZ3g.js";const o=[{title:"Advancing the RNG in Diamond, Pearl, and Platinum",navDrawerTitle:"Advancing the RNG",description:"Learn how to advance the RNG in Diamond, Pearl, and Platinum. This guide explains different methods like journal flips, Chatot chatters, and NPC actions.",slug:"dppt-advance-rng",category:"Diamond, Pearl, and Platinum",tag:"any"},{title:"乱数的帧数推进方法",description:"推进乱数帧数的不同方法及影响帧数的事件机制",slug:"zh-dppt-advance-rng",category:"Diamond, Pearl, and Platinum",tag:"any",translation:{enSlug:"dppt-advance-rng",language:"zh"}}];function s(i){const n={code:"code",h2:"h2",img:"img",li:"li",p:"p",ul:"ul",...t(),...i.components},{ShowIf:a}=n;return a||r("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsxs(a,{slug:"/dppt-advance-rng",children:[e.jsx(n.p,{children:"This explains the different ways to advance the RNG in Diamond, Pearl, and Platinum. The best methods are using Chatot or the Journal, but there are other options if those are not available."}),e.jsx(n.h2,{children:"Chatot Chatter"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You need a Chatot with the move Chatter and a custom Chatter recorded to use this method. Accessing Chatot's summary page advances the RNG by 1."}),`
`,e.jsx(n.li,{children:"You don't need to listen to the whole Chatter sound; just viewing their summary works."}),`
`,e.jsxs(n.li,{children:["To speed things up, have two Chatots in your party and flip between their summaries by pressing ",e.jsx(n.code,{children:"Up"})," and ",e.jsx(n.code,{children:"Down"}),"."]}),`
`]}),e.jsx(n.h2,{children:"Character Movement"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Taking a step or turning in areas where wild Pokémon appear (grass, water, or caves) advances the RNG by 1 for each step or turn."}),`
`,e.jsx(n.li,{children:"Walking at least 128 steps advances the RNG by the number of Pokémon in your party."}),`
`,e.jsx(n.li,{children:"There is a step counter that starts at 0, increases to 128, then resets to 0. The step counter is saved, so if you load your game at 127, taking one step advances the RNG by the number of Pokémon in your party."}),`
`,e.jsx(n.li,{children:"It is not recommended to use this method unless no other options are available."}),`
`]}),e.jsx(n.h2,{children:"NPC Movement"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Any NPC that randomly moves (turning or walking) advances the RNG by 1 for each movement. If an NPC does both, the RNG advances by 2."}),`
`,e.jsx(n.li,{children:"NPCs offscreen still advance the RNG if they're in the same area, so try to capture Pokémon where there are few NPCs."}),`
`,e.jsx(n.li,{children:"You can use the VS Seeker to stop some NPCs from moving."}),`
`,e.jsxs(n.li,{children:["If you can't avoid NPC movement, press ",e.jsx(n.code,{children:"X"})," to access the menu as you enter the game. This freezes all NPCs in place and stops unnecessary advancements."]}),`
`]}),e.jsx(n.h2,{children:"Journal Flips"}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["When the journal shows ",e.jsx(n.code,{children:"(Pokemon) was caught (Time)"}),", the RNG advances by 2."]}),`
`,e.jsx(n.li,{children:"Flipping the journal to another page with a similar entry also advances the RNG by 2."}),`
`,e.jsxs(n.li,{children:["As long as the journal has at least one entry of ",e.jsx(n.code,{children:"(Pokemon) was caught (Time)"}),", the RNG advances by 2, regardless of how many entries there are."]}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/Advance-RNG/Journal.png",alt:"Journal"})}),e.jsx(n.h2,{children:"Active Roamer"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Having an active roamer in your game advances the initial RNG by one or two for each active roamer."}),`
`,e.jsx(n.li,{children:"These advances need to be considered to reach your target advance."}),`
`,e.jsx(n.li,{children:"Depending on the number of active roamers, aim for a higher minimum initial advance to avoid skipping your target due to active roamers advancing the RNG past it."}),`
`]}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(a,{slug:"/zh-dppt-advance-rng",children:[e.jsx(n.p,{children:"本文阐述《宝可梦 钻石/珍珠/白金》中推进乱数帧数的多种方法。其中使用聒噪鸟或冒险笔记最为高效，但如果这些方法不可用，还有其他替代方案。"}),e.jsx(n.h2,{children:"聒噪鸟叫声"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'需要携带已录制自定义叫声的聒噪鸟（通过技能"喋喋不休"进行录音）。每次查看宝可梦信息界面可推进1帧。'}),`
`,e.jsx(n.li,{children:"不需要完整播放录音，仅需打开信息页面即可生效。"}),`
`,e.jsx(n.li,{children:"操作优化：队伍中携带两只或更多聒噪鸟，通过方向键上/下快速切换页面，以快速增加帧数。"}),`
`]}),e.jsx(n.h2,{children:"角色移动"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"在野生宝可梦出现区域（草丛/水面/洞穴）每移动一步或转向，推进1帧。"}),`
`,e.jsx(n.li,{children:"每行走128步时，帧推进数=队伍中宝可梦的数量。"}),`
`,e.jsx(n.li,{children:"步数计数器从0开始累计，达到128后重置。该计数器会被保存，例如读档时若步数为127，则走一步后将触发帧数推进（推进帧数为队伍中宝可梦的数量）。"}),`
`,e.jsx(n.li,{children:"除非别无选择，否则不建议采用此方法。"}),`
`]}),e.jsx(n.h2,{children:"NPC活动"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"随机移动的NPC（转向或行走）每次动作推进1帧。若NPC同时执行两种动作，则推进2帧。"}),`
`,e.jsx(n.li,{children:"同区域内但不在屏幕范围内的活动NPC仍会影响帧数推进，建议选择NPC较少或无NPC的地点进行捕捉"}),`
`,e.jsx(n.li,{children:'可使用"对战搜寻器"冻结NPC活动。'}),`
`,e.jsx(n.li,{children:"进入游戏时立即按X键打开菜单，可暂停所有NPC行动避免额外的帧数推进。"}),`
`]}),e.jsx(n.h2,{children:"冒险笔记"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'当笔记显示"XX时抓到了XX"记录时，每次翻页推进2帧。'}),`
`,e.jsx(n.li,{children:"翻到另一个相同格式的页面，也会推进 2 帧。"}),`
`,e.jsx(n.li,{children:"只要笔记中有一条“XX时抓到了XX”记录，每次翻页都会推进2帧，不受条目数量影响。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/Advance-RNG/Journal.png",alt:"Journal"})}),e.jsx(n.h2,{children:"游走宝可梦"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"地图上存在游走宝可梦时，每只游走宝可梦都会让初始帧数额外增加1或2帧。"}),`
`,e.jsx(n.li,{children:"计算到达目标帧需要推进的帧数时，需减去这些初始帧。"}),`
`,e.jsx(n.li,{children:"如果有多个游走宝可梦，建议预设更高的初始帧数，以免推进帧数过多超过目标帧。"}),`
`]}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function h(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}function r(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,o as frontmatter};
