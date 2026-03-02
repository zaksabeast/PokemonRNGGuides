import{g9 as c,j as n}from"./index-iFRrEfrl.js";const s={title:"欧米伽红宝石与阿尔法蓝宝石 DexNav 乱数",description:"学习如何在《欧米伽红宝石 / 阿尔法蓝宝石》中利用 DexNav 功能进行宝可梦乱数。",slug:"zh-emulator-oras-dexnav",translation:{enSlug:"emulator-oras-dexnav",language:"zh"}};function i(r){const e={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...c(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Citra（支持即时存档的版本）w/ CitraRNG"}),`
`,n.jsx(e.li,{children:"3DSRNGTool（Real96 分支，用于 TimeFinder）"}),`
`,n.jsx(e.li,{children:"可选：用于特定目标的 TimeFinder"}),`
`]}),`
`,n.jsx(e.h2,{children:"步骤 1：前期准备"}),`
`,n.jsx(e.p,{children:"前往你打算进行乱数、并会出现目标宝可梦的地点，并使用驱虫喷雾。这有助于提高总体遭遇效率，也能增加出现蛋招式与高个体值的概率。"}),`
`,n.jsxs(e.p,{children:[`接下来，寻找一个目标帧。你可以使用 TimeFinder（链接稍后提供），或者使用旧方法通过反复重置来获取初始 Seed。
由于 3DSRNGTool 中并没有 DexNav 专用的乱数模式，请前往“普通野生”栏目，并将延迟设置为 `,n.jsx(e.code,{children:"217"}),"。这是 DexNav 乱数中较长且常见的默认延迟，有助于避免跳帧。"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`设置帧数范围时，务必将最小帧数设得较高。由于你需要先触发一次 DexNav 遭遇，这个过程本身就会消耗时间。
建议将最小帧数至少设为 \`5000\`。
如果该地区范围较小，或 DexNav 搜索较困难，可以考虑设置得更高。
`})}),`
`,n.jsx(e.h2,{children:"步骤 2：操作流程"}),`
`,n.jsx(e.p,{children:"当你确定了目标帧后，请务必将其设为 Target Frame。由于延迟是随机的，追踪目标帧非常重要。"}),`
`,n.jsx(e.p,{children:`进入游戏后，迅速打开背包并创建一个即时存档。这个存档将用于乱数的第一阶段，即触发遭遇。
存档完成后，关闭背包并点击“搜索”。你很可能不会立刻找到宝可梦，这是正常的。
随后移动角色，再次打开背包，创建新的即时存档（也可以覆盖之前的，但不要越过目标帧），关闭背包，再次搜索。
重复以上流程，直到成功触发遭遇。`}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`如果你需要特定的蛋招式或其他条件，请在触发遭遇后确认该宝可梦是否符合要求，因为这些要素与主要乱数因素是相互独立的。
你可以反复创建即时存档，直到刷出符合条件的宝可梦为止。
`})}),`
`,n.jsx(e.p,{children:`在成功触发一次遭遇后，重新加载你在背包中的即时存档。
在这种“连锁开始”的状态下，不需要使用 TinyMT——只需保持在背包界面中推进帧数，直到接近目标帧即可。
为了降低失败风险，可以根据需要创建多个即时存档。`}),`
`,n.jsxs(e.p,{children:["接下来的目标是以 ",n.jsx(e.code,{children:"217"}),` 延迟命中目标帧。
请在目标帧之前几百帧关闭背包，推荐在提前 `,n.jsx(e.code,{children:"150"}),` 帧左右时进行。
如果提前得太多，可能会导致无法成功触发遭遇，从而使乱数失败。
返回主画面后，点击并按住“搜索”，然后暂停游戏。`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`如果操作不够谨慎，这个流程会显得相当繁琐，因此可以考虑放慢游戏速度，或逐帧推进来操作。
`})}),`
`,n.jsx(e.p,{children:"在按住搜索按钮的同时，逐帧推进，直到抵达目标帧。"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`在推进帧数的过程中，鼠标必须持续点击搜索按钮。
如果游戏处于暂停状态且你没有推进帧数，可以暂时停止点击。
一开始可能会觉得有些混乱，但熟悉之后就能顺利操作。
`})}),`
`,n.jsx(e.p,{children:`当到达目标帧时，解除暂停并停止点击。这将会在精确的帧数上触发遭遇。
既然你已经确认成功触发遭遇，接下来靠近宝可梦并进入战斗即可。`}),`
`,n.jsx(e.p,{children:"如果宝可梦结果符合预期，恭喜，你已经成功完成 DexNav 乱数。"}),`
`,n.jsxs(e.p,{children:[`不过，很多情况下你可能无法一次就得到理想结果。DexNav 乱数的延迟是浮动的，虽然相对稳定，但会受到搜索动画时长的影响。
常见的延迟包括 `,n.jsx(e.code,{children:"137"}),"、",n.jsx(e.code,{children:"177"})," 与 ",n.jsx(e.code,{children:"217"}),"，其他数值通常也会落在 ",n.jsx(e.code,{children:"130-250"})," 帧之间。"]}),`
`,n.jsx(e.p,{children:`如果出现偏差，请记录宝可梦的个体值，并对照你实际命中的延迟。
随后调整延迟设置，重新加载即时存档并再次尝试。
反复修正后，最终应当可以成功命中目标；如果仍未成功，请继续微调延迟。`}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function l(r={}){const{wrapper:e}={...c(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(i,{...r})}):i(r)}export{l as default,s as frontmatter};
