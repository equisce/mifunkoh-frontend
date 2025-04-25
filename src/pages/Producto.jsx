import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getFunkos } from '../services/funkosService'
import ModalImagen from '../components/ModalImagen'
import Toast from '../components/Toast'
import '../styles.css'
import { useCarrito } from '../context/CarritoContext'

function Producto() {
  const { id } = useParams()
  const [funko, setFunko] = useState(null)
  const [valoracion, setValoracion] = useState(0)
  const [pestaniaActiva, setPestaniaActiva] = useState('desc')
  const [mostrarModal, setMostrarModal] = useState(false)
  const [recomendaciones, setRecomendaciones] = useState([])
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMensaje, setToastMensaje] = useState('')

  const navigate = useNavigate()
  const { actualizarCantidad } = useCarrito()

  useEffect(() => {
    const fetchFunko = async () => {
      try {
        console.log("\ud83d\udd0d ID recibido desde useParams:", id)

        const todos = await getFunkos()
        const producto = todos.find(f => String(f._id) === String(id))
        if (!producto) {
          navigate('/catalogo')
          return
        }
        setFunko(producto)

        const mismos = todos.filter(f => f.categoria.includes(producto.categoria[0]) && f._id !== producto._id)
        const aleatorios = todos.filter(f => f._id !== producto._id)
        const sugerencias = mismos.length >= 3 ? mismos.slice(0, 3) : aleatorios.sort(() => 0.5 - Math.random()).slice(0, 3)
        setRecomendaciones(sugerencias)
      } catch (error) {
        console.error("Error al cargar el producto:", error)
      }
    }

    fetchFunko()
  }, [id, navigate])

  const manejarValoracion = (estrella) => {
    setValoracion(estrella)
  }

  const agregarAlCarrito = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || []
    const existe = carritoGuardado.find(f => f._id === funko._id)

    const actualizado = existe
      ? carritoGuardado.map(f => f._id === funko._id ? { ...f, cantidad: f.cantidad + 1 } : f)
      : [...carritoGuardado, { ...funko, cantidad: 1 }]

    localStorage.setItem('carrito', JSON.stringify(actualizado))
    actualizarCantidad()

    setToastMensaje('¡Producto añadido al carrito!')
    setToastVisible(true)
  }

  if (!funko || !funko._id) {
    return <p style={{ textAlign: 'center' }}>Cargando producto o no encontrado...</p>
  }

  return (
    <main className="producto-container">
      <section className="producto-detalle">
        <div className="imagen-producto">
          <img src={funko.imagen} alt={funko.nombre} onClick={() => setMostrarModal(true)} style={{ cursor: 'pointer' }} />
        </div>

        <div className="info-producto">
          <h1>{funko.nombre}</h1>

          <div className="estrellas">
            {[1, 2, 3, 4, 5].map((estrella) => (
              <i
                key={estrella}
                className={`fa-star ${valoracion >= estrella ? 'fa-solid active' : 'fa-regular'}`}
                onClick={() => manejarValoracion(estrella)}
              ></i>
            ))}
            {valoracion > 0 && (
              <span className="texto-valoracion">Has puntuado con {valoracion} estrella{valoracion > 1 ? 's' : ''}.</span>
            )}  
          </div>

          <p className="precio">{Number(funko.precio).toFixed(2)} €</p>
          <p className="descripcion-corta">{funko.descripcion}</p>

          <button className="btn-carrito" onClick={agregarAlCarrito}>
            Añadir al carrito
          </button>
        </div>
      </section>

      <section className="tabs-producto">
        <div className="tabs">
          <button className={`tab ${pestaniaActiva === 'desc' ? 'active' : ''}`} onClick={() => setPestaniaActiva('desc')}>Descripción</button>
          <button className={`tab ${pestaniaActiva === 'opiniones' ? 'active' : ''}`} onClick={() => setPestaniaActiva('opiniones')}>Opiniones</button>
          <button className={`tab ${pestaniaActiva === 'detalles' ? 'active' : ''}`} onClick={() => setPestaniaActiva('detalles')}>Detalles técnicos</button>
        </div>

        {pestaniaActiva === 'desc' && (
          <div className="tab-content active">
            <p>{funko.descripcion || 'Este producto no tiene descripción detallada aún.'}</p>
          </div>
        )}

        {pestaniaActiva === 'opiniones' && (
          <div className="tab-content active">
            {Array.isArray(funko.opiniones) && funko.opiniones.length > 0 ? (
              funko.opiniones.map((op, i) => (
                <p key={i}>{op}</p>
              ))
            ) : (
              <p>No hay opiniones disponibles todavía.</p>
            )}
          </div>
        )}

        {pestaniaActiva === 'detalles' && (
          <div className="tab-content active">
            <ul>
              <li>Altura: 9,5 cm</li>
              <li>Material: Vinilo</li>
              <li>Licencia oficial</li>
              <li>Incluye base transparente</li>
            </ul>
          </div>
        )}
      </section>

      <section className="productos-relacionados">
        <h2>También te podría gustar...</h2>
        <div className="grid-relacionados">
          {recomendaciones.map((item) => (
            <div key={item._id} className="producto-card">
              <img src={item.imagen} alt={item.nombre} />
              <h3>{item.nombre}</h3>
              <p className="precio">{item.precio.toFixed(2)} €</p>
              <Link to={`/producto/${item._id}`} className="btn-detalles">Ver producto</Link>
            </div>
          ))}
        </div>
      </section>

      <ModalImagen
        imagen={funko.imagen}
        alt={funko.nombre}
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
      />

      <Toast mensaje={toastMensaje} visible={toastVisible} setVisible={setToastVisible} />
    </main>
  )
}

export default Producto
