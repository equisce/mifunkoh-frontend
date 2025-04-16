import "../styles.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container-footer">
        {/* Columna 1: Marca y redes sociales */}
        <div className="footer-col footer-brand">
          <h3>MiFunk-oh!</h3>
          <p>
            Regístrate en nuestra newsletter y sé el primero en descubrir nuevas
            colecciones y ofertas exclusivas.
          </p>
          <button className="btn-suscribirme">Suscribirme</button>
          <div className="social-icons center-icons">
            <a href="#" className="facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="tiktok">
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>

        {/* Columna 2: Enlaces de contacto e información */}
        <div className="footer-col footer-links">
          <div className="col">
            <h4>Contacto</h4>
            <ul>
              <li>C/ Conde de Cifuentes, Sevilla</li>
              <li>Horario: 9:00 - 15:00 / 16:00 - 21:00</li>
              <li>Tel: 954 99 15 58</li>
              <li>Email: info@mifunkoh.com</li>
            </ul>
          </div>

          <div className="col">
            <h4>Información</h4>
            <ul>
              <li><a href="#">Sobre Nosotros</a></li>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">Privacidad</a></li>
              <li><a href="#">Términos</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="copyright">
        <p>Desarrollado por EquisCe &copy; 2025</p>
      </div>
    </footer>
  );
}

export default Footer;
