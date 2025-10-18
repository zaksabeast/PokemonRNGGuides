const e=`---
- title: "Métodos 1-4 en Esmeralda"
  navDrawerTitle: "Métodos 1-4"
  description: "Qué es un método, la razón por la que existen los métodos 1-4 y cómo afectan la generación de Pokémon."
  slug: "es-gba-methods"
  translation:
    enSlug: "gba-methods"
    language: "es"
---

<Gist>
  Lo esencial: ¿Qué es un método?, el motivo por el que existen los métodos 1 a
  4 y cómo impactan en la generación de Pokémon.
</Gist>

### Que es un método

Un método indica cómo se generará un Pokémon para un avance de RNG determinado.

\`Avance RNG + método => resultado de la generación del Pokémon\`

Un método se divide en 2 componentes (ej: Salvaje-2):

- Prefijo: Las instrucciones de la CPU del programa utilizadas para generarlo (ej.: Salvaje).
- Sufijo: Cuándo ocurren los VBlanks (ej.: 2).

### Prefijo del método: Instrucciones de la CPU del programa

Las instrucciones de la CPU del programa dependen de cómo se encuentre el Pokémon. Para manipulaciones de RNG, tres son relevantes:

- Pokémon estacionarios: El prefijo es "Método" (no es conveniente, lo sé...).
- Pokémon salvajes: El prefijo es "Salvaje" o "H".
- Pokémon huevo: El prefijo es "Huevo".

Las instrucciones de la CPU para Pokémon estacionarios son las más sencillas. El juego de GBA genera PID y luego IV, sin lógica RNG adicional.

Las instrucciones para Pokémon salvajes determinan la especie encontrada de la Tabla de Encuentros, aplican la lógica de Sincronización del Pokémon líder del equipo, que puede forzar la generación de múltiples PID y luego generan IV.

Las instrucciones para Pokémon huevo seleccionan estadísticas heredadas de los progenitores y más. Esta guía no detalla la generación de Huevos.

### Método sufijo: ocurrencia de Vblank

Como se explica en [Comprendiendo los Vblanks](/gba-vblank), los Vblanks pueden ocurrir aparentemente en cualquier momento, alterando la generación de Pokémon.

La forma exacta en que se verá afectada la generación de Pokémon depende de si ocurre un Vblank y de la instrucción del programa.

Esto depende de muchos factores, como el mapa, la música de fondo, el PID principal, el juego jugado y cómo se juega (por ejemplo, a través de Pokémon Box Rubí y Zafiro).

## Lista de métodos

| Instrucciones | Métodos                                             | Rareza                         |
| ------------- | --------------------------------------------------- | ------------------------------ |
| Estacionario  | Metodo-1<br/>Metodo-4                               | Muy común<br/>Muy raro         |
| Salvaje       | Salvaje-1<br/>Salvaje-2<br/>Salvaje-4               | Raro<br/>Común<br/>Poco común  |
| Huevo         | Huevo-Normal<br/>Huevo-Dividido<br/>Huevo-Alternado | Común<br/>Común<br/>Poco común |

### Métodos 1 y Salvaje 1

Aquí está la lógica del juego para generar un Pokémon:

| Paso                               | Avanzar en el paso Iniciar |
| ---------------------------------- | -------------------------- |
| Generar 1ra mitad del PID          | 1                          |
| Generar 2da mitad del PID          | 2                          |
| Generar Def, Ata, HP IVs           | 3                          |
| Generar DF.ESP, AT.ESP, VELOC. IVs | 4                          |

Metodo-1 y Salvaje-1 es cuando un Pokémon es generado y no suceden VBlanks. El Pokémon es generado usando el valor de los avances del RNG 1, 2, 3, 4.

### Salvaje-2

Salvaje-2 es cuando un vblank ocurre entre los pasos "Generar 2da mitad del PID" y "Generar Def, Ata, HP IVs".

| Paso                                                     | Avance Al Paso Iniciar              |
| -------------------------------------------------------- | ----------------------------------- |
| Generar 1era mitad del PID                               | 1                                   |
| Generar 2da mitad del PID                                | 2                                   |
| <Text color="Green" strong>VBLANK: Avance del RNG</Text> | <Text color="Green" strong>3</Text> |
| Generar Def, Ata, HP IVs                                 | <Text strong>4</Text>               |
| Generar DF. ESP, AT.ESP. VELOC, IVs                      | <Text strong>5</Text>               |

El Pokémon es generado usando el valor de los avances del RNG 1,2,4, 5. El valor RNG del avance 3 no tiene impacto en el Pokémon generado.

### Metodo-4 y Salvaje-4

Metodo-4 y Salvaje-4 son cuando el vblank ocurre entre los pasos "Generar Def, Ata, HP IVs" y Generar DF. ESP, AT.ESP, VELOC, IVs

| Paso                                                     | Avance Al Paso Iniciar              |
| -------------------------------------------------------- | ----------------------------------- |
| Generar 1era mitad del PID                               | 1                                   |
| Generar 2da mitad del PID                                | 2                                   |
| Generar Def, Ata, HP IVs                                 | 3                                   |
| <Text color="Green" strong>VBLANK: Avance del RNG</Text> | <Text color="Green" strong>4</Text> |
| Generar DF. ESP, AT.ESP. VELOC, IVs                      | <Text strong>5</Text>               |

El Pokémon es generado usando el valor de los avances del RNG 1,2,3, 5. El valor RNG del avance 4 no tiene impacto en el Pokémon generado.

### Métodos adicionales

En teoría, es posible que se produzcan VBlanks entre los pasos "Generar 1ra mitad del PID" y "Generar 2da mitad del PID", lo que resultaría en Salvaje-3. Sin embargo, como hay pocas instrucciones entre estos pasos, un VBlank muy rara vez ocurre aquí.

Es también teóricamente posible que VBlanks ocurran durante instrucciones muy específicas en la actualización del RNG, causando que esta se omitiera.

### Aprende mas

- [Impacto del Pokémon inicial en el equipo para encuentros salvajes en Esmeralda](/gba-methods-lead-impact)

## Credits

- RainingChain for the article.
- Spanish translation: El Terapagos Mexicano.
`;export{e as default};
