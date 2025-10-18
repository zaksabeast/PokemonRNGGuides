const e=`---
- title: "PokeReader 3DS"
  navDrawerTitle: "PokeReader 3DS"
  description: "Aprende a instalar PokeReader en tu 3DS para ayudarte con el RNG y perfeccionar la caza de Pokémon."
  slug: "es-install-pokereader"
  translation:
    enSlug: "install-pokereader"
    language: "es"
---

PokeReader es un complemento para ayudar a hacer RNG al llevar funcionalidad similar a la de un emulador a las consolas físicas.

Para saber cómo instalar PokeReader en un emulador 3DS, [haga click aquí](/install-pokereader-emu).

## Herramientas

- [Un 3DS con CFW (Firmware personalizado)](https://3ds.hacks.guide/)
- [Luma versión 13.0.0 o superior](https://github.com/LumaTeam/Luma3DS/releases)

## Instalar PokeReader en 3DS

1. Descargue la [última versión de PokeReader](https://github.com/zaksabeast/PokeReader/releases/latest).
2. Crea la carpeta \`/luma/plugins\` si no existe.
3. Copie \`default.3gx\` a la carpeta \`/luma/plugins/\`.
4. Abra Rosalina (\`L\` + \`Down\` + \`Select\`) y habilite el \`Plugin Loader\`.

## Controles de PokeReader

- \`Start\` + \`Up\`: Abre y cierra la superposición
- \`Start\` + \`Select\`: Pausa el juego
- \`Start\` mientras está en pausa: Avanza el juego 1 fotograma
- \`Select\` mientras está en pausa: Despausa el juego
- Solo Cristal CV
  - \`L\` + \`R\`: Pausa el juego
  - \`L\` mientras está en pausa: Avanza el juego 1 fotograma
  - \`R\` mientras está en pausa: Despausa el juego

## Solución de problemas

**¡PokeReader no se carga y mi juego falla!**

Asegúrate de haber actualizado el juego a la última versión. PokeReader no funcionará en versiones de juegos anteriores.

Las actualizaciones del juego se pueden descargar desde Nintendo eShop.

## ¿Qué sigue?

¡Prueba algunos de estos RNG!

- [Celebi brillante en cristal](/gen2-celebi)
- [RNG de trasladador fácil para Pokémon perfectos](/transporter-rng-offline)
- [Leyendas brillantes de Ultraumbral en USUM](/retail-usum-wormhole)

## Créditos

- Spanish translation: El Terapagos Mexicano.
`;export{e as default};
