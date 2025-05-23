import{u as o,j as e}from"./index-DxkoOZyd.js";const a=[{title:"Reseed the RNG using paintings",navDrawerTitle:"Painting RNG",description:"Learn how to reseed the RNG using paintings in Pokémon Emerald to get the Pokémon you want quickly, without the long wait.",slug:"emerald-painting-rng",category:"Emerald",tag:"emu"},{title:"利用绘画重置种子",description:"利用绘画重置乱数，从而快速获得目标宝可梦，而无需长时间等待",slug:"zh-emerald-painting-rng",category:"Emerald",tag:"emu",translation:{enSlug:"emerald-painting-rng",language:"zh"}}];function l(i){const n={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...o(),...i.components},{PaintingReseed:t,ShowIf:r,YouTubeVideo:h}=n;return t||s("PaintingReseed"),r||s("ShowIf"),h||s("YouTubeVideo"),e.jsxs(e.Fragment,{children:[e.jsxs(r,{slug:"/emerald-painting-rng",children:[e.jsx(n.h2,{children:"Tools"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`]}),e.jsx(n.h2,{children:"Video guide"}),e.jsx(h,{src:"https://www.youtube.com/embed/ydS9HLNmAog?si=MHhvzKhd32Kgd4OC"}),e.jsx(n.h2,{children:"Intro"}),e.jsx(n.p,{children:"Reseeding the RNG by viewing paintings allows you to avoid waiting for higher advances. Normally, the RNG starts with a predetermined number and generates the same random numbers each time."}),e.jsx(n.p,{children:"By viewing a painting in the game, like the ones in Lilycove Contest Hall, the RNG is reseeded using the video frame counter."}),e.jsx(n.p,{children:"This method can be combined with battle videos to save the new RNG state after viewing the painting."}),e.jsx(n.p,{children:"You can also use this method for Ruby and Sapphire, whether live or for a dry battery."}),e.jsx(n.h2,{children:"Setup"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Find a target seed using PokeFinder."}),`
`,e.jsx(n.li,{children:'Right-click on the chosen seed in PokeFinder and select "Generate times for seed."'}),`
`]}),e.jsx(n.h2,{children:"Painting RNG"}),e.jsx(t,{}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Type your target seed in the tool above to find your Target Painting Timer."}),`
`,e.jsx(n.li,{children:"In the game, wait for the painting timer shown by the Lua script to equal the Target Painting Timer. View the party menu to prevent NPCs from affecting the RNG."}),`
`,e.jsx(n.li,{children:"View the painting at this number to reseed the RNG to the desired seed."}),`
`,e.jsx(n.li,{children:'Use the number of advances shown in "Seed to Time" of PokeFinder to finish the RNG as normal.'}),`
`]}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(r,{slug:"/zh-emerald-painting-rng",children:[e.jsx(n.h2,{children:"所需工具"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"支持 Lua 脚本的 mGBA"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`]}),e.jsx(n.h2,{children:"介绍"}),e.jsx(n.p,{children:"在游戏中查看特定画作（例如水静华丽大赛会场的画）会导致乱数重新种子化，其新种子值基于游戏的帧计数器。"}),e.jsx(n.p,{children:"利用画作重置乱数，可以有效避免高推进数带来的漫长等待。通常情况下，游戏具有固定的初始种子，每次游戏启动后都会按照相同的顺序生成随机数。而通过这个方法，可以人为改变乱数的初始状态。"}),e.jsx(n.p,{children:"此外，此方法还可以与对战录像配合使用，以在查看画作后保存新的乱数状态。"}),e.jsx(n.p,{children:"该方法同样适用于《红宝石》和《蓝宝石》，无论是实时操作还是用于电池耗尽的存档。"}),e.jsx(n.h2,{children:"事前准备"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"使用 PokeFinder 找到目标种子。"}),`
`,e.jsx(n.li,{children:'在 PokeFinder 中右键点击选定的种子，并选择 "为种子生成时间" 生成相应的计时信息。'}),`
`]}),e.jsx(n.h2,{children:"绘画乱数操作流程"}),e.jsx(t,{}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"在上方工具中输入你的目标种子，以获取目标画作计时器数值（Target Painting Timer）。"}),`
`,e.jsx(n.li,{children:"在游戏中，等待 Lua 脚本显示的画作计时器达到目标数值。建议打开队伍菜单以防止 NPC 干扰乱数。"}),`
`,e.jsx(n.li,{children:"在此数值时查看画作，即可将 RNG 重置为目标种子。"}),`
`,e.jsx(n.li,{children:'使用 PokeFinder 中 "Seed to Time" 计算出的推进数完成剩余的乱数操作，直至获得目标宝可梦。'}),`
`]}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function c(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}function s(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,a as frontmatter};
