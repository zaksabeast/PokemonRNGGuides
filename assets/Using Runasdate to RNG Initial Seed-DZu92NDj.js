const n=`---
- title: "黑白2初始seed乱数"
  description: "学习如何在黑白2中乱数你的初始seed"
  slug: "zh-emulator-b2w2-runasdate-inital-seed"
  translation:
    enSlug: "emulator-b2w2-runasdate-inital-seed"
    language: "zh"
- title: "黑白初始seed乱数"
  description: "学习如何在黑白中乱你的初始seed"
  slug: "zh-emulator-bw-runasdate-initial-seed"
  translation:
    enSlug: "emulator-bw-runasdate-initial-seed"
    language: "zh"
---

\`\`\`
本指南假设你已经选好目标种子。在跟随本指南操作之前，请确保已确认目标种子。
\`\`\`

## 所需工具

- [Desmume](/desmume-setup)
- [RunAsDate](https://www.nirsoft.net/utils/run_as_date.html)

### 什么是 RunAsDate？

RunAsDate 是 Nirsoft 开发的一款工具，可以让程序以用户指定的时间启动。在第五世代乱数中，它可以帮助你更轻松地命中目标种子。本指南仅聚焦于 RunAsDate 的使用。

## 第一步：设置 RunAsDate

1. 打开 RunAsDate。
2. 按下方图片进行配置。

![Setup](/images/Black-and-White/Initial-Seed/Setup.png)

\`\`\`
这个配置只需设定一次。这是适用于第三、第四和第五世代乱数的通用 RunAsDate 配置。
\`\`\`

3. 点击 Browse... 按钮，选择你希望伪装时间的程序（Desmume 模拟器）。
4. 将日期和时间设置为 PokeFinder 给出的其中一个时间，以命中目标种子。
5. 点击 Run，Desmume 将以你选择的日期和时间启动。

此时，Desmume 将运行在你设定的时间环境下。

## 第二步：命中目标种子

1. 加载你的游戏存档。
2. 加载 Lua 脚本。
3. 根据需要执行按键操作以命中目标种子。
4. 完成后，即可像普通乱数那样继续操作！

## 问题排除

如果使用 RunAsDate 后第一次未能命中正确的种子，请检查以下内容：

- RunAsDate 设置的时间是否正确。
- 乱数配置文件是否正确。
- 命中种子所需的按键操作是否正确执行。

## 特别鸣谢

- 中文翻译：炫夜鳞、白希洛/Hakuhiro。
`;export{n as default};
