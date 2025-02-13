import{u as t,j as n}from"./index-Chr4tes4.js";const r={title:"How to Install PCalc",description:"Installing a tool on your 3DS to help RNG Pokemon",slug:"misc-3ds-installing-pcalc",subCategory:"3DS"};function s(o){const e={a:"a",br:"br",code:"code",em:"em",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"Tools"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["A 3DS with CFW (Custom Firmware). Check out ",n.jsx(e.a,{href:"https://3ds.hacks.guide/",children:"https://3ds.hacks.guide/"})," for instructions on installing CFW."]}),`
`]}),`
`,n.jsx(e.h2,{children:"Update Luma"}),`
`,n.jsx(e.p,{children:"Ensure your installed version of Luma3ds is 13.0 or later. Older versions aren't compatible with NTR."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"https://github.com/LumaTeam/Luma3DS/releases",children:"Download Luma3ds"}),".",n.jsx(e.br,{}),`
`,"Download the ",n.jsx(e.code,{children:"boot.firm"})," and overwrite the current ",n.jsx(e.code,{children:"boot.firm"})," on the root of the SD card."]}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 1: Installing NTR"}),`
`,n.jsxs(e.p,{children:["First, install NTR by getting ",n.jsx(e.a,{href:"https://github.com/Nanquitas/BootNTR/releases",children:"BootNTR Selector"}),"."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"N3DS and N2DSXL:"})," Download and install BootNTR Selector.",n.jsx(e.br,{}),`
`,"Download either of the CIAs that are ",n.jsx(e.em,{children:"not"})," Mode 3 and copy it to the SD card, then install using FBI."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"O3DS and O2DS:"})," Download and install ",n.jsx(e.em,{children:"BOTH"})," BootNTR Selector and BootNTR Selector Mode 3.",n.jsx(e.br,{}),`
`,"Mode 3 is for Ultra Sun/Ultra Moon and Sun/Moon ONLY. Download one Mode 3 CIA and one regular CIA. Copy both CIAs to the SD card and install using FBI."]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:"To install a CIA using FBI, launch FBI on the console, then navigate to the CIA file on the SD card and press `A` on it to install.\n"})}),`
`,n.jsx(e.p,{children:"Launch BootNTR Selector and choose default for settings."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Version 3.6 (replacing 3.4 and 3.5) is the only version that works for plugins, so choose it every time you boot NTR."}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"For O3DS and O2DS only:"})," Then launch BootNTR Selector Mode 3 and repeat the steps above."]}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 2: Installing PCalc"}),`
`,n.jsx(e.p,{children:"After installing NTR, the next step is to install the PCalc plugin."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/downloads/pcalc/pcalc-usum.zip",children:"Ultra Sun/Ultra Moon"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/downloads/pcalc/pcalc-sm.zip",children:"Sun/Moon"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/downloads/pcalc/pcalc-oras.zip",children:"OR/AS"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/downloads/pcalc/pcalc-xy.zip",children:"X/Y"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/downloads/pcalc/pcalc-tport.zip",children:"Transporter"})}),`
`]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Download the .zip for the version you want and unzip its contents."}),`
`,n.jsx(e.li,{children:"Move the plugin folder from the zip to the root of the SD card. Merge and overwrite contents if prompted."}),`
`,n.jsxs(e.li,{children:["You should now have a ",n.jsx(e.code,{children:"Plugin"})," folder on the root of the SD card and two/four/six/eight folders inside it (depends on which PCalcs you downloaded) with a ",n.jsx(e.code,{children:"cheat.plg"})," in each."]}),`
`]}),`
`,n.jsx(e.h2,{children:"Step 3: Launching PCalc"}),`
`,n.jsx(e.p,{children:"Launch BootNTR Selector and then the application of your choice."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"O3DS and O2DS Only:"})," Launch BootNTR Selector Mode 3 for Ultra Sun/Ultra Moon and Sun/Moon ONLY.",n.jsx(e.br,{}),`
`,"Press the home button to return to the home screen, then launch Ultra Sun/Ultra Moon or Sun/Moon. Mode 3 should close ONLY when prompted to launch the game."]}),`
`]}),`
`,n.jsx(e.p,{children:"If the screen flashes green, congrats, you did it!"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:"The PCalc Menu can be opened by pressing `X` + `Up` on the D-pad.\n\nThe NTR Menu can be opened by pressing `X` + `Y`. This is useful for taking screenshots; all screenshots are saved to the root of the SD card as .bmp files.\n"})}),`
`,n.jsx(e.h2,{children:"Troubleshooting"}),`
`,n.jsx(e.p,{children:"If you updated to 3DS version 11.15 and NTR isn’t working, make sure you have the latest BootNTR Selector and/or BootNTR Selector Mode 3, and a compatible Luma version for NTR."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Hold ",n.jsx(e.code,{children:"X"})," while launching to update easily."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"O3DS and O2DS:"})," Update BOTH versions of BootNTR Selector."]}),`
`,n.jsx(e.li,{children:"Check the section at the beginning of this guide for updating Luma for NTR."}),`
`]}),`
`,n.jsxs(e.p,{children:["If using Ultra Sun/Ultra Moon or Sun/Moon and PCalc displays ",n.jsx(e.code,{children:"Init Seed"})," as 0:"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["You are missing the v1.2 update for Sun and Moon or the v1.2 update for Ultra Sun and Ultra Moon.",n.jsx(e.br,{}),`
`,"This can be downloaded from the Eshop or extracted from another console using CFW."]}),`
`]}),`
`,n.jsx(e.p,{children:"If using XY/ORAS and PCalc isn't working:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Ensure you have the latest update for the game.",n.jsx(e.br,{}),`
`,"XY is 1.5, ORAS is 1.4. The game version can be found at the continue screen.",n.jsx(e.br,{}),`
`,"The update can be downloaded from the Eshop or extracted from another console using CFW."]}),`
`]}),`
`,n.jsx(e.p,{children:"If the game is updated to the latest version and PCalc and/or NTR isn't loading:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Delete all NTR related files on the SD card.",n.jsx(e.br,{}),`
`,"Delete any NTR.bin files on the root of the SD card.",n.jsx(e.br,{}),`
`,"Delete these folders and their contents:",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"SD:/Nintendo 3DS/EBNTR/"}),`
`,n.jsx(e.li,{children:"SD:/3ds/ntr/"}),`
`,n.jsx(e.li,{children:"SD:/3ds/BootNTRSelector/"}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:"Redownload the necessary NTR files by launching BootNTR Selector and BootNTRSelector Mode 3."}),`
`]}),`
`,n.jsx(e.p,{children:"About Pokemon Gen 6/7 Game Updates:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"If you have a firmware region changed console or emunand, this can be obtained from other sources, such as dumping your update from another console, emunand, or sysnand."}),`
`,n.jsx(e.li,{children:"Pokemon game updates are not region locked."}),`
`,n.jsx(e.li,{children:"Cartridge and digital updates are stored on the SD card and are console/emunand specific, so they must be installed on the console/emunand you are using the game with."}),`
`]})]})}function i(o={}){const{wrapper:e}={...t(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(s,{...o})}):s(o)}export{i as default,r as frontmatter};
