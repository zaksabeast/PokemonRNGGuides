var e=`---
title: "心金/魂银模拟器野生乱数"
navDrawerTitle: "野生乱数"
description: "学习在心金/魂银中进行野生乱数，获得异色及高个体宝可梦。"
slug: "zh-emulator-hgss-wild"
translation:
  enSlug: "emulator-hgss-wild"
  language: "zh"
---

## 所需工具

- [DeSmuME](/desmume-setup)
- [PokeFinder](/pokefinder)
- 会甜甜香气的宝可梦
- 可选：具有队首效果的宝可梦

开始前，需要掌握命中初始种子的方式，请先参考对应指南。

## 第一步：寻找目标

先在想要捕捉宝可梦的区域保存游戏。

1. 打开 PokeFinder，选择 \`Gen 4 > Wild\`。
2. 切换到“Searcher”标签页，这一步很重要，然后选择或创建配置档案。
3. 选择道路并设置目标参数。心金/魂银使用 Method K，不是 Method J。
4. 可以考虑使用队首特性，增加可用目标帧。
5. 注意目标的 delay 和推进帧数都可能较高。

找到目标帧后，右键点击结果，选择“Generate times for seed”。

## 第二步：设置模拟器

1. 打开模拟器，加载 Lua 脚本。
2. 命中初始种子。
3. 按下 \`X\` 打开菜单。

之后可以通过以下方式推进 PIDRNG：

1. 使用已录制喋喋不休的聒噪鸟，推荐准备两只。如果不起作用，可以利用 DeSmuME 的录音功能完成录制，再进行推进。
2. NPC 会不规则地推进帧数。
3. 收音机也能推进。右下角频道每次推进 1 帧，大木博士频道每次约推进 14-18 帧，其他频道则较不固定。

到达正确帧数后，使用甜甜香气即可遭遇目标！

## 特别鸣谢

- 中文翻译：白希洛/Hakuhiro
`;export{e as default};