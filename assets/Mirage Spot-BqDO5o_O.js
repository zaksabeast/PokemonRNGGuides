const n=`---
title: "欧米伽红宝石与阿尔法蓝宝石幻之地点乱数"
description: "学习如何在《欧米伽红宝石 / 阿尔法蓝宝石》中乱数指定任意幻之地点，以遭遇稀有宝可梦与异色宝可梦。"
slug: "zh-oras-mirage-spots"
translation:
  enSlug: "oras-mirage-spots"
  language: "zh"
---

## 所需工具

- [PokeReader](/install-pokereader)

## 视频指南

<YouTubeVideo id="fifrq7Vjoe0" />

## 推进主机日期

**3DS 模拟器（Azahar / Lime3DS / Citra）：**

1. 在模拟器设置中打开 "System" 选项卡。
2. 将 "Clock" 设置为 "Fixed Time"。
3. 将 "Startup time" 设置为你想要的目标日期。

**已移除时间惩罚的实体主机：**

1. 按照我们的指南移除时间惩罚：[移除时间惩罚指南](/oras-remove-time-penalty)。
2. 像平常一样设置主机日期即可。

\`\`\`
Note: 如果以上方法出现问题，请先启动游戏并保存，然后再尝试一次。
\`\`\`

**未移除时间惩罚的实体主机（未测试）：**

1. 将主机日期设置为目标日期的前一天。
2. 启动游戏并保存。
3. 等待 24 小时后再次游玩游戏。

## 乱数流程

1. 启动游戏，并查看 PokeReader 中的 "Mirage Spot" 页面。
2. 将幻之地点 Seed、你的 TID 以及主机的存档日期输入到下方的乱数工具中。
3. 点击 "Generate" 以生成幻之地点的详细信息，并选择你想要前往的幻之地点。
4. 关闭游戏，并将主机日期设置为该幻之地点对应的日期。
5. 启动游戏并前往你选择的幻之地点。幻之地点会在你开始飞行时刷新。

<OrAsMirageSpot />

## Credits

- Shiny_Sylveon for helping find information about Mirage Spots.
- theSlayer and suloku for associating Mirage Spot Ids with names and Pokemon in [this ProjectPokemon thread](https://projectpokemon.org/home/forums/topic/37218-mirage-islands-in-oras/page/4/).
- Falo for reverse engineering how the Mirage Spot Id is generated [in the same ProjectPokemon thread](https://projectpokemon.org/home/forums/topic/37218-mirage-islands-in-oras/page/4/).
- Zaksabeast for reverse engineering how Mirage Spot RNG is seeded and reseeded on save load, as well as building the tool in this guide.
- Rebel on Discord for helping test.
- 中文翻译：炫夜鳞、白希洛/Hakuhiro
`;export{n as default};
