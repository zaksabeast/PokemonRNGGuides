import{u as t,j as e}from"./index-DweVeu07.js";const l={title:"CitraRNG Setup",description:"Setup Citra for RNG",slug:"citrarng-setup",subCategory:"3DS"};function s(i){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"This guide is for setting up CitraRNG on a PC. An updated CFW (Custom Firmware) console is required to be able to dump system specific information and game data. The console also needs to have the latest game update installed to be dumped."}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://citra-emu.org/download/",children:"Citra"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/Admiral-Fish/CitraRNG",children:"CitraRNG"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Clone or download the entire repository"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://www.python.org/downloads/",children:"Python 3.9"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["When installing, make sure to add python to your ",e.jsx(n.code,{children:"PATH"})," by checking the box within the installer"]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/d0k3/GodMode9/releases",children:"Latest Godmode9"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://cdn.discordapp.com/attachments/389206049401470976/435566091457134598/Dump_PKMN_Updates.gm9",children:"Dump_PKMN_Update.gm9 Script"})}),`
`,e.jsxs(n.li,{children:["A 3DS with CFW (Custom Firmware)",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://3ds.hacks.guide/",children:"https://3ds.hacks.guide/"})," has instructions for installing CFW"]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Latest game update installed on the 3DS"}),`
`]}),`
`,e.jsx(n.h2,{children:"3DS Preparation"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Place the ",e.jsx(n.code,{children:"Dump_PKMN_Update.gm9"})," script on your 3DS SD card in sdmc:\\gm9\\scripts."]}),`
`,e.jsxs(n.li,{children:["Update Godmode9 if needed by copying the ",e.jsx(n.code,{children:"gm9"})," folder to your SD card."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dumping system data"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Boot your 3DS into GodMode9 by holding ",e.jsx(n.code,{children:"Start"})," while powering on the 3DS."]}),`
`,e.jsxs(n.li,{children:["Press the ",e.jsx(n.code,{children:"Home button"}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"scripts..."}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"GM9Megascript"}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Dump Options"}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Dump Citra Files"})," to dump Citra files."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dumping game data"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Exit back to the GodMode9 main menu and select ",e.jsx(n.code,{children:"scripts..."})," once more."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Dump_PKMN_Updates"})," script and follow the on screen directions."]}),`
`]}),`
`,e.jsx(n.h3,{children:"To dump a game installed on the 3DS do the following."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Hover over [A:] SYSNAND SD."}),`
`,e.jsxs(n.li,{children:["Hold ",e.jsx(n.code,{children:"R"})," and press ",e.jsx(n.code,{children:"A"})," at the same time to open the drive options."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Open title manager..."}),"."]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"})," on the game you want to dump."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Manage Title..."}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Build CIA (standard)"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{children:"To dump a game from a cart do the following."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"[C:] GAMECART"}),"."]}),`
`,e.jsxs(n.li,{children:["Select the ",e.jsx(n.code,{children:"trim.3ds"})," file."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"NCSD image options..."}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Build CIA from file"}),"."]}),`
`,e.jsxs(n.li,{children:["Exit GodMode9 and transfer the files from ",e.jsx(n.code,{children:"sdmc:\\gm9\\out"})," to your PC."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Setting up Citra"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Open Citra, then under the ",e.jsx(n.code,{children:"File"})," option choose ",e.jsx(n.code,{children:"Install cia..."}),".",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Install both the game(s) and update(s) .cia."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Place the nand folder from the ",e.jsx(n.code,{children:"sdmc:gm9\\out\\Citra\\user\\nand"})," into your user directory for Citra.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For Windows, the path is ",e.jsx(n.code,{children:"C:\\Users\\[your-user-name]\\AppData\\Roaming\\Citra\\nand"}),".",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The folder AppData is hidden by default, so you need to change the configuration to view it."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["For macOS and Linux, the path is ",e.jsx(n.code,{children:"~/.local/share/citra-emu/nand"}),".",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The folder .local is hidden on most machines, so you need to change the configuration to view it."}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Setting up for Gen 6 RNG"}),`
`,e.jsx(n.p,{children:"In order to RNG in Gen 6 on Citra, a game patch is needed to be able to read the initial seed. This does not modify the gamecode in anyway that would result in illegal Pokemon. All the patch does is write the initial seed of the game to an unused part of memory that the script has access to later."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["You can follow ",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-ips-luma-citra",children:"this guide"})," for installing the game patch on Citra.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The patch needed is included in the CitraRNG download, within the ",e.jsx(n.code,{children:"oras"})," and ",e.jsx(n.code,{children:"xy"})," folders."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Setting up CitraRNG"}),`
`,e.jsxs(n.p,{children:["Python 3.9 needs to be installed for CitraRNG to work. Python also needs to be added to your ",e.jsx(n.code,{children:"PATH"})," or else the command will not be recognized. To add Python to your ",e.jsx(n.code,{children:"PATH"})," make sure to check the box in the installer."]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Open a command prompt anywhere and type ",e.jsx(n.code,{children:"pip install pyside6"}),".",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This may need administration privileges."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Copy all the .py files in the CitraRNG folder into ",e.jsx(n.code,{children:"<your Citra directory>/scripting"}),"."]}),`
`,e.jsxs(n.li,{children:["Open Citra and your Gen 7 Pokémon game, then load your save file.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://citra-emu.org/wiki/dumping-save-data-from-a-3ds-console/",children:"This"})," has instructions for dumping and loading your save file from the 3DS."]}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Double-click the citrarng.py file to run the script."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: If this does not work then right click "citrarng.py" and select "Edit with IDLE". Make sure that you open with Python 3.9 if you have both Python2 and Python3 installed. Then hit "F5" to run the script.

Alternatively, you can run the script by opening a command prompt in the scripting folder and using the command "py citrarng.py".
`})}),`
`,e.jsxs(n.ol,{start:"5",children:[`
`,e.jsxs(n.li,{children:["In the CitraRNG window select your game and click connect.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"CitraRNG will update with information from the game such as initial seed, frames, ivs etc."}),`
`,e.jsx(n.li,{children:"The tool has an auto refresher to allow frames to be updated periodically, this may make the program crash if left on long enough."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The higher the delay for the refresh rate the less often the program will crash, 2000 is the max. Pause and reconnect CitraRNG every once in a while, to keep it from crashing.
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.a,{href:"https://citra-emu.org/wiki/home/",children:"Citra wiki"})," has more information on how to run Citra and how to troubleshoot issues."]})]})}function o(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{o as default,l as frontmatter};
