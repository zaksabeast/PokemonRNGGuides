import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-BhGva7Hs.js";var n=e(),r={title:`有电电池定点乱数`,description:`在红宝石和蓝宝石中轻松乱数完美异色传说宝可梦`,slug:`zh-emulator-rs-stationary`,translation:{enSlug:`emulator-rs-stationary`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`带 Lua 脚本的 mGBA 模拟器`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:`一个已经进行过 ID 乱数的存档（可选，但推荐用于乱数异色+好个体的组合）`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：本方法适用于红宝石/蓝宝石中由方式 1 生成的宝可梦。如果你目标是特定异色个体组合，可能需要先进行 ID/SID 乱数。
`})}),`
`,(0,n.jsx)(r.h2,{children:`第一步：设置 PokeFinder`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 PokeFinder，选择 “第三世代 定点乱数”，进入 “检索器” 标签页。`}),`
`,(0,n.jsx)(r.li,{children:`输入你想要的个体组合并进行搜索。`}),`
`,(0,n.jsx)(r.li,{children:`如果没有结果，尝试放宽筛选条件直到有结果为止。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：获取初始种子`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`右键点击选中的种子，选择“为seed生成时间”。`}),`
`,(0,n.jsxs)(r.li,{children:[`种子会显示在 “Gen3 Seed到时间” 中。将年份设置为 2000，其他年份无法使用。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`这会告诉你初始种子及对应的时间与日期。`}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`切换到 “生成器” 标签页，输入刚才得到的初始种子。`}),`
`,(0,n.jsx)(r.li,{children:`设置搜索方式为“方式 1”，然后点击 “生成”。`}),`
`,(0,n.jsx)(r.li,{children:`找到对应的帧数，和“Gen3 Seed到时间” 中的帧数一致。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第三步：命中目标种子与帧数`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`在 mGBA 中，依次点击 `,(0,n.jsx)(r.code,{children:`工具 -> 覆写游戏`}),`，启用“实时时钟”。`]}),`
`,(0,n.jsxs)(r.li,{children:[`然后进入 `,(0,n.jsx)(r.code,{children:`工具 -> 游戏卡带传感器`}),`，选择“开始时间”，并输入目标时间与日期。`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：不同于第四、第五世代，这里只需要精确到小时和分钟即可命中初始种子。
`})}),`
`,(0,n.jsx)(r.h2,{children:`第四步：确认延迟`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`启动游戏，并推进到接近目标宝可梦战斗前的最后一个画面。途中建议多次即时存档。`}),`
`,(0,n.jsx)(r.li,{children:`到达目标帧数时按下 A 键进入战斗。`}),`
`,(0,n.jsx)(r.li,{children:`捕捉宝可梦后检查它的个体值。`}),`
`,(0,n.jsx)(r.li,{children:`在 PokeFinder 中输入个体值，搜索命中的帧数。`}),`
`,(0,n.jsxs)(r.li,{children:[`计算延迟： `,(0,n.jsx)(r.code,{children:`延迟 = 目标帧数 - 实际命中帧数`})]}),`
`,(0,n.jsx)(r.li,{children:`在 PokeFinder 中输入此延迟并重新生成结果。`}),`
`,(0,n.jsx)(r.li,{children:`找到你的目标组合并记录新的帧数。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第五步：获取目标宝可梦`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`使用更新后的帧数重新尝试整个流程。`}),`
`,(0,n.jsx)(r.li,{children:`如果操作正确，你就能成功命中目标个体。`}),`
`,(0,n.jsx)(r.li,{children:`如果没命中，查看偏差了多少帧，回到存档点重新调整推进帧数再次尝试。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Ruby-Sapphire/Stationary/Success.png`,alt:`成功！`})}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};