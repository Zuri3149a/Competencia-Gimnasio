import { useEffect, useState } from 'react';
import axios from 'axios';
// Todos estos se usan ahora en la función getStatusStyle o en el Modal
import { Dumbbell, Plus, Wrench, Trash2, Edit, Save, X, AlertTriangle, CheckCircle } from 'lucide-react';

interface Equipo {
  idEquipo: number;
  nombre: string;
  capacidad: string;
  estado: string;
}

export const Equipos = () => {
  const [items, setItems] = useState<Equipo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ nombre: '', capacidad: '', estado: 'Activo' });

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5157/api/equipos');
      setItems(res.data);
    } catch (err) {
      console.error("Error al traer equipos", err);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, idEquipo: editingId || 0 };
    try {
      if (editingId) {
        await axios.put(`http://localhost:5157/api/equipos/${editingId}`, payload);
      } else {
        await axios.post('http://localhost:5157/api/equipos', payload);
      }
      closeModal();
      fetchItems();
    } catch (err) {
      alert("Error al guardar el equipo");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Eliminar este equipo del inventario?")) {
      await axios.delete(`http://localhost:5157/api/equipos/${id}`);
      fetchItems();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ nombre: '', capacidad: '', estado: 'Activo' });
  };

  // AQUÍ ES DONDE USAMOS LOS ICONOS QUE FALTABAN
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Activo': 
        return <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-green-200">
          <CheckCircle size={12} /> ACTIVO
        </span>;
      case 'Mantenimiento': 
        return <span className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-amber-200">
          <Wrench size={12} /> MANTENIMIENTO
        </span>;
      case 'Baja': 
        return <span className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-red-200">
          <AlertTriangle size={12} /> BAJA
        </span>;
      default: 
        return <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-lg text-[10px] font-bold">{status}</span>;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Inventario de Equipos</h2>
          <p className="text-slate-500">Control de máquinas y estado técnico</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg cursor-pointer">
          <Plus size={20} /> Nuevo Equipo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.idEquipo} className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-300 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-xl text-slate-600">
                <Dumbbell size={24} />
              </div>
              {getStatusBadge(item.estado)} {/* LLAMADA A LA FUNCIÓN QUE USA LOS ICONOS */}
            </div>

            <h3 className="font-bold text-slate-800 text-lg mb-1">{item.nombre}</h3>
            <p className="text-slate-500 text-sm mb-4 italic">Capacidad: {item.capacidad || 'N/A'}</p>

            <div className="flex gap-2 pt-4 border-t border-slate-100">
              <button 
                onClick={() => {
                  setEditingId(item.idEquipo);
                  setFormData({ nombre: item.nombre, capacidad: item.capacidad || '', estado: item.estado });
                  setShowModal(true);
                }}
                className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Edit size={14} /> Editar
              </button>
              <button onClick={() => handleDelete(item.idEquipo)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={closeModal} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
            
            <h3 className="text-xl font-bold mb-6">{editingId ? 'Actualizar Equipo' : 'Registrar Equipo'}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Nombre de la Máquina</label>
                <input required className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-800"
                  value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Especificación</label>
                <input className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-800"
                  value={formData.capacidad} onChange={(e) => setFormData({...formData, capacidad: e.target.value})} />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Estado Actual</label>
                <select className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-800"
                  value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value})}>
                  <option value="Activo">Activo</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold mt-4 flex items-center justify-center gap-2 hover:bg-slate-900 transition-all">
                <Save size={20} /> {editingId ? 'Guardar Cambios' : 'Registrar Equipo'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};