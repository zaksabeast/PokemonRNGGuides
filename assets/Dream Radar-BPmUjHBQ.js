import{u as l,j as e}from"./index-BwZtl4TJ.js";const t=[{title:"Black 2 and White 2 Dream Radar RNG",navDrawerTitle:"Dream Radar RNG",description:"Learn how to RNG Level 5 Dream Ball legendary Pokémon with Hidden Abilities in Black 2 and White 2.",slug:"emulator-b2w2-dream-radar",category:["Black 2 and White 2","Transporter and Dream Radar"],tag:"emu"},{title:"第五世代AR搜寻器乱数",description:"乱数获取等级5梦境球隐藏特性的传说宝可梦",slug:"zh-emulator-b2w2-dream-radar",category:["Black 2 and White 2","Transporter and Dream Radar"],tag:"emu",translation:{enSlug:"emulator-b2w2-dream-radar",language:"zh"}}];function a(r){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...l(),...r.components},{ShowIf:i}=n;return i||s("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsxs(i,{slug:"/emulator-b2w2-dream-radar",children:[e.jsx(n.h2,{children:"Tools"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/RNGReporter/releases",children:"RNG Reporter"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/suloku/BW_tool/releases",children:"Suloku's Gen V Save Tool (Optional)"}),". You can also extract your BW2 save file after getting the Pokémon you want from the Dream Radar if you prefer not to inject."]}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The "Dream Radar" tab in RNG Reporter does not work at this time. This guide will explain an alternate way to find seeds and desired IV/Nature combinations.
`})}),e.jsx(n.h2,{children:"Step 1: Finding a spread"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Open RNG Reporter and go to "Gen 5 Time Finder". Stay on the "Capture" tab and adjust the settings.'}),`
`,e.jsx(n.li,{children:'Set IVs to your preference, Encounter Type to "Wild Pokémon", and the method to "IVs (Standard Seed)".'}),`
`,e.jsx(n.li,{children:"Minimum IV frame for the Therian Trio (Tornadus, Thundurus, Landorus) is 21. For other Pokémon, it's 8. Set the maximum frame to your liking."}),`
`,e.jsx(n.li,{children:"Hit search and wait for results."}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black2-and-White2/Dream-Radar/Timefinder.png",alt:"Timefinder"})}),e.jsx(n.p,{children:"Target even IV frames for Generation 4 Legendaries or random Pokémon, and target odd IV frames for Therian-Forme Pokémon."}),e.jsx(n.h2,{children:"Step 2: Finding a nature (Optional)"}),e.jsx(n.p,{children:'To find the nature, go to the main RNG Reporter screen and select "Gen 5 PIDRNG". You cannot control Dream Radar nature, only predict it.'}),e.jsx(n.p,{children:"Use the formula below to find the nature based on your seed."}),e.jsx(n.h3,{children:"Therian Trio"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"(Your IV Frame - 21) / 2 = Number of required advancements."}),`
`,e.jsx(n.li,{children:"Initial PIDRNG Frame + 7 + Required advancements = PID Frame you will hit."}),`
`]}),e.jsx(n.h3,{children:"G4 Box Legends and Gendered Pokémon"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"(Your IV Frame - 8) / 2 = Number of required advancements."}),`
`,e.jsx(n.li,{children:"Initial PIDRNG Frame + 2 + (2 * Required advancements) = PID Frame you will hit."}),`
`]}),e.jsx(n.h3,{children:"Genderless Pokémon"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"(Your IV Frame - 8) / 2 = Number of required advancements."}),`
`,e.jsx(n.li,{children:"Initial PIDRNG Frame + 1 + (2 * Required advancements) = PID Frame you will hit."}),`
`]}),e.jsx(n.h2,{children:"Step 3: RNGing the Pokémon"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:`Use Key System's "Send and Receive Keys" function to frame advance. Each time you start the "Send and Receive Keys" search, it will advance both the PIDRNG and IVRNG Frames by 2.`}),`
`,e.jsx(n.li,{children:"Obtain your Pokémon. In the example below, we have a Dream Ball hidden ability Landorus!"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black2-and-White2/Dream-Radar/Result.png",alt:"Result"})}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(i,{slug:"/zh-emulator-b2w2-dream-radar",children:[e.jsx(n.h2,{children:"所需工具"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/RNGReporter/releases",children:"RNG Reporter"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/suloku/BW_tool/releases",children:"Suloku 的第五世代存档工具（可选）"}),". 你也可以在通过AR搜寻器获得目标宝可梦后提取你的 BW2 存档，而不是注入。"]}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`注意：RNG Reporter 中的 “Dream Radar” 标签页当前无法使用。本指南将介绍一种替代方法来查找种子以及所需的 IV/性格组合。
`})}),e.jsx(n.h2,{children:"第一步：查找目标个体"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"打开 RNG Reporter，进入「Gen 5 Time Finder」，保持在「Capture」标签页并调整设置。"}),`
`,e.jsx(n.li,{children:"将 IV 设置为你的目标值，遭遇类型设为「Wild Pokémon」，方法选择「IVs (Standard Seed)」。"}),`
`,e.jsx(n.li,{children:"灵兽三神（龙卷云、雷电云、土地云）的最小 IV 帧为 21，其他宝可梦为 8。最大帧数可根据需求设定。"}),`
`,e.jsx(n.li,{children:"点击「Search」并等待结果出现。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black2-and-White2/Dream-Radar/Timefinder.png",alt:"Timefinder"})}),e.jsx(n.p,{children:"对于第四世代的传说宝可梦或一般宝可梦，请选择偶数帧数的结果；对于灵兽形态宝可梦，请选择奇数帧数的结果。"}),e.jsx(n.h2,{children:"第二步：确定性格（可选）"}),e.jsx(n.p,{children:"要预测性格，请回到 RNG Reporter 主界面，选择「Gen 5 PIDRNG」。AR搜寻器的性格无法控制，只能预测。"}),e.jsx(n.p,{children:"以下是用于计算性格所命中的 PID 帧的公式："}),e.jsx(n.h3,{children:"灵兽三神"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"(你的 IV 帧数 - 21) / 2 = 所需推进的次数"}),`
`,e.jsx(n.li,{children:"初始 PIDRNG 帧 + 7 + 推进次数 = 命中的 PID 帧"}),`
`]}),e.jsx(n.h3,{children:"第四世代传说 + 有性别的宝可梦"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"(你的 IV 帧数 - 8) / 2 = 所需推进的次数"}),`
`,e.jsx(n.li,{children:"初始 PIDRNG 帧 + 2 + (2 × 推进次数) = 命中的 PID 帧"}),`
`]}),e.jsx(n.h3,{children:"无性别宝可梦"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"(你的 IV 帧数 - 8) / 2 = 所需推进的次数"}),`
`,e.jsx(n.li,{children:"初始 PIDRNG 帧 + 1 + (2 × 推进次数) = 命中的 PID 帧"}),`
`]}),e.jsx(n.h2,{children:"第三步：进行乱数操作"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"使用钥匙系统（Key System）中的「发送与接收钥匙（Send and Receive Keys）」功能进行推进帧数。每次开始「发送与接收钥匙」搜索时，会同时推进 PIDRNG 与 IVRNG 各 2 帧。"}),`
`,e.jsx(n.li,{children:"获取你的宝可梦。在下方示例中，我们成功得到了一个梦境球+隐藏特性的土地云！"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black2-and-White2/Dream-Radar/Result.png",alt:"Result"})}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function o(r={}){const{wrapper:n}={...l(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(a,{...r})}):a(r)}function s(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{o as default,t as frontmatter};
