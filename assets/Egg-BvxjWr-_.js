import{w as r,j as e}from"./index-BmhIYDEc.js";const l=[{title:"RNG delle uova su Oro HeartGold e Argento Soulsilver",navDrawerTitle:"Egg RNG",description:"Impara come fare RNG Manipulation sulle uova della pensione in Oro HeartGold e Argento SoulSilver per shiny o Pokémon con IV alte.",slug:"it-emulator-hgss-egg",translation:{enSlug:"emulator-hgss-egg",language:"it"}}];function a(n){const i={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.h2,{children:"Strumenti"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"https://github.com/Admiral-Fish/PokeFinder/releases",children:"PokeFinder"})}),`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"https://github.com/Real96/PokeLua/blob/main/Gen%204/DeSmuMe/HGSS_RNG_DeSmuMe.lua",children:"Script Lua"})}),`
`,e.jsx(i.li,{children:"Uno Chatot con Schiamazzo (consigliati due)"}),`
`,e.jsx(i.li,{children:"Uno slot vuoto nella squadra"}),`
`]}),`
`,e.jsx(i.h2,{children:"Step 1: Preparativi e RNG del PID"}),`
`,e.jsxs(i.p,{children:["Questo processo è diviso in due parti: ",e.jsx(i.strong,{children:"RNG del PID"})," e ",e.jsx(i.strong,{children:"RNG delle IV"}),`.
Consulta `,e.jsx(i.a,{href:"https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_breeding",children:"questo sito"})," per maggiori informazioni sugli strumenti tenuti, eredità di Nature e IV."]}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Posa entrambi i genitori nella pensione, tenendo conto dell'ordine in cui sono stati inseriti, le loro IV e Nature."}),`
`,e.jsx(i.li,{children:"Salva il gioco."}),`
`,e.jsx(i.li,{children:"Registra un suono con Schiamazzo (può essere anche vuoto; è sufficiente registrarlo)."}),`
`,e.jsx(i.li,{children:'Apri PokeFinder → sezione Gen 4 → "Uova" → "Ricercatore".'}),`
`,e.jsx(i.li,{children:"Inserisci tutti i dati richiesti."}),`
`,e.jsx(i.li,{children:"Usa genitori internazionali se vuoi il Metodo Masuda (maggiore probabilità di ottenere uno shiny)."}),`
`,e.jsx(i.li,{children:"Imposta Delay minimo a 700."}),`
`,e.jsx(i.li,{children:"Imposta Delay massimo a quanto serve (incrementalo per spread più specifiche)."}),`
`,e.jsx(i.li,{children:"Imposta Avanzamenti Allevamento a 0 / 0; ignora Avanzamenti Ritiro per adesso."}),`
`,e.jsx(i.li,{children:"Genera i risultati e scegli un target."}),`
`,e.jsxs(i.li,{children:["Colpisci il suo Initial Seed usando ",e.jsx(i.a,{href:"/hgss-initial-seed",children:"questa guida"}),"."]}),`
`,e.jsx(i.li,{children:"Genera l'uovo e salva davanti all'anziano della pensione."}),`
`,e.jsx(i.li,{children:"Fermati qui se ti serviva solo shiny, Natura, genere, o abilità. Congratulazioni, ce l'hai fatta!"}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{children:`Si suggerisce di avere un Ditto 6IV se non stai mirando a mosse specifiche, così le IV non saranno un gran problema.

`})}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{children:`Nota: Se vuoi essere sicuro, crea un save state, ritira l'uovo, verificalo con PKHeX, e ricarica lo state.

`})}),`
`,e.jsx(i.h2,{children:"Step 2: RNG delle IV"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:'Ritorna su PokeFinder → "Searcher".'}),`
`,e.jsx(i.li,{children:"Imposta Delay minimo a 700."}),`
`,e.jsx(i.li,{children:"Imposta Delay massimo a quanto serve (incrementalo per spread più specifiche)."}),`
`,e.jsx(i.li,{children:"Imposta Avanzamenti Allevamento a 0 / 100000."}),`
`,e.jsxs(i.li,{children:["Imposta Avanzamenti Ritiro minimi ad almeno ",e.jsx(i.code,{children:"il numero di erranti da catturare + 1"}),"."]}),`
`,e.jsx(i.li,{children:"Imposta Avanzamenti Ritiro massimi a quanto serve (incrementalo per spread più specifiche)."}),`
`,e.jsx(i.li,{children:"Inserisci le IV desiderate nel filtro."}),`
`,e.jsx(i.li,{children:"Genera resultati e scegli un target."}),`
`,e.jsx(i.li,{children:"Ottieni il seed iniziale nuovo."}),`
`,e.jsx(i.li,{children:"Advanza usando Chatot (o gli NPC se accetti rischi) finché non raggiungi l'esatto numero di Avanzamenti Ritiro."}),`
`,e.jsx(i.li,{children:"Crea un save state come backup."}),`
`,e.jsxs(i.li,{children:["Chiudi il menu mentre spammi ",e.jsx(i.code,{children:"A"})," per ricevere l'uovo senza eventuali Avanzamenti extra."]}),`
`,e.jsx(i.li,{children:"Se dovessi mancarlo, ricarica lo state e ripeti dallo step 12."}),`
`]}),`
`,e.jsx(i.p,{children:e.jsx(i.strong,{children:"Congratulazioni! Hai ottenuto il tuo Pokémon!"})}),`
`,e.jsx(i.h2,{children:"Crediti"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Fiask per aver completato e tradotto la guida"}),`
`]})]})}function o(n={}){const{wrapper:i}={...r(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(a,{...n})}):a(n)}export{o as default,l as frontmatter};
