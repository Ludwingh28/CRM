import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

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
const Map = ({ center = [-17.82305, -63.217995], zoom = 13, markers = [], onMapClick, height = 400, showTileLayer = true, children }) => {
  useEffect(() => {
    // No-op, solo para asegurar que el fix de iconos se aplique
  }, []);

  return (
    <div style={{ height: typeof height === 'number' ? `${height}px` : height, width: '100%' }} className="rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 relative z-0">
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
        {children}
      </MapContainer>
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
