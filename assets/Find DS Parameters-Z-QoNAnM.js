import{u as l,j as e}from"./index-BrqZTQW1.js";const t=[{title:"How To Find DS Parameters in Generation 5",navDrawerTitle:"DS Parameters",description:"Learn how to find your DS parameters for successful RNG in Pokémon Black and White.",slug:"emulator-bw-find-ds-parameters",category:"Black and White",tag:"emu"},{title:"如何在第五世代中寻找 DS 参数",description:"获取你的 DS 参数以进行第五世代乱数。",slug:"zh-emulator-bw-find-ds-parameters",category:"Black and White",tag:"emu",translation:{enSlug:"emulator-bw-find-ds-parameters",language:"zh"}}];function r(s){const n={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...l(),...s.components},{ShowIf:i}=n;return i||d("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsxs(i,{slug:"/emulator-bw-find-ds-parameters",children:[e.jsx(n.h2,{children:"Tools"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/RNGReporter/releases",children:"RNG Reporter"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://runasdate.en.softonic.com/",children:"RunAsDate"})}),`
`]}),e.jsx(n.h2,{children:"Things To Know"}),e.jsx(n.p,{children:"You need to find your DS Parameters to proceed with RNG. This only needs to be done once per save, console, or emulator."}),e.jsx(n.h2,{children:"Step 1: Set Up RNG Reporter"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open RNG Reporter."}),`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"5th Gen Tools -> Find DS Parameters"}),"."]}),`
`,e.jsx(n.li,{children:"Choose your game version and language."}),`
`,e.jsxs(n.li,{children:["Set the Seed Encryption Variables:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"DS Type: Lite/Original"}),`
`,e.jsxs(n.li,{children:["DS MAC Address: ",e.jsx(n.code,{children:"0009BF123456"})]}),`
`,e.jsxs(n.li,{children:["VCount: ",e.jsx(n.code,{children:"10-70"})]}),`
`,e.jsxs(n.li,{children:["Timer0: ",e.jsx(n.code,{children:"300-1200"})]}),`
`,e.jsxs(n.li,{children:["GxStat: ",e.jsx(n.code,{children:"6-6"})]}),`
`,e.jsxs(n.li,{children:["VFrame: ",e.jsx(n.code,{children:"0-15"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["DeSmuMe's DS MAC Address is always ",e.jsx(n.code,{children:"0009BF123456"}),"."]}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Parameters/Setup.png",alt:"Seed Encryption Variables"})}),e.jsx(n.pre,{children:e.jsx(n.code,{children:"Note: If you cannot find a seed, double-check your settings. If correct, try:\n- VCount: `0-FF`\n- Timer0: `0-FFFF`\nThis will take longer to search.\n"})}),e.jsx(n.h2,{children:"Step 2: Find Your Seed"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open RunAsDate."}),`
`,e.jsxs(n.li,{children:["Enter any time and check ",e.jsx(n.code,{children:"Immediate Mode"}),"."]}),`
`,e.jsx(n.li,{children:"Input the same time in the DS Parameter Finder."}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Parameters/Time.png",alt:"Time Input"})}),e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"Run"})," in RunAsDate and load your ROM."]}),`
`,e.jsx(n.li,{children:"Open your Lua script. Do not press any keys."}),`
`,e.jsx(n.li,{children:"Copy the seed you get and paste it into the DS Parameters Finder."}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Parameters/Seed.png",alt:"Initial Seed"})}),e.jsx(n.h2,{children:"Step 3: Search for DS Parameters"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"Search"})," and wait for it to finish."]}),`
`,e.jsxs(n.li,{children:["When you get a result, click ",e.jsx(n.code,{children:"Send Results to Profile"}),"."]}),`
`]}),e.jsx(n.p,{children:"Good luck with your RNG!"}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: You may need to redo this if you change emulation settings, saves, or redownload the emulator.
`})}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(i,{slug:"/zh-emulator-bw-find-ds-parameters",children:[e.jsx(n.h2,{children:"所需工具"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.pokemonrng.com/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Bambo-Rambo/RNGReporter",children:"RNG Reporter"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://runasdate.en.softonic.com/",children:"RunAsDate"})}),`
`]}),e.jsx(n.h2,{children:"需知事项"}),e.jsx(n.p,{children:"在进行乱数前，必须先找到你的 DS 参数。每个存档、主机或模拟器只需执行一次。"}),e.jsx(n.h2,{children:"第一步：设置 RNG Reporter"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"打开 RNG Reporter。"}),`
`,e.jsxs(n.li,{children:["点击 ",e.jsx(n.code,{children:"5th Gen Tools -> Find DS Parameters"}),"。"]}),`
`,e.jsx(n.li,{children:"选择你的游戏版本和语言。"}),`
`,e.jsxs(n.li,{children:["设置种子加密变量（Seed Encryption Variables）：",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"DS 类型: Lite/Original"}),`
`,e.jsxs(n.li,{children:["DS MAC 地址: ",e.jsx(n.code,{children:"0009BF123456"})]}),`
`,e.jsxs(n.li,{children:["VCount: ",e.jsx(n.code,{children:"10-70"})]}),`
`,e.jsxs(n.li,{children:["Timer0: ",e.jsx(n.code,{children:"300-1200"})]}),`
`,e.jsxs(n.li,{children:["GxStat: ",e.jsx(n.code,{children:"6-6"})]}),`
`,e.jsxs(n.li,{children:["VFrame: ",e.jsx(n.code,{children:"0-15"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["DeSmuMe 模拟器的 DS MAC 地址始终是 ",e.jsx(n.code,{children:"0009BF123456"}),"。"]}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Parameters/Setup.png",alt:"Seed Encryption Variables"})}),e.jsx(n.pre,{children:e.jsx(n.code,{children:"注意：如果无法找到种子，请检查设置是否正确。如果正确无误，可以尝试：\n- VCount: `0-FF`\n- Timer0: `0-FFFF`\n不过这样搜索时间会更长。\n"})}),e.jsx(n.h2,{children:"第二步：寻找你的种子"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"打开 RunAsDate。"}),`
`,e.jsxs(n.li,{children:["输入任意时间，并勾选 ",e.jsx(n.code,{children:"Immediate Mode"}),"。"]}),`
`,e.jsx(n.li,{children:"在 DS 参数查找器中输入相同的时间。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Parameters/Time.png",alt:"Time Input"})}),e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["点击 RunAsDate 中的 ",e.jsx(n.code,{children:"Run"}),"，加载你的 ROM。"]}),`
`,e.jsx(n.li,{children:"打开 Lua 脚本，不要按任何按键。"}),`
`,e.jsx(n.li,{children:"复制 Lua 脚本显示的种子，并粘贴到 DS 参数查找器中。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Black-and-White/Parameters/Seed.png",alt:"Initial Seed"})}),e.jsx(n.h2,{children:"第三步：搜索 DS 参数"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["点击 ",e.jsx(n.code,{children:"Search"})," 并耐心等待搜索完成。"]}),`
`,e.jsxs(n.li,{children:["搜索成功后，点击 ",e.jsx(n.code,{children:"Send Results to Profile"})," 将结果保存到你的配置文件中。"]}),`
`]}),e.jsx(n.p,{children:"祝你乱数顺利！"}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`注意：如果更改了模拟器设置、存档，或重新下载了模拟器，可能需要重新寻找 DS 参数。
`})}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function h(s={}){const{wrapper:n}={...l(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}function d(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,t as frontmatter};
