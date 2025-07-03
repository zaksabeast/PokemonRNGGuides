import{v as r,j as n}from"./index-CNyGBSTc.js";const c={title:"实机野生乱数",description:"在真实主机上对野生宝可梦进行乱数操作",slug:"zh-retail-emerald-wild",translation:{enSlug:"retail-emerald-wild",language:"zh"}};function l(e){const i={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...r(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(i.h2,{children:"前置要求"}),`
`,n.jsxs(i.ul,{children:[`
`,n.jsx(i.li,{children:n.jsx(i.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,n.jsx(i.li,{children:n.jsx(i.a,{href:"/mystic-timer",children:"Mystic Timer"})}),`
`,n.jsx(i.li,{children:"TID 和 SID（仅在寻找异色宝可梦时需要）"}),`
`,n.jsx(i.li,{children:"会使用甜甜香气的宝可梦"}),`
`]}),`
`,n.jsx(i.h2,{children:"第一步：设置 PokeFinder"}),`
`,n.jsxs(i.ol,{children:[`
`,n.jsx(i.li,{children:"打开 PokeFinder，选择第三世代野生乱数。"}),`
`,n.jsxs(i.li,{children:["如果要获取异色，请选择包含 TID/SID 的个人资料。",`
`,n.jsxs(i.ul,{children:[`
`,n.jsxs(i.li,{children:["如果不知道 SID，可参考",n.jsx(i.a,{href:"/gen3-sid",children:"这个指南"})]}),`
`]}),`
`]}),`
`,n.jsx(i.li,{children:"将方式设为 Wild 2。"}),`
`,n.jsx(i.li,{children:"Seed 设为 0。"}),`
`,n.jsx(i.li,{children:"视情况选择草丛或冲浪遭遇。"}),`
`,n.jsx(i.li,{children:"选择具体地点和目标宝可梦（可选）。"}),`
`,n.jsx(i.li,{children:"使用筛选器找到你想要的宝可梦。"}),`
`,n.jsx(i.li,{children:"点击计算结果，在结果中寻找合适的目标。"}),`
`]}),`
`,n.jsx(i.h2,{children:"第二步：设置 Mystic Timer"}),`
`,n.jsxs(i.ol,{children:[`
`,n.jsx(i.li,{children:"打开 Mystic Timer。"}),`
`,n.jsx(i.li,{children:"切换到 Gen 3 选项卡。"}),`
`,n.jsx(i.li,{children:"选择你使用的主机类型。"}),`
`,n.jsx(i.li,{children:"在 Target Frame 栏输入 PokeFinder 提供的目标帧数。"}),`
`,n.jsx(i.li,{children:'点击 "Set Timer"，然后点击 "Start" 开始计时。'}),`
`]}),`
`,n.jsx(i.h2,{children:"第三步：校准"}),`
`,n.jsxs(i.ol,{children:[`
`,n.jsx(i.li,{children:"当计时器第一次归零时，按 Start + Select + A + B 重置游戏。"}),`
`,n.jsx(i.li,{children:"进入游戏菜单，打开队伍界面。"}),`
`,n.jsx(i.li,{children:"选中带有甜甜香气的宝可梦，将光标悬停在该招式上。"}),`
`,n.jsx(i.li,{children:"等待第二次倒计时结束后，立刻按 A 释放甜甜香气。"}),`
`,n.jsx(i.li,{children:"捕获遇到的宝可梦，并在 PokeFinder 的 IV calculator中输入它的个体值。"}),`
`,n.jsx(i.li,{children:"在遇敌种类选项中选择任何，然后点击生成。（若无结果请更改方式Wild 1或4）"}),`
`,n.jsx(i.li,{children:"在结果中找到你刚捕获的宝可梦，并将实际帧数输入 Mystic Timer 进行修正"}),`
`,n.jsx(i.li,{children:"点击 Update 保存校准结果。"}),`
`]}),`
`,n.jsx(i.h2,{children:"第四步：执行乱数"}),`
`,n.jsx(i.p,{children:`校准延迟完成后，剩下的就是把握好时机：
持续捕捉宝可梦，检查落点是否准确。
如果推进数误差在 1~2 之间，可直接重试，无需调整计时器。
如果误差较大，可适当调整 Mystic Timer 设定值，优化计时精度。`}),`
`,n.jsx(i.h2,{children:"特别鸣谢"}),`
`,n.jsxs(i.ul,{children:[`
`,n.jsx(i.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function d(e={}){const{wrapper:i}={...r(),...e.components};return i?n.jsx(i,{...e,children:n.jsx(l,{...e})}):l(e)}export{d as default,c as frontmatter};
