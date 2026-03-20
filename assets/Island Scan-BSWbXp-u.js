const n=`---
- title: "《究极之日／究极之月》岛屿扫描乱数"
  description: "学习如何在《究极之日／究极之月》中进行岛屿扫描乱数，非常适合用柑果球获取异色宝可梦。"
  slug: "zh-retail-usum-island-scan"
  translation:
    enSlug: "retail-usum-island-scan"
    language: "zh"
- title: "《太阳／月亮》岛屿扫描乱数"
  description: "学习如何在《太阳／月亮》中进行岛屿扫描乱数，非常适合用柑果球获取异色宝可梦。"
  slug: "zh-retail-sm-island-scan"
  translation:
    enSlug: "retail-sm-island-scan"
    language: "zh"
---

## 工具

<ShowIf slug="/zh-retail-usum-island-scan">

- [一台安装了 PokeReader 的 3DS](/install-pokereader)
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
- 道具\`甜甜蜜\`
- 已开始一次岛屿扫描，并知道你扫描到的宝可梦
- [USUM 岛屿扫描岛屿与星期列表](/zh-misc-3ds-island-scan-usum)

</ShowIf>

<ShowIf slug="/zh-retail-sm-island-scan">

- [一台安装了 PokeReader 的 3DS](/install-pokereader)
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
- 道具\`甜甜蜜\`
- 已开始一次岛屿扫描，并知道你扫描到的宝可梦
- [SM 岛屿扫描岛屿与星期列表](/zh-misc-3ds-island-scan-sm)

</ShowIf>

\`\`\`
注意：通过三个考验后，可以在任意商店购买「甜甜蜜」。
\`\`\`

## 步骤 1：设置 3DSRNGTool

1. 将 PokeReader 中显示的 \`Init Seed\` 输入到 \`Seed\` 栏位。
2. 输入你的游戏版本与 TSV。
3. 如果你拥有闪耀护符，请勾选 \`闪耀护符\`。
4. 点击 \`野生乱数\` 标签页，并将 \`分类\` 下拉选单改为 \`岛屿扫描\`。
5. 将 \`宝可梦\` 下拉选单设为你的目标宝可梦。

## 步骤 2：制作时间线

1. 使用 PokeReader 显示的 \`NPC数\`，按照[时间线教程](/zh-retail-usum-timeline)进行操作。
2. 你应该会得到一个需要命中的目标帧数。

## 步骤 3：进行乱数

如果你已经正确完成前面的步骤，现在你应该已经：

- 制作好了时间线
- 有一个目标帧数
- 站在捕捉岛屿扫描宝可梦的地点
- 拥有道具\`甜甜蜜\`

\`\`\`
注意：如果以上任意一项不成立，请从头开始。主角的移动会扰乱乱数。
\`\`\`

### 步骤 4：命中目标帧数

1. 按下 \`X\` 打开游戏内菜单。
2. 将游标停在「包包」选项上。
3. 观察 PokeReader 中的 \`Advances\` 计数器。
   - 当 \`Advances\` 接近你的目标帧数时，按下 \`Start + Select\` 暂停游戏。
   - 多次按下 \`Select\`，缓慢推进帧数直到目标帧数。
4. 到达目标帧数后，按住 \`A\`，在进入背包的同时解除暂停。
5. 找到并使用「甜甜蜜」来触发野生宝可梦遭遇。
6. 如果遇到的宝可梦不是岛屿扫描宝可梦，请确认你偏差了多少帧并进行调整。
   - 使用遭遇到的宝可梦个体值搜索命中帧数。请改用帧数范围搜索，而不是时间线。
   - 找到实际命中的帧数后，根据延迟进行修正，并从头重新开始。
   - 这种情况不应频繁发生。

## 特别鸣谢

- 中文翻译：炫夜鳞、白希洛/Hakuhiro
`;export{n as default};
