import{ig as s,j as n}from"./index-B0uIwGYa.js";const c=[{title:"究极日月 实机获取孵蛋种子",description:"使用鲤鱼王法在《究极日月》中获取孵蛋乱数种子，无需破解。",slug:"zh-retail-usum-egg-seed-no-cfw",translation:{enSlug:"retail-usum-egg-seed-no-cfw",language:"zh"}},{title:"日月 实机获取孵蛋种子",description:"使用鲤鱼王法在《日月》中获取孵蛋乱数种子，无需破解。",slug:"zh-retail-sm-egg-seed-no-cfw",translation:{enSlug:"retail-sm-egg-seed-no-cfw",language:"zh"}}];function i(e){const l={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(l.pre,{children:n.jsx(l.code,{children:`本指南适用于无法使用破解或自制系统（Homebrew）的玩家。如果你可以使用破解或 Homebrew，可以直接开始乱数，请参考相关指南。
`})}),`
`,n.jsx(l.h2,{children:"所需工具"}),`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:n.jsx(l.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,n.jsx(l.p,{children:"目前有两种方式获取蛋种子：如果你从未在培育屋接受或拒绝过蛋，请使用 8 只鲤鱼王法；若有接收/拒绝过蛋，则使用 127 只鲤鱼王法。培育屋赠送的伊布蛋不计入其中。"}),`
`,n.jsx(l.h2,{children:"第一步：127 只鲤鱼王法准备工作"}),`
`,n.jsx(l.pre,{children:n.jsx(l.code,{children:`如果你从未接收或拒绝过蛋，请跳过此部分，直接查看 8 只鲤鱼王法。

培育屋赠送的伊布蛋不计入在内！
`})}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsxs(l.li,{children:["准备两只鲤鱼王，一雄一雌，性格不同，记录下他们的性格。",`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:"为加快生成蛋的速度，建议使用不同语言、不同原训练者/ID 的鲤鱼王，携带圆形护符也有帮助。"}),`
`]}),`
`]}),`
`,n.jsx(l.li,{children:"给两只鲤鱼王各带一个不变之石。"}),`
`]}),`
`,n.jsx(l.h2,{children:"第二步：获取蛋种子（127 只鲤鱼王法）"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:"将两只持不变之石的鲤鱼王放入培育屋。"}),`
`,n.jsx(l.li,{children:"跑图直到出现蛋可接收。"}),`
`,n.jsx(l.li,{children:"在接收蛋之前存档（非常重要）。"}),`
`,n.jsxs(l.li,{children:["接收蛋并孵化，记录孵化出的性格：",`
`,n.jsxs(l.ul,{children:[`
`,n.jsxs(l.li,{children:["若与雄性鲤鱼王相同，记为 ",n.jsx(l.code,{children:"0"}),"."]}),`
`,n.jsxs(l.li,{children:["若与雌性鲤鱼王相同，记为 ",n.jsx(l.code,{children:"1"}),"."]}),`
`]}),`
`]}),`
`,n.jsxs(l.li,{children:["使用 ",n.jsx(l.code,{children:"L + R + Start"})," 软重置，回到蛋准备好但尚未接收的状态。"]}),`
`,n.jsxs(l.li,{children:["这次拒绝蛋，然后重复第 2 步，直到你按顺序记录下 127 个 ",n.jsx(l.code,{children:"0"}),"和 ",n.jsx(l.code,{children:"1"}),"。"]}),`
`,n.jsx(l.li,{children:'打开 3DSRNGTool，点击"工具"→"7代孵化乱数检索"，将记录的 127 个数字输入。'}),`
`,n.jsx(l.li,{children:'点击"Go!"开始搜索，几秒后即可获得结果。'}),`
`]}),`
`,n.jsx(l.h2,{children:"第三步：验证蛋种子（127 只鲤鱼王法）"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:"工具中显示的是你开始接收/拒绝那 127 个蛋之前的种子，现在我们要确认当前所处的帧。"}),`
`,n.jsx(l.li,{children:'在 3DSRNGTool 中前往孵化乱数，将获取到的种子填入"当前状态"区域，并填写鲤鱼王的亲代信息。'}),`
`,n.jsx(l.li,{children:'在"帧数范围"中输入起始帧为 123，点击"计算"。'}),`
`,n.jsx(l.li,{children:"拒绝当前蛋并将鲤鱼王从培育屋中取出，存档。"}),`
`,n.jsx(l.li,{children:"再次将两只鲤鱼王放回培育屋，这次都不携带任何道具。"}),`
`,n.jsx(l.li,{children:"跑图直到蛋生成后接收该蛋。"}),`
`,n.jsxs(l.li,{children:["孵化蛋，确认其性格是否对应第 123 或 124 帧：",`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:"若符合，恭喜你找到了当前蛋种子！；若不符，需要重新进行 127 个蛋步骤。"}),`
`,n.jsx(l.li,{children:'在匹配的帧上右键选择"设为当前状态"，更新当前种子。'}),`
`]}),`
`]}),`
`,n.jsxs(l.li,{children:["软重置后即可参照 ",n.jsx(l.a,{href:"/zh-retail-usum-egg-mmsc",children:"不同语言/闪耀呼符孵蛋乱数指南"})," 开始孵蛋乱数。"]}),`
`]}),`
`,n.jsx(l.h2,{children:"第一步：8 个蛋法准备工作"}),`
`,n.jsx(l.pre,{children:n.jsx(l.code,{children:`该方法要求你从未接收或拒绝过培育屋的蛋。

培育屋赠送的伊布蛋不计入在内。
`})}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:"准备一只鲤鱼王和一只百变怪，语言需一致。"}),`
`,n.jsx(l.li,{children:"存档后将两只宝可梦放入培育屋，确保它们没有携带任何道具。"}),`
`]}),`
`,n.jsx(l.h2,{children:"第二步：获取蛋种子（8 个蛋法）"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:"连续收集并孵化 8 个蛋。过程中不要存档、也不要拒绝蛋。"}),`
`,n.jsx(l.li,{children:'打开 3DSRNGTool，点击"工具"→"7代孵化乱数检索"。'}),`
`,n.jsx(l.li,{children:"在下拉框中按顺序选择 8 个蛋的性格，确保顺序与收蛋顺序一致。"}),`
`,n.jsx(l.li,{children:'点击"检索"，工具将搜索种子并输出结果。'}),`
`]}),`
`,n.jsx(l.h2,{children:"第三步：验证蛋种子（8 个蛋法）"}),`
`,n.jsxs(l.ol,{children:[`
`,n.jsx(l.li,{children:"工具提供的种子是你开始收集这 8 个蛋之前的，现在我们需要验证是否正确。"}),`
`,n.jsx(l.li,{children:'在 3DSRNGTool 中前往孵化乱数，将种子填入"当前状态"，并填写鲤鱼王与百变怪的亲代信息。'}),`
`,n.jsx(l.li,{children:'在"帧数范围"中输入起始帧数为 1，点击"计算"。'}),`
`,n.jsxs(l.li,{children:["将工具中输出的 8 个蛋与实际孵出的 8 个蛋进行比对，包括性格和性别：",`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:"若完全一致，说明种子正确；若不符，请重新进行 8 个蛋流程，并再次确认性格顺序。"}),`
`]}),`
`]}),`
`,n.jsxs(l.li,{children:["软重置后即可参照 ",n.jsx(l.a,{href:"/zh-retail-usum-egg-mmsc",children:"不同语言/闪耀呼符孵蛋乱数指南"})," 开始孵蛋乱数。"]}),`
`]}),`
`,n.jsx(l.h2,{children:"特别鸣谢"}),`
`,n.jsxs(l.ul,{children:[`
`,n.jsx(l.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function h(e={}){const{wrapper:l}={...s(),...e.components};return l?n.jsx(l,{...e,children:n.jsx(i,{...e})}):i(e)}export{h as default,c as frontmatter};
