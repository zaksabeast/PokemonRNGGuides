var e=`---
title: "梦境雷达免卡带补丁"
description: "让梦境雷达读取 TWiLightMenu、nds-bootstrap 或模拟器存档，无需插入游戏卡带。"
slug: "zh-dream-radar-patches"
translation:
  enSlug: "dream-radar-patches"
  language: "zh"
---

## 卡带重定向补丁

此补丁会改为从 SD 卡读取 \`.sav\` 文件，让梦境雷达认为已插入卡带。

你可以使用 [TWiLightMenu](https://github.com/DS-Homebrew/TWiLightMenu) 或 [nds-bootstrap](https://github.com/ahezard/nds-bootstrap) 的存档，也可以直接使用模拟器存档，无需注入卡带。

## 所需工具

- 已安装自制固件（CFW）的 3DS
- [自制固件安装指南](https://3ds.hacks.guide/)

## 更新 Luma 设置

1. 按住 \`Select\` 开机。
2. 勾选“Enable game patches”。

## 安装补丁

1. 下载并解压 [zip 文件](https://github.com/zaksabeast/DreamRadarCartRedirect/releases)。
2. 将所需的 IPS 补丁复制到 SD 卡对应目录。
   - 日版：\`/luma/titles/0004000000073200\`。
   - 其他地区版本：\`/luma/titles/00040000000AE100\`。
3. 将文件重命名为 \`code.ips\`。
   - 例如，梦境雷达的补丁路径应为 \`/luma/titles/00040000000AE100/code.ips\`。

## 准备存档

1. 确保存档位于 \`/roms/nds/saves/white2.sav\`、\`/roms/nds/saves/black2.sav\`、\`/roms/nds/saves/black.sav\` 或 \`/roms/nds/saves/white.sav\`。
2. 如果使用 TWiLightMenu，还需要在 \`/roms/nds/white2.nds\`、\`/roms/nds/black2.nds\`、\`/roms/nds/black.nds\` 或 \`/roms/nds/white.nds\` 放置对应游戏文件。

设置正确后，梦境雷达会像插入卡带一样识别存档，并允许传送。

## 疑难解答

### Error: Cart not inserted

1. 确保存档文件名及存放位置正确。
2. 确认已在 Luma 中启用游戏补丁。

## 特别鸣谢

- 中文翻译：白希洛/Hakuhiro
`;export{e as default};