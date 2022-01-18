---
title: 'White Forest RNG'
description: 'White Forest RNG'
slug: 'emulator-bw-white-forest'
subCategory: 'Emulator'
isRoughDraft: true
---

What's needed ?

- Desmume
- Lua Script
- Pokemon White (Black is not an option)
- RNG Reporter
  OPTIONALS : - PokeCGear (http://projectpokemon.org/forums/attachment.php?attachmentid=10632&d=1362758021) to edit White Forest Pokemon. - Pkhex

First : If you're using PokeCGear to edit White Forest Pokemon, i suggest to use a COPY save. The tool is clean, but quite old, we never know what it could mess. Do your RNG on the copy and trade them to your main save.
Not necessary but a personnal advice.

So PokeCGear can help you to edit trainers present in the White Forest and that way, you can check WHICH Pokemon to RNG.
In the first windows to open file, open the .txt that contains all the trainers names. it'll allows for the tool to load them.
Once in the main screen, click on "load save" => select your save.
Hit the "WForest" and you'll have a column with trainers. Just edit them to match Pokemon you want. I advice you to use only ONE trainer. More easier.
Once you're done hit save and close the tool.

So the issue with white forest is that sweet scent doesn't work AT ALL. But there's a little trick. You have to save OUTSIDE the White Forest, and enter it. If you do that, your first step in grass will GUARANTEE AN ENCOUNTER.

You can go for any IVs or any PID. This guide assumes you know HOW to do that. Search for a target frame.
/!\ if you go for IV Frame = 1, you'll have to save at the Route 15 gate. Not doable with Route 14 gate /!\
If you have only one trainer, any encounter slot will work. If not you'll have to create your own encounter slot table.

Once your initial seed loaded, just walk as fast as possible next to a grass patch and open the menu.
Create a save state.
Now you'll have to close the menu and do a step. Take note if NPC advances the PIDRNG frame (usually it's either +0 frame OR +2 can be more, but really rare).
Once you figured that, reload your state.
Do the advancement. If you have the NPC advancing do -2 frames, if no, go on your target frame.
After that close the menu do a step the same way as done before.

You should get your target.
