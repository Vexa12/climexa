import { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, Clock, Sparkles, Save } from 'lucide-react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { User, Event, WeatherData } from '../../types';
import { storage } from '../../utils/storage';
import { getEventWeatherPrediction } from '../../utils/ai';

declare global {
  interface Window {
    google: any;
  }
}

interface EventPlanningSectionProps {
  user: User;
}

const EVENT_TYPES = [
  { id: 'senderismo', label: 'Senderismo', icon: '🥾' },
  { id: 'camping', label: 'Camping', icon: '⛺' },
  { id: 'fotografia', label: 'Fotografía', icon: '📸' },
  { id: 'observacion', label: 'Observación Astronómica', icon: '🔭' },
  { id: 'escalada', label: 'Escalada', icon: '🧗' },
  { id: 'ciclismo', label: 'Ciclismo', icon: '🚴' },
  { id: 'pesca', label: 'Pesca', icon: '🎣' },
  { id: 'picnic', label: 'Picnic', icon: '🧺' },
  { id: 'kayak', label : 'Kayak', icon: '🛶' },
  { id: 'birdwatching', label: 'Observación de Aves', icon: '🐦' },
  { id: 'yoga', label: 'Yoga al Aire Libre', icon: '🧘'   },
  { id: 'meditacion', label: 'Meditación', icon: '🧘‍♂️' },
  { id: 'paseo_bosque', label: 'Paseo por el Bosque', icon: '🌲' },
  { id: 'banos_bosque', label: 'Baños de Bosque', icon: '🌳' },
  { id: 'paseo_agua', label: 'Paseo por Lagos o Ríos', icon: '🏞️' } 
];

const getAddress = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBQpToik2WTQFrvheexS-K-V4TVYrwkRbQ`);
    const data = await response.json();
    if (data.results && data.results[0]) {
      return data.results[0].formatted_address;
    }
  } catch (error) {
    console.error('Error fetching address:', error);
  }
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
};

const render = (status: Status) => {
  if (status === Status.LOADING) return <p>Cargando mapa...</p>;
  if (status === Status.FAILURE) return <p>Error al cargar el mapa</p>;
  return <></>;
};

const Map = ({
  center,
  zoom,
  setSelectedLocation,
  setLocationName,
  setAddressLoading,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
  selectedLocation: [number, number] | null;
  setSelectedLocation: (loc: [number, number]) => void;
  setLocationName: (name: string) => void;
  setAddressLoading: (loading: boolean) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      map.setCenter(center);
      map.setZoom(zoom);

      map.addListener('click', async (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setSelectedLocation([lat, lng]);
          setAddressLoading(true);
          if (marker) marker.setMap(null);
          const newMarker = new window.google.maps.Marker({
            position: e.latLng,
            map: map,
          });
          setMarker(newMarker);
          try {
            const geocoder = new window.google.maps.Geocoder();
            const results = await geocoder.geocode({ location: e.latLng });
            if (results[0]) {
              setLocationName(results[0].formatted_address);
            } else {
              setLocationName(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            }
          } catch {
            setLocationName(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          }
          setAddressLoading(false);
        }
      });
    }
  }, [map, center, zoom, setSelectedLocation, setLocationName, setAddressLoading, marker]);

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
};

export default function EventPlanningSection({ user }: EventPlanningSectionProps) {
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [locationName, setLocationName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [prediction, setPrediction] = useState<WeatherData & { recommendation: string; warnings: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

  const handlePredict = async () => {
    if (!eventDate || !locationName || !eventType) return;

    setLoading(true);

    try {
      const aiPrediction = await getEventWeatherPrediction(eventDate, locationName, eventType);
      if (aiPrediction) {
        setPrediction(aiPrediction);
      } else {
        // Fallback to mock prediction if AI fails
        const mockPrediction: WeatherData & { recommendation: string; warnings: string[] } = {
          temperature: Math.floor(Math.random() * 15) + 10,
          conditions: ['Despejado', 'Parcialmente nublado', 'Nublado'][Math.floor(Math.random() * 3)],
          humidity: Math.floor(Math.random() * 30) + 40,
          windSpeed: Math.floor(Math.random() * 20) + 5,
          precipitation: Math.floor(Math.random() * 20),
          visibility: Math.floor(Math.random() * 20) + 80,
          recommendation: 'Condiciones ideales para la actividad. Recomendamos llevar protección solar y agua suficiente.',
          warnings: [] as string[]
        };

        if (mockPrediction.precipitation > 15) {
          mockPrediction.warnings.push('Posibilidad de lluvia moderada');
        }
        if (mockPrediction.windSpeed > 20) {
          mockPrediction.warnings.push('Vientos fuertes esperados');
        }

        setPrediction(mockPrediction);
      }
    } catch (error) {
      console.error('Error getting prediction:', error);
      // Fallback to mock prediction
      const mockPrediction: WeatherData & { recommendation: string; warnings: string[] } = {
        temperature: Math.floor(Math.random() * 15) + 10,
        conditions: ['Despejado', 'Parcialmente nublado', 'Nublado'][Math.floor(Math.random() * 3)],
        humidity: Math.floor(Math.random() * 30) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        precipitation: Math.floor(Math.random() * 20),
        visibility: Math.floor(Math.random() * 20) + 80,
        recommendation: 'Condiciones ideales para la actividad. Recomendamos llevar protección solar y agua suficiente.',
        warnings: [] as string[]
      };

      if (mockPrediction.precipitation > 15) {
        mockPrediction.warnings.push('Posibilidad de lluvia moderada');
      }
      if (mockPrediction.windSpeed > 20) {
        mockPrediction.warnings.push('Vientos fuertes esperados');
      }

      setPrediction(mockPrediction);
    }

    setLoading(false);
  };

  const handleSave = async () => {
    if (!user || !title || !eventType || !locationName || !eventDate) return;

    setSaving(true);

    const newEvent: Event = {
      id: Date.now().toString(),
      userId: user.id,
      title,
      location: locationName,
      date: eventDate,
      time: eventTime || '',
      type: eventType,
      weatherPrediction: prediction ? {
        temperature: prediction.temperature,
        humidity: prediction.humidity,
        windSpeed: prediction.windSpeed,
        conditions: prediction.conditions,
        visibility: prediction.visibility,
        precipitation: prediction.precipitation
      } : undefined,
      aiRecommendations: prediction ? [prediction.recommendation, ...prediction.warnings] : []
    };

    storage.addEvent(newEvent);

    setSaving(false);

    setTitle('');
    setEventType('');
    setLocationName('');
    setEventDate('');
    setEventTime('');
    setPrediction(null);
    alert('Evento guardado exitosamente');
  };

  const myEvents = storage.getEvents().filter(e => e.userId === user.id);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4">
          <Calendar className="w-12 h-12" />
          <div>
            <h2 className="text-3xl font-bold">Planificar Evento</h2>
            <p className="text-green-100">Crea tu próxima aventura con predicciones precisas</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Detalles del Evento</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del evento
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Trekking al Tunari"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de actividad
              </label>
              <div className="grid grid-cols-2 gap-3">
                {EVENT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setEventType(type.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      eventType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl mb-1 block">{type.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Ubicación (haz clic en el mapa para seleccionar)
              </label>
              <div className="h-64 w-full border border-gray-300 rounded-lg overflow-hidden">
                <Wrapper apiKey="AIzaSyBQpToik2WTQFrvheexS-K-V4TVYrwkRbQ" render={render}>
                  <Map
                    center={{ lat: -17.3935, lng: -66.1570 }}
                    zoom={10}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    setLocationName={setLocationName}
                    setAddressLoading={setAddressLoading}
                  />
                </Wrapper>
              </div>
              {addressLoading ? (
                <p className="text-sm text-gray-600 mt-2">Obteniendo dirección...</p>
              ) : locationName ? (
                <p className="text-sm text-gray-600 mt-2">Ubicación seleccionada: {locationName}</p>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Fecha
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Hora
                </label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handlePredict}
              disabled={!eventDate || !locationName || !eventType || loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>Analizando...</>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Obtener Predicción IA
                </>
              )}
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Predicción Climática</h3>

            {!prediction ? (
              <div className="bg-gray-50 rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
                <Sparkles className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">
                  Completa los datos y obtén una predicción
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Temperatura</p>
                      <p className="text-2xl font-bold text-gray-800">{prediction.temperature}°C</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Condición</p>
                      <p className="text-lg font-semibold text-gray-800">{prediction.conditions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Humedad</p>
                      <p className="text-xl font-bold text-gray-800">{prediction.humidity}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Viento</p>
                      <p className="text-xl font-bold text-gray-800">{prediction.windSpeed} km/h</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Probabilidad de lluvia</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${prediction.precipitation}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{prediction.precipitation}%</span>
                    </div>
                  </div>
                </div>

                {prediction.warnings.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="font-semibold text-yellow-800 mb-2">⚠️ Advertencias</p>
                    {prediction.warnings.map((warning: string, idx: number) => (
                      <p key={idx} className="text-sm text-yellow-700">• {warning}</p>
                    ))}
                  </div>
                )}

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-semibold text-green-800 mb-2">💡 Recomendaciones IA</p>
                  <p className="text-sm text-green-700">{prediction.recommendation}</p>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    'Guardando...'
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Guardar Evento
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Mis Eventos Planificados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.length > 0 ? (
            myEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h4>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
