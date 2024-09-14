import React from 'react';
import {AuthProvider} from './auth/AuthProvider';
import {LocaleProvider} from './locale/LocaleProvider';

// Import other created Providers and add them here
const providers = [AuthProvider, LocaleProvider];

const combineProviders = components => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      const ProviderWrapper = props => {
        const {children} = props || {};
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
      return ProviderWrapper;
    },
    ({children}) => <>{children}</>,
  );
};

// Combining multiple providers to single provider - this will be wrapped around App.js
export default combineProviders(providers);
