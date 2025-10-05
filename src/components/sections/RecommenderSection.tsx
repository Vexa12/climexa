import { useState } from 'react';
import { Search, MapPin, Calendar, TrendingUp, Sparkles } from 'lucide-react';

export default function RecommenderSection() {
  const [activityType, setActivityType] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const activities = [
    'Camping',
    'Senderismo',
    'Fotografía',
    'Observación Astronómica',
    'Deportes al Aire Libre',
    'Picnic',
  ];

  const handleSearch = () => {
    const mockRecommendations = [
      {
        location: 'Parque Tunari',
        dates: '10-13 de Octubre',
        score: 95,
        temperature: '14-18°C',
        conditions: 'Despejado',
        rainfall: '5%',
        reason: '85% de días despejados y vientos suaves en este período',
      },
      {
        location: 'Toro Toro',
        dates: '18-21 de Octubre',
        score: 92,
        temperature: '12-16°C',
        conditions: 'Parcialmente Nublado',
        rainfall: '10%',
        reason: 'Temperatura ideal y baja humedad. Excelente para senderismo.',
      },
      {
        location: 'Valle Alto',
        dates: '25-28 de Octubre',
        score: 88,
        temperature: '16-20°C',
        conditions: 'Despejado',
        rainfall: '3%',
        reason: 'Condiciones óptimas con visibilidad excepcional',
      },
    ];

    setRecommendations(mockRecommendations);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Recomendador Inteligente</h1>
        <p className="text-gray-600">Descubre cuándo y dónde realizar tu actividad según datos históricos</p>
      </div>

      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Fuentes de Datos NASA</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <h3 className="font-semibold mb-2">Giovanni</h3>
            <p className="text-sm text-cyan-100">Analiza series históricas de temperatura y lluvia</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <h3 className="font-semibold mb-2">GES DISC OPeNDAP</h3>
            <p className="text-sm text-cyan-100">Calcula patrones climáticos favorables</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <h3 className="font-semibold mb-2">Data Rods</h3>
            <p className="text-sm text-cyan-100">Evalúa humedad del suelo y viabilidad del terreno</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Buscar Recomendaciones</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Actividad
            </label>
            <select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">Selecciona una actividad</option>
              {activities.map((activity) => (
                <option key={activity} value={activity}>{activity}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={!activityType}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Buscar
            </button>
          </div>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            Recomendaciones para {activityType}
          </h2>

          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-green-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-800">{rec.location}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">{rec.dates}</span>
                  </div>
                </div>
                <div className="bg-green-100 rounded-full px-6 py-3 text-center">
                  <div className="text-3xl font-bold text-green-700">{rec.score}</div>
                  <div className="text-xs text-green-600 font-semibold">SCORE</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-600 font-semibold mb-1">TEMPERATURA</p>
                  <p className="text-lg font-bold text-blue-900">{rec.temperature}</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-3">
                  <p className="text-xs text-cyan-600 font-semibold mb-1">CONDICIONES</p>
                  <p className="text-lg font-bold text-cyan-900">{rec.conditions}</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-3">
                  <p className="text-xs text-teal-600 font-semibold mb-1">PROB. LLUVIA</p>
                  <p className="text-lg font-bold text-teal-900">{rec.rainfall}</p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-green-800 font-medium">{rec.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Cómo Funciona</h3>
        <div className="space-y-3 text-gray-600">
          <p>
            El recomendador analiza datos históricos de clima de los últimos 10 años para identificar
            los períodos con mejores condiciones para tu actividad.
          </p>
          <p>
            Utiliza algoritmos de IA que consideran temperatura, precipitación, vientos, humedad y
            otros factores para generar un score de idoneidad.
          </p>
          <p className="text-sm text-gray-500 italic">
            Datos proporcionados por NASA Giovanni, GES DISC OPeNDAP y Data Rods for Hydrology
          </p>
        </div>
      </div>
    </div>
  );
}
