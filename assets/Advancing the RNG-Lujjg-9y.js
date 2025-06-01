import{u as s,j as n}from"./index-CsrGO9EE.js";const c={title:"推进乱数",description:"乱数推进的方法及影响乱数的机制",slug:"zh-hgss-rng-advance",translation:{enSlug:"hgss-rng-advance",language:"zh"}};function e(i){const l={code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...s(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(l.p,{children:"本指南介绍了在《心金 / 魂银》中帧数的推进方式及影响乱数的因素。推荐的方法是使用聒噪鸟或收音机，但如果无法使用这些方法，也有其他方式可以推进帧数。"}),`
`,n.jsx(l.h2,{children:"聒噪鸟叫声"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:'需要携带已录制自定义叫声的聒噪鸟（通过技能"喋喋不休"进行录音）。每次查看宝可梦信息界面可推进1帧。'}),`
`,n.jsx(l.li,{children:"不需要完整播放录音，仅需打开信息页面即可生效。"}),`
`,n.jsx(l.li,{children:"队伍中携带两只或更多聒噪鸟，通过方向键上/下快速切换页面，以快速增加帧数。"}),`
`]}),`
`,n.jsx(l.h2,{children:"收音机"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:"在特定频道和无频道之间切换可以推进帧数。"}),`
`,n.jsx(l.li,{children:"大木博士的宝可梦讲座频道推进 14-18 次。"}),`
`,n.jsx(l.li,{children:"广播频道通常推进 1 次，但如果正在播放葵妍的密语，则不会推进。"}),`
`,n.jsx(l.li,{children:"该方法可以与其他方法结合使用，以在接近目标推进值时进行微调。"}),`
`]}),`
`,n.jsx(l.p,{children:n.jsx(l.img,{src:"/images/HeartGold-SoulSilver/Advance-RNG/Radio.png",alt:"Radio Station"})}),`
`,n.jsx(l.p,{children:n.jsx(l.img,{src:"/images/HeartGold-SoulSilver/Advance-RNG/Radio-2.png",alt:"Radio Station"})}),`
`,n.jsx(l.h2,{children:"角色移动"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:"在野生宝可梦出现区域（草丛/水面/洞穴）每移动一步或转向，推进1帧。"}),`
`,n.jsx(l.li,{children:"每行走128步时，帧推进数=队伍中宝可梦的数量。"}),`
`,n.jsx(l.li,{children:"步数计数器从0开始累计，达到128后重置。该计数器会被保存，例如读档时若步数为127，则走一步后将触发帧数推进（推进帧数为队伍中宝可梦的数量）。"}),`
`,n.jsx(l.li,{children:"除非别无选择，否则不建议采用此方法。"}),`
`]}),`
`,n.jsx(l.h2,{children:"NPC活动"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:"随机移动的NPC（转向或行走）每次动作推进1帧。若NPC同时执行两种动作，则推进2帧。"}),`
`,n.jsx(l.li,{children:"同区域内但不在屏幕范围内的活动NPC仍会影响帧数推进，建议选择NPC较少或无NPC的地点进行捕捉。"}),`
`,n.jsxs(l.li,{children:["若无法避免 NPC 影响，可进入游戏时立即按",n.jsx(l.code,{children:"X"}),"键打开菜单，可冻结所有NPC行动避免额外的帧数推进。"]}),`
`]}),`
`,n.jsx(l.h2,{children:"游走宝可梦"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:"地图上存在游走宝可梦时，每只游走宝可梦都会让初始帧数额外增加1或2帧。"}),`
`,n.jsx(l.li,{children:"计算到达目标帧需要推进的帧数时，需减去这些初始帧。"}),`
`,n.jsx(l.li,{children:"如果有多个游走宝可梦，建议预设更高的初始帧数，以免推进帧数过多超过目标帧。"}),`
`]}),`
`,n.jsx(l.h2,{children:"特别鸣谢"}),`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})}function d(i={}){const{wrapper:l}={...s(),...i.components};return l?n.jsx(l,{...i,children:n.jsx(e,{...i})}):e(i)}export{d as default,c as frontmatter};
