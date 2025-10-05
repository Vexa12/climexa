import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { getWeatherPrediction } from '../../utils/ai';

export default function RecommenderSection() {
  const [activityType, setActivityType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const activities = [
    'Camping',
    'Senderismo',
    'Fotografía',
    'Observación Astronómica',
    'Deportes al Aire Libre',
    'Picnic',
    'Pesca',
    'Escalada',
    'Ciclismo',
    'Kayak',
    'Surf',
    'Esquí',
    'Snowboard',
    'Parapente',
    'Buceo',
    'Excursionismo',
    'Observación de Aves',
    'Fotografía de Naturaleza',
    'Acampada Salvaje',
    'Trekking',
    'Montañismo',
    'Rafting',
    'Canoa',
    'Paddleboarding',
    'Kitesurf',
    'Windsurf',
    'Buceo con Snorkel',
    'Pesca Deportiva',
    'Caza Fotográfica',
    'Observación de Estrellas',
  ];

  const filteredActivities = activities.filter(activity =>
    activity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (activityType) {
      fetchRecommendations(activityType);
    }
  }, [activityType]);

  const fetchRecommendations = async (activity: string) => {
    console.log('fetchRecommendations called with activity:', activity);
    setLoading(true);
    try {
      const vertexRecommendations = await getWeatherPrediction(activity);
      console.log('Received recommendations:', vertexRecommendations);
      if (vertexRecommendations.length > 0) {
        console.log('Setting recommendations:', vertexRecommendations);
        setRecommendations(vertexRecommendations);
      } else {
        console.log('No recommendations received, setting empty array');
        setRecommendations([]);
      }
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      setRecommendations([]);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Recomendador Inteligente</h1>
        <p className="text-gray-600">Descubre cuándo y dónde realizar tu actividad según datos históricos</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Buscar Recomendaciones</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Actividad
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Buscar actividad..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            {showSuggestions && filteredActivities.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity}
                    onClick={() => {
                      setSearchTerm(activity);
                      setActivityType(activity);
                      setShowSuggestions(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {activity}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-end gap-3">
            <button
              onClick={() => {
                if (searchTerm.trim()) {
                  setActivityType(searchTerm.trim());
                }
              }}
              disabled={loading || !searchTerm.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-5 h-5" />
              Buscar
            </button>
            {loading ? (
              <p className="text-sm text-blue-600">Generando recomendaciones...</p>
            ) : activityType ? (
              <p className="text-sm text-gray-600">Recomendaciones generadas para {activityType}</p>
            ) : (
              <p className="text-sm text-gray-600">Selecciona una actividad para obtener recomendaciones automáticas</p>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generando recomendaciones inteligentes...</p>
        </div>
      ) : recommendations.length > 0 ? (
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
      ) : activityType ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No se pudieron generar recomendaciones. Verifica tu configuración de API.</p>
          <p className="text-red-600 text-sm mt-2">Por favor revisa que las variables de entorno para la API de Google Cloud estén correctamente configuradas.</p>
        </div>
      ) : null}
      
    </div>
  );
}
