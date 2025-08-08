const n=`---
- title: "GBA BIOS 文件 - 它是什么以及如何提取给模拟器使用"
  description: "了解什么是GBA BIOS，为什么模拟器（如mGBA、VBA）需要它，以及如何从实机中合法提取它。"
  slug: "zh-misc-dolphin-gba-bios"
  translation:
    enSlug: "misc-dolphin-gba-bios"
    language: "zh"
---

## 什么是GBA BIOS?

GBA BIOS 是一个小型文件（16 KB），包含 Game Boy Advance 的内置固件。它负责处理低级系统任务，例如：

- 启动游戏。
- 运行某些图形和声音功能。
- 管理存档类型和重启操作。

许多模拟器需要 GBA BIOS 文件才能正确运行游戏。如果没有它，可能会遇到错误、缺失的图形或异常行为。本指南展示了两种合法方法自行提取 GBA BIOS。

## 所需工具

- 一台安装了自定义固件（CFW）的3DS，并至少有一个来自eShop的VC游戏（GB, GBC 或 NES）。
- 或者，一台已破解的Wii，配合GBA与GameCube的联机线，以及一台GBA或GBASP。
- https://3ds.hacks.guide/ 有安装 CFW 的详细指南。
- https://wii.hacks.guide/ 有破解 Wii 的步骤。

## 使用NES/GB/GBC的VC游戏和3DS破解机

1. 启动GodMode9并按下\`A\`进入"SYSNAND SD"。
2. 同时按住\`R\`和\`A\`，然后按下\`A\`选择"Search for Titles"来查看所有标题。
3. 搜索你的NES/GB/GBC VC游戏（标题后缀为.tmd），然后按下\`A\`。
4. 选择 "TMD files option.." ，然后选择 "Build CIA (Standard)"。生成的.CIA文件会保存到SD卡的\`/gm9/out/\`目录下。
5. 进入\`/gm9/out/\`文件夹，按下\`A\`选择对应VC游戏，然后选择"CIA image options..."。
6. 选择"Mount image to drive"，并按下\`A\`确认。
7. 按下\`A\`选择"0000.00000002"，然后按下\`A\`选择"romfs".
8. 找到"agb.bin"的文件按\`A\`选择，然后选择"Copy to 0:/gm9/out"。
9. 此时，GBA BIOS文件已保存到\`/gm9/out\`。将此文件复制到电脑，重命名为\`GBA.BIOS\`，并将其放入模拟器所在文件夹。

## 使用破解的Wii

1. 下载最新版[GBA Link Cable Dumper](https://github.com/FIX94/gba-link-cable-dumper/releases)。解压文件并将其放入主机SD卡的\`apps\`文件夹，路径为\`apps/gba-gc-link-dumper/boot.dol\`。
2. 启动主机进入Homebrew Launcher并运行GBA Link Cable Dumper。
3. 按照提示，将 GBA与GameCube的联机线插入 Wii 的 GameCube 手柄插槽。
4. 连接GBA/GBASP并开机。
5. 等待程序加载后，按下 \`Y\` 键开始转储 GBA BIOS。
6. 完成后关闭主机并取出 SD 卡。
7. GBA BIOS 文件位于\`/dumps/gba_bios.bin\`.
8. 将此文件复制到电脑，重命名为\`GBA.BIOS\`，并将其放入模拟器所在文件夹。

## 特别鸣谢

- 中文翻译：白希洛/Hakuhiro
`;export{n as default};
