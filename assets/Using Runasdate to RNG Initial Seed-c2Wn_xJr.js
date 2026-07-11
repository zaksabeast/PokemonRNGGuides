var e=`---
- title: "RNG dell'Initial Seed in Nero e Bianco"
  navDrawerTitle: "RNG dell'Initial Seed"
  description: "Impara come manipolare il tuo initial seed in Nero e Bianco."
  slug: "it-emulator-bw-runasdate-initial-seed"
  translation:
    enSlug: "emulator-bw-runasdate-initial-seed"
    language: "it"
- title: "RNG dell'Initial Seed in Nero 2 e Bianco 2"
  navDrawerTitle: "RNG dell'Initial Seed"
  description: "Impara come manipolare il tuo initial seed in Nero 2 e Bianco 2."
  slug: "it-emulator-b2w2-runasdate-inital-seed"
  translation:
    enSlug: "emulator-b2w2-runasdate-inital-seed"
    language: "it"
---

\`\`\`
Questa guida presuppone che tu abbia già trovato un target seed. Hai bisogno del target seed prima di iniziare a seguire questa guida.
\`\`\`

## Strumenti

- [Desmume](/desmume-setup)
- [RunAsDate](https://www.nirsoft.net/utils/run_as_date.html)

### Cos'è RunAsDate?

RunAsDate è uno strumento di Nirsoft che consente a qualsiasi programma di essere eseguito con un orario da te impostato. È utile per L'RNG di Gen 5 e ti aiuta a ottenere il tuo seed facilmente. Questa guida si focalizzerà solo su RunAsDate.

## Prepara RunAsDate

1. Avvia RunAsDate.
2. Imposta RunAsDate come è mostrato nell'immagine mostrata qua sotto.

![Setup](/images/Black-and-White/Initial-Seed/Setup.png)

\`\`\`
Non dovrai mai cambiarlo di nuovo. Questo è il setup universale di RunAsDate per l'RNG (Gen 3, 4, or 5), quindi hai quasi finito!
\`\`\`

3. Seleziona il programma con cui vuoi falsificare la data/ora tramite il pulsante \`Browse...\`.
4. Imposta la data e ora alla data da PokeFinder per ottenere il seed.
5. Clicca \`Run\`, e Desmume dovrebbe avviarsi.

Desmume verrà ora eseguto la data e l'orario che hai selezionato.

## Step 2: Ottenere il target seed

1. Carica gli script lua.
2. Carica il tuo gioco.
3. Premi ogni tasto necessario per ottenere il tuo target seed.
4. Puoi ora continuare come vuoi con l'RNG base!

## Risoluzione dei problemi

Se non hai ottenuto il seed giusto al primo tentativo con RunAsDate, controlla queste cose:

- L'orario su RunAsDate.
- Profilo di RNG.
- Tasti da tenere premuti per ottenere il tuo seed.

## Crediti

- Traduzione cinese: xuanyelin, Hakuhiro.
- Traduzione italiana: Fiask.
`;export{e as default};