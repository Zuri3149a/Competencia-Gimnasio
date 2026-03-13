import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreditCard, Plus, Trash2, Edit, Save, X, CheckCircle2 } from 'lucide-react';

interface Membresia {
  idMembresia: number;
  nombre: string;
}

export const Membresias = () => {
  const [planes, setPlanes] = useState<Membresia[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [nombrePlan, setNombrePlan] = useState('');

  const fetchPlanes = async () => {
    const res = await axios.get('http://localhost:5157/api/membresias');
    setPlanes(res.data);
  };

  useEffect(() => { fetchPlanes(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5157/api/membresias/${editingId}`, {
        idMembresia: editingId,
        nombre: nombrePlan
      });
    } else {
      await axios.post('http://localhost:5157/api/membresias', { nombre: nombrePlan });
    }
    closeModal();
    fetchPlanes();
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
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setNombrePlan('');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Planes de Membresía</h2>
          <p className="text-slate-500">Configura las opciones de suscripción para tus socios</p>
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
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">{plan.nombre}</h3>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-emerald-500" /> Acceso total al gimnasio
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-emerald-500" /> Registro de asistencias
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{editingId ? 'Editar Plan' : 'Nuevo Plan'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Nombre del Paquete</label>
                <input 
                  required
                  placeholder="Ej: Plan Anual VIP"
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                  value={nombrePlan}
                  onChange={(e) => setNombrePlan(e.target.value)}
                />
              </div>

              <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold mt-4 flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all">
                <Save size={18} /> {editingId ? 'Guardar Cambios' : 'Crear Membresía'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};