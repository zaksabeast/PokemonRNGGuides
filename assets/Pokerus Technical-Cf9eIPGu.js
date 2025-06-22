import{q as s,j as e}from"./index-BQMRQkEG.js";const c={title:"宝可病毒",description:"宝可病毒的触发机制",slug:"zh-gba-pokerus-technical",translation:{enSlug:"gba-pokerus-technical",language:"zh"}};function r(i){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...i.components},{Gist:l}=n;return l||d("Gist"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:e.jsx(n.p,{children:"要点：关于宝可病毒触发的技术信息，以及在红宝石/蓝宝石中进行最优设置的原理。"})}),`
`,e.jsx(n.h2,{children:"什么是宝可病毒？"}),`
`,e.jsx(n.p,{children:"每次进行野外战斗后，你的宝可梦有 1 / 21845 的概率感染宝可病毒。感染期间，战斗所获得的努力值将会翻倍。"}),`
`,e.jsx(n.h2,{children:"实机乱数操作"}),`
`,e.jsx(n.p,{children:"若要在实机中对宝可病毒进行乱数操作，我们需要掌握以下技术信息："}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"宝可病毒被判定时的目标推进帧数（即：触发感染所需的乱数帧数）"}),`
`,e.jsx(n.li,{children:"玩家需要进行最后一次输入的推进帧数"}),`
`,e.jsx(n.li,{children:"如何进行校准（即确定实际命中的玩家输入帧数）"}),`
`]}),`
`,e.jsxs(n.p,{children:["接下来的章节将解释这些元素是如何被确定，并应用于",e.jsx(n.a,{href:"/rs-pokerus-retail",children:"宝可病毒乱数工具"}),"的。"]}),`
`,e.jsx(n.h3,{children:"宝可病毒判定所需的目标推进帧数"}),`
`,e.jsx(n.p,{children:"如果当前乱数值为 0x4000、0x8000 或 0xC000，队伍中的一只宝可梦将被感染。 在《红宝石/蓝宝石》中，首次出现这些乱数值的帧分别是：26923、101199、101236。在《绿宝石》中，首次出现的为：66610"}),`
`,e.jsx(n.h3,{children:"玩家最后输入的目标推进帧数"}),`
`,e.jsx(n.p,{children:"要确定玩家必须进行最后输入的推进帧数，我们需要理解从玩家按下按钮开始到宝可病毒被判定期间 RNG 是如何推进的。"}),`
`,e.jsxs(n.p,{children:["在《红宝石/蓝宝石》中，触发宝可病毒逻辑的最后一次玩家输入，是在“XXX 获得了 YY 点经验值。”信息出现时按下 ",e.jsx(n.code,{children:"A"})," 键。"]}),`
`,e.jsx(n.p,{children:"接下来会发生以下操作："}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"大约 94 次由vblank和战斗循环引起的帧数推进；"}),`
`,e.jsx(n.li,{children:"对于队伍中每一只拥有捡拾特性的宝可梦，会进行一次 RNG 判断是否拾取道具。若拾取成功（10% 概率），再进行一次 RNG 来决定道具种类；"}),`
`,e.jsx(n.li,{children:"额外的 4 次帧推进（仍为 vblank 相关）；"}),`
`,e.jsx(n.li,{children:"若玩家已进入殿堂，并拥有可用的电视节目槽位，帧数会再推进 1 次；"}),`
`,e.jsx(n.li,{children:"若玩家已进入殿堂并可以触发大量出现，则再推进 1 次；其中约 0.5% 的概率触发事件，并再进行一次 RNG 来决定爆发的宝可梦；"}),`
`,e.jsx(n.li,{children:"又一次与电视节目相关的帧数推进；"}),`
`,e.jsx(n.li,{children:"接下来是约 74 次由 vblank 与战斗循环引起的推进；"}),`
`,e.jsx(n.li,{children:"若宝可梦因战斗升级，还会额外推进 2 次；"}),`
`,e.jsx(n.li,{children:"最后再推进一次帧数以决定是否感染宝可病毒。"}),`
`]}),`
`,e.jsx(n.h3,{children:"可控变量"}),`
`,e.jsx(n.p,{children:"以下变量由玩家控制，且会影响宝可病毒乱数流程："}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"捡拾特性的宝可梦数量；"}),`
`,e.jsx(n.li,{children:"是否已进入殿堂；"}),`
`,e.jsx(n.li,{children:"是否能够触发大量出现；"}),`
`,e.jsx(n.li,{children:"是否有可用的电视节目槽位；"}),`
`,e.jsx(n.li,{children:"战斗后宝可梦是否升级。"}),`
`]}),`
`,e.jsx(n.p,{children:"每种变量组合会影响“玩家最后输入的目标推进帧数”。例如：若你有 5 只捡拾宝可梦； 没有进入殿堂； 无大量出现；没有电视节目；无升级；则对应的“玩家最后输入帧”为26838，从而使你在26923帧触发宝可病毒。"}),`
`,e.jsx(n.h3,{children:"校准方法"}),`
`,e.jsx(n.p,{children:"影响宝可病毒触发的因素中，有许多是玩家不可控的。校准即通过调整玩家输入（如调整计时器）来对这些因素进行修正。"}),`
`,e.jsx(n.p,{children:"我们可以通过观察捡拾到的道具来判断命中的是哪个玩家输入帧。"}),`
`,e.jsx(n.p,{children:"多数情况下没有拾取道具，无法提供信息。但在某些情况下（如第 3 个宝可梦拾取到神奇糖果），可以精确锁定命中帧数。"}),`
`,e.jsx(n.h2,{children:"最佳设置推荐"}),`
`,e.jsx(n.p,{children:"我们可以从以下几个角度评估设置的优劣："}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"校准精度（更多捡拾宝可梦有助于提高精度）；"}),`
`,e.jsx(n.li,{children:"需要达成的条件；"}),`
`,e.jsx(n.li,{children:"每次尝试的时间长短（即目标帧是否靠前）；"}),`
`,e.jsx(n.li,{children:"执行难度（某些设置允许两个帧触发，成功率更高）。"}),`
`]}),`
`,e.jsx(n.p,{children:"以下是推荐的设置组合（从好到差）："}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"设置编号"}),e.jsx(n.th,{children:"捡拾宝可梦数"}),e.jsx(n.th,{children:"已入殿堂"}),e.jsx(n.th,{children:"大量出现"}),e.jsx(n.th,{children:"电视节目"}),e.jsx(n.th,{children:"升级"}),e.jsx(n.th,{children:"玩家输入帧"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"#1"}),e.jsx(n.td,{children:"5"}),e.jsx(n.td,{children:"否"}),e.jsx(n.td,{children:"任意"}),e.jsx(n.td,{children:"任意"}),e.jsx(n.td,{children:"否"}),e.jsx(n.td,{children:"26838"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"#2"}),e.jsx(n.td,{children:"2"}),e.jsx(n.td,{children:"否"}),e.jsx(n.td,{children:"任意"}),e.jsx(n.td,{children:"任意"}),e.jsx(n.td,{children:"否"}),e.jsx(n.td,{children:"26841 或 26842"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"#3"}),e.jsx(n.td,{children:"5"}),e.jsx(n.td,{children:"是"}),e.jsx(n.td,{children:"否"}),e.jsx(n.td,{children:"是"}),e.jsx(n.td,{children:"否"}),e.jsx(n.td,{children:"26837"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"#4"}),e.jsx(n.td,{children:"1"}),e.jsx(n.td,{children:"是"}),e.jsx(n.td,{children:"否"}),e.jsx(n.td,{children:"是"}),e.jsx(n.td,{children:"否"}),e.jsx(n.td,{children:"26841 或 26842"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"最差"}),e.jsx(n.td,{children:">0"}),e.jsx(n.td,{children:"是"}),e.jsx(n.td,{children:"是"}),e.jsx(n.td,{children:"是"}),e.jsx(n.td,{children:"任意"}),e.jsx(n.td,{children:"~101199"})]})]})]}),`
`,e.jsx(n.p,{children:"对于进阶用户，建议使用设置 #1 或 #3 进行校准（因拥有 5 只捡拾宝可梦而更易校准）。校准完成后，可切换至设置 #2 或 #4，因有两个有效帧更易执行。"}),`
`,e.jsx(n.p,{children:"若为最差设置（如有大量出现），将无法命中 26923 帧，最早的宝可病毒判定将是在 101199。"}),`
`,e.jsx(n.h2,{children:"推进帧奇偶性问题"}),`
`,e.jsx(n.p,{children:"在战斗中等待时，帧数每次推进 2 次。如果当前推进帧为奇数，则会一直保持奇数，意味着你永远无法命中偶数帧（如 26838）。"}),`
`,e.jsx(n.p,{children:"理论上，你可以通过战斗中遭受敌人攻击来改变当前推进帧的奇偶性。使用甜甜香气并让对方攻击你，可切换当前奇偶性。"}),`
`,e.jsx(n.h2,{children:"搜索函数参考"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["电视节目函数：",e.jsx(n.a,{href:"https://github.com/pret/pokeruby/blob/master/src/tv.c#L797",children:"PutPokemonTodayCaughtOnAir()"})]}),`
`,e.jsxs(n.li,{children:["捡拾函数：",e.jsx(n.a,{href:"https://github.com/pret/pokeruby/blob/master/src/battle_script_commands.c#L9200",children:"atkE5_pickup()"})]}),`
`,e.jsxs(n.li,{children:["宝可病毒函数：",e.jsx(n.a,{href:"https://github.com/pret/pokeruby/blob/master/src/pokemon_3.c#L817",children:"RandomlyGivePartyPokerus()"})]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/RainingChain/pk_emu_scripts/blob/main/Gen3/log_rng_advances.lua",children:"显示 RNG 推进帧的 Lua 脚本"})}),`
`]}),`
`,e.jsx(n.h2,{children:"致谢"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"指南与脚本：RainingChain"}),`
`,e.jsx(n.li,{children:"脚本灵感来源：Real96"}),`
`,e.jsxs(n.li,{children:["解构项目支持：",e.jsx(n.a,{href:"https://github.com/pret",children:"pret 团队"})]}),`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function t(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}function d(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{t as default,c as frontmatter};
