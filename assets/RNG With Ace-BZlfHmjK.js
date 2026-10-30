import{t as e}from"./jsx-runtime-Bl9_0yti.js";import{S as t}from"./index-9x-tX0ur.js";var n=e(),r={title:`绿宝石 ACE 乱数指南`,navDrawerTitle:`ACE 乱数`,description:`学习利用 ACE 设置种子、搜索目标、校准推进数并获得理想宝可梦。`,slug:`zh-emerald-rng-with-ace`,translation:{enSlug:`emerald-rng-with-ace`,language:`zh`}};function i(e){let r={a:`a`,blockquote:`blockquote`,br:`br`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Admiral-Fish/PokeFinder/releases`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://e-sh4rk.github.io/ACE3/emerald/getting-started/introduction/`,children:`可稳定执行 ACE 的宝可梦`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mystic-timer`,children:`Mystic Timer`})}),`
`,(0,n.jsx)(r.li,{children:`会甜甜香气的宝可梦（仅野生乱数需要）`}),`
`,(0,n.jsx)(r.li,{children:`队伍中至少一个空位（可选，推荐保留以加快校准）`}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`IMPORTANT`,children:[`
`,(0,n.jsxs)(r.p,{children:[`本指南需要你具备第三世代乱数的基础知识。`,(0,n.jsx)(r.br,{}),`
`,`虽然使用了 ACE，但通过此方法获得的宝可梦仍符合合法生成条件。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：准备种子与代码`}),`
`,(0,n.jsx)(r.p,{children:`先选择目标，再生成用于修改初始种子的 ACE 代码。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`打开 `,(0,n.jsx)(r.code,{children:`PokeFinder → Gen 3 → Wild/Static`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`进入“Researcher”标签页，筛选目标宝可梦。野生乱数选择“Wild 2”。暂时不要关闭 PokeFinder。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/SearchingTarget.webp`,alt:`在 PokeFinder 中搜索目标`})}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`复制目标对应的种子。`}),`
`,(0,n.jsxs)(r.li,{children:[`使用 `,(0,n.jsx)(r.a,{href:`https://e-sh4rk.github.io/CodeGenerator/scripts/seed/index.html`,children:`E-Sh4rk 的种子脚本`}),`，计算代码需要使用的种子。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/1stScript.webp`,alt:`第一个脚本`})}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`粘贴种子，在开头加上 `,(0,n.jsx)(r.code,{children:`0x`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`将 category 设为 `,(0,n.jsx)(r.code,{children:`5`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`将范围设为 `,(0,n.jsx)(r.code,{children:`-900 -900`}),`，约为 15 秒。`]}),`
`,(0,n.jsx)(r.li,{children:`复制输出的种子。`}),`
`,(0,n.jsxs)(r.li,{children:[`使用 `,(0,n.jsx)(r.a,{href:`https://e-sh4rk.github.io/CodeGenerator/index.html`,children:`E-Sh4rk 的 ACE 代码生成器`}),`生成代码。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/2ndScript.webp`,alt:`ACE 代码生成器`})}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`在“RNG and PID Manipulation”中选择“Change PRNG Seed”。`}),`
`,(0,n.jsxs)(r.li,{children:[`粘贴种子，保留 `,(0,n.jsx)(r.code,{children:`0x`}),`，然后点击“Compute”。`]}),`
`,(0,n.jsx)(r.li,{children:`将所有代码输入游戏。`}),`
`,(0,n.jsx)(r.li,{children:`保存游戏，执行代码，确认可以正常运行。`}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`WARNING`,children:[`
`,(0,n.jsx)(r.p,{children:`如果游戏崩溃或卡死，请检查代码，确保第 12、13、14 号盒子，以及第 11 号盒子的最后一行中没有宝可梦或残留数据。重复尝试，直到出现宝可梦图鉴完成奖状。`}),`
`,(0,n.jsx)(`br`,{}),`
`,(0,n.jsx)(r.p,{children:`如果遇到问题，可以在第 11、12、13、14 号盒子按下图方式清除残留数据。`}),`
`,(0,n.jsx)(`br`,{}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/RemoveGhostData.webp`,alt:`清除残留数据`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：进行宝可梦乱数`}),`
`,(0,n.jsx)(r.p,{children:`设置新初始种子后，开始乱数操作。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在捕捉目标所需的位置保存游戏。`}),`
`,(0,n.jsx)(r.li,{children:`打开 Mystic Timer，选择第三世代。`}),`
`,(0,n.jsxs)(r.li,{children:[`将计时器设为 `,(0,n.jsx)(r.code,{children:`Target Advance = 900`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`启动计时器，同时打开用于执行 ACE 的宝可梦信息界面。`}),`
`,(0,n.jsx)(r.li,{children:`之后按普通乱数流程操作。`}),`
`]}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsx)(r.tr,{children:(0,n.jsx)(r.th,{children:`Mystic Timer 设置`})})}),(0,n.jsx)(r.tbody,{children:(0,n.jsx)(r.tr,{children:(0,n.jsx)(r.td,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/TimerConfig.webp`,alt:`Mystic Timer 与 ACE`})})})})]}),`
`,(0,n.jsx)(r.h2,{children:`第三步：校准`}),`
`,(0,n.jsx)(r.p,{children:`由于直接修改了种子，校准方式与普通乱数不同。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`根据捕捉地点设置参数。野生乱数选择“Wild 2”。`}),`
`,(0,n.jsxs)(r.li,{children:[`在“Generator”标签页，将代码生成器中使用的 Current Seed 粘贴到 `,(0,n.jsx)(r.code,{children:`Initial Advance`}),` 栏，再点击生成。`]}),`
`,(0,n.jsx)(r.li,{children:`筛选并找到实际获得的宝可梦。`}),`
`,(0,n.jsx)(r.li,{children:`使用 PokeFinder 输出的数值进行校准。`}),`
`,(0,n.jsx)(r.li,{children:`重复操作，直到获得目标宝可梦。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`疑难解答`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`即使其他条件正确，个体值也可能不一致。ACE 可能改变音频或画面，进而影响野生生成过程中的周期计数，使实际生成方式不再是 Wild 2。`}),`
`,(0,n.jsx)(r.li,{children:`个体值不符时，只能重新尝试。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Fiask：撰写指南及意大利语翻译。`}),`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};