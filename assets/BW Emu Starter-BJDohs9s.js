import{t as e}from"./jsx-runtime-Bl9_0yti.js";import{S as t}from"./index-9x-tX0ur.js";var n=e(),r={title:`黑/白模拟器御三家乱数`,navDrawerTitle:`御三家乱数`,description:`学习在黑/白模拟器中获得异色及高个体御三家。`,slug:`zh-bw-emu-starter`,translation:{enSlug:`bw-emu-starter`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Admiral-Fish/PokeFinder/releases`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`DeSmuME`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Real96/PokeLua/blob/main/Gen%205/DeSmuMe/BW_RNG_DeSmuMe.lua`,children:`Lua 脚本`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/emulator-bw-find-ds-parameters`,children:`已设置好的游戏配置档案`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：准备工作`}),`
`,(0,n.jsx)(r.p,{children:`先在 PokeFinder 中搜索目标御三家。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在礼物盒前保存游戏。`}),`
`,(0,n.jsxs)(r.li,{children:[`打开 `,(0,n.jsx)(r.code,{children:`PokeFinder → Gen 5 → Static → Searcher`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`选择对应御三家，设置异色、个体值、特性等筛选条件。`}),`
`,(0,n.jsx)(r.li,{children:`将“Initial Advances”设为至少 5。`}),`
`,(0,n.jsx)(r.li,{children:`按需设置“Max Advances”。不要过高，否则搜索或实际操作可能非常耗时。`}),`
`,(0,n.jsx)(r.li,{children:`最小和最大 IV Advances 均保持为 0。`}),`
`,(0,n.jsx)(r.li,{children:`生成结果，选择一个目标。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：进行御三家乱数`}),`
`,(0,n.jsx)(r.p,{children:`命中种子，再推进到正确帧数领取宝可梦。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`按照`,(0,n.jsx)(r.a,{href:`/emulator-bw-runasdate-initial-seed`,children:`初始种子指南`}),`命中目标初始种子。`]}),`
`,(0,n.jsx)(r.li,{children:`可选：在距离目标还有一些推进数时创建即时存档。`}),`
`,(0,n.jsx)(r.li,{children:`反复保存游戏，推进到目标帧数。`}),`
`,(0,n.jsxs)(r.li,{children:[`关闭菜单，按下 `,(0,n.jsx)(r.code,{children:`A`}),` 打开礼物盒并选择御三家。`]}),`
`,(0,n.jsx)(r.li,{children:`如果操作失误，读取即时存档，从第 3 步重试。如果没有即时存档，则从第 1 步重新开始。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`恭喜你！已经获得目标宝可梦了！`})}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Fiask：撰写指南。`}),`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};