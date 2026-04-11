import{t as e}from"./jsx-runtime-MrBVUj-r.js";import{d as t}from"./index-Dx1x27-2.js";var n=e(),r=[{title:`Métodos 1-4 en Esmeralda`,navDrawerTitle:`Métodos 1-4`,description:`Qué es un método, la razón por la que existen los métodos 1-4 y cómo afectan la generación de Pokémon.`,slug:`es-gba-methods`,translation:{enSlug:`gba-methods`,language:`es`}}];function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{Gist:i,Text:a}=r;return i||o(`Gist`,!0),a||o(`Text`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:(0,n.jsx)(r.p,{children:`Lo esencial: ¿Qué es un método?, el motivo por el que existen los métodos 1 a
4 y cómo impactan en la generación de Pokémon.`})}),`
`,(0,n.jsx)(r.h3,{children:`Que es un método`}),`
`,(0,n.jsx)(r.p,{children:`Un método indica cómo se generará un Pokémon para un avance de RNG determinado.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.code,{children:`Avance RNG + método => resultado de la generación del Pokémon`})}),`
`,(0,n.jsx)(r.p,{children:`Un método se divide en 2 componentes (ej: Salvaje-2):`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Prefijo: Las instrucciones de la CPU del programa utilizadas para generarlo (ej.: Salvaje).`}),`
`,(0,n.jsx)(r.li,{children:`Sufijo: Cuándo ocurren los VBlanks (ej.: 2).`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Prefijo del método: Instrucciones de la CPU del programa`}),`
`,(0,n.jsx)(r.p,{children:`Las instrucciones de la CPU del programa dependen de cómo se encuentre el Pokémon. Para manipulaciones de RNG, tres son relevantes:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Pokémon estacionarios: El prefijo es "Método" (no es conveniente, lo sé...).`}),`
`,(0,n.jsx)(r.li,{children:`Pokémon salvajes: El prefijo es "Salvaje" o "H".`}),`
`,(0,n.jsx)(r.li,{children:`Pokémon huevo: El prefijo es "Huevo".`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Las instrucciones de la CPU para Pokémon estacionarios son las más sencillas. El juego de GBA genera PID y luego IV, sin lógica RNG adicional.`}),`
`,(0,n.jsx)(r.p,{children:`Las instrucciones para Pokémon salvajes determinan la especie encontrada de la Tabla de Encuentros, aplican la lógica de Sincronización del Pokémon líder del equipo, que puede forzar la generación de múltiples PID y luego generan IV.`}),`
`,(0,n.jsx)(r.p,{children:`Las instrucciones para Pokémon huevo seleccionan estadísticas heredadas de los progenitores y más. Esta guía no detalla la generación de Huevos.`}),`
`,(0,n.jsx)(r.h3,{children:`Método sufijo: ocurrencia de Vblank`}),`
`,(0,n.jsxs)(r.p,{children:[`Como se explica en `,(0,n.jsx)(r.a,{href:`/gba-vblank`,children:`Comprendiendo los Vblanks`}),`, los Vblanks pueden ocurrir aparentemente en cualquier momento, alterando la generación de Pokémon.`]}),`
`,(0,n.jsx)(r.p,{children:`La forma exacta en que se verá afectada la generación de Pokémon depende de si ocurre un Vblank y de la instrucción del programa.`}),`
`,(0,n.jsx)(r.p,{children:`Esto depende de muchos factores, como el mapa, la música de fondo, el PID principal, el juego jugado y cómo se juega (por ejemplo, a través de Pokémon Box Rubí y Zafiro).`}),`
`,(0,n.jsx)(r.h2,{children:`Lista de métodos`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Instrucciones`}),(0,n.jsx)(r.th,{children:`Métodos`}),(0,n.jsx)(r.th,{children:`Rareza`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Estacionario`}),(0,n.jsxs)(r.td,{children:[`Metodo-1`,(0,n.jsx)(`br`,{}),`Metodo-4`]}),(0,n.jsxs)(r.td,{children:[`Muy común`,(0,n.jsx)(`br`,{}),`Muy raro`]})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Salvaje`}),(0,n.jsxs)(r.td,{children:[`Salvaje-1`,(0,n.jsx)(`br`,{}),`Salvaje-2`,(0,n.jsx)(`br`,{}),`Salvaje-4`]}),(0,n.jsxs)(r.td,{children:[`Raro`,(0,n.jsx)(`br`,{}),`Común`,(0,n.jsx)(`br`,{}),`Poco común`]})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Huevo`}),(0,n.jsxs)(r.td,{children:[`Huevo-Normal`,(0,n.jsx)(`br`,{}),`Huevo-Dividido`,(0,n.jsx)(`br`,{}),`Huevo-Alternado`]}),(0,n.jsxs)(r.td,{children:[`Común`,(0,n.jsx)(`br`,{}),`Común`,(0,n.jsx)(`br`,{}),`Poco común`]})]})]})]}),`
`,(0,n.jsx)(r.h3,{children:`Métodos 1 y Salvaje 1`}),`
`,(0,n.jsx)(r.p,{children:`Aquí está la lógica del juego para generar un Pokémon:`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Paso`}),(0,n.jsx)(r.th,{children:`Avanzar en el paso Iniciar`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generar 1ra mitad del PID`}),(0,n.jsx)(r.td,{children:`1`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generar 2da mitad del PID`}),(0,n.jsx)(r.td,{children:`2`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generar Def, Ata, HP IVs`}),(0,n.jsx)(r.td,{children:`3`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generar DF.ESP, AT.ESP, VELOC. IVs`}),(0,n.jsx)(r.td,{children:`4`})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`Metodo-1 y Salvaje-1 es cuando un Pokémon es generado y no suceden VBlanks. El Pokémon es generado usando el valor de los avances del RNG 1, 2, 3, 4.`}),`
`,(0,n.jsx)(r.h3,{children:`Salvaje-2`}),`
`,(0,n.jsx)(r.p,{children:`Salvaje-2 es cuando un vblank ocurre entre los pasos "Generar 2da mitad del PID" y "Generar Def, Ata, HP IVs".`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Paso`}),(0,n.jsx)(r.th,{children:`Avance Al Paso Iniciar`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generar 1era mitad del PID`}),(0,n.jsx)(r.td,{children:`1`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generar 2da mitad del PID`}),(0,n.jsx)(r.td,{children:`2`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Green`,strong:!0,children:`VBLANK: Avance del RNG`})}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Green`,strong:!0,children:`3`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generar Def, Ata, HP IVs`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{strong:!0,children:`4`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generar DF. ESP, AT.ESP. VELOC, IVs`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{strong:!0,children:`5`})})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`El Pokémon es generado usando el valor de los avances del RNG 1,2,4, 5. El valor RNG del avance 3 no tiene impacto en el Pokémon generado.`}),`
`,(0,n.jsx)(r.h3,{children:`Metodo-4 y Salvaje-4`}),`
`,(0,n.jsx)(r.p,{children:`Metodo-4 y Salvaje-4 son cuando el vblank ocurre entre los pasos "Generar Def, Ata, HP IVs" y Generar DF. ESP, AT.ESP, VELOC, IVs`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Paso`}),(0,n.jsx)(r.th,{children:`Avance Al Paso Iniciar`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generar 1era mitad del PID`}),(0,n.jsx)(r.td,{children:`1`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generar 2da mitad del PID`}),(0,n.jsx)(r.td,{children:`2`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generar Def, Ata, HP IVs`}),(0,n.jsx)(r.td,{children:`3`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Green`,strong:!0,children:`VBLANK: Avance del RNG`})}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{color:`Green`,strong:!0,children:`4`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Generar DF. ESP, AT.ESP. VELOC, IVs`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(a,{strong:!0,children:`5`})})]})]})]}),`
`,(0,n.jsx)(r.p,{children:`El Pokémon es generado usando el valor de los avances del RNG 1,2,3, 5. El valor RNG del avance 4 no tiene impacto en el Pokémon generado.`}),`
`,(0,n.jsx)(r.h3,{children:`Métodos adicionales`}),`
`,(0,n.jsx)(r.p,{children:`En teoría, es posible que se produzcan VBlanks entre los pasos "Generar 1ra mitad del PID" y "Generar 2da mitad del PID", lo que resultaría en Salvaje-3. Sin embargo, como hay pocas instrucciones entre estos pasos, un VBlank muy rara vez ocurre aquí.`}),`
`,(0,n.jsx)(r.p,{children:`Es también teóricamente posible que VBlanks ocurran durante instrucciones muy específicas en la actualización del RNG, causando que esta se omitiera.`}),`
`,(0,n.jsx)(r.h3,{children:`Aprende mas`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/gba-methods-lead-impact`,children:`Impacto del Pokémon inicial en el equipo para encuentros salvajes en Esmeralda`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Credits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`RainingChain for the article.`}),`
`,(0,n.jsx)(r.li,{children:`Spanish translation: El Terapagos Mexicano.`}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default,r as frontmatter};