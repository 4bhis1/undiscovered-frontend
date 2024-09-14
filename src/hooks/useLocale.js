import {useContext} from 'react';
import {LocaleContext} from '../context/locale/LocaleContext';

export const useLocale = () => {
  const {state, setLocale} = useContext(LocaleContext);

  const toggleLocale = () => {
    const newLocale = state.locale === 'en' ? 'fr' : 'en';
    setLocale(newLocale);
  };

  return {
    locale: state.locale,
    toggleLocale,
  };
};
