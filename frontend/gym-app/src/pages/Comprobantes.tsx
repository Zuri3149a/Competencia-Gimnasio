import { useEffect, useState } from 'react';
import axios from 'axios';
import { Receipt, DollarSign, Calendar, Search, Download } from 'lucide-react';

export const Comprobantes = () => {
  const [comprobantes, setComprobantes] = useState<any[]>([]);
  const [totalHoy, setTotalHoy] = useState(0);
  const [filter, setFilter] = useState('');

  const fetchData = async () => {
    try {
      const [resComp, resCorte] = await Promise.all([
        axios.get('http://localhost:5157/api/comprobantes'),
        axios.get('http://localhost:5157/api/comprobantes/corte')
      ]);
      setComprobantes(resComp.data);
      setTotalHoy(resCorte.data.total);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const filtrados = comprobantes.filter(c => 
    c.nombreSocio.toLowerCase().includes(filter.toLowerCase()) || 
    c.concepto.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <Receipt className="text-amber-500" size={32} /> Historial de Pagos
          </h2>
          <p className="text-slate-500">Registro de todas las transacciones y ventas</p>
        </div>
        
        {/* WIDGET CORTE DE CAJA */}
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-4">
          <div className="bg-amber-500 text-white p-2 rounded-xl">
            <DollarSign size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Ingresos de Hoy</p>
            <p className="text-xl font-black text-amber-900">${totalHoy.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl w-full outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Buscar por socio o concepto..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors">
            <Download size={18} /> Exportar Reporte
          </button>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4">Socio</th>
              <th className="px-6 py-4">Concepto</th>
              <th className="px-6 py-4">Método</th>
              <th className="px-6 py-4 text-right">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtrados.map((c) => (
              <tr key={c.idComprobante} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                  {new Date(c.fecha).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 font-bold text-slate-700">{c.nombreSocio}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{c.concepto}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase">
                    {c.metodoPago}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-black text-amber-600">
                  ${c.monto.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};