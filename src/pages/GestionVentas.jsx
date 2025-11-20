import { useState } from 'react';
import { ShoppingCart, Plus, Clock, DollarSign, Package, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const GestionVentas = () => {
  const [activeTab, setActiveTab] = useState('preventa'); // 'preventa' o 'motivos'
  const [showPreventaForm, setShowPreventaForm] = useState(false);
  const [showMotivosForm, setShowMotivosForm] = useState(false);
  const [preventas, setPreventas] = useState([]);
  const [registrosMotivos, setRegistrosMotivos] = useState([]);

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

  const handleMotivosChange = (e) => {
    const { name, value } = e.target;
    setMotivosData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreventaSubmit = (e) => {
    e.preventDefault();
    const horaRegistro = new Date().toLocaleString();
    setPreventas(prev => [...prev, { ...preventaData, horaRegistro }]);
    setPreventaData({
      producto: '',
      precio: '',
      cantidad: '',
      horarioEntrega: '',
      observaciones: '',
    });
    setShowPreventaForm(false);
  };

  const handleMotivosSubmit = (e) => {
    e.preventDefault();
    const horaRegistro = new Date().toLocaleString();
    setRegistrosMotivos(prev => [...prev, { ...motivosData, horaRegistro }]);
    setMotivosData({
      cliente: '',
      motivo: '',
      precioCompetencia: '',
    });
    setShowMotivosForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header elegante */}
        <div className="mb-8">
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
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-6 border border-gray-100">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('preventa')}
              className={`
                flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                transition-all duration-200 font-semibold
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
                transition-all duration-200 font-semibold
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
            <div className="mb-6">
              <button
                onClick={() => setShowPreventaForm(!showPreventaForm)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/50 hover:scale-105"
              >
                <Plus size={20} />
                <span>Nueva Preventa</span>
              </button>
            </div>

            {/* Formulario Preventa */}
            {showPreventaForm && (
              <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 border border-gray-100 animate-fadeIn">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Plus className="text-purple-600" size={24} />
                    </div>
                    Nueva Preventa
                  </h2>
                  <button
                    onClick={() => setShowPreventaForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handlePreventaSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Producto */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Package size={16} className="text-purple-600" />
                        Producto
                      </label>
                      <select
                        name="producto"
                        value={preventaData.producto}
                        onChange={handlePreventaChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      >
                        <option value="">Seleccionar producto...</option>
                        <option value="Coca Cola 500ml">Coca Cola 500ml</option>
                        <option value="Pepsi 500ml">Pepsi 500ml</option>
                        <option value="Sprite 500ml">Sprite 500ml</option>
                        <option value="Fanta 500ml">Fanta 500ml</option>
                      </select>
                    </div>

                    {/* Precio */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <DollarSign size={16} className="text-green-600" />
                        Precio (variable sobre precio base)
                      </label>
                      <input
                        type="number"
                        name="precio"
                        value={preventaData.precio}
                        onChange={handlePreventaChange}
                        required
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Cantidad */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Package size={16} className="text-blue-600" />
                        Cantidad
                      </label>
                      <input
                        type="number"
                        name="cantidad"
                        value={preventaData.cantidad}
                        onChange={handlePreventaChange}
                        required
                        placeholder="0"
                        min="1"
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
                      <strong>Nota:</strong> El horario de registro GPS se guardará automáticamente al crear la preventa.
                    </p>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowPreventaForm(false)}
                      className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-semibold text-gray-700"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/50"
                    >
                      Guardar Preventa
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tabla Preventas */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Producto</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Precio</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Cantidad</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Horario Entrega</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Hora Registro GPS</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Observaciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {preventas.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-16 text-center">
                          <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300" />
                          <p className="text-gray-500 text-lg font-medium">No hay preventas registradas</p>
                          <p className="text-gray-400 text-sm mt-2">Crea tu primera preventa usando el botón "Nueva Preventa"</p>
                        </td>
                      </tr>
                    ) : (
                      preventas.map((preventa, index) => (
                        <tr key={index} className="hover:bg-purple-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{preventa.producto}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-green-600">${preventa.precio}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{preventa.cantidad}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{preventa.horarioEntrega}</td>
                          <td className="px-6 py-4 text-sm text-blue-600 font-medium">{preventa.horaRegistro}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{preventa.observaciones || '-'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Botón agregar motivo */}
            <div className="mb-6">
              <button
                onClick={() => setShowMotivosForm(!showMotivosForm)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-red-500/50 hover:scale-105"
              >
                <Plus size={20} />
                <span>Registrar Motivo</span>
              </button>
            </div>

            {/* Formulario Motivos */}
            {showMotivosForm && (
              <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 border border-gray-100 animate-fadeIn">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <XCircle className="text-red-600" size={24} />
                    </div>
                    Registrar Motivo de No Venta
                  </h2>
                  <button
                    onClick={() => setShowMotivosForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
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
                              p-4 rounded-xl border-2 transition-all duration-200 text-left
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
                      className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-semibold text-gray-700"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-red-500/50"
                    >
                      Guardar Motivo
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tabla Motivos */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-red-600 to-pink-700 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Cliente</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Motivo</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Precio Competencia</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Hora Registro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {registrosMotivos.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-16 text-center">
                          <XCircle size={64} className="mx-auto mb-4 text-gray-300" />
                          <p className="text-gray-500 text-lg font-medium">No hay motivos registrados</p>
                          <p className="text-gray-400 text-sm mt-2">Registra tu primer motivo usando el botón "Registrar Motivo"</p>
                        </td>
                      </tr>
                    ) : (
                      registrosMotivos.map((registro, index) => (
                        <tr key={index} className="hover:bg-red-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{registro.cliente}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{registro.motivo}</td>
                          <td className="px-6 py-4 text-sm text-orange-600 font-semibold">
                            {registro.precioCompetencia ? `$${registro.precioCompetencia}` : '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-blue-600 font-medium">{registro.horaRegistro}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GestionVentas;
