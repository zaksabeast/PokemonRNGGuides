import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-BWlJUHS5.js";var n=e(),r=[{title:`究极之日和究极之月 实机乱数`,description:`在不使用自制系统的情况下，于究极之日与究极之月中进行宝可梦个体值乱数。`,slug:`zh-retail-usum-no-cfw`,translation:{enSlug:`retail-usum-no-cfw`,language:`zh`}},{title:`太阳和月亮 实机乱数`,description:`在不使用自制系统的情况下，于太阳与月亮中进行宝可梦个体值乱数。`,slug:`zh-retail-sm-no-cfw`,translation:{enSlug:`retail-sm-no-cfw`,language:`zh`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`计算器：`,(0,n.jsx)(r.a,{href:`https://github.com/wwwwwwzx/3DSRNGTool/releases`,children:`3DSRNGTool`})]}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mystic-timer`,children:`Mystic Timer`})}),`
`,(0,n.jsxs)(r.li,{children:[`如果你想进行异色宝可梦乱数，需要知道自己的 TSV。非破解系统可通过对战录像来确认 TSV，参见：`,(0,n.jsx)(r.a,{href:`https://www.reddit.com/r/SVExchange/wiki/keysave`,children:`https://www.reddit.com/r/SVExchange/wiki/keysave`})]}),`
`,(0,n.jsx)(r.li,{children:`持有闪耀护符可以提高命中异色帧的概率`}),`
`,(0,n.jsx)(r.li,{children:`可能需要使用摄像机来记录继续画面时钟指针的位置`}),`
`,(0,n.jsx)(r.li,{children:`1% 运气 + 99% 耐心！`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`机制说明`}),`
`,(0,n.jsx)(r.h3,{children:`帧 与 F`}),`
`,(0,n.jsx)(r.p,{children:`在本教程中，3DSRNGTool 结果列表中的一行称为一帧。当你在某一帧触发战斗或领取宝可梦时，称为命中该帧。`}),`
`,(0,n.jsx)(r.p,{children:`F 表示现实时间单位：1F = 1/60 秒，这是第三世代与 Mystic Timer 中使用的表示方式。`}),`
`,(0,n.jsx)(r.h3,{children:`定时器设定`}),`
`,(0,n.jsx)(r.p,{children:`你可以使用任何支持双阶段设定的定时器。总等待时间 = 预定时（A 段）+ 待机时间（B 段）`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`A 段：由游戏加载、边缘帧推进以及人为反应时间造成的系统性误差`}),`
`,(0,n.jsx)(r.li,{children:`B 段：从起始帧到目标帧的时间，取决于 Seed 与目标帧`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`步骤 1：设置 Mystic Timer`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Sun-Moon/No-CFW/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsx)(r.p,{children:`本教程使用 Mystic Timer 的第三世代模式。`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Pre-Timer：单位为毫秒。例如 2133 表示 2.133 秒，老款 3DS 通常约为 3100，新款 3DS 通常约为 2500`}),`
`,(0,n.jsx)(r.li,{children:`Target Frame：单位为 F（1/60 秒）。例如 3600 表示 60 秒，该数值不同于 3DSRNGTool 中的目标帧，需要通过 3DSRNGTool 将第七世代帧数换算为 F`}),`
`,(0,n.jsx)(r.li,{children:`Lag：单位为毫秒，会被加到总时间中`}),`
`,(0,n.jsx)(r.li,{children:`Frame Hit：单位为 F，在校准时输入实际命中的帧数并点击更新，用于重新计算 Lag`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`总结公式：总等待时间（秒）= (Pre-Timer + Lag) / 1000 + Target Frame / 60`}),`
`,(0,n.jsx)(r.h2,{children:`步骤 2：准备工作`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`准备一只同步特性的首位宝可梦、辅助捕捉用宝可梦，以及足够的精灵球`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`在目标宝可梦或发放宝可梦的 NPC 前存档`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`究极之洞传说宝可梦：尽量贴近目标站立`}),`
`,(0,n.jsx)(r.li,{children:`神秘礼物：站在 1 号道路宝可梦中心的配送员背后以减少 NPC 数量`}),`
`,(0,n.jsx)(r.li,{children:`野生与游荡究极异兽：站在 NPC 数量最少的指定位置`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`步骤 3：设置 3DSRNGTool`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`在右上角输入游戏版本与 TSV，若持有闪耀护符请勾选`}),`
`,(0,n.jsxs)(r.li,{children:[`设置要进行乱数的宝可梦`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`定点或野生遭遇：选择类别并指定宝可梦`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`通常无需修改延迟等其他参数，部分干扰可由 Pre-Timer 吸收抵消`}),`
`,(0,n.jsx)(r.li,{children:`第一次在究极之洞中遭遇究极异兽时，可选择"UB（首次遭遇）"，但不推荐，因延迟不稳定`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`神秘礼物：根据目标活动修改配信设置`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`可在此处获取 WonderCard 文件（.wc7）：`,(0,n.jsx)(r.a,{href:`https://github.com/projectpokemon/EventsGallery`,children:`https://github.com/projectpokemon/EventsGallery`}),`将文件拖入 3DSRNGTool 可自动填写设定`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`步骤 4：加载游戏或软重置`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`同时按下 `,(0,n.jsx)(r.code,{children:`L`}),` + `,(0,n.jsx)(r.code,{children:`R`}),` + `,(0,n.jsx)(r.code,{children:`Select`}),` / `,(0,n.jsx)(r.code,{children:`Start`}),` 进行软重置`]}),`
`,(0,n.jsx)(r.li,{children:`若失败，请从第 0 步重新开始，重新启动游戏会改变初始 Seed`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`步骤 5：通过继续画面的时钟指针确定初始 Seed`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`参考此页面：`,(0,n.jsx)(r.a,{href:`https://www.reddit.com/r/SVExchange/wiki/keysave`,children:`https://www.reddit.com/r/SVExchange/wiki/keysave`})]}),`
`,(0,n.jsx)(r.li,{children:`当工具得到一个 Seed 后，主窗口会自动更新，同时时间计算器中的起始帧也会更新（417 / 477 + 观察到的指针帧数）`}),`
`,(0,n.jsx)(r.li,{children:`再次确认 Seed，绝大多数失败都源于 Seed 错误`}),`
`,(0,n.jsx)(r.li,{children:`不要进入游戏，停在继续游戏画面`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`步骤 6：寻找目标帧`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`设置筛选条件`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`仅准确帧：非零 NPC 时出现，建议用于初始校准`}),`
`,(0,n.jsx)(r.li,{children:`仅眨眼帧：零 NPC 时出现，该帧可持续约 1 秒，容易命中但较为稀少`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`设置合理的帧数范围，右键点击目标帧并设为目标帧`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`第七世代主乱数工具会同步更新`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`步骤 7：计算等待时间并设置计时器`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`返回主乱数工具，确认右下角信息已更新后点击计算`}),`
`,(0,n.jsx)(r.li,{children:`弹窗会显示"计时器设置为 XXXXF (YY.YYs) Z"，将 XXXX 设为 Mystic Timer 的 Target Frame，Z 表示该目标帧可持续时间，Blink 帧应大于 30`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`步骤 8：在继续画面按 A 并同时启动计时器`}),`
`,(0,n.jsxs)(r.p,{children:[`在最终画面等待计时器结束，`,(0,n.jsx)(r.strong,{children:`保持专注！`})]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`按 `,(0,n.jsx)(r.code,{children:`A`}),` 触发的战斗或领取：尽快进入最终画面`]}),`
`,(0,n.jsxs)(r.li,{children:[`一步触发的战斗：打开 `,(0,n.jsx)(r.code,{children:`X`}),` 菜单冻结角色移动`]}),`
`,(0,n.jsxs)(r.li,{children:[`使用甜甜蜜触发的野生战斗：打开 `,(0,n.jsx)(r.code,{children:`X`}),` 菜单并停在包包界面`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`步骤 9：计时器结束时触发生成`}),`
`,(0,n.jsxs)(r.p,{children:[`按 `,(0,n.jsx)(r.code,{children:`A`}),` 触发宝可梦生成。`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`若最终操作为移动一步：在计时器结束前约 2–3 秒关闭 `,(0,n.jsx)(r.code,{children:`X`}),` 菜单，并在结束瞬间推动摇杆`]}),`
`,(0,n.jsx)(r.li,{children:`野生遭遇：使用甜甜蜜，包包界面中乱数会停止，无需着急`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`步骤 10：若未获得目标宝可梦`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`调整 Pre-Timer 并从步骤 3 重新开始`}),`
`,(0,n.jsx)(r.li,{children:`勾选通过能力值，输入实际获得宝可梦的能力值，在乱数信息中勾选 ±100 帧并重新计算`}),`
`,(0,n.jsxs)(r.li,{children:[`查看偏差/F 列`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`若在 -4F 至 4F 之间，属正常波动，可重新寻找 Seed`}),`
`,(0,n.jsxs)(r.li,{children:[`若偏差较大，如 +12F，说明触发过晚`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`计算方式：12 / 60 × (-1000) = -200，将其加到 Pre-Timer`}),`
`,(0,n.jsx)(r.li,{children:`或将 Target Frame + 12 填入 Frame Hit 并点击设置计时器`}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：Pre-Timer 的校准是第七世代实机乱数的关键。
更换目标时可能需要重新校准。
`})}),`
`,(0,n.jsx)(r.h2,{children:`补充说明`}),`
`,(0,n.jsx)(r.h3,{children:`QR 方法`}),`
`,(0,n.jsx)(r.p,{children:`该方法用于需要命中高帧数的情况。`}),`
`,(0,n.jsx)(r.p,{children:`先在圆庆广场或好奥乐市消耗大量帧数，再通过 QR 扫描器确认当前帧。`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Sun-Moon/No-CFW/QR-Scanner.png`,alt:`QR Scanner`})}),`
`,(0,n.jsx)(r.p,{children:`在主乱数工具中勾选通过 QR 定位当前帧，输入指针序列获取结果`}),`
`,(0,n.jsx)(r.p,{children:`时间计算器的起始帧会同步更新。`}),`
`,(0,n.jsx)(r.p,{children:`随后在步骤 4 中退出 QR 扫描并同时启动计时器。`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`注意：该方法可在长时间等待下减少系统误差。
`})}),`
`,(0,n.jsx)(r.h3,{children:`NPC 数量测定`}),`
`,(0,n.jsx)(r.p,{children:`若结果与目标偏差较大，可能需要调整 NPC 数量，尤其是电束木、玛机雅娜与部分野外点位。`}),`
`,(0,n.jsx)(r.p,{children:`可通过修改时间计算器中的 NPC 数量，观察哪一数值最接近实际等待时间`}),`
`,(0,n.jsx)(r.p,{children:`或通过 QR 方法测量帧消耗。`}),`
`,(0,n.jsx)(r.h3,{children:`电束木`}),`
`,(0,n.jsx)(r.p,{children:`由于背景中电束木移动，每 10.7 秒 NPC 数量会在 1 与 2 之间变化。建议流程如下：`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`站在它身后进行存档，可获得更长的判定窗口（约 7 秒，针对 1 名 NPC）。`}),`
`,(0,n.jsxs)(r.li,{children:[`找到初始seed，加载游戏，并尽快打开 `,(0,n.jsx)(r.code,{children:`X`}),` 菜单。`]}),`
`,(0,n.jsxs)(r.li,{children:[`使用 QR 指针统计 NPC 数量，确保只有 1 名 NPC。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`关闭 `,(0,n.jsx)(r.code,{children:`X`}),` 菜单，等待数秒后重新打开，以刷新场景状态。`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`保持 `,(0,n.jsx)(r.code,{children:`X`}),` 菜单打开，等待接近目标帧。`]}),`
`,(0,n.jsxs)(r.li,{children:[`退出 `,(0,n.jsx)(r.code,{children:`X`}),` 菜单并迅速触发战斗，避免 NPC 状态发生变化。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：炫夜鳞、白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};