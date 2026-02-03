const n=`---
title: "欧米伽红宝石与阿尔法蓝宝石 TID 乱数"
description: "学习如何在《欧米伽红宝石 / 阿尔法蓝宝石》中获取理想的训练家 ID（TID）与隐藏 ID（SID）组合。"
slug: "zh-retail-oras-tid"
translation:
  enSlug: "retail-oras-tid"
  language: "zh"
---

\`\`\`
如果已存在存档文件，请在标题画面同时按下 B + X + 十字键上。此操作会删除存档，并让游戏从语言选择画面开始。
\`\`\`

## 所需工具

- [PokeReader](/install-pokereader)

## 视频指南

<YouTubeVideo id="RuwwNFSqIIE" />

## 步骤 1：设置工具

1. 将从 PokeReader 中读取到的 TinyMT u32 Seed 输入到页面底部的工具中。
2. 如果你是在实体主机上操作，请开启 “Only Current Seed”；如果是在模拟器上，可以保持关闭。
3. 根据你的目标筛选 TID、SID 或 TSV。

   - 获取指定的 TID / SID / TSV 组合非常罕见，建议一次只乱数其中一个。

4. 如果没有找到结果，请提高最大推进帧数。
5. 如果目标推进帧数过高，或当前 Seed 下无法生成该 TID / SID / TSV 组合，可以重置游戏以重新获取一个新的 Seed。

## 步骤 2：推进乱数

1. 解除暂停并继续游戏，进入角色命名界面。
2. 确认输入名字后，系统会询问名字是否正确。
3. 选择 “No” 并返回命名界面会推进 1 帧乱数。
4. 重复选择 “No”，直到达到目标推进帧数。
5. 当达到目标推进帧数后，选择 “Yes” 以生成 TID。
6. 当可以控制角色时，确认是否成功获得目标的 TID / SID / TSV。

![成功示例](/images/OmegaRuby-AlphaSapphire/TID/Success.png)
![成功示例](/images/OmegaRuby-AlphaSapphire/TID/Success-2.png)

## 特别鸣谢

- wwwwwwzx for reverse engineering this logic and [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool).
- Bambo_Rambo for [TinyFinder](https://github.com/Bambo-Rambo/TinyFinder), which this tool is based on.
- 中文翻译：炫夜鳞、白希洛/Hakuhiro

## RNG Tool

<OrasId />
`;export{n as default};
