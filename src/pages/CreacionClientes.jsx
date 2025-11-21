import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { UserPlus, MapPin, Navigation, Users, Store, Building2, Phone, CheckCircle } from 'lucide-react';
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

const CreacionClientes = () => {
  const [mapCenter, setMapCenter] = useState([-17.3895, -66.1568]); // Default: Cochabamba
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
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Obtener ubicación del dispositivo manualmente
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

    // Guardar en localStorage
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    clientes.push({ ...formData, createdAt: new Date().toISOString() });
    localStorage.setItem('clientes', JSON.stringify(clientes));

    // Mostrar mensaje de éxito
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Limpiar formulario
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header elegante */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-4 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-lg">
              <UserPlus className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Creación de Clientes
              </h1>
              <p className="text-gray-600 mt-1">
                Registra nuevos clientes con su ubicación GPS
              </p>
            </div>
          </div>
        </div>

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-4 mb-6 flex items-center gap-3 animate-fadeIn">
            <CheckCircle className="text-green-600" size={24} />
            <p className="text-green-800 font-semibold">¡Cliente creado exitosamente!</p>
          </div>
        )}

        {/* Formulario de Creación */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos del Cliente */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="text-rose-600" size={24} />
                Datos del Cliente
              </h2>
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Celular */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Phone size={16} className="text-purple-600" />
                    Celular
                  </label>
                  <input
                    type="tel"
                    name="celular"
                    value={formData.celular}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: 70123456"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Tipo de Negocio - Listbox (Select) */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Building2 size={16} className="text-indigo-600" />
                    Tipo de Negocio
                  </label>
                  <select
                    name="tipoNegocio"
                    value={formData.tipoNegocio}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="">Seleccionar tipo de negocio...</option>
                    <option value="gimnasio">Gimnasio</option>
                    <option value="venta">Venta/Tienda</option>
                    <option value="condominio">Condominio</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ubicación GPS */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Navigation className="text-orange-600" size={24} />
                Ubicación GPS
              </h2>

              {/* Botones de ubicación */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <button
                  type="button"
                  onClick={getDeviceLocation}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:scale-105"
                >
                  <Navigation size={18} />
                  <span>Usar Mi Ubicación</span>
                </button>
                <div className="flex-1 text-center p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
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

            {/* Botón de Guardar */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-rose-600 to-pink-700 hover:from-rose-700 hover:to-pink-800 text-white rounded-xl transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-rose-500/50 hover:scale-105 flex items-center justify-center gap-2"
              >
                <UserPlus size={24} />
                <span>Crear Cliente</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreacionClientes;
