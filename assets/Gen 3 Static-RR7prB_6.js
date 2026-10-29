var e=`---
title: "绿宝石御三家、传说与化石乱数"
description: "绿宝石御三家、传说、化石及游走宝可梦的定点乱数。"
slug: "zh-emerald-static"
translation:
  enSlug: "emerald-static"
  language: "zh"
---

## 介绍

本指南介绍定点乱数，包括御三家、传说、化石及游走宝可梦。整个过程只需要一次精确到单帧的按键，校准也比较快速可靠。
许多定点宝可梦都可以用你喜欢的精灵球捕捉。

不过需要注意：

- 并非所有个体值与性格组合都能出现。定点生成的六项完美个体宝可梦只可能有四种性格：温和、坦率、内敛、胆小，且只会在 6 个特定 PSV（对应 TID/SID 组合）下成为异色。
  - 可以通过 ACE 暂时改变 TID/SID，绕过异色限制。
  - [孵化乱数](/retail-emerald-egg)没有这些性格和异色限制。

## 流程概述

- **第一步**：确定获得目标宝可梦所需的推进帧数。
- **第二步**：可选，创建对战录像，也可以结合绘画重置种子，加快每次尝试。
- **第三步**：捕捉并校准，直到获得目标宝可梦。

如果已经知道目标帧数和操作设置，可以直接进入第二步。如果已有对战录像，可以直接进入第三步。

<Stepper titles={["寻找合适设置", "创建对战录像及其他准备", "捕捉与校准"]}>

<Step step={0}>

### 寻找合适设置

确定获得目标宝可梦所需的设置，包括地图、推进帧数和队首宝可梦。

1. 填写异色、个体值、性格等目标条件。
2. 指定允许使用的操作方式，例如绘画重置种子。
   - 只有以异色为目标时才需要 TID/SID。如何[查找 SID](/gen3-sid/)。
3. 点击“Generate”，生成符合条件的宝可梦列表。
4. 选择推进帧数最低的目标宝可梦。

<Static3TargetSetupSearcher_WithSetTargetSetup />

</Step>

<Step step={1}>

<EmeraldStaticAceChangeSid_WithTargetSetup />

### 创建对战录像

对战录像可以保存和恢复乱数状态。利用此技巧，只需完整等待一次，后续每次乱数重试都会快很多。

在对战开拓区结束战斗后，无论胜负都可以保存录像。录像会记录战斗开始时的乱数状态。打开训练家卡，选择“Battle Record”，就能在任意地点播放录像，并将乱数状态重置为录像中战斗开始时的状态。

如果不使用绘画重置种子，创建对战录像是可选的。

使用对战录像需要先进入名人堂，因此新存档选择御三家时无法使用。通过 ACE 可以让所有定点宝可梦重新出现，再进行乱数捕捉。

<EmeraldStaticPaintingReseeding_WithTargetSetup />

</Step>

<Step step={2}>

### 捕捉与校准

<Static3Calib_WithTargetSetupAndBattleVideo />

</Step>

</Stepper>

## 后续待补充

- 各宝可梦的具体说明，例如最终等待界面和操作技巧。
- 让宝可梦重新出现或解锁配信宝可梦的 ACE 代码。

## 特别鸣谢

- RainingChain：网页工具与搜索器。
- 中文翻译：白希洛/Hakuhiro
`;export{e as default};