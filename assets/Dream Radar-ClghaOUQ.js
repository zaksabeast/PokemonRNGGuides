const n=`---
- title: "第五世代AR搜寻器乱数"
  description: "乱数获取等级5梦境球隐藏特性的传说宝可梦"
  slug: "zh-emulator-b2w2-dream-radar"
  translation:
    enSlug: "emulator-b2w2-dream-radar"
    language: "zh"
---

## 所需工具

- [Desmume](/desmume-setup)
- [RNG Reporter](https://github.com/Admiral-Fish/RNGReporter/releases)
- [Suloku 的第五世代存档工具（可选）](https://github.com/suloku/BW_tool/releases). 你也可以在通过AR搜寻器获得目标宝可梦后提取你的 BW2 存档，而不是注入。

\`\`\`
注意：RNG Reporter 中的 “Dream Radar” 标签页当前无法使用。本指南将介绍一种替代方法来查找种子以及所需的 IV/性格组合。
\`\`\`

## 第一步：查找目标个体

1. 打开 RNG Reporter，进入「Gen 5 Time Finder」，保持在「Capture」标签页并调整设置。
2. 将 IV 设置为你的目标值，遭遇类型设为「Wild Pokémon」，方法选择「IVs (Standard Seed)」。
3. 灵兽三神（龙卷云、雷电云、土地云）的最小 IV 帧为 21，其他宝可梦为 8。最大帧数可根据需求设定。
4. 点击「Search」并等待结果出现。

![Timefinder](/images/Black2-and-White2/Dream-Radar/Timefinder.png)

对于第四世代的传说宝可梦或一般宝可梦，请选择偶数帧数的结果；对于灵兽形态宝可梦，请选择奇数帧数的结果。

## 第二步：确定性格（可选）

要预测性格，请回到 RNG Reporter 主界面，选择「Gen 5 PIDRNG」。AR搜寻器的性格无法控制，只能预测。

以下是用于计算性格所命中的 PID 帧的公式：

### 灵兽三神

- (你的 IV 帧数 - 21) / 2 = 所需推进的次数
- 初始 PIDRNG 帧 + 7 + 推进次数 = 命中的 PID 帧

### 第四世代传说 + 有性别的宝可梦

- (你的 IV 帧数 - 8) / 2 = 所需推进的次数
- 初始 PIDRNG 帧 + 2 + (2 × 推进次数) = 命中的 PID 帧

### 无性别宝可梦

- (你的 IV 帧数 - 8) / 2 = 所需推进的次数
- 初始 PIDRNG 帧 + 1 + (2 × 推进次数) = 命中的 PID 帧

## 第三步：进行乱数操作

1. 使用钥匙系统（Key System）中的「发送与接收钥匙（Send and Receive Keys）」功能进行推进帧数。每次开始「发送与接收钥匙」搜索时，会同时推进 PIDRNG 与 IVRNG 各 2 帧。
2. 获取你的宝可梦。在下方示例中，我们成功得到了一个梦境球+隐藏特性的土地云！

![Result](/images/Black2-and-White2/Dream-Radar/Result.png)

## 特别鸣谢

- 中文翻译：炫夜鳞、白希洛/Hakuhiro。
`;export{n as default};
