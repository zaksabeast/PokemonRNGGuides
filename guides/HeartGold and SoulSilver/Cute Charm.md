---
title: 'Cute Charm RNG'
description: 'How to use Cute Charm with TID / SID RNG'
slug: 'emulator-hgss-cute-charm'
subCategory: 'Emulator'
---

## Requirements

- PokeFinder
- All the tools necessary to RNG Abuse with DesMuMe
- Knowing which PID / Group you'll want to hit (It'll be explained right after)
- Once everything done, a Cute Charm Lead.

## PID ? Groups ?

```
Note : It doesn't work on Method 1 Pokémon. It can work on gendered ratios Legendary. It doesn't work on ANY Genderless or 100% Male / Female Pokémon
```

So the idea of this guide is to focus on the RNG process itself and not to spend too much on how / why this glitch does exists. So for a simple summary, by RNGing a specific TID / SID combo to make some PID to be Shiny, using Cute Charm will allow them to be more than present, and that way being able to hit amazing spreads. This can be used for either Shiny Hunting or for RNGing. 

But the important concept is about PID Groups and Leads. It's not possible to RNG a combinaison of TID / SID and then having all the possible Cute Charm PID being Shiny. Some choices have to be done : Based on the Gender of your target (and then in some case the Gender Ratio) and the nature, you'll want to hit a totally different PID Group. So for that, you'll have to keep in your head a target. 

If you want a Shiny Female, then you don't have to worry, only the nature will matter. If you want a Shiny Male, however, you'll need to search the right Gender Ratio (example : Bulbasaur is 82.5 / 17.5) and then the right nature in order to find the correct PID to go for. Here're the tables with all the PID for each case :

### Male Lead (Target : Shiny Female, Gender Ratio is ignored)

| PID Group 1      | PID Group 2     | PID Group 3     | PID Group 4    |
| ---------------- | -----------     | -----------     | -----------    |
| 00000000 Hardy   |00000008 Impish  |00000010 Mild    |00000018 Quirky |
| 00000001 Lonely  |00000009 Lax     |00000011 Quiet   |                |
| 00000002 Brave   |0000000A Timid   |00000012 Bashful |                |
| 00000003 Adamant |0000000B Hasty   |00000013 Rash    |                |
| 00000004 Naughty |0000000C Serious |00000014 Calm    |                |
| 00000005 Bold    |0000000D Jolly   |00000015 Gentle  |                |
| 00000006 Docile  |0000000E Naive   |00000016 Sassy   |                |
| 00000007 Relaxed |0000000F Modest  |00000017 Careful |                |



### Female Lead (Target : Shiny Male, 87.5%)

| PID Group 1      | PID Group 2     | PID Group 3     | PID Group 4     |
| ---------------- | -----------     | -----------     | -----------     |
| 00000032 Hardy   |00000038 Docile  |00000040 Naive   |00000048 Sassy   |
| 00000033 Lonely  |00000039 Relaxed |00000041 Modest  |00000049 Careful |
| 00000034 Brave   |0000003A Impish  |00000042 Mild    |0000004A Quirky  |
| 00000035 Adamant |0000003B Lax     |00000043 Quiet   |                 |
| 00000036 Naughty |0000003C Timid   |00000044 Bashful |                 |
| 00000037 Bold    |0000003D Hasty   |00000045 Rash    |                 |
|                  |0000003E Serious |00000046 Calm    |                 |
|                  |0000003F Jolly   |00000047 Gentle  |                 |			
		
		
### Female Lead (Target : Shiny Male, 75%)

| PID Group 1      | PID Group 2     | PID Group 3     | PID Group 4     |
| ---------------- | -----------     | -----------     | -----------     |
| 0000004B Hardy   |00000050 Bold    |00000058 Jolly   |00000060 Gentle  |
| 0000004C Lonely  |00000051 Docile  |00000059 Naive   |00000061 Sassy   |
| 0000004D Brave   |00000052 Relaxed |0000005A Modest  |00000062 Careful |
| 0000004E Adamant |00000053 Impish  |0000005B Mild    |00000063 Quirky  |
| 0000004F Naughty |00000054 Lax     |0000005C Quiet   |                 |
|                  |00000055 Timid   |0000005D Bashful |                 |
|                  |00000056 Hasty   |0000005E Rash    |                 |
|                  |00000057 Serious |0000005F Calm    |                 |				
			
### Female Lead (Target : Shiny Male, 50%)

| PID Group 1      | PID Group 2     | PID Group 3     | PID Group 4     |
| ---------------- | -----------     | -----------     | -----------     |
| 00000096 Hardy   |00000098 Brave   |000000A0 Timid   |000000A8 Bashful |
| 00000097 Lonely  |00000099 Adamant |000000A1 Hasty   |000000A9 Rash    |
|                  |0000009A Naughty |000000A2 Serious |000000AA Calm    |
|                  |0000009B Bold    |000000A3 Jolly   |000000AB Gentle  |
|                  |0000009C Docile  |000000A4 Naive   |000000AC Sassy   |
|                  |0000009D Relaxed |000000A5 Modest  |000000AD Careful |
|                  |0000009E Impish  |000000A6 Mild    |000000AE Quirky  |
|                  |0000009F Lax     |000000A7 Quiet   |                 |			
			
			
### Female Lead (Target : Shiny Male, 25%)

| PID Group 1      | PID Group 2     | PID Group 3     | PID Group 4     |
| ---------------- | -----------     | -----------     | -----------     |
| 000000C8 Hardy   |000000D0 Impish  |000000D8 Mild    |000000E0 Quirky  |
| 000000C9 Lonely  |000000D1 Lax     |000000D9 Quiet   |                 |
| 000000CA Brave   |000000D2 Timid   |000000DA Bashful |                 |
| 000000CB Adamant |000000D3 Hasty   |000000DB Rash    |                 |
| 000000CC Naughty |000000D4 Serious |000000DC Calm    |                 |
| 000000CD Bold    |000000D5 Jolly   |000000DD Gentle  |                 |
| 000000CE Docile  |000000D6 Naive   |000000DE Sassy   |                 |
| 000000CF Relaxed |000000D7 Modest  |000000DF Careful |                 |	

```
Example : I want a Shiny Male Adamant Machop. Machop is 75% Male, so I'll look at the 3rd table. Inside the PID Group 1, I can find the matching PID : 0000004E. So I'll RNG a TID / SID around this group.
```

* Then open PokeFinder and Pandora's Box. Input all the necessary informations with the correct PID.
* RNG the TID / SID on a fresh save.
* Progress enough to get a cute charm / get one as early as possible
* Go to an area with a Machop and search for a Shiny. It's important to search with the Cute Charm lead on PokeFinder !
* RNG it.

```
Note : It can be used to Shiny Hunt in general and RNGing a TID / SID for a PID will work for the group. But don't forget if you want to use that for Shiny Hunting, Gender Ratio is important in the case of a Female Cute Charm Lead.
```
