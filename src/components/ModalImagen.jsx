import '../styles.css'
import { useEffect } from 'react'

function ModalImagen({ imagen, alt, visible, onClose }) {
  useEffect(() => {
    // Limpiamos cualquier imagen residual al cerrar el modal (dio problemas)
    return () => {
      const oldCanvas = document.getElementById('confetti-canvas')
      if (oldCanvas) oldCanvas.remove()
    }
  }, [])

  if (!visible) return null

  return (
    <div className="modal-img show" onClick={onClose}>
      <span className="cerrar-modal" onClick={onClose}>&times;</span>
      <img
        key={imagen} // Fuerza el rerender
        className="imagen-ampliada"
        src={imagen}
        alt={alt || 'Imagen ampliada'}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default ModalImagen
