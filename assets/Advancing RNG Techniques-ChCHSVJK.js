import{w as r,j as n}from"./index-BmhIYDEc.js";const u=[{title:"Übersicht der RNG-Advancing-Techniken",navDrawerTitle:"Übersicht der RNG-Advancing-Techniken",description:"Verständnis der wichtigsten Konzepte zur Beschleunigung von RNG-Manipulationen mit Painting Reseeding und Kampfaufzeichnungs-Reseeding.",slug:"de-emerald-advancing-rng-techniques",translation:{enSlug:"emerald-advancing-rng-techniques",language:"de"}}];function s(i){const e={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r(),...i.components},{Gist:d}=e;return d||t("Gist"),n.jsxs(n.Fragment,{children:[n.jsx(d,{children:n.jsx(e.p,{children:`Gist: Verständnis der wichtigsten Konzepte zur Beschleunigung von
RNG-Manipulationen mit Painting Reseeding und dem Reseeding per
Kampfaufzeichnung.`})}),`
`,n.jsx(e.h2,{children:"Grundlegende RNG-Manipulation"}),`
`,n.jsx(e.p,{children:"Das Ergebnis einer Pokémon-Generierung hängt vom RNG-Zustand ab. Um das gewünschte Pokémon zu erhalten, müssen Spieler den RNG-Zustand auf einen bestimmten Wert bringen (Ziel-Advance) und dann die Aktion ausführen, um dem Pokémon zu begegnen."}),`
`,n.jsx(e.p,{children:"In Smaragd startet der RNG-Zustand bei 0 und schreitet pro visual Frame um 1 voran (60 Advances pro Sekunde). Er schreitet außerdem durch Aktionen im Spiel voran, wie etwa NPC-Bewegungen und Menü-Interaktionen."}),`
`,n.jsx(e.p,{children:"Der einfachste Weg, den RNG-Zustand auf den Ziel-Advance zu bringen, besteht darin, einfach eine bestimmte Anzahl von Frames zu warten (z. B. 597,275 Sekunden) und dann zu versuchen, die Aktion im exakt richtigen Timing auszuführen (mit einer Präzision von 1/60 Sekunde). Jeder Versuch erfordert einen Neustart des Spiels und das erneute Abwarten der vollen Verzögerung."}),`
`,n.jsx(e.h2,{children:"Technik der Kampfaufzeichnung"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Die Kampfaufzeichnung ist eine Technik, um den RNG-Zustand zu speichern und wiederherzustellen."})," Mit dieser Methode müssen Spieler die volle Verzögerung nur ein einziges Mal abwarten; danach ist jeder weitere Versuch der RNG-Manipulation sehr schnell machbar."]}),`
`,n.jsx(e.p,{children:"Diese Technik erfordert keine frame-perfekte Eingabe. Wenn du einen Frame zu früh oder zu spät bist, ist der gespeicherte RNG-Zustand lediglich um einen Advance zu spät oder zu früh."}),`
`,n.jsx(e.p,{children:"Hier ist ein Beispiel zum Verständnis der Kampfaufzeichnung für den Ziel-Advance 36.000 (10 Minuten):"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Du wartest 9,5 Minuten (~34.000 Advances) und erstellst dann eine Kampfaufzeichnung."}),`
`,n.jsx(e.li,{children:"Du begibst dich auf die Karte, auf der du deinem gewünschten Pokémon begegnen möchtest."}),`
`,n.jsx(e.li,{children:"Du schaust dir deine Kampfaufzeichnung an. Der RNG-Zustand befindet sich nun bei ~34.000 Advances."}),`
`,n.jsx(e.li,{children:"Du wartest 0,5 Minuten und löst den Pokémon-Kampf aus."}),`
`,n.jsx(e.li,{children:"Wenn du dein Ziel verfehlst, kalibrierst du, schaust dir die Kampfaufzeichnung erneut an, um den RNG-Zustand wieder auf ~34.000 Advances zu setzen, und wartest nur 0,5 Minuten für einen erneuten Versuch."}),`
`]}),`
`,n.jsxs(e.p,{children:["Hier findest du den ",n.jsx(e.a,{href:"/de-emerald-battle-video",children:"detaillierten Guide und das Webtool zur Kampfaufzeichnung"}),"."]}),`
`,n.jsx(e.h2,{children:"Advances beschleunigen"}),`
`,n.jsx(e.p,{children:"Während eines Kampfes schreitet der RNG-Zustand pro visual Frame um 2 voran statt um 1. Um beispielsweise Advance 36.000 zu erreichen, würde es im Kampf nur 5 Minuten dauern, anstatt 10 Minuten außerhalb eines Kampfes."}),`
`,n.jsx(e.h2,{children:"Painting Reseeding"}),`
`,n.jsx(e.p,{children:"Pokémon mit sehr seltenen Merkmalen (z. B. 6 perfekte IVs) erfordern manchmal einen sehr hohen RNG-Zustand (z. B. 100.000.000 Advances, was etwa 20 Tagen Wartezeit entspricht)."}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Painting Reseeding ist eine Technik, die den RNG-Zustand sofort um Millionen von Advances springen lässt."})}),`
`,n.jsx(e.p,{children:"Beispielsweise kann die Durchführung von Painting Reseeding den RNG-Zustand sofort auf 99.966.396 Advances setzen. Danach müssen nur noch 33.604 Advances (~10 Minuten) gewartet werden, um den Ziel-Advance von 100.000.000 zu erreichen (statt ~20 Tage)."}),`
`,n.jsx(e.p,{children:"Um dein finales Ziel mit Painting Reseeding zu treffen, sind zwei Aktionen mit unterschiedlichen Wartezeiten erforderlich:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Advances vor dem Gemälde: Advances bis zum RNG-Zustand vor der Anwendung der Painting-Reseeding-Technik."}),`
`,n.jsx(e.li,{children:"Advances nach dem Gemälde: Advances bis zum RNG-Zustand nach der Anwendung der Painting-Reseeding-Technik."}),`
`]}),`
`,n.jsx(e.p,{children:"Beispiel, um den finalen Ziel-Advance von 100.000.000 zu treffen:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Advances vor dem Gemälde: 44.572 (setzt den RNG-Zustand auf 99.966.396 Advances)."}),`
`,n.jsx(e.li,{children:"Advances nach dem Gemälde: 33.604 (bringt den RNG-Zustand auf 100.000.000 Advances)."}),`
`]}),`
`,n.jsx(e.p,{children:"Die erfolgreiche Durchführung von Painting Reseeding erfordert eine frame-perfekte Eingabe. Die Anzahl der Advances für den RNG-Zustand hängt vom exakten Timing des Tastendrucks ab. Ein Frame zu spät oder zu früh verändert das Ergebnis komplett (z. B. setzt die Technik nach 44.571 Advances statt 44.572 den RNG-Zustand auf 3.400.311.113 Advances statt 99.966.396)."}),`
`,n.jsx(e.p,{children:"Nach der Durchführung müssen Spieler prüfen, ob sie ihre Ziel-Advances vor dem Gemälde erfolgreich getroffen haben. Bei Erfolg erstellen die Spieler eine Kampfaufzeichnung, um ihren RNG-Zustand zu speichern und wiederherzustellen, falls sie ihre Ziel-Advances nach dem Gemälde für die Pokémon-Begegnung verfehlen. Die Kampfaufzeichnung kann auch helfen, die Ziel-Advances vor dem Gemälde zu erreichen."}),`
`,n.jsx(e.p,{children:"Hier ist ein Beispiel zum Verständnis von Painting Reseeding mit der Kampfaufzeichnung für den Ziel-Advance 100.000.000 (mit „Advances vor dem Gemälde: 44.572“ und „Advances nach dem Gemälde: 33.604“):"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Du wartest 10,5 Minuten (~42.000 Advances) und erstellst dann eine Kampfaufzeichnung."}),`
`,n.jsx(e.li,{children:"Du stellst dich vor das Gemälde."}),`
`,n.jsx(e.li,{children:"Du schaust dir deine Kampfaufzeichnung an. Der RNG-Zustand befindet sich nun bei ~42.000 Advances."}),`
`,n.jsx(e.li,{children:"Du wartest 0,5 Minuten und versuchst, Painting Reseeding bei Advance 44.572 durchzuführen."}),`
`,n.jsx(e.li,{children:"Du fliegst zur Siegesstraße und fängst ein Pokémon. Basierend auf den Statuswerten des Pokémon bestimmst du, ob du die Ziel-Advances vor dem Gemälde getroffen hast (ob das gefangene Pokémon nahe dem RNG-Advance 99.966.396 existiert)."}),`
`,n.jsx(e.li,{children:"Falls du gescheitert bist, kalibrierst du und kehrst zu Schritt 2 zurück."}),`
`,n.jsx(e.li,{children:"Wenn es dir gelingt, deine Ziel-Advances vor dem Gemälde zu treffen, wartest du, bis der Advance nah am Ziel liegt (z. B. ~99.998.000), und erstellst eine neue Kampfaufzeichnung."}),`
`,n.jsx(e.li,{children:"Du begibst dich auf die Karte, auf der du deinem gewünschten Pokémon begegnen möchtest."}),`
`,n.jsx(e.li,{children:"Du schaust dir deine Kampfaufzeichnung an. Der RNG-Zustand befindet sich nun bei ~99.998.000 Advances."}),`
`,n.jsx(e.li,{children:"Du wartest 0,5 Minuten und löst den Pokémon-Kampf bei Advance 100.000.000 aus."}),`
`,n.jsx(e.li,{children:"Wenn du dein Ziel verfehlst, schaust du dir die Kampfaufzeichnung erneut an, um den RNG-Zustand zurück auf 99.998.000 Advances zu setzen, und wartest nur 0,5 Minuten für einen erneuten Versuch."}),`
`]}),`
`,n.jsxs(e.p,{children:["Hier findest du den ",n.jsx(e.a,{href:"/de-emerald-painting-rng",children:"detaillierten Guide und das Webtool zu Painting Reseeding"}),"."]}),`
`,n.jsx(e.h2,{children:"Credits"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Deutsche Übersetzung: Parasite."}),`
`]})]})}function c(i={}){const{wrapper:e}={...r(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(s,{...i})}):s(i)}function t(i,e){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,u as frontmatter};
