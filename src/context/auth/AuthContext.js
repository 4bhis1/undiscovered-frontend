import {createContext} from 'react';

// Define the initial state
export const initialState = {
  user: null,
  loading: true,
  isAuthenticated: false,
};

// Actions
export const SET_AUTH = 'SET_AUTH';
export const CLEAR_AUTH = 'CLEAR_AUTH';
export const SET_LOADING = 'SET_LOADING';


// Define the reducer function
export const authReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload,
        loading: false,
      };
    case CLEAR_AUTH:
      return {
        ...initialState,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload, // Set loading state
      };
    default:
      return state;
  }
};

// Create the context
export const AuthContext = createContext();
