import { useState, useEffect } from 'react';
import Map from '../components/Map';
import { MapPin, Search, Filter, Calendar, Edit, Trash2 } from 'lucide-react';
import Table from '../components/Table';
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
  const [clientes, setClientes] = useState(() => {
    try {
      const stored = localStorage.getItem('clientes');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse clientes from localStorage:', e);
      return [];
    }
  });
  const [mapCenter, setMapCenter] = useState([-17.823050, -63.217995]); // Default: Santa Cruz (usuario)
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRuta, setFilterRuta] = useState('');
  const [filterZona, setFilterZona] = useState(''); // mayorista, minorista, todos
  const [filterDia, setFilterDia] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Obtener ubicación del dispositivo manualmente
  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          setLoadingLocation(false);
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          alert('No se pudo obtener la ubicación del dispositivo');
          setLoadingLocation(false);
        }
      );
    } else {
      alert('Geolocalización no soportada por este navegador');
    }
  };

  // Obtener ubicación actual del dispositivo al cargar
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  // Clientes are initialized from localStorage via useState lazy initializer.

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
    // Filtrar por zona (DH/DM)
    const matchesZona = !filterZona || filterZona === 'todos' || cliente.zona === filterZona;
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
                <option value="DH">DH (Minorista)</option>
                <option value="DM">DM (Mayorista)</option>
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
          <Map
            center={mapCenter}
            zoom={13}
            height={500}
            markers={filteredClientes.filter(c => c.latitud && c.longitud).map(cliente => ({
              position: [parseFloat(cliente.latitud), parseFloat(cliente.longitud)],
              popup: (
                <div className="p-2">
                  <p className="font-bold text-lg">{cliente.nombreVenta}</p>
                  <p className="text-sm text-gray-600">Dueña: {cliente.nombreDuena}</p>
                  <p className="text-sm text-gray-600">Zona: {cliente.zona}</p>
                  <p className="text-sm text-gray-600">Celular: {cliente.celular}</p>
                  <p className="text-xs text-gray-500 mt-1 capitalize">{cliente.tipoNegocio}</p>
                </div>
              )
            }))}
          />
        </div>

        {/* Lista de clientes */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <Table
            columns={[
              { key: 'zona', label: 'Zona', className: 'text-white' },
              { key: 'nombreVenta', label: 'Nombre Venta', className: 'text-white' },
              { key: 'nombreDuena', label: 'Dueña', className: 'text-white' },
              { key: 'celular', label: 'Celular', className: 'text-white' },
              { key: 'tipoNegocio', label: 'Tipo Negocio', className: 'text-white' },
              { key: 'ubicacion', label: 'Ubicación', className: 'text-white' },
            ]}
            data={filteredClientes.map(c => ({
              ...c,
              zona: <span className="text-gray-900">{c.zona}</span>,
              nombreVenta: <span className="text-gray-900">{c.nombreVenta}</span>,
              nombreDuena: <span className="text-gray-900">{c.nombreDuena}</span>,
              celular: <span className="text-gray-900">{c.celular}</span>,
              tipoNegocio: <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold capitalize">{c.tipoNegocio}</span>,
              ubicacion: <span className="text-gray-900">{`${c.latitud}, ${c.longitud}`}</span>,
            }))}
            color="red"
            emptyMessage={<><MapPin size={64} className="mx-auto mb-4 text-gray-300" /><p className="text-gray-500 text-lg font-medium">No hay clientes registrados</p><p className="text-gray-400 text-sm mt-2">Ve a "Creación de Clientes" para agregar uno nuevo</p></>}
            actionsHeader="Acciones"
            renderActions={(_, index) => (
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
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default GestionClientes;
