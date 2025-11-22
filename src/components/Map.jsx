import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigation } from 'lucide-react';

// Fix para los iconos de Leaflet (solo una vez por app)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para manejar el click en el mapa (opcional)
function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click: (e) => {
      if (onLocationSelect) onLocationSelect(e.latlng);
    },
  });
  return null;
}

/**
 * Componente global de Mapa con Leaflet
 * @param {Array} center - [lat, lng]
 * @param {number} zoom
 * @param {Array} markers - [{ position: [lat, lng], popup?: string|ReactNode }]
 * @param {function} onMapClick - callback(latlng) cuando se hace click en el mapa
 * @param {number|string} height - altura del mapa (ej: '400px' o 400)
 * @param {boolean} showTileLayer - mostrar capa base (default true)
 */

// Botón flotante para centrar ubicación (ya no se usa como componente separado)
// function LocateButton({ onLocate, loading }) {
//   const handleClick = (e) => {
//     e.stopPropagation();
//     onLocate();
//   };
//   return (
//     <button... />
//   );
// }

// Hook para centrar el mapa (ya no se usa)
// function useLocate(map) { ... }

const Map = ({ center = [-17.82305, -63.217995], zoom = 13, markers = [], onMapClick, height = 400, showTileLayer = true, children }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [userLocationMarker, setUserLocationMarker] = useState(null);

  useEffect(() => {
    // No-op, solo para asegurar que el fix de iconos se aplique
  }, []);

  // Componente interno para capturar la instancia del mapa
  function MapInstanceCapture() {
    const map = useMap();
    useEffect(() => {
      setMapInstance(map);
    }, [map]);
    return null;
  }

  // Hook personalizado para el botón de ubicación
  const [loading, setLoading] = useState(false);
  const handleLocate = () => {
    if (!mapInstance) return;
    if (!navigator.geolocation) {
      alert('Geolocalización no soportada por este navegador');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        mapInstance.setView([latitude, longitude], mapInstance.getZoom(), { animate: true });
        // Agregar marcador en la ubicación del usuario
        setUserLocationMarker({
          position: [latitude, longitude],
          popup: `Tu ubicación\n${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        });
        setLoading(false);
      },
      () => {
        alert('No se pudo obtener la ubicación');
        setLoading(false);
      }
    );
  };

  return (
    <div style={{ height: typeof height === 'number' ? `${height}px` : height, width: '100%' }} className="rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 relative">
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        {showTileLayer && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}
        {onMapClick && <MapClickHandler onLocationSelect={onMapClick} />}
        {markers.map((m, i) => (
          <Marker key={i} position={m.position}>
            {m.popup && <Popup>{m.popup}</Popup>}
          </Marker>
        ))}
        {/* Marcador de ubicación del usuario */}
        {userLocationMarker && (
          <Marker position={userLocationMarker.position}>
            <Popup>{userLocationMarker.popup}</Popup>
          </Marker>
        )}
        {children}
        <MapInstanceCapture />
      </MapContainer>
      {/* Botón de ubicación flotante FUERA del MapContainer */}
      <button
        type="button"
        onClick={handleLocate}
        className="absolute bottom-4 right-4 z-[1000] bg-white hover:bg-gray-100 text-blue-600 shadow-md rounded-full p-3 transition-all duration-150 flex items-center justify-center border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        title="Centrar en mi ubicación"
        style={{ boxShadow: '0 2px 8px 0 rgba(30,64,175,0.10)' }}
        disabled={loading}
      >
        {loading ? (
          <svg className="h-5 w-5 text-blue-400 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        ) : (
          <Navigation size={24} strokeWidth={2.2} />
        )}
      </button>
    </div>
  );
};

Map.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  markers: PropTypes.array,
  onMapClick: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showTileLayer: PropTypes.bool,
  children: PropTypes.node,
};

export default Map;
