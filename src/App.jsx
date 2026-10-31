import { useState, useEffect } from 'react'
import Casilla from './components/Casilla'

// Nombres de los jugadores (toque dominicano)
const JUGADOR_X = 'Quisqueya'
const JUGADOR_O = 'Taíno'

// Todas las formas de ganar: 3 filas, 3 columnas y 2 diagonales
const LINEAS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

// Revisa el tablero y devuelve 'X' u 'O' si alguien ganó, o null si nadie
function calcularGanador(tablero) {
  for (let i = 0; i < LINEAS.length; i++) {
    const [a, b, c] = LINEAS[i]
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      return tablero[a]
    }
  }
  return null
}

// Lee lo que quedó guardado en el navegador (localStorage)
function leerGuardado(clave, valorInicial) {
  try {
    const texto = localStorage.getItem(clave)
    if (texto === null) return valorInicial
    return JSON.parse(texto)
  } catch (error) {
    return valorInicial
  }
}

function App() {
  const [tablero, setTablero] = useState(() => leerGuardado('tablero', Array(9).fill(null)))
  const [turnoX, setTurnoX] = useState(() => leerGuardado('turnoX', true))
  const [victoriasX, setVictoriasX] = useState(() => leerGuardado('victoriasX', 0))
  const [victoriasO, setVictoriasO] = useState(() => leerGuardado('victoriasO', 0))
  const [empates, setEmpates] = useState(() => leerGuardado('empates', 0))

  // Cada vez que algo cambia, lo guardamos en el navegador
  useEffect(() => {
    localStorage.setItem('tablero', JSON.stringify(tablero))
    localStorage.setItem('turnoX', JSON.stringify(turnoX))
    localStorage.setItem('victoriasX', JSON.stringify(victoriasX))
    localStorage.setItem('victoriasO', JSON.stringify(victoriasO))
    localStorage.setItem('empates', JSON.stringify(empates))
  }, [tablero, turnoX, victoriasX, victoriasO, empates])

  const ganador = calcularGanador(tablero)
  const empate = !ganador && tablero.every((casilla) => casilla !== null)

  function manejarClic(posicion) {
    // Si ya hay ganador o la casilla está ocupada, no pasa nada
    if (ganador || tablero[posicion]) return

    const nuevoTablero = [...tablero]
    nuevoTablero[posicion] = turnoX ? 'X' : 'O'
    setTablero(nuevoTablero)
    setTurnoX(!turnoX)

    // Revisamos si con esta jugada se terminó la partida para sumar al marcador
    const nuevoGanador = calcularGanador(nuevoTablero)
    if (nuevoGanador === 'X') {
      setVictoriasX(victoriasX + 1)
    } else if (nuevoGanador === 'O') {
      setVictoriasO(victoriasO + 1)
    } else if (nuevoTablero.every((casilla) => casilla !== null)) {
      setEmpates(empates + 1)
    }
  }

  function reiniciar() {
    setTablero(Array(9).fill(null))
    setTurnoX(true)
  }

  function reiniciarMarcador() {
    setVictoriasX(0)
    setVictoriasO(0)
    setEmpates(0)
    reiniciar()
  }

  // Mensaje que se muestra arriba del tablero
  let mensaje
  if (ganador) {
    const nombre = ganador === 'X' ? JUGADOR_X : JUGADOR_O
    mensaje = '¡Ganó ' + nombre + '! ¡Dímelo! 🇩🇴'
  } else if (empate) {
    mensaje = '¡Empate! Tremendo juego, a la próxima se decide 🇩🇴'
  } else {
    mensaje = 'Turno de ' + (turnoX ? JUGADOR_X + ' (X)' : JUGADOR_O + ' (O)')
  }

  return (
    <main className="juego">
      <h1>Tres en Raya 🇩🇴</h1>
      <p className="subtitulo">{JUGADOR_X} vs {JUGADOR_O}</p>

      <p className={'mensaje' + (ganador || empate ? ' final' : '')} role="status">
        {mensaje}
      </p>

      <div className="tablero">
        {tablero.map((valor, i) => (
          <Casilla key={i} numero={i + 1} valor={valor} onClick={() => manejarClic(i)} />
        ))}
      </div>

      <div className="marcador">
        <div className="caja azul">
          <span>{JUGADOR_X}</span>
          <strong>{victoriasX}</strong>
        </div>
        <div className="caja">
          <span>Empates</span>
          <strong>{empates}</strong>
        </div>
        <div className="caja rojo">
          <span>{JUGADOR_O}</span>
          <strong>{victoriasO}</strong>
        </div>
      </div>

      <div className="botones">
        <button className="boton" onClick={reiniciar}>Reiniciar</button>
        <button className="boton secundario" onClick={reiniciarMarcador}>Borrar marcador</button>
      </div>
    </main>
  )
}

export default App
