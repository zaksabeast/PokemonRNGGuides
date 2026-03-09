import{ie as s,j as n}from"./index-BkpeH8au.js";const c={title:"移除《欧米伽红宝石／阿尔法蓝宝石》的时间惩罚",description:"学习如何在《欧米伽红宝石／阿尔法蓝宝石》中更改时间而不触发时间惩罚。",slug:"zh-oras-remove-time-penalty",translation:{enSlug:"oras-remove-time-penalty",language:"zh"}};function l(i){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...s(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.p,{children:"当发生以下任意情况时，游戏会锁定所有与时间相关的事件 24 小时："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"存档在不同主机之间移动。"}),`
`,n.jsx(e.li,{children:"卡带在一台主机上存档后，又在另一台主机上游玩。"}),`
`,n.jsx(e.li,{children:"将实体主机上的存档复制到模拟器。"}),`
`,n.jsx(e.li,{children:"调整实体主机的系统时间（模拟器不受影响）。"}),`
`]}),`
`,n.jsx(e.p,{children:"在模拟器上调整时间是安全的，因为模拟器会被视为现实时间流逝，而不是修改主机设置。"}),`
`,n.jsx(e.h2,{children:"模拟器（Citra、Lime3DS、Azahar）"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"将模拟器的日期设置为早于你目标日期的时间。"}),`
`,n.jsx(e.li,{children:"启动游戏并存档。"}),`
`]}),`
`,n.jsx(e.p,{children:"完成以上步骤后，你就可以将日期自由设置为任意未来日期，而不会触发时间惩罚。"}),`
`,n.jsx(e.h2,{children:"实机"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"将宝可梦游戏更新至最新版本。"}),`
`,n.jsx(e.li,{children:"将主机日期设置为早于你目标日期的时间。"}),`
`,n.jsx(e.li,{children:"启动游戏，存档，然后关闭游戏。"}),`
`,n.jsxs(e.li,{children:["按照 ",n.jsx(e.a,{href:"/zh-misc-3ds-ips-luma-citra",children:"IPS 补丁指南"})," 启用 IPS 补丁功能。"]}),`
`,n.jsxs(e.li,{children:["如果尚不存在，请创建 Luma 补丁文件夹：",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["欧米伽红宝石：",n.jsx(e.code,{children:"/luma/titles/000400000011C400/"})]}),`
`,n.jsxs(e.li,{children:["阿尔法蓝宝石：",n.jsx(e.code,{children:"/luma/titles/000400000011C500/"})]}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:["下载与你游戏版本对应的 ",n.jsx(e.code,{children:"code.ips"}),"，并复制到补丁文件夹中：",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/downloads/or-remove-time-penalty/code.ips",children:"欧米伽红宝石 code.ips"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/downloads/as-remove-time-penalty/code.ips",children:"阿尔法蓝宝石 code.ips"})}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.p,{children:"如果之后遇到任何问题，请移除该补丁，并重新按以上步骤操作。"}),`
`,n.jsx(e.h2,{children:"Credits"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Zaksabeast for looking into this and making the time penality removal patch."}),`
`,n.jsx(e.li,{children:"Rebel on Discord for helping test."}),`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function d(i={}){const{wrapper:e}={...s(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(l,{...i})}):l(i)}export{d as default,c as frontmatter};
