import{u as h,j as e}from"./index-Dadzxr1q.js";const a=[{title:"Initial Seed RNG",description:"How to RNG an initial seed in Diamond, Pearl, and Platinum",slug:"dppt-initial-seed",category:"Diamond, Pearl, and Platinum",tag:"emu"},{title:"初始种子乱数",description:"如何在《钻石, 珍珠, 白金》中进行初始种子乱数",slug:"zh-dppt-initial-seed",category:"Diamond, Pearl, and Platinum",tag:"emu",hideFromNavDrawer:!0}];function t(i){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...h(),...i.components},{LanguageButton:l,ShowIf:s}=n;return l||r("LanguageButton"),s||r("ShowIf"),e.jsxs(e.Fragment,{children:[e.jsx(l,{enSlug:"/dppt-initial-seed",zhSlug:"/zh-dppt-initial-seed"}),`
`,e.jsxs(s,{slug:"/dppt-initial-seed",children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`This guide assumes you have found a target seed already. You need your target seed and delay before following this guide.
`})}),e.jsx(n.h2,{children:"Tools"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.nirsoft.net/utils/run_as_date.html",children:"RunAsDate"})}),`
`]}),e.jsx(n.h3,{children:"What is RunAsDate?"}),e.jsx(n.p,{children:"RunAsDate is a tool that allows any program to load with a set time you specify. This tool is useful for Gen 4 RNG and helps hit your seed easier."}),e.jsx(n.h2,{children:"Setup RunAsDate"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Launch RunAsDate."}),`
`,e.jsx(n.li,{children:"Configure RunAsDate to match the image below."}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/Initial-Seed/Setup.png",alt:"Setup"})}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`You'll never have to change that after. This is the universal RunAsDate configuration for RNG (Gen 3, 4 or 5).
`})}),e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["Select the program you want to fake the date/time with the ",e.jsx(n.code,{children:"Browse..."})," button."]}),`
`,e.jsxs(n.li,{children:["Set the date and time to hit your seed as shown in PokeFinder.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Right click on the chosen seed and choose "Generate times for seed".'}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Hit ",e.jsx(n.code,{children:"Run"})," to launch Desmume."]}),`
`]}),e.jsx(n.h2,{children:"Hitting the target seed"}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`Make save states often during this process.
`})}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load the lua script."}),`
`,e.jsxs(n.li,{children:["Click ",e.jsx(n.code,{children:"A"}),' to reach the "Continue" screen quickly.']}),`
`,e.jsxs(n.li,{children:["Pause your emulator using ",e.jsx(n.code,{children:"Ctrl + P"}),"."]}),`
`,e.jsx(n.li,{children:"Make plenty of save states."}),`
`,e.jsx(n.li,{children:"Unpause your game and let it run until close to your target delay."}),`
`,e.jsx(n.li,{children:"When close, pause your emulator."}),`
`,e.jsx(n.li,{children:"Create another save state."}),`
`,e.jsxs(n.li,{children:["Press ",e.jsx(n.code,{children:"N"})," to advance the game one video frame to increase the delay."]}),`
`,e.jsxs(n.li,{children:["When you reach the target delay, hold ",e.jsx(n.code,{children:"A"})," while unpausing."]}),`
`]}),e.jsx(n.h2,{children:"Troubleshooting"}),e.jsxs(n.p,{children:["If you notice that you are pressing ",e.jsx(n.code,{children:"A"})," at the right delay but hitting a different delay by +/-1, this can happen due to Gen 4 delays being always odd or always even. You can switch delays from even to odd or vice versa with the following methods:"]}),e.jsx(n.h3,{children:"Changing the year"}),e.jsx(n.p,{children:'Close your emulator, then change the year in RunAsDate to one year before or after your current year. This will change the delay as well. Verify your new delay in PokeFinder in the "Seed to Time" window. Relaunch Desmume with RunAsDate and load a save state to RNG for the new delay.'}),e.jsx(n.h3,{children:"Load a GBA game"}),e.jsx(n.p,{children:"Load a GBA game into the GBA slot in the emulator to switch the delay from even to odd, or vice versa."}),e.jsx(n.h3,{children:"Continue Screen"}),e.jsxs(n.p,{children:['Choose "New Game", then press ',e.jsx(n.code,{children:"B"})," to cancel and go back to the continue screen, which will switch the delay from even to odd, or vice versa."]}),e.jsx(n.h2,{children:"Credits"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`]})]}),`
`,e.jsxs(s,{slug:"/zh-dppt-initial-seed",children:[e.jsx(n.pre,{children:e.jsx(n.code,{children:`本指南假设你已经找到目标种子，在进行本教程前你需要知道目标种子和目标延迟。
`})}),e.jsx(n.h2,{children:"Tools"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.nirsoft.net/utils/run_as_date.html",children:"RunAsDate"})}),`
`]}),e.jsx(n.h3,{children:"什么是 RunAsDate?"}),e.jsx(n.p,{children:"RunAsDate 是一个让程序以指定时间启动的工具，适用于第四世代乱数，它可以让你精准地命中种子。"}),e.jsx(n.h2,{children:"设置 RunAsDate"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"打开 RunAsDate。"}),`
`,e.jsx(n.li,{children:"按照下图进行配置。"}),`
`]}),e.jsx(n.p,{children:e.jsx(n.img,{src:"/images/Diamond-Pearl-Platinum/Initial-Seed/Setup.png",alt:"Setup"})}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`该配置适用于 Gen 3、Gen 4 和 Gen 5 乱数，不需要更改。
`})}),e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"点击 Browse... 选择Desmume。"}),`
`,e.jsxs(n.li,{children:["设置日期和时间，与 PokeFinder 显示的目标时间一致。",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'右键点击目标种子，选择 "为seed生成时间" 来获得具体时间。'}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"点击 Run 以目标时间启动 Desmume。"}),`
`]}),e.jsx(n.h2,{children:"命中目标种子"}),e.jsx(n.pre,{children:e.jsx(n.code,{children:`在整个过程中经常进行即时保存，以防出错。
`})}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"加载 Lua 脚本（用于实时查看当前种子）。"}),`
`,e.jsx(n.li,{children:'快速点击 A 进入 "继续" 屏幕。'}),`
`,e.jsx(n.li,{children:"使用 Ctrl + P 暂停模拟器。"}),`
`,e.jsx(n.li,{children:"创建多个即时存档点。"}),`
`,e.jsx(n.li,{children:"取消暂停，让游戏运行，接近目标延迟。"}),`
`,e.jsx(n.li,{children:"接近目标延迟时，暂停模拟器。"}),`
`,e.jsx(n.li,{children:"创建一个新的即时存档点。"}),`
`,e.jsx(n.li,{children:"按 N 逐帧推进游戏，以精准调整延迟。"}),`
`,e.jsx(n.li,{children:"达到目标延迟时，按住 A 并取消暂停。"}),`
`]}),e.jsx(n.h2,{children:"问题排查"}),e.jsx(n.p,{children:"如果你 按 A 进入游戏的时机正确，但命中的延迟 偏差 ±1，可能是由于 Gen 4 的 Delay 只会是奇数或偶数。你可以通过以下方法切换奇数 / 偶数延迟："}),e.jsx(n.h3,{children:"修改年份"}),e.jsx(n.p,{children:'关闭模拟器，在 PokeFinder 的 "Seed to Time" 窗口中将年份调早或调晚一年并生成确认新延迟，修改RunAsDate 的年份时间，重新启动 Desmume ，使用新的延迟进行乱数。'}),e.jsx(n.h3,{children:"加载 GBA 游戏"}),e.jsx(n.p,{children:"在 Desmume 的 GBA 插槽中加载任意 GBA 游戏，可以切换 Delay 奇偶性。"}),e.jsx(n.h3,{children:"利用“继续游戏”画面"}),e.jsx(n.p,{children:"选择从头开始游戏，按 B 取消，返回继续游戏界面。这样可以切换当前延迟的奇偶性，再尝试乱数。"}),e.jsx(n.h2,{children:"特别鸣谢"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"中文翻译：炫夜鳞、Hakuhiro/白白不是公主。"}),`
`]})]})]})}function o(i={}){const{wrapper:n}={...h(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}function r(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{o as default,a as frontmatter};
