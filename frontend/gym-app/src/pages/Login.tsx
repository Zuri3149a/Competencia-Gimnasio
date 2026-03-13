import { useState } from 'react';
import axios from 'axios';
import { Dumbbell, Lock, User, LogIn } from 'lucide-react';

export const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5157/api/auth/login', {
        username: user, // <-- Minúscula aquí
        password: pass  // <-- Minúscula aquí
      });
      
      console.log("Login exitoso:", res.data);
      localStorage.setItem('gym_token', res.data.token);
      onLogin();
    } catch (err: any) {
      // IMPORTANTE: Mira qué error te da exactamente en la consola (F12)
      console.error("Error de login:", err.response?.data);
      alert("Acceso denegado: " + (err.response?.data || "Error de conexión"));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-4 rounded-2xl text-white mb-4 shadow-lg">
            <Dumbbell size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-800">GYM-SOFT</h1>
          <p className="text-slate-400 font-medium">Panel de Administración</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-400" size={20} />
            <input required className="w-full p-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
            <input required type="password" className="w-full p-4 pl-12 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contraseña" value={pass} onChange={(e) => setPass(e.target.value)} />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
            <LogIn size={20} /> Entrar al Sistema
          </button>
        </form>
      </div>
    </div>
  );
};