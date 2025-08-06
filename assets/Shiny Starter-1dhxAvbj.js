import{O as h,j as n}from"./index-C4E3nNfV.js";const t=[{title:"异色御三家",description:"通过捕捉异色御三家确定你的 SID",slug:"zh-emerald-shiny-starter",translation:{enSlug:"emerald-shiny-starter",language:"zh"}}];function d(i){const e={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...h(),...i.components},{GenerateHoennTidSid:s,Gist:r,ShinyHoennStarter:c}=e;return s||l("GenerateHoennTidSid"),r||l("Gist"),c||l("ShinyHoennStarter"),n.jsxs(n.Fragment,{children:[n.jsx(r,{children:"要点：通过捕捉异色御三家确定你的 SID"}),`
`,n.jsx(e.h2,{children:"策略概览"}),`
`,n.jsxs(e.p,{children:["在创建新存档时，你的 SID 取决于随机生成的 TID 以及在特定文字处按下 ",n.jsx(e.code,{children:"A"}),` 的时间。
基于这两个变量，将生成一组可能的 SID。
为了确定哪一个是正确的 SID，你需要在该 SID 下能生成异色的推进帧上获得御三家宝可梦。如果获得的是异色宝可梦，那么该 SID 就是正确的。`]}),`
`,n.jsx(e.h2,{children:"第一步：生成 TID 和可能的 SID 列表"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["在标题画面进入“选项”，将文字速度设为 ",n.jsx(e.code,{children:"快"}),"。"]}),`
`,n.jsxs(e.li,{children:["选择",n.jsx(e.code,{children:"新游戏"}),"，输入你的名字后将光标移动到",n.jsx(e.code,{children:"确定"}),"按钮上。"]}),`
`,n.jsx(e.li,{children:"在下方工具中启动 TID/SID 定时器。"}),`
`,n.jsxs(e.li,{children:["当第一个计时器归零时，按下 ",n.jsx(e.code,{children:"A"}),"确认名字。"]}),`
`,n.jsxs(e.li,{children:["继续对话，直到出现 ",n.jsx(e.code,{children:"Well, I'll be expecting you later. Come see me in my POKEMON LAB."})]}),`
`,n.jsxs(e.li,{children:["当第二个计时器归零时按下 ",n.jsx(e.code,{children:"A"}),"。"]}),`
`,n.jsx(e.li,{children:"查看训练师卡上的 TID。"}),`
`,n.jsx(e.li,{children:"将这个 TID 填入下方工具的“获得的 TID”栏中，点击“生成可能的 SID”。"}),`
`,n.jsx(e.li,{children:"根据下方的建议，判断是否应重新进行第一步获取更理想的 TID，或继续进行第二步。"}),`
`]}),`
`,n.jsx(s,{game:"emerald"}),`
`,n.jsx(e.h2,{children:"第二步：确定正确的 SID"}),`
`,n.jsx(e.p,{children:"简述：对第一步中每一个可能的 SID，尝试在其对应的最早 Method-1 异色推进帧获得御三家。如果获得的是异色宝可梦，则该 SID 为你的存档所使用的 SID。"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"在御三家的包前面存档。"}),`
`,n.jsx(e.li,{children:"在下方工具中输入你的 TID 和你尚未测试过的第一个可能的 SID。"}),`
`,n.jsx(e.li,{children:"点击“生成”，然后开始计时器。"}),`
`,n.jsxs(e.li,{children:["当第一个计时器归零时，同时按下 ",n.jsx(e.code,{children:"Start + Select + A + B"})," 以重置游戏。"]}),`
`,n.jsx(e.li,{children:"快速打开包以避免活动NPC 带来的帧数推进。"}),`
`,n.jsxs(e.li,{children:["选择你要的御三家，等到画面出现 ",n.jsx(e.code,{children:"你要选择这只宝可梦吗？"}),"。"]}),`
`,n.jsxs(e.li,{children:["当第二个计时器归零时，按下 ",n.jsx(e.code,{children:"A"})," 确认选择。"]}),`
`,n.jsx(e.li,{children:"完成战斗后查看你的御三家。"}),`
`,n.jsx(e.li,{children:"如果是异色，恭喜你！你输入的 SID 就是你存档的真实 SID。"}),`
`,n.jsx(e.li,{children:"如果不是异色，在下方表单中填写种类、性别、性格、能力值，然后点击“查找与捕获的御三家匹配的帧数”。"}),`
`,n.jsx(e.li,{children:"如果没有结果显示，表示你输入的信息有误。"}),`
`,n.jsx(e.li,{children:"如果第一行显示“若 SID 正确则为异色”，但你获得的宝可梦不是异色，那么该 SID 是错误的。请使用下一个可能的 SID 重新执行第二步。"}),`
`,n.jsx(e.li,{children:"否则，点击“更新校准”按钮，并使用相同的 SID 重新执行第二步。"}),`
`]}),`
`,n.jsx(c,{game:"emerald"}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"指南与交互工具：RainingChain"}),`
`,n.jsx(e.li,{children:"第三世代固定遇敌生成器工具：EzPz"}),`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro。"}),`
`]})]})}function x(i={}){const{wrapper:e}={...h(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(d,{...i})}):d(i)}function l(i,e){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default,t as frontmatter};
