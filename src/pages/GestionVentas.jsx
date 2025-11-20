import { ShoppingCart, Search, Plus, Filter, TrendingUp } from 'lucide-react';

const GestionVentas = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <ShoppingCart className="text-purple-600" size={32} />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Gestión de Ventas
          </h1>
        </div>
        <p className="text-gray-600">
          Administra y realiza seguimiento de todas tus ventas
        </p>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ventas Hoy</p>
              <p className="text-2xl font-bold text-purple-600">$0</p>
            </div>
            <TrendingUp className="text-purple-400" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ventas Mes</p>
              <p className="text-2xl font-bold text-purple-600">$0</p>
            </div>
            <TrendingUp className="text-purple-400" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Pedidos</p>
              <p className="text-2xl font-bold text-purple-600">0</p>
            </div>
            <ShoppingCart className="text-purple-400" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-orange-600">0</p>
            </div>
            <ShoppingCart className="text-orange-400" size={32} />
          </div>
        </div>
      </div>

      {/* Barra de acciones */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Barra de búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar ventas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Filter size={20} />
              <span className="hidden sm:inline">Filtrar</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              <Plus size={20} />
              <span className="hidden sm:inline">Nueva Venta</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500 py-12">
          <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg">La lista de ventas se mostrará aquí</p>
          <p className="text-sm mt-2">Implementa la tabla de ventas según tus necesidades</p>
        </div>
      </div>
    </div>
  );
};

export default GestionVentas;
