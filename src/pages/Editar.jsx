import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Editar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', correo: '', carrera: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://18.217.194.220/usuarios/${id}`)
      .then(res => res.json())
      .then(data => setForm(data))
      .catch(() => setError('Error al obtener datos del usuario'));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://18.217.194.220/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Error al actualizar');

      alert('Usuario actualizado correctamente');
      navigate('/');
    } catch (err) {
      setError('Error al actualizar el usuario');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Editar Usuario</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="carrera"
          placeholder="Carrera"
          value={form.carrera}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Actualizar</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f4f4f4',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  error: {
    color: '#e74c3c',
    marginBottom: '10px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Editar;
