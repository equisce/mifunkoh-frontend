import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function RinconDelColeccionista() {
  const [funkos, setFunkos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:4000/api/funkos');
      const allFunkos = await res.json();
      const coleccionista = Array.isArray(allFunkos)
        ? allFunkos.filter(funko =>
            Array.isArray(funko.categoria) && funko.categoria.includes('coleccionista')
          )
        : [];
      setFunkos(coleccionista);
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
