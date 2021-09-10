---
title: 'Ageto Celebi RNG'
description: 'RNG Ageto Celebi from Colosseum'
slug: 'emulator-ageto-celebi'
subCategory: 'Emulator'
---

**Guide to RNGing your Own Ageto Celebi**
Guide to RNGing your Own Ageto Celebi


## Resources:

* Prior Experience with RNGing generally and familiarity with Dolphin/VBA setups
* Post-Game JPN Gen 3 Core Games (Sapphire/Ruby/FireRed/LeafGreen/Emerald)
*Japanese Colosseum Bonus Disc
* A Pokemon Colosseum (JPN) save file with all 48 Pokemon obtained and purified (100% Story completion)
* Redeemed Celebi to your Colosseum Save for the First Time Already
* An empty Slot in your Party (6th Party Slot)
* [The Dolphin Lua Core](https://github.com/DevonStudios/Dolphin-Lua-Core/releases/tag/5.0)
* [Run-As-Date](https://www.nirsoft.net/utils/run_as_date.html)
* [Unofficial Pokefinder](https://ci.appveyor.com/api/buildjobs/p38blw2ns0kbh254/artifacts/PokeFinder-win.zip) 
* [Development MGBA](https://mgba.io/downloads.html) OR [VisualAdvance-M](https://github.com/visualboyadvance-m/visualboyadvance-m/releases/) (PREFERRED)
* [Latest PKHeX version](https://projectpokemon.org/home/files/file/1-pkhex/)
* [Ageto Lua Script](https://github.com/DevonStudios/LuaScripts/blob/main/Gen%203/Dolphin/Ageto.lua)
* [Gen 3 Lua Scripts for Party display](https://github.com/DevonStudios/LuaScripts/tree/main/Gen%203) (optional)

## **Part I**

**The Emulators Setup**

* The Dolphin Lua Core Setup

Make sure you load the Roms Directory where your JPN Colosseum Bonus Disc is
Right click on the game and click Properties, and Untick Dual-Core. Do Not Configure the Emulator Itself yet..

![image](https://user-images.githubusercontent.com/22829692/132892021-cfe47ac5-faeb-492a-b939-25fa5e67bfe7.png)


Disable Dual-Core **Here:**

![image](https://user-images.githubusercontent.com/22829692/132892054-1b430a3d-16d2-4715-b2e8-50fbd8976481.png)


## **Congifuring your Key Inputs**

Be sure to add Hotkeys such as Pause and Advancing Manually. That can be done at  **Options > Hotkey Settings**

![image](https://user-images.githubusercontent.com/22829692/132889588-2a0e6ccf-082a-4e3f-b613-d618ad95d8a3.png)


You can put **P** as Pause and **N** as advancing by 1 Visual Frame which is similar to the default Desume setups but feel free to configure to your liking. 


Below is how you add. If you see /0/ at Device, then click on it to select Keyboard as your input.

![image](https://user-images.githubusercontent.com/22829692/132889961-1e9cc8fd-ab2c-46b7-85a4-de89a5e40d09.png)

 
Your ending result should be like this: 

![image](https://user-images.githubusercontent.com/22829692/132890389-518e19f3-5e4b-4df0-aaaa-f14d27282daf.png)


Other inputs are not necessary for this particular RNG so you can leave the others blank.

Press Select on a key that you will like as the hotkey and press +ADD in the end, then Apply then OK.

You will also need to enable Frame Count, which is known as Visual Frame. Enable that via **Movie > Show Frame Counter.**
![image](https://user-images.githubusercontent.com/22829692/132890465-8fe55dce-93b5-4735-ad72-0a910f8198af.png)




Copy the Ageto Lua file to **Dolphin Lua Core > Sys > Scripts**. This is an important step!
![image](https://user-images.githubusercontent.com/22829692/132890483-395baa90-cab4-4ecf-b3b8-7aff8a81e125.png)



Turn off Dolphin and Launch the VisualAdvance -m

Enable Bios file using **Options > Game Boy Advance > Configure** then switch to Boot ROM tab and set your bios file path.

![image](https://user-images.githubusercontent.com/22829692/132890825-54bb2d68-630d-4da8-87ed-57af33d92505.png)

![image](https://user-images.githubusercontent.com/22829692/132890900-b8aef7b5-7513-4af3-94ee-c326bce1886b.png)


```
Note: Be sure to have your Japanese Gen 3 Game completed (Have Hall of Fame Flag checked) and an empty Party slot. You will need to Import this particular save after booting your JPN game and to be able to see the Game Boy Advance Logo, which is configured by the last step!
```
Here is what GBA Bios Screen Look like upon Resetting the Emulator:

![image](https://user-images.githubusercontent.com/22829692/132891039-35490fe1-2207-45e5-bda8-f6a3b063ac3f.png)


Here is how you Import Battery File Via  **File > Import > Battery File**

![image](https://user-images.githubusercontent.com/22829692/132891135-c9d43345-1c18-4ccc-8971-1bcf2380e7b6.png)





Now launch **RunaAsDate** on this particular date/time: **1/1/2000 , 12:00:00 AM** . Make sure **Immediate Mode** is turned on.

![image](https://user-images.githubusercontent.com/22829692/132891304-7c53da33-1652-45b4-aea6-d18a92c16e26.png)





**Now click Run and Launch your Bonus Disc.**



## **Part II: Finding a Spread**

To find your Celebi Spread please Launch the unofficial Pokefinder (you can launch the official one but to keep track of things use the unofficial one so you don’t get confused between windows.)

![image](https://user-images.githubusercontent.com/22829692/132891492-b288408f-4e6d-4491-9f1a-e96cbba8ade8.png)


Click on **GameCube** under Gen 3 Column on the Left.



Go to the Searcher Tab, then use Ageto Method and Filter out the desired spread with Nature/IVs till you find the one you wanted. In my RNG I am doing the 31/6/31/31/31/31 Timid Spread. You will need to record the Seed, which is the most important part here, and that will be henceforth dubbed as Target Seed.

![image](https://user-images.githubusercontent.com/22829692/132891639-dedb7b11-905c-4f0d-9b5c-8005e9443005.png)


As you can see here, my Seed is 19F0033A. Copy down this and put it on notepad. I’ll suggest you to keep a track of things because this is going to be very important later on, so do it on the format below:

![image](https://user-images.githubusercontent.com/22829692/132891689-e7e8e26b-4ac6-42ab-857b-4f8aaaec435b.png)



Leave Original Seed Blank because you don’t have that yet. Now the next part will be finally Finding your **Original Seed**.

## **Part III: Hitting the Resulting Original Seed**

Now we need to be familiar with the term Visual Frames. Visual Frames are simply frames that are visual to you, and do not affect the Ageto Cycles, which will be discussed more in depth later. But for now, you will need to be on this screen and Paused  (Press **P** to Pause and then Press **N** to advance by **1** manually) at around **430** Visual Frame.

![image](https://user-images.githubusercontent.com/22829692/132891769-8a39b40d-53a1-40c1-8eeb-05872e26c19a.png)


Make save state via **Emulation > Save State** on Dolphin Main Menu.

Now press **A** and **P** to unpause at the same time




```
WARNING: The Next Part is very Crucial! When loading the Ageto Lua script at the wrong time will freeze or crash your emulator, so follow the steps below to avoid possible issues! 
```

When you press A it will turn black for a few seconds. Keep your eyes peeled to the **visual frame**. I cannot emphasize this enough. Once the visual frame freezes, **PAUSE** immediately. Do not let the visual frame go past the what I call the *“temporary freezing state”*. For instance if the Visual Frame (VF For short) freezes at **511**, pause it. Like this below:


![image](https://user-images.githubusercontent.com/22829692/132892357-edd7caf1-c752-43e8-bae8-ac617e13011b.png)



Now click on the **Main Dolphin Menu > Tools > Execute Script.**


DO NOT EXIT THE EMULATOR or Unpause it yet!!

![image](https://user-images.githubusercontent.com/22829692/132892452-0fe79d83-dc5a-46a7-980a-9329b30f4863.png)



Start the script now:

![image](https://user-images.githubusercontent.com/22829692/132892470-7aa8b15f-9fdf-40fd-84d4-a9664fe9a8f7.png)




Then press **N** ONCE (do not press N for longer time). Just a simple tap will do.

You will see the Visual Frame still at **511** for an instant then roll over to **512**.

![image](https://user-images.githubusercontent.com/22829692/132892556-01e6b0db-bda7-4abe-9bdb-4c7acf322ea8.png)



Once that is done, you are safe to unpause the game by pressing **P**. Congratulations!



* Now the next part, you will have to keep track of your **Frame**, which is highlighted (Not the visual frame on top, but rather the one highlighted below. This is what is called Ageto Cycle, but is dubbed as **Frame**.


```
Major Requirement: The number has to be 1018 for the Frame. If it is any other number except 1018 reload the save state and try again at this point of the RNG process.
```

![image](https://user-images.githubusercontent.com/22829692/132892729-ed231d1b-da94-4593-8069-b7b89392efbc.png)


Once you get your Original Seed (highlighted above) while ensuring that your frame is 1018, copy down the Original Seed and open **Pokefinder > Gen 3 Tools > GameCube > GameCube RTC** .

![image](https://user-images.githubusercontent.com/22829692/132892795-791240f5-7d02-4ea7-8f55-6d73e66e5637.png)




Input info such as the Target Seed and the Possible Origin Seed as seen below. You will see why documenting what seed you hit at what frame  is very important .


![image](https://user-images.githubusercontent.com/22829692/132892945-f49f4040-55c1-49e2-99f9-8ff3332a28dd.png)


Recall you Pressed A on Visual Frame 430? You put down 430 for the Origin Seed **1AFE9D3D**. You put the details on the RTC window, and extend the end date to 2005-01-01 and ensure that Ageto 0 Difference is Ticked, and input your Target Seed, which is the same seed you got earlier in the first part from the GameCube Searcher tab. 

Press search. Most likely you will not get any result. Give it two minutes to see if you get any result ,and if you don’t Cancel the search. I did not get any result using this Original Seed on Visual Frame 430.



## **Trying to Find Results**


Now what?  Now you will have to restore the save state to the first part, where you were at 430 visual frame before Pressing A. 

Repeat the steps from above but this time Check the Original seed on **Visual Frame 431**. So press **N** to go from **430** to **431**, and load your Lua script at the right time. Keep repeating for each visual frames (most of the time you will search at least 5-10 visual frames before finally getting the result.  

Mine is kinda similar but messy, and it is important to check each visual frame sequentially.

![image](https://user-images.githubusercontent.com/22829692/132893228-689d99a3-ff7e-4e0f-8fd6-958380b3ef23.png)



Finally I did get my Result at Visual Frame **450**, which has **1BCCCB52** as my **Original Seed**.

You will have multiple results. Do not stop the searching on the **RTC Window** till you have like 10 results at least.

Now each result will have a date and time. That is the date and time you will have to use for **RunAsDate**. 

Here is the tricky part:  Must run the same visual frame as the one you hit your successful Origin Seed. Doing so will cause you to hit your resulting origin seed on the right column on the same date you runasdated from.


Occasionally your first few results if you ran the runasdate and hit the same Visual Frame you will not get your resulting seed on the right column. Don’t lose hope! Keep going through each of the results and most likely you will be able to hit your seed.


Part IV: Hitting your Origin Seed and Setting Up VBA - m Connection to Dolphin.


As you can see below, my third Origin Seed  result was successfully hit  when I pressed A on Visual Frame 450. My Original Seed is now F2DD4A52, and you can finally copy that and put it on the top of the note as seen below:


 * At this point Make a **Save State!**

![image](https://user-images.githubusercontent.com/22829692/132893750-4fc784c1-b060-44e4-96fa-ca7e440549d3.png)





Press **A** and got to the next Part and Press **A** till you get to the part where you have to boot up your GBA to GameCube via Link.


![image](https://user-images.githubusercontent.com/22829692/132893993-e9451983-8b50-4e01-812d-8a62c66da11b.png)


**Conneting to GBA Window**

![image](https://user-images.githubusercontent.com/22829692/132894035-8191c352-27a0-4838-b7c9-e023aa727d92.png)



Now at this particular screen above on the left, you will have to enable GBA link on Dolphin via **Controller > Port II > GBA** .  Then Press **Okay**.

![image](https://user-images.githubusercontent.com/22829692/132894146-f77d7f89-f7aa-4805-b561-98b564d09cfc.png)



* Now Launch your **VisualBoyAdvance -m** and load your Rom, then Load your Completed Hall of Fame Save. **This is an important step!!**

To enable GBA Link to GameCube Make all the CheckMarks are enabled on the right places in the screenshot below:

![image](https://user-images.githubusercontent.com/22829692/132894238-16a02583-2a9d-4d50-929b-53ebf566c194.png)



Double check and see if your party is empty in your GBA save. Then Press **Emulation > Reset**. The GBA should automatically enter the BIOS Screen, then the the GBA link cable to CameCube will start firing electric signals on the Bonus Disc Screen as seen below:

![image](https://user-images.githubusercontent.com/22829692/132894313-9233fd72-c0f0-406c-893c-368e8412e9be.png)


This is how you know it’s making a connection. Let it go through. If it fails, then do not exit either emulators. In the Bonus Disc Screen, press **B** to exit the GBA connecting part, then talk to the old man again and try to set up a new connection. 

```
Note: Your Frame (from now on I am not talking about Visual Frame) should be still 1018 and will not advance until you see the Celebi at the end.*
```

 Press **Emulation >  Reset** on the VBA emulator again. Do this repeatedly (a couple of tries is enough until you see that you have successfully connected!


Once it is connected leave your VBA alone for now on this screen below. Do not pause or do anything else on this screen for VBA.

![image](https://user-images.githubusercontent.com/22829692/132894476-8cff0ab7-08a9-4e46-ac6f-ace28ff50e49.png)



Now  going back to the Dolphin Emulator, you will Press A until you reach this particular screen where your name is seen. Keep your eye peeled to the Frame Part (Visual Frame is no longer relevant here)

![image](https://user-images.githubusercontent.com/22829692/132894521-89489928-9774-4994-8da9-6cee711f5b1a.png)

```
NOTE: Make a save state HERE!!!**
```

Now launch **Pokefinder > GameCube > Generator** and input the details as seen below where the original seed is the seed that you have successfully hit on the **GameCube RTC** result. Make sure you use **Method: Ageto 0 Difference**, your initial advance at **1018**, *Delay 20 (this can vary, you can just ignore this part and use calculator only)*, and filter out your spread result that you are aiming for. 

![image](https://user-images.githubusercontent.com/22829692/132895018-aa51134b-26fc-40c6-aea1-bec1606f81e3.png)



## **Part V: Finally Getting Your Ageto Celebi!**

What you need to do now is to take the resulting Advances from the Generator Tab, which is 906962 and subtract that with 17000. Don’t worry if your delay is different. As long as your final frame does not exceed the original Advances indicated in the RTC Result that you have successfully hit. The resulting calculation will be the exact frame you will hit exactly to land your Celebi! 

*For more Details, Simply Subtract 17000 from the Advances that you want to Target, then your goal is to make save state at near that frame  (Like 860,000). After wards manually advance to the 889,964 which is the result of subtracting 170022 from the original advance. Let's say you are advancing to 889,688, and then press N one more time and that goes past **889,964**, then you have to restore the state back again so your last manual advance does not exeed this number. At this point you can press A!

Subtracting Original Advance by 17k 

![image](https://user-images.githubusercontent.com/22829692/132895729-95db39f4-ebe3-4938-a4dc-7e60d915b4f5.png)


On the **Frame** (remember we are no longer talking about Visual Frame)  you will press A at exactly 889,964. 
Make save states as your target gets closer. Your connection to the VBA will not stop as long as you don’t do anything else other than getting the Celebi, and it is relatively safe to load state in case you miss your target. When you are near the target; **PAUSE**!! And then Press **N** manually. Your frame counter should land on the exact number as indicated before.

Now I have successfully on the last frame before the the next manual advance exceed the one on the RTC clock:

![image](https://user-images.githubusercontent.com/22829692/132895951-c7f49010-37cb-48e4-ba0e-c1356df5f1fc.png)


FINALLY **Press A and unpause simultaneously  now to Receive your Celebi!**


**CONGRATULATIONS!!!** You have successfully RNG’d the Celebi!! You can make a save state at this point (before pressing **Yes**) 

![image](https://user-images.githubusercontent.com/22829692/132896160-c85468df-940d-4e45-ac59-19914c2ef600.png)


After Pressing **A** you will get dialogues saying that your GBA game has received the Celebi, and your VBA Emulator should get the message saying that the Celebi has been Received. Keep pressing **A** on the Dolphin emulator until you are back at the redeeming Celebi part where you can talk with the old man.


## **Part: VI : Checking the IVs and Summary of Celebi**  
 Now you **THIS IS THE IMPORTANT PART**: *Do not shut down or turn off VBA. Just press Reset. I repeat. RESET*.  **Emulation > Reset** to be exact. Now once that is done. Go into your game and see your party in the VBA. The Celebi is there now. You might not be able to read the summary due to being in Japanese but this Celebi is your successful one!

![image](https://user-images.githubusercontent.com/22829692/132896361-52df522d-56a7-4414-9e09-fdb086941913.png)


Now **save the game**, in game!

![image](https://user-images.githubusercontent.com/22829692/132896435-4ba51a11-7f0d-4918-8799-8c977ce05cc5.png)

Saving:

![image](https://user-images.githubusercontent.com/22829692/132896472-b66a6772-b89a-41fa-9de5-dadd981e57eb.png)



Once that is done. Press **File > Export  > Battery File** and Export the file as **Celebi.sav** or something similar so you can identify the save, and put it in a safe place. Now load **PKHeX**, and check your save to view the Celebi. **Congratulations!!**

![image](https://user-images.githubusercontent.com/22829692/132896557-e4b6a20d-966d-4f40-b20d-ab574beaa8e0.png)



Now you can see your **Origin Seed** on this Summary Matching the Target Seed that you have in the notes before.

![image](https://user-images.githubusercontent.com/22829692/132896701-b62c6778-4c6c-47c6-93fc-e3b5625c0a7c.png)


