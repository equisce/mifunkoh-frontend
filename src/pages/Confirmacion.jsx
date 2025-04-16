import '../styles.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { useCarrito } from '../context/CarritoContext'

function Confirmacion() {
  const [pedido, setPedido] = useState([])
  const [total, setTotal] = useState(0)
  const { actualizarCantidad } = useCarrito()

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('pedidoConfirmado')) // recuperamos los datos del pedido desde localStorage

    if (!datos || !datos.pedido || datos.pedido.length === 0) {
      setPedido([])
      setTotal(0)
      return
    }

    setPedido(datos.pedido)
    setTotal(datos.total || 0)

    confetti({ particleCount: 200, spread: 180, origin: { y: 0.4 } }) // lanza confeti al confirmar el pedido!! :D

    localStorage.removeItem('carrito')
    localStorage.removeItem('pedidoConfirmado')
    actualizarCantidad()
  }, [])

  return (
    <main className="confirmacion-container">
      <section className="mensaje-confirmacion">
        <h1>¡Gracias por tu compra!</h1>
        <p>
          Tu pedido ha sido confirmado y está siendo preparado con mucho mimo
          por nuestros frikis empedernidos.
        </p>
        <p>
          Recibirás un email con todos los detalles. Mientras tanto, puedes
          seguir navegando por MiFunk-oh! para descubrir más tesoros
          coleccionables.
        </p>
      </section>

      <section className="resumen-pedido">
        <h2>Resumen del pedido</h2>
        <ul>
          <li><strong>Número de pedido:</strong> #MF{Date.now()}</li>
          <li><strong>Fecha:</strong> {new Date().toLocaleDateString()}</li>
          <li><strong>Estado del pedido:</strong> ¡Confirmado! </li>
          <li><strong>Envío:</strong> En proceso de preparación...</li>
        </ul>
      </section>

      <Link to="/" className="btn-volver">Volver al inicio</Link>
    </main>
  )
}

export default Confirmacion