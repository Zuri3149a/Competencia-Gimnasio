import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Usuarios } from './pages/Usuarios';
import { Membresias } from './pages/Membresias';
import { Entrenadores } from './pages/Entrenadores';
import { Equipos } from './pages/Equipos';
import { Suscripciones } from './pages/Suscripciones';
import { Clases } from './pages/Clases';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="flex bg-slate-50 min-h-screen">
        <Sidebar />
        
        {/* ml-64 para dejar espacio al Sidebar fijo */}
        <main className="flex-1 ml-64">
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