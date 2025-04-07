import{u as r,j as e}from"./index-CPDhDZJw.js";const i={title:"DexNav RNG",description:"DexNav RNG for ORAS. Citra is 100% recommended.",slug:"emulator-oras-dexnav",category:"Omega Ruby and Alpha Sapphire",isRoughDraft:!0,tag:"emu"};function a(n){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Tools"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Citra (save-state builds) w/ CitraRNG"}),`
`,e.jsx(t.li,{children:"3DSRNGTool (Real96's fork for TimeFinder)"}),`
`,e.jsx(t.li,{children:"Optional: TimeFinder for a specific target"}),`
`]}),`
`,e.jsx(t.h2,{children:"Step 1: Setup"}),`
`,e.jsx(t.p,{children:"Go to the location where you want to do the RNG with your target Pokémon, and use a repel. This helps increase total encounters and gives you better chances for Egg Moves and IVs."}),`
`,e.jsxs(t.p,{children:['Next, find a target frame. Use TimeFinder (link will be provided later), or use the old method of SRing for an initial seed. 3DSRNGTool doesn’t have a DexNav RNG method, so go to the "Normal Wild" section and set the delay to ',e.jsx(t.code,{children:"217"}),". This is the longer default delay for DexNav RNG, helping you avoid skipping your frame."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:"It's important to set a high minimum frame for the frame range. Set a DexNav encounter before, and this takes time. I recommend setting the minimum frame to at least `5000`. If the area is small or difficult for DexNav, consider a higher minimum frame.\n"})}),`
`,e.jsx(t.h2,{children:"Step 2: Process"}),`
`,e.jsx(t.p,{children:"Once you have your target frame, make sure to set it as your Target Frame, as it’s important to track since the delay is random."}),`
`,e.jsx(t.p,{children:'Enter the game, and quickly access the bag. Create a save state; this will be used for the first part of the RNG, which involves triggering an encounter. After saving, close the bag and click on "Search." It’s likely you won’t find an encounter; that’s normal. Move around, open the bag again, create another save state (or overwrite the previous one, but don’t skip your Target Frame), close the bag, and search. Repeat this until you get an encounter.'}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`If you want a specific egg move or criteria, check if the triggered Pokémon meets your needs, since these are independent of the main RNG factors. You can keep creating save states until you have the Pokémon you want.
`})}),`
`,e.jsx(t.p,{children:"After triggering an encounter, reload the save state in the bag. With this setup at the start of a chain, no TinyMT is necessary—just stay in the bag and advance until you’re near your target frame. To avoid failure, create as many save states as needed."}),`
`,e.jsxs(t.p,{children:["The next step is to reach your target frame with the ",e.jsx(t.code,{children:"217"})," delay. Close your bag a few hundred frames before your target frame—",e.jsx(t.code,{children:"150"}),' frames is recommended. Going too far can mess up your chances to trigger an encounter, leading to a failed RNG. Once back at the main screen, click on "Search," hold it, and pause the game.']}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`This process can be tedious if you're not careful, so consider slowing down the game or advancing frame by frame.
`})}),`
`,e.jsx(t.p,{children:"While holding the Search button, advance frame by frame until reaching your target."}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{children:`Your mouse must keep clicking on the Search button while you advance frames. You can stop clicking if the game is paused and you’re not advancing. It may be confusing at first, but you'll master it with practice.
`})}),`
`,e.jsx(t.p,{children:"When you reach your target frame, unpause the game and stop clicking. This will trigger the encounter at the exact frame. Since you know you triggered an encounter, go to the Pokémon and start the battle."}),`
`,e.jsx(t.p,{children:"If the Pokémon matches, congratulations—you did your DexNav RNG!"}),`
`,e.jsxs(t.p,{children:["However, often you may not get what you want. DexNav RNG has varying delays—though they are stable, they relate to the length of the search animation. Common delays are ",e.jsx(t.code,{children:"137"}),", ",e.jsx(t.code,{children:"177"}),", and ",e.jsx(t.code,{children:"217"}),", but other values will typically fall within the ",e.jsx(t.code,{children:"130-250"})," frame range."]}),`
`,e.jsx(t.p,{children:"If this happens, write down the IVs and compare the delay with the one you’ve got. Adjust the delay, reload the save state, and repeat. You should eventually get your encounter. If not, keep adjusting."})]})}function s(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(a,{...n})}):a(n)}export{s as default,i as frontmatter};
