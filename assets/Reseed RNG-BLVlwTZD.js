import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-BiAAUMAS.js";var n=e(),r=[{title:`RNG-Reseed mit Gemälden`,navDrawerTitle:`Gemälde RNG`,description:`Lerne, wie du den RNG in Pokémon Smaragd mithilfe von Gemälden reseedest, um dein Wunsch-Pokémon ohne lange Wartezeiten zu erhalten.`,slug:`de-emerald-painting-rng`,translation:{enSlug:`emerald-painting-rng`,language:`de`}}];function i(e){let r={a:`a`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,ul:`ul`,...t(),...e.components},{PaintingSeedToEmuTimer:i,YouTubeVideo:a}=r;return i||o(`PaintingSeedToEmuTimer`,!0),a||o(`YouTubeVideo`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA mit Lua-Skripten`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/pokefinder`,children:`PokeFinder`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Video-Guide`}),`
`,(0,n.jsx)(a,{id:`ydS9HLNmAog`}),`
`,(0,n.jsx)(r.h2,{children:`Intro`}),`
`,(0,n.jsx)(r.p,{children:`Das Reseeden des RNG durch das Betrachten von Gemälden ermöglicht es dir, lange Wartezeiten auf hohe Advances zu vermeiden. Normalerweise startet der RNG mit einer festgeschriebenen Zahl und generiert jedes Mal dieselben Zufallszahlen.`}),`
`,(0,n.jsx)(r.p,{children:`Indem du ein Gemälde im Spiel betrachtest, wie zum Beispiel die in der Wettbewerbshalle von Seegrasulb City, wird der RNG basierend auf dem Video-Frame-Counter reseeded.`}),`
`,(0,n.jsx)(r.p,{children:`Diese Methode kann mit Kampfvideos kombiniert werden, um den neuen RNG-Zustand nach dem Betrachten des Gemäldes zu speichern.`}),`
`,(0,n.jsx)(r.p,{children:`Du kannst diese Methode auch für Rubin und Saphir verwenden, unabhängig davon, ob die interne Batterie noch funktioniert oder leer ist.`}),`
`,(0,n.jsx)(r.h2,{children:`Setup`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Suche dir eine Target Seed mit dem PokeFinder.`}),`
`,(0,n.jsx)(r.li,{children:`Klicke mit der rechten Maustaste auf die gewählte Seed im PokeFinder und wähle "Generate times for seed".`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Gemälde RNG`}),`
`,(0,n.jsx)(i,{}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Gib deine Target Seed in das obige Tool ein, um deinen "Target Painting Timer" zu finden.`}),`
`,(0,n.jsx)(r.li,{children:`Warte im Spiel, bis der vom Lua-Skript angezeigte Painting Timer dem Target Painting Timer entspricht. Öffne dabei das Pokémon-Menü, um zu verhindern, dass NPCs den RNG beeinflussen.`}),`
`,(0,n.jsx)(r.li,{children:`Betrachte das Gemälde genau bei dieser Zahl, um den RNG auf die gewünschte Seed zu reseeden.`}),`
`,(0,n.jsx)(r.li,{children:`Nutze die Anzahl der Advances, die im PokeFinder unter "Seed to Time" angezeigt werden, um den RNG-Vorgang wie gewohnt abzuschließen.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Chinesische Übersetzung: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`Deutsche Übersetzung: Parasite.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};