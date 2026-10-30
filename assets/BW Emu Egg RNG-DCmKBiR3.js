var e=`---
title: "黑/白模拟器孵化乱数"
navDrawerTitle: "孵化乱数"
description: "通过培育屋乱数，在黑/白中获得异色及高个体的蛋。"
slug: "zh-emu-bw-egg"
translation:
  enSlug: "emu-bw-egg"
  language: "zh"
---

## 所需工具

- [PokeFinder](https://github.com/Admiral-Fish/PokeFinder/releases)
- [DeSmuME](/desmume-setup)
- [Lua 脚本](https://github.com/Real96/PokeLua/blob/main/Gen%205/DeSmuMe/BW_RNG_DeSmuMe.lua)
- 已录制喋喋不休的聒噪鸟，推荐准备两只
- 队伍中的一个空位

## 第一步：准备工作

携带道具、遗传、性格与个体值的具体机制，可以参考[此网站](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_breeding)。

1. 将双亲放入培育屋，记下放入顺序、个体值和性格。如果想使用提高异色概率的国际孵化法，需要准备不同语言的亲代。
2. 为聒噪鸟的喋喋不休录音。录入空白声音也可以，只需完成录制。
3. 等待生蛋，在培育屋老爷爷面前保存游戏。
4. 打开 \`PokeFinder → Gen 5 → Egg → Searcher\`。
5. 填写所需的亲代信息。
6. 设置蛋的异色、个体值、特性等筛选条件。
7. 将“Initial Advances”设为至少 10。
8. 按需设置“Max Advances”，条件较严格时可提高数值。
9. 按需设置日期范围，条件较严格时可扩大范围。
10. 生成结果，选择一个目标。

> [!TIP]
> 如果不需要遗传特定招式，建议准备六项完美个体的百变怪，这样更容易满足个体值条件。

## 第二步：进行孵化乱数

1. 按照[初始种子指南](/emulator-bw-runasdate-initial-seed)命中目标初始种子。
2. 在距离目标还有一些推进数时创建即时存档，方便重试。
3. 使用聒噪鸟推进到目标帧数。也可以利用 NPC，但存在不确定性。
4. 关闭菜单，同时连按 \`A\`，尽量不产生额外推进地领取蛋。
5. 如果没有命中，或需要校准，读取即时存档，从第 3 步重新尝试。

**恭喜你！已经获得目标宝可梦了！**

## 特别鸣谢

- Fiask：撰写指南。
- 中文翻译：白希洛/Hakuhiro
`;export{e as default};