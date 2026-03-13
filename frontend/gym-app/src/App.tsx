import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Login } from './pages/Login';
import { Usuarios } from './pages/Usuarios';
import { Membresias } from './pages/Membresias';
import { Entrenadores } from './pages/Entrenadores';
import { Equipos } from './pages/Equipos';
import { Suscripciones } from './pages/Suscripciones';
import { Clases } from './pages/Clases';
import { Dashboard } from './pages/Dashboard';
// ... (tus otros imports)

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('gym_token'));

  // Escuchar si el usuario se loguea
  const handleLogin = () => setIsAuth(true);
  const handleLogout = () => {
    localStorage.removeItem('gym_token');
    setIsAuth(false);
  };

  if (!isAuth) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="flex bg-slate-50 min-h-screen">
        <Sidebar onLogout={handleLogout} />
        <main className="flex-1 ml-64">
          {/* Botón de cerrar sesión rápido arriba a la derecha */}
          <button onClick={handleLogout} className="absolute top-4 right-8 text-slate-400 hover:text-red-500 font-medium text-sm">
            Cerrar Sesión
          </button>
          
          <Routes>
            {/* ACCESO POR DEFECTO: Ahora el Dashboard es la raíz */}
            <Route path="/" element={<Dashboard />} />
            
            {/* Mantenemos esta por si el Sidebar usa '/dashboard' */}
            <Route path="/dashboard" element={<Dashboard />} /> 

            {/* Módulos de Gestión */}
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/membresias" element={<Membresias />} />
            <Route path="/entrenadores" element={<Entrenadores />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/suscripciones" element={<Suscripciones />} />
            <Route path="/clases" element={<Clases />} />

            {/* BUENA PRÁCTICA: Redirigir cualquier ruta desconocida al Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;