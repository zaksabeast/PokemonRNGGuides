var e=`---
title: "设置 Ryujinx 与 Cheat Engine"
navDrawerTitle: "设置 Ryujinx"
description: "设置 Ryujinx 或 Yuzu 及 Cheat Engine，通过 Lua 脚本辅助晶灿钻石/明亮珍珠乱数。"
slug: "zh-bdsp-emulator-setup"
translation:
  enSlug: "bdsp-emulator-setup"
  language: "zh"
---

## 所需工具

- [Ryujinx](https://ryujinx.app/download)
- [Cheat Engine](https://www.cheatengine.org/downloads.php)
- [BDSP_RNG.lua](https://github.com/Real96/BDSP-CheatEngine-Lua)
- 已更新到 1.1.1 或以上版本的游戏

## 操作流程

1. 打开 Ryujinx，运行游戏，在标题画面暂停。
2. 打开 Cheat Engine，进入 \`Edit > Settings\`，选择“Scan Settings”，勾选 \`MEM_MAPPED\`。
3. 点击 \`File > Open Process\`，选择 Yuzu 或 Ryujinx 进程。
   - Yuzu 的格式类似 \`xxxx-yuzu xxx | game name\`。
   - Ryujinx 的格式类似 \`xxxx-Ryujinx x.x.xxxx - game name\`。
4. 点击 \`Table > Show Cheat Table Lua Script\`，打开“Lua Script: Cheat Table”窗口。
5. 打开对应游戏版本的 \`BDSP_RNG.lua\`，复制全部内容，粘贴到刚才的窗口。
6. 点击“Execute Script”。程序可能暂时卡住，等待新的窗口输出乱数信息即可。

## 注意事项

- 按脚本输出中显示的按键，可以切换信息页面。
- 停止脚本需要按下 \`0\` 或 \`NumPad 0\`，否则脚本会继续运行。
- 如果要重启游戏，需要按上述步骤重新操作，并重启游戏与脚本，否则脚本无法正常工作。
- 将“Lua Engine”窗口拉大，避免文字闪烁。

## 接下来做什么？

可以尝试异色御三家或传说宝可梦：[晶灿钻石/明亮珍珠定点乱数指南](/cfw-bdsp-stationary)。

## 特别鸣谢

- 中文翻译：白希洛/Hakuhiro
`;export{e as default};