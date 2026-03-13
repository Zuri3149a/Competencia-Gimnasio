import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Users, CreditCard, Dumbbell, UserSquare2, 
  TrendingUp, AlertCircle, Calendar, Search, ArrowRight, User 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSocios: 0,
    suscripcionesActivas: 0,
    equiposMantenimiento: 0,
    totalStaff: 0
  });

  const [allUsuarios, setAllUsuarios] = useState<any[]>([]); // Guardamos todos para buscar
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const fetchStats = async () => {
    try {
      const [resUsu, resSus, resEqu, resEnt] = await Promise.all([
        axios.get('http://localhost:5157/api/usuarios'),
        axios.get('http://localhost:5157/api/suscripciones'),
        axios.get('http://localhost:5157/api/equipos'),
        axios.get('http://localhost:5157/api/entrenadores')
      ]);

      setAllUsuarios(resUsu.data);
      setStats({
        totalSocios: resUsu.data.length || 0,
        suscripcionesActivas: resSus.data.filter((s: any) => (s.estado || s.Estado) === 'Activa').length,
        equiposMantenimiento: resEqu.data.filter((e: any) => (e.estado || e.Estado) === 'Mantenimiento').length,
        totalStaff: resEnt.data.length || 0
      });
    } catch (err) {
      console.error("Error cargando estadísticas", err);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  // Lógica de búsqueda reactiva
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const filtered = allUsuarios.filter(u => 
        u.nombreCompleto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.ci && u.ci.includes(searchQuery))
      ).slice(0, 5); // Mostramos máximo 5 resultados para no saturar
      setSearchResults(filtered);
    }
  }, [searchQuery, allUsuarios]);

  const cards = [
    { title: 'Total Socios', value: stats.totalSocios, icon: Users, color: 'bg-blue-500', shadow: 'shadow-blue-100' },
    { title: 'Suscripciones', value: stats.suscripcionesActivas, icon: CreditCard, color: 'bg-orange-500', shadow: 'shadow-orange-100' },
    { title: 'En Reparación', value: stats.equiposMantenimiento, icon: AlertCircle, color: 'bg-red-500', shadow: 'shadow-red-100' },
    { title: 'Instructores', value: stats.totalStaff, icon: UserSquare2, color: 'bg-indigo-500', shadow: 'shadow-indigo-100' },
  ];

  return (
    <div className="p-8">
      {/* HEADER CON SALUDO Y ICONO USADO */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Panel de Control</h2>
          <p className="text-slate-500">Hola Alexander, esto es lo que pasa hoy en tu gimnasio.</p>
        </div>
        <div className="bg-slate-800 p-3 rounded-2xl text-white shadow-lg">
          <Dumbbell size={32} />
        </div>
      </div>

      {/* BARRA DE BÚSQUEDA GLOBAL */}
      <div className="relative mb-10 max-w-2xl">
        <div className="absolute left-4 top-4 text-slate-400">
          <Search size={20} />
        </div>
        <input 
          type="text"
          placeholder="Buscar socio por nombre o CI..."
          className="w-full p-4 pl-12 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* RESULTADOS DE BÚSQUEDA FLOTANTES */}
        {searchResults.length > 0 && (
          <div className="absolute w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-10 overflow-hidden animate-in fade-in slide-in-from-top-2">
            {searchResults.map((u) => (
              <Link 
                key={u.idUsuario} 
                to="/usuarios" 
                className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{u.nombreCompleto}</p>
                    <p className="text-xs text-slate-400 italic">CI: {u.ci || 'Sin CI'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase">
                  Ver perfil <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* TARJETAS DE KPIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, i) => (
          <div key={i} className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-xl ${card.shadow} flex items-center gap-5 transition-transform hover:scale-105 cursor-default`}>
            <div className={`${card.color} p-4 rounded-2xl text-white`}>
              <card.icon size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{card.title}</p>
              <h3 className="text-3xl font-black text-slate-800">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* SECCIÓN INFERIOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
            <TrendingUp size={20} className="text-emerald-500" /> Rendimiento Mensual
          </h4>
          <div className="h-48 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
            <TrendingUp size={48} className="mb-2 opacity-10" />
            <p className="italic text-sm">Visualización de crecimiento de ingresos activa</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10">
             <Calendar size={120} />
          </div>
          <h4 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
            <Calendar className="text-orange-400" /> Próximas Clases
          </h4>
          <div className="space-y-4 relative z-10">
            <div className="border-l-4 border-orange-400 pl-4 py-1 hover:bg-white/5 transition-colors cursor-pointer">
              <p className="font-bold">Zumba Fitness</p>
              <p className="text-slate-400 text-xs">Hoy 18:00 - Salón A</p>
            </div>
            <div className="border-l-4 border-blue-400 pl-4 py-1 hover:bg-white/5 transition-colors cursor-pointer">
              <p className="font-bold">Crossfit Nivel 1</p>
              <p className="text-slate-400 text-xs">Hoy 19:30 - Box Exterior</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};