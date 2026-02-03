import{g7 as l,j as e}from"./index-B1wHGEg7.js";const r={title:"钻石、珍珠与白金版 TID/SID 乱数",description:"了解如何在钻石、珍珠和白金版中通过模拟器获得你想要的训练家 ID（TID）与里 ID（SID）组合",slug:"zh-emulator-dppt-tid-sid",translation:{enSlug:"emulator-dppt-tid-sid",language:"zh"}};function s(i){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"工具"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume 模拟器"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.nirsoft.net/utils/run_as_date.html",children:"RunAsDate"})}),`
`]}),`
`,e.jsx(n.h2,{children:"第一步：选择你要乱数的 ID"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"打开 PokeFinder，进入第四世代的ID's标签页。"}),`
`,e.jsx(n.li,{children:"在筛选器（Filters）中选择 TID，输入你想要的 5 位数编号。"}),`
`,e.jsx(n.li,{children:"将 delay 提高到至少 5000。"}),`
`,e.jsx(n.li,{children:"选一个你喜欢的 TID/SID 组合。"}),`
`,e.jsx(n.li,{children:"右键点击这个组合，选择「为种子生成时间」。"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/TID/pkfinder-ID-search.png",alt:"pk-finder-id-boxes"})}),`
`,e.jsx(n.h2,{children:"第二步：设置 RunAsDate"}),`
`,e.jsxs(n.p,{children:["按照",e.jsx(n.a,{href:"/dppt-initial-seed",children:"初始种子乱数指南"})," 中的说明进行操作，直到你进入游戏并开始尝试命中目标种子。"]}),`
`,e.jsx(n.h2,{children:"第三步：命中 delay"}),`
`,e.jsx(n.p,{children:"设置好 RunAsDate 并启动游戏后，尽可能快地跳过开场动画。"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`注意：在命名角色时，使用大写字母或符号会改变 delay 的奇偶性。如果你要重试这一步，请记得保持一致。
`})}),`
`,e.jsxs(n.p,{children:["进入下方这个界面后，按 ",e.jsx(n.code,{children:"N"})," 并在此处创建即时存档状态，然后缓慢推进帧数直到命中目标 delay，按住 ",e.jsx(n.code,{children:"A"})," 并同时按下 ",e.jsx(n.code,{children:"CTRL + P"})," 来解冻游戏画面。"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"白金版"}),e.jsx(n.th,{children:"钻石与珍珠"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/TID/pt-last-screen-tid.png",alt:"pt-last-screen"})}),e.jsx(n.td,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/TID/DP-last-screen-tid.png",alt:"dp-last-screen"})})]})})]}),`
`,e.jsx(n.p,{children:"你很可能第一次得到的 TID 不是目标值。将你实际获得的 TID 输入到 Seed Finder 中，就像下图这样："}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/TID/hit-tid-pkfinder-ex.png",alt:"hit-tid"})}),`
`,e.jsx(n.p,{children:"这个例子中我提前了 46 个 delay。返回你的即时存档，然后再次推进 delay，只是要把偏差考虑进去。"}),`
`,e.jsx(n.p,{children:"恭喜你！你应该已经获得了目标 TID。"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"如果你发现 delay 的奇偶性发生了变化，可以尝试将 PokeFinder 提供的年份加一或减一来切换奇偶。"}),`
`,e.jsx(n.li,{children:"如果你想把这次乱数用来获取异色御三家，可以用 PID 选项作为筛选条件找出合适的延迟。"}),`
`,e.jsxs(n.li,{children:[`你也可以选择乱数一个迷人之躯PID，然后继续进行迷人之躯乱数！
`,e.jsx(n.a,{href:"/emulator-dppt-cute-charm",children:"迷人之躯乱数指南"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"特别鸣谢"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function t(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{t as default,r as frontmatter};
