import{ii as l,j as n}from"./index-CXw3cuDA.js";const d=[{title:"究极日月 模拟器初始种子时间查找器（Citra）",description:"通过时间查找特定初始乱数种子的方法。",slug:"zh-emulator-usum-time-finder",translation:{enSlug:"emulator-usum-time-finder",language:"zh"}},{title:"日月 模拟器初始种子时间查找器（Citra）",description:"通过时间查找特定初始乱数种子的方法。",slug:"zh-emulator-sm-time-finder",translation:{enSlug:"emulator-sm-time-finder",language:"zh"}}];function t(i){const e={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...l(),...i.components},{ShowIf:r}=e;return r||s("ShowIf"),n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Citra 与 CitraRNG"}),`
`,n.jsx(e.li,{children:"3DSTimeFinder"}),`
`]}),`
`,n.jsx(e.h2,{children:"简介"}),`
`,n.jsx(e.p,{children:"本教程介绍如何结合 CitraRNG 使用 TimeFinder.js 工具。你可以通过设置系统时间获取目标初始种子，无需软重置即可多次尝试同一 RNG 帧。本教程默认你已有基本的 CitraRNG 使用知识。"}),`
`,n.jsx(e.h2,{children:"初始设置"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 Citra，将 RTC（系统时间）设为任意日期，并记录下来以备后续使用。"}),`
`,n.jsx(e.li,{children:"启动游戏与 CitraRNG，切换至 Gen 7 标签页。"}),`
`,n.jsx(e.li,{children:"查看初始种子并记录下来。"}),`
`]}),`
`,n.jsx(e.h2,{children:"校准与建立配置档"}),`
`,n.jsx(r,{slug:"/zh-emulator-usum-time-finder",children:n.jsx(e.p,{children:"默认的 offset（偏移）与 tick（时钟周期）值可能不适用。不同版本的 Citra 值不同，以下仅为示例：例如 Citra Nightly 1543 的 offset 为 3730114，tick 为 55。使用Azahar与PokeReader的情况下，将有两个不同的offset与tick，选择使用其中一个组合即可。"})}),`
`,n.jsx(r,{slug:"/zh-emulator-sm-time-finder",children:n.jsx(e.p,{children:"默认的 offset（偏移）与 tick（时钟周期）值可能不适用。不同版本的 Citra 值不同，以下仅为示例：例如 Citra Nightly 1543 的 offset 为 4470937，tick 为 56。使用Azahar与PokeReader的情况下，将有两个不同的offset与tick，选择使用其中一个组合即可。"})}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 3DSTimeFinder，选择 Tools => Gen 7 Profile Calibrator。"}),`
`,n.jsx(e.li,{children:"选择你当前使用的游戏（SM 或 USUM）。"}),`
`,n.jsx(e.li,{children:"Offset 范围建议填写较小的值，例如 10。"}),`
`,n.jsx(e.li,{children:"Tick 范围建议填写较大的值，例如 50,000,000。"}),`
`,n.jsx(e.li,{children:"搜索可能需要一些时间，但最后会返回一个结果。请根据结果创建一个配置档。"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`说明：一旦找到一个可用结果，它的对等种子也会有相同的配置档，因此可以复制用于其他游戏版本。
`})}),`
`,n.jsx(e.h2,{children:"使用 Gen7TimeFinder"}),`
`,n.jsx(e.p,{children:"Gen7TimeFinder 是另一款用于替代 TimeFinder.js 的工具。"}),`
`,n.jsx(e.p,{children:"你可以选择对应类别（野生、定点、配信、TID/SID）并在主界面中填写搜索条件。确保使用了正确的配置档，然后开始查找对应分布（Spread）。稀有帧可以通过扩大时间范围来提高命中率。"}),`
`,n.jsx(e.p,{children:"若是 SOS 连锁战斗，请使用定点（Stationary）标签页。请注意此类情况在准备阶段会有大量帧推进，因此建议选择较远的目标帧。"}),`
`,n.jsx(e.p,{children:"一旦找到符合要求的结果，请记录对应的日期与时间。"}),`
`,n.jsx(e.h2,{children:"命中任意初始种子"}),`
`,n.jsx(e.p,{children:"要达到目标初始种子，只需在 Citra 设置中输入对应的 RTC 时间，保存后运行游戏即可。"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`说明：同样由于夏令时的缘故，若发现种子未命中，请尝试调整时间 ±1 小时，并重新启动游戏与 CitraRNG。
`})}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function c(i={}){const{wrapper:e}={...l(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(t,{...i})}):t(i)}function s(i,e){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,d as frontmatter};
