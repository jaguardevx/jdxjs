# JDXJS

Es una librería JavaScript muy flexible (poco estricta) con el objetivo de gestionar el cambio de URL sin recargar la página, y administración de eventos según el patrón observador.

Escrita en TypeScript.

## Estructura de archivos

Para su funcionamiento se asume una estructura de archivos en la que para cada URL se cuenta con un script en la misma ruta, capaz remplazar la aplicación actual. Ejemplo: 

- index.html
- index.js
- pagina1.html
- pagina1.html.js
- seccion/
- seccion.js

## API

### clase `JDX`

Crea el objeto principal

#### Método `gurl(path)`

Devuelve una ruta absoluta a partir de una ruta relativa.

##### Parámetro `path`

`string`, path de la ruta relativa.

#### Ejemplos de uso

``` javascript
document.querySelector('a#link-1').addEventListener(
    'click', 
    function(){ jdx.cambiar( jdx.gurl('mi-ruta') ) }
);
```

``` html
<button onclick="jdx.cambiar('mi-ruta#/accion-app');">otro</button>
);
```
