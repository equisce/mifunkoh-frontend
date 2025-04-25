import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'

import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Contacto from './pages/Contacto'
import Blog from './pages/Blog'
import Catalogo from './pages/Catalogo'
import Carrito from './pages/Carrito'
import Producto from './pages/Producto'
import Confirmacion from './pages/Confirmacion'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="blog" element={<Blog />} />
        <Route path="catalogo" element={<Catalogo />} />

        {/* Rutas protegidas */}
        <Route path="carrito" element={<ProtectedRoute><Carrito /></ProtectedRoute>} />
        <Route path="confirmacion" element={<ProtectedRoute><Confirmacion /></ProtectedRoute>} />
        <Route path="producto/:id" element={<ProtectedRoute><Producto /></ProtectedRoute>} />
        <Route path="admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
