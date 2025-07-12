const e=`---
title: "RNG UOVA SMERALDO"
navDrawerTitle: "RNG UOVA SMERALDO"
description: "Learn how to RNG eggs in Pokémon Emerald using the Daycare. Get perfect IVs, natures, and shinies."
slug: "it-emulator-emerald-egg"
translation:
  enSlug: "emulator-emerald-egg"
  language: "it"
---

## Strumenti

    - [mGBA con lua scripts](/mgba-setup)

## Introduzione

Le uova in Smeraldo vengono generate in due fasi: il PID viene impostato quando si esegue una fase che crea l'uovo,
e gli IV vengono impostati quando lo si ritira dall'addetto all'asilo. Dovrai eseguire due RNG per ottenere un uovo cromatico perfetto.

## Guida video (inglese)

<YouTubeVideo src="https://www.youtube.com/embed/JtwSZgw6Q4U?si=Fvmg7KLqI9J06wAa" />

## Ottenere il Pokémon Cromatico

1. Apri la scheda "Pokemon Info" negli script Lua per visualizzare gli IV e la natura dei Pokémon genitori. Annotateli per dopo.
2. Metti entrambi i Pokémon nella Pensione. Il primo genitore assegnato alla Pensione è il Genitore 1, il secondo è il Genitore 2. Annotalo per dopo.
3. Parla con l'anziano della pensione per verificare la compatibilità dei genitori. Inseriscila nello strumento RNG sottostante.
4. Cammina dentro la pensione finché il contatore dei passi dello script lua non segna 1.
5. Salva il gioco, riavvialo, e mettilo in pausa dopo aver caricato il salvataggio.
6. Cambia nella scheda "Breeding" negli script Lua e inserisci la "Calibration", "Initial Seed", "TID", "SID", e "Advances" (come "Advance Iniziali")
   nello strumento RNG sottostante. Inserisci anche la natura del genitore non Ditto o femmina. Opzionalmente, filtra per cromaticità, natura e genere.
7. Clicca "Genera" per ottenere una lista di potenziali PID, e scegline uno come target. Se non ci sono risultati, incrementa "Advance Massime".
8. Riprendi il gioco.
9. Se ci sono aggiornamenti, apri il menu del gioco (premi Start), poi apri e chiudi il Pokedex per ogni aggiornamento.
10. Ferma il gioco vicino al tuo Advance Target, poi crea un savestate.
11. Avanza manualmente il gioco (Ctrl+N su Windows, Cmd+N su Mac) finché non raggiungi il tuo Advance Target.
12. Tieni premuto il tasto di movimento per far camminare il tuo personaggio, poi riprendi il gioco continuando a tenere premuto il tasto. Cammina nella stessa direzione in cui il personaggio è rivolto (ad esempio, se è rivolto verso sinistra, tieni premuto il tasto sinistro).
13. L'uovo che ricevi dovrebbe avere il tuo PID target.
14. Se hai mancato il target, inserisci la natura nello strumento RNG per scoprire in che Advance sei arrivato.
15. Sottrai l'Advance colpito dal tuo target, e inserisci il risultato nel campo "Ritardo" dello strumento RNG, poi rigenera i risultati e ritenta.

**Congratulazioni! Ora hai un uovo cromatico!**

<EmeraldHeldEgg lua />

## Ottenere le IV

1. Cammina fuori e salva accanto all'anziano della pensione. Poi riavvia il gioco.
2. Dopo aver caricato il salvataggio, controlla la tua Carta Allenatore, girala una volta e chiudi il menu.
3. Parla con l'anziano finché non vedi la scritta "Abbine cura". Ferma il gioco e fai un savestate.
4. Inserisci le Advance attuali nel campo "Advance Iniziali" dello strumento RNG sottostante.
5. Inserisci le IV dei Pokémon genitori nello strumento RNG sottostante.
6. Clicca "Genera" per ottenere una lista di risultati possibili, e scegli un Advance Target.
7. Ferma il gioco vicino al tuo Advance Target, poi crea un savestate.
8. Avanza manualmente il gioco (Ctrl+N su Windows, Cmd+N su Mac) finché non raggiungi il tuo Advance Target.
9. Tieni premuto il tasto "A" e riprendi il gioco per ricevere l'uovo nell'Advance Target.
10. Usa la scheda "Pokemon Info" negli script lua e controlla le IV del Pokémon ricevuto.
11. Se hai mancato il target, inserisci le IV nello strumento RNG per trovare l'Advance colpito. Potrebbe essere necessario modificare il campo "Metodo" per trovare una corrispondenza.
12. Sottrai l'Advance colpito dal tuo target, e inserisci il risultato nel campo "Ritardo" dello strumento RNG, poi rigenera i risultati e ritenta.

**Congratulazioni! Ora il tuo uovo ha delle IV fantastiche!**

<EmeraldPickupEgg lua />

## Credits

- Thanks to all [PokeFinder](https://github.com/Admiral-Fish/PokeFinder) contributors, whose work this tool is built upon.
- Chinese translation: xuanyelin, Hakuhiro.
- Italian translation: Fiask.
`;export{e as default};
