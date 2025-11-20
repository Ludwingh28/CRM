import { useState } from 'react';
import SideBar from './components/SideBar';
import InventarioAlmacen from './pages/InventarioAlmacen';
import InventarioMovil from './pages/InventarioMovil';
import MapaClientes from './pages/MapaClientes';
import GestionVentas from './pages/GestionVentas';
import ReportesVentas from './pages/ReportesVentas';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('inventario-almacen');

  const renderPage = () => {
    switch (currentPage) {
      case 'inventario-almacen': return <InventarioAlmacen />;
      case 'inventario-movil': return <InventarioMovil />;
      case 'mapa-clientes': return <MapaClientes />;
      case 'gestion-ventas': return <GestionVentas />;
      case 'reportes-ventas': return <ReportesVentas />;
      default: return <InventarioAlmacen />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <SideBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;