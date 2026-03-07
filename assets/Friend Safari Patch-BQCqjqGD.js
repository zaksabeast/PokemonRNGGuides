const n=`---
title: "XY全朋友狩猎区补丁"
description: "介绍如何使用游戏补丁在《宝可梦 X / Y》中解锁全部朋友狩猎区宝可梦，包括百变怪与花纹蝶。"
slug: "zh-xy-friend-safari-patch"
translation:
  enSlug: "xy-friend-safari-patch"
  language: "zh"
---

该补丁允许《宝可梦 X / Y》访问任意朋友狩猎区宝可梦。它会让游戏认为主机拥有 71 位好友，并且这些好友对应的所有朋友狩猎区都已解锁第三栏位。

此补丁不会修改你实际的 3DS 好友列表，仅会让游戏内部判断存在这些虚拟好友。

## 所需工具

- [一台已安装 CFW 的 3DS](https://3ds.hacks.guide/) 或 [Azahar](https://github.com/azahar-emu/azahar/releases/latest)
- [全朋友狩猎区补丁下载](https://github.com/zaksabeast/XY-All-Friend-Safaris-Patch/releases)

## 视频教程

<YouTubeVideo id="_pvOsA7Q0KY" />

## 3DS 操作步骤

### 更新 Luma 设置

1. 在开机时按住 \`Select\` 键。
2. 勾选 "Enable game patches"。

### 安装补丁

1. 从上方链接下载 \`code.ips\`。
2. 将 \`code.ips\` 复制到 SD 卡对应路径：

   - **X**：\`/luma/titles/0004000000055D00/code.ips\`
   - **Y**：\`/luma/titles/0004000000055E00/code.ips\`

## Azahar 操作步骤

### 安装补丁

1. 从上方链接下载 \`code.ips\`。
2. 右键点击游戏并选择 "打开 Mods 位置"。
3. 将 \`code.ips\` 复制到弹出的目录中。

## 特别鸣谢

- 中文翻译：炫夜鳞、白希洛/Hakuhiro
`;export{n as default};
