import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-BiAAUMAS.js";var n=e(),r=[{title:`第五世代AR搜寻器乱数`,description:`乱数获取等级5梦境球隐藏特性的传说宝可梦`,slug:`zh-emulator-b2w2-dream-radar`,translation:{enSlug:`emulator-b2w2-dream-radar`,language:`zh`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Admiral-Fish/RNGReporter/releases`,children:`RNG Reporter`})}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`https://github.com/suloku/BW_tool/releases`,children:`Suloku 的第五世代存档工具（可选）`}),`. 你也可以在通过AR搜寻器获得目标宝可梦后提取你的 BW2 存档，而不是注入。`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：RNG Reporter 中的 “Dream Radar” 标签页当前无法使用。本教程将介绍一种替代方法来查找种子以及所需的 IV/性格组合。
`})}),`
`,(0,n.jsx)(r.h2,{children:`第一步：查找目标个体`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 RNG Reporter，进入「Gen 5 Time Finder」，保持在「Capture」标签页并调整设置。`}),`
`,(0,n.jsx)(r.li,{children:`将 IV 设置为你的目标值，遭遇类型设为「Wild Pokémon」，方法选择「IVs (Standard Seed)」。`}),`
`,(0,n.jsx)(r.li,{children:`灵兽三神（龙卷云、雷电云、土地云）的最小 IV 帧为 21，其他宝可梦为 8。最大帧数可根据需求设定。`}),`
`,(0,n.jsx)(r.li,{children:`点击「Search」并等待结果出现。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black2-and-White2/Dream-Radar/Timefinder.png`,alt:`Timefinder`})}),`
`,(0,n.jsx)(r.p,{children:`对于第四世代的传说宝可梦或一般宝可梦，请选择偶数帧数的结果；对于灵兽形态宝可梦，请选择奇数帧数的结果。`}),`
`,(0,n.jsx)(r.h2,{children:`第二步：确定性格（可选）`}),`
`,(0,n.jsx)(r.p,{children:`要预测性格，请回到 RNG Reporter 主界面，选择「Gen 5 PIDRNG」。AR搜寻器的性格无法控制，只能预测。`}),`
`,(0,n.jsx)(r.p,{children:`以下是用于计算性格所命中的 PID 帧的公式：`}),`
`,(0,n.jsx)(r.h3,{children:`灵兽三神`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`(你的 IV 帧数 - 21) / 2 = 所需推进的次数`}),`
`,(0,n.jsx)(r.li,{children:`初始 PIDRNG 帧 + 7 + 推进次数 = 命中的 PID 帧`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`第四世代传说 + 有性别的宝可梦`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`(你的 IV 帧数 - 8) / 2 = 所需推进的次数`}),`
`,(0,n.jsx)(r.li,{children:`初始 PIDRNG 帧 + 2 + (2 × 推进次数) = 命中的 PID 帧`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`无性别宝可梦`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`(你的 IV 帧数 - 8) / 2 = 所需推进的次数`}),`
`,(0,n.jsx)(r.li,{children:`初始 PIDRNG 帧 + 1 + (2 × 推进次数) = 命中的 PID 帧`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第三步：进行乱数操作`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`使用钥匙系统（Key System）中的「发送与接收钥匙（Send and Receive Keys）」功能进行推进帧数。每次开始「发送与接收钥匙」搜索时，会同时推进 PIDRNG 与 IVRNG 各 2 帧。`}),`
`,(0,n.jsx)(r.li,{children:`获取你的宝可梦。在下方示例中，我们成功得到了一个梦境球+隐藏特性的土地云！`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black2-and-White2/Dream-Radar/Result.png`,alt:`Result`})}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};