import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_CLOUD_API_KEY);
const model = genAI.getGenerativeModel({ model: import.meta.env.VITE_GOOGLE_CLOUD_MODEL });

const mockRecommendations: Record<string, any[]> = {
  senderismo: [
    {
      location: "Cerro Tunari",
      dates: "15-20 Mayo",
      score: 9.2,
      temperature: 12,
      conditions: "Despejado",
      rainfall: 5,
      reason: "Excelente visibilidad y senderos bien marcados. Ideal para principiantes y avanzados."
    },
    {
      location: "Valle de la Luna",
      dates: "10-15 Junio",
      score: 8.8,
      temperature: 15,
      conditions: "Parcialmente nublado",
      rainfall: 10,
      reason: "Formaciones rocosas únicas y rutas moderadas. Perfecto para fotografía."
    },
    {
      location: "Pico Austria",
      dates: "1-5 Julio",
      score: 9.5,
      temperature: 8,
      conditions: "Despejado",
      rainfall: 3,
      reason: "Vista panorámica excepcional. Desafío moderado con recompensa increíble."
    }
  ],
  camping: [
    {
      location: "Lago Angostura",
      dates: "20-25 Mayo",
      score: 9.0,
      temperature: 14,
      conditions: "Despejado",
      rainfall: 8,
      reason: "Área de camping organizada con vista al lago. Ideal para familias."
    },
    {
      location: "Parque Nacional Tunari",
      dates: "15-20 Junio",
      score: 8.5,
      temperature: 11,
      conditions: "Nublado",
      rainfall: 15,
      reason: "Zonas de camping primitivas rodeadas de naturaleza. Experiencia auténtica."
    },
    {
      location: "Río Taquina",
      dates: "10-15 Julio",
      score: 9.3,
      temperature: 16,
      conditions: "Parcialmente nublado",
      rainfall: 12,
      reason: "Camping junto al río con actividades acuáticas. Ambiente relajante."
    }
  ],
  fotografia: [
    {
      location: "Valle de la Luna",
      dates: "12-18 Junio",
      score: 9.4,
      temperature: 15,
      conditions: "Despejado",
      rainfall: 6,
      reason: "Formaciones rocosas surrealistas perfectas para fotos artísticas al atardecer."
    },
    {
      location: "Cerro Manquipata",
      dates: "8-14 Julio",
      score: 8.9,
      temperature: 13,
      conditions: "Parcialmente nublado",
      rainfall: 9,
      reason: "Vista panorámica de la ciudad. Ideal para fotografía urbana y paisajística."
    },
    {
      location: "Lago Corani",
      dates: "20-26 Julio",
      score: 9.1,
      temperature: 10,
      conditions: "Despejado",
      rainfall: 4,
      reason: "Reflejos perfectos en el agua. Condiciones ideales para fotografía de naturaleza."
    }
  ],
  observacion: [
    {
      location: "Cerro Tunari",
      dates: "15-20 Julio",
      score: 9.6,
      temperature: 6,
      conditions: "Despejado",
      rainfall: 2,
      reason: "Altitud perfecta para observación astronómica. Cielo nocturno excepcional."
    },
    {
      location: "Pampa Aullagas",
      dates: "10-15 Agosto",
      score: 9.2,
      temperature: 8,
      conditions: "Despejado",
      rainfall: 3,
      reason: "Zona de baja contaminación lumínica. Ideal para telescopios avanzados."
    },
    {
      location: "Cerro Manquipata",
      dates: "5-10 Agosto",
      score: 8.8,
      temperature: 9,
      conditions: "Parcialmente nublado",
      rainfall: 7,
      reason: "Acceso fácil con vista despejada. Bueno para principiantes en astronomía."
    }
  ],
  escalada: [
    {
      location: "Cerro Tunari - Pared Norte",
      dates: "1-5 Junio",
      score: 9.3,
      temperature: 10,
      conditions: "Despejado",
      rainfall: 4,
      reason: "Rutas técnicas desafiantes. Condiciones de hielo ideales en temporada."
    },
    {
      location: "Río Taquina - Rocas",
      dates: "15-20 Julio",
      score: 8.7,
      temperature: 14,
      conditions: "Parcialmente nublado",
      rainfall: 11,
      reason: "Escalada deportiva con rutas variadas. Ambiente natural impresionante."
    },
    {
      location: "Valle de la Luna - Formaciones",
      dates: "10-15 Agosto",
      score: 9.0,
      temperature: 12,
      conditions: "Despejado",
      rainfall: 6,
      reason: "Escalada boulder única. Formaciones rocosas perfectas para técnica."
    }
  ],
  ciclismo: [
    {
      location: "Camino a Sacaba",
      dates: "20-25 Mayo",
      score: 8.9,
      temperature: 18,
      conditions: "Despejado",
      rainfall: 8,
      reason: "Rutas planas con vistas panorámicas. Ideal para ciclismo recreativo."
    },
    {
      location: "Cerro Manquipata - Circuito",
      dates: "15-20 Junio",
      score: 9.1,
      temperature: 16,
      conditions: "Parcialmente nublado",
      rainfall: 10,
      reason: "Desafío moderado con descensos técnicos. Paisajes cambiantes."
    },
    {
      location: "Valle Bajo",
      dates: "10-15 Julio",
      score: 8.5,
      temperature: 19,
      conditions: "Despejado",
      rainfall: 7,
      reason: "Rutas familiares con paradas pintorescas. Perfecto para grupos."
    }
  ],
  pesca: [
    {
      location: "Lago Angostura",
      dates: "15-20 Abril",
      score: 8.8,
      temperature: 17,
      conditions: "Parcialmente nublado",
      rainfall: 12,
      reason: "Pesca de trucha excelente. Ambiente tranquilo y bien equipado."
    },
    {
      location: "Río Rocha",
      dates: "10-15 Mayo",
      score: 9.0,
      temperature: 16,
      conditions: "Nublado",
      rainfall: 15,
      reason: "Pesca de pejerrey. Corrientes moderadas perfectas para técnica."
    },
    {
      location: "Embalse de La Angostura",
      dates: "5-10 Junio",
      score: 8.6,
      temperature: 15,
      conditions: "Parcialmente nublado",
      rainfall: 13,
      reason: "Diversidad de especies. Zonas designadas para pesca deportiva."
    }
  ],
  picnic: [
    {
      location: "Parque Nacional Tunari - Área de Picnic",
      dates: "20-25 Mayo",
      score: 8.7,
      temperature: 18,
      conditions: "Despejado",
      rainfall: 9,
      reason: "Áreas designadas con mesas y parrillas. Ambiente familiar perfecto."
    },
    {
      location: "Lago Corani - Orillas",
      dates: "15-20 Junio",
      score: 9.2,
      temperature: 17,
      conditions: "Parcialmente nublado",
      rainfall: 8,
      reason: "Vista al lago con brisa fresca. Ideal para relajación y comida."
    },
    {
      location: "Valle de la Luna - Zona de Descanso",
      dates: "10-15 Julio",
      score: 8.9,
      temperature: 16,
      conditions: "Despejado",
      rainfall: 6,
      reason: "Entorno único con mesas de picnic. Experiencia memorable."
    }
  ],
  kayak: [
    {
      location: "Río Taquina - Tramo Superior",
      dates: "15-20 Mayo",
      score: 9.1,
      temperature: 19,
      conditions: "Despejado",
      rainfall: 7,
      reason: "Rápidos moderados perfectos para kayak. Agua cristalina."
    },
    {
      location: "Lago Angostura - Circuito",
      dates: "10-15 Junio",
      score: 8.8,
      temperature: 18,
      conditions: "Parcialmente nublado",
      rainfall: 10,
      reason: "Agua calma ideal para principiantes. Vistas panorámicas."
    },
    {
      location: "Río Rocha - Sección Media",
      dates: "5-10 Julio",
      score: 9.3,
      temperature: 17,
      conditions: "Despejado",
      rainfall: 8,
      reason: "Desafío intermedio con rápidos emocionantes. Naturaleza exuberante."
    }
  ],
  birdwatching: [
    {
      location: "Parque Nacional Tunari",
      dates: "20-25 Abril",
      score: 9.0,
      temperature: 16,
      conditions: "Parcialmente nublado",
      rainfall: 11,
      reason: "Diversidad de aves migratorias. Senderos accesibles con guías."
    },
    {
      location: "Valle Bajo - Humedales",
      dates: "15-20 Mayo",
      score: 8.7,
      temperature: 18,
      conditions: "Nublado",
      rainfall: 14,
      reason: "Observación de aves acuáticas. Ambiente tranquilo y biodiverso."
    },
    {
      location: "Cerro Manquipata - Laderas",
      dates: "10-15 Junio",
      score: 9.2,
      temperature: 15,
      conditions: "Despejado",
      rainfall: 6,
      reason: "Aves de altura con telescopios. Vistas excepcionales."
    }
  ],
  yoga: [
    {
      location: "Parque Nacional Tunari - Claro",
      dates: "15-20 Mayo",
      score: 8.9,
      temperature: 17,
      conditions: "Despejado",
      rainfall: 8,
      reason: "Espacios abiertos con energía positiva. Ideal para práctica matutina."
    },
    {
      location: "Lago Corani - Orillas",
      dates: "10-15 Junio",
      score: 9.1,
      temperature: 16,
      conditions: "Parcialmente nublado",
      rainfall: 9,
      reason: "Vista al agua calmante. Ambiente sereno para meditación."
    },
    {
      location: "Valle de la Luna - Plataforma",
      dates: "5-10 Julio",
      score: 8.8,
      temperature: 15,
      conditions: "Despejado",
      rainfall: 7,
      reason: "Entorno único que inspira paz. Perfecto para yoga al aire libre."
    }
  ],
  meditacion: [
    {
      location: "Cerro Tunari - Mirador",
      dates: "20-25 Mayo",
      score: 9.3,
      temperature: 14,
      conditions: "Despejado",
      rainfall: 5,
      reason: "Altitud espiritual con vista panorámica. Ambiente de paz absoluta."
    },
    {
      location: "Río Taquina - Cascada",
      dates: "15-20 Junio",
      score: 8.9,
      temperature: 16,
      conditions: "Parcialmente nublado",
      rainfall: 10,
      reason: "Sonido del agua natural. Perfecto para meditación mindfulness."
    },
    {
      location: "Parque Nacional Tunari - Bosque",
      dates: "10-15 Julio",
      score: 9.0,
      temperature: 15,
      conditions: "Nublado",
      rainfall: 12,
      reason: "Entorno natural con sonidos de la naturaleza. Conexión profunda."
    }
  ],
  paseo_bosque: [
    {
      location: "Parque Nacional Tunari - Senderos",
      dates: "15-20 Abril",
      score: 8.8,
      temperature: 18,
      conditions: "Parcialmente nublado",
      rainfall: 11,
      reason: "Bosques densos con variedad de flora. Caminatas relajantes."
    },
    {
      location: "Valle Bajo - Arboleda",
      dates: "10-15 Mayo",
      score: 9.0,
      temperature: 19,
      conditions: "Despejado",
      rainfall: 8,
      reason: "Árboles centenarios con sombra perfecta. Ambiente fresco."
    },
    {
      location: "Cerro Manquipata - Laderas Boscosas",
      dates: "5-10 Junio",
      score: 8.6,
      temperature: 17,
      conditions: "Nublado",
      rainfall: 13,
      reason: "Bosque mixto con senderos suaves. Ideal para observación de naturaleza."
    }
  ],
  banos_bosque: [
    {
      location: "Parque Nacional Tunari - Área de Shinrin-yoku",
      dates: "20-25 Mayo",
      score: 9.2,
      temperature: 16,
      conditions: "Parcialmente nublado",
      rainfall: 9,
      reason: "Técnica japonesa de baño forestal. Ambiente terapéutico comprobado."
    },
    {
      location: "Valle de la Luna - Zona de Meditación",
      dates: "15-20 Junio",
      score: 8.9,
      temperature: 15,
      conditions: "Despejado",
      rainfall: 7,
      reason: "Entorno único con energía especial. Beneficios para la salud mental."
    },
    {
      location: "Río Taquina - Orillas Boscosas",
      dates: "10-15 Julio",
      score: 9.1,
      temperature: 17,
      conditions: "Nublado",
      rainfall: 11,
      reason: "Combinación de agua y bosque. Experiencia multisensorial."
    }
  ],
  paseo_agua: [
    {
      location: "Lago Angostura - Sendero Perimetral",
      dates: "15-20 Abril",
      score: 8.7,
      temperature: 18,
      conditions: "Despejado",
      rainfall: 10,
      reason: "Caminata junto al agua con vistas constantes. Ambiente relajante."
    },
    {
      location: "Río Rocha - Margen",
      dates: "10-15 Mayo",
      score: 9.0,
      temperature: 19,
      conditions: "Parcialmente nublado",
      rainfall: 9,
      reason: "Corriente suave con sonido calmante. Perfecto para reflexión."
    },
    {
      location: "Embalse de La Angostura - Circuito",
      dates: "5-10 Junio",
      score: 8.8,
      temperature: 17,
      conditions: "Nublado",
      rainfall: 12,
      reason: "Agua extensa con variedad de paisajes. Caminatas variadas."
    }
  ]
};

export async function getWeatherPrediction(activity: string): Promise<any[]> {
  console.log('Getting recommendations for activity:', activity);

  // Return mock recommendations based on activity
  const recommendations = mockRecommendations[activity] || mockRecommendations.senderismo;
  console.log('Returning mock recommendations:', recommendations);

  return recommendations;
}

export async function getEventWeatherPrediction(date: string, location: string, activity: string): Promise<{ temperature: number; conditions: string; humidity: number; windSpeed: number; precipitation: number; visibility: number; recommendation: string; warnings: string[] } | null> {
  const prompt = `Predice el clima para la fecha ${date} en ${location}, Cochabamba, Bolivia, para la actividad de ${activity}. Devuelve un objeto JSON con: temperature (número en °C), conditions (string), humidity (número en %), windSpeed (número en km/h), precipitation (número en %), visibility (número en %), recommendation (string con recomendaciones), warnings (arreglo de strings con advertencias). Solo devuelve el JSON, sin texto adicional.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Parse the JSON response
    const prediction = JSON.parse(text);
    return prediction;
  } catch (error) {
    console.error('Error getting event weather prediction:', error);
    return null;
  }
}
