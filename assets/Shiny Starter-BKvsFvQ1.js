var e=`---
- title: "Shiny Starter"
  description: "Determine your SID by catching a shiny starter"
  slug: "emerald-shiny-starter"
  category: "Emerald"
  section: "pokemon_rng"
  variant: "retail"
  orderPriority: 0
  addedOn: "2025-05-03"
---

<Gist>Gist: Determine your SID by catching a shiny starter</Gist>

## Strategy Overview

When creating a new savefile, your SID depends on your randomly generated TID and the timing of pressing \`A\` on a specific text.
Considering those 2 variables, a list of possible SIDs will be generated. Only one of them is your actual SID.
To identify it, receive your starter Pokémon on an advance that should produce a shiny Pokémon. If the starter is shiny, the SID you tested is correct.

## Steps Overview

- **Step 1:** Generate your TID with a specific timing.
- **Step 2:** Test each possible SID by attempting to obtain a shiny starter.

<Stepper titles={["Generate your TID", "Determine the correct SID"]}>

<Step step={0}>

### Generate your TID

1. On the title screen, go to Options and set the text speed to \`Fast\`.
2. Select \`New Game\`, type your name and move the cursor over the \`OK\` button.
3. Start the TID/SID timer on the tool below.
4. Precisely when the first timer reaches 0, press \`A\` to confirm your name.
5. Continue the dialogue until the message \`Well, I'll be expecting you later. Come see me in my POKEMON LAB.\`.
6. Precisely when the second timer reaches 0, press \`A\`.
7. Check the TID generated on your trainer card (shown as "IDNo.").
8. Fill the "Obtained TID" field on the tool below and click "Evaluate obtained TID".
9. Follow the Recommendation below the list which states to either start over Step 1 to generate a TID that will be faster to validate, or go to Step 2 with your TID.

<EqualColumnTable>

| Wait at this screen                                                                        | Trainer card                                          |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| ![Game Image of 'Come see me in my POKEMON LAB' text](/images/Emerald/Starter/Pre-ID.webp) | ![Trainer Card](/images/Emerald/Starter/TID-Hit.webp) |

</EqualColumnTable>

<GenerateEmeraldTidSid />

</Step>

<Step step={1}>

### Determine the correct SID

Summary: For each possible SID for your obtained TID, obtain a starter Pokémon that results in a shiny Pokémon, if the SID is the correct one.

1. Save the game in front of the starter Pokémon bag.
2. In the tool below, click "Select" next to the first possible SID you haven't tried yet.
3. Start the timer.
4. Precisely when the first timer reaches 0, press \`Start + Select + A + B\` simultaneously to reset the game.
5. Quickly open the bag to avoid unwanted advances from wandering NPCs.
6. Select your starter and wait with the confirmation message \`Do you choose this POKEMON?\` displayed.
7. Precisely when the second timer reaches 0, press \`A\` to choose your starter.
8. Complete the battle and examine your starter Pokémon.
9. If it's shiny, congratulations! The selected SID is the SID of your savefile.
10. If it's not shiny, fill the species, gender, nature, and stats in the form below, then click "Find advances matching caught starter Pokémon".
11. If no results are shown, an input field is incorrect.
12. If the first row contains shiny information but the Pokémon you got is not shiny, then the currently tested SID is incorrect. Cross out that incorrect SID and select the next SID in the list of possible SIDs.
13. If the first row doesn't contain shiny information, this means you didn't hit the target advance. Click on the "Update Calibration" button and start over Step 2 with the same SID.

<EqualColumnTable>

| Save location                                                          | Wait at this screen                                                                                |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| ![Game Image of starter bag](/images/Emerald/Starter/Pre-Starter.webp) | ![Game Image of 'Do you choose this POKEMON?' text](/images/Emerald/Starter/Choosing-Starter.webp) |

</EqualColumnTable>

<ShinyEmeraldStarter game="emerald" />

</Step>

</Stepper>

## Credits

- Guide and interactive tool: RainingChain.
- Gen3 static generator tool: EzPz.
- Chinese translation: xuanyelin, Hakuhiro.
- German translation: Parasite.
- Screenshots: Fiask.
`;export{e as default};