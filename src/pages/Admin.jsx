import { useEffect, useState } from 'react';
import '../styles.css';

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/funkos`, {
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
    const res = await fetch('http://localhost:4000/api/funkos');
    const data = await res.json();
    setFunkos(data);
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
      const res = await fetch(`http://localhost:4000/api/funkos/${funkoAEliminar}`, {
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
      const res = await fetch(`http://localhost:4000/api/funkos/${actualizado._id}`, {
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
      <h1>Área freak de administración</h1>
      <p style={{ marginBottom: '2rem' }}>Gestión de Funkos disponibles</p>
      {mensaje && <div className="alerta-exito">{mensaje}</div>}

      <h2>Añadir nuevo Funko</h2>
      <form className="form-admin" onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={nuevo.nombre} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" value={nuevo.precio} onChange={handleChange} required />
        <input type="text" name="imagen" placeholder="Imagen (URL)" value={nuevo.imagen} onChange={handleChange} required />
        <input type="text" name="categoria" placeholder="Categorías (separadas por coma)" value={nuevo.categoria} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={nuevo.descripcion} onChange={handleChange} required></textarea>
        <button type="submit" className="btn-crear">Crear Funko</button>
      </form>

      {mostrarConfirmacion && (
        <div className="modal-confirmacion">
          <div className="modal-contenido">
            <p>¿Estás seguro de que quieres eliminar este Funko?</p>
            <div className="modal-botones">
              <button className="btn-cancelar" onClick={cancelarEliminacion}>Cancelar</button>
              <button className="btn-confirmar" onClick={eliminarFunko}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}

      {modalEdicionAbierto && funkoAEditar && (
        <div className="modal-confirmacion">
          <div className="modal-contenido">
            <h3>Editar Funko</h3>
            <form className="form-admin" onSubmit={guardarEdicion}>
              <input type="text" name="nombre" value={funkoAEditar.nombre} onChange={handleEditarChange} required />
              <input type="number" name="precio" value={funkoAEditar.precio} onChange={handleEditarChange} required />
              <input type="text" name="imagen" value={funkoAEditar.imagen} onChange={handleEditarChange} required />
              <input type="text" name="categoria" value={Array.isArray(funkoAEditar.categoria) ? funkoAEditar.categoria.join(', ') : funkoAEditar.categoria} onChange={handleEditarChange} required />
              <textarea name="descripcion" value={funkoAEditar.descripcion} onChange={handleEditarChange} required></textarea>
              <div className="modal-botones">
                <button className="btn-cancelar" type="button" onClick={() => setModalEdicionAbierto(false)}>Cancelar</button>
                <button className="btn-confirmar" type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(funkos) && funkos.map((funko) => (
            <tr key={funko._id}>
              <td><img src={funko.imagen} alt={funko.nombre} width="50" /></td>
              <td>{funko.nombre}</td>
              <td>{Number(funko.precio).toFixed(2)} €</td>
              <td>{Array.isArray(funko.categoria) ? funko.categoria.join(', ') : funko.categoria}</td>
              <td>
                <button className="btn-delete" onClick={() => confirmarEliminacion(funko._id)}>Eliminar</button>
                <button className="btn-editar" onClick={() => abrirEdicion(funko)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Admin;
