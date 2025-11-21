import { useState } from 'react';
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
  const [clientes, setClientes] = useState([]);

  const handleAddCliente = (cliente) => {
    setClientes(prev => [...prev, cliente]);
  };

  const handleDeleteCliente = (index) => {
    setClientes(prev => prev.filter((_, i) => i !== index));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'inventario-almacen': return <InventarioAlmacen />;
      case 'inventario-movil': return <InventarioMovil />;
      case 'gestion-clientes': return <GestionClientes clientes={clientes} onDeleteCliente={handleDeleteCliente} />;
      case 'creacion-clientes': return <CreacionClientes onAddCliente={handleAddCliente} />;
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