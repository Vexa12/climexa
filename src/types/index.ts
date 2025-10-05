export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AstronomicalEvent {
  id: string;
  type: 'full-moon' | 'new-moon' | 'eclipse' | 'meteor-shower' | 'super-moon' | 'blood-moon';
  title: string;
  date: string;
  time: string;
  description: string;
  visibility: number;
  optimalLocation: string;
  recommendations: string[];
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  conditions: string;
  visibility: number;
  precipitation: number;
}

export interface Event {
  id: string;
  userId: string;
  title: string;
  location: string;
  date: string;
  time: string;
  type: string;
  weatherPrediction?: WeatherData;
  aiRecommendations?: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  locationId: string;
  rating: number;
  comment: string;
  date: string;
  photos?: string[];
}
