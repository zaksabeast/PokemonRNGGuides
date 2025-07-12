const n=`---
title: "Translation Helper"
description: "Help us translate Pokémon guides and tools into your language"
slug: "help-translate"
category: "Home"
tag: "info"
layout: "titled"
---

<Stepper titles={["Select Guide", "Edit Guide"]}>

<Step step={0}>
  
### Translate a Guide

<TranslationHelperSelectGuide />

### Translate Tools

<ToolTranslationButton />

</Step>

<Step step={1}>
  <TranslationHelperEditGuide />
</Step>

</Stepper>
`;export{n as default};
