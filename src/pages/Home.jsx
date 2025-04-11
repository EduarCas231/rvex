import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://18.217.194.220/usuarios');
      if (!response.ok) throw new Error('Error al obtener usuarios');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este usuario?');
    if (!confirm) return;

    try {
      const response = await fetch(`https://18.217.194.220/usuarios/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar usuario');
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p>Cargando usuarios...</p>
    </div>
  );

  if (error) return (
    <div style={styles.errorContainer}>
      <p style={styles.errorText}>{error}</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.welcomeTitle}>
          Bienvenido, <span style={styles.userName}>{currentUser?.nombre}</span>
        </h2>
        <h3 style={styles.subtitle}>Usuarios registrados en el sistema</h3>
      </div>

      <div style={styles.usersContainer}>
        {users.map((user) => (
          <div key={user.id} style={styles.userCard}>
            <div style={styles.userInfo}>
              <p style={styles.userName}>{user.nombre}</p>
              <p style={styles.userEmail}>{user.correo}</p>
              <p style={styles.userCareer}>{user.carrera}</p>
              <div style={styles.buttonGroup}>
                <button style={styles.editBtn} onClick={() => navigate(`/editar/${user.id}`)}>Editar</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(user.id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '30px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  welcomeTitle: {
    color: '#2c3e50',
    fontSize: '28px',
    marginBottom: '10px',
  },
  userName: {
    color: '#3498db',
    fontWeight: '600',
  },
  subtitle: {
    color: '#7f8c8d',
    fontSize: '18px',
    fontWeight: '400',
  },
  usersContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
    padding: '20px',
  },
  userInfo: {
    lineHeight: '1.6',
  },
  userEmail: {
    color: '#3498db',
    fontSize: '14px',
    margin: '5px 0',
  },
  userCareer: {
    color: '#27ae60',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  buttonGroup: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
  },
  editBtn: {
    backgroundColor: '#2980b9',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
  },
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    borderLeftColor: '#3498db',
    animation: 'spin 1s linear infinite',
    marginBottom: '15px',
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    backgroundColor: '#fdecea',
    borderRadius: '8px',
    margin: '20px',
  },
  errorText: {
    color: '#e74c3c',
    fontWeight: '500',
  },
};

export default Home;
