import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Clock, DollarSign, Package, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Table from '../components/Table';

const GestionVentas = () => {
  const [activeTab, setActiveTab] = useState('preventa'); // 'preventa' o 'motivos'
  const [showPreventaForm, setShowPreventaForm] = useState(false);
  const [showMotivosForm, setShowMotivosForm] = useState(false);
  const [preventas, setPreventas] = useState([]);
  const [registrosMotivos, setRegistrosMotivos] = useState([]);
  const [productosAlmacen, setProductosAlmacen] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Cargar preventas desde localStorage al montar el componente
  useEffect(() => {
    const stored = localStorage.getItem('preventas');
    if (stored) {
      setPreventas(JSON.parse(stored));
    }
  }, []);

  // Cargar registros de motivos desde localStorage al montar el componente
  useEffect(() => {
    const stored = localStorage.getItem('registrosMotivos');
    if (stored) {
      setRegistrosMotivos(JSON.parse(stored));
    }
  }, []);

  // Cargar productos del almacén
  useEffect(() => {
    const stored = localStorage.getItem('inventarioAlmacen');
    if (stored) {
      setProductosAlmacen(JSON.parse(stored));
    }
  }, []);

  const [preventaData, setPreventaData] = useState({
    producto: '',
    precio: '',
    cantidad: '',
    horarioEntrega: '',
    observaciones: '',
  });

  const [motivosData, setMotivosData] = useState({
    cliente: '',
    motivo: '',
    precioCompetencia: '',
  });

  const motivos = [
    'Tienda cerrada',
    'Tiene producto en stock',
    'No visitado',
    'Disconformidad con el producto',
    'No está la dueña',
    'No tiene dinero',
    'Precio más bajo de la competencia',
  ];

  const handlePreventaChange = (e) => {
    const { name, value } = e.target;
    setPreventaData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductoPreventaChange = (e) => {
    const productoId = e.target.value;
    if (productoId) {
      const producto = productosAlmacen.find(p => p.id === productoId);
      if (producto) {
        setProductoSeleccionado(producto);
        setPreventaData(prev => ({
          ...prev,
          producto: producto.nombre,
          precio: producto.precioMinorista, // Precio base es el minorista
        }));
      }
    } else {
      setProductoSeleccionado(null);
      setPreventaData(prev => ({
        ...prev,
        producto: '',
        precio: '',
        cantidad: '',
      }));
    }
  };

  const handleMotivosChange = (e) => {
    const { name, value } = e.target;
    setMotivosData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreventaSubmit = (e) => {
    e.preventDefault();

    // Validar que hay producto seleccionado
    if (!productoSeleccionado) {
      alert('Selecciona un producto del almacén');
      return;
    }

    const precioVenta = parseFloat(preventaData.precio);
    const precioMinorista = parseFloat(productoSeleccionado.precioMinorista);

    // Validar que el precio no sea menor que el precio minorista
    if (precioVenta < precioMinorista) {
      alert(`El precio no puede ser menor que el precio minorista: $${precioMinorista}`);
      return;
    }

    const cantidadSolicitada = parseInt(preventaData.cantidad);
    const cantidadDisponible = parseInt(productoSeleccionado.cantidad);

    // Validar stock disponible
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

    // Guardar preventa
    const horaRegistro = new Date().toLocaleString();
    const newPreventas = [...preventas, { ...preventaData, horaRegistro }];
    setPreventas(newPreventas);
    localStorage.setItem('preventas', JSON.stringify(newPreventas));

    // Resetear formulario
    setPreventaData({
      producto: '',
      precio: '',
      cantidad: '',
      horarioEntrega: '',
      observaciones: '',
    });
    setProductoSeleccionado(null);
    setShowPreventaForm(false);
  };

  const handleMotivosSubmit = (e) => {
    e.preventDefault();
    const horaRegistro = new Date().toLocaleString();
    const newRegistrosMotivos = [...registrosMotivos, { ...motivosData, horaRegistro }];
    setRegistrosMotivos(newRegistrosMotivos);
    localStorage.setItem('registrosMotivos', JSON.stringify(newRegistrosMotivos));
    setMotivosData({
      cliente: '',
      motivo: '',
      precioCompetencia: '',
    });
    setShowMotivosForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-6 lg:p-8 relative z-0">
      <div className="max-w-7xl mx-auto">
        {/* Header elegante */}
        <div className="mb-8 relative z-0">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
              <ShoppingCart className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Gestión de Ventas
              </h1>
              <p className="text-gray-600 mt-1">
                Administra preventas y registra motivos de no venta
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-6 border border-gray-100 relative z-0">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('preventa')}
              className={`
                flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                transition-all duration-200 font-semibold cursor-pointer
                ${activeTab === 'preventa'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <CheckCircle size={20} />
              <span>Preventas</span>
            </button>
            <button
              onClick={() => setActiveTab('motivos')}
              className={`
                flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                transition-all duration-200 font-semibold cursor-pointer
                ${activeTab === 'motivos'
                  ? 'bg-gradient-to-r from-red-600 to-pink-700 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <XCircle size={20} />
              <span>Motivos de No Venta</span>
            </button>
          </div>
        </div>

        {/* Contenido según tab activo */}
        {activeTab === 'preventa' ? (
          <>
            {/* Botón agregar preventa */}
            <div className="mb-6 relative z-0">
              <button
                onClick={() => setShowPreventaForm(!showPreventaForm)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/50 hover:scale-105 cursor-pointer"
              >
                <Plus size={20} />
                <span>Nueva Preventa</span>
              </button>
            </div>

            {/* Formulario Preventa */}
            {showPreventaForm && (
              <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 border border-gray-100 animate-fadeIn relative z-0">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Plus className="text-purple-600" size={24} />
                    </div>
                    Nueva Preventa
                  </h2>
                  <button
                    onClick={() => setShowPreventaForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handlePreventaSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Seleccionar Producto del Almacén */}
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Package size={16} className="text-purple-600" />
                        Seleccionar Producto del Almacén
                      </label>
                      <select
                        value={productoSeleccionado ? productoSeleccionado.id : ''}
                        onChange={handleProductoPreventaChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      >
                        <option value="">Seleccionar producto...</option>
                        {productosAlmacen.filter(p => parseInt(p.cantidad) > 0).map(producto => (
                          <option key={producto.id} value={producto.id}>
                            {producto.nombre} - ${producto.precioMinorista} (Disponible: {producto.cantidad})
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
                            <span className="text-blue-600 font-medium">Precio Base (Minorista):</span>
                            <span className="ml-2 text-gray-800">${productoSeleccionado.precioMinorista}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Precio */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <DollarSign size={16} className="text-green-600" />
                        Precio de Venta {productoSeleccionado && `(Mín: $${productoSeleccionado.precioMinorista})`}
                      </label>
                      <input
                        type="number"
                        name="precio"
                        value={preventaData.precio}
                        onChange={handlePreventaChange}
                        required
                        placeholder="0.00"
                        step="0.01"
                        min={productoSeleccionado ? productoSeleccionado.precioMinorista : "0"}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Cantidad */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Package size={16} className="text-blue-600" />
                        Cantidad {productoSeleccionado && `(Máx: ${productoSeleccionado.cantidad})`}
                      </label>
                      <input
                        type="number"
                        name="cantidad"
                        value={preventaData.cantidad}
                        onChange={handlePreventaChange}
                        required
                        placeholder="0"
                        min="1"
                        max={productoSeleccionado ? productoSeleccionado.cantidad : undefined}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Horario Entrega */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Clock size={16} className="text-orange-600" />
                        Horario de Entrega
                      </label>
                      <input
                        type="time"
                        name="horarioEntrega"
                        value={preventaData.horarioEntrega}
                        onChange={handlePreventaChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Observaciones */}
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <AlertCircle size={16} className="text-gray-600" />
                        Observaciones (Opcional)
                      </label>
                      <textarea
                        name="observaciones"
                        value={preventaData.observaciones}
                        onChange={handlePreventaChange}
                        rows="3"
                        placeholder="Observaciones adicionales..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Nota:</strong> El precio base es el precio minorista del producto. Puedes aumentarlo pero no reducirlo. El horario de registro GPS se guardará automáticamente al crear la preventa. La cantidad se restará del inventario almacén.
                    </p>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowPreventaForm(false)}
                      className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-semibold text-gray-700 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/50 cursor-pointer"
                    >
                      Guardar Preventa
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tabla Preventas */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative z-0 p-2">
                <Table
                  columns={[
                    { key: 'producto', label: 'Producto', className: 'text-white' },
                    { key: 'precio', label: 'Precio', className: 'text-white' },
                    { key: 'cantidad', label: 'Cantidad', className: 'text-white' },
                    { key: 'horarioEntrega', label: 'Horario Entrega', className: 'text-white' },
                    { key: 'horaRegistro', label: 'Hora Registro GPS', className: 'text-white' },
                    { key: 'observaciones', label: 'Observaciones', className: 'text-white max-w-xs truncate' },
                  ]}
                  data={preventas.map(p => ({
                    ...p,
                    producto: <span className="text-gray-900">{p.producto}</span>,
                    precio: <span className="text-gray-900">{p.precio ? `$${p.precio}` : ''}</span>,
                    cantidad: <span className="text-gray-900">{p.cantidad}</span>,
                    horarioEntrega: <span className="text-gray-900">{p.horarioEntrega}</span>,
                    horaRegistro: <span className="text-gray-900">{p.horaRegistro}</span>,
                    observaciones: <span className="text-gray-900">{p.observaciones || '-'}</span>,
                  }))}
                  color="purple"
                  emptyMessage={
                    <div className="flex flex-col items-center justify-center py-8">
                      <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 text-lg font-medium">No hay preventas registradas</p>
                      <p className="text-gray-400 text-sm mt-2">Crea tu primera preventa usando el botón "Nueva Preventa"</p>
                    </div>
                  }
                />
              </div>
          </>
        ) : (
          <>
            {/* Botón agregar motivo */}
            <div className="mb-6 relative z-0">
              <button
                onClick={() => setShowMotivosForm(!showMotivosForm)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-red-500/50 hover:scale-105 cursor-pointer"
              >
                <Plus size={20} />
                <span>Registrar Motivo</span>
              </button>
            </div>

            {/* Formulario Motivos */}
            {showMotivosForm && (
              <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 border border-gray-100 animate-fadeIn relative z-0">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <XCircle className="text-red-600" size={24} />
                    </div>
                    Registrar Motivo de No Venta
                  </h2>
                  <button
                    onClick={() => setShowMotivosForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleMotivosSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Cliente */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <ShoppingCart size={16} className="text-blue-600" />
                        Cliente
                      </label>
                      <input
                        type="text"
                        name="cliente"
                        value={motivosData.cliente}
                        onChange={handleMotivosChange}
                        required
                        placeholder="Nombre del cliente o tienda"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Motivo */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <XCircle size={16} className="text-red-600" />
                        Motivo de No Venta
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {motivos.map((motivo) => (
                          <button
                            key={motivo}
                            type="button"
                            onClick={() => setMotivosData(prev => ({ ...prev, motivo }))}
                            className={`
                              p-4 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer
                              ${motivosData.motivo === motivo
                                ? 'border-red-500 bg-red-50 scale-105'
                                : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                              }
                            `}
                          >
                            <p className={`text-sm font-semibold ${motivosData.motivo === motivo ? 'text-red-600' : 'text-gray-700'}`}>
                              {motivo}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Precio Competencia (solo si aplica) */}
                    {motivosData.motivo === 'Precio más bajo de la competencia' && (
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <DollarSign size={16} className="text-orange-600" />
                          Precio de la Competencia
                        </label>
                        <input
                          type="number"
                          name="precioCompetencia"
                          value={motivosData.precioCompetencia}
                          onChange={handleMotivosChange}
                          required
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                      </div>
                    )}
                  </div>

                  {/* Botones */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowMotivosForm(false)}
                      className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-semibold text-gray-700 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-red-500/50 cursor-pointer"
                    >
                      Guardar Motivo
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tabla Motivos */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative z-0 p-2">
                <Table
                  columns={[
                    { key: 'cliente', label: 'Cliente', className: 'text-white' },
                    { key: 'motivo', label: 'Motivo', className: 'text-white' },
                    { key: 'precioCompetencia', label: 'Precio Competencia', className: 'text-white' },
                    { key: 'horaRegistro', label: 'Hora Registro', className: 'text-white' },
                  ]}
                  data={registrosMotivos.map(r => ({
                    ...r,
                    cliente: <span className="text-gray-900">{r.cliente}</span>,
                    motivo: <span className="text-gray-900">{r.motivo}</span>,
                    precioCompetencia: <span className="text-gray-900">{r.precioCompetencia ? `$${r.precioCompetencia}` : '-'}</span>,
                    horaRegistro: <span className="text-gray-900">{r.horaRegistro}</span>,
                  }))}
                  color="red"
                  emptyMessage={
                    <div className="flex flex-col items-center justify-center py-8">
                      <XCircle size={64} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 text-lg font-medium">No hay motivos registrados</p>
                      <p className="text-gray-400 text-sm mt-2">Registra tu primer motivo usando el botón "Registrar Motivo"</p>
                    </div>
                  }
                />
              </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GestionVentas;
