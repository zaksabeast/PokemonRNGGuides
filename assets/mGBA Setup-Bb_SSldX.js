const n=`---
- title: "mGBA Setup"
  description: "Learn how to set up mGBA for GBA Pokémon RNG, including lua scripting support."
  slug: "zh-mgba-setup"
  translation:
    enSlug: "mgba-setup"
    language: "zh"
---

## 所需工具

- 对应版本的[mGBA (development build)](https://mgba.io/downloads.html#desktop-os-1)
- mGBA专用的[Lua脚本](https://github.com/Real96/PokeLua/tree/main/Gen%203/mGBA)

## 设置Lua脚本

1. 打开模拟选择 工具 -> 脚本...
2. 选择 文件 -> 载入脚本... 并选择对应游戏版本的lua脚本。

每次需要即时存档或即时读档时，在游戏未暂停时可以按下\`Shift + F(n)\`或\`F(n)\`。
此操作会快速载入即时存档，以确保脚本能正确读取游戏进度。

- 比如, 按\`Shift + F1\`可以快速存档到即时存档(1)或按\`F1\`快速读档到即时存档(1)。

## 问题排查

### Error: \`attempt to call a nil value (method 'setWatchpoint')\`

请确保你的mGBA是上方链接下载的开发版。其他版本才会出现此错误。

### Error: \`attempt to index a nil value (global 'emu')\`

在运行Lua脚本前，请确保已加载游戏ROM。

## 特别鸣谢

- 中文翻译：白希洛/Hakuhiro。
`;export{n as default};
