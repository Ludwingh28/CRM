import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import SideBar from './components/SideBar';
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


  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

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
    <div className="flex h-screen bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden relative z-0">
      {/* Botón hamburguesa para móvil */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-all duration-300"
          onClick={toggleMobileMenu}
        />
      )}

      {/* SIDEBAR COMPONENTE GLOBAL */}
      <SideBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userName={userName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

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
