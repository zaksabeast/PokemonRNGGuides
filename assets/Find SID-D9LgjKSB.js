const n=`---
- title: "查找第三世代 SID"
  description: "多种方法查找第三世代的SID"
  slug: "zh-gen3-sid"
  translation:
    enSlug: "gen3-sid"
    language: "zh"
- title: "查找第三世代 SID"
  description: "多种方法查找第三世代的SID"
  slug: "zh-rs-gen3-sid"
  translation:
    enSlug: "rs-gen3-sid"
    language: "zh"
- title: "查找第三世代 SID"
  description: "多种方法查找第三世代的SID"
  slug: "zh-frlg-gen3-sid"
  translation:
    enSlug: "frlg-gen3-sid"
    language: "zh"
---

<ShowIf slug="/zh-gen3-sid">

本页面适用于在 **绿宝石** 中查找你的 SID。

在寻找其他版本的指南？请查看以下页面：

- [红宝石 / 蓝宝石 SID 指南](/zh-rs-gen3-sid)
- [火红 / 叶绿 SID 指南](/zh-frlg-gen3-sid)

</ShowIf>

<ShowIf slug="/zh-rs-gen3-sid">

本页面适用于在 **红宝石 / 蓝宝石** 中查找你的 SID。

在寻找其他版本的指南？请查看以下页面：

- [绿宝石 SID 指南](/zh-gen3-sid)
- [火红 / 叶绿 SID 指南](/zh-frlg-gen3-sid)

</ShowIf>

<ShowIf slug="/zh-frlg-gen3-sid">

本页面适用于在 **火红 / 叶绿** 中查找你的 SID。

在寻找其他版本的指南？请查看以下页面：

- [红宝石 / 蓝宝石 SID 指南](/zh-rs-gen3-sid)
- [绿宝石 SID 指南](/zh-gen3-sid)

</ShowIf>

<details>
  <Summary>如果你使用模拟器或 GBA 烧录卡</Summary>

1.使用 [PKHex](https://github.com/kwsch/PKHeX/releases/latest) 或者 [PKHeX Web](https://pkhex-web.github.io/)加载存档查看你的SID。

</details>

<details>
  <Summary>如果你在游玩《红宝石 / 蓝宝石》</Summary>
<br />
### RNG 获取特定的 TID/SID 组合

1. 按照 [红蓝宝石 TID RNG 指南](/retail-rubysapphire-tid) 操作，以获得特定的 TID 和 SID。

### PokeFinder

1. 打开 [PokeFinder](/pokefinder)，在 "Gen 3" 选项卡中点击 "IDs" 按钮。
2. 在弹出的窗口中，选择 "RS" 选项卡。
3. 如果你的游戏电池已耗尽（通常是这种情况），勾选 "Dead Battery" 选项，否则选择创建存档时的时间和日期。
4. 在 PokeFinder 的筛选栏中输入你的 TID。
5. 点击生成可能的 SID 列表。
6. 如果结果中有多个可能的 SID，请在选择初始宝可梦前存档。
7. 依次尝试用这些 SID 进行乱数刷闪，如果成功获得异色宝可梦，你就找到了正确的 SID。

### 使用 Web 工具（仅适用于电池耗尽的情况）

1. 打开 Lincoln 的 [SID Finder](https://lincoln-lm.github.io/JS-Finder/Gen3/IDs.html)。
2. 输入你的 TID，然后点击 "TID" 按钮。
3. 在 "Initial Seed" 处输入 5a0。
4. 点击生成可能的 SID 列表。
5. 如果有多个可能的 SID，请在选择初始宝可梦前存档。
6. 依次尝试用这些 SID 进行乱数刷闪，如果成功获得异色宝可梦，你就找到了正确的 SID。

</details>

<details>
  <Summary>如果你已经拥有异色宝可梦</Summary>

1. 如果宝可梦曾参与战斗，使用降低努力值的树果重置努力值。
2. 打开 [PokeFinder](/pokefinder) ，进入 "工具" > "IV Calculator"。
3. 输入宝可梦的信息，以计算其个体值（IV）。
4. 进入 "第三世代工具" > "IVs to PID"。
5. 输入宝可梦的 IV、性格，以及你的 TID。
6. 进行搜索，并根据不同情况选择正确的方法：
   - 野生宝可梦：方式 1-4。
   - 传说宝可梦：方式 1。
7. 如果结果中出现多个 SID，请尝试用不同 SID 进行乱数刷闪，直至找到正确的 SID。

</details>

<details>
  <Summary>如果你在游玩《绿宝石》，且没有更改武斗镇的流行话题，并且游戏电池已耗尽</Summary>

1. [请参考本指南](/emerald-sid-feebas)

</details>

<details>
  <Summary>如果你在游玩《绿宝石》，且没有更改武斗镇的流行话题，并且存档时间不足一天</Summary>

1. [请参考本指南](/emerald-sid-feebas)

</details>

<details>
  <Summary>如果你有一台已破解的 Wii 或 GameCube，以及一条 GBA-GC 连接线</Summary>

1. 使用 [FIX94's gba-link-cable-dumper](https://github.com/FIX94/gba-link-cable-dumper/releases/tag/v1.6)转储存档。
2. 使用 [PKHex](https://github.com/kwsch/PKHeX/releases/latest) 或 [PKHeX Web](https://pkhex-web.github.io/) 加载存档，即可查看 SID。

</details>

<details>
  <Summary>如果你有一台 NDS 和 NDS 烧录卡</Summary>

1. 使用 [Rudolph's GBA Backup Tool](https://projectpokemon.org/home/tutorials/save-editing/managing-gba-saves/using-gba-backup-tool-r55/)导出存档。
2. 使用 [PKHex](https://github.com/kwsch/PKHeX/releases/latest) 或 [PKHeX Web](https://pkhex-web.github.io/) 加载存档，即可查看 SID。

</details>

<details>
  <Summary>如果你可以将宝可梦传输到已破解的 DSi、3DS 或 Switch</Summary>

1. 将宝可梦传输到你的破解主机。
2. 导出存档：
   - [DSi 使用 GodMode9](https://github.com/DS-Homebrew/GodMode9i/releases/latest)
   - [3DS 使用 Checkpoint](https://github.com/BernardoGiordano/Checkpoint/releases/latest)
   - [Switch 使用 JKSV](https://github.com/J-D-K/JKSV/releases/latest)
3. 使用 [PKHex](https://github.com/kwsch/PKHeX/releases/latest)、[PKSM](https://github.com/FlagBrew/PKSM/releases/latest) 或 [PKHeX Web](https://pkhex-web.github.io/) 加载存档，即可查看 SID。

</details>

<details>
  <Summary>如果你有一台连接 WiFi 的 NDS 和第四世代游戏</Summary>

1. 加入 [Pokemon RNG Discord](https://www.discord.gg/d8JuAvg)。
2. 请求其他人使用 [PokeClassic Network GTS](https://pkmnclassic.net/gts/)检查你的宝可梦 SID。
3. 将宝可梦传输到第四世代游戏。
4. 在 [PokeClassic Network GTS](https://pkmnclassic.net/gts/)上上传宝可梦。
5. 告诉对方你的宝可梦信息，让他们帮你查询。

</details>

<details>
  <Summary>如果你可以将宝可梦传输到 Pokemon Home</Summary>

1. 将宝可梦传输到 Pokemon Home。
2. 加入 [Pokemon RNG Discord](https://www.discord.gg/d8JuAvg).
3. 请求其他人帮忙检查你的 SID。

</details>

<details>
  <Summary>如果你愿意使用 ACE（代码执行漏洞）并游玩《绿宝石》</Summary>

1. 按照 [本指南](https://e-sh4rk.github.io/ACE3/emerald/getting-started/introduction/)设置 ACE。
2. 在 [此 pastebin](https://pastebin.com/kYfBzVE3)使用 "读取 Box 9 Slot 27 的 SID" 代码，它会将你的 TID 设为 SID。
3. 打开训练家卡片，此时显示的 TID 就是你的 SID。
4. 软重置游戏，避免保存变更。

</details>

<details>
  <Summary>如果你愿意重新开始一个新的存档（适用于《绿宝石》、《火红》或《叶绿》）</Summary>

1. 开始一个新的存档。
2. 在 "YOUR NAME?" 界面按下 A 确认名字的同时，启动秒表计时。
3. 当角色缩小并变白（即即将进入卡车的瞬间），停止秒表计时。
4. 打开 [PokeFinder](/pokefinder)，在 "第三世代" 选项卡中点击 "IDs" 按钮。
5. 在新窗口中选择 "FRLGE" 选项卡。
6. 在 TID 字段输入你的训练师 ID。
7. 用秒表记录的秒数乘以 59.7275，并向下取整，即为可能的起始帧数。
8. 计算 (可能的起始帧数 - 50)，并输入到 Initial Advances 字段。
9. 计算 (可能的起始帧数 + 50)，并输入到 Max Advances 字段。
10. 点击生成可能的 SID 列表。
11. 如果有多个可能的 SID，请在选择初始宝可梦前存档。
12. 依次尝试用这些 SID 进行乱数刷闪，如果成功获得异色宝可梦，你就找到了正确的 SID。

</details>

<details>
  <Summary>如果以上方法都不适用（最后的选择）</Summary>

1. 试着随机遇到一只异色宝可梦。
2. 然后参考上方的 "如果你已经拥有异色宝可梦" 方法来查找 SID。

</details>

如果你发现有其他方法未被列出，请加入 [Pokemon RNG Discord](https://www.discord.gg/d8JuAvg) 并告诉我们！

## 特别鸣谢

- 中文翻译：炫夜鳞、白希洛/Hakuhiro
`;export{n as default};
