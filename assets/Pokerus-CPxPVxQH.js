import{x as o,j as e}from"./index-DS5oTPfz.js";const t=[{title:"绿宝石的宝可病毒",description:"如何感染宝可病毒",slug:"zh-emerald-pokerus-emu",translation:{enSlug:"emerald-pokerus-emu",language:"zh"}},{title:"红蓝宝石的宝可病毒",description:"如何感染宝可病毒",slug:"zh-rs-pokerus-emu",translation:{enSlug:"rs-pokerus-emu",language:"zh"}}];function d(s){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...o(),...s.components},{Gist:l,ShowIf:i,YouTubeVideo:c}=n;return l||r("Gist"),i||r("ShowIf"),c||r("YouTubeVideo"),e.jsxs(e.Fragment,{children:[e.jsx(l,{children:"要点：如何感染宝可病毒"}),`
`,e.jsx(n.h2,{children:"所需工具"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA"})}),`
`,e.jsxs(n.li,{children:["Download ",e.jsx(n.a,{href:"https://raw.githubusercontent.com/RainingChain/pk_emu_scripts/refs/heads/main/Gen3/pokerus.lua",children:"Pokérus lua script"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"关于宝可病毒"}),`
`,e.jsx(n.p,{children:"在每场野生战斗结束后，有 1 / 21845 的几率让你的宝可梦感染宝可病毒。感染后，战斗获得的努力值（EV）将加倍。宝可病毒在某些低等级最优化的宝可梦（例如带有龙之怒的 5 级图图犬）中是必要条件。"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Emerald/pokerus.png",alt:"感染宝可病毒的宝可梦"})}),`
`,e.jsx(n.h2,{children:"第一步：设置"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(i,{slug:"/zh-emerald-pokerus-emu",children:"打开 mGBA。"}),`
`,e.jsx(i,{slug:"/zh-rs-pokerus-emu",children:e.jsx(n.p,{children:"打开 mGBA。请确保关闭了“实时时钟”（路径为 Tools -> Game overrides...）。"})}),`
`]}),`
`,e.jsxs(n.li,{children:["启动游戏并加载 ",e.jsx(n.code,{children:"pokerus.lua"})," 脚本。"]}),`
`,e.jsxs(n.li,{children:["使用 ",e.jsx(n.code,{children:"Ctrl + R"})," 重启游戏。"]}),`
`]}),`
`,e.jsx(n.h2,{children:"第二步：校准"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"进入一场野生宝可梦战斗，将敌方宝可梦击倒。"}),`
`,e.jsx(n.li,{children:"当出现“XXX 获得了 YY 经验值。”的提示时，使用即时存档保存当前状态。"}),`
`,e.jsxs(n.li,{children:["使用 ",e.jsx(n.code,{children:"Ctrl + P"})," 暂停游戏。"]}),`
`,e.jsx(n.li,{children:"在脚本窗口中记下当前的乱数帧数。"}),`
`,e.jsxs(n.li,{children:["按住 ",e.jsx(n.code,{children:"A"}),"，同时在暂停状态下按 ",e.jsx(n.code,{children:"Ctrl + P"})," 取消暂停游戏。"]}),`
`,e.jsx(n.li,{children:"如果脚本窗口显示当前战斗无法生成宝可病毒，请结束战斗并返回校准的第一步。"}),`
`,e.jsx(n.li,{children:"否则，将第四步中记录的当前帧数与脚本窗口中显示的“Advance Difference”（帧差）相加，得出目标帧。"}),`
`]}),`
`,e.jsx(n.h2,{children:"第三步：命中目标"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["重新加载之前在战斗中的即时存档，使用 ",e.jsx(n.code,{children:"Ctrl + N"})," 单步推进帧数，直到当前帧数与上一步计算出的目标帧一致。"]}),`
`,e.jsxs(n.li,{children:["一旦对齐，按住 ",e.jsx(n.code,{children:"A"}),"，同时按 ",e.jsx(n.code,{children:"Ctrl + P"})," 取消暂停游戏。"]}),`
`,e.jsx(n.li,{children:"战斗结束后检查所有宝可梦的状态，确认是否有宝可梦感染了宝可病毒。"}),`
`]}),`
`,e.jsx(c,{src:"https://www.youtube.com/embed/ySpe6-4xCNc"}),`
`,e.jsx(n.h2,{children:"特别鸣谢"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"指南与脚本：RainingChain."}),`
`,e.jsx(n.li,{children:"脚本灵感来源：Real96."}),`
`,e.jsxs(n.li,{children:["反编译项目：",e.jsx(n.a,{href:"https://github.com/pret/pokeemerald",children:"pret 团队"}),"."]}),`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function x(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(d,{...s})}):d(s)}function r(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default,t as frontmatter};
