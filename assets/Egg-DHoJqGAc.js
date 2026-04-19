import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-CvakMO0A.js";var n=e(),r=[{title:`RNG delle uova su Oro HeartGold e Argento Soulsilver`,navDrawerTitle:`Egg RNG`,description:`Impara come fare RNG Manipulation sulle uova della pensione in Oro HeartGold e Argento SoulSilver per shiny o Pokémon con IV alte.`,slug:`it-emulator-hgss-egg`,translation:{enSlug:`emulator-hgss-egg`,language:`it`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Strumenti`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Admiral-Fish/PokeFinder/releases`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Real96/PokeLua/blob/main/Gen%204/DeSmuMe/HGSS_RNG_DeSmuMe.lua`,children:`Script Lua`})}),`
`,(0,n.jsx)(r.li,{children:`Uno Chatot con Schiamazzo (consigliati due)`}),`
`,(0,n.jsx)(r.li,{children:`Uno slot vuoto nella squadra`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Preparativi e RNG del PID`}),`
`,(0,n.jsxs)(r.p,{children:[`Questo processo è diviso in due parti: `,(0,n.jsx)(r.strong,{children:`RNG del PID`}),` e `,(0,n.jsx)(r.strong,{children:`RNG delle IV`}),`.
Consulta `,(0,n.jsx)(r.a,{href:`https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_breeding`,children:`questo sito`}),` per maggiori informazioni sugli strumenti tenuti, eredità di Nature e IV.`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Posa entrambi i genitori nella pensione, tenendo conto dell'ordine in cui sono stati inseriti, le loro IV e Nature.`}),`
`,(0,n.jsx)(r.li,{children:`Salva il gioco.`}),`
`,(0,n.jsx)(r.li,{children:`Registra un suono con Schiamazzo (può essere anche vuoto; è sufficiente registrarlo).`}),`
`,(0,n.jsx)(r.li,{children:`Apri PokeFinder → sezione Gen 4 → "Uova" → "Ricercatore".`}),`
`,(0,n.jsx)(r.li,{children:`Inserisci tutti i dati richiesti.`}),`
`,(0,n.jsx)(r.li,{children:`Usa genitori internazionali se vuoi il Metodo Masuda (maggiore probabilità di ottenere uno shiny).`}),`
`,(0,n.jsx)(r.li,{children:`Imposta Delay minimo a 700.`}),`
`,(0,n.jsx)(r.li,{children:`Imposta Delay massimo a quanto serve (incrementalo per spread più specifiche).`}),`
`,(0,n.jsx)(r.li,{children:`Imposta Avanzamenti Allevamento a 0 / 0; ignora Avanzamenti Ritiro per adesso.`}),`
`,(0,n.jsx)(r.li,{children:`Genera i risultati e scegli un target.`}),`
`,(0,n.jsxs)(r.li,{children:[`Colpisci il suo Initial Seed usando `,(0,n.jsx)(r.a,{href:`/hgss-initial-seed`,children:`questa guida`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Genera l'uovo e salva davanti all'anziano della pensione.`}),`
`,(0,n.jsx)(r.li,{children:`Fermati qui se ti serviva solo shiny, Natura, genere, o abilità. Congratulazioni, ce l'hai fatta!`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Si suggerisce di avere un Ditto 6IV se non stai mirando a mosse specifiche, così le IV non saranno un gran problema.

`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Nota: Se vuoi essere sicuro, crea un save state, ritira l'uovo, verificalo con PKHeX, e ricarica lo state.

`})}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: RNG delle IV`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Ritorna su PokeFinder → "Searcher".`}),`
`,(0,n.jsx)(r.li,{children:`Imposta Delay minimo a 700.`}),`
`,(0,n.jsx)(r.li,{children:`Imposta Delay massimo a quanto serve (incrementalo per spread più specifiche).`}),`
`,(0,n.jsx)(r.li,{children:`Imposta Avanzamenti Allevamento a 0 / 100000.`}),`
`,(0,n.jsxs)(r.li,{children:[`Imposta Avanzamenti Ritiro minimi ad almeno `,(0,n.jsx)(r.code,{children:`il numero di erranti da catturare + 1`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Imposta Avanzamenti Ritiro massimi a quanto serve (incrementalo per spread più specifiche).`}),`
`,(0,n.jsx)(r.li,{children:`Inserisci le IV desiderate nel filtro.`}),`
`,(0,n.jsx)(r.li,{children:`Genera resultati e scegli un target.`}),`
`,(0,n.jsx)(r.li,{children:`Ottieni il seed iniziale nuovo.`}),`
`,(0,n.jsx)(r.li,{children:`Advanza usando Chatot (o gli NPC se accetti rischi) finché non raggiungi l'esatto numero di Avanzamenti Ritiro.`}),`
`,(0,n.jsx)(r.li,{children:`Crea un save state come backup.`}),`
`,(0,n.jsxs)(r.li,{children:[`Chiudi il menu mentre spammi `,(0,n.jsx)(r.code,{children:`A`}),` per ricevere l'uovo senza eventuali Avanzamenti extra.`]}),`
`,(0,n.jsx)(r.li,{children:`Se dovessi mancarlo, ricarica lo state e ripeti dallo step 12.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Congratulazioni! Hai ottenuto il tuo Pokémon!`})}),`
`,(0,n.jsx)(r.h2,{children:`Crediti`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Fiask per aver completato e tradotto la guida`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};