import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const API_URL = import.meta.env.VITE_API_URL;

function RinconDelColeccionista() {
  const [funkos, setFunkos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/funkos`);
        const allFunkos = await res.json();
        const coleccionista = Array.isArray(allFunkos)
          ? allFunkos.filter(funko =>
              Array.isArray(funko.categoria) && funko.categoria.includes('coleccionista')
            )
          : [];
        setFunkos(coleccionista);
      } catch (error) {
        console.error("Error al obtener Funkos del coleccionista:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="top-del-top rincon-coleccionista">
      <h2 className="section-title">El rincón del coleccionista</h2>
      <p className="subtitulo-rincon">
        Descubre nuestras figuras más exclusivas, ediciones limitadas y rarezas de tu universo favorito.
      </p>
      <div className="funkos-top-grid">
        {Array.isArray(funkos) &&
          funkos.map(funko => (
            <div className="funko-top-card" key={funko._id}>
              <img src={funko.imagen} alt={funko.nombre} />
              <h3>{funko.nombre}</h3>
              <p>{Number(funko.precio).toFixed(2)} €</p>
              <Link to={`/producto/${funko._id}`} className="btn-detalles">Ver producto</Link>
            </div>
          ))}
      </div>
    </section>
  );
}

export default RinconDelColeccionista;
