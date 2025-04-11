import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Editar from './pages/Editar'; // Ruta añadida aquí

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        <ul style={styles.ul}>
          {user && (
            <li style={styles.li}>
              <Link to="/" style={styles.link}>
                <i className="fas fa-home" style={styles.icon}></i> Inicio
              </Link>
            </li>
          )}
          {!user && (
            <>
              <li style={styles.li}>
                <Link to="/login" style={styles.link}>
                  <i className="fas fa-sign-in-alt" style={styles.icon}></i> Login
                </Link>
              </li>
            </>
          )}
          {user && (
            <li style={styles.li}>
              <button onClick={handleLogout} style={styles.button}>
                <i className="fas fa-sign-out-alt" style={styles.icon}></i> Cerrar sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <div style={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editar/:id" element={<Editar />} /> {/* Ruta agregada aquí */}
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  nav: {
    backgroundColor: '#2c3e50',
    padding: '15px 0',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    margin: 0,
    padding: 0,
  },
  li: {
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
    },
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#3498db',
    },
  },
  button: {
    background: 'transparent',
    border: 'none',
    color: '#ecf0f1',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#e74c3c',
    },
  },
  icon: {
    fontSize: '20px',
  },
  content: {
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '0 20px',
  },
};

export default App;
