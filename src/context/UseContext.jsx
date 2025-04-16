import { createContext, useState, useContext, useEffect } from 'react'

const UserContext = createContext()

const usuarioPredefinido = {
  email: 'admin@funkos.com',
  password: 'funkopower',
  nombre: 'Amiguito'
}

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  // Al cargar la app, miramos si hay usuario guardado en localStorage
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario')
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado))
    }
  }, [])

  const login = (email, password) => {
    if (email === usuarioPredefinido.email && password === usuarioPredefinido.password) {
      setUsuario(usuarioPredefinido)
      localStorage.setItem('usuario', JSON.stringify(usuarioPredefinido))
      return true
    }
    return false
  }

  const logout = () => {
    setUsuario(null)
    localStorage.removeItem('usuario') // eliminamos del storage
  }

  return (
    <UserContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
