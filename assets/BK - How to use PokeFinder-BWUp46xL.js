var e=`---
title: "晶灿钻石/明亮珍珠 PokeFinder 设置"
navDrawerTitle: "PokeFinder 设置"
description: "逐步设置 PokeFinder，用于晶灿钻石/明亮珍珠的异色与其他乱数。"
slug: "zh-bdsp-pokefinder"
translation:
  enSlug: "bdsp-pokefinder"
  language: "zh"
---

## 所需工具

- [PokeFinder](/pokefinder)
- 未破解主机使用 [Project Xs](https://github.com/Lincoln-LM/Project_Xs)
- 已破解主机使用 [CaptureSight](/install-capturesight)

## 设置配置档案

PokeFinder 可以为每个存档保存独立的配置档案，记录 TID/SID 等信息。每个存档只需输入一次，之后重启 PokeFinder 也能继续使用。

1. 打开 PokeFinder，进入 \`Gen 8 Tools -> Profile Manager\`。
2. 点击“New”，填写所需信息，创建游戏配置档案。
   - TID 和 SID 使用 CaptureSight 或 PKHeX 显示的 5 位数值。PKHeX 中可将光标移到 TID 栏上查看。
   - 每个配置档案只需设置一次。

## 菜单选项

PokeFinder 主界面按世代列出不同乱数类型，应根据目标宝可梦选择对应项目。

- Static：场景中的定点宝可梦、游走宝可梦及赠送宝可梦。
- Wild：草丛、冲浪等方式遭遇的野生宝可梦。
- Event：通过神秘礼物获得的宝可梦。
- Egg：从寄放屋领取的蛋。
- TID/SID：搜索想要通过乱数获得的 TID/SID。

## 乱数种子

### 未破解主机

按照 [GitHub ReadMe](https://github.com/Lincoln-LM/Project_Xs?tab=readme-ov-file#how-to-run) 设置 Project Xs。

需要帮助时，可以加入 [Pokemon RNG Discord](https://www.discord.gg/d8JuAvg)。

### 已破解主机

不同乱数窗口中有 Seed 0 和 Seed 1 两个输入栏。CaptureSight 则显示 4 个种子，需要按以下方式拼接后填入 PokeFinder：

- PokeFinder 的 Seed 0 = CaptureSight 的 Seed 0 与 Seed 1。
- PokeFinder 的 Seed 1 = CaptureSight 的 Seed 2 与 Seed 3。

## 特别鸣谢

- 中文翻译：白希洛/Hakuhiro
`;export{e as default};