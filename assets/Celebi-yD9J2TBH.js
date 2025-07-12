const n=`---
title: "时拉比"
description: "如何获得异色时拉比"
slug: "zh-gen2-celebi"
translation:
  enSlug: "gen2-celebi"
  language: "zh"
---

<Alert
  showIcon
  type="warning"
  message="高度实验性！"
  description="二代乱数还未完善。预计需要多次尝试！"
/>

## 所需工具

- [PokeReader](/install-pokereader)

## 视频教程

<YouTubeVideo src="https://www.youtube.com/embed/wTpI7MV_f4U?si=0qF9bFb0HrDyv2zw" />

## 文字教程

1. 在栎树林祠堂前存档，以防需要复位游戏。
2. 按 \`A\` 键与祠堂交互，并在 \`Player put in the GS Ball.\` 这段文本下等待。
3. 进入PokeReader的RNG界面，等待直到停止显示 \`Finding ADIV Index\` 和 \`Finding SDIV Index\` 。
4. 按住 \`L + R\` 键暂停PokeReader。
5. 将PokeReader上的信息输入下方的乱数工具中，然后点击 \`计算\`。
6. 持续按 \`L\` 键推进帧数，直到PokeReader显示的\`帧数\`与下方计算的某一列\`帧数\`匹配。
7. （可选）如果你使用的是模拟器，可以使用即时存档以防失败复位。
8. 当推进到目标帧数时，按 \`A\` 键触发战斗。 **请勿在进入战斗之前进行任何操作！**
9. 如果遇到目标宝可梦，恭喜你成功了！如果没有，继续多次尝试！很快就能成功。

\`\`\`
注意: 相比于初始宝可梦时拉比更不稳定，要更多次地尝试。
\`\`\`

## 乱数工具

<Gen2PokemonRng type="celebi" />

## 特别鸣谢

- All the people who have looked into Gen 2 over the years: Admiral Fish, EzPzStreamz, Zep, Real, Amab, wwwwwwzx, Vlad, Bambo_Rambo, Lincoln, Shiny_Sylveon, and Zaksabeast.
- Zaksabeast for coming up with the current RNG method and building the tool.
- Shiny_Sylveon, El Terapagos Mexicano, and Lord Timothy on Discord for helping test.
- 中文翻译：白希洛/Hakuhiro。
`;export{n as default};
