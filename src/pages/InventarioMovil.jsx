import { useState, useEffect } from 'react';
import { Smartphone, Plus, Search, Filter, Calendar, Truck, User, Package, Hash, FileText, Edit, Trash2, AlertCircle } from 'lucide-react';
import Table from '../components/Table';

const InventarioMovil = () => {
  const [showForm, setShowForm] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productosAlmacen, setProductosAlmacen] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    idCamion: '',
    nombreChofer: '',
    idProducto: '',
    nombreProducto: '',
    fechaIngreso: new Date().toISOString().split('T')[0],
    cantidad: '',
    detalle: '',
  });

  // Cargar productos móviles desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('inventarioMovil');
    if (stored) {
      setProductos(JSON.parse(stored));
    }
  }, []);

  // Cargar productos del almacén
  useEffect(() => {
    const stored = localStorage.getItem('inventarioAlmacen');
    if (stored) {
      setProductosAlmacen(JSON.parse(stored));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductoChange = (e) => {
    const productoId = e.target.value;
    if (productoId) {
      const producto = productosAlmacen.find(p => p.id === productoId);
      if (producto) {
        setProductoSeleccionado(producto);
        setFormData(prev => ({
          ...prev,
          idProducto: producto.id,
          nombreProducto: producto.nombre,
        }));
      }
    } else {
      setProductoSeleccionado(null);
      setFormData(prev => ({
        ...prev,
        idProducto: '',
        nombreProducto: '',
        cantidad: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que hay producto seleccionado y cantidad
    if (!productoSeleccionado) {
      alert('Selecciona un producto del almacén');
      return;
    }

    const cantidadSolicitada = parseInt(formData.cantidad);
    const cantidadDisponible = parseInt(productoSeleccionado.cantidad);

    if (cantidadSolicitada > cantidadDisponible) {
      alert(`No hay suficiente stock. Disponible: ${cantidadDisponible} unidades`);
      return;
    }

    // Restar del inventario almacén
    const nuevosProductosAlmacen = productosAlmacen.map(p => {
      if (p.id === productoSeleccionado.id) {
        return {
          ...p,
          cantidad: (parseInt(p.cantidad) - cantidadSolicitada).toString()
        };
      }
      return p;
    });

    // Guardar almacén actualizado
    localStorage.setItem('inventarioAlmacen', JSON.stringify(nuevosProductosAlmacen));
    setProductosAlmacen(nuevosProductosAlmacen);

    // Agregar al inventario móvil
    const newProductos = [...productos, { ...formData, createdAt: new Date() }];
    setProductos(newProductos);
    localStorage.setItem('inventarioMovil', JSON.stringify(newProductos));

    // Resetear formulario
    setFormData({
      idCamion: '',
      nombreChofer: '',
      idProducto: '',
      nombreProducto: '',
      fechaIngreso: new Date().toISOString().split('T')[0],
      cantidad: '',
      detalle: '',
    });
    setProductoSeleccionado(null);
    setShowForm(false);
  };

  const handleDelete = (index) => {
    const newProductos = productos.filter((_, i) => i !== index);
    setProductos(newProductos);
    localStorage.setItem('inventarioMovil', JSON.stringify(newProductos));
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
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-semibold text-gray-700 hover:scale-105 cursor-pointer">
              <Filter size={20} />
              <span>Filtrar</span>
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-green-500/50 hover:scale-105 cursor-pointer"
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

                {/* Seleccionar Producto del Almacén */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Package size={16} className="text-purple-600" />
                    Seleccionar Producto del Almacén
                  </label>
                  <select
                    value={formData.idProducto}
                    onChange={handleProductoChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="">Seleccionar producto...</option>
                    {productosAlmacen.filter(p => parseInt(p.cantidad) > 0).map(producto => (
                      <option key={producto.id} value={producto.id}>
                        {producto.id} - {producto.nombre} (Disponible: {producto.cantidad} unidades)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Información del producto seleccionado */}
                {productoSeleccionado && (
                  <div className="md:col-span-2 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <AlertCircle size={16} />
                      Información del Producto
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-blue-600 font-medium">ID:</span>
                        <span className="ml-2 text-gray-800">{productoSeleccionado.id}</span>
                      </div>
                      <div>
                        <span className="text-blue-600 font-medium">Tipo:</span>
                        <span className="ml-2 text-gray-800">{productoSeleccionado.tipo}</span>
                      </div>
                      <div>
                        <span className="text-blue-600 font-medium">Disponible:</span>
                        <span className="ml-2 text-gray-800">{productoSeleccionado.cantidad} unidades</span>
                      </div>
                      <div>
                        <span className="text-blue-600 font-medium">Precio Minorista:</span>
                        <span className="ml-2 text-gray-800">${productoSeleccionado.precioMinorista}</span>
                      </div>
                    </div>
                  </div>
                )}

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
                    Cantidad {productoSeleccionado && `(Máx: ${productoSeleccionado.cantidad})`}
                  </label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleInputChange}
                    required
                    placeholder="0"
                    min="1"
                    max={productoSeleccionado ? productoSeleccionado.cantidad : undefined}
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
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-semibold text-gray-700 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-green-500/50 cursor-pointer"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de productos hermosa */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <Table
            columns={[ 
              { key: 'idCamion', label: 'ID Camión', className: 'text-white' },
              { key: 'nombreChofer', label: 'Chofer', className: 'text-white' },
              { key: 'idProducto', label: 'ID Producto', className: 'text-white' },
              { key: 'nombreProducto', label: 'Nombre Producto', className: 'text-white' },
              { key: 'fechaIngreso', label: 'Fecha Ingreso', className: 'text-white' },
              { key: 'cantidad', label: 'Cantidad', className: 'text-white' },
              { key: 'detalle', label: 'Detalle', className: 'text-white max-w-xs truncate' },
            ]}
            data={productos.map(p => ({
              ...p,
              idCamion: <div className="flex items-center gap-2"><div className="p-2 bg-green-100 rounded-lg"><Truck size={16} className="text-green-600" /></div><span className="text-sm font-medium text-gray-900">{p.idCamion}</span></div>,
              nombreChofer: <span className="text-gray-900">{p.nombreChofer}</span>,
              idProducto: <span className="text-gray-900">{p.idProducto}</span>,
              nombreProducto: <span className="text-gray-900">{p.nombreProducto}</span>,
              fechaIngreso: <span className="text-gray-900">{p.fechaIngreso}</span>,
              cantidad: <span className="text-gray-900">{p.cantidad}</span>,
              detalle: <span className="text-gray-900">{p.detalle || '-'}</span>,
            }))}
            color="green"
            solidHeader={true}
            emptyMessage={<><Smartphone size={64} className="mx-auto mb-4 text-gray-300" /><p className="text-gray-500 text-lg font-medium">No hay productos en inventario móvil</p><p className="text-gray-400 text-sm mt-2">Agrega tu primer producto usando el botón "Agregar Producto"</p></>}
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

export default InventarioMovil;
