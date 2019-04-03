# DPPt Stationary RNG Guide Emulator

_For RNGing stationary legendaries in DPPt_

## Tools

- Desmume (any version even if 9.11 is more stable)
- Lua Scripts ([Link](https://pokerng.forumcommunity.net/?t=56443955#entry396434991))
- PokeFinder ([Link](https://github.com/Admiral-Fish/PokeFinder/releases)) 

## Step 1: Finding your desired Spreads

1. Open PokeFinder and click on Stationary in Gen 4 column.

2. A new window will open then click on Manager in the Profile section, click on New and fill in your details like TID, SID and the version you are using.

3. Then select that Profile and then we can search for spreads.

4. Navigate to Searcher tab and select the Method based on what you are trying to RNG.
```
Method 1: 
    Starter Pokemon
    Cynthia's Togepi Egg
    Fossil Pokemon from Mining Museum
    Riolu Egg from Riley
    Eevee from Bebe
    Porygon from Veilstone
    Cresselia, Mesprit, Articuno, Zapdos, and Moltres
    Pokemon Ranger Manaphy Egg

Method J:
    Every other stationary which is not mentioned above like Box Art legendaries, Heatran, Regigigas, etc
```

5. Choose any applicable leads if you have any like Synchronize or Cute Charm (Not applicable for Method 1).
	- If you are not RNGing a genderless or gender fixed Pokemon and want to use Cute Charm, then follow the [Cute Charm guide](https://www.smogon.com/ingame/rng/dpphgss_rng_part5)

6. The aim here is to RNG a shiny Azelf in Platinum. Your PokeFinder should be set up like this.
	![](https://i.imgur.com/v5V4TUJ.png)

## Step 2: Hitting your Initial Seed

Before you do this, you need to save your game in front of the stationary you want. This is important.
The guide [here](https://github.com/zaksabeast/PokemonRNGGuides/blob/master/guides/hgss/en/Using%20Runasdate%20to%20RNG%20Initial%20Seed.md) shows how to hit your initial seed in detail. Refer to that guide and the proceed to Step 3.

## Step 3: Hitting your desired Pokemon

1. Once you are inside your game, the lua will show you what your PIDRNG frame is.

```
Note: Ignore IVRNG frame. It serves no purpose whatsoever for Gen 4 RNG.
```

2. You need to advance your PIDRNG frame and match it with the number which is present in Frame column. Since I am hitting the following spread, it's 9 for me.

	![](https://i.imgur.com/eOHppkM.png)
	
3. There are various ways you can advance your frames. 

	- Any NPC that randomly moves will advance frames by 1 for each random movement. This can include turning or walking. If an NPC does both at once, then the frame advances by 2. Note that NPCs who are off-screen can still advance the frame, as long as they are within the same area. Because of this, it is advisable to attempt your captures in areas with little or no NPCs. In DPPt you can stop some NPCs from randomly moving through the Vs Seeker. If this cannot be avoided you must press X to bring up the menu the moment you enter the in-game world. This freezes all NPCs in place and stops them from making any unnecessary advancements.

	- Chatter: to do this you must have a Chatot with the move and you MUST record a custom Chatter to advance frames with this method. Once you do, accessing Chatot's summary window like the one below will advance the frame by 1. To make things quicker, you can have two Chatots next to each other in your party and just keep flipping between their summaries. You do not have to listen to the whole Chatter sound, simply accessing their summary is enough.

	- Taking a step or turning in areas where you can encounter wild Pokemon (grass, water, or caves) advances the frame by 1 for each step/turn made.

	- Walking at least 128 steps will advance the frames by the number of Pokemon in your party. Do know that the games have an internal step counter that starts at 0 and resets to 0 when it reaches 128 and is always saved. This means that if you load your game and the step counter is at 127, taking one step will advance your frames. As a result, don't resort to this method unless it's absolutely necessary, which it won't be a majority of the time.

	- Having an active roamer in your game advances your initial frame by a different value depending on the seed.

	- Journal Flips: Whenever your Journal is on a page that displays (insert Pokemon's name) was caught (Time) like the one below, frames are advanced by 2. Flipping your Journal to another page with a similar entry will also advance it by 2. It doesn't matter how many entries there are, as long it has at least one (Pokemon) was caught (Time) entry, the frame advances by 2.
	
		![](https://www.smogon.com/ingame/rng/dpphgss_capture_28.png)
	
4. Make sure everything is set like the screenshot below:

	![](https://i.imgur.com/qihLj76.png)
	
   And then Press A to start the encounter.
	
5. Enjoy!

	![](https://i.imgur.com/84AzXqx.png)

### Special Cases

1. Distortion World Giratina (NOT Turnback Cave): Giratina is a Method J Pokemon. Every time the Distortion World is loaded the frame advances by 11. If you're doing advances through the Journal or Chatter your starting frame will be 23 (It will be 12 if you're advancing the frame through the Journal without accessing it from the menu, i.e. when it first appears when starting the game).
	- The recommended procedure would be to start the game (loading the Distortion World map once), open the menu, and do either Chatters or Journal flips as if the starting frame is 23, then engage in battle (loading the Distortion World map a second time).

2. Cresselia/Mesprit: Cresselia and Mesprit are generated by Method 1 and have a starting frame of 5. Their data is generated once you talk to them and they fly off, so save in front of them and do your frame advances once you've confirmed your seed then talk to them to release them. If aiming for a frame of 100 you'd need to do 100-5=95 advances through either Journal flips or Chatters before talking to them to release them.

3. Kanto Birds: The birds are Method 1 Pokemon. Their data is generated after talking to Professor Oak and releasing them. Each bird has a different starting frame i.e. Moltres is 1, Zapdos is 6 and Articuno is 11.
	- Choose one bird (preferably Moltres) and do your seed verification and frame advancements before releasing it. Once that's done, capture your target bird and KO the other two. Defeat the Pokemon League and head back to Oak. The remaining two birds will be generated in the same order and will have starting frames of 1 and 6, so if Moltres was caught Zapdos would now be on frame 1 and Articuno would be on frame 6. Do the usual delay hitting and frame advancements before talking to Oak to get the next bird, catch it and KO the bird you weren't going for and do the same thing you did to revive and capture the last bird.
	
4. Manaphy Egg: The Manaphy Egg is received like a Wondercard Pokemon, but it uses the Method 1 generation. The Wondercard follows the usual initial frames. It has a shiny check on it that prevents the hatched Manaphy from being shiny normally, but there is a way to bypass this check and get a shiny Manaphy. You'll need to know the PID of the IV spread you're going for. Once you have it, you'll need a save file that isn't the one your Manaphy Wondercard is on, and has this PID shiny. Do the RNG manipulation and receive the Egg, and trade it to this game. Hatch it in the other game and if you did it correctly, you should now have a shiny Manaphy. To summarize, if you want a shiny Manaphy in game A:

	- Find out what shiny PID you have in game A.
    	- Get the Egg with the same PID in game B.
    	- Trade the Egg from game B to game A.
    	- Hatch the Egg in game A.
    	- Congratulations, you now have a shiny Manaphy!

5. Other Method 1 Pokemon: All of them have starting frame of 1 but there are random NPCs who interfere with the process. It is suggested to freeze all the NPCs by opening menu, doing the advances and closing the menu a little before your target frame so you can compensate the difference with NPC movements. Starters are more difficult to do since you don't have any other method to advance your frames and have to purely rely on random NPC movements.
