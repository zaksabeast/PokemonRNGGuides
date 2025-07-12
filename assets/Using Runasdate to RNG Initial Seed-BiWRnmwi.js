const e=`---
- title: "Black 2 and White 2 Initial Seed RNG"
  navDrawerTitle: "Initial Seed RNG"
  description: "Learn how to RNG your initial seed in Black 2 and White 2."
  slug: "emulator-b2w2-runasdate-inital-seed"
  category: "Black 2 and White 2"
  tag: "emu"
- title: "Black and White Initial Seed RNG"
  navDrawerTitle: "Initial Seed RNG"
  description: "Learn how to RNG your initial seed in Black and White."
  slug: "emulator-bw-runasdate-initial-seed"
  category: "Black and White"
  tag: "emu"
  canonical: "emulator-b2w2-runasdate-inital-seed"
---

\`\`\`
This guide assumes you have found your target seed. You need your target seed before following this guide.
\`\`\`

## Tools

- [Desmume](/desmume-setup)
- [RunAsDate](https://www.nirsoft.net/utils/run_as_date.html)

### What is RunAsDate?

RunAsDate is a tool by Nirsoft that loads any program with a user-specified time. It's useful for Gen 5 RNG and helps you hit your seed easily. This guide focuses only on RunAsDate.

## Step 1: Setup RunAsDate

1. Launch RunAsDate.
2. Configure RunAsDate to match the image below.

![Setup](/images/Black-and-White/Initial-Seed/Setup.png)

\`\`\`
You'll never need to change this again. This is the universal RunAsDate configuration for RNG (Gen 3, 4, or 5).
\`\`\`

3. Select the program you want to fake the date/time using the \`Browse...\` button.
4. Set the date and time to one of the given times in PokeFinder to hit your seed.
5. Hit \`Run\`, and Desmume should launch.

Desmume will now run with the date and time you selected.

## Step 2: Hitting the target seed

1. Load the Lua script.
2. Load your game.
3. Do any necessary keypresses to hit your target seed.
4. You can now continue as you would with basic RNG!

## Troubleshooting

If you're not hitting the right seed on the first try with RunAsDate, check these things:

- RunAsDate time.
- RNG profile.
- Keypresses needed to hit your seed.

## Credits

- Chinese translation: xuanyelin, Hakuhiro.
`;export{e as default};
