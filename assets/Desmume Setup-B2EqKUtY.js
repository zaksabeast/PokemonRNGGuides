import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CW60Ticg.js";var n=e(),r={title:`设置 Desmume`,description:`学习如何设置用于乱数操作的 DeSmuME，包括游戏卡带提取、存档导出以及 Lua 脚本的使用。`,slug:`zh-desmume-setup`,translation:{enSlug:`desmume-setup`,language:`zh`}};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`本教程将帮助你在 Windows 电脑上设置 DeSmuME 模拟器。Mac 与 Linux 用户可尝试使用 Wine 运行 DeSmuME.exe，但该方法不一定有效。导出 DS 游戏数据需要一台已刷入最新版 CFW（自定义固件）的 3DS 主机。目前也存在其他导出 DS 游戏的方法，但本教程不作介绍。`}),`
`,(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://sourceforge.net/projects/desmume/files/desmume/0.9.11/desmume-0.9.11-win32-dev.zip/download`,children:`Desmume v0.9.11`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://sourceforge.net/projects/luabinaries/files/5.1.5/Windows%20Libraries/Dynamic/lua-5.1.5_Win32_dll17_lib.zip/download`,children:`Lua dll`})}),`
`,(0,n.jsxs)(r.li,{children:[`Lua 脚本 - `,(0,n.jsx)(r.a,{href:`https://github.com/Real96/PokeLua/tree/main/Gen%204`,children:`Gen 4`}),` `,(0,n.jsx)(r.a,{href:`https://github.com/Real96/PokeLua/tree/main/Gen%205`,children:`Gen 5`})]}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://3ds.hacks.guide/`,children:`一台已刷入 CFW（自定义固件）的 3DS`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/d0k3/GodMode9/releases`,children:`最新版 Godmode9`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/FlagBrew/Checkpoint/releases`,children:`3DS 专用 Checkpoint`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`导出游戏数据`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`开机时按住 `,(0,n.jsx)(r.code,{children:`Start`}),` 键进入 GodMode9。`]}),`
`,(0,n.jsxs)(r.li,{children:[`选择 `,(0,n.jsx)(r.code,{children:`[C:] GAMECART`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`选中后缀为 `,(0,n.jsx)(r.code,{children:`.nds`}),` 的文件。`]}),`
`,(0,n.jsxs)(r.li,{children:[`选择 `,(0,n.jsx)(r.code,{children:`Copy to 0:/gm9/out`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`退出 GodMode9，将 `,(0,n.jsx)(r.code,{children:`sdmc:\\gm9\\out`}),` 目录下的 `,(0,n.jsx)(r.code,{children:`.nds`}),` 文件传输至电脑。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`导出卡带存档`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在 3DS 上运行 Checkpoint。`}),`
`,(0,n.jsx)(r.li,{children:`从 DS 游戏卡带中提取存档。`}),`
`,(0,n.jsxs)(r.li,{children:[`存档将保存至 `,(0,n.jsx)(r.code,{children:`sdmc:\\3ds\\Checkpoint\\saves`}),` 目录。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`设置 Desmume`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`下载 DeSmuME 与 Lua dll。`}),`
`,(0,n.jsxs)(r.li,{children:[`将 `,(0,n.jsx)(r.code,{children:`lua5.1.dll`}),` 重命名为 `,(0,n.jsx)(r.code,{children:`lua51.dll`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`将该 dll 文件放入 DeSmuME 可执行文件所在的同一文件夹。`}),`
`,(0,n.jsx)(r.li,{children:`下载对应游戏版本的 Lua 脚本。`}),`
`,(0,n.jsxs)(r.li,{children:[`打开 DeSmuME，点击 `,(0,n.jsx)(r.code,{children:`文件`}),`，选择 `,(0,n.jsx)(r.code,{children:`打开 ROM`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`加载从 DS 卡带导出的 `,(0,n.jsx)(r.code,{children:`.nds`}),` 文件。`]}),`
`,(0,n.jsxs)(r.li,{children:[`点击 `,(0,n.jsx)(r.code,{children:`工具`}),`，选择 `,(0,n.jsx)(r.code,{children:`Lua 脚本`}),`，再选择 `,(0,n.jsx)(r.code,{children:`新建 Lua 脚本窗口...`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`选中之前下载的 Lua 脚本。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`完成后，DeSmuME 应正常运行游戏并显示 RNG 相关信息。`}),`
`,(0,n.jsx)(r.h2,{children:`导入存档`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`点击 `,(0,n.jsx)(r.code,{children:`文件`}),`，选择 `,(0,n.jsx)(r.code,{children:`Import Backup Memory...`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`加载从 DS 卡带提取出的 `,(0,n.jsx)(r.code,{children:`.sav`}),` 存档文件。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`导出存档`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`点击 `,(0,n.jsx)(r.code,{children:`文件`}),`，选择 `,(0,n.jsx)(r.code,{children:`Export Backup Memory...`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[`为 `,(0,n.jsx)(r.code,{children:`.sav`}),` 存档命名并选择保存路径。`]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`每次重启游戏时，都需要在 Lua 窗口中点击 `,(0,n.jsx)(r.code,{children:`Restart`}),` 按钮。`]}),`
`,(0,n.jsxs)(r.p,{children:[`每次需要保存或读取即时存档时，先暂停游戏，再按住 `,(0,n.jsx)(r.code,{children:`Shift + F(n)`}),` / `,(0,n.jsx)(r.code,{children:`F(n)`}),`，直到下屏在一秒内显示 `,(0,n.jsx)(r.code,{children:`Saved State (n)`}),` / `,(0,n.jsx)(r.code,{children:`Loaded State (n)`}),` 提示。`]}),`
`,(0,n.jsxs)(r.p,{children:[`比如：`,(0,n.jsx)(r.code,{children:`Shift + F1`}),` 保存 1 号槽即时存档，`,(0,n.jsx)(r.code,{children:`F1`}),` 读取 1 号槽即时存档。`]}),`
`,(0,n.jsx)(r.h2,{children:`疑难解答`}),`
`,(0,n.jsx)(r.h3,{children:`未找到lua 51.dll`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Tools-and-Emulators/Desmume/Lua.png`,alt:`Lua Error`})}),`
`,(0,n.jsx)(r.p,{children:`若出现上图所示错误，说明缺少lua dll文件。请重新下载该文件，确保其与DeSmuME可执行文件放在同一文件夹，并核对文件名是否修改正确。`}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};