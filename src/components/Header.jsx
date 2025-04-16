import { useCarrito } from '../context/CarritoContext'
import { useUser } from '../context/UseContext'
import { Link } from 'react-router-dom'
import '../styles.css'

function Header() {
  const { cantidad } = useCarrito()
  const { usuario, logout } = useUser()

  return (
    <header>
      <div className="container-header">
        <div className="container header">
          <div className="customer-support">
            <i className="fa-solid fa-headset"></i>
            <div className="content-customer-support">
              <span className="txt">Atención al cliente</span>
              <span className="tlf">954 99 15 58</span>
            </div>
          </div>

          <div className="container-loguito">
            <i className="fa-solid fa-wand-sparkles"></i>
            <h1 className="loguito"><Link to="/">MiFunk-oh!</Link></h1>
          </div>

          <div className="container-user">
            {usuario ? (
              <div className="usuario-box">
                <span>Hola, {usuario.nombre}</span>
                <button className="btn-logout" onClick={logout}>Salir</button>
              </div>
            ) : (
              <Link to="/login" className="btn-log">
                <i className="fa-solid fa-user"></i>
                <span>Iniciar sesión</span>
              </Link>
            )}

            <Link to="/carrito" className="content-shopping">
              <i className="fa-solid fa-basket-shopping"></i>
              <span className="txt">Carrito ({cantidad})</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container-navbar">
        <nav className="navbar container">
          <i className="fa-solid fa-bars"></i>
          <ul className="menu">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>

          <form className="search-container">
            <input type="search" placeholder="Buscar..." />
            <button className="btn-search" aria-label="Buscar">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}

export default Header
