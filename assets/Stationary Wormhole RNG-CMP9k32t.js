const n=`---
title: "《究极之日／究极之月》究极之洞乱数"
description: "在《究极之日／究极之月》中，对究极之洞内出现的传说宝可梦进行乱数，以获得理想的个体值、性格与异色。"
slug: "zh-retail-usum-wormhole"
translation:
  enSlug: "retail-usum-wormhole"
  language: "zh"
---

## Tools

- [安装了 PokeReader 的 3DS](/zh-install-pokereader)
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)
- [3DSRNGTool README（最终画面一览）](https://github.com/wwwwwwzx/3DSRNGTool/blob/master/README.md#final-screen)

\`\`\`
注意：本方法适用于究极之洞中出现的所有宝可梦，包括究极异兽。
\`\`\`

## 步骤 1：确认初始 Seed

初始 Seed 会显示在 PokeReader 叠加界面顶部的「Init Seed:」下方。例如：\`5DA5CA91\`。

![Setup](/images/UltraSun-UltraMoon/Wormhole/Setup.png)

## 步骤 2：制作时间线并寻找目标帧数

\`\`\`
注意：在向前移动以触发遭遇时，请精确操作摇杆。始终朝同一方向移动，以保证结果稳定。
\`\`\`

究极之洞乱数有两种方法。

### 方法一：带角色小动作的基础时间线

该方法通过制作时间线来考虑角色的小动作。缺点是可用帧数会受到时间线长度限制。

- 按照[带小动作的时间线教程](/retail-usum-fidget)制作时间线并寻找目标帧数。

### 方法二：时间线跳跃（Time Leap）

该方法先寻找目标帧数，然后“跳跃”到对应时间线。优点是不受时间线限制，可以命中任意帧数。你也可以使用圆庆广场来更快地推进帧数，从而减少等待时间。

- 按照[时间线跳跃教程](/zh-retail-usum-timeleap)寻找目标帧数并跳跃至该帧。

## 步骤 3：命中目标帧数

1. 在筛选条件中输入你想要的结果，然后点击「计算」以搜索目标帧数。

![Target](/images/UltraSun-UltraMoon/Wormhole/Target.jpg)

2. 推进帧数至接近目标帧数后暂停游戏。

![Final screen](/images/UltraSun-UltraMoon/Wormhole/Final-Screen.png)

3. 到达目标帧数时，触发遭遇。究极异兽：直接按下 \`A\`。传说宝可梦：向前推动摇杆。请尽量在最接近触发点的位置存档。

![Final Screen 2](/images/UltraSun-UltraMoon/Wormhole/Final-Screen-2.png)

4. 成功了吗？？？
   - 并没有。

![Calibration](/images/UltraSun-UltraMoon/Wormhole/Calibration.png)

### 那么，发生了什么？

这是正常现象。 每一台 3DS、每一个存档都有各自的延迟值。所谓「延迟」，指的是从你触发遭遇到宝可梦真正生成之间所经过的帧数。接下来我们来找出你的延迟值。

## 步骤 4：测定延迟并命中它

1. 使用你实际遇到的宝可梦的个体值、性格与 PSV，反推你实际命中的帧数。例如：目标帧数为 4973，则实际命中 4969（-4）。则你相对于 3DSRNGTool 默认设置命中的延迟为 -4（即 152）。

![Result](/images/UltraSun-UltraMoon/Wormhole/Result.jpg)

2. 使用随机目标重复此过程，统计你最常命中的帧数偏差。将出现频率最高的数值填写到「考虑延迟」中，并观察结果变化。

- 请在确认一个稳定的延迟值之前不要急于修改。根据情况，可能需要尝试 10～20 次甚至更多。

![Delay](/images/UltraSun-UltraMoon/Wormhole/Delay.jpg)

3. 当你找到一个稳定的延迟值后，将其固定输入，然后挑战更严格的目标。例如，下图是在确认延迟为 152 后命中的异色固拉多。需要注意的是，由于传说宝可梦的触发需要向前走一步，相比究极异兽，变量更多，稳定性也更差。

![Success](/images/UltraSun-UltraMoon/Wormhole/Success.png)

\`\`\`
注意：你可以前往慷待市的 GAME FREAK 大楼，与里面的以太基金会员工对话，在体感操作与摇杆操作之间进行切换。
\`\`\`

![Ather](/images/UltraSun-UltraMoon/Wormhole/Screenshot-wormhole-controls.png)

## 特别鸣谢

- 中文翻译：炫夜鳞、白希洛/Hakuhiro
`;export{n as default};
