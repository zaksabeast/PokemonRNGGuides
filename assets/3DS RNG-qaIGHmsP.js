import{O as h,j as n}from"./index-Mcf0XAZ1.js";const c=[{title:"心金魂银3DS乱数",description:"学习如何通过乱数在心金魂银获得异色、高个体宝可梦",slug:"zh-hgss-3ds-rng",translation:{enSlug:"hgss-3ds-rng",language:"zh"}},{title:"珍钻白金3DS乱数",description:"学习如何通过乱数在珍钻白金获得异色、高个体宝可梦",slug:"zh-dppt-3ds-rng",translation:{enSlug:"dppt-3ds-rng",language:"zh"}}];function l(s){const e={a:"a",h2:"h2",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...h(),...s.components},{Gist:i,YouTubeTable:r}=e;return i||t("Gist"),r||t("YouTubeTable"),n.jsxs(n.Fragment,{children:[n.jsx(i,{children:n.jsx(e.p,{children:`本页解释了为什么在 3DS 上进行 NDS
游戏的乱数会出现延迟不一致的问题，以及如何修复它。`})}),`
`,n.jsx(e.h2,{children:"视频说明"}),`
`,n.jsx(r,{videos:[{title:"Why 3DS RNG is Inconsistent",id:"-ayvPKWNkNw"}]}),`
`,n.jsx(e.h2,{children:"简要总结"}),`
`,n.jsx(e.p,{children:"只想知道怎么修复？"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["我们的第四世代工具提供了“3DS Helper”功能！",n.jsx(e.a,{href:"/3ds-helper",children:"点此查看教程"}),"。"]}),`
`,n.jsxs(e.li,{children:["如果你的主机已破解，还可以使用更简单的 ",n.jsx(e.a,{href:"/3ds-alt-settings",children:"3DS Alt Settings 应用"}),"。"]}),`
`]}),`
`,n.jsx(e.p,{children:"目前尚未推出第五世代相关工具，但 Alt Settings 同样适用于第五世代乱数。"}),`
`,n.jsx(e.h2,{children:"问题来源"}),`
`,n.jsx(e.p,{children:"许多玩家在 3DS 上进行 NDS 游戏的乱数时会发现“秒数不稳定”的问题。过去这被归咎于 TwilightMenu 或 NDS 启动延迟，但我对此一直存疑。"}),`
`,n.jsx(e.p,{children:"如果问题真是出在启动延迟上，那么只要在计时器响时软重启游戏，就应该能解决——然而事实并非如此。"}),`
`,n.jsx(e.p,{children:"这让我怀疑问题其实出现在更早的时间设定环节。"}),`
`,n.jsx(e.h2,{children:"我的推测"}),`
`,n.jsx(e.p,{children:"问题的根源很可能在于 3DS 设置系统时间的方式。"}),`
`,n.jsx(e.p,{children:"在许多现代设备中，手动设置时间时不会清除“毫秒值”（ms），也就是说，设置时间为 14:32:00 时，内部时间可能是 14:32:00.927，这就意味着时间偏差将从最开始就存在。"}),`
`,n.jsx(e.p,{children:"如果 3DS 也有类似行为，那么哪怕只差几毫秒，也可能导致你的秒数偏移整整 1 秒。"}),`
`,n.jsx(e.h2,{children:"实验测试"}),`
`,n.jsx(e.p,{children:"我编写了一个研究用插件，在系统设置界面中记录每帧的时间信息。下面是截图说明："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Now"})," = 表示当前系统时间"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Changed at"})," = 表示设置时间之前的那一帧"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Measured after change"})," = 表示时间设定后立刻记录的一帧"]}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/3DS/3ds-helper-1.webp",alt:"截图1"})}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/3DS/3ds-helper-2.webp",alt:"截图2"})}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"测试结果："})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"第一张图中，毫秒值在设定时间之后没有重置，验证了前面的推测。"}),`
`,n.jsx(e.li,{children:"第二张图中，设置时间为 14:32 且带有 987 毫秒后，系统很快便显示为 14:32:01，说明这个问题具有可重复性。"}),`
`]}),`
`,n.jsx(e.h2,{children:"解决方法"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["我们的第四世代工具配备了“3DS Helper”功能！",n.jsx(e.a,{href:"/3ds-helper",children:"点击这里了解详情"}),"。"]}),`
`,n.jsxs(e.li,{children:["如果你拥有破解主机，使用 ",n.jsx(e.a,{href:"/3ds-alt-settings",children:"3DS Alt Settings 应用"})," 是更简单快捷的选择。"]}),`
`]}),`
`,n.jsx(e.p,{children:"虽然第五世代目前尚未推出专用工具，但 Alt Settings 同样适用于第五世代乱数。"}),`
`,n.jsx(e.h2,{children:"Credits"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Zaksabeast for researching this and writing the tools to fix it"}),`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function x(s={}){const{wrapper:e}={...h(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(l,{...s})}):l(s)}function t(s,e){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default,c as frontmatter};
