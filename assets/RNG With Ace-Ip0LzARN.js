import{t as e}from"./jsx-runtime-DE3yYTa1.js";import{d as t}from"./index-CUoNGuY3.js";var n=e(),r=[{title:`Guida RNG con ACE in Pokémon Emerald (Manipolazione del Seed e Setup)`,description:`Guida passo passo alla manipolazione dell’RNG in Pokémon Emerald tramite ACE. Scopri come impostare seed personalizzati, generare target, calibrare gli avanzamenti e ottenere Pokémon perfetti in modo affidabile.`,navDrawerTitle:`RNG con ACE`,slug:`it-emerald-rng-with-ace`,translation:{enSlug:`emerald-rng-with-ace`,language:`it`}}];function i(e){let r={a:`a`,blockquote:`blockquote`,br:`br`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/Admiral-Fish/PokeFinder/releases`,children:`PokeFinder`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://e-sh4rk.github.io/ACE3/emerald/getting-started/introduction/`,children:`Una specie ACE stabile`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/mystic-timer`,children:`Mystic Timer`})}),`
`,(0,n.jsx)(r.li,{children:`Un Pokémon con Profumino (solo per selvatici)`}),`
`,(0,n.jsx)(r.li,{children:`Almeno uno slot libero in squadra (opzionale, consigliato per calibrare più velocemente)`}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`IMPORTANT`,children:[`
`,(0,n.jsxs)(r.p,{children:[`Questa guida presuppone una conoscenza base dell’RNG di Gen 3.`,(0,n.jsx)(r.br,{}),`
`,`I Pokémon ottenuti con questo metodo non risultano illegali nonostante l’uso di ACE.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 1: Preparazione del Seed e del Codice`}),`
`,(0,n.jsx)(r.p,{children:`Prepara il tuo target e genera il codice ACE per cambiare l’Initial Seed.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Apri PokeFinder → Gen 3 → Selvatici/Statici.`}),`
`,(0,n.jsxs)(r.li,{children:[`Vai nella tab "Ricercatore" e filtra il Pokémon target. Se è selvatico, seleziona "Selvatico 2". Non chiudere PokeFinder.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/SearchingTarget.webp`,alt:`Ricerca del target con PokeFinder`})}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Copia il Seed del tuo target.`}),`
`,(0,n.jsxs)(r.li,{children:[`Usa `,(0,n.jsx)(r.a,{href:`https://e-sh4rk.github.io/CodeGenerator/scripts/seed/index.html`,children:`questo script di E-Sh4rk`}),` per ottenere il seed da utilizzare per il codice.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/1stScript.webp`,alt:`Primo script`})}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Incolla il Seed aggiungendo `,(0,n.jsx)(r.code,{children:`0x`}),` all’inizio.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Inserisci `,(0,n.jsx)(r.code,{children:`5`}),` come categoria.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Imposta il range a `,(0,n.jsx)(r.code,{children:`-900 -900`}),` (~15 secondi).`]}),`
`,(0,n.jsx)(r.li,{children:`Copia il Seed generato in output.`}),`
`,(0,n.jsxs)(r.li,{children:[`Usa il `,(0,n.jsx)(r.a,{href:`https://e-sh4rk.github.io/CodeGenerator/index.html`,children:`generatore di script ACE di E-Sh4rk`}),` per ottenere il codice.`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/2ndScript.webp`,alt:`Generatore di script ACE`})}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.li,{children:`Vai in "RNG and PID Manipulation" e seleziona "Change PRNG Seed".`}),`
`,(0,n.jsxs)(r.li,{children:[`Incolla il Seed mantenendo `,(0,n.jsx)(r.code,{children:`0x`}),` e infine clicca "Compute".`]}),`
`,(0,n.jsx)(r.li,{children:`Inserisci tutti i codici nel gioco.`}),`
`,(0,n.jsx)(r.li,{children:`Salva ed esegui lo script per verificare che funzioni.`}),`
`]}),`
`,(0,n.jsxs)(r.blockquote,{"alert-type":`WARNING`,children:[`
`,(0,n.jsx)(r.p,{children:`Se il gioco crasha o si blocca, controlla i codici e assicurati che non ci siano Pokémon o ghost data nei Box 12, 13, 14 e nell’ultima riga del Box 11. Ripeti finché non appare il diploma del Pokédex.`}),`
`,(0,n.jsx)(`br`,{}),`
`,(0,n.jsx)(r.p,{children:`Questo è il modo per rimuovere la ghost data. Fallo nei Box 11, 12, 13 e 14 se riscontri problemi.`}),`
`,(0,n.jsx)(`br`,{}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/RemoveGhostData.webp`,alt:`Rimuovi ghost data`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Step 2: RNG del Pokémon`}),`
`,(0,n.jsx)(r.p,{children:`Esegui l’RNG dopo aver impostato il nuovo Initial Seed.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Salva nel punto corretto per catturare il tuo target.`}),`
`,(0,n.jsx)(r.li,{children:`Apri Mystic Timer e seleziona Gen 3.`}),`
`,(0,n.jsxs)(r.li,{children:[`Imposta il timer con `,(0,n.jsx)(r.code,{children:`Target Advance = 900`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Avvia il timer e apri contemporaneamente le info della specie ACE.`}),`
`,(0,n.jsx)(r.li,{children:`Procedi come in un RNG classico.`}),`
`]}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsx)(r.tr,{children:(0,n.jsx)(r.th,{children:`Configurazione di Mystic Timer`})})}),(0,n.jsx)(r.tbody,{children:(0,n.jsx)(r.tr,{children:(0,n.jsx)(r.td,{children:(0,n.jsx)(r.img,{src:`/images/Emerald/ACE/TimerConfig.webp`,alt:`Mystic Timer e ACE`})})})})]}),`
`,(0,n.jsx)(r.h2,{children:`Step 3: Calibrazione`}),`
`,(0,n.jsx)(r.p,{children:`La calibrazione è diversa perché il Seed è stato modificato direttamente.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`In PokeFinder, fai clic destro sul Seed.`}),`
`,(0,n.jsxs)(r.li,{children:[`Clicca `,(0,n.jsx)(r.code,{children:`Genera tempi per il seed`}),` e clicca "Trova".`]}),`
`,(0,n.jsxs)(r.li,{children:[`Annota `,(0,n.jsx)(r.code,{children:`Initial Advances`}),` e `,(0,n.jsx)(r.code,{children:`Initial Seed (16/32-bit)`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Copia il Seed nella sezione "Generatore".`}),`
`,(0,n.jsx)(r.li,{children:`Prendi gli Advances e sottrai 100.`}),`
`,(0,n.jsxs)(r.li,{children:[`Inserisci il risultato in `,(0,n.jsx)(r.code,{children:`Avanzamenti Iniziali`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Imposta `,(0,n.jsx)(r.code,{children:`Avanzamenti Massimi`}),` a 100.`]}),`
`,(0,n.jsx)(r.li,{children:`Configura le impostazioni in base al luogo di cattura. Se è selvatico, seleziona "Selvatico 2".`}),`
`,(0,n.jsx)(r.li,{children:`Trova l’Advance ottenuto. Sottrai questo valore dal target originale (quelli annotati prima).`}),`
`,(0,n.jsxs)(r.li,{children:[`Calibra usando come valore `,(0,n.jsx)(r.code,{children:`900 + (Target Advance - Advance ottenuti)`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Ripeti finché ottieni il Pokémon desiderato.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Risoluzione dei problemi`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Le IV possono risultare errate anche se tutto il resto è corretto. L’uso di ACE infatti può alterare audio o grafica. Questo influisce sul contatore dei cicli del metodo selvatico, generandone uno diverso dal Selvatico 2.`}),`
`,(0,n.jsx)(r.li,{children:`Se le IV non corrispondono, l’unica soluzione è riprovare.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Fiask per aver scritto questa guida.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};