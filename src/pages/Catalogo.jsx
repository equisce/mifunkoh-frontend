import { useEffect, useState } from 'react'
import { getFunkos } from '../services/funkosService'
import { Link } from 'react-router-dom'
import '../styles.css'

function Catalogo() {
  const [funkos, setFunkos] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    const cargarFunkos = async () => {
      const data = await getFunkos()
      setFunkos(data)
    }
    cargarFunkos()
  }, [])

  const categorias = ['Todos', 'Películas', 'Animación', 'Juegos', 'Series', 'Coleccionista']

  const funkosFiltrados = funkos.filter((funko) => {  // Buscamos por nombre y filtramos por categoría al mismo tiempo
    const nombreCoincide = funko.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const categoriaCoincide =
      categoriaSeleccionada === 'Todos'
        ? true
        : Array.isArray(funko.categoria)
        ? funko.categoria.includes(categoriaSeleccionada.toLowerCase())
        : funko.categoria?.toLowerCase() === categoriaSeleccionada.toLowerCase()

    return nombreCoincide && categoriaCoincide
  })

  return (
    <main className="catalogo">
      <h1 className="section-title">Catálogo de Funkos</h1>

      <div className="barra-filtros">
         {/* Input de búsqueda + botones de categoría */}
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"></input>

        <div className="categorias">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={categoriaSeleccionada === cat ? 'activo' : ''}
              onClick={() => setCategoriaSeleccionada(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="catalogo-grid">
        {funkosFiltrados.length > 0 ? (   // si hay resultados tras filtrar, los mostramos
          funkosFiltrados.map((funko) => (
            <div key={funko._id} className="funko-top-card">
              <img src={funko.imagen} alt={funko.nombre} />
              <h3>{funko.nombre}</h3>
              <p>{Number(funko.precio).toFixed(2)} €</p>
              <Link to={`/producto/${funko._id}`} className="btn-detalles">Ver producto</Link>
            </div>
          ))
        ) : (
          <p style={{ marginTop: '2rem' }}>No hay Funkos disponibles.</p>
        )}
      </div>
    </main>
  )
}

export default Catalogo
