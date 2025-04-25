import { useEffect, useState } from 'react';
import '../styles.css';

const API_URL = import.meta.env.VITE_API_URL;

function Admin() {
  const [funkos, setFunkos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [funkoAEliminar, setFunkoAEliminar] = useState(null);
  const [funkoAEditar, setFunkoAEditar] = useState(null);
  const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false);

  const [nuevo, setNuevo] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    categoria: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const funkoNuevo = {
      ...nuevo,
      categoria: nuevo.categoria.split(',').map(cat => cat.trim())
    };

    try {
      const res = await fetch(`${API_URL}/api/funkos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(funkoNuevo)
      });

      if (!res.ok) throw new Error('Error al crear el Funko');

      setNuevo({ nombre: '', precio: '', imagen: '', categoria: '', descripcion: '' });
      cargarFunkos();
      setMensaje('Funko creado correctamente');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      alert('Error al crear el Funko');
      console.error(error);
    }
  };

  const cargarFunkos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/funkos`);
      const data = await res.json();
      setFunkos(data);
    } catch (error) {
      console.error('Error al cargar funkos:', error);
    }
  };

  useEffect(() => {
    cargarFunkos();
  }, []);

  const confirmarEliminacion = (id) => {
    setFunkoAEliminar(id);
    setMostrarConfirmacion(true);
  };

  const cancelarEliminacion = () => {
    setMostrarConfirmacion(false);
    setFunkoAEliminar(null);
  };

  const eliminarFunko = async () => {
    if (!funkoAEliminar) return;
    try {
      const res = await fetch(`${API_URL}/api/funkos/${funkoAEliminar}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Falló el borrado');
      setFunkos(prev => prev.filter(f => f._id !== funkoAEliminar));
      setMensaje('Funko eliminado correctamente');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      alert('Error al eliminar el Funko');
      console.error(error);
    } finally {
      cancelarEliminacion();
    }
  };

  const abrirEdicion = (funko) => {
    setFunkoAEditar(funko);
    setModalEdicionAbierto(true);
  };

  const handleEditarChange = (e) => {
    setFunkoAEditar({ ...funkoAEditar, [e.target.name]: e.target.value });
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();

    const actualizado = {
      ...funkoAEditar,
      categoria: typeof funkoAEditar.categoria === 'string'
        ? funkoAEditar.categoria.split(',').map(c => c.trim())
        : funkoAEditar.categoria
    };

    try {
      const res = await fetch(`${API_URL}/api/funkos/${actualizado._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actualizado)
      });

      if (!res.ok) throw new Error('Error al editar');

      setModalEdicionAbierto(false);
      setFunkoAEditar(null);
      cargarFunkos();
      setMensaje('Funko editado correctamente');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      alert('Error al editar el Funko');
      console.error(error);
    }
  };

  return (
    <section className="admin-page">
      {/* Todo tu renderizado visual (tabla, formularios, botones) sigue igual */}
      {/* No he tocado nada de lo visual, solo fetchs */}
      ...
    </section>
  );
}

export default Admin;
