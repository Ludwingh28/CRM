import { useState } from 'react';
import {
  Menu,
  X,
  Package,
  Smartphone,
  MapPin,
  UserPlus,
  ShoppingCart,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';
import InventarioAlmacen from './pages/InventarioAlmacen';
import InventarioMovil from './pages/InventarioMovil';
import GestionClientes from './pages/GestionClientes';
import CreacionClientes from './pages/CreacionClientes';
import GestionVentas from './pages/GestionVentas';
import ReportesVentas from './pages/ReportesVentas';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('inventario-almacen');
  const [userName] = useState('Juan Pérez');
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleMenuClick = (itemId) => {
    setCurrentPage(itemId);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'inventario-almacen': return <InventarioAlmacen />;
      case 'inventario-movil': return <InventarioMovil />;
      case 'gestion-clientes': return <GestionClientes />;
      case 'creacion-clientes': return <CreacionClientes />;
      case 'gestion-ventas': return <GestionVentas />;
      case 'reportes-ventas': return <ReportesVentas />;
      default: return <InventarioAlmacen />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Botón hamburguesa para móvil */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-all duration-300"
          onClick={toggleMobileMenu}
        />
      )}

      {/* SIDEBAR INTEGRADO */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white
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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <User size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Bienvenido</p>
                    <p className="font-bold text-lg truncate bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {userName}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mx-auto">
                  <User size={20} className="text-white" />
                </div>
              )}

              {/* Botón colapsar para desktop */}
              <button
                onClick={toggleSidebar}
                className="hidden md:block p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-110"
              >
                {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>

            {/* Botón cerrar sesión mejorado */}
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center gap-3 p-3 bg-gradient-to-r from-red-600 to-red-700
                hover:from-red-700 hover:to-red-800 rounded-xl transition-all duration-200
                font-medium shadow-lg hover:shadow-red-500/50 hover:scale-105
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
                        transition-all duration-300 font-medium group
                        ${isActive
                          ? `bg-gradient-to-r from-${item.color}-600 to-${item.color}-700 shadow-lg shadow-${item.color}-500/50 scale-105`
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
                        <Icon size={22} className="flex-shrink-0" />
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

      {/* Contenido principal con diseño mejorado */}
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
