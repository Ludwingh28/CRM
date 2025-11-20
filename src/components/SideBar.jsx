import { LogOut, Package, Smartphone, MapPin, ShoppingCart, FileText, User, ChevronLeft } from 'lucide-react';


import { useState } from 'react';

function SideBar({ currentPage, setCurrentPage }) {
  const [collapsed, setCollapsed] = useState(false);
  const pages = [
    { id: 'inventario-almacen', name: 'Inventario Almacén', icon: Package, active: 'bg-blue-600 text-white shadow-blue-400/40 shadow' },
    { id: 'inventario-movil', name: 'Inventario Móvil', icon: Smartphone, active: 'bg-emerald-600 text-white shadow-emerald-400/40 shadow' },
    { id: 'mapa-clientes', name: 'Mapa de Clientes', icon: MapPin, active: 'bg-rose-600 text-white shadow-rose-400/40 shadow' },
    { id: 'gestion-ventas', name: 'Gestión de Ventas', icon: ShoppingCart, active: 'bg-violet-600 text-white shadow-violet-400/40 shadow' },
    { id: 'reportes-ventas', name: 'Reportes de Ventas', icon: FileText, active: 'bg-gradient-to-r from-amber-500 via-pink-500 to-indigo-500 text-white shadow-lg' },
  ];

  const handleLogout = () => {
    console.log('Cerrando sesión...');
  };

  return (
    <aside
      className={`
        ${collapsed ? 'w-20' : 'w-80'}
        h-screen bg-white rounded-3xl m-2 flex flex-col shadow-2xl border border-slate-100
        transition-all duration-300
      `}
    >
      {/* Header */}
      {/* Botón cerrar/abrir sidebar fuera del avatar */}
      <div className={`flex items-center justify-end pt-4 pr-4 ${collapsed ? 'pl-2' : 'pl-0'}`}>
        <button
          className="p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
          title={collapsed ? 'Abrir sidebar' : 'Cerrar sidebar'}
          onClick={() => setCollapsed((c) => !c)}
        >
          <ChevronLeft size={22} className={`text-slate-400 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div className={`flex flex-col items-center pb-6 ${collapsed ? 'px-2 pt-4' : 'px-6 pt-8'}`}>
        <div className={`w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mb-2 ${collapsed ? 'mx-auto' : ''}`}>
          <User size={32} className="text-violet-500" />
        </div>
        {!collapsed && (
          <div className="text-center">
            <div className="text-base font-semibold text-slate-800 leading-tight">Bienvenido</div>
            <div className="text-lg font-bold text-violet-600">Juan Pérez</div>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className={`flex-1 ${collapsed ? 'px-0 mt-2' : 'px-2 mt-2'}`}>
        <ul className="flex flex-col gap-1">
          {pages.map((page) => {
            const Icon = page.icon;
            const isActive = currentPage === page.id;
            return (
              <li key={page.id}>
                <button
                  onClick={() => setCurrentPage(page.id)}
                  className={`
                    w-full flex items-center ${collapsed ? 'justify-center' : 'gap-4 px-5'} py-3 rounded-xl
                    text-base font-medium transition cursor-pointer
                    ${isActive ? page.active : 'text-slate-700 hover:bg-slate-100'}
                  `}
                  title={collapsed ? page.name : ''}
                >
                  <Icon size={22} strokeWidth={2.2} />
                  {!collapsed && <span>{page.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className={`mt-auto ${collapsed ? 'px-0 pb-2' : 'px-2 pb-4'}`}>
        <div className={`border-t border-slate-200 pt-4 flex flex-col gap-2 ${collapsed ? 'items-center' : ''}`}>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-5'} py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition cursor-pointer`}
            title="Cerrar Sesión"
          >
            <LogOut size={20} />
            {!collapsed && <span>Cerrar Sesión</span>}
          </button>
          {!collapsed && (
            <div className="text-center mt-4">
              <p className="text-xs text-slate-400 font-semibold">Sistema CRM</p>
              <p className="text-xs text-slate-300">v1.0 • 2025</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
