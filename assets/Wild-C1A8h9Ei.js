import{u as d,j as n}from"./index-DBDaE7ej.js";const t=[{title:"野生乱数",description:"野生乱数",slug:"zh-dppt-wild",translation:{enSlug:"dppt-wild",language:"zh"}}];function i(l){const e={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...d(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"介绍"}),`
`,n.jsx(e.p,{children:"本指南假设你已经掌握了第四世代乱数的基础知识，如命中初始种子和推进帧数。"}),`
`,n.jsx(e.h2,{children:"通用准备"}),`
`,n.jsxs(e.p,{children:["在进行具体乱数前，先设置",n.jsx(e.a,{href:"/pokefinder",children:"PokeFinder"}),"并确定目标帧："]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开PokeFinder => 第四世代 => 野生乱数 => 检索器。"}),`
`,n.jsx(e.li,{children:"建立你的个人资料，选择好个人资料之后，根据你的目标填写好设定项（请注意宝可梦的出现时间）。"}),`
`,n.jsx(e.li,{children:"设置好筛选条件之后计算结果（若无结果请减少筛选条件），选择你的目标。"}),`
`]}),`
`,n.jsx(e.h2,{children:"基础野生乱数"}),`
`,n.jsx(e.p,{children:"你需要在目标区域使用甜甜香气（需要学会该技能的宝可梦）或甜甜蜜（花苑花田购入）进行野生遭遇："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"命中初始种子。"}),`
`,n.jsx(e.li,{children:"打开宝可梦队伍菜单。"}),`
`,n.jsx(e.li,{children:"推进帧数。"}),`
`,n.jsx(e.li,{children:"使用甜甜香气或甜甜蜜。"}),`
`,n.jsx(e.li,{children:"不要退出菜单，以防止随机数干扰。"}),`
`]}),`
`,n.jsx(e.p,{children:"与第五世代不同，甜甜香气和甜甜蜜的动画效果不会影响帧数推进。"}),`
`,n.jsx(e.h2,{children:"GBA卡带联动遭遇"}),`
`,n.jsx(e.p,{children:"操作流程与野生遭遇相同，正确配置 PokeFinder 后，工具会自动显示相关信息。"}),`
`,n.jsx(e.h2,{children:"钓鱼乱数"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：任何所谓的“提高钓鱼成功率的方法”都无效，PokeFinder 已经考虑了 DPPt 的相关 bug。
`})}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"前往目标水域。"}),`
`,n.jsx(e.li,{children:"在宝可梦队伍菜单内推进帧数。"}),`
`,n.jsx(e.li,{children:"打开背包并使用钓竿。"}),`
`]}),`
`,n.jsx(e.p,{children:"模拟器用户提示：若乱数帧数大幅推进，表明成功上钩并可能命中目标遭遇。PokeFinder 会显示可遭遇的帧数范围。"}),`
`,n.jsx(e.h3,{children:"丑丑鱼乱数"}),`
`,n.jsx(e.p,{children:"丑丑鱼的遭遇机制是特殊的，步骤如下:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"先确认正确的丑丑鱼分布水域。"}),`
`,n.jsx(e.li,{children:"存档并设置乱数参数。"}),`
`,n.jsx(e.li,{children:"使用 PokeFinder 生成器输入初始种子，找到目标帧。"}),`
`,n.jsx(e.li,{children:"确保目标帧能够触发遇敌，否则可能会遇不到任何东西。"}),`
`]}),`
`,n.jsx(e.p,{children:"当前丑丑鱼的随机性机制尚未完全破解，成功率可能波动。"}),`
`,n.jsx(e.h2,{children:"自豪的后院乱数"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"在庭院主人面前存档。"}),`
`,n.jsx(e.li,{children:"打开PokeFinder => 第四世代 => 野生乱数 => 检索器。选择自豪的后院（Trophy Garden）。"}),`
`,n.jsx(e.li,{children:"筛选你想要的宝可梦，并勾选遇敌种类为6（想要更多结果则为6、7），计算结果选择目标种子。"}),`
`,n.jsx(e.li,{children:"以任意初始种子重新加载游戏。打开 PokeFinder 选择定点乱数输入当前种子生成结果。"}),`
`,n.jsx(e.li,{children:"对照下表，寻找PID第五位数值相对应的帧数，推进至目标帧。"}),`
`,n.jsx(e.li,{children:"与庭院主人对话确定当日宝可梦，随后存档。"}),`
`,n.jsx(e.li,{children:"命中目标种子，就像普通野生乱数那样进行下去。"}),`
`]}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{style:{textAlign:"left"},children:"PID"}),n.jsx(e.th,{children:"宝可梦"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"0"}),n.jsx(e.td,{children:"伊布"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"1"}),n.jsx(e.td,{children:"胡说盆栽"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"2"}),n.jsx(e.td,{children:"小福蛋"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"3"}),n.jsx(e.td,{children:"喵喵"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"4"}),n.jsx(e.td,{children:"皮宝宝"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"5"}),n.jsx(e.td,{children:"皮可西"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"6"}),n.jsx(e.td,{children:"宝宝丁"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"7"}),n.jsx(e.td,{children:"正电拍拍"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"8"}),n.jsx(e.td,{children:"胖丁"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"9"}),n.jsx(e.td,{children:"3D龙 (DP)/百变怪(Pt)"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"A"}),n.jsx(e.td,{children:"漂浮泡泡"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"B"}),n.jsx(e.td,{children:"负电拍拍"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"C"}),n.jsx(e.td,{children:"魔尼尼"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"D"}),n.jsx(e.td,{children:"玛力露"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"E"}),n.jsx(e.td,{children:"吉利蛋"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{style:{textAlign:"left"},children:"F"}),n.jsx(e.td,{children:"玛力露丽"})]})]})]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：不同工具可能导致索引偏差 ±1，必要时需手动调整。
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：“今天的宝可梦”在遭遇槽6，“昨天的宝可梦”在遭遇槽7。如果你选择了槽7的目标，请进行两次确定当日宝可梦。
`})}),`
`,n.jsx(e.h2,{children:"大湿地乱数"}),`
`,n.jsx(e.p,{children:"大湿地的乱数类似于自豪的后院，其遭遇槽6 和 7 也存储了每日宝可梦。"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"在眺望台选择目标宝可梦。"}),`
`,n.jsx(e.li,{children:"在大湿地入口前保存游戏。"}),`
`,n.jsx(e.li,{children:"选择目标帧范围，避免走动导致额外乱数干扰。"}),`
`,n.jsx(e.li,{children:"按普通野生乱数方式进行。"}),`
`]}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})}function r(l={}){const{wrapper:e}={...d(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(i,{...l})}):i(l)}export{r as default,t as frontmatter};
