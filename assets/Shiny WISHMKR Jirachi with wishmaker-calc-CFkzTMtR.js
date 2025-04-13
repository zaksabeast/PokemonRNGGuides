import{u as s,j as e}from"./index-BnuqMJBs.js";const r={title:"Shiny WISHMKR Jirachi RNG using wishmaker-calc",description:"RNG Jirachi from the Colosseum bonus disc",slug:"emulator-rs-wishmaker",subCategory:"Emulator",tag:"emu"};function a(n){const i={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h2,{children:"Tools"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/mgba-setup",children:"mGBA with lua scripts"})}),`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"https://zaksabeast.github.io/wishmaker-calc/build/",children:"wishmaker-calc"})}),`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"https://github.com/Real96/PokeLua/blob/main/Gen%203/mGBA/RS_RNG_Checksums_mGBA.lua",children:"wishmaker lua script"})}),`
`]}),`
`,e.jsx(i.h3,{children:"Before beginning"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Do not change your text speed; it will alter your save delay."}),`
`,e.jsx(i.li,{children:"Speeding up the emulator might cause this method to fail."}),`
`,e.jsx(i.li,{children:"Instead of starting a new file, you can wait 30 minutes in-game."}),`
`,e.jsx(i.li,{children:"Change the name or starter each time you try with a new save."}),`
`,e.jsx(i.li,{children:"Switch between the male and female character."}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{children:`Note: Sometimes, when standing still, certain game data bytes may change and cause issues with the program. It may take several tries to obtain your Jirachi due to this.

This method cannot target a specific Jirachi spread. This guide is solely for obtaining a shiny Jirachi without the option to select a spread. Manipulating the block 0 checksum for a specific Jirachi spread is complex and not included here.
`})}),`
`,e.jsx(i.h3,{children:"Lua Script Set up"}),`
`,e.jsx(i.p,{children:"In line 6 of the lua script edit it to the path where your save is located."}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{children:`local savePath = "D:\\\\Desktop\\\\mGBA\\\\battery\\\\Pokemon - Ruby Version (USA, Europe) (Rev 2).sav"  -- Write here the path of your Ruby/Sapphire save file
`})}),`
`,e.jsx(i.h2,{children:"Step 1: Setting up"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Find your save delay."}),`
`,e.jsx(i.li,{children:"Open Ruby/Sapphire and load the wishmaker lua script."}),`
`,e.jsx(i.li,{children:'Open the save menu and pause the game at the last dialogue option over "YES".'}),`
`,e.jsx(i.li,{children:"Note the current time displayed by the lua script."}),`
`,e.jsxs(i.li,{children:["Hold down the ",e.jsx(i.code,{children:"A"})," button and unpause the game simultaneously."]}),`
`,e.jsx(i.li,{children:"When the lua script time freezes, pause the game and write down that time."}),`
`]}),`
`,e.jsx(i.p,{children:"Your save delay will be the time when it froze minus the time when you paused the game."}),`
`,e.jsx(i.p,{children:e.jsx(i.code,{children:"Save delay = time froze - time paused"})}),`
`,e.jsxs(i.ol,{start:"7",children:[`
`,e.jsx(i.li,{children:"Open the lua script in a text editor, like WordPad."}),`
`,e.jsx(i.li,{children:'Input your save delay in the variables "savedelaySecond" and "savedelayFrame".'}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{children:`Note: Do not modify anything in the lua script below the "DON'T EDIT ANYTHING BEYOND HERE" comment!
`})}),`
`,e.jsx(i.p,{children:e.jsx(i.img,{src:"/images/Ruby-Sapphire/Wishmaker/Lua.png",alt:"Lua Script"})}),`
`,e.jsx(i.h2,{children:"Step 2: Finding a Jirachi seed"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Prepare your save."}),`
`,e.jsx(i.li,{children:"Use a save that has already obtained the Pokedex; save your game."}),`
`,e.jsx(i.li,{children:"In mGBA, export your battery file and upload it to wishmaker-calc by clicking on Jirachi."}),`
`,e.jsx(i.li,{children:"If the website asks you to save the game again, do it, then reupload the save to the website. This may happen multiple times."}),`
`]}),`
`,e.jsx(i.p,{children:e.jsx(i.img,{src:"/images/Ruby-Sapphire/Wishmaker/JirachiCalc.png",alt:"JirachiCalc"})}),`
`,e.jsxs(i.ol,{start:"5",children:[`
`,e.jsx(i.li,{children:'If it shows "No Results", you can:'}),`
`,e.jsx(i.li,{children:"Move to a different location, save, and check for a Jirachi again."}),`
`,e.jsx(i.li,{children:"Collect the Running Shoes or do wild battles."}),`
`,e.jsx(i.li,{children:'If you still see "No Results," wait 30 minutes in-game or restart the game with a new save.'}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{children:`Note: The program only searches the next 30 minutes for a match, so waiting 30 minutes in-game may yield new results.
`})}),`
`,e.jsxs(i.ol,{start:"9",children:[`
`,e.jsx(i.li,{children:"If you receive a time to save, you have found a Jirachi."}),`
`,e.jsx(i.li,{children:"Check the spread to see if it's one you want; if not, repeat the steps above."}),`
`]}),`
`,e.jsx(i.p,{children:e.jsx(i.img,{src:"/images/Ruby-Sapphire/Wishmaker/Jirachi.png",alt:"Jirachi Spread"})}),`
`,e.jsx(i.h2,{children:"Step 3: Hitting the Target Seed"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Open the lua script in WordPad (or a text editor)."}),`
`,e.jsx(i.li,{children:"Input the time from wishmaker-calc under targetSaveHour, Minute, Second, and sixtiethSecond."}),`
`,e.jsx(i.li,{children:"Optionally, add your target Jirachi seed (for rng proofs/personal preference)."}),`
`,e.jsx(i.li,{children:"Restart the lua script. You will see two different times displayed."}),`
`,e.jsx(i.li,{children:"The target save time is when you save to get the desired Jirachi."}),`
`,e.jsx(i.li,{children:"The real save time is when you save, calculated using your save delay."}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{children:`Note: Target save time = Real save time + delay while saving.
`})}),`
`,e.jsxs(i.ol,{start:"7",children:[`
`,e.jsx(i.li,{children:'Advance to the last dialogue of the save menu and hover over "YES".'}),`
`,e.jsx(i.li,{children:"Pause the game."}),`
`,e.jsx(i.li,{children:"Wait for the in-game time to match the real save time displayed."}),`
`,e.jsx(i.li,{children:"Unpause the game and stay close to the needed time."}),`
`,e.jsx(i.li,{children:"Once near your real save time, pause and advance frames manually."}),`
`,e.jsxs(i.li,{children:["The default key for advancing frames is ",e.jsx(i.code,{children:"Ctrl + N"})," for Windows."]}),`
`,e.jsxs(i.li,{children:["When on your real save time, hold down ",e.jsx(i.code,{children:"A"})," and unpause the game simultaneously."]}),`
`]}),`
`,e.jsx(i.p,{children:e.jsx(i.img,{src:"/images/Ruby-Sapphire/Wishmaker/Final-Screen.png",alt:"Final Screen"})}),`
`,e.jsxs(i.ol,{start:"14",children:[`
`,e.jsx(i.li,{children:"After saving, export your battery file."}),`
`]}),`
`,e.jsx(i.h2,{children:"Step 4: Verifying Target Seed"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Upload your save to wishmaker-calc."}),`
`,e.jsx(i.li,{children:"It might ask you to save your game again; you can ignore it."}),`
`,e.jsx(i.li,{children:'Next to the save message, there should be "Current checksum:".'}),`
`,e.jsxs(i.li,{children:["If the seed matches any of the ",e.jsx(i.a,{href:"https://www.irccloud.com/pastebin/rdxEbTm4/",children:"shiny Jirachi seeds"}),", congrats! Your save will redeem a shiny Jirachi!"]}),`
`]}),`
`,e.jsx(i.p,{children:e.jsx(i.img,{src:"/images/Ruby-Sapphire/Wishmaker/Save.png",alt:"Save"})}),`
`,e.jsx(i.h2,{children:"Troubleshooting"}),`
`,e.jsx(i.p,{children:"If your block 0 checksum does not match a shiny Jirachi seed, restart the process from the beginning."}),`
`,e.jsx(i.p,{children:"Some game data bytes not accounted for in wishmaker calc may have caused the failure."}),`
`,e.jsx(i.p,{children:"Alternatively, you might have saved at the wrong time or incorrectly found your save delay."}),`
`,e.jsx(i.h2,{children:"How to Redeem Jirachi"}),`
`,e.jsx(i.p,{children:"You’ve got a few options:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Transfer your save to a real cart and use the actual bonus disc."}),`
`,e.jsxs(i.li,{children:["Emulate the bonus disc in Dolphin and link to a GBA emulator — ",e.jsx(i.a,{href:"/misc-dolphin-connect-vba",children:"guide here"}),"."]}),`
`,e.jsxs(i.li,{children:["Skip Dolphin entirely with the No Dolphin patch — ",e.jsx(i.a,{href:"/no-dolphin-patch",children:"guide here"}),"."]}),`
`]})]})}function l(n={}){const{wrapper:i}={...s(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(a,{...n})}):a(n)}export{l as default,r as frontmatter};
