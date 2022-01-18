---
title: 'Stationary RNG'
description: 'Informations in order to RNG Stationary Pokemon (Mystery Gift included)'
slug: 'cfw-bdsp-stationary'
subCategory: 'CFW'
isRoughDraft: true
---

Important note : we're looking for more delays and Last screen (aka last input before the game generates a spread) for these Pokemon. Don't hesitate to open an issue here, or send a message on the discord with any Delay / informations based on the Chatot site.

For this guide, we'll assume that you know how to use CaptureSight and Chatot site to setup everything. We'll assume you know how to advance your states and understand how the noise works and how to deal with it. For these, you'll have to use the Stationary tab of the Chatot site. Don't forget to check "Set IVs" if the Pokemon has 3IVs guaranteed. In this guide, it'll be stated next to the Pokémon.

The goal of that guide is more to provide basic informations about delays, any specific setup etc. Everything else has been covered with the basic knowledge guides.

Also it's important to set up a gender rate if you don't aim for a Genderless Pokémon (and the opposite applies if you aim a Genderless Pokemon). The generation uses a check there, so skipping that would lead to different results for the Nature of the Pokemon.

# List of Stationary

Starters :

- Delay : 64
- Generation : "Yes" when you chose the starter in the bag
- Notes : Save before entering in the Lake. It takes around 300 frames to do the cutscene and being able to select your starter with the fast speed. Adjust if you have another setup. But the noise before the Lake will help you to hit the frame in a easy way since no Pokedex

Rotom :

- Delay : 90
- Generation : "You thumped the TV Set"

Eevee :

- Delay : 0
- Generation : "You obtained an Eevee!"

Dialga / Palkia (3IVs) :

- Delay : 84
- Generation : After text. Take care, you might need to press A inside the text box in order to be able to press A and starts the battle. It's the case with Dialga, still not checked with Palkia
- Notes : Doing it post E4 is easier because quiet. For that, kill the Dialga / Palkia the first time you encounter them, and then beat the Elite 4 to have them to respawn

![image](https://user-images.githubusercontent.com/25870563/144486236-9911d1ad-1d62-4303-97ff-67dc1fedb2ab.png)

Giratina (3IVs) :

- Delay : 84
- Generation : "Bishaaan!"

Heatran (3IVs) :

- Delay : 84
- Generation : "Gwogbogogo..."

Regigigas (3IVs) :

- Delay : 84
- Generation : "Zut Zutt!"
- Notes : Due to player blinking, the delay can be off. In general you'll have a +1 or +2 delay. It's really important to test and see how it goes. These delays are based on breakpoints values, so user experience might be a little different. Practice to see how your delay goes.

Ramanas Park (3IVs) :

- Delay : 84
- Generation : Dialog Box

**Warning : Don't forget to select the Roamers method for Mesprit and Cresselia**

Mesprit :

- Delay : 84
- Generation : "Kyauun."
- Notes : Due to player blinking, the delay can be off. In general you'll have a +1 or +2 delay. It's really important to test and see how it goes. These delays are based on breakpoints values, so user experience might be a little different. Practice to see how your delay goes.

Cresselia :

- Delay : 104 / 105
- Generation : Press A in front of her
- Notes : Due to player blinking, the delay can be off. In general you'll have a +1 or +2 delay. It's really important to test and see how it goes. These delays are based on breakpoints values, so user experience might be a little different. Practice to see how your delay goes.

**Warning : PokeFinder supports Mystery Gift Generation. Download the right event informations here : https://projectpokemon.org/home/files/category/203-generation-8/ and load it with PokeFinder to have accurate results**

Mystery Gift (Can be 3IVs) :

- Delay : 0
- Generation : The moment when you SELECT the event in the menu where you can chose what to claim.
- Notes : Similar to egg RNG, where you claim it is important. So the best place to do that is in the player's room, where everything is quiet.
