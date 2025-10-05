import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Star, MapPin, Camera, Send } from 'lucide-react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { User, Review } from '../../types';
import { storage } from '../../utils/storage';

declare global {
  interface Window {
    google: any;
  }
}

interface CommunitySectionProps {
  user: User;
}

export default function CommunitySection({ user }: CommunitySectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    locationId: '',
    rating: 5,
    comment: '',
  });
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [addressLoading, setAddressLoading] = useState(false);

  const locations = [
    'Parque Tunari',
    'Toro Toro',
    'Mirador del Cristo',
    'Laguna Alalay',
    'Valle Alto',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview: Review = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      locationId: formData.locationId,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString(),
    };

    storage.addReview(newReview);
    setFormData({ locationId: '', rating: 5, comment: '' });
    setShowForm(false);
  };

  const reviews = storage.getReviews();
  const locationStats = locations.map(loc => {
    const locationReviews = reviews.filter(r => r.locationId === loc);
    const avgRating = locationReviews.length > 0
      ? locationReviews.reduce((sum, r) => sum + r.rating, 0) / locationReviews.length
      : 0;

    const windMentions = locationReviews.filter(r =>
      r.comment.toLowerCase().includes('viento')
    ).length;

    return {
      name: loc,
      reviewCount: locationReviews.length,
      avgRating: avgRating.toFixed(1),
      windMentions,
      topComment: locationReviews[0]?.comment || 'Sin comentarios aún',
    };
  });

  const render = (status: Status) => {
    if (status === Status.LOADING) return <p>Cargando mapa...</p>;
    if (status === Status.FAILURE) return <p>Error al cargar el mapa</p>;
    return <></>;
  };

  const Map = ({
    center,
    zoom,
    selectedLocation,
    setSelectedLocation,
    setLocationId,
    setAddressLoading,
  }: {
    center: google.maps.LatLngLiteral;
    zoom: number;
    selectedLocation: [number, number] | null;
    setSelectedLocation: (loc: [number, number]) => void;
    setLocationId: (id: string) => void;
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
                setLocationId(results[0].formatted_address);
              } else {
                setLocationId(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
              }
            } catch {
              setLocationId(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            }
            setAddressLoading(false);
          }
        });
      }
    }, [map, center, zoom, setSelectedLocation, setLocationId, setAddressLoading, marker]);

    return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Comunidad</h1>
          <p className="text-gray-600">Comparte experiencias y aprende de otros viajeros</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2"
        >
          <MessageSquare className="w-5 h-5" />
          {showForm ? 'Ver Opiniones' : 'Escribir Opinión'}
        </button>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Análisis de Sentimientos IA</h2>
        <p className="text-green-100 mb-4">
          CLIMEXA analiza los comentarios de la comunidad usando procesamiento de lenguaje natural
          para extraer insights útiles sobre condiciones reales en cada ubicación.
        </p>
        
      </div>

      {showForm ? (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Compartir Tu Experiencia</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación (haz clic en el mapa para seleccionar)
              </label>
              <div className="h-64 w-full border border-gray-300 rounded-lg overflow-hidden mb-2">
                <Wrapper apiKey="AIzaSyBQpToik2WTQFrvheexS-K-V4TVYrwkRbQ" render={render}>
                  <Map
                    center={{ lat: -17.3935, lng: -66.1570 }}
                    zoom={10}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    setLocationId={(id) => setFormData({ ...formData, locationId: id })}
                    setAddressLoading={setAddressLoading}
                  />
                </Wrapper>
              </div>
              {addressLoading ? (
                <p className="text-sm text-gray-600">Obteniendo dirección...</p>
              ) : formData.locationId ? (
                <p className="text-sm text-gray-600">Ubicación seleccionada: {formData.locationId}</p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calificación
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tu Opinión
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                rows={4}
                placeholder="Comparte tu experiencia sobre el clima, las condiciones del lugar, consejos..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Publicar Opinión
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Análisis por Ubicación</h2>
            {locationStats.map((stat) => (
              <div key={stat.name} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-blue-600" />
                      {stat.name}
                    </h3>
                    <p className="text-gray-600">{stat.reviewCount} opiniones</p>
                  </div>
                  {stat.avgRating !== '0.0' && (
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        <span className="text-2xl font-bold text-gray-800">{stat.avgRating}</span>
                      </div>
                      <p className="text-xs text-gray-500">Promedio</p>
                    </div>
                  )}
                </div>

                {stat.reviewCount > 0 && (
                  <>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Insights IA</h4>
                      <p className="text-sm text-blue-800">
                        {stat.windMentions > 0
                          ? `${Math.round((stat.windMentions / stat.reviewCount) * 100)}% de visitantes mencionan viento fuerte. Mejor visitar en la mañana.`
                          : 'Condiciones generalmente favorables según opiniones de la comunidad.'}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Comentario Destacado</h4>
                      <p className="text-sm text-gray-600 italic">"{stat.topComment}"</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Opiniones Recientes</h2>
            {reviews.length > 0 ? (
              reviews.slice().reverse().map((review) => (
                <div key={review.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-800">{review.userName}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{review.locationId}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">Aún no hay opiniones</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sé el Primero en Opinar
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
