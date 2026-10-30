import{t as e}from"./jsx-runtime-Bl9_0yti.js";import{S as t}from"./index-9x-tX0ur.js";var n=e(),r={title:`剑/盾极巨团体战乱数`,navDrawerTitle:`团体战乱数`,description:`学习在剑/盾的巢穴中进行团体战乱数，包括超极巨化宝可梦。`,slug:`zh-retail-swsh-raid`,translation:{enSlug:`retail-swsh-raid`,language:`zh`}};function i(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`所需工具`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`}),` 或 `,(0,n.jsx)(r.a,{href:`https://leanny.github.io/seedchecker/index.html`,children:`Leanny 的移动版种子查询器`})]}),`
`,(0,n.jsxs)(r.li,{children:[`可选，通过自制固件查找种子：`,(0,n.jsx)(r.a,{href:`https://github.com/Leanny/PKHeX_Raid_Plugin`,children:`Leanny 的 PKHeX 团体战插件`}),` 或 `,(0,n.jsx)(r.a,{href:`https://github.com/zaksabeast/CaptureSight/releases`,children:`Zaksabeast 的 CaptureSight`})]}),`
`,(0,n.jsxs)(r.li,{children:[`可选，通过自制固件自动推进：`,(0,n.jsx)(r.a,{href:`https://github.com/3096/luxray/releases/tag/0.1.0`,children:`Luxray`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`基础说明`}),`
`,(0,n.jsxs)(r.p,{children:[`闪耀护符`,(0,n.jsx)(r.strong,{children:`不会`}),`影响团体战的异色概率。`]}),`
`,(0,n.jsx)(r.h2,{children:`第一步：获取团体战种子`}),`
`,(0,n.jsx)(r.p,{children:`选择以下一种方式获取种子：`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`/retail-swsh-get-seed-with-cfw`,children:`使用自制固件查找团体战种子`}),`。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`/retail-swsh-get-seed-without-cfw`,children:`无需自制固件查找团体战种子`}),`。`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第二步：寻找目标宝可梦`}),`
`,(0,n.jsx)(r.p,{children:`获得目标巢穴的种子后，使用 PokeFinder 或移动版种子查询器搜索结果。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`选择目标巢穴及其稀有度。`}),`
`,(0,n.jsx)(r.li,{children:`根据想要的能力值或是否异色，设置筛选条件。`}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`NOTE`,children:[`
`,(0,n.jsx)(r.p,{children:`PKHeX 团体战插件将当前宝可梦记为推进数 0，而 PokeFinder 将其记为推进数 1。`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`第三步：推进乱数`}),`
`,(0,n.jsx)(r.p,{children:`可以使用以下方式：`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`逐日推进`}),`：没有 Nintendo Switch Online，也没有朋友的 Switch 时使用。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`对战漏洞`}),`：有 Nintendo Switch Online，或有朋友的 Switch 时使用。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Luxray`}),`：仅限自制固件使用的自动推进工具。`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Arduino`}),`：通过硬件自动推进。本指南不展开介绍，可参考`,(0,n.jsx)(r.a,{href:`https://github.com/nnguy132/Switch-Frame-Advancer`,children:`此推进工具`}),`。`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`过程中随时可以重新检查种子，确认是否出现操作偏差。检查当前推进数的方法与第一步获取种子时相同。`}),`
`,(0,n.jsx)(r.h3,{children:`方法三 A：逐日推进`}),`
`,(0,n.jsx)(r.p,{children:`没有在线服务或第二台 Switch 时，可以使用此方法。`}),`
`,(0,n.jsx)(r.p,{children:`Switch 必须处于本地通信模式，不能使用飞行模式。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`与巢穴互动，选择“大家一起挑战”。`}),`
`,(0,n.jsxs)(r.li,{children:[`搜索队友期间按下 `,(0,n.jsx)(r.code,{children:`Home`}),`。`]}),`
`,(0,n.jsx)(r.li,{children:`打开“设置”中的“日期与时间”。`}),`
`,(0,n.jsx)(r.li,{children:`将日期向后增加 1 天，点击“OK”。`}),`
`,(0,n.jsx)(r.li,{children:`返回游戏，取消搜索。`}),`
`,(0,n.jsx)(r.li,{children:`退出团体战界面。巢穴应重新发出红光，说明乱数已推进 1 次。`}),`
`,(0,n.jsx)(r.li,{children:`重复操作，直到距离目标还有 3 次推进。`}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`NOTE`,children:[`
`,(0,n.jsx)(r.p,{children:`每次向后调整日期只能推进一次，调回更早的日期不会推进。月末需要同时调整月份与日期，避免时间倒退。`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`方法三 B：对战漏洞`}),`
`,(0,n.jsx)(r.p,{children:`请在宝可梦中心内进行此操作，其他地点可能导致游戏崩溃。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`将 Switch 联网，进入 VS 菜单。`}),`
`,(0,n.jsx)(r.li,{children:`开始对战，让游戏搜索其他玩家。`}),`
`,(0,n.jsxs)(r.li,{children:[`找到玩家的瞬间，按住 `,(0,n.jsx)(r.code,{children:`Home`}),` 开启飞行模式。操作成功后会出现连接错误。`]}),`
`,(0,n.jsx)(r.li,{children:`在 Switch 设置中打开“日期与时间”。`}),`
`,(0,n.jsx)(r.li,{children:`将日期向后增加 1 天，点击“OK”。`}),`
`,(0,n.jsxs)(r.li,{children:[`重复第 5 步，直到距离目标宝可梦还有 3 次推进。`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`部分玩家会遇到实际推进数超出预期的情况，建议经常检查种子。`}),`
`,(0,n.jsx)(r.li,{children:`检查当前推进数的方法与第一步获取种子时相同。`}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`NOTE`,children:[`
`,(0,n.jsx)(r.p,{children:`调回更早的日期不会推进乱数，月末需要同时调整月份与日期。`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`方法三 C：Luxray`}),`
`,(0,n.jsx)(r.p,{children:`请在宝可梦中心内进行此操作，其他地点可能导致游戏崩溃。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`将日期与时间设置为使用服务器时间。`}),`
`,(0,n.jsx)(r.li,{children:`在浮层菜单中设置需要推进的次数。`}),`
`,(0,n.jsx)(r.li,{children:`点击“Step”，让 Luxray 自动推进。`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Luxray 会修改内部服务器时间，也可以用它修正 Switch 时钟。`}),`
`,(0,n.jsx)(r.h2,{children:`第四步：重置以获得目标宝可梦`}),`
`,(0,n.jsx)(r.p,{children:`当前团体战及接下来两次推进的出场宝可梦已经固定，但第 3 次推进后的种类尚未固定，可以通过重置获得目标宝可梦。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`推进到距离目标还有 3 次的位置。`}),`
`,(0,n.jsx)(r.li,{children:`保存游戏。`}),`
`,(0,n.jsx)(r.li,{children:`推进 3 次。`}),`
`,(0,n.jsx)(r.li,{children:`开始团体战，检查是否为目标宝可梦。`}),`
`,(0,n.jsx)(r.li,{children:`如果不是，重置游戏后重新尝试。`}),`
`]}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`推进数`}),(0,n.jsx)(r.th,{children:`宝可梦`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`0`}),(0,n.jsx)(r.td,{children:`当前结果`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`1`}),(0,n.jsx)(r.td,{children:`不是目标`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`2`}),(0,n.jsx)(r.td,{children:`不是目标`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`3`}),(0,n.jsx)(r.td,{children:`✅ 目标宝可梦，种类随机确定`})]})]})]}),`
`,(0,n.jsx)(r.h2,{children:`自然巢穴乱数`}),`
`,(0,n.jsx)(r.p,{children:`每个巢穴都有独立的种子。即使巢穴没有激活，也会随日期逐日推进，而且每次操作会同时推进所有巢穴。`}),`
`,(0,n.jsx)(r.p,{children:`多数玩家会不断投入许愿星块，重置指定巢穴的种子，直到找到理想结果。不过，也可以直接利用各巢穴原有的种子获得异色宝可梦。`}),`
`,(0,n.jsx)(r.p,{children:`重置种子通常是为了在指定巢穴获得理想的性格、异色、个体值等条件。自然巢穴乱数则是从现有种子中挑选，因此对属性和出场种类的控制较少，只推荐用于快速获取异色宝可梦。`}),`
`,(0,n.jsx)(r.p,{children:`此方法可以同时对所有巢穴进行乱数，比只盯着一个巢穴更快。`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`使用 CaptureSight 的“all den view”，或 PKHeX 团体战插件，寻找距离异色较近的巢穴。`}),`
`,(0,n.jsx)(r.li,{children:`推进到距离异色团体战还有 3 次的位置。`}),`
`,(0,n.jsx)(r.li,{children:`保存游戏。`}),`
`,(0,n.jsx)(r.li,{children:`推进 3 天，检查目标巢穴是否出现红色光柱。`}),`
`,(0,n.jsx)(r.li,{children:`如果没有，重置游戏后重试，直到该巢穴激活。`}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`TIP`,children:[`
`,(0,n.jsx)(r.p,{children:`可以在任意巢穴投入许愿星块，用该巢穴进行日期推进，省去来回移动的时间。投入星块的巢穴本身也可能有可用的乱数结果！`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`特别鸣谢`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`中文翻译：白希洛/Hakuhiro`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};