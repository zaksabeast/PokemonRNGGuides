import{u as s,j as e}from"./index-CIHdflGl.js";const h=[{title:"FireRed and LeafGreen Static RNG",navDrawerTitle:"Static RNG",description:"Learn how to RNG shiny 6IV legendaries in Pokémon FireRed and LeafGreen using static encounters.",slug:"emulator-flrg-stationary-and-gift",category:"FireRed and LeafGreen",tag:"emu"},{title:"固定宝可梦乱数",description:"在《火红·叶绿》中获取闪光六项个体值的传说宝可梦",slug:"zh-emulator-flrg-stationary-and-gift",category:"FireRed and LeafGreen",tag:"emu",translation:{enSlug:"emulator-flrg-stationary-and-gift",language:"zh"}}];function r(i){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",ul:"ul",...s(),...i.components},{ShowIf:l}=n;return l||t("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsxs(l,{slug:"/emulator-flrg-stationary-and-gift",children:[e.jsx(n.h2,{children:"Tools"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`]}),e.jsx(n.h2,{children:"Step 1: Set up PokeFinder"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load the game with the lua script."}),`
`,e.jsx(n.li,{children:'Go to the "Continue" screen and pause the emulator.'}),`
`,e.jsx(n.li,{children:"Find your initial seed displayed in the lua script."}),`
`,e.jsx(n.li,{children:"Open PokeFinder > Gen 3 Static > Generator tab."}),`
`,e.jsx(n.li,{children:'Input the seed into the "Seed" box.'}),`
`,e.jsxs(n.li,{children:['Set your target filters (shiny, IVs, nature, etc.) and click "Generate."',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Method should be "Method 1."'}),`
`,e.jsx(n.li,{children:"If no results, adjust filters or reset for a new seed."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Choose a target advance from the results."}),`
`]}),e.jsx(n.h2,{children:"Step 2: Find the Delay"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Your player should be in front of the right legendary, NPC, or Pokéball."}),`
`,e.jsx(n.li,{children:"Make a save state to avoid mistakes."}),`
`,e.jsxs(n.li,{children:["Advance to the final screen before the Pokémon is generated.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If there's a cry or dialog, that's usually the final screen."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["At your target advance, press ",e.jsx(n.code,{children:"A"})," to start the encounter or receive the Pokémon."]}),`
`,e.jsx(n.li,{children:"Check the IVs of the Pokémon."}),`
`,e.jsx(n.li,{children:"In PokeFinder, input the IVs and find the advance you hit."}),`
`,e.jsxs(n.li,{children:["Calculate the delay: ",e.jsx(n.code,{children:"Delay = Target Advance - Advance Hit"})]}),`
`,e.jsx(n.li,{children:"Enter the delay in PokeFinder and generate again."}),`
`,e.jsx(n.li,{children:"Note the new advance number."}),`
`]}),e.jsx(n.h2,{children:"Step 3: Get the Desired Pokémon"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Retry using the new advance adjusted for the delay."}),`
`,e.jsx(n.li,{children:"If successful, you'll hit the correct spread."}),`
`,e.jsx(n.li,{children:"If not, check how many advances you were off, reload, adjust, and try again."}),`
`]}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(l,{slug:"/zh-emulator-flrg-stationary-and-gift",children:[e.jsx(n.h2,{children:"所需工具"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"带有 Lua 脚本的 mGBA 模拟器"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`]}),e.jsx(n.h2,{children:"第一步：设置 PokeFinder"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"加载游戏并启用 Lua 脚本。"}),`
`,e.jsx(n.li,{children:"在游戏进入“继续”画面时暂停模拟器。"}),`
`,e.jsx(n.li,{children:"查看 Lua 脚本中显示的初始种子。"}),`
`,e.jsx(n.li,{children:"打开 PokeFinder，进入“第三世代 定点乱数”下的“生成”标签页。"}),`
`,e.jsx(n.li,{children:"将种子填写到“Seed”输入框中。"}),`
`,e.jsxs(n.li,{children:["设置目标筛选条件（如闪光、个体值、性格等），然后点击“生成”。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"方式 应设为“方式 1”。"}),`
`,e.jsx(n.li,{children:"如果没有结果，请放宽筛选条件或重启游戏以获取新种子。"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"从生成的结果中选择一个目标帧数。"}),`
`]}),e.jsx(n.h2,{children:"第二步：计算延迟"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"角色应站在传说宝可梦、NPC 或宝可梦球前。"}),`
`,e.jsx(n.li,{children:"建立一个即时存档以防出错。"}),`
`,e.jsxs(n.li,{children:["推进至宝可梦生成前的最后画面。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"若出现叫声或对话提示，一般表示已到达最后画面。"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"在目标帧数时按下 A 键开始战斗或领取宝可梦。"}),`
`,e.jsx(n.li,{children:"检查该宝可梦的个体值。"}),`
`,e.jsx(n.li,{children:"将个体值输入 PokeFinder，查找你实际命中的帧数。"}),`
`,e.jsx(n.li,{children:"计算延迟：延迟 = 目标帧数 - 实际命中帧数"}),`
`,e.jsx(n.li,{children:"将该延迟输入回 PokeFinder 中，并重新生成目标列表。"}),`
`,e.jsx(n.li,{children:"记录新的目标帧数。"}),`
`]}),e.jsx(n.h2,{children:"第三步：获取目标宝可梦"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"根据新的目标帧数重新进行尝试。"}),`
`,e.jsx(n.li,{children:"若成功，你将命中正确的个体组合。"}),`
`,e.jsx(n.li,{children:"若仍不匹配，确认偏差帧数，加载存档并调整后再次尝试。"}),`
`]}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function a(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}function t(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,h as frontmatter};
