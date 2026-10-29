import{t as e}from"./jsx-runtime-CLxixnhA.js";import{S as t}from"./index-jzB9fByq.js";var n=e(),r={title:`传说 阿尔宙斯大大大量出现乱数`,navDrawerTitle:`大大大量出现乱数`,description:`使用 Sysbot 与 PermuteMMO，在传说 阿尔宙斯的大大大量出现中寻找异色宝可梦。`,slug:`zh-sysbot-lpa-mmo`,translation:{enSlug:`sysbot-lpa-mmo`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`已安装自制固件及 sysbot 的 Switch`}),`
`,(0,n.jsxs)(r.li,{children:[`传说 阿尔宙斯存档中的 `,(0,n.jsx)(r.code,{children:`main`}),` 文件`]}),`
`,(0,n.jsx)(r.li,{children:`Kaphotics 制作的 PermuteMMO`}),`
`,(0,n.jsxs)(r.li,{children:[`EzPzStreamz 制作的 `,(0,n.jsx)(r.a,{href:`https://github.com/SteveCookTU/mmo_data_dumper/releases/tag/v0.1.0`,children:`MMO Data Dumper`})]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`建议将 MMO Data Dumper 与 PermuteMMO 放在同一个文件夹中，方便自动更新所需文件。也要将 `,(0,n.jsx)(r.code,{children:`main`}),` 存档放入 PermuteMMO 文件夹，以正确计算各宝可梦的异色判定次数。`]}),`
`,(0,n.jsx)(r.h2,{children:`介绍`}),`
`,(0,n.jsx)(r.p,{children:`传说 阿尔宙斯的大大大量出现（MMO）乱数比较直接。本指南介绍 PermuteMMO 的设置、所需数据的获取及基本操作，默认你已正确配置 sysbot。`}),`
`,(0,n.jsx)(r.h2,{children:`准备工作`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在游戏中确认有可用的大大大量出现。`}),`
`,(0,n.jsx)(r.li,{children:`留在祝庆村，暂停游戏。`}),`
`,(0,n.jsxs)(r.li,{children:[`在工具文件夹中通过 `,(0,n.jsx)(r.code,{children:`CMD`}),` 运行 MMO Data Dumper。命令格式为 `,(0,n.jsx)(r.code,{children:`"{file_name} {ip}"`}),`，其中 `,(0,n.jsx)(r.code,{children:`{file_name}`}),` 是程序文件名，通常为 `,(0,n.jsx)(r.code,{children:`mmo_data_dumper.exe`}),`，`,(0,n.jsx)(r.code,{children:`{ip}`}),` 是 Switch 的 IP 地址。运行后会在 PermuteMMO 文件夹中生成 `,(0,n.jsx)(r.code,{children:`mo.bin`}),` 和 `,(0,n.jsx)(r.code,{children:`mmo.bin`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`运行 PermuteMMO，查看大量出现数据及可能的异色结果，找到目标后准备推进。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`容易逃跑的宝可梦操作起来较麻烦，建议先选择会主动攻击的目标。必要时可以保存并重置。不要进入目标地图后再次运行导出工具；应在村子中保存，失败后重新读取存档。`}),`
`,(0,n.jsx)(r.h2,{children:`乱数操作`}),`
`,(0,n.jsx)(r.p,{children:`需要按照 PermuteMMO 给出的操作序列推进，例如“A3”。其中数字表示通过多只同时参与的战斗等方式，让多少只宝可梦从场上消失。`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`A（Aggressive）`}),`：攻击型推进，最容易操作。A4 表示在一场战斗中击败 4 只宝可梦。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`B（Beta）`}),`：混合容易逃跑与会主动攻击的宝可梦进行推进。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`O（Oblivious）`}),`：适合魔墙人偶、大舌头、鲤鱼王等不会主动攻击的宝可梦。O2 表示击败 1 只此类宝可梦及 1 只攻击型宝可梦。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`S（Scaring）`}),`：惊吓容易逃跑的宝可梦。出现红色“!”后，等其逃跑，再使用快速移动。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`G（Ghost）`}),`：场上只剩 4 只宝可梦时触发的幽灵生成。G3 表示让 3 只宝可梦消失，离开一段距离，再返回。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`CR`}),`：有第二波时，清理剩余宝可梦以进入第二波。`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`按序列执行，就能在正确时机遇到目标！`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};