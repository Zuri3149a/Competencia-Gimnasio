import { Users, Dumbbell, Calendar, CreditCard, LayoutDashboard, UserSquare2, MirrorRectangular } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Socios', path: '/usuarios' },
  { icon: CreditCard, label: 'Membresías', path: '/membresias' },
  { icon: UserSquare2, label: 'Entrenadores', path: '/entrenadores' },
  { icon: Calendar, label: 'Clases', path: '/clases' },
  { icon: Dumbbell, label: 'Equipos', path: '/equipos' },
  { icon: MirrorRectangular, label: 'Suscripciones', path: '/suscripciones' },
];

export const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-slate-900 text-white p-4 flex flex-col fixed">
      <h1 className="text-2xl font-bold mb-8 text-blue-400 flex items-center gap-2">
        <Dumbbell /> GYM
      </h1>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};