import '../styles.css'
import { Link } from 'react-router-dom';


function FrikiBlog() {
  return (
    <section className="container blogs">
      <h1 className="heading-one">El Friki Blog</h1>
      <div className="container-blogs">
        {/* Entrada blog 1 */}
        <div className="card-blog">
          <div className="container-img">
            <img src="/imagenes/blog2.webp" alt="Funkos" loading="lazy" />
          </div>
          <div className="content-blog">
            <h3>Nuevos Funkos de Tus Cantantes Favoritos</h3>
            <span>10 abril 2025</span>
            <p>
              ¡Atención coleccionistas y melómanos! Han llegado a nuestra tienda
              los nuevos Funkos de edición especial de tus artistas favoritos.
              Desde leyendas del rock como Freddie Mercury hasta ídolos del pop
              como Taylor Swift, ahora puedes llevarte a casa a tus estrellas preferidas
              en versión miniatura. ¡Corre por el tuyo antes de que se agoten!
            </p>
            <Link to="/blog" className="btn-read-more">Leer más</Link>
          </div>
        </div>

        {/* Entrada blog 2 */}
        <div className="card-blog">
          <div className="container-img">
            <img src="/imagenes/blog1.webp" alt="Recreativas" loading="lazy" />
          </div>
          <div className="content-blog">
            <h3>Nueva Game Zone en Sevilla: Vuelve la magia de las recreativas</h3>
            <span>27 marzo 2025</span>
            <p>
              Los nostálgicos de los videojuegos están de enhorabuena:
              ¡ha abierto una nueva Game Zone en Sevilla con máquinas recreativas
              clásicas de SEGA, Nintendo y más! Disfruta de arcade vintage, pinballs
              y experiencias retro que te harán viajar en el tiempo.
              ¿Preparado para echar unas monedas y revivir la era dorada del gaming?
            </p>
            <div className="btn-read-more">Leer más</div>
          </div>
        </div>

        {/* Entrada blog 3 */}
        <div className="card-blog">
          <div className="container-img">
            <img src="/imagenes/blog3.webp" alt="Pokemon" loading="lazy" />
          </div>
          <div className="content-blog">
            <h3>Un Nuevo Pokémon al Estilo Game Boy Llega a PC</h3>
            <span>12 febrero 2025</span>
            <p>
              Pokémon regresa a sus raíces con un emocionante nuevo juego
              para PC que recrea la estética clásica de Game Boy y Game Boy Color.
              Con gráficos pixelados, interfaces vintage y mecánicas de juego que
              te recordarán a los primeros títulos de la saga. ¿Estás listo para
              revivir la magia de la vieja escuela en tu PC?
            </p>
            <div className="btn-read-more">Leer más</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FrikiBlog
