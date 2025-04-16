import '../styles.css';

function Blog() {
  return (
    <main className="blog-container">
      <h1>Nuevos Funkos de Tus Cantantes Favoritos</h1>
      <p className="date">Publicado el 7 de abril de 2025</p>

      <div className="blog-content">
        <p>
          ¡Atención coleccionistas y melómanos! Han llegado a nuestra tienda los nuevos Funkos 
          de edición especial de tus artistas favoritos. Desde leyendas del rock como 
          <strong> Freddie Mercury </strong> hasta ídolos del pop como <strong> Taylor Swift </strong>, 
          ahora puedes llevarte a casa a tus estrellas preferidas en versión miniatura. 
          ¡Corre por el tuyo antes de que se agoten!
        </p>

        <img
          src="/imagenes/Freddy.webp"
          alt="Funko Freddie Mercury"
          className="img-left"
          loading="lazy"></img>

        <p>
          Estos nuevos modelos incluyen detalles impresionantes, desde los atuendos icónicos de cada artista 
          hasta poses emblemáticas que los fans reconocerán al instante. Además, se han lanzado versiones exclusivas 
          con acabados metalizados y ediciones de coleccionista que solo estarán disponibles por tiempo limitado.
        </p>

        <img
          src="/imagenes/Taylor.webp"
          alt="Funko Taylor Swift"
          className="img-right"
          loading="lazy"></img>

        <p>
          En nuestra tienda online, queremos que los verdaderos fans puedan acceder a estas piezas únicas sin problemas, 
          por lo que ofreceremos descuentos exclusivos para nuestros clientes más fieles. 
        </p>

        <p className="parrafo-blog">
          ¡No pierdas la oportunidad de ampliar tu colección!<br />
          Recuerda seguirnos en nuestras redes sociales para más novedades y lanzamientos exclusivos. 
          ¡Nos vemos por los mundos de MiFunk-oh!
        </p>
      </div>
    </main>
  );
}

export default Blog;
