import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserCheck, Search, Clock, History } from 'lucide-react';

export const Asistencias = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [logAsistencias, setLogAsistencias] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    const [resUsu, resAsis] = await Promise.all([
      axios.get('http://localhost:5157/api/usuarios'),
      axios.get('http://localhost:5157/api/asistencias')
    ]);
    setUsuarios(resUsu.data);
    setLogAsistencias(resAsis.data);
  };

  useEffect(() => { fetchData(); }, []);

  const registrarEntrada = async (id: number) => {
    try {
      await axios.post('http://localhost:5157/api/asistencias', id, {
        headers: { 'Content-Type': 'application/json' }
      });
      setSearch('');
      fetchData();
    } catch (err) { alert("Error al registrar asistencia"); }
  };

  const filtrados = usuarios.filter(u => 
    u.nombreCompleto.toLowerCase().includes(search.toLowerCase()) || u.ci.includes(search)
  ).slice(0, 5);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
        <UserCheck className="text-blue-500" size={36} /> Control de Accesos
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BUSCADOR DE ENTRADA */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
             <Search size={18} className="text-slate-400" /> Registrar Entrada
          </h3>
          <input 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Nombre del socio o CI..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="space-y-2">
            {search && filtrados.map(u => (
              <div key={u.idUsuario} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
                <div>
                  <p className="font-bold text-slate-800">{u.nombreCompleto}</p>
                  <p className="text-xs text-slate-400 font-mono">CI: {u.ci}</p>
                </div>
                <button 
                  onClick={() => registrarEntrada(u.idUsuario)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  Entrada
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* LOG RECIENTE */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5"><History size={120} /></div>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
            <Clock size={18} className="text-blue-400" /> Últimos Ingresos
          </h3>
          <div className="space-y-4 relative z-10 overflow-y-auto max-h-[400px] pr-2">
            {logAsistencias.map((a: any) => (
              <div key={a.idAsistencia} className="flex justify-between items-center border-b border-white/5 pb-3">
                <p className="font-medium text-slate-200">{a.nombreSocio}</p>
                <p className="text-xs text-slate-500 font-mono">
                  {new Date(a.fechaHora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};