# DPPt Stationary RNG Guide Emulator

_For RNGing stationary legendaries in DPPt_

## Tools

- Desmume (any version even if 9.11 is more stable)
- Lua Scripts (Noob forums is the best for that here)
- PokeFinder (preferred and used in this guide) /RNG Reporter 

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

5. Choose any applicable leads if you have any like Synchronise or Cute Charm (Not applicable for Method 1).
```
Note: Fixed Gender/Genderless Pokemon won't be affected by Cute Charm lead.
```

6. The aim here is to RNG a shiny Azelf in Platinum. Your PokeFinder should be set up like this.
	![](https://i.imgur.com/v5V4TUJ.png)

## Step 2: Hitting your Initial Seed

Before you do this, you need to save your game in front of the stationary you want. This is important.
The guide [here](https://github.com/zaksabeast/PokemonRNGGuides/blob/master/guides/hgss/en/Using%20Runasdate%20to%20RNG%20Initial%20Seed.md) shows how to hit your initial seed in details. Refer that guide and the proceed to Step 3.

## Step 3: Hitting your desired Pokemon

1. Once you are inside your game, the lua will show you what is your PIDRNG frame.

2. You need to advance your PIDRNG frame and match it with the number which is present in Frame column. Since I am hitting the following spread, its 9 for me.

	![](https://i.imgur.com/eOHppkM.png)
	
3. There are various ways you can advance your frames. 

	- Any NPC that randomly moves will advance frames by 1 for each random movement. This can include turning or walking. If an NPC does both at once, then the frame advances by 2. Note that NPCs who are off-screen can advance the frame still, as long as they are within the same area. Because of this, it is advisable to attempt your captures in areas with little or no NPCs. In DPPt you can stop some NPCs from randomly moving through the Vs Seeker. If this cannot be avoided you must press X to bring up the menu the moment you enter the in-game world. This freezes all NPCs in place and stops them from making any unnecessary advancements.

	- Chatter: to do this you must have a Chatot with the move and you MUST record a custom Chatter to advance frames with this method. Once you do, accessing Chatot's summary window like the one below will advance the frame by 1. To make things quicker, you can have two Chatot next to each other in your party and just keep flipping between their summaries. You do not have to listen to the whole Chatter sound, simply accessing their summary is enough.

	- Taking a step or turning in areas where you can encounter wild Pokemon (grass, water, or caves) advances the frame by 1 for each step/turn made.

	- Walking at least 128 steps will advance the frames by the number of Pokemon in your party. Do know that the games have an internal step counter that starts at 0 and resets to 0 when it reaches 128 and is always saved. This means that if you load your game and the step counter is at 127, taking one step will advance your frames. As a result, don't resort to this method unless it's absolutely necessary, which it won't be a majority of the time.

	- Having an active roamer in your game advances your initial frame by a different value depending on the seed.

	- Journal Flips: Whenever your Journal is on a page that displays (insert Pokemon's name) was caught (Time) like the one below, frames are advanced by 2. Flipping your Journal to another page with a similar entry will also advance it by 2. It doesn't matter how many entries there are, as long it has at least one (Pokemon) was caught (Time) entry, the frame advances by 2.
		![](https://www.smogon.com/ingame/rng/dpphgss_capture_28.png)

	I personally use Journal Flips to do the advances but the issue with this method is your frames will be either even or odd if there is no other interference. To avoid this, carry a Chatot as well and just use Chatter once which advances frame by 1.
	
4. Make sure everything is set like the screenshot below:

	![](https://i.imgur.com/qihLj76.png)
	
   And then Press A to start the encounter.
	
5. Enjoy!

	![](https://i.imgur.com/84AzXqx.png)

### Distortion World Giratina

Giratina is a special case. Giratina is a Method J Pokemon. Every time the Distortion World is loaded the frame advances by 11. If you're doing advances through the Journal or Chatter your starting frame will be 23 (It will be 12 if you're advancing the frame through the Journal without accessing it from the menu, i.e. when it first appears when starting the game).

The recommended procedure would be to start the game (loading the Distortion World map once), open the menu, and do either Chatters or Journal flips as if the starting frame is 23, then engage in battle (loading the Distortion World map a second time).
