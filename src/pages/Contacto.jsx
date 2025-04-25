import { useState } from 'react'
import axios from 'axios'
import '../styles.css'
import Toast from '../components/Toast'

function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })

  const [showToast, setShowToast] = useState(false) // control de visibilidad del mensaje de éxito

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/mensajes`, formulario) // aquí se envía el mensaje al backend
      setShowToast(true)
      setFormulario({ nombre: '', email: '', mensaje: '' }) // reseteamos el formulario tras el envío
    } catch (error) {
      console.error('Error al enviar el mensaje:', error)
    }
  }

  return (
    <main className="contacto-container">
      <Toast mensaje="¡Has enviado tu mensaje!" visible={showToast} setVisible={setShowToast} />

      <section className="info-contacto">
        <h1 className="heading-one">¿Tienes dudas o sugerencias?</h1>
        <p>Estamos aquí para ayudarte. Completa el siguiente formulario o contáctanos directamente.</p>
        <ul>
          <li><i className="fa-solid fa-phone"></i> Teléfono: 954 99 15 58</li>
          <li><i className="fa-solid fa-envelope"></i> Email: info@mifunkoh.com</li>
          <li><i className="fa-solid fa-location-dot"></i> Dirección: C/ Conde de Cifuentes, Sevilla</li>
        </ul>
      </section>

      <section className="formulario-contacto">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formulario.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formulario.email}
              onChange={handleChange}
              required></input>
          </div>

          <div className="form-group full-width">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              value={formulario.mensaje}
              onChange={handleChange}
              required></textarea>
          </div>

          <div className="form-group full-width">
            <button type="submit" className="btn-enviar">Enviar mensaje</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Contacto
