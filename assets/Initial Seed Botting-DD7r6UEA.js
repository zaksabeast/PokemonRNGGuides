import{u as s,j as e}from"./index-BuTG-nDb.js";const h=[{title:"Initial Seed Botting for FireRed and LeafGreen",navDrawerTitle:"Initial Seed Botting",description:"Learn how to use the Initial Seed Bot in FireRed and LeafGreen for better control over your RNG results.",slug:"frlg-seeding-bot",category:"FireRed and LeafGreen",tag:"emu"},{title:"初始种子自动刷取",description:"使用初始种子自动脚本，实现更高自由度的乱数控制",slug:"zh-frlg-seeding-bot",category:"FireRed and LeafGreen",tag:"emu",translation:{enSlug:"frlg-seeding-bot",language:"zh"}}];function l(i){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...i.components},{ShowIf:r}=n;return r||t("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsxs(r,{slug:"/frlg-seeding-bot",children:[e.jsx(n.h3,{children:"Tools:"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/Real96/FRLGRSEInitialSeedsFinder",children:"FRLGRSEInitialSeedsFinder"})," by Real96"]}),`
`]}),e.jsx(n.h2,{children:"Intro"}),e.jsx(n.p,{children:"This guide shows an alternative RNG method for Fire Red and Leaf Green that offers more control over the initial seed using a Lua bot."}),e.jsx(n.h3,{children:"Setup:"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"First, determine your target. Open PokeFinder, go to Gen 3 => Stationary or Wild (both work similarly)."}),`
`,e.jsx(n.li,{children:'In the "Searcher" tab, apply your desired filters.'}),`
`,e.jsx(n.li,{children:"Generate results and record the seed."}),`
`,e.jsx(n.li,{children:"Run FRLGRSEInitialSeedsFinder. It will ask for a seed; enter the one you recorded."}),`
`,e.jsx(n.li,{children:"When asked for the number of results, input a large number, like 100."}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`For starters where Teachy TV is unavailable, generate 100 results but only consider the lowest advance range possible.
`})}),e.jsxs(n.ol,{start:"6",children:[`
`,e.jsx(n.li,{children:"Wait for the tool to generate results. It will create a text file with possible initial seeds. Open the file and copy its content."}),`
`,e.jsxs(n.li,{children:["In the FRLG Lua script, find this line: 'local botTargetInitSeeds ='. Input all the seeds (enclose them in '","')."]}),`
`,e.jsx(n.li,{children:"Save the Lua script."}),`
`]}),e.jsx(n.h3,{children:"Botting:"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Run the Lua script and enter the initial seed bot mode by pressing ",e.jsx(n.code,{children:"2"}),"."]}),`
`,e.jsx(n.li,{children:"Pause the emulator."}),`
`,e.jsx(n.li,{children:"Reset the emulator."}),`
`,e.jsxs(n.li,{children:["Advance a single time (",e.jsx(n.code,{children:"Ctrl + N"}),") while holding the ",e.jsx(n.code,{children:"Select"})," button."]}),`
`,e.jsx(n.li,{children:"Unpause the emulator."}),`
`]}),e.jsx(n.p,{children:"This setup allows the game to be controlled by the bot, trying to hit one of the selected initial seeds. Once it completes, the game will pause. Keep track of the initial seed, input it into the generator, and proceed with your RNG process as usual, knowing your target advance is now accessible."}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(r,{slug:"/zh-frlg-seeding-bot",children:[e.jsx(n.h3,{children:"所需工具："}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"带有 Lua 脚本的 mGBA 模拟器"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsxs(n.li,{children:["由 Real96 开发的 ",e.jsx(n.a,{href:"https://github.com/Real96/FRLGRSEInitialSeedsFinder",children:"FRLGRSEInitialSeedsFinder"})]}),`
`]}),e.jsx(n.h2,{children:"简介"}),e.jsx(n.p,{children:"本指南介绍一种适用于《火红》《叶绿》的替代乱数方式，借助 Lua 自动脚本实现对初始种子的更高控制。"}),e.jsx(n.h3,{children:"设置步骤："}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"首先确定你的目标。在 PokeFinder 中进入 第三世代 => 定点乱数 或 野生乱数（两者操作方式相似）。"}),`
`,e.jsx(n.li,{children:'在 "检索器" 标签页中设置所需的筛选条件。'}),`
`,e.jsx(n.li,{children:"生成结果后，记录你选中的种子。"}),`
`,e.jsx(n.li,{children:"运行 FRLGRSEInitialSeedsFinder 工具。它会要求输入一个种子，此时输入刚刚记录的那个。"}),`
`,e.jsx(n.li,{children:"当工具提示“请输入想生成的结果数量”时，建议输入一个较大的数字，例如 100。"}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`对于刚开始游戏、尚未获得教学电视的初始 ID 乱数，建议只考虑较低帧范围内的结果。
`})}),e.jsxs(n.ol,{start:"6",children:[`
`,e.jsx(n.li,{children:"等待工具生成结果，它将输出一个文本文件，列出所有可能的初始种子。打开该文件并复制全部内容。"}),`
`,e.jsxs(n.li,{children:["打开 FRLG 的 Lua 脚本，找到如下行： 'local botTargetInitSeeds ='。将你复制的种子内容以 "," 括起来并填入该行。"]}),`
`,e.jsx(n.li,{children:"保存脚本。"}),`
`]}),e.jsx(n.h3,{children:"自动执行流程："}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"运行 Lua 脚本，在模拟器中按下 2 键进入初始种子自动刷取模式。"}),`
`,e.jsx(n.li,{children:"暂停模拟器。"}),`
`,e.jsx(n.li,{children:"重启模拟器。"}),`
`,e.jsx(n.li,{children:"按住 Select 键的同时，推进一帧（Ctrl + N）。"}),`
`,e.jsx(n.li,{children:"然后取消暂停，脚本将自动控制游戏，尝试命中你指定的初始种子。"}),`
`]}),e.jsx(n.p,{children:"一旦脚本完成命中，游戏将自动暂停。此时记录下你命中的初始种子，在 PokeFinder 中输入该种子后续进行乱数操作。你现在可以确定当前帧可用于继续乱数流程。"}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白希洛。"}),`
`]})]})]})}function o(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}function t(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{o as default,h as frontmatter};
