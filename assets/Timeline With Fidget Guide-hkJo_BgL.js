const n=`---
- title: "究极日月 主角小动作时间线乱数"
  description: "学习如何在《究极之日／究极之月》中使用主角小动作建立时间线。"
  slug: "zh-retail-usum-fidget"
  translation:
    enSlug: "retail-usum-fidget"
    language: "zh"
- title: "日月 主角小动作时间线乱数"
  description: "学习如何在《日月》中使用主角小动作建立时间线。"
  slug: "zh-retail-sm-fidget"
  translation:
    enSlug: "retail-sm-fidget"
    language: "zh"
---

## 所需工具

- [一台安装了 PokeReader 的 3DS](/zh-install-pokereader)
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)

## 第一步：建立时间线

- 按照 [时间线建立教程](/zh-retail-usum-timeline) 创建时间线并找出目标帧。

## 第二步：考虑主角小动作影响

<ShowIf slug="/zh-retail-usum-fidget">

\`\`\`
说明：通过主角小动作建立时间线比时间线跳跃更容易，但能跳跃的帧范围有限。此方法适用于露奈雅拉和索尔迦雷欧，若是究极之洞宝可梦，推荐使用时间线跳跃法。
\`\`\`

</ShowIf>

<ShowIf slug="/zh-retail-sm-fidget">

\`\`\`
说明：此方法在《日月》中较少使用，仅适用于露奈雅拉和索尔迦雷欧。
\`\`\`

</ShowIf>

1. 在校准完时间线后，等待主角出现"晃动"动作，并立刻暂停游戏。
   - 这必须是校准后出现的第一个小动作。
   - 不要求是载入存档后首次出现的小动作，只要是建立任意时间线后第一个即可。
2. 使用 \`Select\` 按钮逐帧推进，直到发现出现了时间线上没有的帧数跳跃。
   - 对于拥有 1 个 NPC 的究极之洞宝可梦，小动作通常会跳过 3～4 帧。
   - 例如，帧数从 1320 跳到了 1324，那么应将 1320 作为小动作帧输入（勾选对应选项并填写）。
3. 输入完成后点击 "计算"，即可将该小动作影响计入时间线中。

\`\`\`
说明：NPC 数是通过计算得出的，因此小动作发生时叠加显示中的 NPC 数会因为帧跳跃而发生变化。这并不意味着基础 NPC 数错误，它只是体现了当前帧的跳跃计算（NPC 数 = 最大跳跃帧数 - 1）。
\`\`\`

主角小动作进行中示意图：

<ShowIf slug="/zh-retail-usum-fidget">
  ![Fidget](/images/UltraSun-UltraMoon/Fidget-Timeline/Fidget.png)
</ShowIf>

<ShowIf slug="/zh-retail-sm-fidget">
  ![Fidget](/images/Sun-Moon/Fidget-Timeline/Fidget.png)
</ShowIf>

<ShowIf slug="/zh-retail-usum-fidget">

![Before Fidget](/images/UltraSun-UltraMoon/Fidget-Timeline/Before.jpg)

![After Fidget](/images/UltraSun-UltraMoon/Fidget-Timeline/After.jpg)

</ShowIf>

<ShowIf slug="/zh-retail-sm-fidget">

![Before Fidget](/images/Sun-Moon/Fidget-Timeline/Before.jpg)

![After Fidget](/images/Sun-Moon/Fidget-Timeline/After.jpg)

</ShowIf>

完成以上操作后，时间线将会自动考虑主角小动作产生的帧跳跃影响。在推进至目标帧期间请注意：不要移动主角，不要打开菜单

## 特别鸣谢

- 中文翻译：炫夜鳞、白希洛/Hakuhiro
`;export{n as default};
