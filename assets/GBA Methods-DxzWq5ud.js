import{v as i,j as n}from"./index-gNY3AgGw.js";const c={title:"绿宝石中的方式 1-4",description:"什么是方式、为什么会存在方式 1-4，以及它们如何影响宝可梦的生成。",slug:"zh-gba-methods",translation:{enSlug:"gba-methods",language:"zh"}};function l(r){const d={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...r.components},{Gist:s,Text:e}=d;return s||h("Gist"),e||h("Text"),n.jsxs(n.Fragment,{children:[n.jsx(s,{children:"要点：什么是方式，为什么存在方式 1-4，以及它们如何影响宝可梦生成。"}),`
`,n.jsx(d.h3,{children:"什么是方式（Method）"}),`
`,n.jsx(d.p,{children:"方式表示在特定乱数推进数下宝可梦是如何被生成的。"}),`
`,n.jsx(d.p,{children:n.jsx(d.code,{children:"乱数推进数 + 方式 => 宝可梦生成结果"})}),`
`,n.jsx(d.p,{children:"方式由两个部分组成（例如：Wild-2）："}),`
`,n.jsxs(d.ul,{children:[`
`,n.jsx(d.li,{children:"前缀：表示程序使用的 CPU 指令（如 Wild）。"}),`
`,n.jsx(d.li,{children:"后缀：表示在哪个步骤发生了 VBlank（如 2）。"}),`
`]}),`
`,n.jsx(d.h3,{children:"方式前缀：程序 CPU 指令"}),`
`,n.jsx(d.p,{children:"程序执行的 CPU 指令依赖于宝可梦是如何被遇到的。对乱数操作而言，以下三种最为相关："}),`
`,n.jsxs(d.ul,{children:[`
`,n.jsx(d.li,{children:'定点宝可梦：前缀为 "Method"（确实不太直观...）'}),`
`,n.jsx(d.li,{children:'野生宝可梦：前缀为 "Wild" 或 "H"'}),`
`,n.jsx(d.li,{children:'孵化宝可梦：前缀为 "Egg"'}),`
`]}),`
`,n.jsx(d.p,{children:"定点宝可梦的生成逻辑最简单：GBA 游戏先生成 PID，再生成 IV，中间不包含额外的乱数逻辑。"}),`
`,n.jsx(d.p,{children:"野生宝可梦的生成逻辑会根据遭遇表决定种类，并应用同步特性等机制，这可能导致生成多个 PID，然后再生成 IV。"}),`
`,n.jsx(d.p,{children:"孵化宝可梦的生成逻辑包含从父母那里继承个体值等机制。本指南不深入讲解蛋的生成过程。"}),`
`,n.jsx(d.h3,{children:"方式后缀：VBlank 发生的时机"}),`
`,n.jsxs(d.p,{children:["如",n.jsx(d.a,{href:"/gba-vblank",children:"关于 VBlank 的介绍"}),"所述，VBlank 可以在任意时间点发生，从而改变宝可梦的生成过程。"]}),`
`,n.jsx(d.p,{children:"它究竟在哪个步骤产生影响，取决于 VBlank 是否发生，以及发生在哪条程序指令上。"}),`
`,n.jsx(d.p,{children:"这又受到多个因素影响，比如地图、背景音乐、首发宝可梦的 PID、所玩的游戏版本，以及是否通过其他方式（如《宝可梦盒子 红/蓝宝石》）游玩等。"}),`
`,n.jsx(d.h2,{children:"方式列表"}),`
`,n.jsxs(d.table,{children:[n.jsx(d.thead,{children:n.jsxs(d.tr,{children:[n.jsx(d.th,{children:"指令类型"}),n.jsx(d.th,{children:"方式"}),n.jsx(d.th,{children:"罕见度"})]})}),n.jsxs(d.tbody,{children:[n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"定点"}),n.jsxs(d.td,{children:["Method-1",n.jsx("br",{}),"Method-4"]}),n.jsxs(d.td,{children:["非常常见",n.jsx("br",{}),"非常罕见"]})]}),n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"野生"}),n.jsxs(d.td,{children:["Wild-1",n.jsx("br",{}),"Wild-2",n.jsx("br",{}),"Wild-4"]}),n.jsxs(d.td,{children:["非常罕见",n.jsx("br",{}),"非常常见",n.jsx("br",{}),"非常罕见"]})]}),n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"蛋"}),n.jsxs(d.td,{children:["Egg-Normal",n.jsx("br",{}),"Egg-Split",n.jsx("br",{}),"Egg-Alternate"]}),n.jsxs(d.td,{children:["常见",n.jsx("br",{}),"常见",n.jsx("br",{}),"不常见"]})]})]})]}),`
`,n.jsx(d.h3,{children:"Method-1 与 Wild-1"}),`
`,n.jsx(d.p,{children:"以下是宝可梦生成的流程："}),`
`,n.jsxs(d.table,{children:[n.jsx(d.thead,{children:n.jsxs(d.tr,{children:[n.jsx(d.th,{children:"步骤"}),n.jsx(d.th,{children:"在该步骤开始时推进的乱数帧"})]})}),n.jsxs(d.tbody,{children:[n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"生成 PID 的前半部分"}),n.jsx(d.td,{children:"1"})]}),n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"生成 PID 的后半部分"}),n.jsx(d.td,{children:"2"})]}),n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"生成防御、攻击、HP 的 IV"}),n.jsx(d.td,{children:"3"})]}),n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"生成特防、特攻、速度的 IV"}),n.jsx(d.td,{children:"4"})]})]})]}),`
`,n.jsx(d.p,{children:`当宝可梦在没有发生任何 VBlank 的情况下被生成，就属于 Method-1 或 Wild-1。
它们使用的乱数帧是第 1、2、3、4 帧的值。`}),`
`,n.jsx(d.h3,{children:"Wild-2"}),`
`,n.jsx(d.p,{children:"Wild-2 是指在“生成 PID 的后半部分”与“生成防御、攻击、HP 的 IV”之间发生了 VBlank。"}),`
`,n.jsxs(d.table,{children:[n.jsx(d.thead,{children:n.jsxs(d.tr,{children:[n.jsx(d.th,{children:"步骤"}),n.jsx(d.th,{children:"在该步骤开始时推进的乱数帧"})]})}),n.jsxs(d.tbody,{children:[n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"生成 PID 的前半部分"}),n.jsx(d.td,{children:"1"})]}),n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"生成 PID 的后半部分"}),n.jsx(d.td,{children:"2"})]}),n.jsxs(d.tr,{children:[n.jsx(d.td,{children:n.jsx(e,{color:"Green",strong:!0,children:"VBLANK：乱数推进"})}),n.jsx(d.td,{children:n.jsx(e,{color:"Green",strong:!0,children:"3"})})]}),n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"生成防御、攻击、HP 的 IV"}),n.jsx(d.td,{children:n.jsx(e,{strong:!0,children:"4"})})]}),n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"生成特防、特攻、速度的 IV"}),n.jsx(d.td,{children:n.jsx(e,{strong:!0,children:"5"})})]})]})]}),`
`,n.jsx(d.p,{children:"宝可梦将使用第 1、2、4、5 帧的乱数值生成。第 3 帧的值完全不影响最终结果。"}),`
`,n.jsx(d.h3,{children:"Method-4 与 Wild-4"}),`
`,n.jsx(d.p,{children:"Method-4 与 Wild-4 是指在“生成防御、攻击、HP 的 IV”与“生成特防、特攻、速度的 IV”之间发生了 VBlank。"}),`
`,n.jsxs(d.table,{children:[n.jsx(d.thead,{children:n.jsxs(d.tr,{children:[n.jsx(d.th,{children:"步骤"}),n.jsx(d.th,{children:"在该步骤开始时推进的乱数帧"})]})}),n.jsxs(d.tbody,{children:[n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"生成 PID 的前半部分"}),n.jsx(d.td,{children:"1"})]}),n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"生成 PID 的后半部分"}),n.jsx(d.td,{children:"2"})]}),n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"生成防御、攻击、HP 的 IV"}),n.jsx(d.td,{children:"3"})]}),n.jsxs(d.tr,{children:[n.jsx(d.td,{children:n.jsx(e,{color:"Green",strong:!0,children:"VBLANK：乱数推进"})}),n.jsx(d.td,{children:n.jsx(e,{color:"Green",strong:!0,children:"4"})})]}),n.jsxs(d.tr,{children:[n.jsx(d.td,{children:"生成特防、特攻、速度的 IV"}),n.jsx(d.td,{children:n.jsx(e,{strong:!0,children:"5"})})]})]})]}),`
`,n.jsx(d.p,{children:"宝可梦将使用第 1、2、3、5 帧的乱数值生成。第 4 帧的值不会影响最终结果。"}),`
`,n.jsx(d.h3,{children:"其他方式"}),`
`,n.jsx(d.p,{children:"理论上，也可能在“生成 PID 的前半部分”与“生成后半部分”之间发生 VBlank，这就属于 Wild-3。"}),`
`,n.jsx(d.p,{children:"但由于这两步之间的程序指令极少，因此几乎不可能发生 VBlank。"}),`
`,n.jsx(d.p,{children:"另一个理论上的可能性是，在乱数更新的某条极为特定的指令上发生 VBlank，这会导致这次乱数更新被跳过，从而出现更加复杂的异常现象。"}),`
`,n.jsx(d.h2,{children:"特别鸣谢"}),`
`,n.jsxs(d.ul,{children:[`
`,n.jsx(d.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function x(r={}){const{wrapper:d}={...i(),...r.components};return d?n.jsx(d,{...r,children:n.jsx(l,{...r})}):l(r)}function h(r,d){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default,c as frontmatter};
