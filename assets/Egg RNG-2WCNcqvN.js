import{t as e}from"./jsx-runtime-4Jp-jQG6.js";import{d as t}from"./index-CndXGoE5.js";var n=e(),r=[{title:`Smaragd Ei-RNG`,navDrawerTitle:`Ei-RNG`,description:`Lerne, wie du in Pokémon Smaragd Eier in der Pension RNGst. Erhalte perfekte IVs, Wesen und Shinies.`,slug:`de-emulator-emerald-egg`,translation:{enSlug:`emulator-emerald-egg`,language:`de`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components},{EmeraldHeldEgg:i,EmeraldPickupEgg:a,YouTubeVideo:s}=r;return i||o(`EmeraldHeldEgg`,!0),a||o(`EmeraldPickupEgg`,!0),s||o(`YouTubeVideo`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mgba-setup`,children:`mGBA mit Lua-Skripten`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Intro`}),`
`,(0,n.jsx)(r.p,{children:`Eier werden in Smaragd in zwei Schritten generiert: Die PID wird festgelegt, wenn du den Schritt machst, der das Ei entstehen lässt. Die IVs werden festgelegt, wenn du das Ei beim Pensionsleiter abholst. Du musst also zwei RNG-Vorgänge durchführen, um ein perfektes Shiny-Ei zu erhalten.`}),`
`,(0,n.jsx)(r.h2,{children:`Video Guide`}),`
`,(0,n.jsx)(s,{id:`JtwSZgw6Q4U`}),`
`,(0,n.jsx)(r.h2,{children:`Ein Shiny-Pokémon erhalten`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Öffne den Tab „Pokemon Info“ im Lua-Skript, um die IVs und das Wesen deiner Eltern-Pokémon zu sehen. Notiere sie für später.`}),`
`,(0,n.jsx)(r.li,{children:`Gib beide Pokémon in die Pension. Das erste Pokémon ist „Parent 1“, das zweite „Parent 2“. Notiere dir die Reihenfolge.`}),`
`,(0,n.jsx)(r.li,{children:`Sprich mit dem Pensionsleiter, um die Kompatibilität zu prüfen, und gib diese in das untenstehende RNG-Tool ein.`}),`
`,(0,n.jsx)(r.li,{children:`Laufe innerhalb der Pension umher, bis der Schrittzähler des Lua-Skripts auf 1 steht.`}),`
`,(0,n.jsx)(r.li,{children:`Speichere das Spiel, starte es neu und pausiere direkt nach dem Laden des Spielstands.`}),`
`,(0,n.jsx)(r.li,{children:`Wechsle im Lua-Skript zum Tab „Breeding“ und gib „Calibration“, „Initial Seed“, „TID“, „SID“ und „Advances“ (als „Initial advances“) in das RNG-Tool ein. Gib außerdem das Wesen des Nicht-Ditto- oder weiblichen Elternteils an. Optional kannst du nach Shiny-Status, Wesen und Geschlecht filtern.`}),`
`,(0,n.jsx)(r.li,{children:`Klicke auf „Generate“, um eine Liste potenzieller PIDs zu erhalten, und wähle eine Ziel-PID aus. Wenn es keine Ergebnisse gibt, erhöhe die „Max Advances“.`}),`
`,(0,n.jsx)(r.li,{children:`Hebe die Pause im Spiel auf.`}),`
`,(0,n.jsxs)(r.li,{children:[`Falls „Redraws“ nötig sind: Öffne das Spielmenü (Drücke `,(0,n.jsx)(r.code,{children:`Start`}),`), öffne den Pokédex und schließe ihn wieder für jeden benötigten Redraw.`]}),`
`,(0,n.jsx)(r.li,{children:`Pausiere das Spiel kurz vor deinem Ziel-Advance und erstelle einen Save State.`}),`
`,(0,n.jsxs)(r.li,{children:[`Gehe das Spiel manuell Frame für Frame durch (`,(0,n.jsx)(r.code,{children:`Strg + N`}),` unter Windows, `,(0,n.jsx)(r.code,{children:`Cmd + N`}),` auf Mac), bis du deinen Ziel-Advance erreichst.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Halte die Richtungstaste gedrückt, damit dein Charakter läuft, und hebe die Pause auf, während du die Taste gedrückt hältst. Laufe in die Richtung, in die dein Charakter schaut (z. B. nach `,(0,n.jsx)(r.code,{children:`links`}),`, wenn er nach links blickt).`]}),`
`,(0,n.jsx)(r.li,{children:`Das Ei, das du erhältst, sollte nun deine Ziel-PID haben.`}),`
`,(0,n.jsx)(r.li,{children:`Falls du das Ziel verfehlt hast, gib das Wesen im RNG-Tool ein, um herauszufinden, auf welchem Advance du gelandet bist.`}),`
`,(0,n.jsx)(r.li,{children:`Ziehe den erreichten Advance von deinem Ziel-Advance ab, trage die Differenz im Feld „Delay“ des RNG-Tools ein, generiere die Ergebnisse neu und versuche es erneut.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Glückwunsch! Du hast jetzt ein Shiny-Ei!`})}),`
`,(0,n.jsx)(i,{lua:!0}),`
`,(0,n.jsx)(r.h2,{children:`IVs festlegen`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Stelle dich draußen neben den Pensionsleiter, speichere und starte das Spiel neu.`}),`
`,(0,n.jsx)(r.li,{children:`Sprich mit dem Pensionsleiter, bis der Text „Kümmere dich gut darum“ erscheint. Pausiere das Spiel und erstelle einen Save State.`}),`
`,(0,n.jsx)(r.li,{children:`Gib den aktuellen Advance im Feld „Initial advances“ im RNG-Tool ein.`}),`
`,(0,n.jsx)(r.li,{children:`Trage die IVs deiner Eltern-Pokémon in das RNG-Tool ein.`}),`
`,(0,n.jsx)(r.li,{children:`Klicke auf „Generate“, wähle einen Ziel-Advance aus der Liste aus.`}),`
`,(0,n.jsx)(r.li,{children:`Pausiere das Spiel kurz vor deinem Ziel-Advance und erstelle einen Save State.`}),`
`,(0,n.jsxs)(r.li,{children:[`Gehe das Spiel manuell durch (`,(0,n.jsx)(r.code,{children:`Strg + N`}),` oder `,(0,n.jsx)(r.code,{children:`Cmd + N`}),`), bis du den Ziel-Advance erreichst.`]}),`
`,(0,n.jsx)(r.li,{children:`Halte „A“ gedrückt und hebe die Pause auf, um das Ei genau auf dem Ziel-Advance zu erhalten.`}),`
`,(0,n.jsx)(r.li,{children:`Nutze den „Pokemon Info“-Tab des Lua-Skripts, um die IVs des erhaltenen Pokémon zu prüfen.`}),`
`,(0,n.jsx)(r.li,{children:`Falls du das Ziel verfehlt hast, gib die IVs im RNG-Tool ein, um den erreichten Advance zu finden. Eventuell musst du das Feld „Method“ ändern, um einen Treffer zu finden.`}),`
`,(0,n.jsx)(r.li,{children:`Ziehe den erreichten Advance von deinem Ziel ab, trage die Differenz bei „Delay“ ein, generiere neu und versuche es noch einmal.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Glückwunsch! Dein Ei hat jetzt fantastische IVs!`})}),`
`,(0,n.jsx)(a,{}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Danke an alle Mitwirkenden von `,(0,n.jsx)(r.a,{href:`https://github.com/Admiral-Fish/PokeFinder`,children:`PokeFinder`}),` auf deren Arbeit dieses Tool basiert.`]}),`
`,(0,n.jsx)(r.li,{children:`Chinesische Übersetzung: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`Italienische Übersetzung: Fiask.`}),`
`,(0,n.jsx)(r.li,{children:`Deutsche Übersetzung: Parasite.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};