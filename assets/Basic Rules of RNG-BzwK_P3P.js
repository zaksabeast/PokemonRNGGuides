const a=`---
- title: "Info sull'RNG di Smeraldo"
  navDrawerTitle: "Info sull'RNG"
  description: "Impara come avanzare l'RNG migliora la stabilità su Pokemon Smeraldo per risultati consistenti."
  slug: "it-e-tips-rng"
  translation:
    enSlug: "e-tips-rng"
    language: "it"
---

## Metodi RNG

- Per Pokemon stazionari: Metodo 1 (Method 1).
- Per incontri selvatici: Metodo H-2 (Method H-2).

I diversi metodi incontri selvatici sono causati dal [vblank](/gba-vblank), nonostante H-2 è il più comune.

### RNG tramite Dipinto

RNG tramite Dipinto è un ottimo metodo per ottenere qualsiasi initial seed desiderato. È una tecnica ancor più avanzata ed è spiegata in [questa guida](/emerald-painting-rng).

## Velocizzare l'RNG delle Advance

### Video di battaglia

Questo metodo aiuta preservando lo stato RNG come l'initial seed. Affronta una battaglia al Parco Lotta e salvala come video. Il video conterrà il seed dalla battaglia, permettendoti di impostarlo come initial seed quando la carichi. Per esempio, se il tuo target è distante 1 milione di advance, avanza fino a 950k, salva un video, e quando lo caricherai, partirai dall'Advance 950k.

Nonostante questo metodo sia molto utile, È un po 'obsoleto comparato all' RNG tramite Dipinto. Nonostante questo, è molto utile quando devi colpire un'Advance specifico molteplici volte.

### In battaglia

Essere in battaglia avanza l'RNG il doppio più velocemente. Questo è particolarmente utile per l'RNG di Pokemon selvatici.

## Crediti

- Traduzione Cinese: xuanyelin, Hakuhiro.
- Traduzione Italiano: Fiask.
`;export{a as default};
