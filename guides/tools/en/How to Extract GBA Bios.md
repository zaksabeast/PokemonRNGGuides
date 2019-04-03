# How to extract GBA BIOS

_Guide to extracting the GBA BIOS file for use on emulators_

Some games need a GBA BIOS file to be able to load on emulators. If you are encountering an error message about a problem related to the BIOS then you will need a GBA BIOS to load that game. This guide has two different methods for extracting the GBA BIOS file yourself. 

## Tools

- Either a 3DS with CFW (Custom Firmware) and at least 1 VC game from eShop (GB, GBC or NES)
   - https://3ds.hacks.guide/ has instructions for installing CFW

- Or a hacked Wii with a GBA to GameCube Link Cable, and a GameBoy Advance or GameBoy Advance SP
   - https://sites.google.com/site/completesg/ has instructions for hacking a Wii
   - For windows users, you can find an easy to use tool for Wii hacking at https://gbatemp.net/threads/setmiiup-from-stock-to-latest-softmod-in-less-then-5-10-minutes.459416/

## Using a NES/GB/GBC VC game with a CFW 3DS

1. Launch GodMode9 and press `A` on "SYSNAND SD".
2. Hold `R` and `A` at the same time and press `A` on "Search for Titles" to see all of your titles.
3. Search for your NES/GB/GBC VC game (it should say .tmd at the end of the title) and press `A`.
4. Select "TMD files option.." then select "Build CIA (Standard)".
   - The .CIA file should be exported to the `/gm9/out/` folder on your SD card.
5. Navigate to `/gm9/out/` and press `A` on the VC game and select "CIA image options...".
6. Select "Mount image to drive" and press `A` on the prompt.
7. Press `A` on "0000.00000002", and then press `A` on "romfs".
8. There should be an "agb.bin".
   - Press `A` on it and select "Copy to 0:/gm9/out"
9. Now the GBA BIOS file should be in `/gm9/out`.
   - Copy this file to the computer, rename it to `GBA.BIOS`, and place it in the same folder as the emulator.

## Using a hacked Wii

1. Download the latest [GBA Link Cable Dumper](https://github.com/FIX94/gba-link-cable-dumper/releases).
   - Unzip the folder into the `apps` folder on the console's SD card.
   - Afterwards you should have `apps/gba-gc-link-dumper/boot.dol`.
2. Boot the console into the Homebrew Launcher and load the GBA Link Cable Dumper.
3. When prompted, insert the GBA to GameCube Link Cable into one of the GameCube controller slots of the Wii.
4. Connect the GameBoy Advance/GameBoy Advance SP and turn it on.
5. Wait for the program to load, then press `Y` to dump the GBA BIOS.
6. Once that is finished, turn off the console and remove the SD card.
7. The GBA BIOS file can be found at `/dumps/gba_bios.bin`
7. Copy this file to the computer, rename it to `GBA.BIOS`, and place it in the same folder as the emulator.
