import { useState } from 'react';
import {
  Menu,
  X,
  Package,
  Smartphone,
  MapPin,
  ShoppingCart,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ currentPage, onNavigate, userName = "Usuario" }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'inventario-almacen', label: 'Inventario en Almacén', icon: Package },
    { id: 'inventario-movil', label: 'Inventario Móvil', icon: Smartphone },
    { id: 'mapa-clientes', label: 'Mapa de Clientes', icon: MapPin },
    { id: 'gestion-ventas', label: 'Gestión de Ventas', icon: ShoppingCart },
    { id: 'reportes-ventas', label: 'Reportes de Ventas', icon: FileText },
  ];

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    // Aquí implementarás la lógica de cierre de sesión
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = (itemId) => {
    onNavigate(itemId);
    // Cerrar menú móvil después de navegar
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white
          transition-all duration-300 ease-in-out z-40 shadow-2xl
          ${isOpen ? 'w-64' : 'w-20'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header con info de usuario */}
          <div className="p-4 border-b border-blue-700">
            <div className="flex items-center justify-between mb-4">
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-blue-200">Bienvenido</p>
                  <p className="font-semibold text-lg truncate">{userName}</p>
                </div>
              )}

              {/* Botón colapsar/expandir (solo desktop) */}
              <button
                onClick={toggleSidebar}
                className="hidden md:block p-2 hover:bg-blue-700 rounded-lg transition-colors"
              >
                {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>

            {/* Botón de cerrar sesión en el header */}
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center gap-3 p-3 bg-red-600 hover:bg-red-700
                rounded-lg transition-all duration-200 font-medium
                ${!isOpen && 'justify-center'}
              `}
            >
              <LogOut size={20} />
              {isOpen && <span>Cerrar Sesión</span>}
            </button>
          </div>

          {/* Menú de navegación */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-lg
                        transition-all duration-200 font-medium
                        ${isActive
                          ? 'bg-blue-600 shadow-lg'
                          : 'hover:bg-blue-700 hover:shadow-md'
                        }
                        ${!isOpen && 'justify-center'}
                      `}
                      title={!isOpen ? item.label : ''}
                    >
                      <Icon size={22} className="flex-shrink-0" />
                      {isOpen && (
                        <span className="text-sm truncate">{item.label}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          {isOpen && (
            <div className="p-4 border-t border-blue-700">
              <p className="text-xs text-blue-300 text-center">
                Sistema CRM v1.0
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
