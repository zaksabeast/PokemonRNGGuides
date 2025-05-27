import{u as r,j as n}from"./index-BqEsMc3A.js";const c=[{title:"如何在第五世代中寻找 DS 参数",description:"获取你的 DS 参数以进行第五世代乱数。",slug:"zh-emulator-bw-find-ds-parameters",translation:{enSlug:"emulator-bw-find-ds-parameters",language:"zh"}}];function i(s){const e={a:"a",code:"code",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/Bambo-Rambo/RNGReporter",children:"RNG Reporter"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://runasdate.en.softonic.com/",children:"RunAsDate"})}),`
`]}),`
`,n.jsx(e.h2,{children:"需知事项"}),`
`,n.jsx(e.p,{children:"在进行乱数前，必须先找到你的 DS 参数。每个存档、主机或模拟器只需执行一次。"}),`
`,n.jsx(e.h2,{children:"第一步：设置 RNG Reporter"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 RNG Reporter。"}),`
`,n.jsxs(e.li,{children:["点击 ",n.jsx(e.code,{children:"5th Gen Tools -> Find DS Parameters"}),"。"]}),`
`,n.jsx(e.li,{children:"选择你的游戏版本和语言。"}),`
`,n.jsxs(e.li,{children:["设置种子加密变量（Seed Encryption Variables）：",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"DS 类型: Lite/Original"}),`
`,n.jsxs(e.li,{children:["DS MAC 地址: ",n.jsx(e.code,{children:"0009BF123456"})]}),`
`,n.jsxs(e.li,{children:["VCount: ",n.jsx(e.code,{children:"10-70"})]}),`
`,n.jsxs(e.li,{children:["Timer0: ",n.jsx(e.code,{children:"300-1200"})]}),`
`,n.jsxs(e.li,{children:["GxStat: ",n.jsx(e.code,{children:"6-6"})]}),`
`,n.jsxs(e.li,{children:["VFrame: ",n.jsx(e.code,{children:"0-15"})]}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:["DeSmuMe 模拟器的 DS MAC 地址始终是 ",n.jsx(e.code,{children:"0009BF123456"}),"。"]}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Black-and-White/Parameters/Setup.png",alt:"Seed Encryption Variables"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:"注意：如果无法找到种子，请检查设置是否正确。如果正确无误，可以尝试：\n- VCount: `0-FF`\n- Timer0: `0-FFFF`\n不过这样搜索时间会更长。\n"})}),`
`,n.jsx(e.h2,{children:"第二步：寻找你的种子"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 RunAsDate。"}),`
`,n.jsxs(e.li,{children:["输入任意时间，并勾选 ",n.jsx(e.code,{children:"Immediate Mode"}),"。"]}),`
`,n.jsx(e.li,{children:"在 DS 参数查找器中输入相同的时间。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Black-and-White/Parameters/Time.png",alt:"Time Input"})}),`
`,n.jsxs(e.ol,{start:"4",children:[`
`,n.jsxs(e.li,{children:["点击 RunAsDate 中的 ",n.jsx(e.code,{children:"Run"}),"，加载你的 ROM。"]}),`
`,n.jsx(e.li,{children:"打开 Lua 脚本，不要按任何按键。"}),`
`,n.jsx(e.li,{children:"复制 Lua 脚本显示的种子，并粘贴到 DS 参数查找器中。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/Black-and-White/Parameters/Seed.png",alt:"Initial Seed"})}),`
`,n.jsx(e.h2,{children:"第三步：搜索 DS 参数"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["点击 ",n.jsx(e.code,{children:"Search"})," 并耐心等待搜索完成。"]}),`
`,n.jsxs(e.li,{children:["搜索成功后，点击 ",n.jsx(e.code,{children:"Send Results to Profile"})," 将结果保存到你的配置文件中。"]}),`
`]}),`
`,n.jsx(e.p,{children:"祝你乱数顺利！"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：如果更改了模拟器设置、存档，或重新下载了模拟器，可能需要重新寻找 DS 参数。
`})}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})}function d(s={}){const{wrapper:e}={...r(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(i,{...s})}):i(s)}export{d as default,c as frontmatter};
