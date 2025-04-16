import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UseContext'
import '../styles.css'

function Login() {
  const { login } = useUser()
  const navigate = useNavigate()
  const [formulario, setFormulario] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = login(formulario.email, formulario.password) // intento de login con los datos introducidos
    if (success) {
      navigate('/')
    } else {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <main className="contacto-container">
      <h1 className="heading-one">Iniciar sesión</h1>
      <form className="formulario-contacto" onSubmit={handleSubmit}>
        <div className="form-group full-width">
          <label>Email:</label>
          <input type="email" name="email" value={formulario.email} onChange={handleChange} required />
        </div>
        <div className="form-group full-width">
          <label>Contraseña:</label>
          <input type="password" name="password" value={formulario.password} onChange={handleChange} required />
        </div>
        {/* mensaje en rojo si el login falla*/}
        {error && <p style={{ color: 'crimson', fontSize: '1.4rem' }}>{error}</p>}
        <div className="form-group">
          <button type="submit" className="btn-login">Entrar</button>
        </div>
      </form>
    </main>
  )
}

export default Login
