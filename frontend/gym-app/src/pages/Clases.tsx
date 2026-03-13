import { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarDays, Clock, UserCheck, Plus, Trash2, X, CheckCircle } from 'lucide-react';

interface Clase {
  idClase: number;
  nombre: string;
  horario: string;
  nombreEntrenador: string;
}

export const Clases = () => {
  const [clases, setClases] = useState<Clase[]>([]);
  const [entrenadores, setEntrenadores] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', horario: '', idEntrenador: '' });

  const fetchData = async () => {
    const [resCla, resEnt] = await Promise.all([
      axios.get('http://localhost:5157/api/clases'),
      axios.get('http://localhost:5157/api/entrenadores')
    ]);
    setClases(resCla.data);
    setEntrenadores(resEnt.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5157/api/clases', {
        nombre: formData.nombre,
        Horario: formData.horario,
        IdEntrenador: formData.idEntrenador ? parseInt(formData.idEntrenador) : null
      });
      setShowModal(false);
      setFormData({ nombre: '', horario: '', idEntrenador: '' });
      fetchData();
    } catch (err) {
      alert("Error al crear la clase");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <CalendarDays className="text-purple-600" /> Agenda de Clases
          </h2>
          <p className="text-slate-500">Horarios y disciplinas grupales</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-purple-100 transition-all cursor-pointer">
          <Plus size={20} /> Nueva Clase
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clases.map((c) => (
          <div key={c.idClase} className="bg-white rounded-2xl p-6 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-800">{c.nombre}</h3>
              <button onClick={async () => {
                if(window.confirm("¿Eliminar clase?")) {
                  await axios.delete(`http://localhost:5157/api/clases/${c.idClase}`);
                  fetchData();
                }
              }} className="text-slate-300 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock size={16} className="text-purple-400" />
                <span className="font-medium">{c.horario}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <UserCheck size={16} className="text-purple-400" />
                <span>{c.nombreEntrenador}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-in zoom-in duration-200">
            <button onClick={() => setShowModal(false)} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Programar Clase</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Nombre de la Actividad</label>
                <input required placeholder="Ej: Zumba, Yoga, Spinning" className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Horario</label>
                <input required placeholder="Ej: Lunes y Miércoles 18:00" className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.horario} onChange={(e) => setFormData({...formData, horario: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Instructor Responsable</label>
                <select className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.idEntrenador} onChange={(e) => setFormData({...formData, idEntrenador: e.target.value})}>
                  <option value="">-- Seleccionar Instructor --</option>
                  {entrenadores.map(e => <option key={e.idEntrenador} value={e.idEntrenador}>{e.nombres} {e.apellidos}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold mt-4 flex items-center justify-center gap-2 hover:bg-purple-700 transition-all">
                <CheckCircle size={20} /> Publicar Clase
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};