const e=`---
- title: "PokeReader 3DS"
  navDrawerTitle: "PokeReader 3DS"
  description: "Impara come installare PokeReader sul tuo 3DS per assisterti con l'RNG e cacciare Pokémon perfetti."
  slug: "it-install-pokereader"
  translation:
    enSlug: "install-pokereader"
    language: "it"
---

PokeReader è un plugin che aiuta l'RNG portando funzionalità "emulator-like" alle console fisiche.

Per installare PokeReader su un emulatore 3DS, [vai qui](/install-pokereader-emu).

## Strumenti

- [Un 3DS con un CFW (Custom Firmware)](https://3ds.hacks.guide/)
- [Luma versione 13.0.0 o superiore](https://github.com/LumaTeam/Luma3DS/releases)

## Installa PokeReader sul 3DS

1. Scarica [l'ultima versione di PokeReader](https://github.com/zaksabeast/PokeReader/releases/latest).
2. Crea la cartella \`/luma/plugins\` se ancora non esiste.
3. Copia \`default.3gx\` nella cartella \`/luma/plugins/\`.
4. Apri il Rosalina Menu (\`L\` + \`Down\` + \`Select\`) attiva il \`Plugin Loader\`.

## Comandi

- \`Start\` + \`Up\`: Apri e chiudi la sovrapposizione dello strumento
- \`Start\` + \`Select\`: Mette in pausa il gioco
- \`Start\` mentre il gioco è in pausa: Avanza il gioco di 1 frame
- \`Select\` mentre il gioco è in pausa: Riprende il gioco

**Solo per Cristallo VC:**

- \`L\` + \`R\`: Mette in pausa il gioco
- \`L\` mentre il gioco è in pausa: Avanza il gioco di 1 frame
- \`R\` mentre il gioco è in pausa: Riprende il gioco

## Soluzioni a possibili problemi

**PokeReader non si carica e il mio gioco va in crash!**

Assicurati di aver aggiornato il gioco all'ultima versione. PokeReader non supporta giochi nelle versioni precedenti.

Gli aggiornamenti possono essere scaricati dal Nintendo eShop.

## Prova lo strumento!

Prova una di queste RNG usando PokeReader!

- [Celebi cromatico su Cristallo](/gen2-celebi)
- [Transporter RNG per Pokemon perfetti](/transporter-rng-offline)
- [Leggendari cromatici nei Wormhole su USUM](/retail-usum-wormhole)

## Crediti

- Chinese translation: Hakuhiro.
- Traduzione Italiano: Fiask.
`;export{e as default};
