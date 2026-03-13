import { useEffect, useState } from 'react';
import axios from 'axios';
// He dejado solo los que SÍ estamos usando abajo
import { CreditCard, Plus, Calendar, User, Trash2, X, CheckCircle } from 'lucide-react';

interface Suscripcion {
  idSuscripcion: number;
  nombreUsuario: string;
  nombrePlan: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
}

export const Suscripciones = () => {
  const [suscripciones, setSuscripciones] = useState<Suscripcion[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [planes, setPlanes] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    idUsuario: '',
    idMembresia: '',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: '',
    estado: 'Activa'
  });

  const fetchData = async () => {
    try {
      const [resSus, resUsu, resPla] = await Promise.all([
        axios.get('http://localhost:5157/api/suscripciones'),
        axios.get('http://localhost:5157/api/usuarios'),
        axios.get('http://localhost:5157/api/membresias')
      ]);
      setSuscripciones(resSus.data);
      setUsuarios(resUsu.data);
      setPlanes(resPla.data);
    } catch (err) {
      console.error("Error al sincronizar datos:", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Ajustamos los nombres para que coincidan EXACTAMENTE con tu modelo C#
      const dataToSend = {
          IdUsuario: parseInt(formData.idUsuario),
          IdMembresia: parseInt(formData.idMembresia),
          FechaInicio: formData.fechaInicio,
          FechaFin: formData.fechaFin,
          Estado: formData.estado
      };

      try {
        // Nota: El IdSuscripcion no se envía porque la DB lo genera solo
        await axios.post('http://localhost:5157/api/suscripciones', dataToSend);
        setShowModal(false);
        setFormData({ ...formData, idUsuario: '', idMembresia: '', fechaFin: '' });
        fetchData();
        alert("¡Suscripción activada con éxito!"); 
      } catch (err: any) {
        console.error("Error del servidor:", err.response?.data);
        alert("Error al crear suscripción. Revisa los nombres en el modelo de C#.");
      }
    };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Cancelar esta suscripción?")) {
      await axios.delete(`http://localhost:5157/api/suscripciones/${id}`);
      fetchData();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Suscripciones Activas</h2>
          <p className="text-slate-500">Control de pagos y vencimientos</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-orange-100 cursor-pointer transition-all">
          <Plus size={20} /> Nueva Suscripción
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-slate-600 font-bold">Socio</th>
              <th className="p-4 text-slate-600 font-bold">Plan</th>
              <th className="p-4 text-slate-600 font-bold">Vencimiento</th>
              <th className="p-4 text-slate-600 font-bold text-center">Estado</th>
              <th className="p-4 text-slate-600 font-bold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {suscripciones.map((s) => (
              <tr key={s.idSuscripcion} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2 font-medium text-slate-900">
                    <User size={16} className="text-slate-400" /> {s.nombreUsuario}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <CreditCard size={16} className="text-orange-400" /> {s.nombrePlan}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-slate-600 font-mono text-sm">
                    {/* USAMOS CALENDAR AQUÍ */}
                    <Calendar size={14} className="text-slate-400" /> 
                    {new Date(s.fechaFin).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] font-bold">
                    {s.estado.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(s.idSuscripcion)} className="text-red-400 hover:text-red-600 p-2 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-in zoom-in duration-200">
            {/* USAMOS X AQUÍ */}
            <button onClick={() => setShowModal(false)} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600">
                <X size={24} />
            </button>
            
            <h3 className="text-xl font-bold mb-6 text-slate-800">Registrar Venta</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Seleccionar Socio</label>
                <select required className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.idUsuario} onChange={(e) => setFormData({...formData, idUsuario: e.target.value})}>
                  <option value="">-- Elige un socio --</option>
                  {usuarios.map(u => <option key={u.idUsuario} value={u.idUsuario}>{u.nombreCompleto}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Plan de Membresía</label>
                <select required className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.idMembresia} onChange={(e) => setFormData({...formData, idMembresia: e.target.value})}>
                  <option value="">-- Elige un plan --</option>
                  {planes.map(p => <option key={p.idMembresia} value={p.idMembresia}>{p.nombre}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Fecha Inicio</label>
                  <input type="date" className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                    value={formData.fechaInicio} onChange={(e) => setFormData({...formData, fechaInicio: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Fecha Fin</label>
                  <input type="date" required className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                    value={formData.fechaFin} onChange={(e) => setFormData({...formData, fechaFin: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold mt-4 flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">
                {/* USAMOS CHECKCIRCLE AQUÍ */}
                <CheckCircle size={20} /> Activar Suscripción
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};