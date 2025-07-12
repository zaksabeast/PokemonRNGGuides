const n=`---
- title: "宝可追踪乱数"
  description: "两种不同的宝可追踪乱数方法"
  slug: "zh-dppt-pokeradar-rng"
  translation:
    enSlug: "dppt-pokeradar-rng"
    language: "zh"
---

## 所需工具

- [Real.96 制作的特定版本 PokeFinder](https://mega.nz/file/cwY10TqT#qZxPCoSMGo64Xrw6TdAywqbBeUOk0il53MavrFqKr0Q) 未来将合并至主 PokeFinder 版本
- 一些驱虫喷雾剂。

## 介绍

本指南讲解基于 1 连锁的宝可追踪乱数。假设你已经了解第四世代乱数的基础知识，该方法适用于模拟器和实机操作。

## 1连锁状况

此方法允许获取连锁的异色个体，但需要更多设置。

1. 启动 PokeFinder（假设个人资料已设置完成），进入 第四世代 => 野生乱数 => 检索器。
2. 在设置选项卡中，勾选 PokeRadar，选择路线和目标宝可梦。同时勾选 PokeRadar Shiny 和 Shiny Patch 选项。
3. 输入筛选条件，并选择一个遭遇种类。推进值用于 IV、性格等，而 Shiny Patch 选项用于决定闪光出现的时机。

\`\`\`
注意：你需要击败一只宝可梦，走动以重置宝可追踪，并搜索大约 300-500 或更多的帧数范围。建议在大约 200 帧附近选择 Shiny Patch，低于此值无法成功。
\`\`\`

4. 在游戏中，先命中目标初始种子。触发宝可追踪，找到目标连锁的宝可梦并将其击败。
5. 走动直到宝可追踪重置。
6. 推进帧数至你的 Shiny Patch 目标值。寻找一个较大的草丛区域以获得最佳效果，并在 2×2 的推进值范围内寻找更接近的 Shiny Patch。
7. 当 Shiny Patch 出现后，站到它旁边并打开背包。
8. 在接近目标帧数时调整推进（如有必要），然后关闭菜单，进入 Shiny Patch。

## 特别鸣谢

- 中文翻译：炫夜鳞、白希洛/Hakuhiro。
`;export{n as default};
