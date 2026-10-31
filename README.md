# Tres en Raya Dominicano 🇩🇴

**Nombre completo:** Jordany Sosa 
**Materia:** Lenguaje de Programación III (INF5160-18)

## Descripción del juego
Es el clásico Tres en Raya hecho con React. Juegan **Quisqueya (X)** contra **Taíno (O)** en un tablero de 3x3.
El juego alterna los turnos, detecta quién gana o si hay empate, y tiene un botón **Reiniciar** para empezar otra partida.
El fondo y los colores son los de la bandera dominicana, y al ganar sale el mensaje "¡Ganó ...! ¡Dímelo!".
Además lleva un marcador de victorias y empates, y todo se guarda en el navegador (`localStorage`), así que si recargas la página la partida sigue donde estaba.

## Cómo ejecutarlo
```bash
npm install
npm run dev
```
Luego abre la dirección que aparece en la terminal (normalmente http://localhost:5173).

## Estructura
- `src/App.jsx`: lógica del juego (estado, turnos, ganador, reinicio y guardado).
- `src/components/Casilla.jsx`: componente de cada cuadro del tablero.
- `src/App.css`: estilos con los colores de la bandera.

## Que aprendí
Aprendí a crear mi primer juego con React. Entendí que un componente es como una pieza
que se puede reusar, y que las props sirven para pasarle datos, como cuando le paso a
cada casilla si lleva X, O o está vacía. También aprendí a usar useState para que el
juego se acuerde del tablero, de a quién le toca y del marcador, y useEffect junto con
localStorage para que la partida no se pierda cuando recargo la página.

## Que parte fue más difícil
Lo más complicado fue detectar al ganador. Tuve que entender que hay 8 formas de ganar
(3 filas, 3 columnas y 2 diagonales) y recorrerlas todas para ver si había tres iguales.
También me costó entender que en React no se debe cambiar el arreglo directamente, sino
hacer una copia con [...tablero] y después actualizar el estado. Otra cosa difícil fue que
no se pudiera seguir jugando cuando ya había un ganador, y que el marcador sumara solo
una vez por partida.

## Que fue lo más entretenido
Lo más entretenido fue ponerle el toque dominicano: los colores de la bandera, los nombres
de los jugadores y el mensaje de "¡Dímelo!" cuando alguien gana. También me gustó probar
el empate y ver cómo el marcador subía solo. Fue chévere ver el juego funcionando después
de escribir el código.