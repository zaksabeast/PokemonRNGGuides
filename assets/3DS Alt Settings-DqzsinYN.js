const n=`---
title: "3DS Alt Settings - 适用于乱数的 3DS 设置应用"
description: "无需重启即可设置 3DS 系统时间 - 这对于更快速、更稳定地进行宝可梦乱数尝试很有用。"
slug: "zh-3ds-alt-settings"
translation:
  enSlug: "3ds-alt-settings"
  language: "zh"
---

<Gist>
  无需重启即可设置 3DS 系统时间 - 让你的宝可梦乱数尝试更快速、更稳定。
</Gist>

## 什么是 3DS Alt Settings？

[**3DS Alt Settings**](https://github.com/zaksabeast/Alt-3ds-Settings/releases/latest) 是一款为 **Nintendo 3DS** 开发的 Homebrew 应用程序，它通过与系统设置相同的方式修改时间，但具有以下优势：

- 无需重启主机，尝试次数更快。
- 会一并重置毫秒值，无需手动校准时间误差。

要使用 3DS Alt Settings，你的 3DS 必须安装了 **自制系统（CFW）**。

- [点击这里查看安装自制系统的指南](https://3ds.hacks.guide/)

## 如何使用？

这和传统的 **NDS 乱数几乎一模一样**，只是需要在**第一个计时器响起时进行软重启**。

1. 下载 [3DS Alt Settings 最新版本](https://github.com/zaksabeast/Alt-3ds-Settings/releases/latest)。
2. 在进行第四代或第五代的乱数操作时，用 3DS Alt Settings 替代系统自带的设置菜单。
3. 开始计时器的同时，在 3DS Alt Settings 中设置日期和时间。
4. 按 \`Start\` 退出 Alt Settings 应用。
5. 启动你的第 四/五 代宝可梦游戏。
6. 第一声计时器响起时，执行软重启操作。

<Alert
  showIcon
  type="info"
  message="小贴士!"
  description={\`Alt Settings 应用程序会在你松开 A 键之后才真正设定时间。为了更精确的时机控制，建议先按住 A 键，在准备好的那一刻，同时松手并按下计时器的“开始”按钮。\`}
/>

## 接下来可以做什么？

可以使用 3DS Alt Settings 尝试这些乱数目标：

- [迷人之躯乱数](/hgss-tid-sid)
- [御三家乱数](/retail-hgss-starter)

## 特别鸣谢

- Zaksabeast for researching this and making the 3DS Helper tool
- Rainlan on Discord for the \`A\` button idea, which makes timing much easier
- 中文翻译：炫夜鳞、白希洛/Hakuhiro
`;export{n as default};
