import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-CvakMO0A.js";var n=e(),r=[{title:`如何在第五世代中寻找 DS 参数`,description:`获取你的 DS 参数以进行第五世代乱数。`,slug:`zh-emulator-bw-find-ds-parameters`,translation:{enSlug:`emulator-bw-find-ds-parameters`,language:`zh`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Bambo-Rambo/RNGReporter`,children:`RNG Reporter`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://runasdate.en.softonic.com/`,children:`RunAsDate`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`需知事项`}),`
`,(0,n.jsx)(r.p,{children:`在进行乱数前，必须先找到你的 DS 参数。每个存档、主机或模拟器只需执行一次。`}),`
`,(0,n.jsx)(r.h2,{children:`第一步：设置 RNG Reporter`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 RNG Reporter。`}),`
`,(0,n.jsxs)(r.li,{children:[`点击 `,(0,n.jsx)(r.code,{children:`5th Gen Tools -> Find DS Parameters`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`选择你的游戏版本和语言。`}),`
`,(0,n.jsxs)(r.li,{children:[`设置种子加密变量（Seed Encryption Variables）：`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`DS 类型: Lite/Original`}),`
`,(0,n.jsxs)(r.li,{children:[`DS MAC 地址: `,(0,n.jsx)(r.code,{children:`0009BF123456`})]}),`
`,(0,n.jsxs)(r.li,{children:[`VCount: `,(0,n.jsx)(r.code,{children:`10-70`})]}),`
`,(0,n.jsxs)(r.li,{children:[`Timer0: `,(0,n.jsx)(r.code,{children:`300-1200`})]}),`
`,(0,n.jsxs)(r.li,{children:[`GxStat: `,(0,n.jsx)(r.code,{children:`6-6`})]}),`
`,(0,n.jsxs)(r.li,{children:[`VFrame: `,(0,n.jsx)(r.code,{children:`0-15`})]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`DeSmuMe 模拟器的 DS MAC 地址始终是 `,(0,n.jsx)(r.code,{children:`0009BF123456`}),`。`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Parameters/Setup.png`,alt:`Seed Encryption Variables`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：如果无法找到种子，请检查设置是否正确。如果正确无误，可以尝试：
- VCount: \`0-FF\`
- Timer0: \`0-FFFF\`
不过这样搜索时间会更长。
`})}),`
`,(0,n.jsx)(r.h2,{children:`第二步：寻找你的种子`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`打开 RunAsDate。`}),`
`,(0,n.jsxs)(r.li,{children:[`输入任意时间，并勾选 `,(0,n.jsx)(r.code,{children:`Immediate Mode`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`在 DS 参数查找器中输入相同的时间。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Parameters/Time.png`,alt:`Time Input`})}),`
`,(0,n.jsxs)(r.ol,{start:`4`,children:[`
`,(0,n.jsxs)(r.li,{children:[`点击 RunAsDate 中的 `,(0,n.jsx)(r.code,{children:`Run`}),`，加载你的 ROM。`]}),`
`,(0,n.jsx)(r.li,{children:`打开 Lua 脚本，不要按任何按键。`}),`
`,(0,n.jsx)(r.li,{children:`复制 Lua 脚本显示的种子，并粘贴到 DS 参数查找器中。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Black-and-White/Parameters/Seed.png`,alt:`Initial Seed`})}),`
`,(0,n.jsx)(r.h2,{children:`第三步：搜索 DS 参数`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`点击 `,(0,n.jsx)(r.code,{children:`Search`}),` 并耐心等待搜索完成。`]}),`
`,(0,n.jsxs)(r.li,{children:[`搜索成功后，点击 `,(0,n.jsx)(r.code,{children:`Send Results to Profile`}),` 将结果保存到你的配置文件中。`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`祝你乱数顺利！`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：如果更改了模拟器设置、存档，或重新下载了模拟器，可能需要重新寻找 DS 参数。
`})}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};