import{u as i,j as n}from"./index-ClFrNW-9.js";const d=[{title:"第五世代AR搜寻器乱数",description:"乱数获取等级5梦境球隐藏特性的传说宝可梦",slug:"zh-emulator-b2w2-dream-radar",translation:{enSlug:"emulator-b2w2-dream-radar",language:"zh"}}];function l(r){const e={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/Admiral-Fish/RNGReporter/releases",children:"RNG Reporter"})}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"https://github.com/suloku/BW_tool/releases",children:"Suloku 的第五世代存档工具（可选）"}),". 你也可以在通过AR搜寻器获得目标宝可梦后提取你的 BW2 存档，而不是注入。"]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：RNG Reporter 中的 “Dream Radar” 标签页当前无法使用。本指南将介绍一种替代方法来查找种子以及所需的 IV/性格组合。
`})}),`
`,n.jsx(e.h2,{children:"第一步：查找目标个体"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 RNG Reporter，进入「Gen 5 Time Finder」，保持在「Capture」标签页并调整设置。"}),`
`,n.jsx(e.li,{children:"将 IV 设置为你的目标值，遭遇类型设为「Wild Pokémon」，方法选择「IVs (Standard Seed)」。"}),`
`,n.jsx(e.li,{children:"灵兽三神（龙卷云、雷电云、土地云）的最小 IV 帧为 21，其他宝可梦为 8。最大帧数可根据需求设定。"}),`
`,n.jsx(e.li,{children:"点击「Search」并等待结果出现。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Black2-and-White2/Dream-Radar/Timefinder.png",alt:"Timefinder"})}),`
`,n.jsx(e.p,{children:"对于第四世代的传说宝可梦或一般宝可梦，请选择偶数帧数的结果；对于灵兽形态宝可梦，请选择奇数帧数的结果。"}),`
`,n.jsx(e.h2,{children:"第二步：确定性格（可选）"}),`
`,n.jsx(e.p,{children:"要预测性格，请回到 RNG Reporter 主界面，选择「Gen 5 PIDRNG」。AR搜寻器的性格无法控制，只能预测。"}),`
`,n.jsx(e.p,{children:"以下是用于计算性格所命中的 PID 帧的公式："}),`
`,n.jsx(e.h3,{children:"灵兽三神"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"(你的 IV 帧数 - 21) / 2 = 所需推进的次数"}),`
`,n.jsx(e.li,{children:"初始 PIDRNG 帧 + 7 + 推进次数 = 命中的 PID 帧"}),`
`]}),`
`,n.jsx(e.h3,{children:"第四世代传说 + 有性别的宝可梦"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"(你的 IV 帧数 - 8) / 2 = 所需推进的次数"}),`
`,n.jsx(e.li,{children:"初始 PIDRNG 帧 + 2 + (2 × 推进次数) = 命中的 PID 帧"}),`
`]}),`
`,n.jsx(e.h3,{children:"无性别宝可梦"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"(你的 IV 帧数 - 8) / 2 = 所需推进的次数"}),`
`,n.jsx(e.li,{children:"初始 PIDRNG 帧 + 1 + (2 × 推进次数) = 命中的 PID 帧"}),`
`]}),`
`,n.jsx(e.h2,{children:"第三步：进行乱数操作"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"使用钥匙系统（Key System）中的「发送与接收钥匙（Send and Receive Keys）」功能进行推进帧数。每次开始「发送与接收钥匙」搜索时，会同时推进 PIDRNG 与 IVRNG 各 2 帧。"}),`
`,n.jsx(e.li,{children:"获取你的宝可梦。在下方示例中，我们成功得到了一个梦境球+隐藏特性的土地云！"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Black2-and-White2/Dream-Radar/Result.png",alt:"Result"})}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})}function h(r={}){const{wrapper:e}={...i(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(l,{...r})}):l(r)}export{h as default,d as frontmatter};
