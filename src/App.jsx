import { useState } from 'react';
import Sidebar from './components/Sidebar';
import InventarioAlmacen from './pages/InventarioAlmacen';
import InventarioMovil from './pages/InventarioMovil';
import MapaClientes from './pages/MapaClientes';
import GestionVentas from './pages/GestionVentas';
import ReportesVentas from './pages/ReportesVentas';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('inventario-almacen');
  const [userName] = useState('Juan Pérez'); // Aquí puedes obtener el nombre del usuario desde tu sistema de autenticación

  // Función para renderizar el componente actual basado en la página seleccionada
  const renderPage = () => {
    switch (currentPage) {
      case 'inventario-almacen':
        return <InventarioAlmacen />;
      case 'inventario-movil':
        return <InventarioMovil />;
      case 'mapa-clientes':
        return <MapaClientes />;
      case 'gestion-ventas':
        return <GestionVentas />;
      case 'reportes-ventas':
        return <ReportesVentas />;
      default:
        return <InventarioAlmacen />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        userName={userName}
      />

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
