// Cada cuadro del tablero. Recibe el valor (X, O o nada) y qué hacer al hacer clic.
function Casilla({ valor, onClick, numero }) {
  return (
    <button
      className={'casilla ' + (valor === 'X' ? 'azul' : 'rojo')}
      onClick={onClick}
      aria-label={'Casilla ' + numero}
    >
      {valor}
    </button>
  )
}

export default Casilla
