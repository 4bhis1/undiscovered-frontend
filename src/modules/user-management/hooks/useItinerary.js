import {useContext} from 'react';
import {AuthContext} from '../../../context/auth/AuthContext';
import {ItineraryService} from '../../../services';
import HttpAuth from '../../../services/HttpAuthService';

export const useGererateItinerary = () => {
  const {state, setAuth, clearAuth} = useContext(AuthContext);

  const showError = error => {
    console.log(error);
  };
  const gererateItinerary = async itineraryData => {
    try {
      const user = await ItineraryService.gererateItinerary(itineraryData);
      return user;
    } catch (error) {
      showError(error);
    }
  };

  return {
    ...state,
    gererateItinerary,
  };
};
