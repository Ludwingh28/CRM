import { FileText, Download, Calendar, TrendingUp, BarChart3 } from 'lucide-react';

const ReportesVentas = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="text-indigo-600" size={32} />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Reportes de Ventas
          </h1>
        </div>
        <p className="text-gray-600">
          Visualiza y descarga reportes detallados de ventas
        </p>
      </div>

      {/* Barra de filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Selector de período */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Período
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Hoy</option>
                <option>Esta Semana</option>
                <option>Este Mes</option>
                <option>Último Trimestre</option>
                <option>Este Año</option>
                <option>Personalizado</option>
              </select>
            </div>
          </div>

          {/* Tipo de reporte */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Reporte
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Resumen General</option>
              <option>Por Producto</option>
              <option>Por Cliente</option>
              <option>Por Vendedor</option>
              <option>Por Región</option>
            </select>
          </div>

          {/* Botón de descarga */}
          <div className="flex items-end">
            <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
              <Download size={20} />
              <span>Descargar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm opacity-90">Ventas Totales</p>
            <TrendingUp size={24} />
          </div>
          <p className="text-3xl font-bold">$0</p>
          <p className="text-sm mt-2 opacity-75">+0% vs período anterior</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm opacity-90">Transacciones</p>
            <BarChart3 size={24} />
          </div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm mt-2 opacity-75">+0% vs período anterior</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm opacity-90">Ticket Promedio</p>
            <TrendingUp size={24} />
          </div>
          <p className="text-3xl font-bold">$0</p>
          <p className="text-sm mt-2 opacity-75">+0% vs período anterior</p>
        </div>
      </div>

      {/* Área de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Ventas por Período
          </h3>
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <BarChart3 size={48} className="mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Gráfico de barras</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Distribución de Ventas
          </h3>
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <BarChart3 size={48} className="mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Gráfico circular</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportesVentas;
