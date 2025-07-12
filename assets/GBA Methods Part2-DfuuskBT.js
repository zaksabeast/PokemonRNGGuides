const e=`---
- title: "Impacto del Pokémon inicial en el equipo para encuentros salvajes en Esmeralda"
  navDrawerTitle: "Methods & Lead"
  description: "Entender por qué la carta de salida influye en qué método de Wild se activa"
  slug: "es-gba-methods-lead-impact"
  translation:
    enSlug: "gba-methods-lead-impact"
    language: "es"
---

<Gist>
  Lo esencial: Comprender porque el Pokémon inicial del equipo impacta en el
  método salvaje que será desencadenado.
</Gist>

### Prerrequisito

Haber leído [Métodos 1-4](/gba-methods) y [Vblanks](/gba-vblank).

### Encuentros salvajes Pokémon (Versión simplificada)

Aquí hay un ejemplo simplificado del código ejecutado en un encuentro salvaje:

| Paso                           | Ciclos     | Ciclos Totales |
| ------------------------------ | ---------- | -------------- |
| 1- Actualizar audio & visual   | + 50K      | 50K            |
| 2- Actualizaciones misceláneas | + 5K       | 55K            |
| 3- Preparar encuentro salvaje  | + 15K-115K | 70K-170K       |
| 4- Generar PID valido          | + 10K      | 80K-180K       |
| 5- Crear Pokémon sin IVs       | + 115K     | 195K-295K      |
| 6- Generar Def, Ata, HP IVs    | + 1K       | 196K-296K      |
| 7- Asignar Def, Ata, HP IVs    | + 39K      | 235K-335K      |
| 8- Generar DefE, AtaE, Vel IVs | + 1K       | 236K-336K      |
| 9- Asignar DefE, AtaE, Vel IVs | + 39K      | 275K-375K      |

Recordatorio: Cuando el conteo de ciclos alcanza 280k, ocurre un Vblank. Vblank ocurriendo durante el paso "5- Crea Pokémon sin IVS" causará el método Wild-2 (Salvaje-2). Vblank en el paso "7- Asignar Def, Ata, HP IVS" causa el método Wild-4 (Salvaje-4). Vblank que ocurriendo después o no Vblank causará Wild-1 (Salvaje 1).

Durante el paso "3- Preparar el encuentro salvaje", el código verifica la habilidad del Pokémon inicial de tu equipo varias veces. Esto toma un número variable de ciclos dependiendo del inicial.

Al usar un inicial en el equipo cuidadosamente seleccionado, podemos controlar qué método salvaje se activará.

| Paso                           | Inicial Más Rápido<br/> Wild-1 (Salvaje-1) | Inicial Rápido<br/>Wild-4 (Salvaje-4) | Inicial Lento<br/> Wild-2 (Salvaje-2) |
| ------------------------------ | ------------------------------------------ | ------------------------------------- | ------------------------------------- |
| 1- Actualizar audio & visual   | 50K                                        | 50K                                   | 50K                                   |
| 2- Actualizaciones misceláneas | 55K                                        | 55K                                   | 100K                                  |
| 3- Prepara encuentro salvaje   | 70K (Más Rápido)                           | 120K (Rápido)                         | 170K (Lento)                          |
| 4- Generar PID valido          | 80K                                        | 130K                                  | 180K                                  |
| 5- Crear Pokémon sin IVs       | 195K                                       | 245K                                  | 295K (VBlank)                         |
| 6- Generar Def, Ata, HP IVs    | 196K                                       | 246K                                  | ...                                   |
| 7- Asignar Def, Ata, HP IVs    | 235K                                       | 285K (VBlank)                         | ...                                   |
| 8- Generar DefE, AtaE, Vel IVs | 236K ...                                   | ...                                   | ...                                   |

### Determinando si el inicial es lento o rápido

Hay 2 factores que determinan si el inicial es lento o rápido:

- Si es que es un huevo
- Su PID

Si el inicial es un huevo, mucha lógica de generación de Pokémon es saltada, lo cual salva muchos ciclos. El PID del huevo no tiene impacto.

Si el inicial no es un huevo, el código realiza una operación modulo en su PID para obtener su habilidad. El numero de ciclos tomados por esta operación modulo depende del valor del PID.

- La operación modulo mas rápida posible es de 18 ciclos cuando el PID del inicial del equipo esta por debajo de 25.
- El mas lento es de 900 ciclos (Ejemplo para el PID 59999995).
- En promedio, esto toma 775 ciclos.

Un encuentro salvaje típico desencadena la operación modulo 80 veces.

- La diferencia total entre el mas rápido y el mas lento PID de inicial del equipo es de ~71K ciclos.
- La diferencia total entre un huevo y el PID mas lento es de ~100K ciclos.

Esta gran diferencia de ciclo es el porque podemos usar un inicial del equipo para controlar que método salvaje es desencadenado.

<Gen3PidSpeedCalculator />

### Encuentro Pokémon salvaje (Versión completa)

En realidad, la lógica de encuentro salvaje es mas compleja que la versión simplificada de arriba, porque la mayoría de los pasos toman un numero variable de ciclos.
Afortunadamente, en la mayoría de los casos, el numero de ciclos tomados cada paso puede ser precalculado.

| Step                           | Cycles     | Type          | Depends on                       |
| ------------------------------ | ---------- | ------------- | -------------------------------- |
| 1- Actualizar audio & visual   | 45K-65K    | Impredecible  | Frame de audio                   |
| 2- Actualizaciones misceláneas | 5K         | Precalculable | -                                |
| 3- Preparar encuentro salvaje  | 15K-115K   | Controlable   | Inicial de equipo                |
| 4- Generar PID valido          | 1K-1000K   | Precalculable | Estado del RNG (# Reroll de PID) |
| 5- Crear Pokémon sin IVs       | 36K-125K   | Precalculable | PID Generado del Pokémon         |
| 6- Generar Def, Ata, HP IVs    | 1K         | Precalculable | -                                |
| 7- Asignar Def, Ata, HP IVs    | 11K-43K    | Precalculable | PID Generado del Pokémon         |
| 8- Generar DefS, AtaS, Vel IVs | 1K         | Precalculable | -                                |
| 9- Asignar DefS, AtaS, Vel IVs | No importa |

El paso con mas variabilidad es el "4- Generar PID valido". En este paso, el juego genera una naturaleza aleatoria, y luego un PID es generado hasta que coincida con la naturaleza buscada. En algunos casos, esto puede tomar muchos reintentos. Si el inicial tiene la habilidad de Gran Encanto, entonces el PID generado deberá también coincidir el genero buscando, resultando en aun mas reintentos.

Si ese paso toma demasiados ciclos (ejemplo: 150k), desencadenar el Wild-1 (Salvaje-1) puede no ser posible, incluso con el inicial de equipo mas rápido. Usar un inicial de equipo rápido solo aumenta la probabilidad del Wild-1(Salvaje-1). Similarmente, si ese paso es demasiado rápido (Ejemplo: 1k ciclos) desencadenar el Wild-2(Salvaje-2) puede no ser posible, incluso con el mas lento de los iniciales de equipo.

Los ciclos de el paso "1- Actualizar audio & visual" depende del frame de audio, el cual depende del frame en el que el archivo de guardado fue cargado y de otros factores. Esto es imposible de predecir en consola y variara entre cada intento de manipulación del RNG.

### VBlank al generar un PID valido

Un VBlank ocurriendo durante el paso "4-Generar un PID valido" resultara en ya sea un Wild-3 o Wild-5 (Salvaje-3 o Salvaje-5). Aquellos métodos serán cubiertos en el siguiente articulo.

## Creditos

- RainingChain for the article.
- mGBA team for providing the emulator for cycle research.
- [pret team](https://github.com/pret/pokeemerald) for providing the decompil projects.
- El Terapagos Mexicano for the Spanish translation.
`;export{e as default};
