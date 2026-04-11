import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-Dx1x27-2.js";var n=e(),r={title:`Omega Ruby and Alpha Sapphire DexNav RNG`,navDrawerTitle:`DexNav RNG`,description:`Learn how to RNG Pokémon using the DexNav feature in Omega Ruby and Alpha Sapphire.`,slug:`emulator-oras-dexnav`,category:`Omega Ruby and Alpha Sapphire`,isRoughDraft:!0,section:`pokemon_rng`,variant:`cfw-emu`};function i(e){let r={code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Citra (save-state builds) w/ CitraRNG`}),`
`,(0,n.jsx)(r.li,{children:`3DSRNGTool (Real96's fork for TimeFinder)`}),`
`,(0,n.jsx)(r.li,{children:`Optional: TimeFinder for a specific target`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Setup`}),`
`,(0,n.jsx)(r.p,{children:`Go to the location where you want to do the RNG with your target Pokémon, and use a repel. This helps increase total encounters and gives you better chances for Egg Moves and IVs.`}),`
`,(0,n.jsxs)(r.p,{children:[`Next, find a target frame. Use TimeFinder (link will be provided later), or use the old method of SRing for an initial seed. 3DSRNGTool doesn’t have a DexNav RNG method, so go to the "Normal Wild" section and set the delay to `,(0,n.jsx)(r.code,{children:`217`}),`. This is the longer default delay for DexNav RNG, helping you avoid skipping your frame.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:"It's important to set a high minimum frame for the frame range. Set a DexNav encounter before, and this takes time. I recommend setting the minimum frame to at least `5000`. If the area is small or difficult for DexNav, consider a higher minimum frame.\n"})}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: Process`}),`
`,(0,n.jsx)(r.p,{children:`Once you have your target frame, make sure to set it as your Target Frame, as it’s important to track since the delay is random.`}),`
`,(0,n.jsx)(r.p,{children:`Enter the game, and quickly access the bag. Create a save state; this will be used for the first part of the RNG, which involves triggering an encounter. After saving, close the bag and click on "Search." It’s likely you won’t find an encounter; that’s normal. Move around, open the bag again, create another save state (or overwrite the previous one, but don’t skip your Target Frame), close the bag, and search. Repeat this until you get an encounter.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`If you want a specific egg move or criteria, check if the triggered Pokémon meets your needs, since these are independent of the main RNG factors. You can keep creating save states until you have the Pokémon you want.
`})}),`
`,(0,n.jsx)(r.p,{children:`After triggering an encounter, reload the save state in the bag. With this setup at the start of a chain, no TinyMT is necessary—just stay in the bag and advance until you’re near your target frame. To avoid failure, create as many save states as needed.`}),`
`,(0,n.jsxs)(r.p,{children:[`The next step is to reach your target frame with the `,(0,n.jsx)(r.code,{children:`217`}),` delay. Close your bag a few hundred frames before your target frame—`,(0,n.jsx)(r.code,{children:`150`}),` frames is recommended. Going too far can mess up your chances to trigger an encounter, leading to a failed RNG. Once back at the main screen, click on "Search," hold it, and pause the game.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`This process can be tedious if you're not careful, so consider slowing down the game or advancing frame by frame.
`})}),`
`,(0,n.jsx)(r.p,{children:`While holding the Search button, advance frame by frame until reaching your target.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Your mouse must keep clicking on the Search button while you advance frames. You can stop clicking if the game is paused and you’re not advancing. It may be confusing at first, but you'll master it with practice.
`})}),`
`,(0,n.jsx)(r.p,{children:`When you reach your target frame, unpause the game and stop clicking. This will trigger the encounter at the exact frame. Since you know you triggered an encounter, go to the Pokémon and start the battle.`}),`
`,(0,n.jsx)(r.p,{children:`If the Pokémon matches, congratulations—you did your DexNav RNG!`}),`
`,(0,n.jsxs)(r.p,{children:[`However, often you may not get what you want. DexNav RNG has varying delays—though they are stable, they relate to the length of the search animation. Common delays are `,(0,n.jsx)(r.code,{children:`137`}),`, `,(0,n.jsx)(r.code,{children:`177`}),`, and `,(0,n.jsx)(r.code,{children:`217`}),`, but other values will typically fall within the `,(0,n.jsx)(r.code,{children:`130-250`}),` frame range.`]}),`
`,(0,n.jsx)(r.p,{children:`If this happens, write down the IVs and compare the delay with the one you’ve got. Adjust the delay, reload the save state, and repeat. You should eventually get your encounter. If not, keep adjusting.`}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinese translation: xuanyelin, Hakuhiro.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};