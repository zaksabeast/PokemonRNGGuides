import{ie as i,j as n}from"./index-BZ8ioAU6.js";const t={title:"GBA概述",description:"GBA游戏的特性、关键乱数概念与版本差异",slug:"zh-gba-overview",translation:{enSlug:"gba-overview",language:"zh"}};function h(r){const e={a:"a",h2:"h2",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...r.components},{Gist:s}=e;return s||d("Gist"),n.jsxs(n.Fragment,{children:[n.jsx(s,{children:"要点：GBA游戏的特性、关键乱数概念与版本差异。"}),`
`,n.jsx(e.h3,{children:"GBA乱数操作的特点"}),`
`,n.jsx(e.p,{children:"在 GBA 游戏中，随机数（RNG）会以游戏内每帧为单位推进（每秒 60 帧，即每 1/60 秒推进一次）。这意味着进行 RNG 操作时，按下 A 键的精度需要达到 1/60 秒级别，因此难度高于 DS 世代。"}),`
`,n.jsxs(e.p,{children:["对于非常罕见能力的宝可梦进行乱数操作可能需要等待很长一段时间（每次尝试至少1h+）。好在有一些进阶技巧可以",n.jsx(e.a,{href:"/zh-e-tips-rng",children:"加快乱数的推进"}),"。"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.a,{href:"/zh-gba-vblank",children:"vblanks"}),"会在宝可梦生成过程中造成难以预测的随机数推进，从而意外改变生成结果。这些不可控的随机数推进，正是",n.jsx(e.a,{href:"/zh-gba-methods",children:"算法 1-4"}),"之间存在差异的根源。"]}),`
`,n.jsx(e.p,{children:"不过，以上确实是在GBA上乱数操作可行的理由，但更重要的是："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"获得一只全缎带宝可梦的唯一途径。"}),`
`,n.jsx(e.li,{children:"获得闪光梦幻、闪光代欧奇希斯的唯一途径。"}),`
`]}),`
`,n.jsx(e.h3,{children:"GBA随机数生成机制概述"}),`
`,n.jsx(e.p,{children:"宝可梦生成仅使用一种类型的随机数，用于生成 PID（决定性格、特性、异色）与个体值（IVs）。"}),`
`,n.jsxs(e.p,{children:["是否异色取决于PID、TID和SID。这意味着你必须",n.jsx(e.a,{href:"/zh-gen3-sid",children:"知道自己的SID"}),"才能通过乱数操作出一只异色宝可梦"]}),`
`,n.jsx(e.h3,{children:"GBA游戏的关键版本差异"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"游戏"}),n.jsx(e.th,{children:"初始Seed"}),n.jsx(e.th,{children:"有用的信息"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.a,{href:"/emerald-overview",children:"宝可梦绿宝石"})}),n.jsx(e.td,{children:"通常为0"}),n.jsx(e.td,{children:"最容易乱定点、野生和孵蛋的宝可梦"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"红宝石/蓝宝石"}),n.jsxs(e.td,{children:["电池有电：随机",n.jsx("br",{}),"电池没电：通常为5A0"]}),n.jsx(e.td,{children:"获得45级的固拉多和盖欧卡"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:"火红/叶绿"}),n.jsx(e.td,{children:"随机"}),n.jsxs(e.td,{children:["获得闪光超梦、未知图腾的唯一途径",n.jsx("br",{}),"最容易获得异色急冻鸟、闪电鸟、火焰鸟"]})]})]})]}),`
`,n.jsx(e.h3,{children:"实机联动"}),`
`,n.jsx(e.p,{children:"宝可梦可以在GBA和NGC游戏中来回传送。"}),`
`,n.jsx(e.p,{children:"NGC游戏的特殊价值："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["获得",n.jsx(e.a,{href:"/zh-emulator-rs-wishmaker",children:"异色基拉祈"}),"的唯一途径。"]}),`
`,n.jsx(e.li,{children:"相比于GBA游戏，更容易获得更稀有能力的炎帝、雷公、水君等此类宝可梦。"}),`
`]}),`
`,n.jsx(e.p,{children:"宝可梦可以从GBA传送到DS游戏中，但反之则不行。"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：白希洛/Hakuhiro"}),`
`]})]})}function c(r={}){const{wrapper:e}={...i(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(h,{...r})}):h(r)}function d(r,e){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,t as frontmatter};
