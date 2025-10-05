import { AlertTriangle, Cloud, Wind, Sun, Droplets, Eye } from 'lucide-react';

export default function AlertsSection() {
  const alerts = [
    {
      type: 'warning',
      icon: Wind,
      title: 'Alerta de Viento Fuerte',
      description: 'Vientos de hasta 35 km/h esperados el jueves en zonas altas',
      location: 'Parque Tunari',
      date: '12 de Octubre',
      severity: 'Moderado',
      recommendations: ['Evitar actividades en alturas', 'Asegurar objetos sueltos', 'Llevar ropa abrigada'],
    },
    {
      type: 'info',
      icon: Sun,
      title: 'Condiciones Óptimas',
      description: 'Clima ideal para actividades al aire libre',
      location: 'Toro Toro',
      date: '15-18 de Octubre',
      severity: 'Favorable',
      recommendations: ['Aprovechar para camping', 'Excelente para fotografía', 'Llevar protección solar'],
    },
    {
      type: 'alert',
      icon: Cloud,
      title: 'Posible Lluvia',
      description: '40% de probabilidad de precipitación',
      location: 'Valle Alto',
      date: '20 de Octubre',
      severity: 'Leve',
      recommendations: ['Llevar impermeable', 'Planificar actividades bajo techo', 'Verificar pronóstico actualizado'],
    },
  ];

  const suggestions = [
    {
      icon: Eye,
      title: 'Visibilidad Excepcional',
      description: 'Los próximos 5 días tendrán cielo despejado ideal para observación astronómica',
      action: 'Ver Eventos Astronómicos',
    },
    {
      icon: Droplets,
      title: 'Humedad Baja',
      description: 'Condiciones perfectas para senderismo en Parque Tunari este fin de semana',
      action: 'Planificar Evento',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Moderado': return 'border-yellow-500 bg-yellow-50';
      case 'Favorable': return 'border-green-500 bg-green-50';
      case 'Leve': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-green-600';
      case 'alert': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Alertas y Sugerencias</h1>
        <p className="text-gray-600">Recibe notificaciones inteligentes sobre condiciones meteorológicas</p>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          Sistema de Alertas en Tiempo Real
        </h2>
        <p className="text-orange-100 mb-4">
          CLIMEXA utiliza datos de Worldview y Giovanni para generar alertas meteorológicas automáticas
          basadas en tu ubicación y eventos planificados.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <h3 className="font-semibold mb-2">Worldview NASA</h3>
            <p className="text-sm text-orange-100">Imagen satelital actual para condiciones del terreno</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <h3 className="font-semibold mb-2">Giovanni + OPeNDAP</h3>
            <p className="text-sm text-orange-100">Análisis en tiempo real de alertas meteorológicas</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Alertas Activas</h2>
        {alerts.map((alert, idx) => {
          const Icon = alert.icon;
          return (
            <div
              key={idx}
              className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full bg-white ${getIconColor(alert.type)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{alert.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      alert.severity === 'Moderado' ? 'bg-yellow-200 text-yellow-800' :
                      alert.severity === 'Favorable' ? 'bg-green-200 text-green-800' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{alert.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>📍 {alert.location}</span>
                    <span>📅 {alert.date}</span>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Recomendaciones:</h4>
                    <ul className="space-y-1">
                      {alert.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Sugerencias Inteligentes</h2>
        {suggestions.map((suggestion, idx) => {
          const Icon = suggestion.icon;
          return (
            <div
              key={idx}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-white bg-opacity-20 backdrop-blur">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{suggestion.title}</h3>
                  <p className="text-cyan-100 mb-4">{suggestion.description}</p>
                  <button className="px-6 py-2 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-cyan-50 transition-colors">
                    {suggestion.action}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Configuración de Notificaciones</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Alertas de clima severo</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Sugerencias de actividades</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Eventos astronómicos próximos</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Recordatorios de eventos planificados</span>
          </label>
        </div>
      </div>
    </div>
  );
}
