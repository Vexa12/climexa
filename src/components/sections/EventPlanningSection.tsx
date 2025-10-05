import { useState } from 'react';
import { Calendar, MapPin, Clock, Sparkles, Cloud, Thermometer, Droplets, Wind } from 'lucide-react';
import { User, Event } from '../../types';
import { storage } from '../../utils/storage';

interface EventPlanningSectionProps {
  user: User;
}

export default function EventPlanningSection({ user }: EventPlanningSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    time: '',
    type: 'outdoor',
  });
  const [prediction, setPrediction] = useState<any>(null);

  const eventTypes = [
    { value: 'outdoor', label: 'Actividad al Aire Libre' },
    { value: 'camping', label: 'Camping' },
    { value: 'hiking', label: 'Senderismo' },
    { value: 'photography', label: 'Fotografía' },
    { value: 'sports', label: 'Deportes' },
    { value: 'picnic', label: 'Picnic' },
  ];

  const locations = [
    'Parque Tunari',
    'Toro Toro',
    'Mirador del Cristo',
    'Laguna Alalay',
    'Valle Alto',
    'Quillacollo',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mockPrediction = {
      temperature: Math.floor(Math.random() * 10) + 12,
      humidity: Math.floor(Math.random() * 30) + 50,
      windSpeed: Math.floor(Math.random() * 15) + 5,
      conditions: ['Despejado', 'Parcialmente Nublado', 'Nublado'][Math.floor(Math.random() * 3)],
      visibility: Math.floor(Math.random() * 20) + 80,
      precipitation: Math.floor(Math.random() * 30),
      recommendations: [
        'Condiciones ideales para la actividad planificada',
        'Temperatura agradable durante el día',
        'Baja probabilidad de lluvia',
        'Se recomienda protección solar',
      ],
    };

    const newEvent: Event = {
      id: Date.now().toString(),
      userId: user.id,
      title: formData.title,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      weatherPrediction: mockPrediction,
      aiRecommendations: mockPrediction.recommendations,
    };

    storage.addEvent(newEvent);
    setPrediction(mockPrediction);
  };

  const myEvents = storage.getEvents().filter(e => e.userId === user.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Planificar Evento</h1>
          <p className="text-gray-600">Consulta el clima y recibe recomendaciones inteligentes</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          {showForm ? 'Ver Mis Eventos' : '+ Nuevo Evento'}
        </button>
      </div>

      {showForm ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Detalles del Evento</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Evento
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Ej: Excursión al Tunari"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Actividad
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Selecciona un lugar</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Obtener Predicción IA
              </button>
            </form>
          </div>

          {prediction && (
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Predicción y Recomendaciones
              </h2>

              <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur mb-6">
                <h3 className="text-xl font-semibold mb-4">Condiciones Esperadas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Thermometer className="w-6 h-6" />
                    <div>
                      <div className="text-2xl font-bold">{prediction.temperature}°C</div>
                      <div className="text-sm opacity-80">Temperatura</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Droplets className="w-6 h-6" />
                    <div>
                      <div className="text-2xl font-bold">{prediction.humidity}%</div>
                      <div className="text-sm opacity-80">Humedad</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wind className="w-6 h-6" />
                    <div>
                      <div className="text-2xl font-bold">{prediction.windSpeed} km/h</div>
                      <div className="text-sm opacity-80">Viento</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Cloud className="w-6 h-6" />
                    <div>
                      <div className="text-2xl font-bold">{prediction.conditions}</div>
                      <div className="text-sm opacity-80">Cielo</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur">
                <h3 className="text-xl font-semibold mb-4">Recomendaciones IA</h3>
                <ul className="space-y-3">
                  {prediction.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-yellow-300 text-xl">✓</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm opacity-90">
                  Evento guardado exitosamente
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.length > 0 ? (
            myEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(event.date).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                </div>
                {event.weatherPrediction && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-blue-900 mb-1">
                      {event.weatherPrediction.temperature}°C - {event.weatherPrediction.conditions}
                    </p>
                    <p className="text-xs text-blue-700">
                      Visibilidad: {event.weatherPrediction.visibility}%
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No tienes eventos planificados</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Crear Primer Evento
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
