import{u as r,j as e}from"./index-COoVEwFa.js";const a={title:"Stationary RNG",description:"RNG Stationary Pokemon such as your starter Pokemon",slug:"cfw-bdsp-stationary",subCategory:"Custom Firmware",tag:"cfw"};function s(t){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A Switch with CaptureSight (",e.jsx(n.a,{href:"https://www.pokemonrng.com/install-capturesight",children:"CaptureSight Install Guide"}),")"]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://chatot.pokemonrng.com/#/bdsp",children:"Chatot"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Step 1: Set Up the Tool"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Start the game from the Switch menu, but do not enter into the continue screen yet."}),`
`,e.jsxs(n.li,{children:["Input the 4 current states from CaptureSight into the 4 current state boxes.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["To keep the current states from changing while doing this, you can press ",e.jsx(n.code,{children:"A"})," to pause CaptureSight from updating the states, though this should not be necessary if doing this at the intro screen."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Input the correct delay for the Pokemon you are RNGing.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"See below for the delays needed."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:'Check the "Set IVs" box if going for a Pokemon with 3 set IVs.'}),`
`,e.jsxs(n.li,{children:["Adjust the filters to the Pokemon wanted.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'If going for a genderless Pokemon make sure to choose "Genderless" in the "Gender" box.'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Generate results and find a target advance.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"If there are no results, try lowering the filters, or increasing the max advances."}),`
`,e.jsx(n.li,{children:"Keep in mind that the higher the advance is, the longer the wait to reach the target advance."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: CaptureSight keeps track of how many times the RNG has advanced since opening the overlay. Should you back out of the Main RNG window, or close the overlay, this will reset the advance counter. In the case of this happening, input the new current states to adjust for the new target advances.
`})}),`
`,e.jsx(n.h2,{children:"Step 2: Obtaining the wanted Pokemon"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["If going for a high advance, you can advance the RNG faster before entering the final screen.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["See the ",e.jsx(n.a,{href:"https://www.pokemonrng.com/bdsp-advance-rng",children:"Advancing the RNG guide"})," for the different ways the RNG can be advanced to reach a target advance."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["When nearing the target advance, enter into the final screen or final input.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"See below for the final screens and delays needed."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Wait for the target advance to show, then press ",e.jsx(n.code,{children:"A"})," to obtain Pokemon or begin the battle on the target advance."]}),`
`]}),`
`,e.jsx(n.p,{children:"Congrats! You should now have the Pokemon you wanted. If not, you can reset the game and try again."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: We're looking for more delays and the last screen (or the last input before the game generates a spread) for these Pokemon. Don't hesitate to open an issue on Github, or send a message on the Discord with any delay and information based on the Chatot site.
`})}),`
`,e.jsx(n.h2,{children:"Delays and Final Screens"}),`
`,e.jsx(n.h3,{children:"Starters"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Delay: 64"}),`
`,e.jsx(n.li,{children:'Generation: "Yes" when selecting the Pokemon from the briefcase.'}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Make sure to save before entering the lake area. There is a cutscene that will advance the RNG around 300 times, so keep that in mind when waiting for a target advance.
`})}),`
`,e.jsx(n.h3,{children:"Rotom"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Delay: 90"}),`
`,e.jsx(n.li,{children:'Generation: "You thumped the TV Set."'}),`
`,e.jsx(n.li,{children:"Genderless"}),`
`]}),`
`,e.jsx(n.h3,{children:"Eevee"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Delay: 0"}),`
`,e.jsx(n.li,{children:'Generation: "You obtained an Eevee!"'}),`
`]}),`
`,e.jsx(n.h3,{children:"Dialga/Palkia"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Delay: 84"}),`
`,e.jsxs(n.li,{children:["Generation: After text, on the second ",e.jsx(n.code,{children:"A"})," press to start the battle."]}),`
`,e.jsx(n.li,{children:"Genderless and 3 set IVs"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Brilliant-Diamond-Shining-Pearl/Stationary/palkia.png",alt:"Palkia"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Doing this RNG post E4 is easier because it is quieter. For that, knock out Dialga/Palkia the first time you encounter them, and then beat the Elite 4 to have them respawn.
`})}),`
`,e.jsx(n.h3,{children:"Giratina"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Delay: 84"}),`
`,e.jsx(n.li,{children:'Final Screen: "Bishaaan!"'}),`
`,e.jsx(n.li,{children:"Genderless and 3 set IVs"}),`
`]}),`
`,e.jsx(n.h3,{children:"Heatran"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Delay: 84"}),`
`,e.jsx(n.li,{children:'Generation: "Gwogbogogo..."'}),`
`,e.jsx(n.li,{children:"Set gender and 3 set IVs"}),`
`]}),`
`,e.jsx(n.h3,{children:"Regigigas"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Delay: 84"}),`
`,e.jsx(n.li,{children:'Generation: "Zut Zutt!"'}),`
`,e.jsx(n.li,{children:"Genderless and 3 set IVs"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Due to player blinking, the delay can be off. In general you'll have a +1 or +2 delay. It's really important to test and see how it goes. These delays are based on breakpoints values, so user experience might be a little different. Practice to see how your delay goes.
`})}),`
`,e.jsx(n.h3,{children:"Ramanas Park"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Delay: 84"}),`
`,e.jsx(n.li,{children:"Final Screen: Dialog Box"}),`
`,e.jsx(n.li,{children:"Some will be Genderless, all have 3 set IVs"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Warning: Don't forget to select the Roamers method for Mesprit and Cresselia"})}),`
`,e.jsx(n.h3,{children:"Mesprit"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Delay: 84"}),`
`,e.jsx(n.li,{children:'Generation: "Kyauun."'}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Due to player blinking, the delay can be off. In general you'll have a +1 or +2 delay. It's really important to test and see how it goes. These delays are based on breakpoints values, so user experience might be a little different. Practice to see how your delay goes.
`})}),`
`,e.jsx(n.h3,{children:"Cresselia"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Delay: 103 / 104"}),`
`,e.jsxs(n.li,{children:["Generation: Press ",e.jsx(n.code,{children:"A"})," in front of her"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: Due to player blinking, the delay can be off. In general you'll have a +1 or +2 delay. It's really important to test and see how it goes. These delays are based on breakpoints values, so user experience might be a little different. Practice to see how your delay goes.
`})}),`
`,e.jsxs(n.p,{children:["PokeFinder supports Mystery Gift Generation. Download the right event information ",e.jsx(n.a,{href:"https://projectpokemon.org/home/files/category/203-generation-8/",children:"here"})," and load it with PokeFinder to have accurate results."]}),`
`,e.jsx(n.h3,{children:"Mystery Gift"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Delay: 0"}),`
`,e.jsx(n.li,{children:"Final Screen: The moment when you SELECT the event in the menu where you can chose what to claim."}),`
`,e.jsx(n.li,{children:"Some are Genderless and some have 3 set IVs. Check the Wondercard info for this."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Note: It is recommended to RNG the Mystery Gift in the upstairs of the player's house for slower RNG advances.
`})})]})}function l(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{l as default,a as frontmatter};
