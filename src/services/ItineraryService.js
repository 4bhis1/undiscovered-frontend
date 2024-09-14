// Auth.service.js
import HttpAuth from './HttpAuthService';

export default class ItineraryService {
  // Function to handle user login
  static async gererateItinerary(itineraryData) {
    const response = await HttpAuth.post(
      '/v1/itinerary/generate',
      itineraryData,
    );
    return response?.data;
  }
}
