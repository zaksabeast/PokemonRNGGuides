import{ig as s,j as n}from"./index-czKEJam6.js";const h={title:"《究极之日／究极之月》究极之洞乱数",description:"在《究极之日／究极之月》中，对究极之洞内出现的传说宝可梦进行乱数，以获得理想的个体值、性格与异色。",slug:"zh-retail-usum-wormhole",translation:{enSlug:"retail-usum-wormhole",language:"zh"}};function r(l){const e={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...s(),...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"Tools"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/zh-install-pokereader",children:"安装了 PokeReader 的 3DS"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/releases",children:"3DSRNGTool"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://github.com/wwwwwwzx/3DSRNGTool/blob/master/README.md#final-screen",children:"3DSRNGTool README（最终画面一览）"})}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：本方法适用于究极之洞中出现的所有宝可梦，包括究极异兽。
`})}),`
`,n.jsx(e.h2,{children:"步骤 1：确认初始 Seed"}),`
`,n.jsxs(e.p,{children:["初始 Seed 会显示在 PokeReader 叠加界面顶部的「Init Seed:」下方。例如：",n.jsx(e.code,{children:"5DA5CA91"}),"。"]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/UltraSun-UltraMoon/Wormhole/Setup.png",alt:"Setup"})}),`
`,n.jsx(e.h2,{children:"步骤 2：制作时间线并寻找目标帧数"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：在向前移动以触发遭遇时，请精确操作摇杆。始终朝同一方向移动，以保证结果稳定。
`})}),`
`,n.jsx(e.p,{children:"究极之洞乱数有两种方法。"}),`
`,n.jsx(e.h3,{children:"方法一：带角色小动作的基础时间线"}),`
`,n.jsx(e.p,{children:"该方法通过制作时间线来考虑角色的小动作。缺点是可用帧数会受到时间线长度限制。"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["按照",n.jsx(e.a,{href:"/retail-usum-fidget",children:"带小动作的时间线指南"}),"制作时间线并寻找目标帧数。"]}),`
`]}),`
`,n.jsx(e.h3,{children:"方法二：时间线跳跃（Time Leap）"}),`
`,n.jsx(e.p,{children:"该方法先寻找目标帧数，然后“跳跃”到对应时间线。优点是不受时间线限制，可以命中任意帧数。你也可以使用圆庆广场来更快地推进帧数，从而减少等待时间。"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["按照",n.jsx(e.a,{href:"/zh-retail-usum-timeleap",children:"时间线跳跃指南"}),"寻找目标帧数并跳跃至该帧。"]}),`
`]}),`
`,n.jsx(e.h2,{children:"步骤 3：命中目标帧数"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"在筛选条件中输入你想要的结果，然后点击「计算」以搜索目标帧数。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/UltraSun-UltraMoon/Wormhole/Target.jpg",alt:"Target"})}),`
`,n.jsxs(e.ol,{start:"2",children:[`
`,n.jsx(e.li,{children:"推进帧数至接近目标帧数后暂停游戏。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/UltraSun-UltraMoon/Wormhole/Final-Screen.png",alt:"Final screen"})}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsxs(e.li,{children:["到达目标帧数时，触发遭遇。究极异兽：直接按下 ",n.jsx(e.code,{children:"A"}),"。传说宝可梦：向前推动摇杆。请尽量在最接近触发点的位置存档。"]}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/UltraSun-UltraMoon/Wormhole/Final-Screen-2.png",alt:"Final Screen 2"})}),`
`,n.jsxs(e.ol,{start:"4",children:[`
`,n.jsxs(e.li,{children:["成功了吗？？？",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"并没有。"}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/UltraSun-UltraMoon/Wormhole/Calibration.png",alt:"Calibration"})}),`
`,n.jsx(e.h3,{children:"那么，发生了什么？"}),`
`,n.jsx(e.p,{children:"这是正常现象。 每一台 3DS、每一个存档都有各自的延迟值。所谓「延迟」，指的是从你触发遭遇到宝可梦真正生成之间所经过的帧数。接下来我们来找出你的延迟值。"}),`
`,n.jsx(e.h2,{children:"步骤 4：测定延迟并命中它"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"使用你实际遇到的宝可梦的个体值、性格与 PSV，反推你实际命中的帧数。例如：目标帧数为 4973，则实际命中 4969（-4）。则你相对于 3DSRNGTool 默认设置命中的延迟为 -4（即 152）。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/UltraSun-UltraMoon/Wormhole/Result.jpg",alt:"Result"})}),`
`,n.jsxs(e.ol,{start:"2",children:[`
`,n.jsx(e.li,{children:"使用随机目标重复此过程，统计你最常命中的帧数偏差。将出现频率最高的数值填写到「考虑延迟」中，并观察结果变化。"}),`
`]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"请在确认一个稳定的延迟值之前不要急于修改。根据情况，可能需要尝试 10～20 次甚至更多。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/UltraSun-UltraMoon/Wormhole/Delay.jpg",alt:"Delay"})}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsx(e.li,{children:"当你找到一个稳定的延迟值后，将其固定输入，然后挑战更严格的目标。例如，下图是在确认延迟为 152 后命中的异色固拉多。需要注意的是，由于传说宝可梦的触发需要向前走一步，相比究极异兽，变量更多，稳定性也更差。"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/UltraSun-UltraMoon/Wormhole/Success.png",alt:"Success"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`注意：你可以前往慷待市的 GAME FREAK 大楼，与里面的以太基金会员工对话，在体感操作与摇杆操作之间进行切换。
`})}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"/images/UltraSun-UltraMoon/Wormhole/Screenshot-wormhole-controls.png",alt:"Ather"})}),`
`,n.jsx(e.h2,{children:"特别鸣谢"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"中文翻译：炫夜鳞、白希洛/Hakuhiro"}),`
`]})]})}function c(l={}){const{wrapper:e}={...s(),...l.components};return e?n.jsx(e,{...l,children:n.jsx(r,{...l})}):r(l)}export{c as default,h as frontmatter};
