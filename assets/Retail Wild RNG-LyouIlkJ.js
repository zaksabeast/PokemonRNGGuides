var e=`---
- title: "RNG Retail di Selvatici su Smeraldo"
  navDrawerTitle: "RNG Retail di Selvatici su Smeraldo"
  description: "Impara come Manipolare l'RNG di Pokémon selvatici su Pokémon Smeraldo su una console originale per IV perfette, nature, cromatici."
  slug: "it-retail-emerald-wild"
  translation:
    enSlug: "retail-emerald-wild"
    language: "it"
---

## Requisiti:

- [PokeFinder](/pokefinder)
- [Mystic Timer](/mystic-timer)
- TID e SID (necessario solo per cromatici)
- Pokemon con Profumino

## Step 1: Prepara PokeFinder

1. Apri PokeFinder e seleziona "Gen 3" > "Wild".
   - <Image
       alt="Gen 3 Wild Pokémon"
       src="/images/Emerald/Wild/Step-1.1.webp"
       maxHeight={300}
     />
2. Scegli il tuo profilo con il TID/SID del gioco che stai usando se stai cercando cromatici.
   - Segui [Questa guida per scoprire il tuo SID](/gen3-sid) se ancora non lo sai.
3. Seleziona "Wild 2" come metodo.
4. Seleziona "0" come seed.
5. Scegli tra "Grass" o "Surfing" per l'incontro.
6. Seleziona la posizione e il Pokémon (se desiderato).
7. Filtra per il Pokémon che vuoi.
8. Clicca "Generate" e trova un Pokémon desiderato dai risultati.

![PokeFinder Settings](/images/Emerald/Wild/Step-1.2-1.8.webp)

## Step 2: Prepara Mystic Timer

1. Apri [Mystic Timer](/mystic-timer).
2. Seleziona la sezione Gen 3.
3. Seleziona la console che stai usando.
4. Inserisci il target advance da PokeFinder per il Pokémon desiderato nel campo "Target Frame".
5. Clicca "Set Timer", poi "Start".

<Image
  alt="Mystic Timer Settings"
  src="/images/Emerald/Wild/Step-2.webp"
  maxHeight={350}
/>

## Step 3: Calibrazione

1. Quando il timer arriva a 0, resetta il gioco premendo \`Start + Select + A + B\`.
2. Apri il menu in-game e vai nella tua squadra.
3. Seleziona il Pokémon con Profumino e vai sopra "Profumino".
   - <Flex gap={16}>
       <Image
         pixelated
         alt="Stand in target area"
         src="/images/Emerald/Wild/Step-3.2.webp"
         minHeight={200}
       />
       <Image
         pixelated
         alt="Hover over Sweet Scent"
         src="/images/Emerald/Wild/Step-3.3.webp"
         minHeight={200}
       />
     </Flex>
4. Aspetta per il countdown alla fine, poi premi \`A\`.
5. Cattura il Pokémon e usa il "IV Calculator" sotto i filtri.
6. Inserisci le info del Pokémon per controllare le sue IV.
   - <Image
       alt="IV Calculator"
       src="/images/Emerald/Wild/Step-3.5-3.6.webp"
       maxHeight={300}
     />
7. Seleziona "Any" negli "Encounter Slot" e clicca "Generate".
   - ![Catch Pokémon and check IVs](/images/Emerald/Wild/Step-3.7.webp)
8. Cerca il Pokémon che hai appena catturato e inserisci le advance che hai colpito su Mystic Timer.
9. Clicca "Set Timer".
   - <Image
       alt="Set Timer again"
       src="/images/Emerald/Wild/Step-3.8-3.9.webp"
       maxHeight={350}
     />

## Step 4: Manipola l'RNG per il Pokemon

Ora che hai calibrato il delay, è solo questione di timing.
Continua a catturare Pokémon e controllare che advance hai colpito.
Calibra Mystic Timer se necessario.
Se sei distante una o due Advance, prova ancora senza cambiare nulla.

<Image pixelated alt="Shiny Pokémon" src="/images/Emerald/Wild/Step-4.webp" />

## Crediti

- Traduzione Cinese: xuanyelin, Hakuhiro.
- Traduzione Italiano: Fiask.
- Screenshots: Fiask.
`;export{e as default};