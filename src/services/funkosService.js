// Importamos Axios para hacer peticiones HTTP
import axios from 'axios';

// Definimos la URL base de la API
const API_URL = import.meta.env.VITE_API_URL;

/* Obtener todos los Funkos desde la API */
export const getFunkos = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/funkos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener funkos:', error.message);
    if (error.response) {
      console.error('Error de respuesta:', error.response.data);
    } else if (error.request) {
      console.error('Error de petición (no hay respuesta):', error.request);
    } else {
      console.error('Error desconocido:', error);
    }
    return [];
  }
};

/* Obtener Funkos filtrados por categoría (películas, animación, juegos, etc.) */
export const getFunkosPorCategoria = async (categoria) => {
  try {
    const response = await axios.get(`${API_URL}/api/funkos?categoria=${categoria}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener funkos por categoría "${categoria}":`, error.message);
    return [];
  }
};
