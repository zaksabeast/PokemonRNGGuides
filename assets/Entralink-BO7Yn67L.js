import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-DzYB2I0T.js";var n=e(),r=[{title:`连入之森乱数`,description:`如何使用连入乱数获取心仪的宝可梦`,slug:`zh-emulator-bw-entralink`,translation:{enSlug:`emulator-bw-entralink`,language:`zh`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume 模拟器配置教程`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Bambo-Rambo/RNGReporter`,children:`RNG Reporter`})}),`
`,(0,n.jsx)(r.li,{children:`一份已解锁 C-Gear 且完成校准的存档`}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://projectpokemon.org/home/forums/topic/37801-gen-5-generation-5-save-tool-entralink-medals-join-avenue-and-others-not-in-pokegen/`,children:`Suloku 的第五世代存档工具（可选）`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：注入乱数目标（可选）`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 Suloku 的第五世代存档工具。`}),`
`,(0,n.jsx)(r.li,{children:`添加你想要乱数的宝可梦。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：寻找目标帧 / 种子 / 个体值`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 RNG Reporter，进入第五世代的 Time Finder 页面。`}),`
`,(0,n.jsx)(r.li,{children:`设置如下图：`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Entralink/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsxs)(r.ol,{start:`3`,children:[`
`,(0,n.jsx)(r.li,{children:`根据需要调整延迟和帧数范围。`}),`
`,(0,n.jsx)(r.li,{children:`最小帧数设为 21，因为低于 21 是无法命中的。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第三步：确认你需要命中的延迟`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`所列的种子可能会比普通的第五世代种子短得多。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`你仍需命中完整的初始种子（32 位的那种）。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`右键目标组合，选择「Generate Entralink Nature Seeds」。`}),`
`,(0,n.jsx)(r.li,{children:`选择你想要的性格列表。`}),`
`,(0,n.jsx)(r.li,{children:`点击「Generate」。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第四步：命中 C-Gear 种子与初始种子`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`当画面出现「[玩家] 传送到了连入！」的文本时，建立一个即时存档，并暂停游戏，记录下此时的延迟。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`稍后你会知道，从按下 A 到 C-Gear 种子生成之间经历了多少延迟。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`按下 A，Lua 脚本会显示你命中的 C-Gear 种子。`}),`
`,(0,n.jsx)(r.li,{children:`回到 RNG Reporter，进入 Generation 5 Tools > Seed To Time。`}),`
`,(0,n.jsx)(r.li,{children:`输入你命中的 C-Gear 种子。`}),`
`,(0,n.jsx)(r.li,{children:`用按下 A 的时刻延迟减去 C-Gear 种子生成的时刻延迟。`}),`
`,(0,n.jsx)(r.li,{children:`用目标延迟减去上述差值。例如：如果目标延迟是 4288，而差值是 200，那你需要命中的是延迟 4088。`}),`
`,(0,n.jsx)(r.li,{children:`重新命中初始种子，并开始推进延迟（Delay Advances）。每按一次 N 会推进 1 个延迟。`}),`
`,(0,n.jsx)(r.li,{children:`若失败，重复尝试。由于暂停与按键之间有细微差距，可能需要多试几次。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第五步：推进帧数`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`关注 IVRNG 帧（用于决定个体值的帧）。`}),`
`,(0,n.jsx)(r.li,{children:`从目标帧中减去 13，这是你实际要推进到的帧数。`}),`
`,(0,n.jsx)(r.li,{children:`通过四处走动推进帧数。确保队伍中只有一只宝可梦，以避免推进太多。`}),`
`,(0,n.jsx)(r.li,{children:`当推进到目标 IV 帧数时，立刻与目标宝可梦互动。建立一个即时存档并进入战斗。`}),`
`,(0,n.jsx)(r.li,{children:`若操作正确，你将获得目标个体值的宝可梦。`}),`
`,(0,n.jsx)(r.li,{children:`如果还想指定性格，请继续第六步，或回档重新捕捉。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`确保每次命中的 PIDRNG 帧数不同，否则性格不会改变。
`})}),`
`,(0,n.jsx)(r.h2,{children:`第六步：获取目标性格`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`回到 RNG Reporter，进入 Entralink Seed Search，记下目标性格对应的 PIDRNG 帧数。`}),`
`,(0,n.jsx)(r.li,{children:`回档到上一步建立的即时存档，并等待推进至该帧数前 6 帧的位置。`}),`
`,(0,n.jsx)(r.li,{children:`进入战斗并捕捉宝可梦。`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意性别比例设置是否正确！
`})}),`
`,(0,n.jsx)(r.h3,{children:`恭喜！`}),`
`,(0,n.jsx)(r.p,{children:`你已经完成了一次连入的乱数操作！`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};