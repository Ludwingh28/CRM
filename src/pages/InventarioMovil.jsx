import { Smartphone, Search, Plus, Scan } from 'lucide-react';

const InventarioMovil = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Smartphone className="text-green-600" size={32} />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Inventario Móvil
          </h1>
        </div>
        <p className="text-gray-600">
          Gestiona el inventario de productos en ruta y dispositivos móviles
        </p>
      </div>

      {/* Barra de acciones */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Barra de búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar productos móviles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Scan size={20} />
              <span className="hidden sm:inline">Escanear</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              <Plus size={20} />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500 py-12">
          <Smartphone size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg">El inventario móvil se mostrará aquí</p>
          <p className="text-sm mt-2">Implementa la lista de productos móviles según tus necesidades</p>
        </div>
      </div>
    </div>
  );
};

export default InventarioMovil;
