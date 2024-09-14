import React, {createContext} from 'react';

// Initial state
export const initialState = {locale: 'en'};

// Actions
export const SET_LOCALE = 'SET_LOCALE';

// Reducer function
export const localeReducer = (state, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...state,
        locale: action.payload,
      };
    default:
      return state;
  }
};

export const LocaleContext = createContext([initialState, () => {}]);
