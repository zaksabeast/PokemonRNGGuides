var e=`---
title: "在 3DS 或模拟器中使用 IPS 补丁"
navDrawerTitle: "使用 IPS 补丁"
description: "学习在 Luma3DS、Azahar 或 Citra 中使用 IPS 补丁，并合并多个补丁。"
slug: "zh-misc-3ds-ips-luma-citra"
translation:
  enSlug: "misc-3ds-ips-luma-citra"
  language: "zh"
---

## 什么是 IPS 补丁？

IPS 补丁是无需修改整个 ROM，就能改变游戏运行方式的小文件。常见的补丁包括文字瞬间显示、去除轮廓线及一些小修正。实机 3DS 和模拟器都可以使用。

## 所需工具

- [已安装自制固件的 3DS](https://3ds.hacks.guide/) 或 [Azahar](https://github.com/azahar-emu/azahar/releases/latest)
- 想要使用的 \`code.ips\` 文件

## 3DS 操作说明

### 更新 Luma 设置

1. 按住 \`Select\` 开机。
2. 勾选“Enable game patches”。

### 安装补丁

1. 通过 [3dsdb](http://www.3dsdb.com/) 查找游戏的 Title ID。
2. 将 \`code.ips\` 放入 \`/luma/titles/_title ID_/code.ips\`。

例如，究极之月的路径为 \`/luma/title/00040000001B5100/code.ips\`。

## Azahar 操作说明

1. 在 Azahar 中右键点击游戏。
2. 选择“Open Mods Location”，打开模组文件夹。
3. 将 \`code.ips\` 复制进去。

### Azahar 补丁视频教程

<YouTubeVideo id="klBkGQDaQR8" />

## 合并补丁

<IpsMerger />

1. 点击上方的“Upload”。
2. 选择要合并的 IPS 补丁。
3. 点击“Download”。

## 推荐补丁

无需卡带即可使用梦境雷达：[梦境雷达免卡带补丁](/dream-radar-patches)。

让虚拟银行与宝可传送离线运行：[离线补丁](/offline-bank-transporter-mod)。

## 特别鸣谢

- 中文翻译：白希洛/Hakuhiro
`;export{e as default};