import { createContext, useContext, useState, useEffect } from 'react'

const CarritoContext = createContext()

export const CarritoProvider = ({ children }) => {
  const [cantidad, setCantidad] = useState(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []
    return carrito.reduce((sum, item) => sum + item.cantidad, 0)
  })
  

  useEffect(() => {
    actualizarCantidad()
  }, [])

  const actualizarCantidad = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []
    setCantidad(carrito.reduce((sum, item) => sum + item.cantidad, 0))
  }

  const vaciarCarrito = () => {
    localStorage.removeItem('carrito')
    actualizarCantidad()
  }

  return (
    <CarritoContext.Provider value={{ cantidad, actualizarCantidad, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  )
}

export const useCarrito = () => useContext(CarritoContext)
