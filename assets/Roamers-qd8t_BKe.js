import{u as a,j as e}from"./index-UwOjJzzj.js";const o=[{title:"Black and White Roamer RNG",navDrawerTitle:"Roamer RNG",description:"Learn how to RNG Tornadus and Thundurus in Black and White for shiny and high-IV results.",slug:"emulator-bw-roamers",category:"Black and White",tag:"emu"},{title:"第五世代游走宝可梦乱数",description:"在模拟器中对第五世代的游走宝可梦进行乱数",slug:"zh-emulator-bw-roamers",category:"Black and White",tag:"emu",translation:{enSlug:"emulator-bw-roamers",language:"zh"}}];function i(r){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...a(),...r.components},{ShowIf:s}=n;return s||l("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsxs(s,{slug:"/emulator-bw-roamers",children:[e.jsx(n.h2,{children:"Tools"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/RNGReporter/releases",children:"RNG Reporter"})}),`
`]}),e.jsx(n.h2,{children:"Step 1: Finding a spread"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"In RNG Reporter, set the Month to 2 and 11."}),`
`,e.jsx(n.li,{children:"Set the Encounter Type to Roaming Pokémon and Method as IVs (Standard Seed)."}),`
`,e.jsx(n.li,{children:"Choose a nice IV Spread; do not worry about Shininess right now."}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Setup.png",alt:"Setup"})}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If you choose a different month, your Frames will be way more unstable/random and thus more luck-based.
`})}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: This should take a while.
`})}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Target.png",alt:"Target Seed"})}),e.jsx(n.h2,{children:"Step 2: Getting the target PID and Nature"}),e.jsx(n.p,{children:"Before we only searched for an IV spread because TID abuse is recommended for shiny roamers with good IVs."}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`If you only want IVs or Shininess and not both, feel free to skip this and the next step.
`})}),e.jsx(n.p,{children:"Choose a Frame (recommended: at least 1500 Frames, perhaps 2000 if using a month other than 2 or 11). Note the PID and the Frame."}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Pandora.png",alt:"Pandora's Box"})}),e.jsx(n.h2,{children:"Step 3: Save preparation"}),e.jsx(n.p,{children:"Similar to Generation 3 or 4 RNG abuse, it is recommended that you TID/SID abuse for a good shiny. Skip this step if you only care about IVs or only care about Shininess."}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Choose a TID/SID combo you like (or specify a TID/SID) and get your TID/SID."}),`
`,e.jsx(n.li,{children:"Hit your Initial Seed and advance frames."}),`
`,e.jsx(n.li,{children:"Note your TID/SID and get to the point you can release the roamer."}),`
`,e.jsx(n.li,{children:"Then save inside."}),`
`]}),e.jsx(n.p,{children:"This is where you should save (the house on Route 7):"}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Save.png",alt:"Where to save"})}),e.jsx(n.h2,{children:"Step 4: Calibration"}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Final-Screen.png",alt:"Final Screen"})}),e.jsx(n.p,{children:"On the RNG Reporter screen, you got a Frame Number, most likely between 1-6."}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Advance frames by walking around in the house."}),`
`,e.jsx(n.li,{children:"Make a Save State and walk outside. Get to the screen pictured above."}),`
`,e.jsx(n.li,{children:"Start advancing frames."}),`
`,e.jsxs(n.li,{children:["Once you're at the target frame, press ",e.jsx(n.code,{children:"A"}),"."]}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: It will most likely not have hit your Frame. You can check your Pokédex to see if you succeeded. (Assuming you are aiming for a shiny)
`})}),e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"Run into the roamer and note the PID. You can use a Lua Script to see the PID or catch it and use PkHeX to view the stats."}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Calibration.png",alt:"Calibration"})}),e.jsx(n.h2,{children:"Step 5: Getting the target"}),e.jsx(n.p,{children:"At this point, you should have found the PID you hit."}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go back to RNG Reporter."}),`
`,e.jsx(n.li,{children:"On the main screen, enter your Seed and ensure it searches Generation 5 PIDRNG abuse."}),`
`,e.jsx(n.li,{children:"Hit Search and look for your PID."}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:"Note: Exporting the results to .txt makes this easier, so you can use `Ctrl` + `F` to find the PID.\n"})}),e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["Find out how many frames advanced after hitting ",e.jsx(n.code,{children:"A"}),", and subtract that from your target. This is your new target frame."]}),`
`,e.jsx(n.li,{children:"Try to hit this new target frame. If you do not hit your Pokémon,"}),`
`,e.jsx(n.li,{children:"Repeat these steps once more."}),`
`,e.jsx(n.li,{children:"You may need to repeat this multiple times, but you will succeed eventually."}),`
`,e.jsxs(n.li,{children:["Keep track of what Frames you have hit and what Frame you pressed ",e.jsx(n.code,{children:"A"})," on before in Notepad or Google Docs."]}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Success.png",alt:"Success"})}),e.jsx(n.h2,{children:"Celebrate!"}),e.jsx(n.p,{children:"Catch your roamer with a Master Ball or use a Mean Look/Arena Trap/Shadow Tag Trapper. Then share your success with your friends or the Pokemon RNG Discord's bragging channel."}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(s,{slug:"/zh-emulator-bw-roamers",children:[e.jsx(n.h2,{children:"所需工具"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.pokemonrng.com/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Bambo-Rambo/RNGReporter",children:"RNG Reporter"})}),`
`]}),e.jsx(n.h2,{children:"第一步：寻找个体组合"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"在 RNG Reporter 中，将月份设置为 2 月或 11 月。"}),`
`,e.jsx(n.li,{children:"将遭遇类型设为「Roaming Pokémon」，方式选择「IVs (Standard Seed)」。"}),`
`,e.jsx(n.li,{children:"选择一个理想的个体值组合，此时暂时不用考虑异色。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Setup.png",alt:"Setup"})}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`注意：如果你选择其他月份，帧数会非常不稳定，完全靠运气。
`})}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`提示：生成目标组合可能会花上一段时间。
`})}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Target.png",alt:"目标种子"})}),e.jsx(n.h2,{children:"第二步：获取 PID 与性格"}),e.jsx(n.p,{children:"刚才我们只是筛选了个体值组合，因为建议先通过 TID/SID 乱数获取一个适合异色的 ID。"}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`如果你只想要高个体值或只想要异色，而不是两者兼得，可以跳过这一步和下一步。
`})}),e.jsx(n.p,{children:"选择一个帧数（建议至少 1500 帧，如果是 2 月或 11 月以外的月份则建议 2000 以上），并记录下目标 PID 与帧数。"}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Pandora.png",alt:"Pandora's Box"})}),e.jsx(n.h2,{children:"第三步：准备存档"}),e.jsx(n.p,{children:"和第三、第四世代一样，推荐使用 ID 乱数（TID/SID）先拿到一个适合的异色 ID。若只在意个体或异色可跳过此步骤。"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"选择你喜欢的 TID/SID 组合（或指定一个组合）并进行乱数。"}),`
`,e.jsx(n.li,{children:"命中初始种子后，推进帧数。"}),`
`,e.jsx(n.li,{children:"记下你获得的 TID/SID，推进到可以释放游走宝可梦的剧情处。"}),`
`,e.jsx(n.li,{children:"然后在屋内存档。"}),`
`]}),e.jsx(n.p,{children:"你应该在这里存档（7号道路的小屋）："}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Save.png",alt:"存档地点"})}),e.jsx(n.h2,{children:"第四步：校准"}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Final-Screen.png",alt:"判定界面"})}),e.jsx(n.p,{children:"RNG Reporter 中会提供一个帧数，通常是 1 到 6 之间："}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"在屋子里通过走动来推进个体帧数。"}),`
`,e.jsx(n.li,{children:"建立即时存档，然后走出屋外，到达如上图所示的画面。"}),`
`,e.jsx(n.li,{children:"开始推进性格帧数。"}),`
`,e.jsxs(n.li,{children:["到达目标帧数时按下 ",e.jsx(n.code,{children:"A"})," 键。"]}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`注意：第一次大概率不会命中目标帧数。你可以查看图鉴确认是否成功（前提是你在追求异色）。
`})}),e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"遇到游走宝可梦后，记录它的 PID。你可以使用 Lua 脚本查看，或直接捕捉后用 PkHeX 查看数据。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Calibration.png",alt:"校准"})}),e.jsx(n.h2,{children:"第五步：命中目标"}),e.jsx(n.p,{children:"此时你应该知道你命中了哪个 PID。"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"返回 RNG Reporter。"}),`
`,e.jsx(n.li,{children:"主界面输入你的种子，并确保是在 Generation 5 的 PIDRNG abuse 页面。"}),`
`,e.jsx(n.li,{children:"点击「Search」，寻找你的 PID。"}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:"提示：你也可以导出结果为 .txt 文档，然后用 `Ctrl + F` 查找 PID。\n"})}),e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["确定你从按下 ",e.jsx(n.code,{children:"A"})," 后实际推进了多少帧，将这个数值从原本的目标帧数中减去，得到新的目标帧。"]}),`
`,e.jsx(n.li,{children:"尝试命中这个新帧数。如果没命中："}),`
`,e.jsx(n.li,{children:"请重复上述步骤。"}),`
`,e.jsx(n.li,{children:"有可能需要多次尝试，但最终一定可以成功。"}),`
`,e.jsxs(n.li,{children:["推荐记录你尝试过的帧数以及你按下 ",e.jsx(n.code,{children:"A"})," 的实际帧数。"]}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Roamer/Success.png",alt:"成功！"})}),e.jsx(n.h2,{children:"恭喜！"}),e.jsx(n.p,{children:"使用大师球捕捉你的游走宝可梦，或使用锁定技能如黑色目光、踩影、影子标签等手段。然后在群里或朋友面前炫耀你的成果吧！"}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function h(r={}){const{wrapper:n}={...a(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}function l(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,o as frontmatter};
