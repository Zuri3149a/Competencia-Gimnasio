import { Users, Dumbbell, Calendar, CreditCard, LayoutDashboard, UserSquare2, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Socios', path: '/usuarios' },
  { icon: CreditCard, label: 'Membresías', path: '/membresias' },
  { icon: UserSquare2, label: 'Entrenadores', path: '/entrenadores' },
  { icon: Calendar, label: 'Clases', path: '/clases' },
  { icon: Dumbbell, label: 'Equipos', path: '/equipos' },
  { icon: CreditCard, label: 'Suscripciones', path: '/suscripciones' },
];

export const Sidebar = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className="h-screen w-64 bg-slate-900 text-white p-6 flex flex-col fixed shadow-2xl">
      <div className="flex items-center gap-3 mb-10 text-blue-400">
        <Dumbbell size={32} strokeWidth={2.5} />
        <h1 className="text-2xl font-black tracking-tight text-white">GYM-SOFT</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition-all text-slate-300 hover:text-white font-medium group"
              >
                <item.icon size={20} className="group-hover:text-blue-400 transition-colors" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button 
        onClick={onLogout}
        className="mt-auto flex items-center gap-3 p-4 rounded-2xl bg-slate-800/50 hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all font-bold group"
      >
        <LogOut size={20} />
        <span>Cerrar Sesión</span>
      </button>
    </div>
  );
};