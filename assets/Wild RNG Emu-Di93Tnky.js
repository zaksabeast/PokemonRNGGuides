var e=`---
- title: "黑2/白2模拟器野生乱数"
  navDrawerTitle: "野生乱数"
  description: "学习在黑2/白2中进行野生乱数，获得异色及高个体宝可梦。"
  slug: "zh-emulator-b2w2-wild"
  translation:
    enSlug: "emulator-b2w2-wild"
    language: "zh"
- title: "黑/白模拟器野生乱数"
  navDrawerTitle: "野生乱数"
  description: "学习在黑/白中进行野生乱数，获得异色及高个体宝可梦。"
  slug: "zh-emulator-bw-wild"
  translation:
    enSlug: "emulator-bw-wild"
    language: "zh"
---

## 所需工具

- [PokeFinder](/pokefinder)
- [DeSmuME](/desmume-setup)
- [已设置好的游戏配置档案](/emulator-bw-find-ds-parameters)
- 已录制喋喋不休的聒噪鸟
- 会甜甜香气的宝可梦，或背包中的甜甜蜜

## 第一步：了解第五世代乱数

第五世代的乱数分为两套独立系统。

| 乱数类型 | 决定内容                     |
| -------- | ---------------------------- |
| PIDRNG   | 是否异色、性格、性别、特性。 |
| IVRNG    | 仅决定个体值。               |

想获得指定个体值的异色宝可梦，需要同时控制两者。

## 第二步：选择并准备地点

先加载脚本，再前往想要遭遇目标的道路。

通过脚本观察地图是否有乱数干扰，这对第五世代乱数非常重要。

确定地点和目标后：

1. 保存游戏。
2. 关闭模拟器。

## 第三步：搜索目标种子

打开 PokeFinder，设置搜索条件。

1. 进入“Gen 5”标签页。
2. 选择“Wild”。
3. 选择游戏配置档案。
4. 切换到“Searcher”标签页。
5. 如果队首特性具有队首效果，在“Lead”中选择对应项目。
6. 将“Advances”设为计划在游戏中推进的次数。
7. 在 Settings 中选择目标宝可梦。
8. 在 Filter 中设置个体值、性别、特性、性格等条件。
9. 调整日期范围。
10. 点击“Search”。

## 第四步：以目标种子启动游戏

1. 按照对应指南<ShowIf slug="/zh-emulator-b2w2-wild">[命中目标种子](/emulator-b2w2-runasdate-inital-seed)</ShowIf><ShowIf slug="zh-emulator-bw-wild">[命中目标种子](/emulator-bw-runasdate-initial-seed)</ShowIf>。
2. 使用 [DeSmuME 指南](/desmume-setup)中的 \`runasdate.exe\`，以正确日期和时间启动游戏。
3. 尽快进入游戏。
4. 立即打开菜单。

> [!IMPORTANT]
> 进入游戏时不要开启 C-Gear，避免产生无法预测的推进。

此时初始种子应与目标一致。如果不一致，请重新检查配置档案参数及 RunAsDate 设置。

## 第五步：推进 PIDRNG

可以使用以下方式：

- 聒噪鸟：录制喋喋不休后，每次查看信息推进 1 次。
- 保存游戏：适用于御三家等特定情况。
- NPC 推进：较难控制，也可以利用天气快速推进 LCRNG。

## 第六步：推进 IVRNG

可以使用以下方式：

- 每走 128 步，按照队伍中的宝可梦数量推进。例如队伍有 6 只，就推进 6 次。
- 从电脑中取出一只宝可梦，推进 7 次。
- 宝可梦战斗也会推进 IVRNG，但结果可能无法预测。

## 第七步：触发遭遇

PIDRNG 和 IVRNG 都到达正确位置后：

1. 确认当前为目标推进数。
2. 使用甜甜香气或甜甜蜜，触发野生遭遇。

> [!TIP]
> 有干扰的区域可以使用即时存档，方便未命中时重试。

> [!IMPORTANT]
> 如果地图中存在活动 NPC 或天气，甜甜香气及甜甜蜜动画期间，LCRNG 仍会继续推进。

**恭喜你！已经获得目标宝可梦了！**

## 疑难解答

受上述干扰影响，即使设置正确，遭遇也可能不在预期推进数发生。

没有必定成功的解决方式，需要不断调整和校准，直到能稳定命中正确的异色结果。

不过，钓鱼不会额外推进 LCRNG，因此可以使用钓鱼避免此类问题。

## 特别鸣谢

- Vlad：撰写原始指南。
- Fiask：完善指南及翻译。
- 中文翻译：白希洛/Hakuhiro
`;export{e as default};