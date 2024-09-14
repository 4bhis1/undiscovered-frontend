import React, {useReducer} from 'react';
import {IntlProvider} from 'react-intl';
import locales from '../../locales';
import {
  LocaleContext,
  SET_LOCALE,
  initialState,
  localeReducer,
} from './LocaleContext';

export const LocaleProvider = props => {
  const {children} = props || {};
  const [state, dispatch] = useReducer(localeReducer, initialState);

  const setLocale = payload => {
    dispatch({type: SET_LOCALE, payload});
  };

  // The value provided to the context consumers
  const localeContextValue = {
    state,
    dispatch,
    setLocale,
  };

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <IntlProvider
        messages={locales[state?.locale]}
        locale={state?.locale}
        defaultLocale="en">
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
