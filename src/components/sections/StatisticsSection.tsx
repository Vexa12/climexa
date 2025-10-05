import { TrendingUp, BarChart3, Cloud, Thermometer, Droplets, Calendar } from 'lucide-react';

export default function StatisticsSection() {
  const monthlyData = [
    { month: 'Enero', temp: 18, rain: 125, humidity: 75 },
    { month: 'Febrero', temp: 17, rain: 110, humidity: 78 },
    { month: 'Marzo', temp: 17, rain: 85, humidity: 72 },
    { month: 'Abril', temp: 16, rain: 35, humidity: 65 },
    { month: 'Mayo', temp: 14, rain: 10, humidity: 58 },
    { month: 'Junio', temp: 13, rain: 5, humidity: 55 },
    { month: 'Julio', temp: 13, rain: 8, humidity: 54 },
    { month: 'Agosto', temp: 15, rain: 12, humidity: 52 },
    { month: 'Septiembre', temp: 16, rain: 25, humidity: 58 },
    { month: 'Octubre', temp: 18, rain: 45, humidity: 62 },
    { month: 'Noviembre', temp: 19, rain: 65, humidity: 68 },
    { month: 'Diciembre', temp: 19, rain: 95, humidity: 72 },
  ];

  const currentMonth = new Date().getMonth();
  const currentData = monthlyData[currentMonth];

  const bestMonths = {
    camping: ['Mayo', 'Junio', 'Julio', 'Agosto'],
    hiking: ['Abril', 'Mayo', 'Septiembre', 'Octubre'],
    photography: ['Junio', 'Julio', 'Agosto'],
    astronomy: ['Mayo', 'Junio', 'Julio'],
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Estadísticas Climáticas</h1>
        <p className="text-gray-600">Análisis histórico y tendencias basadas en datos NASA</p>
      </div>

      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Fuentes de Datos Históricos</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <h3 className="font-semibold mb-2">Giovanni</h3>
            <p className="text-sm text-violet-100">Series temporales por variable</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <h3 className="font-semibold mb-2">GES DISC</h3>
            <p className="text-sm text-violet-100">Datasets y estadísticas</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <h3 className="font-semibold mb-2">Data Rods</h3>
            <p className="text-sm text-violet-100">Variables hidrológicas</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <h3 className="font-semibold mb-2">Worldview</h3>
            <p className="text-sm text-violet-100">Imágenes históricas</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg p-6 text-white">
          <Thermometer className="w-10 h-10 mb-3" />
          <h3 className="text-lg font-semibold mb-1">Temperatura Promedio</h3>
          <div className="text-4xl font-bold mb-2">{currentData.temp}°C</div>
          <p className="text-sm opacity-90">Este mes ({currentData.month})</p>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl shadow-lg p-6 text-white">
          <Droplets className="w-10 h-10 mb-3" />
          <h3 className="text-lg font-semibold mb-1">Precipitación</h3>
          <div className="text-4xl font-bold mb-2">{currentData.rain}mm</div>
          <p className="text-sm opacity-90">Promedio mensual</p>
        </div>

        <div className="bg-gradient-to-br from-teal-400 to-green-500 rounded-xl shadow-lg p-6 text-white">
          <Cloud className="w-10 h-10 mb-3" />
          <h3 className="text-lg font-semibold mb-1">Humedad</h3>
          <div className="text-4xl font-bold mb-2">{currentData.humidity}%</div>
          <p className="text-sm opacity-90">Promedio relativo</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Datos Históricos Mensuales
        </h2>

        <div className="space-y-4">
          {monthlyData.map((data, idx) => {
            const isCurrentMonth = idx === currentMonth;
            const maxTemp = Math.max(...monthlyData.map(d => d.temp));
            const maxRain = Math.max(...monthlyData.map(d => d.rain));
            const tempWidth = (data.temp / maxTemp) * 100;
            const rainWidth = (data.rain / maxRain) * 100;

            return (
              <div key={data.month} className={`p-4 rounded-lg ${isCurrentMonth ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50'}`}>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2">
                    <h4 className={`font-semibold ${isCurrentMonth ? 'text-blue-900' : 'text-gray-800'}`}>
                      {data.month}
                    </h4>
                  </div>

                  <div className="col-span-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Thermometer className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">{data.temp}°C</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                        style={{ width: `${tempWidth}%` }}
                      />
                    </div>
                  </div>

                  <div className="col-span-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">{data.rain}mm</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
                        style={{ width: `${rainWidth}%` }}
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">{data.humidity}%</span>
                    </div>
                  </div>

                  <div className="col-span-2 text-right">
                    {isCurrentMonth && (
                      <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        Actual
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-green-600" />
          Mejores Meses por Actividad
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold text-gray-800 mb-3">🏕️ Camping</h3>
            <div className="flex flex-wrap gap-2">
              {bestMonths.camping.map((month) => (
                <span key={month} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {month}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">Baja precipitación y temperaturas moderadas</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-gray-800 mb-3">🥾 Senderismo</h3>
            <div className="flex flex-wrap gap-2">
              {bestMonths.hiking.map((month) => (
                <span key={month} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {month}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">Condiciones ideales para caminatas largas</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-bold text-gray-800 mb-3">📷 Fotografía</h3>
            <div className="flex flex-wrap gap-2">
              {bestMonths.photography.map((month) => (
                <span key={month} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {month}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">Cielos despejados y visibilidad excelente</p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="font-bold text-gray-800 mb-3">🔭 Astronomía</h3>
            <div className="flex flex-wrap gap-2">
              {bestMonths.astronomy.map((month) => (
                <span key={month} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  {month}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">Mínima nubosidad para observación nocturna</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-amber-500 rounded-lg p-6">
        <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Análisis de Tendencias
        </h3>
        <p className="text-amber-800">
          Los datos históricos muestran que los meses de invierno (Mayo-Agosto) son los más estables
          para actividades al aire libre en Cochabamba, con mínima precipitación y cielos despejados.
          La temporada de lluvias (Diciembre-Febrero) requiere mayor planificación.
        </p>
      </div>
    </div>
  );
}
