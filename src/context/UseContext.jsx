import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // Al cargar la app, miramos si hay usuario guardado en localStorage
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Login real conectado con el backend
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Credenciales inválidas:', data?.mensaje);
        return false;
      }

      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      localStorage.setItem('token', data.token);
      setUsuario(data.usuario);
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
