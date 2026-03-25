import{w as r,j as e}from"./index-CCQMIRn6.js";const s=[{title:"RNG dell'Initial Seed in Oro HeartGold e Argento SoulSilver",navDrawerTitle:"RNG dell'Initial Seed",description:"Impara come manipolare il tuo initial seed in Oro HeartGold e Argento SoulSilver.",slug:"it-hgss-initial-seed",translation:{enSlug:"hgss-initial-seed",language:"it"}}];function n(a){const i={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r(),...a.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.pre,{children:e.jsx(i.code,{children:`Questa guida presuppone che tu abbia già trovato un target seed. Hai bisogno del target seed e del delay prima di iniziare a seguire questa guida.
`})}),`
`,e.jsx(i.h2,{children:"Strumenti"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/desmume-setup",children:"Desmume"})}),`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"https://www.nirsoft.net/utils/run_as_date.html",children:"RunAsDate"})}),`
`]}),`
`,e.jsx(i.h3,{children:"Cos'è RunAsDate?"}),`
`,e.jsx(i.p,{children:"RunAsDate è uno strumento di Nirsoft che consente a qualsiasi programma di essere eseguito con un orario da te impostato. È utile per L'RNG di Gen 4 e ti aiuta a ottenere il tuo seed facilmente."}),`
`,e.jsx(i.h2,{children:"Prepara RunAsDate"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Avvia RunAsDate."}),`
`,e.jsx(i.li,{children:"Imposta RunAsDate come è mostrato nell'immagine mostrata qua sotto."}),`
`]}),`
`,e.jsx(i.p,{children:e.jsx(i.img,{src:"/images/HeartGold-SoulSilver/Initial-Seed/Setup.png",alt:"Setup"})}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{children:`Non dovrai mai cambiarlo di nuovo. Questo è il setup universale di RunAsDate per l'RNG (Gen 3, 4, or 5), quindi hai quasi finito!
`})}),`
`,e.jsxs(i.ol,{start:"3",children:[`
`,e.jsxs(i.li,{children:["Seleziona il programma con cui vuoi falsificare la data/ora tramite il pulsante ",e.jsx(i.code,{children:"Browse..."}),"."]}),`
`,e.jsx(i.li,{children:"Imposta la data e ora alla data data da PokeFinder per ottenere il seed."}),`
`,e.jsxs(i.li,{children:["Clicca ",e.jsx(i.code,{children:"Run"}),", e Desmume dovrebbe avviarsi."]}),`
`]}),`
`,e.jsx(i.h2,{children:"Ottenere il target seed"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{children:`Crea save states spesso durante questo processo.
`})}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Carica gli script lua."}),`
`,e.jsxs(i.li,{children:["Clicca ",e.jsx(i.code,{children:"A"}),' per arrivare velocemente alla schermata "Continua".']}),`
`,e.jsxs(i.li,{children:["Metti in pausa il tuo emulatore con ",e.jsx(i.code,{children:"Ctrl + P"}),"."]}),`
`,e.jsx(i.li,{children:"Crea save states spesso in caso sbagli qualcosa."}),`
`,e.jsx(i.li,{children:"Riprendi il tuo gioco, e non fare nulla finché non arrivi vicino al tuo target delay."}),`
`,e.jsx(i.li,{children:"Una volta vicino, metti in pausa il tuo emulatore."}),`
`,e.jsx(i.li,{children:"Crea un altro save state (non sai mai cosa succederà!)."}),`
`,e.jsxs(i.li,{children:["Premi ",e.jsx(i.code,{children:"N"})," per avanzare il gioco un frame video alla volta per incrementare il delay di 1."]}),`
`,e.jsxs(i.li,{children:["Quando sei sul delay target, tieni premuto ",e.jsx(i.code,{children:"A"})," mentre riprendi il tuo gioco."]}),`
`]}),`
`,e.jsx(i.h2,{children:"Risoluzione dei problemi"}),`
`,e.jsxs(i.p,{children:["Ogni tanto, anche se hai premuto ",e.jsx(i.code,{children:"A"})," al delay corretto, il delay attuale può essere +/-1 rispetto a quello che avresti voluto. Questo può succedere in Gen 4, dove i delay possono sempre essere sempre pari o sempre dispari. Usa uno di questi metodi per cambiare la parità del delay."]}),`
`,e.jsx(i.h3,{children:"Cambiare l'anno"}),`
`,e.jsx(i.p,{children:`Chiudi il tuo emulatore e cambia l'anno in RunAsDate di uno prima o dopo rispetto all'anno attuale. Questo cambio aggiusterà il delay. Verifica il nuovo delay con PokeFinder nella finestra "Seed to Time" cambiando l'anno. Una volta aggiustato, riavvia Desmume con RunAsDate e carica un save state. Potrai dunque fare RNG per il nuovo delay.`}),`
`,e.jsx(i.h3,{children:"Caricare un gioco GBA"}),`
`,e.jsx(i.p,{children:"Caricare un gioco GBA nello slot GBA nell'emulatore cambierà la parità del delay."}),`
`,e.jsx(i.h3,{children:"Schermata Continua"}),`
`,e.jsx(i.p,{children:"Nella schermata per scegliere se continuare la partita, Premi la freccia in basso sul touchscreen inferiore per abbassare lo schermo, poi premi la freccia in alto per riportarlo in alto. Questo cambierà la parità del delay."}),`
`,e.jsx(i.h2,{children:"Crediti"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Traduzione cinese: xuanyelin, Hakuhiro."}),`
`,e.jsx(i.li,{children:"Traduzione italiana: Fiask"}),`
`]})]})}function t(a={}){const{wrapper:i}={...r(),...a.components};return i?e.jsx(i,{...a,children:e.jsx(n,{...a})}):n(a)}export{t as default,s as frontmatter};
