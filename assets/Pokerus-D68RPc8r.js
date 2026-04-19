import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-CvakMO0A.js";var n=e(),r=[{title:`绿宝石的宝可病毒`,description:`如何感染宝可病毒`,slug:`zh-emerald-pokerus-emu`,translation:{enSlug:`emerald-pokerus-emu`,language:`zh`}},{title:`红蓝宝石的宝可病毒`,description:`如何感染宝可病毒`,slug:`zh-rs-pokerus-emu`,translation:{enSlug:`rs-pokerus-emu`,language:`zh`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components},{Gist:i,ShowIf:a,YouTubeVideo:s}=r;return i||o(`Gist`,!0),a||o(`ShowIf`,!0),s||o(`YouTubeVideo`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:`要点：如何感染宝可病毒`}),`
`,(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA`})}),`
`,(0,n.jsxs)(r.li,{children:[`Download `,(0,n.jsx)(r.a,{href:`https://raw.githubusercontent.com/RainingChain/pk_emu_scripts/refs/heads/main/Gen3/pokerus.lua`,children:`Pokérus lua script`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`关于宝可病毒`}),`
`,(0,n.jsx)(r.p,{children:`在每场野生战斗结束后，有 1 / 21845 的几率让你的宝可梦感染宝可病毒。感染后，战斗获得的努力值（EV）将加倍。宝可病毒在某些低等级最优化的宝可梦（例如带有龙之怒的 5 级图图犬）中是必要条件。`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/pokerus.png`,alt:`感染宝可病毒的宝可梦`})}),`
`,(0,n.jsx)(r.h2,{children:`第一步：设置`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(a,{slug:`/zh-emerald-pokerus-emu`,children:`打开 mGBA。`}),`
`,(0,n.jsx)(a,{slug:`/zh-rs-pokerus-emu`,children:(0,n.jsx)(r.p,{children:`打开 mGBA。请确保关闭了“实时时钟”（路径为 Tools -> Game overrides...）。`})}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`启动游戏并加载 `,(0,n.jsx)(r.code,{children:`pokerus.lua`}),` 脚本。`]}),`
`,(0,n.jsxs)(r.li,{children:[`使用 `,(0,n.jsx)(r.code,{children:`Ctrl + R`}),` 重启游戏。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：校准`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`进入一场野生宝可梦战斗，将敌方宝可梦击倒。`}),`
`,(0,n.jsx)(r.li,{children:`当出现“XXX 获得了 YY 经验值。”的提示时，使用即时存档保存当前状态。`}),`
`,(0,n.jsxs)(r.li,{children:[`使用 `,(0,n.jsx)(r.code,{children:`Ctrl + P`}),` 暂停游戏。`]}),`
`,(0,n.jsx)(r.li,{children:`在脚本窗口中记下当前的乱数帧数。`}),`
`,(0,n.jsxs)(r.li,{children:[`按住 `,(0,n.jsx)(r.code,{children:`A`}),`，同时在暂停状态下按 `,(0,n.jsx)(r.code,{children:`Ctrl + P`}),` 取消暂停游戏。`]}),`
`,(0,n.jsx)(r.li,{children:`如果脚本窗口显示当前战斗无法生成宝可病毒，请结束战斗并返回校准的第一步。`}),`
`,(0,n.jsx)(r.li,{children:`否则，将第四步中记录的当前帧数与脚本窗口中显示的“Advance Difference”（帧差）相加，得出目标帧。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第三步：命中目标`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`重新加载之前在战斗中的即时存档，使用 `,(0,n.jsx)(r.code,{children:`Ctrl + N`}),` 单步推进帧数，直到当前帧数与上一步计算出的目标帧一致。`]}),`
`,(0,n.jsxs)(r.li,{children:[`一旦对齐，按住 `,(0,n.jsx)(r.code,{children:`A`}),`，同时按 `,(0,n.jsx)(r.code,{children:`Ctrl + P`}),` 取消暂停游戏。`]}),`
`,(0,n.jsx)(r.li,{children:`战斗结束后检查所有宝可梦的状态，确认是否有宝可梦感染了宝可病毒。`}),`
`]}),`
`,(0,n.jsx)(s,{id:`ySpe6-4xCNc`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`教程与脚本：RainingChain.`}),`
`,(0,n.jsx)(r.li,{children:`脚本灵感来源：Real96.`}),`
`,(0,n.jsxs)(r.li,{children:[`反编译项目：`,(0,n.jsx)(r.a,{href:`https://github.com/pret/pokeemerald`,children:`pret 团队`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};