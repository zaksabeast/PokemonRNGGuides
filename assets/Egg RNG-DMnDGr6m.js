import{u as l,j as e}from"./index-DTEc3jNK.js";const d=[{title:"FireRed and LeafGreen Egg RNG",navDrawerTitle:"Egg RNG",description:"Learn how to RNG eggs in Pokémon FireRed and LeafGreen for perfect IVs, natures, and shinies.",slug:"emulator-frlg-egg",category:"FireRed and LeafGreen",tag:"emu"},{title:"火红叶绿孵化乱数",navDrawerTitle:"Egg RNG",description:"在火红/叶绿中进行蛋的乱数",slug:"zh-emulator-frlg-egg",category:"FireRed and LeafGreen",tag:"emu",translation:{enSlug:"emulator-frlg-egg",language:"zh"}}];function s(i){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...l(),...i.components},{ShowIf:r}=n;return r||t("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsxs(r,{slug:"/emulator-frlg-egg",children:[e.jsx(n.h2,{children:"Tools"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:"Parent's IVs and compatibility (talk to the daycare man)"}),`
`,e.jsx(n.li,{children:"TID and SID (if going for shiny)"}),`
`]}),e.jsx(n.h2,{children:"Intro"}),e.jsx(n.p,{children:"The egg's PID in FRLG is generated in two parts. The first part is set when the egg is generated, and the second part is set when picking it up."}),e.jsx(n.h2,{children:"Setup"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Deposit both parents at the daycare. The order doesn't matter."}),`
`,e.jsxs(n.li,{children:["Stay inside and take steps until the Lua script displays ",e.jsx(n.code,{children:"FE"})," for the step counter. Do this inside the daycare."]}),`
`,e.jsx(n.li,{children:"Create a savestate before continuing."}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Setup.png",alt:"Setup"})}),e.jsx(n.h2,{children:"PokeFinder Setup"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open PokeFinder and go to Gen 3 Egg. Select the Fire Red/Leaf Green tab."}),`
`,e.jsx(n.li,{children:"Enter the parents' info, including compatibility."}),`
`,e.jsx(n.li,{children:"Set a frame range. The max for Frame Held must be lower than the min for Pickup Frame."}),`
`,e.jsx(n.li,{children:"Find your initial seed from the Lua script, enter it, and search for a spread."}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Initial-Seed.png",alt:"Initial Seed"})}),e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"You'll need to hit two different frames."}),`
`]}),e.jsx(n.h2,{children:"Held Frame RNG"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Take one step at the right frame to generate an egg. Use ",e.jsx(n.code,{children:"CTRL + N"})," to advance frames while paused. When on the target frame, hold a directional button and unpause.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"In PokeFinder, subtract 18 from the target frame and step on that frame."}),`
`,e.jsx(n.li,{children:"If no egg appears, double-check your inputs. If correct, try a delay of 17 or 19."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"After stepping, the Lua script will show the second half of the PID. If it matches, continue. If not, restart and try again."}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Held.png",alt:"Held Frame"})}),e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"Held Frame RNG is done. Now for Pickup Frame RNG."}),`
`]}),e.jsx(n.h2,{children:"Pickup Frame RNG"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Create a savestate to avoid missing the ",e.jsx(n.code,{children:"A"})," press."]}),`
`,e.jsx(n.li,{children:'Exit, talk to the old man, and accept the egg. Pause at the last dialogue ("Take good care of it.").'}),`
`,e.jsxs(n.li,{children:["Advance to the target frame, pause, hold ",e.jsx(n.code,{children:"A"}),", and unpause.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The Pickup Frame delay is 3. If incorrect, try 2 or 4."}),`
`]}),`
`]}),`
`]}),e.jsx(n.p,{children:"If successful, your egg's second PID half should match."}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Success.png",alt:"Success"})}),e.jsx(n.p,{children:"If it doesn't match, recheck your steps and use savestates."}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(r,{slug:"/zh-emulator-frlg-egg",children:[e.jsx(n.h2,{children:"所需工具"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"带有 Lua 脚本的 mGBA 模拟器"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,e.jsx(n.li,{children:"父母个体值与相性（向培育屋老爷爷询问）"}),`
`,e.jsx(n.li,{children:"表 ID 与里 ID（如需孵化闪光个体）"}),`
`]}),e.jsx(n.h2,{children:"简介"}),e.jsx(n.p,{children:"在火红/叶绿中，蛋的 PID 是分两步生成的：蛋生成时会决定 PID 的前半部分，而领取蛋时决定后半部分。"}),e.jsx(n.h2,{children:"准备阶段"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"将宝可梦交给培育屋。请确保父母都未携带道具，放入顺序没有影响。"}),`
`,e.jsx(n.li,{children:"待在培育屋内行走，直到 Lua 脚本显示步数计数为 1。必须在培育屋内部完成这一步。"}),`
`,e.jsx(n.li,{children:"达成条件后，在此处建立即时存档点。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Setup.png",alt:"Setup"})}),e.jsx(n.h2,{children:"设置 PokeFinder"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"打开 PokeFinder，选择第三世代孵化乱数，并确保切换到火红/叶绿的标签页。"}),`
`,e.jsx(n.li,{children:"输入双亲的所有信息，包括他们的相性。"}),`
`,e.jsx(n.li,{children:"帧数范围可以自由设定，但“生成帧”（Frame Held）上限必须低于“领取帧”（Pickup Frame）下限。"}),`
`,e.jsx(n.li,{children:"输入 Lua 脚本中显示的初始种子，开始查找个体组合。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Initial-Seed.png",alt:"初始种子"})}),e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"找到目标组合后，请注意需要命中两个不同的帧数。"}),`
`]}),e.jsx(n.h2,{children:"生成帧乱数"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["在 PokeFinder 中，从目标帧中减去 18，并在该帧数上走一步。在模拟器暂停状态下使用 CTRL + N 推进帧数。到达目标帧时，按住方向键并取消暂停。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"若未生成蛋，请检查输入是否有误；若确认无误，可尝试延迟为 17 或 19。"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"行走后，Lua 脚本会显示 PID 的后半部分。若与目标匹配，可继续进行；若不符，请反查延迟后并再次尝试。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Held.png",alt:"Held Frame"})}),e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"至此，生成帧的乱数已完成。接下来是领取帧的乱数。"}),`
`]}),e.jsx(n.h2,{children:"领取帧乱数"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"为防止错过按键时机，建议先建立一个即时存档点。"}),`
`,e.jsx(n.li,{children:"离开培育屋，与老爷爷对话并接受蛋。在出现最后一句对话（“请好好照顾它。”）时暂停模拟器。"}),`
`,e.jsxs(n.li,{children:["推进到目标帧数，按住 A 键并取消暂停。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"领取帧的标准延迟为 3。如果不匹配，可尝试延迟 2 或 4。"}),`
`]}),`
`]}),`
`]}),e.jsx(n.p,{children:"如果成功，蛋的后半 PID 就会与目标一致。"}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/FireRed-LeafGreen/Egg/Success.png",alt:"成功！"})}),e.jsx(n.p,{children:"若失败，请重新检查操作步骤，并合理利用即时存档进行调整与重试。"}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function c(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}function t(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,d as frontmatter};
