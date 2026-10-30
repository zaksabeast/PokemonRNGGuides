var e=`---
title: "红宝石/蓝宝石电池耗尽定点乱数"
navDrawerTitle: "电池耗尽定点乱数"
description: "学习在红宝石/蓝宝石中进行定点乱数，获得理想个体值、性格及异色宝可梦。"
slug: "zh-emulator-rs-dead-battery-stationary"
translation:
  enSlug: "emulator-rs-dead-battery-stationary"
  language: "zh"
---

大部分内容可以参考作者的火红/叶绿指南。本指南基于采用 Real 脚本更新之前的操作方式。

本指南介绍第三世代固定初始种子的情况，具体适用于电池耗尽的红宝石/蓝宝石，以及绿宝石。

由 Subject 基于 Rick 的指南修改，内容尚未完成。

## 所需工具

- [支持 Lua 脚本的 mGBA](/mgba-setup)
- [PokeFinder](/pokefinder)

---

## 设置

### 设置 VBA-RR

1. 正确设置存档类型。
2. 打开 \`Options > Emulation > Save Type > Automatic & Flash 128K\`。
3. 关闭实时时钟，以使用电池耗尽时的种子。
4. 对应选项位于 \`Options > Emulation > Real Time Clock\`。
5. 如果出现存档损坏、电池耗尽提示等加载问题，请重启 VBA。
6. 加载 Lua 脚本。

### 设置 PokeFinder

1. 启动 PokeFinder，选择第三世代的定点乱数。
2. 选择配置档案，或输入 TID/SID。
3. 输入对应的初始种子。
   - 绿宝石为 \`0\`。
   - 红宝石/蓝宝石为 \`5A0\`。
4. 第三世代非野生宝可梦使用 Method 1。
5. 搜索想要的结果，确定目标帧数。

（原稿此处待补充 PokeFinder 示例截图。）

---

## 命中目标帧数

1. **寻找延迟**
   - 推进到遭遇目标宝可梦前的最终等待界面。
   - 在遭遇前约 100 帧创建即时存档。

（原稿此处待补充等待界面截图。）

2. 到达目标帧数时按下 \`A\`，触发遭遇。
3. 暂停时可以按句号键 \`.\` 逐帧推进。
4. 记下实际遭遇宝可梦的个体值，此时通常与目标不同。
5. 新开一个 PokeFinder 窗口，输入实际遭遇宝可梦的个体值。
6. 根据实际命中帧数与目标帧数的差值计算延迟。

\`延迟 = 实际命中帧数 - 目标帧数\`

\`调整后的目标帧数 = 原目标帧数 - 延迟\`

2. **遭遇宝可梦**
   - 读取遭遇前的即时存档。
   - 推进到调整后的目标帧数。
   - 如果仍未获得目标宝可梦，请重新计算延迟。

（原稿此处待补充目标宝可梦截图。）

## 特别鸣谢

- 中文翻译：白希洛/Hakuhiro
`;export{e as default};