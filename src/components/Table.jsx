import React from 'react';

/**
 * Componente de tabla global reutilizable.
 * @param {Array} columns - [{ key: 'nombre', label: 'Nombre', className?: '...' }]
 * @param {Array} data - [{ nombre: 'Juan', ... }]
 * @param {string} color - Tailwind color base para el header (ej: 'red', 'blue', 'green', 'purple', 'indigo', 'rose')
 * @param {string} [emptyMessage] - Mensaje cuando no hay datos
 * @param {React.ReactNode} [actionsHeader] - Header extra para acciones
 * @param {function} [renderActions] - (row, idx) => ReactNode para acciones por fila
 */
const Table = ({ columns, data, color = 'blue', emptyMessage = 'No hay datos', actionsHeader, renderActions }) => {
  // Si el color es green, forzar header sólido
  const headerClass = color === 'green'
    ? 'bg-green-600 text-white'
    : `bg-gradient-to-r from-${color}-600 to-${color}-700 text-white`;
  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-2xl overflow-hidden">
        <thead className={headerClass}>
          <tr>
            {columns.map(col => (
              <th key={col.key} className={`px-6 py-4 text-left text-sm font-semibold ${col.className || ''}`}>{col.label}</th>
            ))}
            {actionsHeader && <th className="px-6 py-4 text-center text-sm font-semibold">{actionsHeader}</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actionsHeader ? 1 : 0)} className="px-6 py-16 text-center text-gray-500 text-lg font-medium">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className={`hover:bg-${color}-50 transition-colors`}>
                {columns.map(col => (
                  <td key={col.key} className={`px-6 py-4 text-sm ${col.className || ''}`}>{row[col.key]}</td>
                ))}
                {renderActions && <td className="px-6 py-4 text-center">{renderActions(row, idx)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
