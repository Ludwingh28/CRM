import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { MapPin, Plus, Search, Navigation, Users, Store, Building2, Dumbbell, Home, Edit, Trash2, X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para manejar el click en el mapa
const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

const MapaClientes = () => {
  const [showForm, setShowForm] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [mapCenter, setMapCenter] = useState([-17.3895, -66.1568]); // Cochabamba, Bolivia
  const [formData, setFormData] = useState({
    zona: '',
    nombreDuena: '',
    nombreVenta: '',
    celular: '',
    tipoNegocio: '',
    latitud: '',
    longitud: '',
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [useDeviceLocation, setUseDeviceLocation] = useState(false);

  // Obtener ubicación del dispositivo
  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            latitud: latitude.toFixed(6),
            longitud: longitude.toFixed(6),
          }));
          setSelectedLocation({ lat: latitude, lng: longitude });
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          alert('No se pudo obtener la ubicación del dispositivo');
        }
      );
    } else {
      alert('Geolocalización no soportada por este navegador');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMapClick = (latlng) => {
    setFormData(prev => ({
      ...prev,
      latitud: latlng.lat.toFixed(6),
      longitud: latlng.lng.toFixed(6),
    }));
    setSelectedLocation(latlng);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.latitud || !formData.longitud) {
      alert('Por favor selecciona una ubicación en el mapa');
      return;
    }
    setClientes(prev => [...prev, { ...formData, createdAt: new Date() }]);
    setFormData({
      zona: '',
      nombreDuena: '',
      nombreVenta: '',
      celular: '',
      tipoNegocio: '',
      latitud: '',
      longitud: '',
    });
    setSelectedLocation(null);
    setShowForm(false);
  };

  const handleDelete = (index) => {
    setClientes(prev => prev.filter((_, i) => i !== index));
  };

  const tiposNegocio = [
    { value: 'gimnasio', label: 'Gimnasio', icon: Dumbbell },
    { value: 'venta', label: 'Venta/Tienda', icon: Store },
    { value: 'condominio', label: 'Condominio', icon: Building2 },
    { value: 'otros', label: 'Otros', icon: Home },
  ];

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
                Mapa de Clientes
              </h1>
              <p className="text-gray-600 mt-1">
                Visualiza y gestiona tus clientes por ubicación
              </p>
            </div>
          </div>
        </div>

        {/* Barra de acciones mejorada */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar clientes por nombre, zona o tipo..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-red-500/50 hover:scale-105"
            >
              <Plus size={20} />
              <span>Agregar Cliente</span>
            </button>
          </div>
        </div>

        {/* Formulario hermoso */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Plus className="text-red-600" size={24} />
                </div>
                Agregar Nuevo Cliente
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Zona */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin size={16} className="text-red-600" />
                    Zona
                  </label>
                  <input
                    type="text"
                    name="zona"
                    value={formData.zona}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Zona Sur, Zona Norte..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Nombre Dueña */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Users size={16} className="text-blue-600" />
                    Nombre de la Dueña
                  </label>
                  <input
                    type="text"
                    name="nombreDuena"
                    value={formData.nombreDuena}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: María López"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Nombre Venta */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Store size={16} className="text-green-600" />
                    Nombre de la Venta
                  </label>
                  <input
                    type="text"
                    name="nombreVenta"
                    value={formData.nombreVenta}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Tienda Don Pedro"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Celular */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Users size={16} className="text-purple-600" />
                    Celular
                  </label>
                  <input
                    type="tel"
                    name="celular"
                    value={formData.celular}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: 70123456"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Tipo de Negocio */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <Building2 size={16} className="text-indigo-600" />
                    Tipo de Negocio
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {tiposNegocio.map((tipo) => {
                      const Icon = tipo.icon;
                      return (
                        <button
                          key={tipo.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, tipoNegocio: tipo.value }))}
                          className={`
                            p-4 rounded-xl border-2 transition-all duration-200
                            ${formData.tipoNegocio === tipo.value
                              ? 'border-red-500 bg-red-50 scale-105'
                              : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                            }
                          `}
                        >
                          <Icon size={24} className={`mx-auto mb-2 ${formData.tipoNegocio === tipo.value ? 'text-red-600' : 'text-gray-400'}`} />
                          <p className={`text-sm font-semibold ${formData.tipoNegocio === tipo.value ? 'text-red-600' : 'text-gray-600'}`}>
                            {tipo.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Ubicación GPS */}
              <div className="border-t border-gray-200 pt-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Navigation size={16} className="text-orange-600" />
                  Ubicación GPS
                </label>

                {/* Botones de ubicación */}
                <div className="flex gap-3 mb-4">
                  <button
                    type="button"
                    onClick={getDeviceLocation}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:scale-105"
                  >
                    <Navigation size={18} />
                    <span>Usar Mi Ubicación</span>
                  </button>
                  <div className="flex-1 text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">o haz click en el mapa</p>
                    <p className="text-xs font-semibold text-gray-700">
                      {formData.latitud && formData.longitud
                        ? `${formData.latitud}, ${formData.longitud}`
                        : 'No seleccionado'
                      }
                    </p>
                  </div>
                </div>

                {/* Mapa */}
                <div className="h-96 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                  <MapContainer
                    center={mapCenter}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler onLocationSelect={handleMapClick} />
                    {selectedLocation && (
                      <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
                        <Popup>Ubicación seleccionada</Popup>
                      </Marker>
                    )}
                  </MapContainer>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-semibold text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-red-500/50"
                >
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        )}

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
              {clientes.map((cliente, index) => (
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
                {clientes.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <MapPin size={64} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 text-lg font-medium">No hay clientes registrados</p>
                      <p className="text-gray-400 text-sm mt-2">Agrega tu primer cliente usando el botón "Agregar Cliente"</p>
                    </td>
                  </tr>
                ) : (
                  clientes.map((cliente, index) => (
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

export default MapaClientes;
