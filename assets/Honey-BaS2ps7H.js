import{t as e}from"./jsx-runtime-CLxixnhA.js";import{S as t}from"./index-jzB9fByq.js";var n=e(),r={title:`钻石/珍珠/白金蜜树乱数原理`,navDrawerTitle:`蜜树乱数`,description:`了解蜜树遇敌槽位，控制钻石、珍珠和白金的蜜树宝可梦，包括小卡比兽。`,slug:`zh-dppt-setup-rng`,translation:{enSlug:`dppt-setup-rng`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`介绍`}),`
`,(0,n.jsx)(r.p,{children:`本指南介绍如何通过在树上涂甜甜蜜，获得想要的宝可梦，重点说明小卡比兽的生成及对应树木的查找方式。`}),`
`,(0,n.jsxs)(r.p,{children:[`特别感谢 `,(0,n.jsx)(r.a,{href:`https://www.dragonflycave.com/sinnoh/honey-trees`,children:`Dragonfly Caves`}),` 对遇敌槽位和小卡比兽机制的研究。也可以通过该网站定位蜜树。`]}),`
`,(0,n.jsx)(r.h2,{children:`准备工作`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`站在想要进行乱数的蜜树前。`}),`
`,(0,n.jsxs)(r.li,{children:[`打开 `,(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`}),`，进入 `,(0,n.jsx)(r.code,{children:`Gen 4 => Stationary => Method 1`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`启动游戏，记下初始种子，再生成结果。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`乱数原理`}),`
`,(0,n.jsx)(r.p,{children:`蜜树的遇敌槽位可以看作一张表格。列决定遇敌类别，行决定具体宝可梦。`}),`
`,(0,n.jsx)(r.p,{children:`表格中的每一格对应一种结果。当前推进数之后的第 1 次乱数决定列，第 2 次乱数决定行。`}),`
`,(0,n.jsx)(r.p,{children:`例如当前为推进数 10，则由第 11 次推进的结果决定列，第 12 次决定行。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`取 PokeFinder 中接下来两个推进结果的 PID。`}),`
`,(0,n.jsx)(r.li,{children:`保留 PID 的后半部分。`}),`
`,(0,n.jsx)(r.li,{children:`转换为十进制。`}),`
`,(0,n.jsx)(r.li,{children:`将十进制数除以 656，得到用于查表的行列数值。`}),`
`,(0,n.jsx)(r.li,{children:`根据下表，判断最终会出现的宝可梦。`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`钻石/珍珠`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`行`}),(0,n.jsx)(r.th,{children:`第 1 列（30-99）`}),(0,n.jsx)(r.th,{children:`第 2 列（10-29）`}),(0,n.jsx)(r.th,{children:`第 3 列（0-9，小卡比兽树为 1-9）`}),(0,n.jsx)(r.th,{children:`第 4 列（小卡比兽树为 0）`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`40% (60-99)`}),(0,n.jsx)(r.td,{children:`刺尾虫`}),(0,n.jsx)(r.td,{children:`三蜜蜂`}),(0,n.jsx)(r.td,{children:`无宝可梦`}),(0,n.jsx)(r.td,{children:`小卡比兽`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`20% (40-59)`}),(0,n.jsx)(r.td,{children:`甲壳茧/盾甲茧`}),(0,n.jsx)(r.td,{children:`结草儿`}),(0,n.jsx)(r.td,{children:`无宝可梦`}),(0,n.jsx)(r.td,{children:`小卡比兽`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`20% (20-39)`}),(0,n.jsx)(r.td,{children:`三蜜蜂`}),(0,n.jsx)(r.td,{children:`樱花宝`}),(0,n.jsx)(r.td,{children:`无宝可梦`}),(0,n.jsx)(r.td,{children:`小卡比兽`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`10% (10-19)`}),(0,n.jsx)(r.td,{children:`结草儿`}),(0,n.jsx)(r.td,{children:`长尾怪手`}),(0,n.jsx)(r.td,{children:`无宝可梦`}),(0,n.jsx)(r.td,{children:`小卡比兽`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`5% (5-9)`}),(0,n.jsx)(r.td,{children:`樱花宝`}),(0,n.jsx)(r.td,{children:`赫拉克罗斯`}),(0,n.jsx)(r.td,{children:`无宝可梦`}),(0,n.jsx)(r.td,{children:`小卡比兽`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`5% (0-4)`}),(0,n.jsx)(r.td,{children:`长尾怪手`}),(0,n.jsx)(r.td,{children:`刺尾虫`}),(0,n.jsx)(r.td,{children:`无宝可梦`}),(0,n.jsx)(r.td,{children:`小卡比兽`})]})]})]}),`
`,(0,n.jsx)(r.h3,{children:`白金`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`行`}),(0,n.jsx)(r.th,{children:`第 1 列（30-99）`}),(0,n.jsx)(r.th,{children:`第 2 列（10-29）`}),(0,n.jsx)(r.th,{children:`第 3 列（0-9，小卡比兽树为 1-9）`}),(0,n.jsx)(r.th,{children:`第 4 列（小卡比兽树为 0）`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`40% (60-99)`}),(0,n.jsx)(r.td,{children:`三蜜蜂`}),(0,n.jsx)(r.td,{children:`结草儿`}),(0,n.jsx)(r.td,{children:`无宝可梦`}),(0,n.jsx)(r.td,{children:`小卡比兽`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`20% (40-59)`}),(0,n.jsx)(r.td,{children:`刺尾虫`}),(0,n.jsx)(r.td,{children:`樱花宝`}),(0,n.jsx)(r.td,{children:`无宝可梦`}),(0,n.jsx)(r.td,{children:`小卡比兽`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`20% (20-39)`}),(0,n.jsx)(r.td,{children:`结草儿`}),(0,n.jsx)(r.td,{children:`三蜜蜂`}),(0,n.jsx)(r.td,{children:`无宝可梦`}),(0,n.jsx)(r.td,{children:`小卡比兽`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`10% (10-19)`}),(0,n.jsx)(r.td,{children:`樱花宝`}),(0,n.jsx)(r.td,{children:`长尾怪手`}),(0,n.jsx)(r.td,{children:`无宝可梦`}),(0,n.jsx)(r.td,{children:`小卡比兽`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`5% (5-9)`}),(0,n.jsx)(r.td,{children:`长尾怪手`}),(0,n.jsx)(r.td,{children:`长尾怪手`}),(0,n.jsx)(r.td,{children:`无宝可梦`}),(0,n.jsx)(r.td,{children:`小卡比兽`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`5% (0-4)`}),(0,n.jsx)(r.td,{children:`长尾怪手`}),(0,n.jsx)(r.td,{children:`赫拉克罗斯`}),(0,n.jsx)(r.td,{children:`无宝可梦`}),(0,n.jsx)(r.td,{children:`小卡比兽`})]})]})]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};