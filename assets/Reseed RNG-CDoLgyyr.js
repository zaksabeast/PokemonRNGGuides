const n=`---
title: "利用绘画重置种子"
description: "利用绘画重置乱数，从而快速获得目标宝可梦，而无需长时间等待"
slug: "zh-emerald-painting-rng"
translation:
  enSlug: "emerald-painting-rng"
  language: "zh"
---

## 所需工具

- [支持 Lua 脚本的 mGBA](/mgba-setup)
- [PokeFinder](/pokefinder)

## 介绍

在游戏中查看特定画作（例如水静华丽大赛会场的画）会导致乱数重新种子化，其新种子值基于游戏的帧计数器。

利用画作重置乱数，可以有效避免高推进数带来的漫长等待。通常情况下，游戏具有固定的初始种子，每次游戏启动后都会按照相同的顺序生成随机数。而通过这个方法，可以人为改变乱数的初始状态。

此外，此方法还可以与对战录像配合使用，以在查看画作后保存新的乱数状态。

该方法同样适用于《红宝石》和《蓝宝石》，无论是实时操作还是用于电池耗尽的存档。

## 事前准备

1. 使用 PokeFinder 找到目标种子。
2. 在 PokeFinder 中右键点击选定的种子，并选择 "为种子生成时间" 生成相应的计时信息。

## 绘画乱数操作流程

<PaintingReseed />

1. 在上方工具中输入你的目标种子，以获取目标画作计时器数值（Target Painting Timer）。
2. 在游戏中，等待 Lua 脚本显示的画作计时器达到目标数值。建议打开队伍菜单以防止 NPC 干扰乱数。
3. 在此数值时查看画作，即可将 RNG 重置为目标种子。
4. 使用 PokeFinder 中 "Seed to Time" 计算出的推进数完成剩余的乱数操作，直至获得目标宝可梦。

## 特别鸣谢

- 中文翻译：炫夜鳞、白希洛/Hakuhiro。
`;export{n as default};
