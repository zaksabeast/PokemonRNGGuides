import{E as s,j as e}from"./index-B8eEowG5.js";const d={title:"RNG UOVA SMERALDO",navDrawerTitle:"RNG UOVA SMERALDO",description:"Learn how to RNG eggs in Pokémon Emerald using the Daycare. Get perfect IVs, natures, and shinies.",slug:"it-emulator-emerald-egg",translation:{enSlug:"emulator-emerald-egg",language:"it"}};function t(n){const i={a:"a",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...s(),...n.components},{EmeraldHeldEgg:a,EmeraldPickupEgg:l,YouTubeVideo:r}=i;return a||o("EmeraldHeldEgg"),l||o("EmeraldPickupEgg"),r||o("YouTubeVideo"),e.jsxs(e.Fragment,{children:[e.jsx(i.h2,{children:"Strumenti"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/mgba-setup",children:"mGBA con lua scripts"})}),`
`]}),`
`,e.jsx(i.h2,{children:"Introduzione"}),`
`,e.jsx(i.p,{children:`Le uova in Smeraldo vengono generate in due fasi: il PID viene impostato quando si esegue una fase che crea l'uovo,
e gli IV vengono impostati quando lo si ritira dall'addetto all'asilo. Dovrai eseguire due RNG per ottenere un uovo cromatico perfetto.`}),`
`,e.jsx(i.h2,{children:"Guida video (inglese)"}),`
`,e.jsx(r,{id:"JtwSZgw6Q4U"}),`
`,e.jsx(i.h2,{children:"Ottenere il Pokémon Cromatico"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:'Apri la scheda "Pokemon Info" negli script Lua per visualizzare gli IV e la natura dei Pokémon genitori. Annotateli per dopo.'}),`
`,e.jsx(i.li,{children:"Metti entrambi i Pokémon nella Pensione. Il primo genitore assegnato alla Pensione è il Genitore 1, il secondo è il Genitore 2. Annotalo per dopo."}),`
`,e.jsx(i.li,{children:"Parla con l'anziano della pensione per verificare la compatibilità dei genitori. Inseriscila nello strumento RNG sottostante."}),`
`,e.jsx(i.li,{children:"Cammina dentro la pensione finché il contatore dei passi dello script lua non segna 1."}),`
`,e.jsx(i.li,{children:"Salva il gioco, riavvialo, e mettilo in pausa dopo aver caricato il salvataggio."}),`
`,e.jsx(i.li,{children:`Cambia nella scheda "Breeding" negli script Lua e inserisci la "Calibration", "Initial Seed", "TID", "SID", e "Advances" (come "Advance Iniziali")
nello strumento RNG sottostante. Inserisci anche la natura del genitore non Ditto o femmina. Opzionalmente, filtra per cromaticità, natura e genere.`}),`
`,e.jsx(i.li,{children:'Clicca "Genera" per ottenere una lista di potenziali PID, e scegline uno come target. Se non ci sono risultati, incrementa "Advance Massime".'}),`
`,e.jsx(i.li,{children:"Riprendi il gioco."}),`
`,e.jsx(i.li,{children:"Se ci sono aggiornamenti, apri il menu del gioco (premi Start), poi apri e chiudi il Pokedex per ogni aggiornamento."}),`
`,e.jsx(i.li,{children:"Ferma il gioco vicino al tuo Advance Target, poi crea un savestate."}),`
`,e.jsx(i.li,{children:"Avanza manualmente il gioco (Ctrl+N su Windows, Cmd+N su Mac) finché non raggiungi il tuo Advance Target."}),`
`,e.jsx(i.li,{children:"Tieni premuto il tasto di movimento per far camminare il tuo personaggio, poi riprendi il gioco continuando a tenere premuto il tasto. Cammina nella stessa direzione in cui il personaggio è rivolto (ad esempio, se è rivolto verso sinistra, tieni premuto il tasto sinistro)."}),`
`,e.jsx(i.li,{children:"L'uovo che ricevi dovrebbe avere il tuo PID target."}),`
`,e.jsx(i.li,{children:"Se hai mancato il target, inserisci la natura nello strumento RNG per scoprire in che Advance sei arrivato."}),`
`,e.jsx(i.li,{children:`Sottrai l'Advance colpito dal tuo target, e inserisci il risultato nel campo "Ritardo" dello strumento RNG, poi rigenera i risultati e ritenta.`}),`
`]}),`
`,e.jsx(i.p,{children:e.jsx(i.strong,{children:"Congratulazioni! Ora hai un uovo cromatico!"})}),`
`,e.jsx(a,{lua:!0}),`
`,e.jsx(i.h2,{children:"Ottenere le IV"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Cammina fuori e salva accanto all'anziano della pensione. Poi riavvia il gioco."}),`
`,e.jsx(i.li,{children:"Dopo aver caricato il salvataggio, controlla la tua Carta Allenatore, girala una volta e chiudi il menu."}),`
`,e.jsx(i.li,{children:`Parla con l'anziano finché non vedi la scritta "Abbine cura". Ferma il gioco e fai un savestate.`}),`
`,e.jsx(i.li,{children:'Inserisci le Advance attuali nel campo "Advance Iniziali" dello strumento RNG sottostante.'}),`
`,e.jsx(i.li,{children:"Inserisci le IV dei Pokémon genitori nello strumento RNG sottostante."}),`
`,e.jsx(i.li,{children:'Clicca "Genera" per ottenere una lista di risultati possibili, e scegli un Advance Target.'}),`
`,e.jsx(i.li,{children:"Ferma il gioco vicino al tuo Advance Target, poi crea un savestate."}),`
`,e.jsx(i.li,{children:"Avanza manualmente il gioco (Ctrl+N su Windows, Cmd+N su Mac) finché non raggiungi il tuo Advance Target."}),`
`,e.jsx(i.li,{children:`Tieni premuto il tasto "A" e riprendi il gioco per ricevere l'uovo nell'Advance Target.`}),`
`,e.jsx(i.li,{children:'Usa la scheda "Pokemon Info" negli script lua e controlla le IV del Pokémon ricevuto.'}),`
`,e.jsx(i.li,{children:`Se hai mancato il target, inserisci le IV nello strumento RNG per trovare l'Advance colpito. Potrebbe essere necessario modificare il campo "Metodo" per trovare una corrispondenza.`}),`
`,e.jsx(i.li,{children:`Sottrai l'Advance colpito dal tuo target, e inserisci il risultato nel campo "Ritardo" dello strumento RNG, poi rigenera i risultati e ritenta.`}),`
`]}),`
`,e.jsx(i.p,{children:e.jsx(i.strong,{children:"Congratulazioni! Ora il tuo uovo ha delle IV fantastiche!"})}),`
`,e.jsx(l,{lua:!0}),`
`,e.jsx(i.h2,{children:"Credits"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Thanks to all ",e.jsx(i.a,{href:"https://github.com/Admiral-Fish/PokeFinder",children:"PokeFinder"})," contributors, whose work this tool is built upon."]}),`
`,e.jsx(i.li,{children:"Chinese translation: xuanyelin, Hakuhiro."}),`
`,e.jsx(i.li,{children:"Italian translation: Fiask."}),`
`]})]})}function u(n={}){const{wrapper:i}={...s(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(t,{...n})}):t(n)}function o(n,i){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default,d as frontmatter};
