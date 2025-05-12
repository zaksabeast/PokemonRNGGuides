import{u as t,j as e}from"./index-BewOb-om.js";const o=[{title:"Black and White Entralink RNG",navDrawerTitle:"Entralink RNG",description:"Learn how to RNG Pokémon exclusive to the Entralink in Black and White, including event-only encounters like Arceus.",slug:"emulator-bw-entralink",category:"Black and White",tag:"emu"},{title:"连入之森乱数",description:"如何使用连入乱数获取心仪的宝可梦",slug:"zh-emulator-bw-entralink",category:"Black and White",tag:"emu",translation:{enSlug:"emulator-bw-entralink",language:"zh"}}];function l(i){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components},{ShowIf:r}=n;return r||s("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsxs(r,{slug:"/emulator-bw-entralink",children:[e.jsx(n.h2,{children:"Tools"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/RNGReporter/releases",children:"RNG Reporter"})}),`
`,e.jsx(n.li,{children:"A save with access to the C-Gear (and with the profile/calibration set up)"}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://projectpokemon.org/home/forums/topic/37801-gen-5-generation-5-save-tool-entralink-medals-join-avenue-and-others-not-in-pokegen/",children:"Suloku's Gen V Save Tool (optional)"})}),`
`]}),e.jsx(n.h2,{children:"Step 1: Inject an RNG Target (optional)"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open Suloku's Gen V Save Tool."}),`
`,e.jsx(n.li,{children:"Add the Pokémon you want to RNG."}),`
`]}),e.jsx(n.h2,{children:"Step 2: Finding a Frame/Target Seed/IVs"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open RNG Reporter and go to Generation 5 Time Finder."}),`
`,e.jsx(n.li,{children:"Set up Time Finder like this."}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Entralink/Setup.png",alt:"Setup"})}),e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"Change Delay/Frame as needed."}),`
`,e.jsx(n.li,{children:"Set minimum frame to at least 21. You cannot hit anything lower."}),`
`]}),e.jsx(n.h2,{children:"Step 3: Finding the Delay you need to hit"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["The seed listed may be significantly shorter than normal Generation 5 seeds.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You still need to hit the Initial Seed (the 32-digit one)."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Right-click your selected spread and hit ",e.jsx(n.code,{children:"Generate Entralink Nature Seeds"}),"."]}),`
`,e.jsx(n.li,{children:"Choose a list of desired natures."}),`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"Generate"}),"."]}),`
`]}),e.jsx(n.h2,{children:"Step 4: Hitting C-Gear Seed and Initial Seed"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Go to the text where it says ",e.jsx(n.code,{children:"[Player] warped to the Entralink!"})," and make a save state. Pause the game and note the delay.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You will find out how long it takes for the C-Gear Seed to generate after pressing ",e.jsx(n.code,{children:"A"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"}),", and the Lua will tell you the C-Gear Seed you hit."]}),`
`,e.jsx(n.li,{children:"Go back to RNG Reporter and go to Generation 5 Tools > Seed To Time."}),`
`,e.jsx(n.li,{children:"Type in the C-Gear Seed you got."}),`
`,e.jsxs(n.li,{children:["Subtract the delay where you pressed ",e.jsx(n.code,{children:"A"})," from the delay when the C-Gear Seed was generated."]}),`
`,e.jsx(n.li,{children:"Subtract the result from your target delay. For example, if my target delay was 4288 and the difference was 200, I would hit delay 4088."}),`
`,e.jsxs(n.li,{children:["Hit your Initial Seed again and do delay advances. Press ",e.jsx(n.code,{children:"N"})," to add 1 to the delay to inch closer."]}),`
`,e.jsxs(n.li,{children:["If you fail, just try again. There may be a small gap between when you unpause the emulator and press ",e.jsx(n.code,{children:"A"}),"."]}),`
`]}),e.jsx(n.h2,{children:"Step 5: Advancing frames"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Pay attention to the ",e.jsx(n.strong,{children:"IVRNG Frame"}),"."]}),`
`,e.jsxs(n.li,{children:["Subtract ",e.jsx(n.strong,{children:"13"})," from your target frame. You will advance frames until you hit that."]}),`
`,e.jsx(n.li,{children:"Advance frames by walking around. Only have 1 Pokémon in your party to avoid advancing too many frames at once."}),`
`,e.jsx(n.li,{children:"When you hit your IVRNG Frame, interact with your target Pokémon immediately. Make a save state and enter the battle."}),`
`,e.jsx(n.li,{children:"If done correctly, you will get the correct IVs on your target. Yay!"}),`
`,e.jsx(n.li,{children:"To get your Nature, move to Step 6 or reload the save state and re-catch the Pokémon."}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Make sure to hit a different PIDRNG Frame each time, or you will get the same nature.
`})}),e.jsx(n.h2,{children:"Step 6: Getting a good Nature"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Go back to RNG Reporter and go to Entralink Seed Search. Note the Frame: that is the PIDRNG Frame you need to hit."}),`
`,e.jsx(n.li,{children:"Go back to your save state and wait until you are 6 frames before the frame listed in RNG Reporter."}),`
`,e.jsx(n.li,{children:"Enter the battle again and catch the Pokémon."}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Make sure to have the correct Gender ratio set up!
`})}),e.jsx(n.h3,{children:"Congrats!"}),e.jsx(n.p,{children:"You have just completed your Entralink RNG!"}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(r,{slug:"/zh-emulator-bw-entralink",children:[e.jsx(n.h2,{children:"所需工具"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume 模拟器配置指南"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Bambo-Rambo/RNGReporter",children:"RNG Reporter"})}),`
`,e.jsx(n.li,{children:"一份已解锁 C-Gear 且完成校准的存档"}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://projectpokemon.org/home/forums/topic/37801-gen-5-generation-5-save-tool-entralink-medals-join-avenue-and-others-not-in-pokegen/",children:"Suloku 的第五世代存档工具（可选）"})}),`
`]}),e.jsx(n.h2,{children:"第一步：注入乱数目标（可选）"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"打开 Suloku 的第五世代存档工具。"}),`
`,e.jsx(n.li,{children:"添加你想要乱数的宝可梦。"}),`
`]}),e.jsx(n.h2,{children:"第二步：寻找目标帧 / 种子 / 个体值"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"打开 RNG Reporter，进入第五世代的 Time Finder 页面。"}),`
`,e.jsx(n.li,{children:"设置如下图："}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Entralink/Setup.png",alt:"Setup"})}),e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"根据需要调整延迟和帧数范围。"}),`
`,e.jsx(n.li,{children:"最小帧数设为 21，因为低于 21 是无法命中的。"}),`
`]}),e.jsx(n.h2,{children:"第三步：确认你需要命中的延迟"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["所列的种子可能会比普通的第五世代种子短得多。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"你仍需命中完整的初始种子（32 位的那种）。"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"右键目标组合，选择「Generate Entralink Nature Seeds」。"}),`
`,e.jsx(n.li,{children:"选择你想要的性格列表。"}),`
`,e.jsx(n.li,{children:"点击「Generate」。"}),`
`]}),e.jsx(n.h2,{children:"第四步：命中 C-Gear 种子与初始种子"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["当画面出现「[玩家] 传送到了连入！」的文本时，建立一个即时存档，并暂停游戏，记录下此时的延迟。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"稍后你会知道，从按下 A 到 C-Gear 种子生成之间经历了多少延迟。"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"按下 A，Lua 脚本会显示你命中的 C-Gear 种子。"}),`
`,e.jsx(n.li,{children:"回到 RNG Reporter，进入 Generation 5 Tools > Seed To Time。"}),`
`,e.jsx(n.li,{children:"输入你命中的 C-Gear 种子。"}),`
`,e.jsx(n.li,{children:"用按下 A 的时刻延迟减去 C-Gear 种子生成的时刻延迟。"}),`
`,e.jsx(n.li,{children:"用目标延迟减去上述差值。例如：如果目标延迟是 4288，而差值是 200，那你需要命中的是延迟 4088。"}),`
`,e.jsx(n.li,{children:"重新命中初始种子，并开始推进延迟（Delay Advances）。每按一次 N 会推进 1 个延迟。"}),`
`,e.jsx(n.li,{children:"若失败，重复尝试。由于暂停与按键之间有细微差距，可能需要多试几次。"}),`
`]}),e.jsx(n.h2,{children:"第五步：推进帧数"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"关注 IVRNG 帧（用于决定个体值的帧）。"}),`
`,e.jsx(n.li,{children:"从目标帧中减去 13，这是你实际要推进到的帧数。"}),`
`,e.jsx(n.li,{children:"通过四处走动推进帧数。确保队伍中只有一只宝可梦，以避免推进太多。"}),`
`,e.jsx(n.li,{children:"当推进到目标 IV 帧数时，立刻与目标宝可梦互动。建立一个即时存档并进入战斗。"}),`
`,e.jsx(n.li,{children:"若操作正确，你将获得目标个体值的宝可梦。"}),`
`,e.jsx(n.li,{children:"如果还想指定性格，请继续第六步，或回档重新捕捉。"}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`确保每次命中的 PIDRNG 帧数不同，否则性格不会改变。
`})}),e.jsx(n.h2,{children:"第六步：获取目标性格"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"回到 RNG Reporter，进入 Entralink Seed Search，记下目标性格对应的 PIDRNG 帧数。"}),`
`,e.jsx(n.li,{children:"回档到上一步建立的即时存档，并等待推进至该帧数前 6 帧的位置。"}),`
`,e.jsx(n.li,{children:"进入战斗并捕捉宝可梦。"}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`注意性别比例设置是否正确！
`})}),e.jsx(n.h3,{children:"恭喜！"}),e.jsx(n.p,{children:"你已经完成了一次连入的乱数操作！"}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function h(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}function s(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,o as frontmatter};
