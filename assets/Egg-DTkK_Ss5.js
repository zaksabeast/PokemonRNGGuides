import{E as s,j as n}from"./index-CFCUTKwJ.js";const d=[{title:"孵化乱数",description:"如何在育婴屋进行乱数孵化",slug:"zh-emulator-dppt-egg",translation:{enSlug:"emulator-dppt-egg",language:"zh"}}];function i(l){const e={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...s(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,n.jsxs(e.li,{children:["适用于 ",n.jsx(e.a,{href:"/desmume-setup",children:"Desmume"})," 进行乱数操作的工具"]}),`
`,n.jsx(e.li,{children:"能够使用培育屋，并且知道亲本的信息"}),`
`]}),`
`,n.jsx(e.h2,{children:"介绍"}),`
`,n.jsx(e.p,{children:`本指南介绍了如何推进乱数，以获得符合你想要的宝可梦。你应该已经掌握第四世代乱数的一些基础知识，例如如何开始乱数并推进它。在钻石、珍珠、白金中，孵化乱数较为复杂，因为游戏区域会产生随机干扰。
Masuda Method可以用来提高异色蛋的概率，但不是必需的。`}),`
`,n.jsx(e.h2,{children:"准备工作"}),`
`,n.jsx(e.p,{children:"孵化乱数的准备过程很简单:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 PokeFinder，进入第四世代 => 孵化乱数 => 检索器页面。"}),`
`,n.jsx(e.li,{children:"选择你使用的的配置，输入培育屋里两只亲代宝可梦的信息：Parent A：第一只存入培育屋的宝可梦，Parent B：第二只存入培育屋的宝可梦"}),`
`,n.jsx(e.li,{children:"存放好宝可梦然后存档。"}),`
`]}),`
`,n.jsx(e.h2,{children:"通过推进生成帧数以命中目标PID"}),`
`,n.jsx(e.p,{children:"孵蛋乱数中分别有生成帧（held advance）以及领取帧（pickup advance）。最简单的方法是找到一个不需要推进生成帧数的目标蛋：:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"在PokeFinder里将held advance的帧数范围设置为0-0。"}),`
`,n.jsx(e.li,{children:"筛选你想要的宝可梦，如异色、性格、性别等（这一部分无需筛选个体值）。"}),`
`,n.jsx(e.li,{children:"根据你的要求生成结果。"}),`
`,n.jsx(e.li,{children:"选择你的目标帧。"}),`
`,n.jsx(e.li,{children:"击中目标初始种子。"}),`
`]}),`
`,n.jsx(e.p,{children:"如果目标帧大于0，你需要通过以下方法推进帧数:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"使用鲤鱼王硬币，每丢一次硬币推进1帧。"}),`
`,n.jsx(e.li,{children:"使用亲密度检测器(进入页面即可)，队伍中每只宝可梦（不包括宝可梦单）推进2帧。"}),`
`,n.jsx(e.li,{children:"每次拒绝领蛋可推进1帧。"}),`
`]}),`
`,n.jsx(e.p,{children:"在进行第二部分前不要忘记在培育屋老爷爷面前存档。"}),`
`,n.jsx(e.h2,{children:"命中个体值"}),`
`,n.jsx(e.p,{children:"孵化乱数的第二部分是命中目标个体值。在孵化乱数中过滤器部分设置你想要的个体值过滤条件。使用高个体亲代，通常可以更容易获得高个体子代。"}),`
`,n.jsx(e.p,{children:"计算出结果，选择你所需个体值的帧数作为目标帧（不要选择过低的帧数），命中初始种子之后推进帧数（推进帧数的方法与其他乱数相同，如喋喋不休法等）。请注意与培育屋爷爷对话将会推进1帧，所以在推进帧数时请考虑这点，推进至目标帧的前一帧进行对话领取。"}),`
`,n.jsx(e.p,{children:"如果一切操作正确，你就能成功领取目标蛋，并孵化出符合要求的宝可梦！"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function h(l={}){const{wrapper:e}={...s(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(i,{...l})}):i(l)}export{h as default,d as frontmatter};
