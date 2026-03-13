import { useEffect, useState } from 'react';
import axios from 'axios';
// Todos estos iconos se usan abajo en el JSX
import { UserPlus, Mail, Phone, IdCard, X, Save, Trash2, Edit, MapPin } from 'lucide-react';

// 1. RE-DECLARAMOS LA INTERFAZ (Para que TS sepa qué es un Usuario)
interface Usuario {
  idUsuario: number;
  nombreCompleto: string;
  ci: string;
  correo: string;
  celular: string;
  estado: string;
  direccion?: string;
}

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    nombreCompleto: '',
    ci: '',
    correo: '',
    celular: '',
    direccion: ''
  });

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:5157/api/usuarios');
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error cargando socios", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsuarios(); }, []);

  // Función para ELIMINAR (Usa Trash2)
  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este socio?")) {
      try {
        await axios.delete(`http://localhost:5157/api/usuarios/${id}`);
        fetchUsuarios();
      } catch (err) {
        alert("No se pudo eliminar el socio.");
      }
    }
  };

  // Función para EDITAR (Usa Edit)
  const openEditModal = (u: Usuario) => {
    setEditingId(u.idUsuario);
    setFormData({
      nombreCompleto: u.nombreCompleto,
      ci: u.ci || '',
      correo: u.correo,
      celular: u.celular,
      direccion: u.direccion || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ nombreCompleto: '', ci: '', correo: '', celular: '', direccion: '' });
  };

  // ESTE ES EL MANEJADOR QUE TE DABA ERROR
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // PUT para editar
        await axios.put(`http://localhost:5157/api/usuarios/${editingId}`, {
          idUsuario: editingId,
          ...formData,
          estado: 'Activo'
        });
      } else {
        // POST para crear
        await axios.post('http://localhost:5157/api/usuarios', formData);
      }
      closeModal();
      fetchUsuarios();
    } catch (err) {
      alert("Error al procesar la solicitud.");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Gestión de Socios</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all cursor-pointer"
        >
          <UserPlus size={20} /> {/* USADO AQUÍ */}
          Nuevo Socio
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-10 text-slate-500">Cargando socios...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="p-4 font-semibold">Socio</th>
                <th className="p-4 font-semibold text-center">CI</th>
                <th className="p-4 font-semibold text-center">Estado</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usuarios.map((u) => (
                <tr key={u.idUsuario} className="hover:bg-slate-50/50">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{u.nombreCompleto}</div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Mail size={12} /> {u.correo} {/* USADO AQUÍ */}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-slate-600">
                      <IdCard size={14} className="text-slate-400" /> {u.ci || '---'} {/* USADO AQUÍ */}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                      {u.estado}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(u)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <Edit size={16} /> {/* USADO AQUÍ */}
                      </button>
                      <button onClick={() => handleDelete(u.idUsuario)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 size={16} /> {/* USADO AQUÍ */}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                {editingId ? "Editar Información" : "Registrar Socio"}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} /> {/* USADO AQUÍ */}
              </button>
            </div>

            {/* AQUÍ SE CONECTA EL handleSubmit */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Nombre Completo</label>
                <input required className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.nombreCompleto}
                  onChange={(e) => setFormData({...formData, nombreCompleto: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Celular</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-3.5 text-slate-400" /> {/* USADO AQUÍ */}
                    <input required className="w-full mt-1 p-2 pl-9 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.celular}
                      onChange={(e) => setFormData({...formData, celular: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">CI</label>
                  <input className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.ci}
                    onChange={(e) => setFormData({...formData, ci: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Correo Electrónico</label>
                <input required type="email" className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.correo}
                  onChange={(e) => setFormData({...formData, correo: e.target.value})}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Dirección</label>
                <div className="relative">
                   <MapPin size={14} className="absolute left-3 top-3.5 text-slate-400" /> {/* USADO AQUÍ */}
                   <input className="w-full mt-1 p-2 pl-9 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.direccion}
                    onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                   />
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-4 flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
                <Save size={18} /> {/* USADO AQUÍ */}
                {editingId ? "Actualizar Socio" : "Guardar Socio"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};