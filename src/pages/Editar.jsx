import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Editar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    nombre: '', 
    correo: '', 
    carrera: '' 
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' o 'error'

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://18.217.194.220/usuarios/${id}`);
        if (!response.ok) throw new Error('Error al obtener datos del usuario');
        const data = await response.json();
        setForm(data);
      } catch (err) {
        showCustomAlert(err.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const showCustomAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://18.217.194.220/usuarios/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Error al actualizar usuario');

      showCustomAlert('Usuario actualizado correctamente', 'success');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      showCustomAlert(err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Cargando datos del usuario...</p>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Alerta personalizada */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            style={{
              ...styles.alert,
              backgroundColor: alertType === 'success' ? '#27ae60' : '#e74c3c'
            }}
          >
            <div style={styles.alertContent}>
              <svg 
                style={styles.alertIcon} 
                viewBox="0 0 24 24"
                fill="white"
              >
                {alertType === 'success' ? (
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                ) : (
                  <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                )}
              </svg>
              <span style={styles.alertText}>{alertMessage}</span>
              <button 
                onClick={() => setShowAlert(false)}
                style={styles.alertCloseButton}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.card}
      >
        <div style={styles.header}>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            style={styles.logoContainer}
          >
            <svg style={styles.logoIcon} viewBox="0 0 24 24">
              <path fill="#4f46e5" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
            </svg>
            <motion.h2 style={styles.title}>
              Editar Usuario
            </motion.h2>
          </motion.div>
          <motion.p 
            style={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Actualiza la información del usuario
          </motion.p>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <AnimatePresence>
            {['nombre', 'correo', 'carrera'].map((field, index) => (
              <motion.div
                key={field}
                style={styles.formGroup}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <label style={styles.label}>
                  {field === 'nombre' && (
                    <svg style={styles.inputIcon} viewBox="0 0 24 24">
                      <path fill="#64748b" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                    </svg>
                  )}
                  {field === 'correo' && (
                    <svg style={styles.inputIcon} viewBox="0 0 24 24">
                      <path fill="#64748b" d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
                    </svg>
                  )}
                  {field === 'carrera' && (
                    <svg style={styles.inputIcon} viewBox="0 0 24 24">
                      <path fill="#64748b" d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
                    </svg>
                  )}
                  {field === 'nombre' && 'Nombre Completo'}
                  {field === 'correo' && 'Correo Electrónico'}
                  {field === 'carrera' && 'Carrera'}
                </label>
                <input
                  type={field === 'correo' ? 'email' : 'text'}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder={
                    field === 'nombre' ? 'Ej: Juan Pérez' :
                    field === 'correo' ? 'Ej: usuario@correo.com' :
                    'Ej: Ingeniería en Sistemas'
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
          
          <div style={styles.buttonGroup}>
            <motion.button
              type="button"
              style={styles.cancelButton}
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <svg style={styles.buttonIcon} viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
              Cancelar
            </motion.button>
            <motion.button
              type="submit"
              style={isSubmitting ? styles.buttonDisabled : styles.submitButton}
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {isSubmitting ? (
                <div style={styles.loadingContainer}>
                  <motion.div
                    style={styles.spinner}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Actualizando...
                </div>
              ) : (
                <>
                  <svg style={styles.buttonIcon} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                  </svg>
                  Actualizar
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
    padding: '20px',
    position: 'relative',
  },
  alert: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '15px 25px',
    borderRadius: '8px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '300px',
    maxWidth: '90%',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
  alertContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    width: '100%',
  },
  alertIcon: {
    width: '24px',
    height: '24px',
    flexShrink: 0,
  },
  alertText: {
    flex: 1,
    fontSize: '15px',
    fontWeight: '500',
  },
  alertCloseButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    marginLeft: '15px',
    display: 'flex',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    width: '100%',
    maxWidth: '480px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
  },
  title: {
    color: '#1e293b',
    fontSize: '28px',
    fontWeight: '700',
    margin: 0,
  },
  subtitle: {
    color: '#64748b',
    fontSize: '14px',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    position: 'relative',
  },
  label: {
    color: '#334155',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  inputIcon: {
    width: '18px',
    height: '18px',
  },
  input: {
    padding: '14px 14px 14px 40px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    backgroundColor: '#f8fafc',
    outline: 'none',
    ':focus': {
      borderColor: '#4f46e5',
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.2)',
    },
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    marginTop: '20px',
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    border: 'none',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    ':hover': {
      backgroundColor: '#e2e8f0',
    },
  },
  submitButton: {
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 4px 6px rgba(79, 70, 229, 0.2)',
    ':hover': {
      backgroundColor: '#4338ca',
    },
  },
  buttonIcon: {
    width: '20px',
    height: '20px',
  },
  buttonDisabled: {
    backgroundColor: '#c7d2fe',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'not-allowed',
    transition: 'all 0.3s ease',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
  },
  loadingContainerFull: {
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
};

export default Editar;