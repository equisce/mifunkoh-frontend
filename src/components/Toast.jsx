import { useEffect } from 'react'

function Toast({ mensaje, visible, setVisible }) {
  useEffect(() => { // Cuando el toast se activa, lo ocultamos automáticamente a los 5 seg.
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [visible, setVisible])

  return (
    visible && ( // Solo mostramos el mensaje si 'visible' es true
      <div className="toast">
        {mensaje}
      </div>
    )
  )
}

export default Toast
