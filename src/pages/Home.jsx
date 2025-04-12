import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchUsers();
    
    const intervalId = setInterval(fetchUsers, 5000);
    return () => clearInterval(intervalId);
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

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowConfirmDialog(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    
    setDeletingId(userToDelete.id);
    setShowConfirmDialog(false);
    
    try {
      const response = await fetch(`https://18.217.194.220/usuarios/${userToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar usuario');
      
      setTimeout(() => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
        setDeletingId(null);
        setUserToDelete(null);
      }, 500);
      
    } catch (err) {
      alert(err.message);
      setDeletingId(null);
      setUserToDelete(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Cargando usuarios...</p>
    </div>
  );

  if (error) return (
    <div style={styles.errorContainer}>
      <p style={styles.errorText}>{error}</p>
      <button style={styles.retryButton} onClick={fetchUsers}>Reintentar</button>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Custom Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && userToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.dialogOverlay}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={styles.confirmDialog}
            >
              <div style={styles.dialogHeader}>
                <svg style={styles.warningIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
                </svg>
                <h3 style={styles.dialogTitle}>Confirmar eliminación</h3>
              </div>
              <p style={styles.dialogText}>
                ¿Estás seguro de que deseas eliminar al usuario <strong style={styles.userHighlight}>{userToDelete.nombre}</strong>?
              </p>
              <div style={styles.dialogFooter}>
                <p style={styles.dialogWarning}>Esta acción no se puede deshacer</p>
                <div style={styles.dialogButtons}>
                  <button 
                    style={styles.cancelButton}
                    onClick={() => setShowConfirmDialog(false)}
                  >
                    Cancelar
                  </button>
                  <button 
                    style={styles.confirmDeleteButton}
                    onClick={handleDelete}
                  >
                    <svg style={styles.deleteIcon} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={styles.header}>
        <div style={styles.headerTop}>
          <div>
            <h2 style={styles.welcomeTitle}>
              Bienvenido, <span style={styles.userName}>{currentUser?.nombre}</span>
            </h2>
            <p style={styles.userRole}>{currentUser?.rol || 'Usuario'}</p>
          </div>
          <button style={styles.logoutButton} onClick={handleLogout}>
            <svg style={styles.logoutIcon} viewBox="0 0 24 24">
              <path fill="currentColor" d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
            </svg>
            Cerrar sesión
          </button>
        </div>
        <h3 style={styles.subtitle}>Usuarios registrados en el sistema</h3>
      </div>

      <div style={styles.usersContainer}>
        <AnimatePresence>
          {users.map((user) => (
            <motion.div
              key={user.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: deletingId === user.id ? 0.9 : 1,
                backgroundColor: deletingId === user.id ? 'rgba(231, 76, 60, 0.1)' : '#ffffff'
              }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              style={styles.userCard}
            >
              <div style={styles.userInfo}>
                <div style={styles.userHeader}>
                  <p style={styles.userName}>{user.nombre}</p>
                  <span style={styles.userId}>ID: {user.id}</span>
                </div>
                
                <div style={styles.infoRow}>
                  <svg style={styles.icon} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
                  </svg>
                  <p style={styles.userEmail}>{user.correo}</p>
                </div>
                
                <div style={styles.infoRow}>
                  <svg style={styles.icon} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                  </svg>
                  <p style={styles.userCareer}>{user.carrera || 'No especificada'}</p>
                </div>
                
                <div style={styles.buttonGroup}>
                  <button 
                    style={styles.editBtn} 
                    onClick={() => navigate(`/editar/${user.id}`)}
                  >
                    <svg style={styles.editIcon} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                    </svg>
                    Editar
                  </button>
                  <button 
                    style={{
                      ...styles.deleteBtn,
                      backgroundColor: deletingId === user.id ? '#c0392b' : '#e74c3c'
                    }} 
                    onClick={() => confirmDelete(user)}
                    disabled={deletingId === user.id}
                  >
                    {deletingId === user.id ? (
                      <span style={styles.deletingText}>
                        <svg style={styles.loadingIcon} viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                        </svg>
                        Eliminando...
                      </span>
                    ) : (
                      <>
                        <svg style={styles.deleteIcon} viewBox="0 0 24 24">
                          <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                        Eliminar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    position: 'relative',
  },
  header: {
    marginBottom: '40px',
    textAlign: 'center',
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  welcomeTitle: {
    color: '#2c3e50',
    fontSize: '28px',
    margin: 0,
    fontWeight: '600',
  },
  userRole: {
    color: '#7f8c8d',
    fontSize: '14px',
    margin: '5px 0 0',
    fontWeight: '500',
  },
  userName: {
    color: '#3498db',
    fontWeight: '700',
  },
  subtitle: {
    color: '#7f8c8d',
    fontSize: '18px',
    fontWeight: '400',
    margin: 0,
  },
  usersContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '25px',
  },
  userCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '25px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  userHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  userId: {
    color: '#95a5a6',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: '#f0f2f5',
    padding: '3px 8px',
    borderRadius: '10px',
  },
  userInfo: {
    lineHeight: '1.6',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    margin: '12px 0',
    gap: '10px',
  },
  icon: {
    width: '20px',
    height: '20px',
    color: '#7f8c8d',
  },
  userEmail: {
    color: '#3498db',
    fontSize: '15px',
    margin: 0,
    wordBreak: 'break-all',
  },
  userCareer: {
    color: '#27ae60',
    fontSize: '15px',
    margin: 0,
    fontWeight: '500',
  },
  buttonGroup: {
    marginTop: '20px',
    display: 'flex',
    gap: '12px',
  },
  editBtn: {
    backgroundColor: '#2980b9',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    ':hover': {
      backgroundColor: '#2472a4',
    },
  },
  editIcon: {
    width: '16px',
    height: '16px',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    ':hover': {
      backgroundColor: '#c0392b',
    },
  },
  deleteIcon: {
    width: '16px',
    height: '16px',
  },
  loadIcon: {
    width: '16px',
    height: '16px',
    animation: 'spin 1s linear infinite',
  },
  deletingText: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoutButton: {
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    ':hover': {
      backgroundColor: '#7f8c8d',
      transform: 'translateY(-2px)',
    },
  },
  logoutIcon: {
    width: '18px',
    height: '18px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f7fa',
  },
  loadingText: {
    marginTop: '20px',
    color: '#2c3e50',
    fontSize: '18px',
  },
  spinner: {
    border: '5px solid rgba(0, 0, 0, 0.1)',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    borderLeftColor: '#3498db',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '20px',
    textAlign: 'center',
  },
  errorText: {
    color: '#e74c3c',
    fontWeight: '500',
    fontSize: '18px',
    marginBottom: '20px',
  },
  retryButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#2980b9',
    },
  },
  dialogOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(3px)',
  },
  confirmDialog: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    width: '90%',
    maxWidth: '450px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  },
  dialogHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  warningIcon: {
    width: '32px',
    height: '32px',
    color: '#f39c12',
  },
  dialogTitle: {
    color: '#2c3e50',
    fontSize: '20px',
    margin: 0,
    fontWeight: '600',
  },
  dialogText: {
    color: '#34495e',
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '25px',
  },
  userHighlight: {
    color: '#e74c3c',
    fontWeight: '600',
  },
  dialogFooter: {
    borderTop: '1px solid #ecf0f1',
    paddingTop: '20px',
  },
  dialogWarning: {
    color: '#95a5a6',
    fontSize: '14px',
    marginTop: 0,
    marginBottom: '20px',
    fontStyle: 'italic',
  },
  dialogButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
  },
  cancelButton: {
    backgroundColor: '#ecf0f1',
    color: '#7f8c8d',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#d5dbdb',
    },
  },
  confirmDeleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    ':hover': {
      backgroundColor: '#c0392b',
    },
  },
};

// Add the spin animation globally
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default Home;