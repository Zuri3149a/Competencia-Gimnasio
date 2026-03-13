import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreditCard, Plus, Trash2, Edit, Save, X, CheckCircle2, DollarSign, Clock } from 'lucide-react';

interface Membresia {
  idMembresia: number;
  nombre: string;
  precio: number;      // Agregamos precio
  duracionDias: number; // Agregamos duración
}

export const Membresias = () => {
  const [planes, setPlanes] = useState<Membresia[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Agregamos estados para los campos nuevos
  const [nombrePlan, setNombrePlan] = useState('');
  const [precio, setPrecio] = useState('');
  const [duracion, setDuracion] = useState('');

  const fetchPlanes = async () => {
    const res = await axios.get('http://localhost:5157/api/membresias');
    setPlanes(res.data);
  };

  useEffect(() => { fetchPlanes(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Objeto con los nombres en MAYÚSCULA para C#
    const dataToSend = {
      Nombre: nombrePlan,
      Precio: parseFloat(precio),
      DuracionDias: parseInt(duracion)
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5157/api/membresias/${editingId}`, {
          IdMembresia: editingId,
          ...dataToSend
        });
      } else {
        await axios.post('http://localhost:5157/api/membresias', dataToSend);
      }
      closeModal();
      fetchPlanes();
    } catch (err: any) {
      console.error("Error de validación:", err.response?.data);
      alert("Error al guardar. Verifica que el modelo en C# tenga Precio y DuracionDias.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Eliminar este plan?")) {
      await axios.delete(`http://localhost:5157/api/membresias/${id}`);
      fetchPlanes();
    }
  };

  const openEdit = (p: Membresia) => {
    setEditingId(p.idMembresia);
    setNombrePlan(p.nombre);
    setPrecio(p.precio.toString());
    setDuracion(p.duracionDias.toString());
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setNombrePlan('');
    setPrecio('');
    setDuracion('');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Planes de Membresía</h2>
          <p className="text-slate-500">Configura las opciones de suscripción</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-100 transition-all cursor-pointer"
        >
          <Plus size={20} /> Crear Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planes.map((plan) => (
          <div key={plan.idMembresia} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="bg-emerald-50 w-12 h-12 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
              <CreditCard size={24} />
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-1">{plan.nombre}</h3>
            <p className="text-2xl font-black text-emerald-600 mb-4">${plan.precio} <span className="text-xs text-slate-400 font-normal">/ {plan.duracionDias} días</span></p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-emerald-500" /> Acceso total al gimnasio
              </li>
            </ul>

            <div className="flex gap-2 border-t border-slate-100 pt-4">
              <button onClick={() => openEdit(plan)} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Edit size={16} /> Editar
              </button>
              <button onClick={() => handleDelete(plan.idMembresia)} className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800">{editingId ? 'Editar Plan' : 'Nuevo Plan'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Nombre del Paquete</label>
                <input required className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                  value={nombrePlan} onChange={(e) => setNombrePlan(e.target.value)} placeholder="Ej: Plan VIP Anual" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Precio ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-4 text-slate-400" size={16} />
                    <input required type="number" step="0.01" className="w-full mt-1 p-3 pl-9 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                      value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Duración (Días)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-4 text-slate-400" size={16} />
                    <input required type="number" className="w-full mt-1 p-3 pl-9 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                      value={duracion} onChange={(e) => setDuracion(e.target.value)} placeholder="30" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold mt-4 flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                <Save size={20} /> {editingId ? 'Guardar Cambios' : 'Crear Membresía'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};