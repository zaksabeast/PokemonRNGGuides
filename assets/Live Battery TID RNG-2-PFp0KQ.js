var e=`---
title: "红宝石/蓝宝石模拟器 TID 乱数"
navDrawerTitle: "TID 乱数"
description: "学习如何在红宝石/蓝宝石中通过模拟器获得你想要的 TID 与 SID 组合。"
slug: "zh-emulator-rs-live-battery-tid"
translation:
  enSlug: "emulator-rs-live-battery-tid"
  language: "zh"
---

## 所需工具

- [支持 Lua 脚本的 mGBA](/mgba-setup)
- [PokeFinder](/pokefinder)

## 第一步：寻找目标初始种子

1. 打开 PokeFinder，进入第三世代的 IDs 窗口，然后选择 RS 标签页。
2. 选择筛选条件，输入你想要的 TID、SID 或 TSV。
3. 保持当前的日期和时间，也可以按需调整。
4. 点击“Generate”，查找符合条件的 TID。
   - 如果没有搜索结果，可以尝试调整日期、时间，或提高最大推进帧数。

## 第二步：命中初始种子

1. 在 mGBA 中打开 \`Tools -> Game Overrides...\`，启用“Realtime clock”。
2. 然后打开 \`Tools -> Game Pak Sensors...\`，选择“Start time at”，输入目标日期和时间。
3. 启动游戏，推进开场对话，直到小田卷博士说稍后再见。
4. 等待游戏推进到目标帧数，期间按需创建即时存档。

在下方画面等待帧数推进：

![最终等待界面](/images/Ruby-Sapphire/Live-Battery-TID/Final-Screen.png)

## 第三步：校准延迟

从按下 \`A\` 到游戏实际生成 TID/SID 之间存在延迟，因此需要提前按键来抵消这段延迟。

1. 记下你的目标帧数。
2. 到达目标帧数时，按下 \`A\` 生成 TID。
3. 将实际获得的 TID 输入 PokeFinder，搜索对应结果。
4. 对比实际命中的帧数与目标帧数，计算延迟。
   - 例如：目标是第 **89103** 帧，实际命中第 **89175** 帧，那么延迟就是 **72** 帧，需要提前 **72** 帧按下 \`A\`。
5. 读取之前的即时存档，在调整后的帧数按下 \`A\`。

> [!TIP]
> 如果获得的 TID 和 SID 与目标正好相反，提前 1 帧按下 \`A\` 即可。

恭喜你！你已经获得了目标 TID！

以下是成功完成 ID 乱数的示例：

![成功获得目标 ID](/images/Ruby-Sapphire/Live-Battery-TID/Success.png)

## 特别鸣谢

- 中文翻译：白希洛/Hakuhiro
`;export{e as default};