import{u as t,j as e}from"./index-DDBrKSsW.js";const d={title:"CitraRNG Setup",description:"Setup Citra for RNG",slug:"citrarng-setup",subCategory:"3DS"};function s(i){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.p,{children:"This guide helps you set up CitraRNG on a PC. You need an updated CFW (Custom Firmware) console to dump system info and game data. The console must also have the latest game update installed."}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://citra-emu.org/download/",children:"Citra"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/Admiral-Fish/CitraRNG",children:"CitraRNG"}),". Clone or download the entire repository"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://www.python.org/downloads/",children:"Python 3.9"}),". Make sure to add Python to your ",e.jsx(n.code,{children:"PATH"})," during installation"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/d0k3/GodMode9/releases",children:"Latest Godmode9"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://cdn.discordapp.com/attachments/389206049401470976/435566091457134598/Dump_PKMN_Updates.gm9",children:"Dump_PKMN_Update.gm9 Script"})}),`
`,e.jsxs(n.li,{children:["A 3DS with CFW. Instructions for installing CFW can be found at ",e.jsx(n.a,{href:"https://3ds.hacks.guide/",children:"https://3ds.hacks.guide/"})]}),`
`,e.jsx(n.li,{children:"Latest game update installed on the 3DS"}),`
`]}),`
`,e.jsx(n.h2,{children:"3DS Preparation"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Place the ",e.jsx(n.code,{children:"Dump_PKMN_Update.gm9"})," script on your 3DS SD card in ",e.jsx(n.code,{children:"sdmc:\\gm9\\scripts"}),"."]}),`
`,e.jsxs(n.li,{children:["Update Godmode9 if needed by copying the ",e.jsx(n.code,{children:"gm9"})," folder to your SD card."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dumping System Data"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Boot your 3DS into GodMode9 by holding ",e.jsx(n.code,{children:"Start"})," while powering on the 3DS."]}),`
`,e.jsxs(n.li,{children:["Press the ",e.jsx(n.code,{children:"Home"})," button."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"scripts..."}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"GM9Megascript"}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Dump Options"}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Dump Citra Files"})," to dump Citra files."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dumping Game Data"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Exit back to the GodMode9 main menu and select ",e.jsx(n.code,{children:"scripts..."})," again."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Dump_PKMN_Updates"})," script and follow the on-screen directions."]}),`
`]}),`
`,e.jsx(n.h3,{children:"To Dump a Game Installed on the 3DS"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Hover over ",e.jsx(n.code,{children:"[A:] SYSNAND SD"}),"."]}),`
`,e.jsxs(n.li,{children:["Hold ",e.jsx(n.code,{children:"R"})," and press ",e.jsx(n.code,{children:"A"})," to open the drive options."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Open title manager..."}),"."]}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"A"})," on the game you want to dump."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Manage Title..."}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Build CIA (standard)"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{children:"To Dump a Game from a Cart"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"[C:] GAMECART"}),"."]}),`
`,e.jsxs(n.li,{children:["Select the ",e.jsx(n.code,{children:"trim.3ds"})," file."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"NCSD image options..."}),"."]}),`
`,e.jsxs(n.li,{children:["Select ",e.jsx(n.code,{children:"Build CIA from file"}),"."]}),`
`,e.jsxs(n.li,{children:["Exit GodMode9 and transfer files from ",e.jsx(n.code,{children:"sdmc:\\gm9\\out"})," to your PC."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Setting Up Citra"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Open Citra and under the ",e.jsx(n.code,{children:"File"})," option choose ",e.jsx(n.code,{children:"Install cia..."}),". Install both the game(s) and update(s) .cia."]}),`
`,e.jsxs(n.li,{children:["Place the ",e.jsx(n.code,{children:"nand"})," folder from ",e.jsx(n.code,{children:"sdmc:\\gm9\\out\\Citra\\user\\nand"})," into your user directory for Citra.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For Windows, the path is ",e.jsx(n.code,{children:"C:\\Users\\[your-user-name]\\AppData\\Roaming\\Citra\\nand"}),". The AppData folder is hidden by default, so change the configuration to view it."]}),`
`,e.jsxs(n.li,{children:["For macOS and Linux, the path is ",e.jsx(n.code,{children:"~/.local/share/citra-emu/nand"}),". The ",e.jsx(n.code,{children:".local"})," folder is hidden on most machines, so change the configuration to view it."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Setting Up for Gen 6 RNG"}),`
`,e.jsx(n.p,{children:"To RNG in Gen 6 on Citra, a game patch is needed to read the initial seed. This does not modify the game code and will not lead to illegal Pokémon. The patch writes the initial seed to unused memory for later access."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Follow ",e.jsx(n.a,{href:"https://www.pokemonrng.com/misc-3ds-ips-luma-citra",children:"this guide"})," to install the game patch on Citra. The needed patch is included in the CitraRNG download, in the ",e.jsx(n.code,{children:"oras"})," and ",e.jsx(n.code,{children:"xy"})," folders."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Setting Up CitraRNG"}),`
`,e.jsxs(n.p,{children:["Python 3.9 must be installed for CitraRNG. Make sure to add Python to your ",e.jsx(n.code,{children:"PATH"})," during installation."]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Open a command prompt and type ",e.jsx(n.code,{children:"pip install pyside6"}),". This may require admin privileges."]}),`
`,e.jsxs(n.li,{children:["Copy all the .py files from the CitraRNG folder into ",e.jsx(n.code,{children:"<your Citra directory>/scripting"}),"."]}),`
`,e.jsxs(n.li,{children:["Open Citra and your Gen 7 Pokémon game, then load your save file. For instructions on dumping and loading your save file from the 3DS, refer to ",e.jsx(n.a,{href:"https://citra-emu.org/wiki/dumping-save-data-from-a-3ds-console/",children:"this link"}),"."]}),`
`,e.jsxs(n.li,{children:["Double-click the ",e.jsx(n.code,{children:"citarng.py"})," file to run the script."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:'Note: If it does not work, right-click "citarng.py" and select "Edit with IDLE". Open with Python 3.9 if you have both Python2 and Python3 installed. Then hit `F5` to run it. Alternatively, you can run the script by opening a command prompt in the scripting folder and using the command `py citarng.py`.\n'})}),`
`,e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"In the CitraRNG window, select your game and click connect. CitraRNG will update with game info like initial seed, frames, IVs, etc. The tool has an auto refresher to periodically update frames, but it may crash if left on too long."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The higher the refresh rate delay, the less often the program will crash; 2000 is the max. Pause and reconnect CitraRNG occasionally to prevent crashing.
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.a,{href:"https://citra-emu.org/wiki/home/",children:"Citra wiki"})," has more information on running Citra and troubleshooting issues."]})]})}function o(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{o as default,d as frontmatter};
