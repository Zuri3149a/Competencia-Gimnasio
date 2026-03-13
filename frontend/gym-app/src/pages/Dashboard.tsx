import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, CreditCard, DollarSign, Activity, Search, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSocios: 0,
    suscripcionesActivas: 0,
    ingresosTotales: 0,
    asistenciasHoy: 0
  });

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const [resStats, resUsers] = await Promise.all([
        axios.get('http://localhost:5157/api/dashboard/stats'),
        axios.get('http://localhost:5157/api/usuarios')
      ]);
      setStats(resStats.data);
      setUsuarios(resUsers.data);
    } catch (err) {
      console.error("Error cargando Dashboard", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtrar socios por nombre o CI
  const filteredUsers = usuarios.filter(u => 
    u.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.ci.includes(searchTerm)
  ).slice(0, 5);

  const cards = [
    { title: 'Total Socios', value: stats.totalSocios, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Suscripciones', value: stats.suscripcionesActivas, icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Ingresos', value: `$${stats.ingresosTotales}`, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Asistencias Hoy', value: stats.asistenciasHoy, icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Panel de Control</h2>
        <p className="text-slate-500 mt-1">Bienvenido de nuevo, esto es lo que está pasando hoy.</p>
      </header>
      
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-7 rounded-lg border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center gap-5 transition-transform hover:scale-[1.02]">
            <div className={`${card.bg} ${card.color} p-4 rounded-2xl`}>
              <card.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.title}</p>
              <p className="text-3xl font-black text-slate-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* BUSCADOR GLOBAL */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Búsqueda Global de Socios</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Nombre o CI..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            {searchTerm === '' ? (
              <div className="py-12 text-center text-slate-400">
                <Search size={48} className="mx-auto mb-3 opacity-20" />
                <p>Escribe algo para buscar socios en tiempo real</p>
              </div>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <div 
                  key={u.idUsuario} 
                  onClick={() => navigate('/usuarios')}
                  className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-transparent hover:border-blue-100 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{u.nombreCompleto}</p>
                      <p className="text-xs text-slate-500 font-mono">CI: {u.ci} • {u.estado}</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-slate-400 italic">No se encontraron socios con ese criterio.</p>
            )}
          </div>
        </div>

        {/* ACCESO RÁPIDO */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <h3 className="text-xl font-bold mb-6 relative z-10">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 gap-3 relative z-10">
            <button 
              onClick={() => navigate('/usuarios')}
              className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-all text-left px-6 flex justify-between items-center group cursor-pointer"
            >
              Registrar Socio <PlusIcon size={18} />
            </button>
            <button 
              onClick={() => navigate('/suscripciones')}
              className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-all text-left px-6 flex justify-between items-center group cursor-pointer"
            >
              Nueva Suscripción <CreditCard size={18} />
            </button>
            <button 
              onClick={() => navigate('/comprobantes')}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all text-center mt-4 shadow-lg shadow-blue-900/50 cursor-pointer"
            >
              Corte de Caja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Icon
const PlusIcon = ({size}: {size:number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);