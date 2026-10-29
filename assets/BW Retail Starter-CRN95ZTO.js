var e=`---
title: "黑/白实机御三家乱数"
navDrawerTitle: "御三家乱数"
description: "学习在黑/白实机中获得异色及高个体御三家。"
slug: "zh-retail-bw-starter"
translation:
  enSlug: "retail-bw-starter"
  language: "zh"
---

## 所需工具

- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder/releases)
- [Mystic Timer](/mystic-timer)
- 宝可梦黑/白卡带
- 已设置好的游戏配置档案，参考[校准助手](/bw-calibration)

> [!WARNING]
> 本指南的第五世代乱数方式仅适用于卡带，不适用于 TWiLight Menu++ 或烧录卡。

## 第一步：准备工作

开始操作前，先准备目标种子和计时设置。

1. 在礼物盒前保存游戏。
2. 打开 \`PokeFinder → Gen 5 → Static → Searcher\`。
3. 选择正确的游戏配置档案。
4. 选择对应御三家，设置异色、个体值、特性等筛选条件。
5. 将“Initial Advances”设为至少 5。
6. 按需设置“Max Advances”。不要过高，否则搜索或实际操作可能非常耗时。
7. 最小和最大 IV Advances 均保持为 0。
8. 生成结果，选择一个目标。
9. 打开计时器，根据 Date/Time 列中的秒数设置 \`target second\`。
10. 根据 Date/Time 列设置主机日期和时间，暂时不要确认。

> [!NOTE]
> 3DS 的计时稳定性较低，可能需要更长时间才能成功。详情见 [3DS 辅助指南](/3ds-helper)。

## 第二步：进行御三家乱数

命中种子，再推进到正确目标。

1. 启动计时器，同时确认主机时间设置。
2. 计时器结束时准确启动游戏，以命中目标初始种子。
3. 按住结果要求的按键。
4. 反复保存游戏，推进到目标帧数。
5. 关闭菜单，按下 \`A\` 打开礼物盒并选择御三家。

## 疑难解答

- 检查日期和时间是否正确。
- 如果步骤都正确却没有命中，可能是第五世代的 Timer0 发生变化。重新尝试，直到命中正确的 Timer0。

**恭喜你！已经获得目标宝可梦了！**

## 特别鸣谢

- Fiask：撰写指南。
- 中文翻译：白希洛/Hakuhiro
`;export{e as default};