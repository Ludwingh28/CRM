
import {
  LogOut,
  Package,
  Smartphone,
  MapPin,
  UserPlus,
  ShoppingCart,
  FileText,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';

function SideBar({
  currentPage,
  setCurrentPage,
  userName = 'Juan Pérez',
  isOpen = true,
  setIsOpen = () => {},
  isMobileMenuOpen = false,
  setIsMobileMenuOpen = () => {}
}) {
  const menuItems = [
    { id: 'inventario-almacen', label: 'Inventario Almacén', icon: Package, color: 'blue' },
    { id: 'inventario-movil', label: 'Inventario Móvil', icon: Smartphone, color: 'green' },
    { id: 'gestion-clientes', label: 'Gestión Clientes', icon: MapPin, color: 'red' },
    { id: 'creacion-clientes', label: 'Creación de Clientes', icon: UserPlus, color: 'rose' },
    { id: 'gestion-ventas', label: 'Gestión de Ventas', icon: ShoppingCart, color: 'purple' },
    { id: 'reportes-ventas', label: 'Reportes de Ventas', icon: FileText, color: 'indigo' },
  ];

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    // Implementar lógica de cierre de sesión
  };

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const handleMenuClick = (itemId) => {
    setCurrentPage(itemId);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <aside
      className={`
        fixed md:sticky top-0 left-0 h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white
        transition-all duration-300 ease-in-out z-40 shadow-2xl border-r border-slate-700/50
        ${isOpen ? 'w-72' : 'w-20'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Header elegante con usuario */}
        <div className="p-5 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            {isOpen ? (
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <User size={24} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Bienvenido</p>
                  <p className="font-bold text-lg truncate bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {userName}
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mx-auto">
                <User size={20} className="text-white" />
              </div>
            )}

            {/* Botón colapsar para desktop */}
            <button
              onClick={toggleSidebar}
              className="hidden md:block p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          {/* Botón cerrar sesión mejorado */}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 p-3 bg-linear-to-r from-red-600 to-red-700
              hover:from-red-700 hover:to-red-800 rounded-xl transition-all duration-200
              font-medium shadow-lg hover:shadow-red-500/50 hover:scale-105 cursor-pointer
              ${!isOpen && 'justify-center'}
            `}
          >
            <LogOut size={20} />
            {isOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>

        {/* Navegación elegante */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`
                      w-full flex items-center gap-4 p-4 rounded-xl
                      transition-all duration-300 font-medium group cursor-pointer
                      ${isActive
                        ? `bg-linear-to-r from-${item.color}-600 to-${item.color}-700 shadow-lg shadow-${item.color}-500/50 scale-105`
                        : 'hover:bg-slate-700/50 hover:scale-105'
                      }
                      ${!isOpen && 'justify-center'}
                    `}
                    title={!isOpen ? item.label : ''}
                  >
                    <div className={`
                      p-2 rounded-lg transition-all duration-300
                      ${isActive
                        ? 'bg-white/20'
                        : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                      }
                    `}>
                      <Icon size={22} className="shrink-0" />
                    </div>
                    {isOpen && (
                      <span className="text-sm font-semibold truncate">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 border-t border-slate-700/50 bg-slate-800/50">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">Sistema CRM</p>
              <p className="text-xs text-slate-500">v1.0 • 2024</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default SideBar;
