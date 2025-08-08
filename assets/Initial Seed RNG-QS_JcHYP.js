const n=`---
title: "初始种子乱数"
description: "如何使用 Dolphin 设置适用于所有 GameCube 游戏的初始种子乱数"
slug: "zh-gc-initial"
translation:
  enSlug: "gc-initial"
  language: "zh"
---

## 所需工具

- 支持 Lua 的 Dolphin 模拟器（仅在 Discord 提供）
- GameCube 专用的 Lua 脚本（仅在 Discord 提供）
- [PokeFinder](/pokefinder)
- RunAsDate（ 64 位）

## 简介

本指南将教你如何使用 Dolphin 与 Lua 脚本，对所有 GameCube 游戏（包括宝可梦 Channel）执行初始种子乱数操作。
掌握这一流程是理解本节中其他乱数教程的基础。

## 如何获取你的起始种子（Origin Seed）

起始种子是某一特定日期与时间下启动游戏时的初始种子，用来进行种子搜索校准。获取方法非常简单：

1. 打开 RunAsDate，将日期与时间设为 \`2000-01-01 00:00\`。
2. 使用此配置启动 Dolphin，加载游戏与 Lua 脚本。
3. 在 Lua 脚本窗口中记录显示的初始种子，这就是你的起始种子。

\`\`\`
注意：不同的游戏其起始种子是不同的。例如 Colosseum 与 XD 的起始种子不一样。建议记录每个游戏的起始种子以便下次使用，避免重复操作。
\`\`\`

## 方法一：进行一次初始种子乱数

现在你已经获得了起始种子，可以开始初始种子乱数操作。这一步的目的是找到某一特定目标种子在一定帧数范围内的初始种子。

1. 打开 PokeFinder，进入菜单：
   \`Gen 3 Tool\` > \`GameCube\` > \`GameCube RTC\`，填写以下字段：

   - Origin Seed：刚才获取到的起始种子
   - Target Seed：你想要达成的种子（可以通过 PokeFinder 或其他工具获取）
   - End Date：建议设定为未来几年内的日期，扩大搜索范围
   - Min Advance / Max Advance：设定推进范围，通常为 1000 左右，视具体目标而定

2. 点击开始搜索，等待出现搜索结果。
3. 找到合适结果后，记录其对应的时间（Time），并将其设为 RunAsDate 的启动时间。
4. 使用 RunAsDate 启动 Dolphin，加载游戏与 Lua 脚本。此时脚本中显示的初始种子应该与你选中的初始种子完全一致，说明乱数成功。

\`\`\`
注意：如果你是第一次接触 GameCube 乱数，可以随意挑选一个目标种子进行练习，以熟悉整个流程。
\`\`\`

## 特别鸣谢

- 中文翻译：炫夜鳞、白希洛/Hakuhiro
`;export{n as default};
