var e=`---
title: "设置 3DS 模拟器（Azahar/Lime3DS/Citra）"
navDrawerTitle: "设置 Azahar"
description: "设置 3DS 模拟器用于乱数，包括导出游戏及安装更新。"
slug: "zh-citrarng-setup"
translation:
  enSlug: "citrarng-setup"
  language: "zh"
---

本教程介绍如何设置 3DS 模拟器，在电脑上进行乱数操作。你需要一台自制固件已更新的 3DS，用于导出游戏数据。

## 所需工具

- [Azahar](https://github.com/azahar-emu/azahar/releases/latest)
- [最新版 GodMode9](https://github.com/d0k3/GodMode9/releases)
- [已安装自制固件（CFW）的 3DS](https://3ds.hacks.guide/)
- 3DS 上已安装的最新版游戏更新
- 可选：[Dump_PKMN_Update.gm9 脚本](/downloads/Dump_PKMN_Updates.gm9)

## 导出游戏数据

选择以下任意一种方式导出游戏及更新。

### 自动导出游戏及更新

1. 将 \`Dump_PKMN_Update.gm9\` 脚本放入 3DS SD 卡的 \`sdmc:\\gm9\\scripts\`。
2. 按住 \`Start\` 开机，启动 GodMode9。
3. 按下主机的 \`Home\` 键打开菜单。
4. 选择“Scripts...”。
5. 选择“Dump_PKMN_Updates”脚本，并按屏幕提示操作。
6. 将 \`/gm9/out\` 中的文件复制到电脑。

### 手动导出实体卡带

1. 选择 \`[C:] GAMECART\`。
2. 选择 \`trim.3ds\` 文件。
3. 选择“NCSD image options...”。
4. 选择“Build CIA from file”。
5. 退出 GodMode9，将 \`sdmc:\\gm9\\out\` 中的文件传到电脑。

> [!NOTE]
> 游戏更新只以数字形式安装。

### 手动导出数字版游戏及更新

1. 将光标移到 \`[A:] SYSNAND SD\`。
2. 按住 \`R\`，再按下 \`A\` 打开驱动器选项。
3. 选择“Open title manager...”。
4. 在要导出的游戏或更新上按下 \`A\`。
5. 选择“Manage Title...”。
6. 选择“Build CIA (standard)”。

## 在模拟器中安装游戏

1. 运行模拟器。
2. 选择“File”，再选择“Install cia...”。
3. 分别安装游戏本体和更新的 \`.cia\` 文件。

## 设置乱数工具

参考 [PokeReader 安装指南](/install-pokereader-emu)。

## 特别鸣谢

- 中文翻译：白希洛/Hakuhiro
`;export{e as default};