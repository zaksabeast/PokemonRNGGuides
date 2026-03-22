import{ii as l,j as i}from"./index-CEitD9YF.js";const s=[{title:"RNG Selvatico di Nero 2 e Bianco 2",navDrawerTitle:"RNG Selvatico",description:"Impara come effettuare RNG Manipulation per Pokémon selvatici in Nero 2 e Bianco 2 per risultati shiny e IV alte.",slug:"it-emulator-b2w2-wild",translation:{enSlug:"emulator-b2w2-wild",language:"it"}},{title:"RNG Selvatico di Nero e Bianco",navDrawerTitle:"RNG Selvatico",description:"Impara come effettuare RNG Manipulation per Pokémon selvatici in Nero e Bianco per risultati shiny e IV alte.",slug:"it-emulator-bw-wild",translation:{enSlug:"emulator-bw-wild",language:"it"}}];function a(n){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...l(),...n.components},{Alert:r}=e;return r||o("Alert"),i.jsxs(i.Fragment,{children:[i.jsx(e.h2,{children:"Tools"}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsx(e.li,{children:i.jsx(e.a,{href:"/pokefinder",children:"PokeFinder"})}),`
`,i.jsx(e.li,{children:i.jsx(e.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,i.jsx(e.li,{children:i.jsx(e.a,{href:"/emulator-bw-find-ds-parameters",children:"Un profilo di gioco configurato"})}),`
`,i.jsx(e.li,{children:"Chatot con Schiamazzo"}),`
`,i.jsx(e.li,{children:"Un Pokémon con Profumino o o avere il miele in borsa"}),`
`]}),`
`,i.jsx(e.h2,{children:"Step 1: Capire l'RNG della Gen 5"}),`
`,i.jsx(e.p,{children:"Nella Gen 5, l'RNG è diviso in due sistemi separati."}),`
`,i.jsxs(e.table,{children:[i.jsx(e.thead,{children:i.jsxs(e.tr,{children:[i.jsx(e.th,{children:"Tipo RNG"}),i.jsx(e.th,{children:"Controlli"})]})}),i.jsxs(e.tbody,{children:[i.jsxs(e.tr,{children:[i.jsx(e.td,{children:"PIDRNG"}),i.jsx(e.td,{children:"Stato shiny, natura, genere, abilità."})]}),i.jsxs(e.tr,{children:[i.jsx(e.td,{children:"IVRNG"}),i.jsx(e.td,{children:"Solo le IV del Pokémon."})]})]})]}),`
`,i.jsx(e.p,{children:"Devi controllarli entrambi per ottenere un Pokémon shiny con le IV desiderate."}),`
`,i.jsx(e.h2,{children:"Step 2: Scegliere e Preparare la tua posizione"}),`
`,i.jsx(e.p,{children:"Vai nel percorso dove vuoi incontrare il Pokémon, con gli script già attivati."}),`
`,i.jsx(e.p,{children:"Questo ti permette di controllare quando la mappa è rumorosa, che è importante per l'RNG della Gen 5."}),`
`,i.jsx(e.p,{children:"Una volta che hai scelto la tua posizione e target:"}),`
`,i.jsxs(e.ol,{children:[`
`,i.jsx(e.li,{children:"Salva il gioco."}),`
`,i.jsx(e.li,{children:"Chiudi l'emulatore."}),`
`]}),`
`,i.jsxs(e.p,{children:["Per informazioni dettagliate sul comportamento degli NPC e un elenco di luoghi poco rumorosi, consultare ",i.jsx(e.a,{href:"https://docs.google.com/document/d/1Hxz24gvMLrt8Qk-_6tG50hEA0TI8fuCI6yqQwBckwR4/edit?usp=sharing",children:"questa guida esterna sul comportamento degli NPC"}),"."]}),`
`,i.jsx(e.h2,{children:"Step 3: Cerca un Target Seed"}),`
`,i.jsx(e.p,{children:"Apri PokeFinder e configura la ricerca."}),`
`,i.jsxs(e.ol,{children:[`
`,i.jsx(e.li,{children:'Vai nella scheda "Gen 5".'}),`
`,i.jsx(e.li,{children:'Seleziona "Selvatici".'}),`
`,i.jsx(e.li,{children:"Scegli il tuo profilo di gioco."}),`
`,i.jsx(e.li,{children:'Apri la scheda "Searcher".'}),`
`,i.jsx(e.li,{children:'Seleziona un "Leader" se il primo Pokémon nella tua squadra ha una abilità lead.'}),`
`,i.jsx(e.li,{children:'Imposta il valore di "Avanzamenti" al numero che intendi avanzare nel gioco.'}),`
`,i.jsx(e.li,{children:"Scegli il tuo Pokémon target nella sezione Impostazioni."}),`
`,i.jsx(e.li,{children:"Configura valori desiderati in Filtri, come IV, genere, abilità, o natura."}),`
`,i.jsx(e.li,{children:"Aggiusta il range della data."}),`
`,i.jsx(e.li,{children:'Clicca "Cerca".'}),`
`]}),`
`,i.jsx(e.h2,{children:"Step 4: Accendi il gioco nel Target Seed"}),`
`,i.jsxs(e.ol,{children:[`
`,i.jsxs(e.li,{children:["Usa ",i.jsx(e.code,{children:"runasdate.exe"})," dalla ",i.jsx(e.a,{href:"/desmume-setup",children:"Guida Desmume"})," per accendere il gioco nella corretta data e orario."]}),`
`,i.jsx(e.li,{children:"Entra nel gioco velocemente."}),`
`,i.jsx(e.li,{children:"Apri il menu immediatamente."}),`
`]}),`
`,i.jsx(e.pre,{children:i.jsx(e.code,{children:`Assicurati di **non attivare il C-Gear quando entri nel gioco**, per evitare avanzamenti imprevedibili.
`})}),`
`,i.jsx(e.p,{children:"Il tuo initial seed dovrebbe combaciare con il tuo target."}),`
`,i.jsx(e.p,{children:"Se il seed è incorretto, ricontrolla i parametri del tuo profilo o la configurazione di runasdate."}),`
`,i.jsx(e.h2,{children:"Step 5: Avanzare il PIDRNG"}),`
`,i.jsx(e.p,{children:"Usa questi metodi per incrementare gli avanzamenti LCRNG:"}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsx(e.li,{children:"Chatot: Usa Schiamazzo per avanzare +1 ogni volta che controlli le sue info."}),`
`,i.jsx(e.li,{children:"Salvare il gioco: Questo potrebbe essere utile per casi specifici come gli Starters."}),`
`,i.jsx(e.li,{children:"Avanzamenti tramite NPC: Questo può essere complicato, ma può essere gestito in base alle condizioni meteorologiche per far incrementare rapidamente gli avanzamenti LCRNG."}),`
`]}),`
`,i.jsx(e.h2,{children:"Step 6: Avanzare l'IVRNG"}),`
`,i.jsx(e.p,{children:"Usa questi metodi per incrementare gli avanzamenti IVRNG:"}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsx(e.li,{children:"Camminare 128 passi aumenta l'IVRNG di un valore pari al numero di Pokémon nella tua squadra (esempio: con 6 Pokémon l'IVRNG avanza di 6)."}),`
`,i.jsx(e.li,{children:"Ritirare un Pokémon dal PC fa avanzare l'IVRNG di 7."}),`
`,i.jsx(e.li,{children:"Anche lottare un Pokémon incrementa l'IVRNG, ma il resultato può essere imprevedibile."}),`
`]}),`
`,i.jsx(e.h2,{children:"Step 7: Innescare l'incontro"}),`
`,i.jsx(e.p,{children:"Dopo aver raggiunto l'avanzamento PIDRNG e IVRNG corretto:"}),`
`,i.jsxs(e.ol,{children:[`
`,i.jsx(e.li,{children:"Assicurati di essere sull'avanzamento target."}),`
`,i.jsx(e.li,{children:"Usa Profumino o il miele per iniziare l'incontro selvatico."}),`
`]}),`
`,i.jsx(e.pre,{children:i.jsx(e.code,{children:`Usa i save states nelle aree rumorosi così da poter riprovare se hai mancato l'avanzamento target.
`})}),`
`,i.jsx(r,{type:"warning",showIcon:!0,message:"Se la posizione ha NPC che si muovono o condizioni meteorologiche, l'LCRNG continuerà ad avanzare durante l'animazione di Profumino/Miele."}),`
`,i.jsx(e.p,{children:i.jsx(e.strong,{children:"Congratulazioni! Hai ora ottenuto il tuo Pokémon!"})}),`
`,i.jsx(e.h2,{children:"Risoluzione dei problemi"}),`
`,i.jsx(e.p,{children:"Questo significa che l'incontro non è avvenuto nell'avanzamento target, anche se i tuoi preparativi erano corretti."}),`
`,i.jsx(e.p,{children:"Non c'è una soluzione garantita. Devi aggiustare e calibrare finché non ottieni lo shiny corretto."}),`
`,i.jsx(e.p,{children:"Tuttavia, pescare non incrementa gli avanzamenti LCRNG, quindi puoi pescare senza nessun problema."}),`
`,i.jsx(e.h2,{children:"Crediti"}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsx(e.li,{children:"Vlad per aver scritto la guida iniziale"}),`
`,i.jsx(e.li,{children:"Fiask per aver completato e tradotto la guida"}),`
`]})]})}function c(n={}){const{wrapper:e}={...l(),...n.components};return e?i.jsx(e,{...n,children:i.jsx(a,{...n})}):a(n)}function o(n,e){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,s as frontmatter};
