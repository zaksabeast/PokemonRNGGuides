import{u as t,j as e}from"./index-CpyEa1Z6.js";const r={title:"Shiny WISHMKR Jirachi RNG using wishmaker-calc",description:"RNG Jirachi from the Colosseum bonus disc",slug:"emulator-rs-wishmaker",subCategory:"Emulator"};function s(i){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/TASVideos/vba-rerecording/releases",children:"VBA-RR"})}),`
`,e.jsxs(n.li,{children:["Lua .dll files:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.dropbox.com/s/2o4hdphn7j9z349/lua-dll-x86.zip?dl=0",children:"x86.dll"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.dropbox.com/s/t8yttukleqserzp/lua-dll-x64.rar?dl=0",children:"x64.dll"})}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://zaksabeast.github.io/wishmaker-calc/build/",children:"wishmaker-calc"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/beatlynx/lua-stuff/blob/master/scripts/wishmakerlua.lua",children:"wishmaker lua script"})}),`
`]}),`
`,e.jsx(n.h3,{children:"Before beginning"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure to not change your text speed as this will change your save delay."}),`
`,e.jsx(n.li,{children:"Speeding up the emulator might cause this method to fail."}),`
`,e.jsx(n.li,{children:"An alternative to starting a new file is waiting 30 minutes in-game."}),`
`,e.jsx(n.li,{children:"Don't choose the same name or starter every time you try with a new save."}),`
`,e.jsx(n.li,{children:"Try switching bewteen the male and female character."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Sometimes, when the player is standing still certain bytes of game data can change that will cause the program to not work correctly. It may take many tries to obtain your Jirachi because of this.

It is not possible to RNG for a specific Jirachi spread with this method. This guide is only for RNGing a shiny Jirachi and you cannot choose a specific spread. Manipulating the block 0 checksum for a specific Jirachi spread is a complex process and is not covered in this guide.
`})}),`
`,e.jsx(n.h2,{children:"Step 1: Setting up"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Find your save delay",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Before beginning this process you need to find your save delay."}),`
`,e.jsx(n.li,{children:"Start by opening up Ruby/Sapphire on VBA-RR and load the wishmaker lua script."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:['Open up the save menu and pause the game at the last line of dialogue over "YES".',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make note of the current time displayed by the lua script."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Next, hold down the ",e.jsx(n.code,{children:"A"})," button and unpause the game at the same time.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Watch the current time. When the current time on the lua script freezes, pause the game and write that time down."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"Here is an example of the time freezing while saving."}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"https://i.imgur.com/dVM5jnp.gif",alt:""})}),`
`,e.jsx(n.p,{children:"Your save delay will be the time when it froze minus the time when you paused the game before saving."}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Save delay = time froze - time paused"})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["Open up the lua script in a text editor, such as wordpad.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Put your save delay second and frame in the variables "savedelaySecond" and "savedelayFrame".'}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Make sure not to modify anything in the lua script below the "DON'T EDIT ANYTHING BEYONG HERE" comment!
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Wishmaker/Lua.png",alt:"Lua Script"})}),`
`,e.jsx(n.h2,{children:"Step 2: Finding a Jirachi seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Prepare the save",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You must use a save that has already obtained the Pokedex."}),`
`,e.jsx(n.li,{children:"After obtaining the Pokedex, save your game."}),`
`,e.jsx(n.li,{children:"In VBA-RR, export your battery file and upload it to wishmaker-calc by clicking the Jirachi."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["If the website tells you to save the game again, do so and reupload the save to the website.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"This may happen multiple times."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Wishmaker/JirachiCalc.png",alt:"JirachiCalc"})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:['If the website displays "No Results" you have a few options.',`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You can move to a different location, save, and check for a Jirachi again."}),`
`,e.jsx(n.li,{children:"Collecting the Running Shoes, or doing wild battles may also work."}),`
`,e.jsx(n.li,{children:`If you're still getting "No Results", then you will have to either wait 30 minutes ingame, or restart the game with a new save.`}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: The program searches through the next 30 minutes only for a match which is why waiting 30 minutes ingame may allow for new results to be found.
`})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["If you get a time to save, you have found a Jirachi.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Check the spread to see if it is one you want. If it isn't, repeat the above steps."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Wishmaker/Jirachi.png",alt:"Jirachi Spread"})}),`
`,e.jsx(n.h2,{children:"Step 3: Hitting the Target Seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Open the lua script in wordpad (or your favorite text editor)."}),`
`,e.jsxs(n.li,{children:["Input the time given by wishmaker-calc under targetSaveHour, Minute, Second, and sixtiethSecond.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Optionally, you can add your target Jirachi seed as well (for rng proofs/personal preference)."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Restart the lua script.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You will notice that there are now two different times displayed in the lua script."}),`
`,e.jsx(n.li,{children:"The target save time is the time to save at to obtain the desired Jirachi."}),`
`,e.jsx(n.li,{children:"The real save time is the time you will actually be saving at and was calculated using your save delay."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Target save time = Real save time + delay while saving
`})}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:'Advance to the last dialogue of the save menu and hover over "YES".'}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Pause the game here."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Wait for the ingame time to match the real save time displayed."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Unpause the game and wait until you are close to the time needed."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Once you are close to your real save time, pause the game and advance frames manually."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["The default key for advancing frames while paused is ",e.jsx(n.code,{children:"Ctrl + N"})," for Windows."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["When you are on your real save time, hold down ",e.jsx(n.code,{children:"A"})," and unpause the game at the same time."]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Wishmaker/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsxs(n.ol,{start:"11",children:[`
`,e.jsx(n.li,{children:"After saving the game, export your battery file."}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 4: Verifying Target Seed"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Upload your save to wishmaker-calc.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"It should display a message to save your game again, but you can disregard it."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:['Next to the save your game message there should be text that says "Current checksum:".',`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If the seed next to it matches any of the ",e.jsx(n.a,{href:"https://www.irccloud.com/pastebin/rdxEbTm4/",children:"shiny Jirachi seeds"})," then congrats! Your save will redeem to a shiny Jirachi!"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Ruby-Sapphire/Wishmaker/Save.png",alt:"Save"})}),`
`,e.jsx(n.h2,{children:"Troubleshooting"}),`
`,e.jsx(n.p,{children:"If your block 0 checksum does not match one of the shiny Jirachi seeds, you will need to restart the process from the beginning."}),`
`,e.jsx(n.p,{children:"As mentioned previously, some bytes of game data that wishmaker calc does not account for might have caused the method to fail."}),`
`,e.jsx(n.p,{children:"Alternatively, you might have saved at the wrong time or obtained your save delay incorrectly."}),`
`,e.jsx(n.h2,{children:"Methods to redeem Jirachi"}),`
`,e.jsx(n.p,{children:"You can redeem your Jirachi by moving your save file to a real cartridge and using a real bonus disc, or by emulating the bonus disc with dolphin."}),`
`,e.jsxs(n.p,{children:["A guide on connecting VBA to Dolphin can be found ",e.jsx(n.a,{href:"https://pokemonrng.com/guides/tools/en/How%20to%20Connect%20Dolphin%20to%20VBA/",children:"here"}),"."]})]})}function l(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{l as default,r as frontmatter};
