import{u as t,j as e}from"./index-C0fKcU7c.js";const a=[{title:"Ruby and Sapphire Egg RNG",navDrawerTitle:"Egg RNG",description:"Learn how to RNG eggs from the Daycare in Ruby and Sapphire for shiny, high-IV Pokémon.",slug:"emulator-rs-egg",category:"Ruby and Sapphire",tag:"emu"},{title:"孵化乱数",description:"从培育屋乱数孵化宝可梦蛋",slug:"zh-emulator-rs-egg",category:"Ruby and Sapphire",tag:"emu",translation:{enSlug:"emulator-rs-egg",language:"zh"}}];function s(i){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...t(),...i.components},{ShowIf:r}=n;return r||l("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsxs(r,{slug:"/emulator-rs-egg",children:[e.jsx(n.h2,{children:"Tools"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:"Parent's IVs and their compatibility (ask the daycare man)"}),`
`,e.jsx(n.li,{children:"TID and SID (if going for shiny)"}),`
`]}),e.jsx(n.h2,{children:"Intro"}),e.jsx(n.p,{children:"The PID for the egg in Ruby/Sapphire is created in two parts. You'll RNG the first part when the egg is generated and the second part when picking up the egg."}),e.jsx(n.p,{children:"Egg RNG in Ruby/Sapphire can be done with both live and dead battery."}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: In Ruby and Sapphire, the Everstone does not work to pass down natures in breeding.
`})}),e.jsx(n.h2,{children:"Setup"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Deposit the Pokémon at the daycare. Make sure the parents aren't holding items. The order of deposit does not matter."}),`
`,e.jsxs(n.li,{children:["Stay in the daycare and take steps until the Lua script displays ",e.jsx(n.code,{children:"FE"})," for the step counter. Do this inside the daycare."]}),`
`,e.jsx(n.li,{children:"Create a savestate here before continuing."}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Egg/Setup.png",alt:"Setup"})}),e.jsx(n.h2,{children:"PokeFinder Setup"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder and select Gen 3 Egg. Make sure to be on the Ruby/Sapphire tab."}),`
`,e.jsx(n.li,{children:"Enter all the information for the parents, including their compatibility."}),`
`,e.jsx(n.li,{children:"Choose any min/max for the frame range, but the max Frame Held must be lower than the min Pickup Frame."}),`
`,e.jsxs(n.li,{children:["Enter your initial seed from the Lua script and find a spread. For a dead battery, the initial seed will be ",e.jsx(n.code,{children:"5A0"})," for Ruby/Sapphire."]}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Egg/Initial-Seed.png",alt:"Initial Seed"})}),e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"Once you have a target frame, note that you need to hit two different frames."}),`
`]}),e.jsx(n.h2,{children:"Held Frame RNG"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Take one step at the right frame to generate an egg. Use ",e.jsx(n.code,{children:"CTRL + N"})," to advance frames one by one while paused. Once on the target frame, hold the directional button and unpause the emulator. For PokeFinder, subtract 18 from the target frame and take the step on that frame. If no egg is generated, check your entries and try a delay of 17 or 19."]}),`
`,e.jsx(n.li,{children:"After the step, the second half of your PID should display on the screen with the script. If it matches, continue. If not, restart the emulator or try the next Frame Held."}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Egg/Held.png",alt:"Held Frame"})}),e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"You have finished the Held Frame RNG. Now, it's time for the Pickup Frame RNG."}),`
`]}),e.jsx(n.h2,{children:"Pickup Frame RNG"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Create a savestate in case you miss the chance to press ",e.jsx(n.code,{children:"A"}),"."]}),`
`,e.jsx(n.li,{children:'Go outside, talk to the old man and accept the egg. Pause the emulator at the last dialogue ("Take good care of it.").'}),`
`,e.jsxs(n.li,{children:["Advance to the target frame, pause, hold ",e.jsx(n.code,{children:"A"}),", and unpause. For the Pickup Frame, the delay will be 3. If the egg does not have the correct PID, try a delay of 2 or 4."]}),`
`]}),e.jsx(n.p,{children:"You should have the second part of the PID for your egg, resulting in a successful RNG."}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Egg/Success.png",alt:"Success"})}),e.jsx(n.p,{children:"If it doesn't match, recheck the whole process, and feel free to use savestates."}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(r,{slug:"/zh-emulator-rs-egg",children:[e.jsx(n.h2,{children:"所需工具"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"带有 Lua 脚本的 mGBA 模拟器"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:"父母个体值与相性（向培育屋老爷爷询问）"}),`
`,e.jsx(n.li,{children:"表 ID 与里 ID（如需孵化闪光个体）"}),`
`]}),e.jsx(n.h2,{children:"简介"}),e.jsx(n.p,{children:"在红宝石/蓝宝石中，蛋的PID是分为两部分生成的。蛋生成时会决定 PID 的前半部分，领取蛋时决定后半部分。"}),e.jsx(n.p,{children:"红宝石/蓝宝石的蛋乱数在实电池与干电池环境下都可以进行。"}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`注意：在红宝石与蓝宝石中，持有不变之石并不能遗传性格。
`})}),e.jsx(n.h2,{children:"准备阶段"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"将宝可梦交给培育屋。请确保父母都未携带道具，放入顺序没有影响。"}),`
`,e.jsx(n.li,{children:"待在培育屋内行走，直到 Lua 脚本显示步数计数为 FE。必须在培育屋内部完成这一步。"}),`
`,e.jsx(n.li,{children:"达成条件后，在此处建立即时存档点。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Egg/Setup.png",alt:"Setup"})}),e.jsx(n.h2,{children:"PokeFinder 设置"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"打开 PokeFinder，选择第 3 世代孵化乱数，并确保切换到红宝石/蓝宝石的标签页。"}),`
`,e.jsx(n.li,{children:"输入双亲的所有信息，包括他们的相性。"}),`
`,e.jsx(n.li,{children:"帧数范围可以自由设定，但“生成帧”（Frame Held）上限必须低于“领取帧”（Pickup Frame）下限。"}),`
`,e.jsx(n.li,{children:"输入 Lua 脚本中显示的初始种子，开始查找个体组合。如果是干电池，红宝石/蓝宝石的初始种子固定为 5A0。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Egg/Initial-Seed.png",alt:"Initial Seed"})}),e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"找到目标组合后，请注意需要命中两个不同的帧数。"}),`
`]}),e.jsx(n.h2,{children:"生成帧乱数"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"在正确的帧数上向前走一步以生成蛋。在模拟器暂停时可使用 CTRL + N 一帧一帧推进。当推进到目标帧数时，按住方向键并取消暂停。对于 PokeFinder，需要从目标帧数中减去 18，在这个帧数上行走一步。如果未生成蛋，请确认输入信息并尝试使用延迟 17 或 19。"}),`
`,e.jsx(n.li,{children:"行走后，脚本会显示 PID 的后半部分。如果匹配目标，就可以继续；若不匹配，请重启模拟器或尝试下一个生成帧。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Egg/Held.png",alt:"Held Frame"})}),e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"至此，生成帧的乱数已完成。接下来是领取帧的乱数。"}),`
`]}),e.jsx(n.h2,{children:"领取帧乱数"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"为防止错过按键时机，建议先建立一个即时存档点。"}),`
`,e.jsx(n.li,{children:"离开培育屋，与老爷爷对话并接受蛋。在出现最后一句对话（“请好好照顾它。”）时暂停模拟器。"}),`
`,e.jsx(n.li,{children:"推进到目标帧数，暂停，按住 A 键并取消暂停。领取帧的标准延迟为 3。如果蛋的 PID 不正确，可尝试延迟 2 或 4。"}),`
`]}),e.jsx(n.p,{children:"这样你就会获得目标 PID 的第二部分，从而完成整个蛋乱数。"}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Egg/Success.png",alt:"Success"})}),e.jsx(n.p,{children:"若结果不符，请重新检查整个流程，并善用即时存档点进行尝试。"}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function d(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}function l(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default,a as frontmatter};
