import{u as s,j as e}from"./index-C82Cu2sC.js";const h=[{title:"Diamond, Pearl, and Platinum Wild RNG",navDrawerTitle:"Wild RNG",description:"Wild RNG",slug:"dppt-wild",category:"Diamond, Pearl, and Platinum",tag:"any"},{title:"野生乱数",description:"野生乱数",slug:"zh-dppt-wild",category:"Diamond, Pearl, and Platinum",tag:"any",translation:{enSlug:"dppt-wild",language:"zh"}}];function i(l){const n={code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...l.components},{ShowIf:t}=n;return t||r("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsxs(t,{slug:"/dppt-wild",children:[e.jsx(n.h2,{children:"Intro"}),e.jsx(n.p,{children:"This guide assumes you have basic knowledge of Gen 4 RNG, such as hitting an initial seed and advancing the RNG."}),e.jsx(n.h2,{children:"General"}),e.jsx(n.p,{children:"Before getting into specifics, determine your target frame and set up PokeFinder like this:"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder => Gen 4 => Wild => Searcher. Make sure to select Method J."}),`
`,e.jsx(n.li,{children:"Set up your profile, including the route and desired Pokémon with the correct encounter slot."}),`
`,e.jsx(n.li,{children:"Apply your criteria and identify your target advance."}),`
`]}),e.jsx(n.h2,{children:"Basic Wild"}),e.jsx(n.p,{children:"For a wild encounter, go to the area with your target Pokémon. You need a Pokémon with Sweet Scent or honey. Follow these steps:"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Hit your initial seed."}),`
`,e.jsx(n.li,{children:"Open your party."}),`
`,e.jsx(n.li,{children:"Advance the RNG."}),`
`,e.jsx(n.li,{children:"Use Sweet Scent or honey."}),`
`,e.jsx(n.li,{children:"Avoid leaving the menu to prevent noise cancelation."}),`
`]}),e.jsx(n.p,{children:"Sweet Scent and honey animations won't affect RNG advancement unlike in Gen 5."}),e.jsx(n.h2,{children:"GBA Insertions"}),e.jsx(n.p,{children:"GBA insertions follow the same RNG process as basic wild RNG. They use Encounter Slot 8 and 9. If your profile is set up correctly, PokeFinder will show all relevant information automatically."}),e.jsx(n.h2,{children:"Fishing"}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Any methods claiming to boost the fishing rate do not work. PokeFinder should account for this as it's a DPPt bug.
`})}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go to your desired fishing spot."}),`
`,e.jsx(n.li,{children:"Advance the RNG in your party."}),`
`,e.jsx(n.li,{children:"Open your bag and use the fishing rod."}),`
`]}),e.jsx(n.p,{children:"On an emulator, a significant advancement indicates a successful hook and possibly reaching your target encounter. PokeFinder shows which advances lead to an encounter."}),e.jsx(n.h3,{children:"Feebas"}),e.jsx(n.p,{children:"Feebas encounters are trickier. Here's what to do:"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Find the correct tile."}),`
`,e.jsx(n.li,{children:"Save and set up your RNG."}),`
`,e.jsx(n.li,{children:"Use the PokeFinder Generator and input the initial seed to find the target advance."}),`
`,e.jsx(n.li,{children:"Make sure your target and advance result in an encounter; otherwise, you might not encounter anything."}),`
`]}),e.jsx(n.p,{children:"Feebas has an element of randomness that isn't fully supported yet."}),e.jsx(n.h2,{children:"Trophy Garden"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Stand in front of the garden owner and save your game."}),`
`,e.jsx(n.li,{children:"Reload with any initial seed."}),`
`,e.jsx(n.li,{children:"Open PokeFinder, go to Static, Method 1, and generate results."}),`
`,e.jsx(n.li,{children:"Check the first value of the PID at your current advance."}),`
`,e.jsx(n.li,{children:"Use the table to see which Pokémon are available when you talk to the owner:"}),`
`]}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{style:{textAlign:"left"},children:"PID"}),e.jsx(n.th,{children:"Pokemon"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"0"}),e.jsx(n.td,{children:"Eevee"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"1"}),e.jsx(n.td,{children:"Bonsly"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"2"}),e.jsx(n.td,{children:"Happiny"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"3"}),e.jsx(n.td,{children:"Meowth"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"4"}),e.jsx(n.td,{children:"Cleffa"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"5"}),e.jsx(n.td,{children:"Clefairy"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"6"}),e.jsx(n.td,{children:"Igglybuff"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"7"}),e.jsx(n.td,{children:"Plusle"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"8"}),e.jsx(n.td,{children:"Jigglypuff"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"9"}),e.jsx(n.td,{children:"Porygon (DP)/Ditto(Pt)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"A"}),e.jsx(n.td,{children:"Castform"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"B"}),e.jsx(n.td,{children:"Minun"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"C"}),e.jsx(n.td,{children:"Mime Jr."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"D"}),e.jsx(n.td,{children:"Marill"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"E"}),e.jsx(n.td,{children:"Chansey"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"F"}),e.jsx(n.td,{children:"Azurill"})]})]})]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You might be off by one due to indexing differences between tools. Adjust if needed.
`})}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The Pokémon of the day occupies Encounter Slot 6, and the previous day's Pokémon will be in Encounter Slot 7.
`})}),e.jsx(n.h2,{children:"Great Marsh"}),e.jsx(n.p,{children:"This process is similar to the Trophy Garden and uses Encounter Slot 6 and 7."}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Use the lookout to choose your desired Pokémon."}),`
`,e.jsx(n.li,{children:"Save your game in front of the Great Marsh."}),`
`,e.jsx(n.li,{children:"Find a target with a narrow enough range that allows hitting the target without introducing RNG noise from walking."}),`
`,e.jsx(n.li,{children:"Conclude the RNG as usual."}),`
`]}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(t,{slug:"/zh-dppt-wild",children:[e.jsx(n.h2,{children:"介绍"}),e.jsx(n.p,{children:"本指南假设你已经掌握了第四世代乱数的基础知识，如命中初始种子和推进帧数。"}),e.jsx(n.h2,{children:"通用准备"}),e.jsx(n.p,{children:"在进行具体乱数前，先设置PokeFinder并确定目标帧："}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"打开PokeFinder => 第四世代 => 野生乱数 => 检索器。"}),`
`,e.jsx(n.li,{children:"建立你的个人资料，选择好个人资料之后，根据你的目标填写好设定项（请注意宝可梦的出现时间）。"}),`
`,e.jsx(n.li,{children:"设置好筛选条件之后计算结果（若无结果请减少筛选条件），选择你的目标。"}),`
`]}),e.jsx(n.h2,{children:"基础野生乱数"}),e.jsx(n.p,{children:"你需要在目标区域使用甜甜香气（需要学会该技能的宝可梦）或甜甜蜜（花苑花田购入）进行野生遭遇："}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"命中初始种子。"}),`
`,e.jsx(n.li,{children:"打开宝可梦队伍菜单。"}),`
`,e.jsx(n.li,{children:"推进帧数。"}),`
`,e.jsx(n.li,{children:"使用甜甜香气或甜甜蜜。"}),`
`,e.jsx(n.li,{children:"不要退出菜单，以防止随机数干扰。"}),`
`]}),e.jsx(n.p,{children:"与第五世代不同，甜甜香气和甜甜蜜的动画效果不会影响帧数推进。"}),e.jsx(n.h2,{children:"GBA卡带联动遭遇"}),e.jsx(n.p,{children:"操作流程与野生遭遇相同，正确配置 PokeFinder 后，工具会自动显示相关信息。"}),e.jsx(n.h2,{children:"钓鱼乱数"}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`注意：任何所谓的“提高钓鱼成功率的方法”都无效，PokeFinder 已经考虑了 DPPt 的相关 bug。
`})}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"前往目标水域。"}),`
`,e.jsx(n.li,{children:"在宝可梦队伍菜单内推进帧数。"}),`
`,e.jsx(n.li,{children:"打开背包并使用钓竿。"}),`
`]}),e.jsx(n.p,{children:"模拟器用户提示：若乱数帧数大幅推进，表明成功上钩并可能命中目标遭遇。PokeFinder 会显示可遭遇的帧数范围。"}),e.jsx(n.h3,{children:"丑丑鱼乱数"}),e.jsx(n.p,{children:"丑丑鱼的遭遇机制是特殊的，步骤如下:"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"先确认正确的丑丑鱼分布水域。"}),`
`,e.jsx(n.li,{children:"存档并设置乱数参数。"}),`
`,e.jsx(n.li,{children:"使用 PokeFinder 生成器输入初始种子，找到目标帧。"}),`
`,e.jsx(n.li,{children:"确保目标帧能够触发遇敌，否则可能会遇不到任何东西。"}),`
`]}),e.jsx(n.p,{children:"当前丑丑鱼的随机性机制尚未完全破解，成功率可能波动。"}),e.jsx(n.h2,{children:"自豪的后院乱数"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"在庭院主人面前存档。"}),`
`,e.jsx(n.li,{children:"打开PokeFinder => 第四世代 => 野生乱数 => 检索器。选择自豪的后院（Trophy Garden）。"}),`
`,e.jsx(n.li,{children:"筛选你想要的宝可梦，并勾选遇敌种类为6（想要更多结果则为6、7），计算结果选择目标种子。"}),`
`,e.jsx(n.li,{children:"以任意初始种子重新加载游戏。打开 PokeFinder 选择定点乱数输入当前种子生成结果。"}),`
`,e.jsx(n.li,{children:"对照下表，寻找PID第五位数值相对应的帧数，推进至目标帧。"}),`
`,e.jsx(n.li,{children:"与庭院主人对话确定当日宝可梦，随后存档。"}),`
`,e.jsx(n.li,{children:"命中目标种子，就像普通野生乱数那样进行下去。"}),`
`]}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{style:{textAlign:"left"},children:"PID"}),e.jsx(n.th,{children:"宝可梦"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"0"}),e.jsx(n.td,{children:"伊布"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"1"}),e.jsx(n.td,{children:"胡说盆栽"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"2"}),e.jsx(n.td,{children:"小福蛋"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"3"}),e.jsx(n.td,{children:"喵喵"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"4"}),e.jsx(n.td,{children:"皮宝宝"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"5"}),e.jsx(n.td,{children:"皮可西"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"6"}),e.jsx(n.td,{children:"宝宝丁"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"7"}),e.jsx(n.td,{children:"正电拍拍"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"8"}),e.jsx(n.td,{children:"胖丁"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"9"}),e.jsx(n.td,{children:"3D龙 (DP)/百变怪(Pt)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"A"}),e.jsx(n.td,{children:"漂浮泡泡"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"B"}),e.jsx(n.td,{children:"负电拍拍"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"C"}),e.jsx(n.td,{children:"魔尼尼"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"D"}),e.jsx(n.td,{children:"玛力露"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"E"}),e.jsx(n.td,{children:"吉利蛋"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{style:{textAlign:"left"},children:"F"}),e.jsx(n.td,{children:"玛力露丽"})]})]})]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`注意：不同工具可能导致索引偏差 ±1，必要时需手动调整。
`})}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`注意：“今天的宝可梦”在遭遇槽6，“昨天的宝可梦”在遭遇槽7。如果你选择了槽7的目标，请进行两次确定当日宝可梦。
`})}),e.jsx(n.h2,{children:"大湿地乱数"}),e.jsx(n.p,{children:"大湿地的乱数类似于自豪的后院，其遭遇槽6 和 7 也存储了每日宝可梦。"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"在眺望台选择目标宝可梦。"}),`
`,e.jsx(n.li,{children:"在大湿地入口前保存游戏。"}),`
`,e.jsx(n.li,{children:"选择目标帧范围，避免走动导致额外乱数干扰。"}),`
`,e.jsx(n.li,{children:"按普通野生乱数方式进行。"}),`
`]}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function c(l={}){const{wrapper:n}={...s(),...l.components};return n?e.jsx(n,{...l,children:e.jsx(i,{...l})}):i(l)}function r(l,n){throw new Error("Expected component `"+l+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,h as frontmatter};
