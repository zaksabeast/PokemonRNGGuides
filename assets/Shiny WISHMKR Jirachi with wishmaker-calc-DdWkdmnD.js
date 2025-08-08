const n=`---
- title: "红蓝宝石 许愿星基拉祈（Wishmaker）乱数指南"
  description: "学习如何在红宝石与蓝宝石中，通过圆形竞技场乱数出异色的许愿星基拉祈。"
  slug: "zh-emulator-rs-wishmaker"
  translation:
    enSlug: "emulator-rs-wishmaker"
    language: "zh"
- title: "红蓝宝石 流星基拉祈（Meteor）乱数指南"
  description: "学习如何乱数流星基拉祈，其异色判定与许愿星不同。"
  slug: "zh-meteor-jirachi"
  translation:
    enSlug: "meteor-jirachi"
    language: "zh"
---

## 所需工具

<ShowIf slug="/zh-emulator-rs-wishmaker">

- [mGBA](/mgba-setup)
- [RS checksum lua script](https://github.com/Real96/PokeLua/blob/main/Gen%203/mGBA/RS_RNG_Checksums_mGBA.lua)

</ShowIf>

<ShowIf slug="/zh-meteor-jirachi">

- [mGBA](/mgba-setup)
- [RS checksum lua script](https://github.com/Real96/PokeLua/blob/main/Gen%203/mGBA/RS_RNG_Checksums_mGBA.lua)
- Meteor Jirachi Multiboot Rom with the [No Dolphin patch](/no-dolphin-patch)

</ShowIf>

## 第一步：设置 Lua 脚本

编辑脚本中的 \`savePath\` 行，改为你的游戏存档路径。

Windows 用户使用双斜杠 \`\\\\\`：

\`\`\`
local savePath = "D:\\\\Desktop\\\\mGBA\\\\battery\\\\Pokemon - Ruby.sav"
\`\`\`

Mac 或 Linux 用户使用单斜杠 \`/\`：

\`\`\`
local savePath = "/Users/username/Desktop/mGBA/battery/Pokemon - Ruby.sav"
\`\`\`

## 第二步：查找目标

1. 上传你的存档，并使用下方工具搜索目标基拉祈。
   - 如果出现“需要再次保存！”错误，请在游戏中重新保存并上传。
2. 用文本编辑器打开 Lua 脚本。
3. 将脚本开头的 \`targetSeed\`、\`targetSaveHour\`、\`targetMinute\`、\`targetSecond\`、\`targetSixtiethSecond\` 更新为你想要的目标基拉祈信息。

<ShowIf slug="/zh-emulator-rs-wishmaker">

<MultibootJirachi jirachi="Wishmaker" />

</ShowIf>

<ShowIf slug="/zh-meteor-jirachi">

<MultibootJirachi jirachi="Meteor" />

</ShowIf>

## 第三步：命中目标种子

1. 在模拟器设置中禁用 RTC（实时时钟）。
2. 载入游戏并运行 Lua 脚本。
3. 开始保存游戏，直到屏幕出现“已有存档”提示。
4. 当脚本提示的 \`Current Time\` 接近 \`Target Base Save Time\` 时暂停模拟器。
5. 手动推进帧数，直到 \`Current Time\` 与 \`Target Base Save Time\` 完全一致。
6. 按下 \`A\` 键保存。
7. 如果 \`Segment 0 Checksum Seed\` 与 \`Target Checksum Seed\` 一致，恭喜！你保存的这个文件将生成目标基拉祈！

![最终画面](/images/Ruby-Sapphire/Wishmaker/Final-Screen.png)

![脚本画面](/images/Ruby-Sapphire/Wishmaker/Script.png)

## 故障排除

再次确认已禁用 RTC。

如果区块 0 的校验种子不匹配任何异色基拉祈种子，请重新开始整个流程。

确保你保存的时间是 \`Target Base Save Time\`，不是 \`Target Final Time\`。

<ShowIf slug="/zh-emulator-rs-wishmaker">

## 如何领取基拉祈

你有几种方式可以领取：

- 将你的存档转移到实机，用实际的 Bonus Disc 兑换。
- 用 Dolphin 模拟器运行 Bonus Disc，并与 GBA 模拟器连接 — [教程见此](/misc-dolphin-connect-vba)。
- 完全跳过 Dolphin，使用 No Dolphin 补丁 — [教程见此](/no-dolphin-patch)。

</ShowIf>

## 目标性格与个体

<ShowIf slug="/zh-meteor-jirachi">

### 异色流星基拉祈

| 种子 | PID      | 个体值            | 异色 |
| ---- | -------- | ----------------- | ---- |
| 0313 | 34a3435f | 28/07/21/29/27/09 | 是   |
| 49d7 | c9e9be16 | 26/22/05/27/28/01 | 是   |
| 4c8c | d7bba042 | 26/25/26/23/18/23 | 是   |
| 4e26 | 2f5558ad | 26/04/13/10/00/30 | 是   |
| 5979 | 07ff7007 | 26/03/17/07/29/15 | 是   |
| 9350 | 6d011af9 | 24/08/11/21/19/15 | 是   |
| 9ea3 | 45ab3253 | 24/07/15/18/16/00 | 是   |
| a03d | 9d45eabe | 24/18/01/05/30/07 | 是   |
| e567 | daf1ad0a | 22/22/31/15/17/24 | 是   |
| f0ba | b39bc465 | 22/21/03/12/14/09 | 是   |

### 所有个体值均 ≥25 的流星基拉祈

| 种子 | PID      | 个体值            | 异色 |
| ---- | -------- | ----------------- | ---- |
| 0a79 | d5cb4261 | 30/25/29/29/28/25 | 否   |
| 1ad4 | 9c309bd5 | 27/29/31/31/29/25 | 否   |
| 9df6 | d2a8aa71 | 31/31/25/30/25/28 | 否   |
| bd9d | be845336 | 31/30/28/27/29/28 | 否   |
| d517 | e812b093 | 31/29/30/31/30/31 | 否   |

### 个体值为0最多的流星基拉祈

| 种子 | PID      | 个体值            | 异色 |
| ---- | -------- | ----------------- | ---- |
| 0f71 | a7215a50 | 00/00/26/00/09/00 | 否   |
| 1dea | 96263d9d | 00/30/00/00/00/05 | 否   |
| a64d | 5f80e487 | 00/05/00/00/00/10 | 否   |
| a738 | c08a8fca | 12/00/29/00/00/00 | 否   |

</ShowIf>

<ShowIf slug="/zh-emulator-rs-wishmaker">

### 异色许愿星基拉祈

| 种子 | PID      | 个体值            | 异色 |
| ---- | -------- | ----------------- | ---- |
| 353d | ba7df435 | 24/03/30/12/16/11 | 是   |
| 3d60 | eb0da543 | 15/28/29/03/00/07 | 是   |
| 7236 | 2ec1608d | 31/23/26/29/18/05 | 是   |
| 7360 | bf98f1d5 | 29/10/31/25/23/21 | 是   |
| 9359 | bcfaf2b0 | 03/12/12/07/11/09 | 是   |
| a030 | 4633087d | 21/31/31/18/24/19 | 是   |
| cf37 | 7b053548 | 11/08/06/14/05/20 | 是   |
| ecdd | 987ed636 | 19/07/10/19/10/16 | 是   |
| f500 | c90e8744 | 10/00/10/10/26/12 | 是   |

### 所有个体值均 ≥25 的许愿星基拉祈

| 种子 | PID      | 个体值            | 异色 |
| ---- | -------- | ----------------- | ---- |
| 0a79 | d5cb4261 | 30/25/29/29/28/25 | 否   |
| 1ad4 | 9c309bd5 | 27/29/31/31/29/25 | 否   |
| 9df6 | d2a8aa71 | 31/31/25/30/25/28 | 否   |
| bd9d | be845336 | 31/30/28/27/29/28 | 否   |
| d517 | e812b093 | 31/29/30/31/30/31 | 否   |

### 个体值为0最多的许愿星基拉祈

| 种子 | PID      | 个体值            | 异色 |
| ---- | -------- | ----------------- | ---- |
| 0f71 | a7215a50 | 00/00/26/00/09/00 | 否   |
| 1dea | 96263d9d | 00/30/00/00/00/05 | 否   |
| a64d | 5f80e487 | 00/05/00/00/00/10 | 否   |
| a738 | c08a8fca | 12/00/29/00/00/00 | 否   |

</ShowIf>

## 特别鸣谢

- 中文翻译：炫夜鳞、白希洛/Hakuhiro
`;export{n as default};
