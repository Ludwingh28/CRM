import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Search, Users, Edit, Trash2, Calendar, Navigation as NavigationIcon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const GestionClientes = ({ clientes, onDeleteCliente }) => {
  const [mapCenter, setMapCenter] = useState([-17.3895, -66.1568]); // Default: Cochabamba
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroRuta, setFiltroRuta] = useState('');
  const [filtroZona, setFiltroZona] = useState('todos');
  const [filtroDia, setFiltroDia] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Obtener ubicación actual del dispositivo al cargar
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          setIsLoadingLocation(false);
          // Mantener Cochabamba como fallback
        }
      );
    } else {
      setIsLoadingLocation(false);
    }
  }, []);

  // Filtrar clientes
  const clientesFiltrados = clientes.filter(cliente => {
    const matchSearch = searchTerm === '' ||
      cliente.nombreVenta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.nombreDuena.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.zona.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.tipoNegocio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchRuta = filtroRuta === '' ||
      (cliente.ruta && cliente.ruta.toLowerCase().includes(filtroRuta.toLowerCase()));

    const matchZona = filtroZona === 'todos' ||
      (cliente.tipoZona && cliente.tipoZona === filtroZona);

    const matchDia = filtroDia === '' ||
      (cliente.diaVisita && cliente.diaVisita === filtroDia);

    return matchSearch && matchRuta && matchZona && matchDia;
  });

  const handleDelete = (index) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      onDeleteCliente(index);
    }
  };

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
                Gestión de Clientes
              </h1>
              <p className="text-gray-600 mt-1">
                Visualiza y administra tus clientes por ubicación
              </p>
            </div>
          </div>
        </div>

        {/* Barra de filtros mejorada */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Búsqueda general */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filtro por ruta */}
            <div className="relative">
              <NavigationIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Filtrar por ruta..."
                value={filtroRuta}
                onChange={(e) => setFiltroRuta(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filtro por zona (Mayorista/Minorista) */}
            <div className="relative">
              <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filtroZona}
                onChange={(e) => setFiltroZona(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
              >
                <option value="todos">Todas las zonas</option>
                <option value="mayorista">Mayorista</option>
                <option value="minorista">Minorista</option>
              </select>
            </div>

            {/* Filtro por día */}
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filtroDia}
                onChange={(e) => setFiltroDia(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
              >
                <option value="">Todos los días</option>
                <option value="lunes">Lunes</option>
                <option value="martes">Martes</option>
                <option value="miércoles">Miércoles</option>
                <option value="jueves">Jueves</option>
                <option value="viernes">Viernes</option>
                <option value="sábado">Sábado</option>
                <option value="domingo">Domingo</option>
              </select>
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-bold text-red-600">{clientesFiltrados.length}</span> de <span className="font-bold">{clientes.length}</span> clientes
            </p>
          </div>
        </div>

        {/* Mapa principal con clientes */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="text-red-600" size={24} />
            Mapa de Clientes
          </h3>
          <div className="h-[500px] rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
            {!isLoadingLocation && (
              <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {clientesFiltrados.map((cliente, index) => (
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
                        {cliente.ruta && <p className="text-xs text-gray-500">Ruta: {cliente.ruta}</p>}
                        {cliente.tipoZona && <p className="text-xs text-gray-500 capitalize">Tipo: {cliente.tipoZona}</p>}
                        {cliente.diaVisita && <p className="text-xs text-gray-500 capitalize">Día: {cliente.diaVisita}</p>}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold">Ruta</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Tipo Zona</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Día Visita</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Ubicación</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clientesFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="px-6 py-16 text-center">
                      <MapPin size={64} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 text-lg font-medium">
                        {clientes.length === 0 ? 'No hay clientes registrados' : 'No se encontraron clientes con los filtros aplicados'}
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        {clientes.length === 0 ? 'Agrega tu primer cliente en "Creación de Clientes"' : 'Intenta ajustar los filtros'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  clientesFiltrados.map((cliente, index) => (
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
                      <td className="px-6 py-4 text-sm text-gray-600">{cliente.ruta || '-'}</td>
                      <td className="px-6 py-4 text-sm">
                        {cliente.tipoZona ? (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            cliente.tipoZona === 'mayorista' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {cliente.tipoZona}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{cliente.diaVisita || '-'}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {cliente.latitud}, {cliente.longitud}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all hover:scale-110 cursor-pointer">
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all hover:scale-110 cursor-pointer"
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
