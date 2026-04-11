import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CW60Ticg.js";var n=e(),r=[{title:`Übersicht der RNG-Advancing-Techniken`,navDrawerTitle:`Übersicht der RNG-Advancing-Techniken`,description:`Verständnis der wichtigsten Konzepte zur Beschleunigung von RNG-Manipulationen mit Painting Reseeding und Kampfaufzeichnungs-Reseeding.`,slug:`de-emerald-advancing-rng-techniques`,translation:{enSlug:`emerald-advancing-rng-techniques`,language:`de`}}];function i(e){let r={a:`a`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components},{Gist:i}=r;return i||o(`Gist`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:(0,n.jsx)(r.p,{children:`Gist: Verständnis der wichtigsten Konzepte zur Beschleunigung von
RNG-Manipulationen mit Painting Reseeding und dem Reseeding per
Kampfaufzeichnung.`})}),`
`,(0,n.jsx)(r.h2,{children:`Grundlegende RNG-Manipulation`}),`
`,(0,n.jsx)(r.p,{children:`Das Ergebnis einer Pokémon-Generierung hängt vom RNG-Zustand ab. Um das gewünschte Pokémon zu erhalten, müssen Spieler den RNG-Zustand auf einen bestimmten Wert bringen (Ziel-Advance) und dann die Aktion ausführen, um dem Pokémon zu begegnen.`}),`
`,(0,n.jsx)(r.p,{children:`In Smaragd startet der RNG-Zustand bei 0 und schreitet pro visual Frame um 1 voran (60 Advances pro Sekunde). Er schreitet außerdem durch Aktionen im Spiel voran, wie etwa NPC-Bewegungen und Menü-Interaktionen.`}),`
`,(0,n.jsx)(r.p,{children:`Der einfachste Weg, den RNG-Zustand auf den Ziel-Advance zu bringen, besteht darin, einfach eine bestimmte Anzahl von Frames zu warten (z. B. 597,275 Sekunden) und dann zu versuchen, die Aktion im exakt richtigen Timing auszuführen (mit einer Präzision von 1/60 Sekunde). Jeder Versuch erfordert einen Neustart des Spiels und das erneute Abwarten der vollen Verzögerung.`}),`
`,(0,n.jsx)(r.h2,{children:`Technik der Kampfaufzeichnung`}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`Die Kampfaufzeichnung ist eine Technik, um den RNG-Zustand zu speichern und wiederherzustellen.`}),` Mit dieser Methode müssen Spieler die volle Verzögerung nur ein einziges Mal abwarten; danach ist jeder weitere Versuch der RNG-Manipulation sehr schnell machbar.`]}),`
`,(0,n.jsx)(r.p,{children:`Diese Technik erfordert keine frame-perfekte Eingabe. Wenn du einen Frame zu früh oder zu spät bist, ist der gespeicherte RNG-Zustand lediglich um einen Advance zu spät oder zu früh.`}),`
`,(0,n.jsx)(r.p,{children:`Hier ist ein Beispiel zum Verständnis der Kampfaufzeichnung für den Ziel-Advance 36.000 (10 Minuten):`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Du wartest 9,5 Minuten (~34.000 Advances) und erstellst dann eine Kampfaufzeichnung.`}),`
`,(0,n.jsx)(r.li,{children:`Du begibst dich auf die Karte, auf der du deinem gewünschten Pokémon begegnen möchtest.`}),`
`,(0,n.jsx)(r.li,{children:`Du schaust dir deine Kampfaufzeichnung an. Der RNG-Zustand befindet sich nun bei ~34.000 Advances.`}),`
`,(0,n.jsx)(r.li,{children:`Du wartest 0,5 Minuten und löst den Pokémon-Kampf aus.`}),`
`,(0,n.jsx)(r.li,{children:`Wenn du dein Ziel verfehlst, kalibrierst du, schaust dir die Kampfaufzeichnung erneut an, um den RNG-Zustand wieder auf ~34.000 Advances zu setzen, und wartest nur 0,5 Minuten für einen erneuten Versuch.`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Hier findest du den `,(0,n.jsx)(r.a,{href:`/de-emerald-battle-video`,children:`detaillierten Guide und das Webtool zur Kampfaufzeichnung`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Advances beschleunigen`}),`
`,(0,n.jsx)(r.p,{children:`Während eines Kampfes schreitet der RNG-Zustand pro visual Frame um 2 voran statt um 1. Um beispielsweise Advance 36.000 zu erreichen, würde es im Kampf nur 5 Minuten dauern, anstatt 10 Minuten außerhalb eines Kampfes.`}),`
`,(0,n.jsx)(r.h2,{children:`Painting Reseeding`}),`
`,(0,n.jsx)(r.p,{children:`Pokémon mit sehr seltenen Merkmalen (z. B. 6 perfekte IVs) erfordern manchmal einen sehr hohen RNG-Zustand (z. B. 100.000.000 Advances, was etwa 20 Tagen Wartezeit entspricht).`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Painting Reseeding ist eine Technik, die den RNG-Zustand sofort um Millionen von Advances springen lässt.`})}),`
`,(0,n.jsx)(r.p,{children:`Beispielsweise kann die Durchführung von Painting Reseeding den RNG-Zustand sofort auf 99.966.396 Advances setzen. Danach müssen nur noch 33.604 Advances (~10 Minuten) gewartet werden, um den Ziel-Advance von 100.000.000 zu erreichen (statt ~20 Tage).`}),`
`,(0,n.jsx)(r.p,{children:`Um dein finales Ziel mit Painting Reseeding zu treffen, sind zwei Aktionen mit unterschiedlichen Wartezeiten erforderlich:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Advances vor dem Gemälde: Advances bis zum RNG-Zustand vor der Anwendung der Painting-Reseeding-Technik.`}),`
`,(0,n.jsx)(r.li,{children:`Advances nach dem Gemälde: Advances bis zum RNG-Zustand nach der Anwendung der Painting-Reseeding-Technik.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Beispiel, um den finalen Ziel-Advance von 100.000.000 zu treffen:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Advances vor dem Gemälde: 44.572 (setzt den RNG-Zustand auf 99.966.396 Advances).`}),`
`,(0,n.jsx)(r.li,{children:`Advances nach dem Gemälde: 33.604 (bringt den RNG-Zustand auf 100.000.000 Advances).`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Die erfolgreiche Durchführung von Painting Reseeding erfordert eine frame-perfekte Eingabe. Die Anzahl der Advances für den RNG-Zustand hängt vom exakten Timing des Tastendrucks ab. Ein Frame zu spät oder zu früh verändert das Ergebnis komplett (z. B. setzt die Technik nach 44.571 Advances statt 44.572 den RNG-Zustand auf 3.400.311.113 Advances statt 99.966.396).`}),`
`,(0,n.jsx)(r.p,{children:`Nach der Durchführung müssen Spieler prüfen, ob sie ihre Ziel-Advances vor dem Gemälde erfolgreich getroffen haben. Bei Erfolg erstellen die Spieler eine Kampfaufzeichnung, um ihren RNG-Zustand zu speichern und wiederherzustellen, falls sie ihre Ziel-Advances nach dem Gemälde für die Pokémon-Begegnung verfehlen. Die Kampfaufzeichnung kann auch helfen, die Ziel-Advances vor dem Gemälde zu erreichen.`}),`
`,(0,n.jsx)(r.p,{children:`Hier ist ein Beispiel zum Verständnis von Painting Reseeding mit der Kampfaufzeichnung für den Ziel-Advance 100.000.000 (mit „Advances vor dem Gemälde: 44.572“ und „Advances nach dem Gemälde: 33.604“):`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Du wartest 10,5 Minuten (~42.000 Advances) und erstellst dann eine Kampfaufzeichnung.`}),`
`,(0,n.jsx)(r.li,{children:`Du stellst dich vor das Gemälde.`}),`
`,(0,n.jsx)(r.li,{children:`Du schaust dir deine Kampfaufzeichnung an. Der RNG-Zustand befindet sich nun bei ~42.000 Advances.`}),`
`,(0,n.jsx)(r.li,{children:`Du wartest 0,5 Minuten und versuchst, Painting Reseeding bei Advance 44.572 durchzuführen.`}),`
`,(0,n.jsx)(r.li,{children:`Du fliegst zur Siegesstraße und fängst ein Pokémon. Basierend auf den Statuswerten des Pokémon bestimmst du, ob du die Ziel-Advances vor dem Gemälde getroffen hast (ob das gefangene Pokémon nahe dem RNG-Advance 99.966.396 existiert).`}),`
`,(0,n.jsx)(r.li,{children:`Falls du gescheitert bist, kalibrierst du und kehrst zu Schritt 2 zurück.`}),`
`,(0,n.jsx)(r.li,{children:`Wenn es dir gelingt, deine Ziel-Advances vor dem Gemälde zu treffen, wartest du, bis der Advance nah am Ziel liegt (z. B. ~99.998.000), und erstellst eine neue Kampfaufzeichnung.`}),`
`,(0,n.jsx)(r.li,{children:`Du begibst dich auf die Karte, auf der du deinem gewünschten Pokémon begegnen möchtest.`}),`
`,(0,n.jsx)(r.li,{children:`Du schaust dir deine Kampfaufzeichnung an. Der RNG-Zustand befindet sich nun bei ~99.998.000 Advances.`}),`
`,(0,n.jsx)(r.li,{children:`Du wartest 0,5 Minuten und löst den Pokémon-Kampf bei Advance 100.000.000 aus.`}),`
`,(0,n.jsx)(r.li,{children:`Wenn du dein Ziel verfehlst, schaust du dir die Kampfaufzeichnung erneut an, um den RNG-Zustand zurück auf 99.998.000 Advances zu setzen, und wartest nur 0,5 Minuten für einen erneuten Versuch.`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Hier findest du den `,(0,n.jsx)(r.a,{href:`/de-emerald-painting-rng`,children:`detaillierten Guide und das Webtool zu Painting Reseeding`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Deutsche Übersetzung: Parasite.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};