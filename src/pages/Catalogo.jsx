import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const API_URL = import.meta.env.VITE_API_URL;

function Catalogo() {
  const [funkos, setFunkos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const cargarFunkos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/funkos`);
        const data = await res.json();
        setFunkos(data);
      } catch (error) {
        console.error('Error al cargar funkos:', error);
      }
    };
    cargarFunkos();
  }, []);

  const categorias = ['Todos', 'Películas', 'Animación', 'Juegos', 'Series', 'Coleccionista'];

  const funkosFiltrados = Array.isArray(funkos)
    ? funkos.filter(funko => {
        const nombreCoincide = funko.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const categoriaCoincide =
          categoriaSeleccionada === 'Todos'
            ? true
            : Array.isArray(funko.categoria)
            ? funko.categoria.includes(categoriaSeleccionada.toLowerCase())
            : funko.categoria?.toLowerCase() === categoriaSeleccionada.toLowerCase();
        return nombreCoincide && categoriaCoincide;
      })
    : [];

  return (
    <main className="catalogo">
      <h1 className="section-title">Catálogo de Funkos</h1>

      <div className="barra-filtros">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />

        <div className="categorias">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={categoriaSeleccionada === cat ? 'activo' : ''}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="catalogo-grid">
        {funkosFiltrados.length > 0 ? (
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
  );
}

export default Catalogo;
