var e=`---
title: "钻石/珍珠/白金 PokeFinder 设置"
navDrawerTitle: "PokeFinder 设置"
description: "逐步设置 PokeFinder，用于钻石、珍珠和白金的宝可梦乱数。"
slug: "zh-emulator-dppt-pokefinder-setup"
translation:
  enSlug: "emulator-dppt-pokefinder-setup"
  language: "zh"
---

## 所需工具

- [PokeFinder](/pokefinder)

## 设置配置档案

PokeFinder 可以为每个存档保存独立的配置档案，记录 TID/SID 等搜索种子所需的信息。每个存档只需输入一次，之后重启 PokeFinder 也能继续使用。

1. 打开 PokeFinder，依次点击“Gen 4 Tools”和“Profile Manager”。
2. 在 Profile 区域点击“New”，填写 TID、SID 及游戏版本等信息。
   - 每个配置档案只需设置一次。

![](/images/Diamond-Pearl-Platinum/PokeFinder/profile-editor.png)

## 菜单选项

PokeFinder 主界面可以选择乱数类型，应根据目标宝可梦选择对应项目。

- Stationary：场景中的定点宝可梦，以及赠送宝可梦。
- Wild：草丛、冲浪等方式遭遇的野生宝可梦。
- Egg：从培育屋领取的蛋。
- TID/SID：搜索想要通过乱数获得的 TID/SID。

![](/images/Diamond-Pearl-Platinum/PokeFinder/gen4-menu.png)

## Generator 与 Searcher

Stationary、Wild 和 Egg 窗口中均有“Generator”和“Searcher”两个标签页。

可以通过 Profile 旁的下拉菜单选择配置档案。如果只建立了一个，会默认选中。

多数乱数流程会先用“Searcher”查找初始种子，再将找到的种子填入“Generator”，进行后续宝可梦乱数。

![](/images/Diamond-Pearl-Platinum/PokeFinder/generator.png)

### Searcher：搜索种子

1. 切换到“Searcher”，根据目标选择生成方式及遭遇类型。
   - 对应乱数指南会说明应该选择哪一项。
2. 按需选择同步、迷人之躯等队首效果，Method 1 不适用。
   - 如果目标并非无性别或固定性别，且想使用迷人之躯，请参考迷人之躯指南。
3. 设置目标宝可梦的筛选条件。
4. 点击“Search”，等待搜索完成。
5. 从结果中选择目标种子。
   - 如果多项结果的种子相同，选择任意一项即可。
6. 右键点击种子，选择“Generate times for seed”。

随后会打开“Gen 4 Seed to Time”，显示命中初始种子所需的日期、时间和 delay。这些数值将用于[初始种子乱数指南](dppt-initial-seed-retail)。

![](/images/Diamond-Pearl-Platinum/PokeFinder/searcher.png)

### Generator：生成结果

1. 找到目标种子后，将其复制到“Generator”的“Seed”栏。
2. 其余设置保持与“Searcher”一致。
3. 点击“Generate”，查找目标宝可梦对应的推进帧数。

至此，进行乱数所需的设置就准备好了。

## 特别鸣谢

- 中文翻译：白希洛/Hakuhiro
`;export{e as default};