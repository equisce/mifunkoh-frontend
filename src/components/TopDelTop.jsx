import { useEffect, useState } from 'react'
import { getFunkos } from '../services/funkosService'
import { Link } from 'react-router-dom'
import '../styles.css'

function TopDelTop() {
  const [funkos, setFunkos] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos')

  useEffect(() => {
    const cargarFunkos = async () => {
      const data = await getFunkos()
      setFunkos(data)
    }
    cargarFunkos()
  }, [])

  const categorias = ['Todos', 'Películas', 'Animación', 'Juegos', 'Series']

  const funkosFiltrados = categoriaSeleccionada === 'Todos'
    ? funkos
    : funkos.filter(funko =>
        funko.categoria?.some(
          cat => cat.toLowerCase() === categoriaSeleccionada.toLowerCase()
        )
      )

  return (
    <section className="top-del-top">
      <h2 className="section-title" style={{ marginBottom: '2rem' }}>
        ¡El top del top!
      </h2>

      <div className="categorias">
        {categorias.map(cat => (
          <button
            key={cat}
            className={categoriaSeleccionada === cat ? 'activo' : ''}
            onClick={() => setCategoriaSeleccionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="funkos-top-grid">
        {funkosFiltrados.length > 0 ? (
          funkosFiltrados.map(funko => (
            <div key={funko._id} className="funko-top-card">
              <img src={funko.imagen} alt={funko.nombre} />
              <h3>{funko.nombre}</h3>
              <p>{Number(funko.precio).toFixed(2)} €</p>
              <Link to={`/producto/${funko._id}`} className="btn-detalles">Ver producto</Link>
            </div>
          ))
        ) : (
          <p style={{ marginTop: '20px' }}>
            No hay funkos disponibles para esta categoría.
          </p>
        )}
      </div>
    </section>
  )
}

export default TopDelTop
