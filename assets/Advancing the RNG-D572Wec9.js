import{E as s,j as n}from"./index-D5dZrs21.js";const c=[{title:"乱数的帧数推进方法",description:"推进乱数帧数的不同方法及影响帧数的事件机制",slug:"zh-dppt-advance-rng",translation:{enSlug:"dppt-advance-rng",language:"zh"}}];function e(i){const l={h2:"h2",img:"img",li:"li",p:"p",ul:"ul",...s(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(l.p,{children:"本文阐述《宝可梦 钻石/珍珠/白金》中推进乱数帧数的多种方法。其中使用聒噪鸟或冒险笔记最为高效，但如果这些方法不可用，还有其他替代方案。"}),`
`,n.jsx(l.h2,{children:"聒噪鸟叫声"}),`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:'需要携带已录制自定义叫声的聒噪鸟（通过技能"喋喋不休"进行录音）。每次查看宝可梦信息界面可推进1帧。'}),`
`,n.jsx(l.li,{children:"不需要完整播放录音，仅需打开信息页面即可生效。"}),`
`,n.jsx(l.li,{children:"操作优化：队伍中携带两只或更多聒噪鸟，通过方向键上/下快速切换页面，以快速增加帧数。"}),`
`]}),`
`,n.jsx(l.h2,{children:"角色移动"}),`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:"在野生宝可梦出现区域（草丛/水面/洞穴）每移动一步或转向，推进1帧。"}),`
`,n.jsx(l.li,{children:"每行走128步时，帧推进数=队伍中宝可梦的数量。"}),`
`,n.jsx(l.li,{children:"步数计数器从0开始累计，达到128后重置。该计数器会被保存，例如读档时若步数为127，则走一步后将触发帧数推进（推进帧数为队伍中宝可梦的数量）。"}),`
`,n.jsx(l.li,{children:"除非别无选择，否则不建议采用此方法。"}),`
`]}),`
`,n.jsx(l.h2,{children:"NPC活动"}),`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:"随机移动的NPC（转向或行走）每次动作推进1帧。若NPC同时执行两种动作，则推进2帧。"}),`
`,n.jsx(l.li,{children:"同区域内但不在屏幕范围内的活动NPC仍会影响帧数推进，建议选择NPC较少或无NPC的地点进行捕捉"}),`
`,n.jsx(l.li,{children:'可使用"对战搜寻器"冻结NPC活动。'}),`
`,n.jsx(l.li,{children:"进入游戏时立即按X键打开菜单，可暂停所有NPC行动避免额外的帧数推进。"}),`
`]}),`
`,n.jsx(l.h2,{children:"冒险笔记"}),`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:'当笔记显示"XX时抓到了XX"记录时，每次翻页推进2帧。'}),`
`,n.jsx(l.li,{children:"翻到另一个相同格式的页面，也会推进 2 帧。"}),`
`,n.jsx(l.li,{children:"只要笔记中有一条“XX时抓到了XX”记录，每次翻页都会推进2帧，不受条目数量影响。"}),`
`]}),`
`,n.jsx(l.p,{children:n.jsx(l.img,{src:"/images/Diamond-Pearl-Platinum/Advance-RNG/Journal.png",alt:"Journal"})}),`
`,n.jsx(l.h2,{children:"游走宝可梦"}),`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:"地图上存在游走宝可梦时，每只游走宝可梦都会让初始帧数额外增加1或2帧。"}),`
`,n.jsx(l.li,{children:"计算到达目标帧需要推进的帧数时，需减去这些初始帧。"}),`
`,n.jsx(l.li,{children:"如果有多个游走宝可梦，建议预设更高的初始帧数，以免推进帧数过多超过目标帧。"}),`
`]}),`
`,n.jsx(l.h2,{children:"特别鸣谢"}),`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function h(i={}){const{wrapper:l}={...s(),...i.components};return l?n.jsx(l,{...i,children:n.jsx(e,{...i})}):e(i)}export{h as default,c as frontmatter};
