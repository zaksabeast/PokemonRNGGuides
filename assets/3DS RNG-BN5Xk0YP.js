const e=`---
- title: "HeartGold and Soulsilver 3DS RNG"
  navDrawerTitle: "3DS RNG"
  description: "Learn how to RNG using a 3DS in HeartGold and SoulSilver for shiny, high-IV Pokémon."
  slug: "hgss-3ds-rng"
  category: "HeartGold and SoulSilver"
  tag: "info"
  addedOn: "2025-07-03"
- title: "Diamond, Pearl, and Platinum 3DS RNG"
  navDrawerTitle: "3DS RNG"
  description: "Learn how to RNG using a 3DS in Diamond, Pearl, and Platinum for shiny, high-IV Pokémon."
  slug: "dppt-3ds-rng"
  category: "Diamond, Pearl, and Platinum"
  tag: "info"
  addedOn: "2025-07-03"
---

<Gist>
  This page explains why NDS RNG on 3DS can be inconsistent and how to fix it.
</Gist>

## Video info

<YouTubeTable
  videos={[
    {
      title: "Why 3DS RNG is Inconsistent",
      id: "-ayvPKWNkNw",
    },
  ]}
/>

## TLDR

Just want the fix?

- Our Gen 4 tools have a "3DS Helper" feature! [Learn about it here](/3ds-helper).
- For people with homebrew, there's an even easier method using the [3DS Alt Settings app](/3ds-alt-settings).

We don't have Gen 5 tools yet, but the 3DS Alt Settings app works for Gen 5 RNG too.

## The Problem

A common issue with NDS RNG on 3DS is inconsistent second values. It's often blamed on TwilightMenu or NDS launch delays, but I was skeptical.

If launch timing was truly the cause, soft resetting when your timer beeps (the common RNG approach) should fix it, but it doesn't.

That made me suspect the issue occurs earlier in the process.

## The Hypothesis

The real issue, if not the only one, seems to be how the 3DS sets the system time.

On many modern systems, manually setting the clock doesn't clear milliseconds, so your system time can carry leftover ms from before the change. For example, setting the time to 14:32:00 with 927ms internally results in 14:32:00.927.

If the 3DS has the same behavior, the 3DS time would be one second off in just a few milliseconds.

## The Tests

I wrote a research plugin to log timing info in System Settings every frame. Here's what to know from the screenshots:

- **Now** = current system time
- **Changed at** = frame right before the time was set
- **Measured after change** = frame right after

![Screenshot 1](/images/3DS/3ds-helper-1.webp)

![Screenshot 2](/images/3DS/3ds-helper-2.webp)

**Findings:**

- In the first screenshot, the ms portion remains unchanged after setting the time - confirming the hypothesis.
- In the second screenshot, after setting the time to 14:32 at 987 ms, the clock displayed 14:32:01 in less than one second - showing the issue is reproducible.

## The Fix

- Our Gen 4 tools have a "3DS Helper" feature! [Learn about it here](/3ds-helper).
- For people with homebrew, there's an even easier method using the [3DS Alt Settings app](/3ds-alt-settings).

We don't have Gen 5 tools yet, but the 3DS Alt Settings app works for Gen 5 RNG too.

## Credits

- Zaksabeast for researching this and writing the tools to fix it
`;export{e as default};
