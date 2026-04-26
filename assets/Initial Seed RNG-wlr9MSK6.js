import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-B5eGYVya.js";var n=e(),r=[{title:`RNG dell'Initial Seed in Oro HeartGold e Argento SoulSilver`,navDrawerTitle:`RNG dell'Initial Seed`,description:`Impara come manipolare il tuo initial seed in Oro HeartGold e Argento SoulSilver.`,slug:`it-hgss-initial-seed`,translation:{enSlug:`hgss-initial-seed`,language:`it`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Questa guida presuppone che tu abbia già trovato un target seed. Hai bisogno del target seed e del delay prima di iniziare a seguire questa guida.
`})}),`
`,(0,n.jsx)(r.h2,{children:`Strumenti`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/desmume-setup`,children:`Desmume`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://www.nirsoft.net/utils/run_as_date.html`,children:`RunAsDate`})}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Cos'è RunAsDate?`}),`
`,(0,n.jsx)(r.p,{children:`RunAsDate è uno strumento di Nirsoft che consente a qualsiasi programma di essere eseguito con un orario da te impostato. È utile per L'RNG di Gen 4 e ti aiuta a ottenere il tuo seed facilmente.`}),`
`,(0,n.jsx)(r.h2,{children:`Prepara RunAsDate`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Avvia RunAsDate.`}),`
`,(0,n.jsx)(r.li,{children:`Imposta RunAsDate come è mostrato nell'immagine mostrata qua sotto.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/HeartGold-SoulSilver/Initial-Seed/Setup.png`,alt:`Setup`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Non dovrai mai cambiarlo di nuovo. Questo è il setup universale di RunAsDate per l'RNG (Gen 3, 4, or 5), quindi hai quasi finito!
`})}),`
`,(0,n.jsxs)(r.ol,{start:`3`,children:[`
`,(0,n.jsxs)(r.li,{children:[`Seleziona il programma con cui vuoi falsificare la data/ora tramite il pulsante `,(0,n.jsx)(r.code,{children:`Browse...`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Imposta la data e ora alla data data da PokeFinder per ottenere il seed.`}),`
`,(0,n.jsxs)(r.li,{children:[`Clicca `,(0,n.jsx)(r.code,{children:`Run`}),`, e Desmume dovrebbe avviarsi.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Ottenere il target seed`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`Crea save states spesso durante questo processo.
`})}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Carica gli script lua.`}),`
`,(0,n.jsxs)(r.li,{children:[`Clicca `,(0,n.jsx)(r.code,{children:`A`}),` per arrivare velocemente alla schermata "Continua".`]}),`
`,(0,n.jsxs)(r.li,{children:[`Metti in pausa il tuo emulatore con `,(0,n.jsx)(r.code,{children:`Ctrl + P`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Crea save states spesso in caso sbagli qualcosa.`}),`
`,(0,n.jsx)(r.li,{children:`Riprendi il tuo gioco, e non fare nulla finché non arrivi vicino al tuo target delay.`}),`
`,(0,n.jsx)(r.li,{children:`Una volta vicino, metti in pausa il tuo emulatore.`}),`
`,(0,n.jsx)(r.li,{children:`Crea un altro save state (non sai mai cosa succederà!).`}),`
`,(0,n.jsxs)(r.li,{children:[`Premi `,(0,n.jsx)(r.code,{children:`N`}),` per avanzare il gioco un frame video alla volta per incrementare il delay di 1.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Quando sei sul delay target, tieni premuto `,(0,n.jsx)(r.code,{children:`A`}),` mentre riprendi il tuo gioco.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Risoluzione dei problemi`}),`
`,(0,n.jsxs)(r.p,{children:[`Ogni tanto, anche se hai premuto `,(0,n.jsx)(r.code,{children:`A`}),` al delay corretto, il delay attuale può essere +/-1 rispetto a quello che avresti voluto. Questo può succedere in Gen 4, dove i delay possono sempre essere sempre pari o sempre dispari. Usa uno di questi metodi per cambiare la parità del delay.`]}),`
`,(0,n.jsx)(r.h3,{children:`Cambiare l'anno`}),`
`,(0,n.jsx)(r.p,{children:`Chiudi il tuo emulatore e cambia l'anno in RunAsDate di uno prima o dopo rispetto all'anno attuale. Questo cambio aggiusterà il delay. Verifica il nuovo delay con PokeFinder nella finestra "Seed to Time" cambiando l'anno. Una volta aggiustato, riavvia Desmume con RunAsDate e carica un save state. Potrai dunque fare RNG per il nuovo delay.`}),`
`,(0,n.jsx)(r.h3,{children:`Caricare un gioco GBA`}),`
`,(0,n.jsx)(r.p,{children:`Caricare un gioco GBA nello slot GBA nell'emulatore cambierà la parità del delay.`}),`
`,(0,n.jsx)(r.h3,{children:`Schermata Continua`}),`
`,(0,n.jsx)(r.p,{children:`Nella schermata per scegliere se continuare la partita, Premi la freccia in basso sul touchscreen inferiore per abbassare lo schermo, poi premi la freccia in alto per riportarlo in alto. Questo cambierà la parità del delay.`}),`
`,(0,n.jsx)(r.h2,{children:`Crediti`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Traduzione cinese: xuanyelin, Hakuhiro.`}),`
`,(0,n.jsx)(r.li,{children:`Traduzione italiana: Fiask`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};