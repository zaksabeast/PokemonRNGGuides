var e=`---
title: "使用离线补丁进行宝可传送乱数"
navDrawerTitle: "离线补丁乱数"
description: "使用离线补丁稳定宝可传送的延迟，更可靠地进行个体值乱数。"
slug: "zh-transporter-rng-offline"
translation:
  enSlug: "transporter-rng-offline"
  language: "zh"
---

本教程介绍如何通过宝可传送，对从第一、第二世代传送过来的宝可梦进行个体值乱数。为了稳定延迟，需要使用无需连接服务器即可传送宝可梦的补丁。打补丁后的宝可梦传送结果与正常传送相同。

宝可梦是否异色及其性格，已在来源的第一、第二世代游戏中确定。

可以通过[性格对照表](/misc-3ds-transporter-nature-tables)查询宝可梦传送后的性格。

如果不想使用补丁，可以参考[宝可传送乱数教程](transporter-rng)。

## 所需工具

- [已安装 PokeReader 的 3DS](/install-pokereader)

## 第一步：稳定延迟

按照[此处说明](/offline-bank-transporter-mod)安装宝可传送离线补丁，以获得稳定的延迟。

## 第二步：寻找目标帧数

1. 确保第一、第二世代游戏的第 1 个盒子、第 1 个位置中有一只宝可梦。
2. 在 3DS 上启动宝可传送，并加载 PokeReader。
3. 将 PokeReader 显示的初始种子输入下方工具的“Seed”栏。
4. 将“Delay”设为 28。
5. 在宝可传送中按下 \`Start\`，选择要使用的游戏。
   - 此处就是生成宝可梦前最后一次按下 \`A\` 的界面。
6. 按下 \`Start + Select\` 暂停游戏。
7. 调整个体值筛选条件，寻找你想要的结果。
   - 性格、特性和是否异色在传送前的第一、第二世代游戏中就已确定。
8. 将“Initial Advance”设为当前推进帧数。
9. 将“Max Advances”设为你愿意搜索的最大推进帧数。
10. 点击“Search”。

显示的所有结果都可以作为目标帧数，选择你喜欢的一项即可。

## 第三步：命中目标

1. 按下 \`Start\` 解除暂停。
2. 在游戏选择界面等待，直到接近目标帧数。
3. 接近目标时，按下 \`Start + Select\` 暂停游戏。
4. 按下 \`Select\` 逐帧推进，直到目标帧数。
5. 到达目标帧数后，按住 \`A\`。
6. 检查是否获得目标宝可梦。如果没有，不要传送，重新尝试即可。

> [!TIP]
> 当系统询问是否传送宝可梦时，选择“No”会重新生成宝可梦。因此即使没有命中，也可以反复尝试。

<Transporter />

## 特别鸣谢

- 中文翻译：白希洛/Hakuhiro
`;export{e as default};