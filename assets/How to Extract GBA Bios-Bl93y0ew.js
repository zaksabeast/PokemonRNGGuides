import{E as l,j as n}from"./index-DUNg2-w9.js";const c=[{title:"GBA BIOS 文件 - 它是什么以及如何提取给模拟器使用",description:"了解什么是GBA BIOS，为什么模拟器（如mGBA、VBA）需要它，以及如何从实机中合法提取它。",slug:"zh-misc-dolphin-gba-bios",translation:{enSlug:"misc-dolphin-gba-bios",language:"zh"}}];function s(i){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...l(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"什么是GBA BIOS?"}),`
`,n.jsx(e.p,{children:"GBA BIOS 是一个小型文件（16 KB），包含 Game Boy Advance 的内置固件。它负责处理低级系统任务，例如："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"启动游戏。"}),`
`,n.jsx(e.li,{children:"运行某些图形和声音功能。"}),`
`,n.jsx(e.li,{children:"管理存档类型和重启操作。"}),`
`]}),`
`,n.jsx(e.p,{children:"许多模拟器需要 GBA BIOS 文件才能正确运行游戏。如果没有它，可能会遇到错误、缺失的图形或异常行为。本指南展示了两种合法方法自行提取 GBA BIOS。"}),`
`,n.jsx(e.h2,{children:"所需工具"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"一台安装了自定义固件（CFW）的3DS，并至少有一个来自eShop的VC游戏（GB, GBC 或 NES）。"}),`
`,n.jsx(e.li,{children:"或者，一台已破解的Wii，配合GBA与GameCube的联机线，以及一台GBA或GBASP。"}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"https://3ds.hacks.guide/",children:"https://3ds.hacks.guide/"})," 有安装 CFW 的详细指南。"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"https://wii.hacks.guide/",children:"https://wii.hacks.guide/"})," 有破解 Wii 的步骤。"]}),`
`]}),`
`,n.jsx(e.h2,{children:"使用NES/GB/GBC的VC游戏和3DS破解机"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["启动GodMode9并按下",n.jsx(e.code,{children:"A"}),'进入"SYSNAND SD"。']}),`
`,n.jsxs(e.li,{children:["同时按住",n.jsx(e.code,{children:"R"}),"和",n.jsx(e.code,{children:"A"}),"，然后按下",n.jsx(e.code,{children:"A"}),'选择"Search for Titles"来查看所有标题。']}),`
`,n.jsxs(e.li,{children:["搜索你的NES/GB/GBC VC游戏（标题后缀为.tmd），然后按下",n.jsx(e.code,{children:"A"}),"。"]}),`
`,n.jsxs(e.li,{children:['选择 "TMD files option.." ，然后选择 "Build CIA (Standard)"。生成的.CIA文件会保存到SD卡的',n.jsx(e.code,{children:"/gm9/out/"}),"目录下。"]}),`
`,n.jsxs(e.li,{children:["进入",n.jsx(e.code,{children:"/gm9/out/"}),"文件夹，按下",n.jsx(e.code,{children:"A"}),'选择对应VC游戏，然后选择"CIA image options..."。']}),`
`,n.jsxs(e.li,{children:['选择"Mount image to drive"，并按下',n.jsx(e.code,{children:"A"}),"确认。"]}),`
`,n.jsxs(e.li,{children:["按下",n.jsx(e.code,{children:"A"}),'选择"0000.00000002"，然后按下',n.jsx(e.code,{children:"A"}),'选择"romfs".']}),`
`,n.jsxs(e.li,{children:['找到"agb.bin"的文件按',n.jsx(e.code,{children:"A"}),'选择，然后选择"Copy to 0:/gm9/out"。']}),`
`,n.jsxs(e.li,{children:["此时，GBA BIOS文件已保存到",n.jsx(e.code,{children:"/gm9/out"}),"。将此文件复制到电脑，重命名为",n.jsx(e.code,{children:"GBA.BIOS"}),"，并将其放入模拟器所在文件夹。"]}),`
`]}),`
`,n.jsx(e.h2,{children:"使用破解的Wii"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["下载最新版",n.jsx(e.a,{href:"https://github.com/FIX94/gba-link-cable-dumper/releases",children:"GBA Link Cable Dumper"}),"。解压文件并将其放入主机SD卡的",n.jsx(e.code,{children:"apps"}),"文件夹，路径为",n.jsx(e.code,{children:"apps/gba-gc-link-dumper/boot.dol"}),"。"]}),`
`,n.jsx(e.li,{children:"启动主机进入Homebrew Launcher并运行GBA Link Cable Dumper。"}),`
`,n.jsx(e.li,{children:"按照提示，将 GBA与GameCube的联机线插入 Wii 的 GameCube 手柄插槽。"}),`
`,n.jsx(e.li,{children:"连接GBA/GBASP并开机。"}),`
`,n.jsxs(e.li,{children:["等待程序加载后，按下 ",n.jsx(e.code,{children:"Y"})," 键开始转储 GBA BIOS。"]}),`
`,n.jsx(e.li,{children:"完成后关闭主机并取出 SD 卡。"}),`
`,n.jsxs(e.li,{children:["GBA BIOS 文件位于",n.jsx(e.code,{children:"/dumps/gba_bios.bin"}),"."]}),`
`,n.jsxs(e.li,{children:["将此文件复制到电脑，重命名为",n.jsx(e.code,{children:"GBA.BIOS"}),"，并将其放入模拟器所在文件夹。"]}),`
`]}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：白希洛/Hakuhiro。"}),`
`]})]})}function r(i={}){const{wrapper:e}={...l(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(s,{...i})}):s(i)}export{r as default,c as frontmatter};
