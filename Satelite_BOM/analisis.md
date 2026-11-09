# Hito 0: Identificación de objetos predefinidos

## 1. Diferencia entre `window` y `Math` / `JSON`

`window` es el objeto global del **BOM** (Browser Object Model). Representa la ventana del navegador y es propio de este entorno: no existe en otros entornos como Node.js.

`Math` y `JSON` son **objetos nativos de JavaScript**. Funcionan igual en cualquier entorno donde se ejecute JavaScript.

**¿Por qué no hace falta escribir `window.Math`?**
Porque `window` es el objeto global y el navegador busca automáticamente en él cualquier identificador global. Escribir `Math` y `window.Math` es equivalente; la segunda forma es inecesario/excesivo.

## 2. Clasificación de las instrucciones

| Instrucción | Categoría | Justificación |
|---|---|---|
| `window.open()` | BOM | Método de `window` que abre una nueva ventana del navegador. |
| `parseFloat()` | Objeto nativo de JS | Función global estándar que convierte un string en número. |
| `Math.floor()` | Objeto nativo de JS | Método del objeto `Math` que redondea hacia abajo. |
| `navigator.userAgent` | BOM | Propiedad de `navigator` que informa del navegador y sistema del usuario. |