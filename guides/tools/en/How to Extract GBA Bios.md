# How to extract GBA BIOS

## Tools

- A CFW 3DS or Hacked Wii/Wii U

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
9. Now the GBA BIOS should be in `/gm9/out`.
   - Copy this file to the computer and place it in the same folder as the emulator.
10. Enjoy the GBA BIOS!!

## Using a hacked Wii/Wii U

- To be added
