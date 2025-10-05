import { Cloud, Droplets, Wind, Eye, Calendar } from 'lucide-react';
import { User } from '../../types';
import { storage } from '../../utils/storage';

interface HomeSectionProps {
  user: User;
}

export default function HomeSection({ user }: HomeSectionProps) {
  const currentWeather = {
    temperature: 18,
    humidity: 65,
    windSpeed: 12,
    conditions: 'Parcialmente Nublado',
    visibility: 85,
  };

  const upcomingEvents = storage.getEvents().filter(e => e.userId === user.id).slice(0, 3);
  const astronomicalEvents = storage.getAstronomicalEvents().slice(0, 2);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Bienvenido, {user.name}
        </h1>
        <p className="text-gray-600">Cochabamba, Bolivia - {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-1">{currentWeather.conditions}</h2>
              <p className="text-blue-100">Condiciones actuales</p>
            </div>
            <div className="text-6xl font-bold">{currentWeather.temperature}°C</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Droplets className="w-6 h-6 mb-2" />
              <div className="text-2xl font-semibold">{currentWeather.humidity}%</div>
              <div className="text-sm text-blue-100">Humedad</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Wind className="w-6 h-6 mb-2" />
              <div className="text-2xl font-semibold">{currentWeather.windSpeed} km/h</div>
              <div className="text-sm text-blue-100">Viento</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Eye className="w-6 h-6 mb-2" />
              <div className="text-2xl font-semibold">{currentWeather.visibility}%</div>
              <div className="text-sm text-blue-100">Visibilidad</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Cloud className="w-6 h-6 mb-2" />
              <div className="text-2xl font-semibold">40%</div>
              <div className="text-sm text-blue-100">Nubosidad</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Próximos Eventos</h3>
          <div className="space-y-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-800">{event.title}</h4>
                  <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString('es-ES')}</p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No tienes eventos próximos</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-900 to-purple-800 rounded-2xl shadow-xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">🌙</span>
            Eventos Astronómicos Próximos
          </h3>
          <div className="space-y-4">
            {astronomicalEvents.map((event) => (
              <div key={event.id} className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-lg">{event.title}</h4>
                  <span className="text-2xl">{event.type === 'full-moon' ? '🌕' : event.type === 'meteor-shower' ? '🌠' : '🌑'}</span>
                </div>
                <p className="text-sm text-purple-100 mb-2">{event.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span>{new Date(event.date).toLocaleDateString('es-ES')} - {event.time}</span>
                  <span className="bg-green-500 px-3 py-1 rounded-full text-xs font-semibold">
                    {event.visibility}% visible
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recomendaciones IA</h3>
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-sm text-green-800 font-medium mb-1">Condiciones Óptimas</p>
              <p className="text-sm text-green-700">Los próximos 3 días son ideales para actividades al aire libre en Parque Tunari</p>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-sm text-yellow-800 font-medium mb-1">Alerta de Viento</p>
              <p className="text-sm text-yellow-700">Se esperan vientos moderados el jueves. Planifica actividades bajo techo.</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-blue-800 font-medium mb-1">Observación Astronómica</p>
              <p className="text-sm text-blue-700">Excelente visibilidad nocturna este fin de semana. Ideal para telescopio.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
