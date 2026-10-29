var e=`---
- title: "钻石/珍珠/白金传说、赠送与化石乱数"
  navDrawerTitle: "传说、赠送与化石乱数"
  description: "学习在钻石、珍珠和白金中，对赠送、传说、化石、NPC 交换及其他定点宝可梦进行乱数，获得理想个体、性格和异色。"
  slug: "zh-retail-dppt-static"
  translation:
    enSlug: "retail-dppt-static"
    language: "zh"
- title: "钻石/珍珠/白金蜜树宝可梦乱数"
  navDrawerTitle: "蜜树宝可梦乱数"
  description: "学习在钻石、珍珠和白金中获得理想个体、性格及异色的蜜树宝可梦。"
  slug: "zh-retail-dppt-honey-pokemon"
  translation:
    enSlug: "retail-dppt-honey-pokemon"
    language: "zh"
---

<Gen4Reset />

> [!NOTE]
> 本指南为交互式教程，会根据你的设置调整操作说明！

<ShowIf slug="zh-retail-dppt-static">

<Gist>获取理想个体与性格的异色传说及赠送宝可梦。</Gist>

</ShowIf>

<ShowIf slug="zh-retail-dppt-honey-pokemon">

<Gist>获取理想个体与性格的异色蜜树宝可梦。</Gist>

</ShowIf>

<Stepper titles={["设置", "选择宝可梦", "命中种子", "获取宝可梦", "校准"]}>

<Step step={0}>

## 设置

<ShowIf slug="zh-retail-dppt-honey-pokemon">

先按照[蜜树设置指南](/retail-dppt-honey-tree)准备好目标宝可梦，完成后再回到此处继续。

</ShowIf>

在下方选择游戏和主机，然后进入下一步。

<Gen4ConfigSetup onlyDppt />

</Step>

<Step step={1}>

## 选择宝可梦

1. 填写下方工具，寻找符合条件的宝可梦。
2. 如果没有喜欢的结果，可以提高最小和最大 delay，但每次等待时间也会增加。

<ShowIf slug="zh-retail-dppt-static">
  <Static4Searcher />
</ShowIf>

<ShowIf slug="zh-retail-dppt-honey-pokemon">
  <Static4Searcher honey />
</ShowIf>

</Step>

<Step step={2}>

## 准备存档

1. 如果使用白金版，NDS 的主机日期设为 **12/31/2099**，3DS 则设为 **12/31/2050**。
2. 队伍中应准备：

   <Static4ShowIfLead lead="None">

   - 至少一只已录制喋喋不休的聒噪鸟，最好准备两只。
   - 不具有同步或迷人之躯特性的队首宝可梦。

   </Static4ShowIfLead>

   <Static4ShowIfLead lead="Cutecharm">

   - 至少一只已录制喋喋不休的聒噪鸟，最好准备两只。
   - 具有迷人之躯特性、且适合当前训练家 ID 的队首宝可梦。

   </Static4ShowIfLead>

   <Static4ShowIfLead lead="Synchronize">

   - 至少一只已录制喋喋不休的聒噪鸟，最好准备两只。
   - 具有同步特性，且性格为 <Static4SyncNature /> 的队首宝可梦。

   </Static4ShowIfLead>

3. 将宝可表切换到抛硬币应用。
4. 在目标宝可梦前保存游戏。 <ShowIf slug="zh-retail-dppt-honey-pokemon">如果目标区域正在下雨，请改在最近的城镇保存。</ShowIf>

## 设置主机

1. 将主机日期设为 **<Gen4ConsoleSetDateString format="date" />**。
2. 将主机时间设为 **<Gen4ConsoleSetDateString format="time" />**，暂时不要确认。

| 确认时间界面                                                    |
| --------------------------------------------------------------- |
| ![确认时间界面](/images/HeartGold-SoulSilver/SetTimeScreen.jpg) |

## 命中种子

<Gen4ShowIf is3dsNormalSettings>
  [了解如何使用 3DS 辅助工具](/3ds-helper).
</Gen4ShowIf>

1. 按下 \`A\` 确认主机时间，同时启动下方计时器。
2. <Gen4ShowIf is3dsNormalSettings>退出设置，重启主机，再启动游戏。</Gen4ShowIf>
   <Gen4ShowIf is3dsAltSettings>
     按下 \`Start\` 退出 Alt Settings，再启动游戏。
   </Gen4ShowIf>
   <Gen4ShowIf isNdsDsi>退出设置，重启主机。</Gen4ShowIf>
3. 第一个计时器结束时， <Gen4ShowIf is3dsNormalSettings is3dsAltSettings>按下 \`L + R + Start + Select\` 软重启游戏。</Gen4ShowIf><Gen4ShowIf isNdsDsi>按下 \`A\` 启动游戏。</Gen4ShowIf>
4. 推进到读取存档的界面。
5. 第二个计时器结束时，立即按下 \`A\` 读取存档。

> [!TIP]
> 如果没有足够时间命中种子，请返回上一步，提高“Max Delay”后重新搜索目标宝可梦。

<Gen4EmbeddedTimer />

## 校准种子

1. 点击下方的“Generate”，生成可能命中的种子列表。
2. 在宝可表中抛硬币，点击下方对应的正面或反面按钮，筛选结果。
3. 如果只剩一个结果，且不是目标种子，点击“Calibrate”。
4. 重新尝试命中目标。
5. 如果实际结果的“Flip Delay”列已勾选，需要通过以下方式之一切换 delay 奇偶：
   - **所有版本**：插入 GBA 卡带。
   - **心金/魂银**：在继续游戏界面，用触屏依次点击向下和向上箭头。
   - **钻石/珍珠/白金**：选择“New Game”，再按下 \`B\` 返回继续游戏界面。
   - 如果切换过 delay 奇偶，之后每次尝试都需要执行相同操作。

> [!TIP]
> 如果找不到实际种子，请扩大 delay 和秒数偏差范围，再次搜索。

<DpptCoinFlipSeedCalibrator />

</Step>

<Step step={3}>

<ShowIf slug="zh-retail-dppt-honey-pokemon">

## 可选：停止 NPC 活动

如果能足够快地打开和关闭队伍菜单，避开 NPC 干扰，可以跳过。否则，此步骤可以提高操作稳定性。

1. 根据[蜜树 NPC 列表](/dppt-honey-tree-npcs)，与目标树附近的所有相关 NPC 对战。
2. 如果 NPC 不愿对战，使用对战搜寻器。
3. 击败对战搜寻器找到的**全部** NPC。

#### 注意事项

- 如果对战搜寻器提示 NPC 尚未准备好，请再次尝试。
- 不要离开当前区域，否则 NPC 会恢复活动。
- 对战搜寻器可能同时触发多名 NPC，使用时尽量让屏幕上只显示目标 NPC。

</ShowIf>

## 获得目标宝可梦

<ShowIf slug="zh-retail-dppt-static">

命中目标种子后，按以下步骤操作。

1. 读取存档后，**立即**尽快打开队伍菜单。
2. 查看聒噪鸟信息 **<Static4ChatotCount />** 次，推进乱数，并在下方核对音调。
3. 退出队伍菜单，捕捉或领取目标宝可梦。

</ShowIf>

<ShowIf slug="zh-retail-dppt-honey-pokemon">

命中目标种子并停止 NPC 活动后，按以下步骤操作。

1. 站在目标树前，打开队伍菜单。
2. 点击“Generate”，查看聒噪鸟音调列表。
3. 查看聒噪鸟的信息，听取喋喋不休音调。
4. 根据听到的音调选择“Low”“Medium”或“High”，确定当前推进数。
5. 重复第 3、4 步，直到距离目标还有 1 次推进。
6. 退出队伍菜单，按下 \`A\` 开始战斗或领取宝可梦。

> [!TIP]
> 如果跳过了停止 NPC 活动的步骤，读取存档后直接开始操作，请**尽快**打开和关闭队伍菜单。

</ShowIf>

<Gen4ChatterFilter />

</Step>

<Step step={4}>

### 校准推进数

如果已经按要求推进并核对聒噪鸟音调，却仍未获得目标，可以进行以下校准。

1. 查看实际获得的宝可梦能力值。
2. 将实际捕捉的宝可梦能力值填入下方表单，点击“Generate”。
3. 点击“Calibrate Advance”调整聒噪鸟信息查看次数，或点击“Calibrate Timer”调整命中种子的计时。
4. 重新尝试命中目标。

> [!NOTE]
> 如果校准种子时切换过 delay 奇偶，之后每次尝试都需要重复切换。

> [!TIP]
> 如果找不到实际获得的宝可梦，可以扩大校准器中的推进数、delay 或秒数范围。

<Static4Calibrator />

</Step>

</Stepper>

## 特别鸣谢

- Sorendog、Zaksabeast：制作工具。
- 感谢所有 [PokeFinder](https://github.com/Admiral-Fish/PokeFinder) 的贡献者，本工具基于他们的工作开发。
- Bilbo、Fiask：协助测试并提供反馈。
- 中文翻译：白希洛/Hakuhiro
`;export{e as default};