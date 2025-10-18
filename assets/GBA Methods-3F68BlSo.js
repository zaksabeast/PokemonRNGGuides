import{g7 as l,j as e}from"./index-Bqxr_cgm.js";const c=[{title:"Métodos 1-4 en Esmeralda",navDrawerTitle:"Métodos 1-4",description:"Qué es un método, la razón por la que existen los métodos 1-4 y cómo afectan la generación de Pokémon.",slug:"es-gba-methods",translation:{enSlug:"gba-methods",language:"es"}}];function d(r){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...l(),...r.components},{Gist:a,Text:s}=n;return a||o("Gist"),s||o("Text"),e.jsxs(e.Fragment,{children:[e.jsx(a,{children:e.jsx(n.p,{children:`Lo esencial: ¿Qué es un método?, el motivo por el que existen los métodos 1 a
4 y cómo impactan en la generación de Pokémon.`})}),`
`,e.jsx(n.h3,{children:"Que es un método"}),`
`,e.jsx(n.p,{children:"Un método indica cómo se generará un Pokémon para un avance de RNG determinado."}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"Avance RNG + método => resultado de la generación del Pokémon"})}),`
`,e.jsx(n.p,{children:"Un método se divide en 2 componentes (ej: Salvaje-2):"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Prefijo: Las instrucciones de la CPU del programa utilizadas para generarlo (ej.: Salvaje)."}),`
`,e.jsx(n.li,{children:"Sufijo: Cuándo ocurren los VBlanks (ej.: 2)."}),`
`]}),`
`,e.jsx(n.h3,{children:"Prefijo del método: Instrucciones de la CPU del programa"}),`
`,e.jsx(n.p,{children:"Las instrucciones de la CPU del programa dependen de cómo se encuentre el Pokémon. Para manipulaciones de RNG, tres son relevantes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Pokémon estacionarios: El prefijo es "Método" (no es conveniente, lo sé...).'}),`
`,e.jsx(n.li,{children:'Pokémon salvajes: El prefijo es "Salvaje" o "H".'}),`
`,e.jsx(n.li,{children:'Pokémon huevo: El prefijo es "Huevo".'}),`
`]}),`
`,e.jsx(n.p,{children:"Las instrucciones de la CPU para Pokémon estacionarios son las más sencillas. El juego de GBA genera PID y luego IV, sin lógica RNG adicional."}),`
`,e.jsx(n.p,{children:"Las instrucciones para Pokémon salvajes determinan la especie encontrada de la Tabla de Encuentros, aplican la lógica de Sincronización del Pokémon líder del equipo, que puede forzar la generación de múltiples PID y luego generan IV."}),`
`,e.jsx(n.p,{children:"Las instrucciones para Pokémon huevo seleccionan estadísticas heredadas de los progenitores y más. Esta guía no detalla la generación de Huevos."}),`
`,e.jsx(n.h3,{children:"Método sufijo: ocurrencia de Vblank"}),`
`,e.jsxs(n.p,{children:["Como se explica en ",e.jsx(n.a,{href:"/gba-vblank",children:"Comprendiendo los Vblanks"}),", los Vblanks pueden ocurrir aparentemente en cualquier momento, alterando la generación de Pokémon."]}),`
`,e.jsx(n.p,{children:"La forma exacta en que se verá afectada la generación de Pokémon depende de si ocurre un Vblank y de la instrucción del programa."}),`
`,e.jsx(n.p,{children:"Esto depende de muchos factores, como el mapa, la música de fondo, el PID principal, el juego jugado y cómo se juega (por ejemplo, a través de Pokémon Box Rubí y Zafiro)."}),`
`,e.jsx(n.h2,{children:"Lista de métodos"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Instrucciones"}),e.jsx(n.th,{children:"Métodos"}),e.jsx(n.th,{children:"Rareza"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Estacionario"}),e.jsxs(n.td,{children:["Metodo-1",e.jsx("br",{}),"Metodo-4"]}),e.jsxs(n.td,{children:["Muy común",e.jsx("br",{}),"Muy raro"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Salvaje"}),e.jsxs(n.td,{children:["Salvaje-1",e.jsx("br",{}),"Salvaje-2",e.jsx("br",{}),"Salvaje-4"]}),e.jsxs(n.td,{children:["Raro",e.jsx("br",{}),"Común",e.jsx("br",{}),"Poco común"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Huevo"}),e.jsxs(n.td,{children:["Huevo-Normal",e.jsx("br",{}),"Huevo-Dividido",e.jsx("br",{}),"Huevo-Alternado"]}),e.jsxs(n.td,{children:["Común",e.jsx("br",{}),"Común",e.jsx("br",{}),"Poco común"]})]})]})]}),`
`,e.jsx(n.h3,{children:"Métodos 1 y Salvaje 1"}),`
`,e.jsx(n.p,{children:"Aquí está la lógica del juego para generar un Pokémon:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Paso"}),e.jsx(n.th,{children:"Avanzar en el paso Iniciar"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generar 1ra mitad del PID"}),e.jsx(n.td,{children:"1"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generar 2da mitad del PID"}),e.jsx(n.td,{children:"2"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generar Def, Ata, HP IVs"}),e.jsx(n.td,{children:"3"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generar DF.ESP, AT.ESP, VELOC. IVs"}),e.jsx(n.td,{children:"4"})]})]})]}),`
`,e.jsx(n.p,{children:"Metodo-1 y Salvaje-1 es cuando un Pokémon es generado y no suceden VBlanks. El Pokémon es generado usando el valor de los avances del RNG 1, 2, 3, 4."}),`
`,e.jsx(n.h3,{children:"Salvaje-2"}),`
`,e.jsx(n.p,{children:'Salvaje-2 es cuando un vblank ocurre entre los pasos "Generar 2da mitad del PID" y "Generar Def, Ata, HP IVs".'}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Paso"}),e.jsx(n.th,{children:"Avance Al Paso Iniciar"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generar 1era mitad del PID"}),e.jsx(n.td,{children:"1"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generar 2da mitad del PID"}),e.jsx(n.td,{children:"2"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(s,{color:"Green",strong:!0,children:"VBLANK: Avance del RNG"})}),e.jsx(n.td,{children:e.jsx(s,{color:"Green",strong:!0,children:"3"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generar Def, Ata, HP IVs"}),e.jsx(n.td,{children:e.jsx(s,{strong:!0,children:"4"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generar DF. ESP, AT.ESP. VELOC, IVs"}),e.jsx(n.td,{children:e.jsx(s,{strong:!0,children:"5"})})]})]})]}),`
`,e.jsx(n.p,{children:"El Pokémon es generado usando el valor de los avances del RNG 1,2,4, 5. El valor RNG del avance 3 no tiene impacto en el Pokémon generado."}),`
`,e.jsx(n.h3,{children:"Metodo-4 y Salvaje-4"}),`
`,e.jsx(n.p,{children:'Metodo-4 y Salvaje-4 son cuando el vblank ocurre entre los pasos "Generar Def, Ata, HP IVs" y Generar DF. ESP, AT.ESP, VELOC, IVs'}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Paso"}),e.jsx(n.th,{children:"Avance Al Paso Iniciar"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generar 1era mitad del PID"}),e.jsx(n.td,{children:"1"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generar 2da mitad del PID"}),e.jsx(n.td,{children:"2"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generar Def, Ata, HP IVs"}),e.jsx(n.td,{children:"3"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(s,{color:"Green",strong:!0,children:"VBLANK: Avance del RNG"})}),e.jsx(n.td,{children:e.jsx(s,{color:"Green",strong:!0,children:"4"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Generar DF. ESP, AT.ESP. VELOC, IVs"}),e.jsx(n.td,{children:e.jsx(s,{strong:!0,children:"5"})})]})]})]}),`
`,e.jsx(n.p,{children:"El Pokémon es generado usando el valor de los avances del RNG 1,2,3, 5. El valor RNG del avance 4 no tiene impacto en el Pokémon generado."}),`
`,e.jsx(n.h3,{children:"Métodos adicionales"}),`
`,e.jsx(n.p,{children:'En teoría, es posible que se produzcan VBlanks entre los pasos "Generar 1ra mitad del PID" y "Generar 2da mitad del PID", lo que resultaría en Salvaje-3. Sin embargo, como hay pocas instrucciones entre estos pasos, un VBlank muy rara vez ocurre aquí.'}),`
`,e.jsx(n.p,{children:"Es también teóricamente posible que VBlanks ocurran durante instrucciones muy específicas en la actualización del RNG, causando que esta se omitiera."}),`
`,e.jsx(n.h3,{children:"Aprende mas"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/gba-methods-lead-impact",children:"Impacto del Pokémon inicial en el equipo para encuentros salvajes en Esmeralda"})}),`
`]}),`
`,e.jsx(n.h2,{children:"Credits"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"RainingChain for the article."}),`
`,e.jsx(n.li,{children:"Spanish translation: El Terapagos Mexicano."}),`
`]})]})}function t(r={}){const{wrapper:n}={...l(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(d,{...r})}):d(r)}function o(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{t as default,c as frontmatter};
