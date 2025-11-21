import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Search, Filter, Calendar, Edit, Trash2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const GestionClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [mapCenter, setMapCenter] = useState([-17.3895, -66.1568]); // Default: Cochabamba
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRuta, setFilterRuta] = useState('');
  const [filterZona, setFilterZona] = useState(''); // mayorista, minorista, todos
  const [filterDia, setFilterDia] = useState('');

  // Obtener ubicación actual del dispositivo al cargar
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.log('No se pudo obtener ubicación, usando Cochabamba por defecto');
        }
      );
    }
  }, []);

  // Cargar clientes del localStorage (si los hay)
  useEffect(() => {
    const storedClientes = localStorage.getItem('clientes');
    if (storedClientes) {
      setClientes(JSON.parse(storedClientes));
    }
  }, []);

  const handleDelete = (index) => {
    const updatedClientes = clientes.filter((_, i) => i !== index);
    setClientes(updatedClientes);
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
  };

  // Filtrar clientes
  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nombreVenta?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cliente.nombreDuena?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRuta = !filterRuta || cliente.zona === filterRuta;
    const matchesZona = !filterZona || filterZona === 'todos' || cliente.tipoNegocio === filterZona;
    const matchesDia = !filterDia; // Por ahora, puedes implementar filtro por día después

    return matchesSearch && matchesRuta && matchesZona && matchesDia;
  });

  // Obtener rutas únicas para el filtro
  const rutasUnicas = [...new Set(clientes.map(c => c.zona))].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header elegante */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-lg">
              <MapPin className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Gestión Clientes
              </h1>
              <p className="text-gray-600 mt-1">
                Visualiza y gestiona todos tus clientes
              </p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="text-red-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Filtros de Búsqueda</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Búsqueda general */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filtro por Ruta */}
            <div>
              <select
                value={filterRuta}
                onChange={(e) => setFilterRuta(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              >
                <option value="">Todas las Rutas</option>
                {rutasUnicas.map((ruta, idx) => (
                  <option key={idx} value={ruta}>{ruta}</option>
                ))}
              </select>
            </div>

            {/* Filtro por Zona (Mayorista/Minorista) */}
            <div>
              <select
                value={filterZona}
                onChange={(e) => setFilterZona(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              >
                <option value="todos">Todas las Zonas</option>
                <option value="gimnasio">Gimnasio</option>
                <option value="venta">Venta/Tienda</option>
                <option value="condominio">Condominio</option>
                <option value="otros">Otros</option>
              </select>
            </div>

            {/* Filtro por Día */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                value={filterDia}
                onChange={(e) => setFilterDia(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Mostrar cantidad de resultados */}
          <div className="mt-4 text-sm text-gray-600">
            Mostrando <span className="font-semibold text-red-600">{filteredClientes.length}</span> de {clientes.length} clientes
          </div>
        </div>

        {/* Mapa principal con clientes */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="text-red-600" size={24} />
            Mapa de Clientes
          </h3>
          <div className="h-[500px] rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredClientes.map((cliente, index) => (
                <Marker
                  key={index}
                  position={[parseFloat(cliente.latitud), parseFloat(cliente.longitud)]}
                >
                  <Popup>
                    <div className="p-2">
                      <p className="font-bold text-lg">{cliente.nombreVenta}</p>
                      <p className="text-sm text-gray-600">Dueña: {cliente.nombreDuena}</p>
                      <p className="text-sm text-gray-600">Zona: {cliente.zona}</p>
                      <p className="text-sm text-gray-600">Celular: {cliente.celular}</p>
                      <p className="text-xs text-gray-500 mt-1 capitalize">{cliente.tipoNegocio}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Lista de clientes */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-red-600 to-pink-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Zona</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nombre Venta</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Dueña</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Celular</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Tipo Negocio</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Ubicación</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredClientes.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <MapPin size={64} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 text-lg font-medium">No hay clientes registrados</p>
                      <p className="text-gray-400 text-sm mt-2">Ve a "Creación de Clientes" para agregar uno nuevo</p>
                    </td>
                  </tr>
                ) : (
                  filteredClientes.map((cliente, index) => (
                    <tr key={index} className="hover:bg-red-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{cliente.zona}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">{cliente.nombreVenta}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{cliente.nombreDuena}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{cliente.celular}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold capitalize">
                          {cliente.tipoNegocio}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {cliente.latitud}, {cliente.longitud}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all hover:scale-110">
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all hover:scale-110"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionClientes;
