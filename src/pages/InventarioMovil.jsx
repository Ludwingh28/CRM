import { useState } from 'react';
import { Smartphone, Plus, Search, Filter, Calendar, Truck, User, Package, Hash, FileText, Edit, Trash2 } from 'lucide-react';

const InventarioMovil = () => {
  const [showForm, setShowForm] = useState(false);
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    idCamion: '',
    nombreChofer: '',
    idProducto: '',
    nombreProducto: '',
    fechaIngreso: new Date().toISOString().split('T')[0],
    cantidad: '',
    detalle: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProductos(prev => [...prev, { ...formData, createdAt: new Date() }]);
    setFormData({
      idCamion: '',
      nombreChofer: '',
      idProducto: '',
      nombreProducto: '',
      fechaIngreso: new Date().toISOString().split('T')[0],
      cantidad: '',
      detalle: '',
    });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    setProductos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header elegante */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
              <Smartphone className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Inventario Móvil
              </h1>
              <p className="text-gray-600 mt-1">
                Gestiona productos en ruta y camiones de distribución
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
                placeholder="Buscar por camión, chofer o producto..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-semibold text-gray-700 hover:scale-105">
              <Filter size={20} />
              <span>Filtrar</span>
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-green-500/50 hover:scale-105"
            >
              <Plus size={20} />
              <span>Agregar Producto</span>
            </button>
          </div>
        </div>

        {/* Formulario hermoso */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 border border-gray-100 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Plus className="text-green-600" size={24} />
              </div>
              Agregar Producto al Inventario Móvil
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ID Camión */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Truck size={16} className="text-green-600" />
                    ID Camión
                  </label>
                  <input
                    type="text"
                    name="idCamion"
                    value={formData.idCamion}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: CAM001"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Nombre Chofer */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User size={16} className="text-blue-600" />
                    Nombre del Chofer
                  </label>
                  <input
                    type="text"
                    name="nombreChofer"
                    value={formData.nombreChofer}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Carlos Rodríguez"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* ID Producto */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Hash size={16} className="text-purple-600" />
                    ID Producto
                  </label>
                  <input
                    type="text"
                    name="idProducto"
                    value={formData.idProducto}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: PROD001"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Nombre Producto */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Package size={16} className="text-orange-600" />
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    name="nombreProducto"
                    value={formData.nombreProducto}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Coca Cola 500ml"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Fecha Ingreso */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Calendar size={16} className="text-indigo-600" />
                    Fecha de Ingreso
                  </label>
                  <input
                    type="date"
                    name="fechaIngreso"
                    value={formData.fechaIngreso}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Cantidad */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Hash size={16} className="text-red-600" />
                    Cantidad
                  </label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleInputChange}
                    required
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Detalle */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FileText size={16} className="text-gray-600" />
                    Detalle
                  </label>
                  <textarea
                    name="detalle"
                    value={formData.detalle}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Observaciones o detalles adicionales..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  />
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-green-500/50"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de productos hermosa */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">ID Camión</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Chofer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">ID Producto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nombre Producto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Fecha Ingreso</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Cantidad</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Detalle</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-16 text-center">
                      <Smartphone size={64} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 text-lg font-medium">No hay productos en inventario móvil</p>
                      <p className="text-gray-400 text-sm mt-2">Agrega tu primer producto usando el botón "Agregar Producto"</p>
                    </td>
                  </tr>
                ) : (
                  productos.map((producto, index) => (
                    <tr key={index} className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Truck size={16} className="text-green-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{producto.idCamion}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">{producto.nombreChofer}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{producto.idProducto}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">{producto.nombreProducto}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{producto.fechaIngreso}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {producto.cantidad}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{producto.detalle || '-'}</td>
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

export default InventarioMovil;
