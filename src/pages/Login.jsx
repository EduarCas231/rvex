import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://18.217.194.220/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.usuario));
        navigate('/');
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <svg style={styles.logo} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3498db" strokeWidth="2"/>
            <path d="M12 16V16.01M12 8V12" stroke="#3498db" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h2 style={styles.title}>Inicio de Sesión</h2>
        </div>
        
        {error && (
          <div style={styles.errorContainer}>
            <svg style={styles.errorIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="Ejemplo: tu@email.com"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.passwordInput}
                placeholder="Ejemplo: mcnwjsnf237e"
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                style={styles.toggleButton}
              >
                {showPassword ? (
                  <svg style={styles.eyeIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg style={styles.eyeIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 3.75L19.5 20.25M14.522 14.775C13.8357 15.4318 12.9393 15.8389 12 15.8389C11.0607 15.8389 10.1643 15.4318 9.478 14.775M7.557 12C7.1902 12.5476 6.90847 13.1563 6.724 13.804M12.878 7.082C13.2705 7.02372 13.6679 6.99213 14.068 6.988C17.0694 6.95838 19.4843 8.28255 21 10.5C21 10.5 19.6364 13.1818 14.068 13.1818C13.1265 13.1818 12.2611 13.0599 11.469 12.853" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            style={isLoading ? styles.buttonDisabled : styles.button}
            disabled={isLoading}
          >
            {isLoading ? (
              <div style={styles.loadingContainer}>
                <svg style={styles.spinner} viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" fill="none" stroke="white" strokeWidth="5"></circle>
                </svg>
                Cargando...
              </div>
            ) : 'Ingresar'}
          </button>
        </form>
        
        <div style={styles.footer}>
          <p style={styles.footerText}>¿No tienes una cuenta?</p>
          <Link to="/registro" style={styles.footerLink}>Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '30px',
  },
  logo: {
    width: '48px',
    height: '48px',
    marginBottom: '16px',
  },
  title: {
    color: '#1e293b',
    textAlign: 'center',
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  errorIcon: {
    width: '20px',
    height: '20px',
    marginRight: '10px',
    flexShrink: 0,
  },
  errorText: {
    color: '#b91c1c',
    margin: 0,
    fontSize: '14px',
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
  },
  label: {
    color: '#475569',
    fontSize: '14px',
    fontWeight: '500',
  },
  input: {
    padding: '12px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.2s',
    backgroundColor: '#f8fafc',
    ':focus': {
      outline: 'none',
      borderColor: '#3498db',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.1)',
    },
    '::placeholder': {
      color: '#94a3b8',
    },
  },
  passwordInputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  passwordInput: {
    padding: '12px 40px 12px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.2s',
    backgroundColor: '#f8fafc',
    width: '100%',
    ':focus': {
      outline: 'none',
      borderColor: '#3498db',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.1)',
    },
    '::placeholder': {
      color: '#94a3b8',
    },
  },
  toggleButton: {
    position: 'absolute',
    right: '10px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    width: '20px',
    height: '20px',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      backgroundColor: '#2980b9',
    },
  },
  buttonDisabled: {
    backgroundColor: '#b8d8f0',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'not-allowed',
    transition: 'all 0.2s',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  spinner: {
    width: '20px',
    height: '20px',
    animation: 'rotate 1s linear infinite',
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#64748b',
  },
  footerText: {
    margin: '0 0 8px 0',
  },
  footerLink: {
    color: '#3498db',
    fontWeight: '600',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  '@keyframes rotate': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
};

export default Login;