import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserSquare2, Plus, Mail, Phone, GraduationCap, Trash2, Edit, Save, X } from 'lucide-react';

interface Entrenador {
  idEntrenador: number;
  nombres: string;
  apellidos: string;
  especialidad: string;
  celular: string;
  correo: string;
  ci: string;
  estado: string;
}

export const Entrenadores = () => {
  const [staff, setStaff] = useState<Entrenador[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nombres: '', apellidos: '', especialidad: '', celular: '', correo: '', ci: ''
  });

  const fetchStaff = async () => {
    const res = await axios.get('http://localhost:5157/api/entrenadores');
    setStaff(res.data);
  };

  useEffect(() => { fetchStaff(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, estado: 'Activo', idEntrenador: editingId || 0 };
    if (editingId) {
      await axios.put(`http://localhost:5157/api/entrenadores/${editingId}`, payload);
    } else {
      await axios.post('http://localhost:5157/api/entrenadores', payload);
    }
    closeModal();
    fetchStaff();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Retirar a este entrenador del staff?")) {
      await axios.delete(`http://localhost:5157/api/entrenadores/${id}`);
      fetchStaff();
    }
  };

  const openEdit = (e: Entrenador) => {
    setEditingId(e.idEntrenador);
    setFormData({
      nombres: e.nombres, apellidos: e.apellidos, especialidad: e.especialidad,
      celular: e.celular, correo: e.correo, ci: e.ci
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ nombres: '', apellidos: '', especialidad: '', celular: '', correo: '', ci: '' });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Staff de Entrenadores</h2>
          <p className="text-slate-500 text-sm">Gestiona los instructores y sus especialidades</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-100 cursor-pointer">
          <Plus size={20} /> Agregar Instructor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {staff.map((e) => (
          <div key={e.idEntrenador} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-2xl">
                <UserSquare2 size={32} />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(e)} className="p-2 text-slate-400 hover:text-indigo-600"><Edit size={16}/></button>
                <button onClick={() => handleDelete(e.idEntrenador)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800">{e.nombres} {e.apellidos}</h3>
            <div className="flex items-center gap-2 text-indigo-500 text-sm font-semibold mb-4">
              <GraduationCap size={16} /> {e.especialidad}
            </div>

            <div className="space-y-2 border-t border-slate-50 pt-4">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Mail size={14} /> {e.correo}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Phone size={14} /> {e.celular}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editingId ? 'Editar Staff' : 'Nuevo Instructor'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Nombres</label>
                <input required className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.nombres} onChange={(ev) => setFormData({...formData, nombres: ev.target.value})} />
              </div>
              <div className="col-span-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Apellidos</label>
                <input required className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.apellidos} onChange={(ev) => setFormData({...formData, apellidos: ev.target.value})} />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Especialidad</label>
                <input required placeholder="Ej: Yoga, Crossfit, Pesas" className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.especialidad} onChange={(ev) => setFormData({...formData, especialidad: ev.target.value})} />
              </div>
              <div className="col-span-1">
                <label className="text-xs font-bold text-slate-400 uppercase">CI</label>
                <input required className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.ci} onChange={(ev) => setFormData({...formData, ci: ev.target.value})} />
              </div>
              <div className="col-span-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Celular</label>
                <input required className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.celular} onChange={(ev) => setFormData({...formData, celular: ev.target.value})} />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Correo</label>
                <input required type="email" className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.correo} onChange={(ev) => setFormData({...formData, correo: ev.target.value})} />
              </div>
              <button type="submit" className="col-span-2 bg-indigo-600 text-white py-4 rounded-2xl font-bold mt-4 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                <Save size={20} /> {editingId ? 'Guardar Cambios' : 'Registrar Entrenador'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};