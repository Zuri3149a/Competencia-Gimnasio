import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Usuarios } from './pages/Usuarios'; // Importa el nuevo componente
import { Membresias } from './pages/Membresias';
import { Entrenadores } from './pages/Entrenadores';
import { Equipos } from './pages/Equipos';
import { Suscripciones } from './pages/Suscripciones';
import { Clases } from './pages/Clases';

function App() {
  return (
    <Router>
      <div className="flex bg-slate-50 min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<div className="p-8 text-2xl font-bold">Bienvenido al Dashboard</div>} />
            <Route path="/usuarios" element={<Usuarios />} /> {/* ¡Aquí está! */}
            <Route path="/membresias" element={<Membresias />} />
            <Route path="/entrenadores" element={<Entrenadores />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/suscripciones" element={<Suscripciones />} />
            <Route path="/clases" element={<Clases />} />
            
            {/* ... las demás siguen igual por ahora */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;