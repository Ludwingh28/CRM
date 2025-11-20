import { useState } from 'react';
import { Package, Plus, Search, Filter, Calendar, DollarSign, Hash, Tag, Edit, Trash2 } from 'lucide-react';

const InventarioAlmacen = () => {
  const [showForm, setShowForm] = useState(false);
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    tipo: '',
    nombre: '',
    cantidad: '',
    precioCompra: '',
    precioMayorista: '',
    precioMinorista: '',
    fechaIngreso: new Date().toISOString().split('T')[0],
    fechaVencimiento: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProductos(prev => [...prev, { ...formData, createdAt: new Date() }]);
    setFormData({
      id: '',
      tipo: '',
      nombre: '',
      cantidad: '',
      precioCompra: '',
      precioMayorista: '',
      precioMinorista: '',
      fechaIngreso: new Date().toISOString().split('T')[0],
      fechaVencimiento: '',
    });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    setProductos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header elegante */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
              <Package className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Inventario en Almacén
              </h1>
              <p className="text-gray-600 mt-1">
                Gestiona los productos de tu almacén principal
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
                placeholder="Buscar productos..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-semibold text-gray-700 hover:scale-105">
              <Filter size={20} />
              <span>Filtrar</span>
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-blue-500/50 hover:scale-105"
            >
              <Plus size={20} />
              <span>Nuevo Producto</span>
            </button>
          </div>
        </div>

        {/* Formulario hermoso */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 border border-gray-100 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="text-blue-600" size={24} />
              </div>
              Agregar Nuevo Producto
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* ID Producto */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Hash size={16} className="text-blue-600" />
                    ID Producto
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: PROD001"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Tipo */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Tag size={16} className="text-purple-600" />
                    Tipo de Producto
                  </label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="bebida">Bebida</option>
                    <option value="snack">Snack</option>
                    <option value="lacteo">Lácteo</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>

                {/* Nombre */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Package size={16} className="text-green-600" />
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Coca Cola 500ml"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Cantidad */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Hash size={16} className="text-orange-600" />
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Precio Compra */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign size={16} className="text-green-600" />
                    Precio de Compra
                  </label>
                  <input
                    type="number"
                    name="precioCompra"
                    value={formData.precioCompra}
                    onChange={handleInputChange}
                    required
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Precio Mayorista */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign size={16} className="text-blue-600" />
                    Precio Mayorista
                  </label>
                  <input
                    type="number"
                    name="precioMayorista"
                    value={formData.precioMayorista}
                    onChange={handleInputChange}
                    required
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Precio Minorista (DH) */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign size={16} className="text-purple-600" />
                    Precio Minorista (DH)
                  </label>
                  <input
                    type="number"
                    name="precioMinorista"
                    value={formData.precioMinorista}
                    onChange={handleInputChange}
                    required
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Fecha Vencimiento */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Calendar size={16} className="text-red-600" />
                    Fecha de Vencimiento
                  </label>
                  <input
                    type="date"
                    name="fechaVencimiento"
                    value={formData.fechaVencimiento}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-blue-500/50"
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
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Tipo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Cantidad</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">P. Compra</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">P. Mayorista</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">P. Minorista</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">F. Ingreso</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">F. Vencimiento</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="px-6 py-16 text-center">
                      <Package size={64} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 text-lg font-medium">No hay productos registrados</p>
                      <p className="text-gray-400 text-sm mt-2">Agrega tu primer producto usando el botón "Nuevo Producto"</p>
                    </td>
                  </tr>
                ) : (
                  productos.map((producto, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{producto.id}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                          {producto.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">{producto.nombre}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{producto.cantidad}</td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600">${producto.precioCompra}</td>
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">${producto.precioMayorista}</td>
                      <td className="px-6 py-4 text-sm font-medium text-purple-600">${producto.precioMinorista}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{producto.fechaIngreso}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{producto.fechaVencimiento}</td>
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

export default InventarioAlmacen;
