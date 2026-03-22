# Debug Setup for .functions

## Configuración de Debug (F5)

### Opción 1: Abrir archivo directamente (Sin servidor)
1. Presiona **F5**
2. Selecciona **"Open index.html (Chrome)"**
3. La página se abrirá en Chrome
4. Los breakpoints funcionarán en `script.js`

### Opción 2: Con Live Server (Recomendado para desarrollo)
1. Instala la extensión **"Live Server"** de Ritwick Dey en VS Code
2. Haz clic derecho en `index.html` → **"Open with Live Server"**
3. Presiona **F5** → Selecciona **"Launch with Live Server (Chrome)"**

### Opción 3: Con servidor HTTP manual
1. Abre una terminal en la carpeta del proyecto
2. Ejecuta uno de estos comandos:
   ```bash
   # Python 3
   python -m http.server 8080
   
   # Node.js
   npx http-server -p 8080 -c-1
   ```
3. Presiona **F5** → Selecciona **"Launch Chrome against localhost"**

## Cómo usar breakpoints

1. Abre `script.js` en VS Code
2. Haz clic en el margen izquierdo junto a una línea de código para poner un **breakpoint** (círculo rojo)
3. Presiona **F5** y navega en la app
4. Cuando el código llegue al breakpoint, la ejecución se pausará
5. Usa el panel **Debug Console** para ver variables y logs

## Panel de Debug

- **Variables**: Ver valores de variables actuales
- **Watch**: Agregar expresiones a monitorear
- **Call Stack**: Ver la pila de llamadas
- **Debug Console**: Ver `console.log` y errores

## Atajos útiles

| Atajo | Acción |
|-------|--------|
| F5 | Iniciar debug |
| Shift+F5 | Detener debug |
| F9 | Toggle breakpoint |
| F10 | Step over (siguiente línea) |
| F11 | Step into (entrar en función) |
| Shift+F11 | Step out (salir de función) |
| Ctrl+Shift+F5 | Reiniciar debug |

## Notas

- Los logs de consola aparecen en el panel **Debug Console** de VS Code
- La extensión **"Live Server"** facilita el auto-refresh al guardar
- Para mejores resultados, usa **Chrome** o **Edge**
