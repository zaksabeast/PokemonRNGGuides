# NTR Helper Usage

NTR Helper can be used to connect to a CFW 3DS for automatically grabbing information from PCalc, such as the initial seed or the TinyMT seeds. This reduces time from having to manually input the information, and 3DSRNGTool will automatically update the initial seed or TinyMT seeds when needed.

[](https://i.imgur.com/9hpIEjC.png)

- NTR Helper can be found in 3DSRNGTool under the "Tools" tab in the upper right.

## Using NTR

### Enabling Debugger

- If you are using an O2DS or O3DS you will need to use NTR Mode 3 for PCalc.
- For instructions on how to set up and use NTR for use with PCalc follow [this guide](https://pokemonrng.com/guides/tools/en/How%20to%20Install%20PCalc/).
- Additionally you will also need to enable debugger to be able to connect to NTR Helper.
    - This is necessary for the console to stay connected to the internet after loading the game.
   - Press `X + Y` to bring up the NTR menu then select "Enable Debugger".
   - Press `Select + L + Down` to bring up the Rosalina menu then select "Enable Debugger".
- Otherwise for N3DS or N2DSXL run NTR normally without Mode 3.
    - The debugger is automatically enabled in NTR.

### Finding IP Address

- The IP address can be found on the Rosalina menu screen if Input Redirection is enabled. Input Redirection is not needed but it's a quick way to see the IP address. 
   - To open the Rosalina menu screen press `Select + L + Down` on the 3DS and enable Input Redirection.
   - If wanted you can disable Input Redirection after obtaining the IP address in the same way you enabled it.


## Gen 6

1. Boot NTR and enable debugger if needed (see above).

2. Load the game while holding the `Left` button on the d-pad.
    - The screen will flash three times then stop on the 3DS logo.
    
3. In 3DSRNGTool go to Tools -> RNG Helper.

4. Fill in IP address.
    - See above for finding the console's IP address.

5. Click "One Click" to connect in the RNG Helper window within 3DSRNGTool.

### Reseeding

The initial seed is generated once you enter the continue screen. This allows us to generate a new initial seed without resetting the game or console.


To reset the the initial seed:
1. Press `B` to go back to the title screen from the continue screen.
2. Press `A` to go back to the continue screen, at which point a new initial seed should be generated.
- These steps can be done as many times as needed.

NTR Helper will automatically input the initial seed into 3DSRNGTool each time you reseed as long as it is connected to the 3DS. 



## Gen 7

1. Boot NTR and enable debugger if needed (see above).

2. Load the game and pause at the continue screen.
    - Optionally you can connect while in the game later.
    - If using a N3DS or N2DSXL you can press the home button to connect to the internet, then resume the game once connected to NTR Helper.
    
3. In 3DSRNGTool go to Tools -> RNG Helper.

4. Fill in IP address.
    - See above for finding the console's IP address.

5. Click "Connect" to connect in the RNG Helper window within 3DSRNGTool.