// Auth.service.js
import {showError} from '../hooks/showError';
import HttpAuth from './HttpAuthService';

export default class ItineraryService {
  // Function to handle user login
  static async gererateItinerary(itineraryData) {
    try {
      const response = await HttpAuth.post(
        '/v1/itinerary/generate',
        itineraryData,
      );
      return response?.data;
    } catch (error) {
      showError(error);
    }
  }

  static async askChatBot(body) {
    const response = await HttpAuth.post('/v1/chat/ask-chatbot', body);
    return response?.data;
  }
}
