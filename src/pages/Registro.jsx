import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    carrera: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const SuccessNotification = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 0.5 }}
      >
        <path fill="#fff" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
      </motion.svg>
      <span>¡Registro exitoso! Redirigiendo...</span>
    </motion.div>
  );

  const ErrorNotification = ({ message }) => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 0.5 }}
      >
        <path fill="#fff" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
      </motion.svg>
      <span>{message || 'Error al registrar usuario'}</span>
    </motion.div>
  );

  const ConnectionErrorNotification = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 0.5 }}
      >
        <path fill="#fff" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
      </motion.svg>
      <span>Error de conexión con el servidor</span>
    </motion.div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://18.217.194.220/crear_usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.name,
          correo: formData.email,
          carrera: formData.carrera,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(<SuccessNotification />, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: {
            backgroundColor: '#10b981',
            color: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '500'
          }
        });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(<ErrorNotification message={data.message} />, {
          position: "top-center",
          theme: "colored",
          style: {
            backgroundColor: '#ef4444',
            color: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '500'
          }
        });
      }
    } catch (err) {
      toast.error(<ConnectionErrorNotification />, {
        position: "top-center",
        theme: "colored",
        style: {
          backgroundColor: '#ef4444',
          color: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
          padding: '16px 24px',
          fontSize: '16px',
          fontWeight: '500'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ top: '24px' }}
      />
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
              <path fill="#4f46e5" d="M12,3L2,12H5V20H19V12H22L12,3M12,7.7L16,11.2V18H13V14H11V18H8V11.2L12,7.7Z" />
            </svg>
            <motion.h2 style={styles.title}>
              Crear Cuenta
            </motion.h2>
          </motion.div>
          <motion.p 
            style={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Únete a nuestra comunidad
          </motion.p>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <AnimatePresence>
            {['name', 'email', 'carrera', 'password'].map((field, index) => (
              <motion.div
                key={field}
                style={styles.formGroup}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <label style={styles.label}>
                  {field === 'name' && (
                    <svg style={styles.inputIcon} viewBox="0 0 24 24">
                      <path fill="#64748b" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                    </svg>
                  )}
                  {field === 'email' && (
                    <svg style={styles.inputIcon} viewBox="0 0 24 24">
                      <path fill="#64748b" d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
                    </svg>
                  )}
                  {field === 'carrera' && (
                    <svg style={styles.inputIcon} viewBox="0 0 24 24">
                      <path fill="#64748b" d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
                    </svg>
                  )}
                  {field === 'password' && (
                    <svg style={styles.inputIcon} viewBox="0 0 24 24">
                      <path fill="#64748b" d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                    </svg>
                  )}
                  {field === 'name' && 'Nombre Completo'}
                  {field === 'email' && 'Correo Electrónico'}
                  {field === 'carrera' && 'Carrera'}
                  {field === 'password' && 'Contraseña'}
                </label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder={
                    field === 'name' ? 'Ej: Juan Pérez' :
                    field === 'email' ? 'Ej: usuario@correo.com' :
                    field === 'carrera' ? 'Ej: Ingeniería en Sistemas' :
                    'Crea una contraseña segura'
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
          
          <motion.button
            type="submit"
            style={isSubmitting ? styles.buttonDisabled : styles.button}
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
                Procesando...
              </div>
            ) : (
              <>
                <svg style={styles.buttonIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
                Registrarse
              </>
            )}
          </motion.button>
        </form>

        <motion.div
          style={styles.footer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p style={styles.footerText}>¿Ya tienes una cuenta?{' '}
            <motion.button 
              onClick={() => navigate('/login')} 
              style={styles.footerLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Inicia sesión aquí
            </motion.button>
          </p>
        </motion.div>
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
  },
  button: {
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    padding: '16px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 4px 6px rgba(79, 70, 229, 0.2)',
  },
  buttonIcon: {
    width: '20px',
    height: '20px',
  },
  buttonDisabled: {
    backgroundColor: '#c7d2fe',
    color: 'white',
    border: 'none',
    padding: '16px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'not-allowed',
    transition: 'all 0.3s ease',
    marginTop: '16px',
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
  footer: {
    marginTop: '24px',
    textAlign: 'center',
  },
  footerText: {
    color: '#64748b',
    fontSize: '14px',
  },
  footerLink: {
    color: '#4f46e5',
    fontWeight: '600',
    background: 'none',
    border: 'none',
    padding: '0',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px',
  },
};

export default Registro;