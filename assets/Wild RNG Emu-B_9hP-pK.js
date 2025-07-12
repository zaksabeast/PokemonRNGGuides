const e=`---
- title: "Black 2 and White 2 Wild RNG"
  navDrawerTitle: "Wild RNG"
  description: "Learn how to RNG wild Pokémon in Black 2 and White 2 for shiny and high-IV results."
  slug: "emulator-b2w2-wild"
  category: "Black 2 and White 2"
  isRoughDraft: true
  tag: "emu"
- title: "Black and White Wild RNG"
  navDrawerTitle: "Wild RNG"
  description: "Learn how to RNG wild Pokémon in Black and White for shiny and high-IV results."
  slug: "emulator-bw-wild"
  category: "Black and White"
  isRoughDraft: true
  tag: "emu"
  canonical: "emulator-b2w2-wild"
---

<ShowIf slug="/emulator-b2w2-wild">

This guide is for **Black 2 and White 2**.

Looking for a different game? Check out these pages:

- [Black and White Wild RNG Guide](/emulator-bw-wild)

</ShowIf>

<ShowIf slug="/emulator-bw-wild">

This guide is for **Black and White**.

Looking for a different game? Check out these pages:

- [Black 2 and White 2 Wild RNG Guide](/emulator-b2w2-wild)

</ShowIf>

## Requirement

- The game's profile (see another guide)
- [Desmume](/desmume-setup)
- RNG Reporter
- Encounter Slot page
- Chattot with chatter
- Sweet Scent/Honey

There’s a problem with the Lua/RNG Reporter and PIDRNGFrame. You need to count one frame LESS than what RNG Reporter shows. If Reporter gives a target frame at 100, set your PIDRNGFrame to 99 in the script.

In Gen 5, the RNG is divided into two parts: the PIDRNG Frame and the IVRNG Frame. The PIDRNG Frame controls shiny, nature, gender, etc., while the IVRNG Frame focuses only on IVs.

## Setup

Go to the route you want WITH THE SCRIPT ALREADY ON. This lets you check if the map is noisy, which is important for Gen 5 RNG. Once you have your route/target, save and close your game.

Open RNG Reporter and select the 5th gen time finder.

Stay on Capture, select your game profile, and now let's explain the two methods important for us:

- IVs (Standard Seed): This lets you check for a good IVRNG Frame. You can check "Search for a Nearby Shiny Frame" to make this IV Frame shiny.

\`\`\`
Note: Ignore IVs (C-Gear Seed) since it's used for other methods.
\`\`\`

- PIDRNG: This helps you find a PIDFrame, but you won’t know the linked IVs Frame. You can see it on the main window and choose an IVs Frame that suits you afterward.

For the Encounter Type, select your method. Special Encounters, like Bubbling Spot/Shaking Grass, will be covered in another guide.

Select your options, even if IVs Seed is more interesting. Once done, enter your parameters for both cases. You can't search for IVs in PIDRNG, but you can use filters for PID in IVs (Standard Seed). Hit generate.

## Advancing PIDRNG or IVRNG Frame

For PID:

- Chattot: Use Chatter to advance +1 every time you check their profile.
- Save the game: This is useful for specific cases like Starters.
- NPC advancement: This can be tricky but can be managed with weather to advance PIDFRNG Frame quickly.

For IVs:

- 128 Steps will increase your IVRNG Frame count by X, where X is the number of Pokémon in your team. If you have 6 Pokémon, doing 128 steps will increase IVRNG Frame to 7 (1 base + 6 for your team).
- Storing a Pokémon in the PC increases IVRNG Frame by 7.
- Battling a Pokémon increases it as well, but results can be unpredictable.

Once you have your target, find the date/time corresponding and use runasdate.exe (guide linked) or another method you prefer.

The Seed should be good without changes. If it’s wrong, recheck your parameters (profile/runasdate).

Go quickly in-game and open the menu.

Advance the frames as needed, remembering the -1 for PIDRNGFrame difference and use Sweet Scent/Honey.

\`\`\`
Don't hesitate to use save states, especially in noisy areas.
\`\`\`

Congratulations, you should have your shiny Pokémon!

The easy part is done. Here comes the harder and more tedious part.

You got your shiny if you were in a quiet area. However, Gen 5 has a HUGE problem. During Sweet Scent/Honey animation, PIDRNGFrame WILL CONTINUE TO ADVANCE if the area is noisy. So, you may not get the shiny you want if you use Sweet Scent/Honey on your target frame.

There's no miracle solution. You need to adjust and calibrate until you find your shiny.

\`\`\`
However, fishing doesn't advance PIDRNGFrame, so you can fish without any problems.
\`\`\`
`;export{e as default};
