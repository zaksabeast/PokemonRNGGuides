import{ic as s,j as n}from"./index-DErPsMcA.js";const c=[{title:"在欧米伽红宝石与阿尔法蓝宝石中使用 Masuda 法或闪耀护符进行孵化乱数",description:"学习如何在欧米伽红宝石/阿尔法蓝宝石中，通过培育屋进行的孵化乱数，以获得异色或高个体值宝可梦。",slug:"zh-retail-oras-egg-mmsc",translation:{enSlug:"retail-oras-egg-mmsc",language:"zh"}},{title:"在X与Y中使用 Masuda 法或闪耀护符进行孵化乱数",description:"学习如何在X/Y中，通过培育屋进行的孵化乱数，以获得异色或高个体值宝可梦。",slug:"zh-retail-xy-egg-mmsc",translation:{enSlug:"retail-xy-egg-mmsc",language:"zh"}}];function i(l){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.pre,{children:n.jsx(e.code,{children:`与普通孵化乱数不同，此方法使用了 Masuda 法或闪耀护符，目标蛋只需乱数一次，但等待目标帧的时间可能更长。
`})}),`
`,n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/install-pokereader",children:"安装了 PokeReader 的 3DS"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`]}),`
`,n.jsx(e.h2,{children:"第一步：输入乱数信息"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"选择游戏版本并输入 TSV（训练家异色值）。"}),`
`,n.jsx(e.li,{children:"输入初始种子（Seed）。"}),`
`,n.jsx(e.li,{children:"如果你拥有闪耀护符，请勾选「闪耀护符」。"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`如果你想生成一个不属于你的 ESV（蛋异色值）的蛋，请点击「TSV列表」来添加额外的 TSV，然后勾选「其他TSV异色」。

记得在右上角输入你自己的 TSV，这样才能正确判断哪些帧是闪。
`})}),`
`,n.jsx(e.h2,{children:"第二步：输入父母信息"}),`
`,n.jsx(e.p,{children:"根据你所使用的父母宝可梦输入信息。如果父母是不同语言版本，请勾选「Masuda Method」。"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`判断 Masuda 法是否成立的是语言，而不是地区。即便两个宝可梦来自同一个国家，只要语言不同，就成立。
`})}),`
`,n.jsx(e.p,{children:"如果是百变怪和无性别宝可梦配对，系统会视百变怪为「母方」。"}),`
`,n.jsx(e.h2,{children:"第三步：孵蛋seed、筛选条件与目标帧"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"输入你当前游戏中的孵蛋seed。"}),`
`,n.jsx(e.li,{children:"在筛选条件中填写你想要的蛋的属性。"}),`
`,n.jsx(e.li,{children:"若只想查找异色，请勾选「仅异色帧」。"}),`
`,n.jsxs(e.li,{children:["在游戏中按下 ",n.jsx(e.code,{children:"Start + Select"})," 暂停游戏。"]}),`
`,n.jsx(e.li,{children:"填写当前帧数，并扩大「帧数范围」以查找更多结果。"}),`
`,n.jsx(e.li,{children:'若你是第一次进行操作，建议选择「接受」（接受第一个蛋）来确认帧数-1 的数据是否正确。如果选择「拒绝」，"考虑延迟" 计数器将重置为 0。'}),`
`,n.jsx(e.li,{children:"点击「计算」开始搜索目标帧。如果无结果，请增大帧范围并重新计算。"}),`
`]}),`
`,n.jsx(e.h2,{children:"第四步：乱数目标蛋的属性"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"选中目标帧。"}),`
`,n.jsxs(e.li,{children:["若你需要从奇数帧跳到偶数帧，或反过来，只需按",n.jsx(e.code,{children:"Start"}),"解除暂停后存一次档。"]}),`
`]}),`
`,n.jsx(e.p,{children:"记住："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"战斗外每步为 2 帧跳动。"}),`
`,n.jsx(e.li,{children:"游戏运行过程中帧状态要么全是偶数，要么全是奇数。"}),`
`,n.jsx(e.li,{children:"存档一次可切换帧奇偶性。"}),`
`,n.jsx(e.li,{children:"第一个拿到或拒绝的蛋「不是」你乱数的目标蛋。"}),`
`,n.jsx(e.li,{children:"蛋的属性在前一个蛋被处理（拿取/拒绝）时就已决定，之后不会改变。"}),`
`,n.jsx(e.li,{children:"换句话说：处理当前蛋，会决定下一个蛋。"}),`
`,n.jsx(e.li,{children:"3DSRNGTool 中显示的帧数-1 是当前蛋的属性。"}),`
`]}),`
`,n.jsx(e.h2,{children:"第五步：乱数蛋的属性（不包含 PID / ESV）"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["在游戏中与培育员对话，等待出现以下对话：",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:'接受蛋时（ORAS）："你会想要它的，对吧？"'}),`
`,n.jsx(e.li,{children:'接受蛋时（XY）："你想要它，对吧？"'}),`
`,n.jsx(e.li,{children:'拒绝蛋后（ORAS / XY）："那我就先保管好啦，谢谢你啦！"'}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:["当你接近目标帧时，按下 ",n.jsx(e.code,{children:"Start + Select"})," 暂停游戏，再使用 ",n.jsx(e.code,{children:"Select"})," 每次推进一帧。"]}),`
`,n.jsxs(e.li,{children:["当达到目标帧时，按住 ",n.jsx(e.code,{children:"A"})," 同时解除暂停并领取/拒绝蛋。"]}),`
`,n.jsx(e.li,{children:"当前操作完成后，下一颗蛋的属性就会与帧数-1 匹配。"}),`
`]}),`
`,n.jsx(e.p,{children:"拿到下一颗蛋后，查看或孵化即可验证。恭喜你！"}),`
`,n.jsx(e.h2,{children:"常见问题排查"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"确认 3DSRNGTool 右上角的 TSV 与主视图的 TSV 相同。"}),`
`,n.jsx(e.li,{children:"如果你领取的第一颗蛋的属性与帧数-1 不符，确认你是否使用的是 ORAS 正确的育婴员对话界面。"}),`
`,n.jsx(e.li,{children:"每次领取/拒绝蛋之后，孵蛋seed应会发生变化。如果没有，请确保你已使用最新版本的 PokeReader，且游戏为最新版。"}),`
`]}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function d(l={}){const{wrapper:e}={...s(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(i,{...l})}):i(l)}export{d as default,c as frontmatter};
