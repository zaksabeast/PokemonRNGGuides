const n=`---
- title: "心金魂银3DS乱数"
  description: "学习如何通过乱数在心金魂银获得异色、高个体宝可梦"
  slug: "zh-hgss-3ds-rng"
  translation:
    enSlug: "hgss-3ds-rng"
    language: "zh"
- title: "珍钻白金3DS乱数"
  description: "学习如何通过乱数在珍钻白金获得异色、高个体宝可梦"
  slug: "zh-dppt-3ds-rng"
  translation:
    enSlug: "dppt-3ds-rng"
    language: "zh"
---

<Gist>
  本页解释了为什么在 3DS 上进行 NDS
  游戏的乱数会出现延迟不一致的问题，以及如何修复它。
</Gist>

## 视频说明

<YouTubeTable
  videos={[
    {
      title: "Why 3DS RNG is Inconsistent",
      id: "-ayvPKWNkNw",
    },
  ]}
/>

## 简要总结

只想知道怎么修复？

- 我们的第四世代工具提供了“3DS Helper”功能！[点此查看教程](/3ds-helper)。
- 如果你的主机已破解，还可以使用更简单的 [3DS Alt Settings 应用](/3ds-alt-settings)。

目前尚未推出第五世代相关工具，但 Alt Settings 同样适用于第五世代乱数。

## 问题来源

许多玩家在 3DS 上进行 NDS 游戏的乱数时会发现“秒数不稳定”的问题。过去这被归咎于 TwilightMenu 或 NDS 启动延迟，但我对此一直存疑。

如果问题真是出在启动延迟上，那么只要在计时器响时软重启游戏，就应该能解决——然而事实并非如此。

这让我怀疑问题其实出现在更早的时间设定环节。

## 我的推测

问题的根源很可能在于 3DS 设置系统时间的方式。

在许多现代设备中，手动设置时间时不会清除“毫秒值”（ms），也就是说，设置时间为 14:32:00 时，内部时间可能是 14:32:00.927，这就意味着时间偏差将从最开始就存在。

如果 3DS 也有类似行为，那么哪怕只差几毫秒，也可能导致你的秒数偏移整整 1 秒。

## 实验测试

我编写了一个研究用插件，在系统设置界面中记录每帧的时间信息。下面是截图说明：

- **Now** = 表示当前系统时间
- **Changed at** = 表示设置时间之前的那一帧
- **Measured after change** = 表示时间设定后立刻记录的一帧

![截图1](/images/3DS/3ds-helper-1.webp)

![截图2](/images/3DS/3ds-helper-2.webp)

**测试结果：**

- 第一张图中，毫秒值在设定时间之后没有重置，验证了前面的推测。
- 第二张图中，设置时间为 14:32 且带有 987 毫秒后，系统很快便显示为 14:32:01，说明这个问题具有可重复性。

## 解决方法

- 我们的第四世代工具配备了“3DS Helper”功能！[点击这里了解详情](/3ds-helper)。
- 如果你拥有破解主机，使用 [3DS Alt Settings 应用](/3ds-alt-settings) 是更简单快捷的选择。

虽然第五世代目前尚未推出专用工具，但 Alt Settings 同样适用于第五世代乱数。

## Credits

- Zaksabeast for researching this and writing the tools to fix it
- 中文翻译：炫夜鳞、白希洛/Hakuhiro
`;export{n as default};
