import{w as l,j as e}from"./index-BmhIYDEc.js";const o=[{title:"RNG-Reseed mit Gemälden",navDrawerTitle:"Gemälde RNG",description:"Lerne, wie du den RNG in Pokémon Smaragd mithilfe von Gemälden reseedest, um dein Wunsch-Pokémon ohne lange Wartezeiten zu erhalten.",slug:"de-emerald-painting-rng",translation:{enSlug:"emerald-painting-rng",language:"de"}}];function t(i){const n={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...l(),...i.components},{PaintingReseed:d,YouTubeVideo:r}=n;return d||s("PaintingReseed"),r||s("YouTubeVideo"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Tools"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/mgba-setup",children:"mGBA mit Lua-Skripten"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Video-Guide"}),`
`,e.jsx(r,{id:"ydS9HLNmAog"}),`
`,e.jsx(n.h2,{children:"Intro"}),`
`,e.jsx(n.p,{children:"Das Reseeden des RNG durch das Betrachten von Gemälden ermöglicht es dir, lange Wartezeiten auf hohe Advances zu vermeiden. Normalerweise startet der RNG mit einer festgeschriebenen Zahl und generiert jedes Mal dieselben Zufallszahlen."}),`
`,e.jsx(n.p,{children:"Indem du ein Gemälde im Spiel betrachtest, wie zum Beispiel die in der Wettbewerbshalle von Seegrasulb City, wird der RNG basierend auf dem Video-Frame-Counter reseeded."}),`
`,e.jsx(n.p,{children:"Diese Methode kann mit Kampfvideos kombiniert werden, um den neuen RNG-Zustand nach dem Betrachten des Gemäldes zu speichern."}),`
`,e.jsx(n.p,{children:"Du kannst diese Methode auch für Rubin und Saphir verwenden, unabhängig davon, ob die interne Batterie noch funktioniert oder leer ist."}),`
`,e.jsx(n.h2,{children:"Setup"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Suche dir eine Target Seed mit dem PokeFinder."}),`
`,e.jsx(n.li,{children:'Klicke mit der rechten Maustaste auf die gewählte Seed im PokeFinder und wähle "Generate times for seed".'}),`
`]}),`
`,e.jsx(n.h2,{children:"Gemälde RNG"}),`
`,e.jsx(d,{}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:'Gib deine Target Seed in das obige Tool ein, um deinen "Target Painting Timer" zu finden.'}),`
`,e.jsx(n.li,{children:"Warte im Spiel, bis der vom Lua-Skript angezeigte Painting Timer dem Target Painting Timer entspricht. Öffne dabei das Pokémon-Menü, um zu verhindern, dass NPCs den RNG beeinflussen."}),`
`,e.jsx(n.li,{children:"Betrachte das Gemälde genau bei dieser Zahl, um den RNG auf die gewünschte Seed zu reseeden."}),`
`,e.jsx(n.li,{children:'Nutze die Anzahl der Advances, die im PokeFinder unter "Seed to Time" angezeigt werden, um den RNG-Vorgang wie gewohnt abzuschließen.'}),`
`]}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chinesische Übersetzung: xuanyelin, Hakuhiro."}),`
`,e.jsx(n.li,{children:"Deutsche Übersetzung: Parasite."}),`
`]})]})}function h(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}function s(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,o as frontmatter};
