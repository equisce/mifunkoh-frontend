import { useState } from 'react'
import '../styles.css'

const slides = [ // Aquí definimos las diapositivas manualmente (texto, imagen y botón)
  {
    texto: '¡Corre, qué vuelan!',
    titulo: 'Liquidación de primavera\n¡Todo al 50%!',
    boton: 'Comprar ahora',
    imagen: '/imagenes/slider1.webp',
  },
  {
    texto: 'Recién llegados',
    titulo: 'Descubre nuestras\núltimas novedades',
    boton: '¡Vamos a explorar!',
    imagen: '/imagenes/slider2.webp',
  },
  {
    texto: 'Los clásicos',
    titulo: 'Porque estos\nnunca pasan de moda',
    boton: '¡Esto no me lo pierdo!',
    imagen: '/imagenes/slider3.webp',
  },
]

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="slider-container">
      <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
         {/* Mostramos solo una slide a la vez usando translateX */}
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <img src={slide.imagen} alt="Slide" className="slide-image" style={{ opacity: 1 }} />
            <div className="content-carousel">
              <p>{slide.texto}</p>
              <h2>{slide.titulo}</h2>
              <div className="button">{slide.boton}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="prev" onClick={prevSlide}>&#10094;
      </button>
      <button className="next" onClick={nextSlide}>&#10095;
      </button>
    </div>
  )
}

export default Slider
