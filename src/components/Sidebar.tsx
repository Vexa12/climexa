import { Home, Calendar, MapPin, TrendingUp, MessageSquare, BarChart3, Moon, LogOut } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
  userName: string;
}

export default function Sidebar({ activeSection, onSectionChange, onLogout, userName }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'events', label: 'Planificar Evento', icon: Calendar },
    { id: 'recommender', label: 'Recomendador', icon: MapPin },
    { id: 'astronomy', label: 'Eventos Astronómicos', icon: Moon },
    { id: 'alerts', label: 'Alertas', icon: TrendingUp },
    { id: 'community', label: 'Comunidad', icon: MessageSquare },
    { id: 'statistics', label: 'Estadísticas', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white h-screen fixed left-0 top-0 flex flex-col shadow-2xl">
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-2xl font-bold tracking-wider">CLIMEXA</h1>
        <p className="text-sm text-blue-200 mt-1">{userName}</p>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full px-6 py-3 flex items-center gap-4 transition-all ${
                isActive
                  ? 'bg-blue-700 border-l-4 border-white'
                  : 'hover:bg-blue-800 border-l-4 border-transparent'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-blue-700">
        <button
          onClick={onLogout}
          className="w-full px-4 py-3 flex items-center gap-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}
