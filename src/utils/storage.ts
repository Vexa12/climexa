import { User, Event, Review, AstronomicalEvent } from '../types';
import { getWeatherPrediction } from './ai';

const STORAGE_KEYS = {
  CURRENT_USER: 'climexa_current_user',
  USERS: 'climexa_users',
  EVENTS: 'climexa_events',
  REVIEWS: 'climexa_reviews',
  ASTRONOMICAL_EVENTS: 'climexa_astronomical_events',
};

export const storage = {
  getCurrentUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  getUsers(): User[] {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  getUserByEmail(email: string): User | undefined {
    const users = this.getUsers();
    return users.find(u => u.email === email);
  },

  getEvents(): Event[] {
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return data ? JSON.parse(data) : [];
  },

  addEvent(event: Event): void {
    const events = this.getEvents();
    events.push(event);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  },

  updateEvent(event: Event): void {
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === event.id);
    if (index !== -1) {
      events[index] = event;
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    }
  },

  deleteEvent(eventId: string): void {
    const events = this.getEvents();
    const filtered = events.filter(e => e.id !== eventId);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(filtered));
  },

  getReviews(): Review[] {
    const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return data ? JSON.parse(data) : [];
  },

  addReview(review: Review): void {
    const reviews = this.getReviews();
    reviews.push(review);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  },

  getAstronomicalEvents(): AstronomicalEvent[] {
    const data = localStorage.getItem(STORAGE_KEYS.ASTRONOMICAL_EVENTS);
    if (data) {
      return JSON.parse(data);
    }

    const defaultEvents = this.generateDefaultAstronomicalEvents();
    localStorage.setItem(STORAGE_KEYS.ASTRONOMICAL_EVENTS, JSON.stringify(defaultEvents));
    return defaultEvents;
  },

  generateDefaultAstronomicalEvents(): AstronomicalEvent[] {
    const now = new Date();
    return [
      {
        id: '1',
        type: 'full-moon',
        title: 'Luna Llena de Octubre',
        date: '2025-10-17',
        time: '20:12',
        description: 'Luna llena visible con claridad excepcional',
        visibility: 90,
        optimalLocation: 'Mirador del Cristo, Cochabamba',
        recommendations: ['Mejor hora: 20:00 - 23:00', 'Llevar cámara', 'Temperatura estimada: 12°C']
      },
      {
        id: '2',
        type: 'meteor-shower',
        title: 'Lluvia de Meteoros Oriónidas',
        date: '2025-10-21',
        time: '02:00',
        description: 'Pico de actividad de las Oriónidas con hasta 20 meteoros por hora',
        visibility: 85,
        optimalLocation: 'Parque Tunari',
        recommendations: ['Mejor hora: 02:00 - 05:00', 'Alejarse de luces urbanas', 'Llevar abrigo']
      },
      {
        id: '3',
        type: 'new-moon',
        title: 'Luna Nueva',
        date: '2025-11-01',
        time: '05:47',
        description: 'Fase ideal para observación de estrellas y cielo profundo',
        visibility: 95,
        optimalLocation: 'Toro Toro',
        recommendations: ['Cielo más oscuro del mes', 'Ideal para fotografía astronómica', 'Llevar telescopio']
      }
    ];
  }
};

export async function fetchVertexAIRecommendations(activity: string): Promise<any[]> {
  return await getWeatherPrediction(activity);
}
