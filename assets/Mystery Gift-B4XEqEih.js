const n=`---
- title: "究极之日和究极之月神秘礼物乱数"
  description: "学习如何在究极之日与究极之月中对神秘礼物宝可梦进行乱数，以获得理想个体值。"
  slug: "zh-retail-usum-mystery-gift"
  translation:
    enSlug: "retail-usum-mystery-gift"
    language: "zh"
- title: "太阳和月亮神秘礼物乱数"
  description: "学习如何在太阳与月亮中对神秘礼物宝可梦进行乱数，以获得理想个体值。"
  slug: "zh-retail-sm-myster-gift"
  translation:
    enSlug: "retail-sm-myster-gift"
    language: "zh"
---

## Tools

- [一台安装了 PokeReader 的 3DS](/zh-install-pokereader)
- [3DSRNGTool](https://github.com/wwwwwwzx/3DSRNGTool/releases)

在开始之前，请前往第一个宝可梦中心（宝可梦学校旁），并站在配送员正前方。

## 步骤 1：停在最终画面

请严格按照下图所示位置站立，否则时间线可能会不正确，从而错过目标帧。

你应当能看到文字："你收到了 xxx！"

![最终画面](/images/UltraSun-UltraMoon/Mystery-Gift/Final-Screen.png)

## 步骤 2：设置 3DSRNGTool

1. 在右上角输入你的游戏版本与 TSV。
2. 在右上角输入初始 Seed。
3. 如果你持有闪耀护符，请勾选对应选项。
4. 确认当前位于 3DSRNGTool 的配信乱数标签页。
5. 如果你拥有该活动的 WonderCard 文件（.wc7），请将其导入 3DSRNGTool，以自动更新配信设置。
   - WonderCard 文件可在[此处获取](https://github.com/projectpokemon/EventsGallery)。
   - 你也可以手动输入数据，但必须确认其与你的活动完全一致。

\`\`\`
注意：部分活动会触发图鉴登录动画，这会使乱数产生变化，将延迟从 0 变为 62 帧。请在乱数信息中勾选未登入图鉴以正确校准。当图鉴页面出现时，请尽量快速关闭。
\`\`\`

## 步骤 3：进行宝可梦乱数

1. 按照以下指南创建时间线：[Gen 7时间线指南](/zh-retail-usum-timeline).
2. 推进到你的目标帧，在命中该帧时按下\`A\`键解除暂停并领取宝可梦。

恭喜，你现在应该已经获得了目标宝可梦。如果结果不符合预期，请重置游戏并重新尝试。

## 补充说明

如果你没有获得想要的宝可梦：

1. 再次确认所有信息，尤其是初始 Seed 是否正确。
2. 从头开始重新执行本指南，并严格遵循所有步骤。错误结果通常源于操作失误。
3. 确认你正确创建并使用了时间线，跳过目标帧通常是因为时间线操作不当所导致。

## 特别鸣谢

- 中文翻译：炫夜鳞、白希洛/Hakuhiro
`;export{n as default};
