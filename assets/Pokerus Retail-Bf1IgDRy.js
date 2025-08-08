const n=`---
- title: "红宝石·蓝宝石中的宝可病毒"
  description: "如何感染宝可病毒"
  slug: "zh-rs-pokerus-retail"
  translation:
    enSlug: "rs-pokerus-retail"
    language: "zh"
---

<Gist>要点：感染宝可病毒</Gist>

## 什么是宝可病毒

在每场野外战斗后，你的宝可梦有 1 / 21845 的几率感染宝可病毒。感染状态下，战斗获得的努力值将翻倍。若想获得如 5 级会龙之怒的最佳低等级宝可梦，感染宝可病毒是必要条件。

## 第一步：准备工作

1. 如果你已进入殿堂，并且还没有触发过[大量出现](https://bulbapedia.bulbagarden.net/wiki/Mass_outbreak#Generation_III)，建议在尝试乱数宝可病毒前先触发一次。或者，直接开一个新档。
2. 将会甜甜香气（如溜溜糖球）设为队首，同时准备 5 只特性为捡拾的宝可梦（如土狼犬），且它们身上不携带道具。
3. 前往 103 号道路最西边的草丛区域（那里没有活动NPC）。
4. 存档。
5. 在下方工具中填写计时器上方的字段。保持捡拾宝可梦数量为 5。

## 第二步：尝试感染宝可病毒

1. 启动下方工具中的计时器。
2. 当第一个计时器归零时，按下 \`Start + Select + A + B\` 复位游戏。
3. 打开宝可梦菜单，将游标停在“甜甜香气”选项上。
4. 当第二个计时器归零时，按 \`A\` 触发甜甜香气并引发野外战斗。
5. 击败野外宝可梦后，将界面停留在“XXX 获得了 YY 点经验值。”这条信息上。
6. 当第三个计时器归零时，按 \`A\` 结束战斗。

## 第三步：校准

1. 检查队伍中的所有宝可梦是否被感染了宝可病毒。如果有，恭喜你成功了！
2. 如果没有，但至少有一只捡拾宝可梦获得了道具，请在下方表格中填写获得的道具，并点击“生成”。
3. 在第一行中点击“更新校准”按钮。
4. 返回第二步重新尝试获取宝可病毒。

<Gen3Pokerus />

## 特别鸣谢

- 指南与工具：RainingChain
- 灵感来源：[hatsunetsumikos 的 Reddit 帖子](https://www.reddit.com/r/pokemonrng/comments/xgx146/gen3_pokerus_rng_guide_for_retail/)
- 解构工程支持：[pret 团队](https://github.com/pret)
- 中文翻译：炫夜鳞、白希洛/Hakuhiro
`;export{n as default};
