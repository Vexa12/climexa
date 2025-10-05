import { MapPin, Clock, Eye, Sparkles } from 'lucide-react';
import { storage } from '../../utils/storage';

export default function AstronomySection() {
  const events = storage.getAstronomicalEvents();

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'full-moon': return '🌕';
      case 'new-moon': return '🌑';
      case 'eclipse': return '🌘';
      case 'meteor-shower': return '🌠';
      case 'super-moon': return '🌝';
      case 'blood-moon': return '🔴';
      default: return '🌙';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'full-moon': return 'from-yellow-400 to-orange-400';
      case 'new-moon': return 'from-gray-700 to-gray-900';
      case 'eclipse': return 'from-purple-600 to-indigo-900';
      case 'meteor-shower': return 'from-blue-600 to-cyan-500';
      case 'super-moon': return 'from-yellow-300 to-yellow-600';
      case 'blood-moon': return 'from-red-600 to-red-900';
      default: return 'from-blue-500 to-purple-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Eventos Astronómicos</h1>
          <p className="text-gray-600">Descubre y planifica la observación de fenómenos celestes</p>
        </div>
        <Sparkles className="w-12 h-12 text-yellow-500" />
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Sobre la Observación Astronómica</h2>
        <p className="text-blue-100 mb-4">
          Los eventos astronómicos son fenómenos celestiales que puedes observar desde la Tierra.
          CLIMEXA utiliza datos de NASA Worldview y GES DISC para predecir las mejores condiciones
          de visibilidad en tu región.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <div className="text-3xl mb-2">🔭</div>
            <h3 className="font-semibold mb-1">Cobertura de Nubes</h3>
            <p className="text-sm text-blue-100">Worldview NASA</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold mb-1">Datos Históricos</h3>
            <p className="text-sm text-blue-100">GES DISC OPeNDAP</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <div className="text-3xl mb-2">🌙</div>
            <h3 className="font-semibold mb-1">Visibilidad Nocturna</h3>
            <p className="text-sm text-blue-100">Giovanni Series</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className={`bg-gradient-to-br ${getEventColor(event.type)} rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-5xl mb-2">{getEventIcon(event.type)}</div>
                <h3 className="text-2xl font-bold mb-1">{event.title}</h3>
                <p className="text-sm opacity-90">{event.description}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span className="font-semibold">{event.visibility}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur">
                <Clock className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-80">Fecha y Hora</p>
                  <p className="font-semibold">
                    {new Date(event.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {event.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur">
                <MapPin className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-80">Ubicación Óptima</p>
                  <p className="font-semibold">{event.optimalLocation}</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Recomendaciones
              </h4>
              <ul className="space-y-1">
                {event.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm opacity-90 flex items-start gap-2">
                    <span className="text-yellow-300">✓</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Consejos para la Observación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-800 mb-2">Preparación</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Verifica el pronóstico del tiempo antes de salir</li>
              <li>• Llega al menos 30 minutos antes del evento</li>
              <li>• Lleva ropa abrigada, incluso en verano</li>
              <li>• Usa una linterna roja para preservar la visión nocturna</li>
            </ul>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-800 mb-2">Equipamiento</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Binoculares o telescopio (opcional)</li>
              <li>• Silla o manta para sentarse</li>
              <li>• Aplicación móvil de mapas estelares</li>
              <li>• Cámara con trípode para fotografía</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
