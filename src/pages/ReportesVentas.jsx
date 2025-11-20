import { useState } from 'react';
import { FileText, Filter, TrendingUp, Users, Package, DollarSign, Percent } from 'lucide-react';

const ReportesVentas = () => {
  const [selectedCanal, setSelectedCanal] = useState('todos'); // 'todos', 'DH', 'Mayorista'

  // Datos de ejemplo para vendedores
  const [vendedores] = useState([
    {
      nombre: 'Juan Pérez',
      ruta: 'Ruta A - Zona Sur',
      clientesAsignados: 45,
      clientesVisitados: 38,
      preventas: 32,
      cobertura: 84.4,
      efectividad: 84.2,
      totalPreventa: 3850.50
    },
    {
      nombre: 'María López',
      ruta: 'Ruta B - Zona Norte',
      clientesAsignados: 52,
      clientesVisitados: 47,
      preventas: 41,
      cobertura: 90.4,
      efectividad: 87.2,
      totalPreventa: 4920.75
    },
    {
      nombre: 'Carlos Rodríguez',
      ruta: 'Ruta C - Centro',
      clientesAsignados: 38,
      clientesVisitados: 35,
      preventas: 30,
      cobertura: 92.1,
      efectividad: 85.7,
      totalPreventa: 3420.00
    },
  ]);

  // Calcular totales del canal
  const calcularTotales = () => {
    return vendedores.reduce((acc, vendedor) => ({
      clientesAsignados: acc.clientesAsignados + vendedor.clientesAsignados,
      clientesVisitados: acc.clientesVisitados + vendedor.clientesVisitados,
      preventas: acc.preventas + vendedor.preventas,
      totalPreventa: acc.totalPreventa + vendedor.totalPreventa,
    }), {
      clientesAsignados: 0,
      clientesVisitados: 0,
      preventas: 0,
      totalPreventa: 0
    });
  };

  const totales = calcularTotales();
  const coberturaTotal = ((totales.clientesVisitados / totales.clientesAsignados) * 100).toFixed(1);
  const efectividadTotal = ((totales.preventas / totales.clientesVisitados) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header elegante */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <FileText className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Reportes de Ventas
              </h1>
              <p className="text-gray-600 mt-1">
                Analiza el desempeño de ventas por canal y vendedor
              </p>
            </div>
          </div>
        </div>

        {/* Filtro de Canal - Elegante */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="text-indigo-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Filtro por Canal</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="cursor-pointer"
              onClick={() => setSelectedCanal('todos')}
              className={`
                p-6 rounded-xl border-2 transition-all duration-200
                ${selectedCanal === 'todos'
                  ? 'border-indigo-500 bg-indigo-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                }
              `}
            >
              <Package size={32} className={`mx-auto mb-3 ${selectedCanal === 'todos' ? 'text-indigo-600' : 'text-gray-400'}`} />
              <p className={`text-lg font-bold ${selectedCanal === 'todos' ? 'text-indigo-600' : 'text-gray-700'}`}>
                Todos los Canales
              </p>
              <p className="text-sm text-gray-500 mt-1">Vista completa</p>
            </button>

            <button className="cursor-pointer"
              onClick={() => setSelectedCanal('DH')}
              className={`
                p-6 rounded-xl border-2 transition-all duration-200
                ${selectedCanal === 'DH'
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }
              `}
            >
              <Users size={32} className={`mx-auto mb-3 ${selectedCanal === 'DH' ? 'text-blue-600' : 'text-gray-400'}`} />
              <p className={`text-lg font-bold ${selectedCanal === 'DH' ? 'text-blue-600' : 'text-gray-700'}`}>
                Canal DH
              </p>
              <p className="text-sm text-gray-500 mt-1">Detalle al hogar</p>
            </button>

            <button className="cursor-pointer"
              onClick={() => setSelectedCanal('Mayorista')}
              className={`
                p-6 rounded-xl border-2 transition-all duration-200
                ${selectedCanal === 'Mayorista'
                  ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                }
              `}
            >
              <Package size={32} className={`mx-auto mb-3 ${selectedCanal === 'Mayorista' ? 'text-purple-600' : 'text-gray-400'}`} />
              <p className={`text-lg font-bold ${selectedCanal === 'Mayorista' ? 'text-purple-600' : 'text-gray-700'}`}>
                Canal Mayorista
              </p>
              <p className="text-sm text-gray-500 mt-1">Ventas al por mayor</p>
            </button>
          </div>
        </div>

        {/* Cards de Resumen - Hermosos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Users size={32} />
              <TrendingUp size={24} className="opacity-75" />
            </div>
            <p className="text-sm opacity-90 mb-1">Clientes Asignados</p>
            <p className="text-4xl font-bold">{totales.clientesAsignados}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Users size={32} />
              <TrendingUp size={24} className="opacity-75" />
            </div>
            <p className="text-sm opacity-90 mb-1">Clientes Visitados</p>
            <p className="text-4xl font-bold">{totales.clientesVisitados}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Package size={32} />
              <TrendingUp size={24} className="opacity-75" />
            </div>
            <p className="text-sm opacity-90 mb-1">Total Preventas</p>
            <p className="text-4xl font-bold">{totales.preventas}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <DollarSign size={32} />
              <TrendingUp size={24} className="opacity-75" />
            </div>
            <p className="text-sm opacity-90 mb-1">Total Ventas</p>
            <p className="text-4xl font-bold">${totales.totalPreventa.toFixed(2)}</p>
          </div>
        </div>

        {/* Tabla de Vendedores - Hermosa */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-6">
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Users className="text-indigo-600" size={24} />
              Desempeño por Vendedor - {selectedCanal === 'todos' ? 'Todos los Canales' : `Canal ${selectedCanal}`}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nombre Vendedor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Ruta</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Clientes Asignados</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Clientes Visitados</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Preventas</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">% Cobertura</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">% Efectividad</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Total Preventa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vendedores.map((vendedor, index) => (
                  <tr key={index} className="hover:bg-indigo-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {vendedor.nombre.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{vendedor.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vendedor.ruta}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        {vendedor.clientesAsignados}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {vendedor.clientesVisitados}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {vendedor.preventas}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Percent size={16} className="text-indigo-600" />
                        <span className="text-sm font-bold text-indigo-600">{vendedor.cobertura}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Percent size={16} className="text-orange-600" />
                        <span className="text-sm font-bold text-orange-600">{vendedor.efectividad}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-green-600">${vendedor.totalPreventa.toFixed(2)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totales del Canal - Destacado */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp size={28} />
            Total del Canal {selectedCanal !== 'todos' && `- ${selectedCanal}`}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Clientes Asignados</p>
              <p className="text-3xl font-bold">{totales.clientesAsignados}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Clientes Visitados</p>
              <p className="text-3xl font-bold">{totales.clientesVisitados}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Preventas</p>
              <p className="text-3xl font-bold">{totales.preventas}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">% Cobertura</p>
              <p className="text-3xl font-bold">{coberturaTotal}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">% Efectividad</p>
              <p className="text-3xl font-bold">{efectividadTotal}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Total Preventa</p>
              <p className="text-3xl font-bold">${totales.totalPreventa.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportesVentas;
