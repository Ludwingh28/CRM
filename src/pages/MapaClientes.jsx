import { MapPin, Search, Navigation, Filter } from 'lucide-react';

const MapaClientes = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="text-red-600" size={32} />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Mapa de Clientes
          </h1>
        </div>
        <p className="text-gray-600">
          Visualiza la ubicación de tus clientes en el mapa
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
              placeholder="Buscar clientes o ubicaciones..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Filter size={20} />
              <span className="hidden sm:inline">Filtrar</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
              <Navigation size={20} />
              <span className="hidden sm:inline">Mi ubicación</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal - Mapa */}
      <div className="bg-white rounded-lg shadow-md p-6 h-[500px] md:h-[600px]">
        <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center text-gray-500">
            <MapPin size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg">El mapa de clientes se mostrará aquí</p>
            <p className="text-sm mt-2">Integra Google Maps, Leaflet u otra librería de mapas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaClientes;
