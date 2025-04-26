import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import '../styles.css'

function Carrito() {
  const [carrito, setCarrito] = useState([])
  const [total, setTotal] = useState(0)
  const { actualizarCantidad: actualizarCantidadGlobal } = useCarrito()

  // ✅ Recargar carrito desde localStorage al inicio
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('carrito')) || []
    setCarrito(stored)
    actualizarCantidadGlobal()
  }, [])

  // ✅ Recalcular el total cuando cambia el carrito
  useEffect(() => {
    const totalCalculado = carrito.reduce(
      (acc, f) => acc + f.precio * f.cantidad,
      0
    )
    setTotal(totalCalculado)
  }, [carrito])

  const actualizarCantidad = (id, cantidad) => {
    const actualizado = carrito.map(f =>
      f._id === id ? { ...f, cantidad: Number(cantidad) } : f
    )
    setCarrito(actualizado)
    localStorage.setItem('carrito', JSON.stringify(actualizado))
    actualizarCantidadGlobal()
  }

  const eliminarProducto = (id) => {
    const actualizado = carrito.map(f => {
      if (f._id === id) {
        if (f.cantidad > 1) {
          return { ...f, cantidad: f.cantidad - 1 }
        } else {
          return null
        }
      }
      return f
    }).filter(Boolean)

    setCarrito(actualizado)
    localStorage.setItem('carrito', JSON.stringify(actualizado))
    actualizarCantidadGlobal()
  }

  const handleFinalizarPedido = () => {
    const pedidoConfirmado = {
      pedido: carrito,
      total: total
    }

    localStorage.setItem('pedidoConfirmado', JSON.stringify(pedidoConfirmado))
    console.log("✅ Pedido guardado:", pedidoConfirmado)
  }

  return (
    <main className="carrito-container">
      <h1 className="heading-one">Tu carrito de Funkos</h1>

      <section className="tabla-carrito">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item) => (
              <tr key={item._id}>
                <td><img src={item.imagen} alt={item.nombre} /></td>
                <td>{item.nombre}</td>
                <td>{Number(item.precio).toFixed(2)}€</td>
                <td>
                  <input
                    type="number"
                    value={item.cantidad}
                    min="1"
                    onChange={(e) => actualizarCantidad(item._id, e.target.value)}
                  />
                </td>
                <td>{(item.precio * item.cantidad).toFixed(2)}€</td>
                <td>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarProducto(item._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="resumen-carrito">
        <h2>Resumen</h2>
        <p>Subtotal: <span>{total.toFixed(2)}€</span></p>
        <p>Envío: <span>Gratis</span></p>
        <p className="total">Total: <strong>{total.toFixed(2)}€</strong></p>
        <Link
          to="/confirmacion"
          onClick={handleFinalizarPedido}
          className="btn-confirmar"
        >
          Finalizar pedido
        </Link>
      </section>
    </main>
  )
}

export default Carrito
