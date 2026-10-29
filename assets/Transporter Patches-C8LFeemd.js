var e=`---
title: "宝可梦虚拟银行与宝可传送离线及 SD 重定向补丁"
navDrawerTitle: "虚拟银行与宝可传送离线补丁"
description: "通过离线补丁将虚拟银行保存在 SD 卡中，使虚拟银行与宝可传送无需服务器也能使用。"
slug: "zh-offline-bank-transporter-mod"
translation:
  enSlug: "offline-bank-transporter-mod"
  language: "zh"
---

宝可梦虚拟银行即将关闭，而虚拟银行与宝可传送都依赖服务器才能运行。[Wokann 的一体化补丁](https://github.com/Wokann/bank_and_mover_offline_patch)可以将虚拟银行保存在 SD 卡中，让两者继续使用。

- **离线虚拟银行**：将虚拟银行保存在 SD 卡中，也可以下载现有的在线银行内容并保留。
- **离线宝可传送**：无需联网，即可将宝可梦传入本地虚拟银行。
- **卡带重定向**：使用 SD 卡中的第五世代存档，例如 [TWiLightMenu](https://github.com/DS-Homebrew/TWiLightMenu)、[nds-bootstrap](https://github.com/ahezard/nds-bootstrap) 或模拟器存档。

> [!TIP]
> 离线状态可以让宝可传送获得稳定的延迟，使[宝可传送乱数](/transporter-rng-offline)更加可靠。

## 安装补丁

> [!WARNING]
> 此补丁取代了旧版宝可传送离线补丁、PKSM 补丁和卡带重定向补丁。安装前请删除旧补丁，例如 \`code.ips\`。

请先确认 3DS 已安装自制固件（[安装指南](https://3ds.hacks.guide/)）。

1. 按住 \`Select\` 开机，进入 Luma 设置菜单。
2. 勾选“Enable game patches”，保存设置。
3. 按照 [Wokann 的 GitHub 仓库](https://github.com/Wokann/bank_and_mover_offline_patch#download-and-installation)中的安装说明操作。

## 特别鸣谢

- 中文翻译：白希洛/Hakuhiro
`;export{e as default};