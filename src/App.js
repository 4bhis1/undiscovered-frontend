import React from 'react';
import {AppNavigator} from './routes/AppNavigator';
import {BrowserRouter} from 'react-router-dom';

import {ThemeProvider, createTheme} from '@mui/material';

import theme from './theme/MaterialTheme';
import {Theme} from '@radix-ui/themes';
import {GoogleOAuthProvider} from '@react-oauth/google';

function App() {
  return (
    <>
      <ThemeProvider theme={createTheme(theme)}>
        <Theme>
          <GoogleOAuthProvider clientId="1088606169663-df95s64h0ihj8prru5mcf2e3hm2ehe3o.apps.googleusercontent.com">
            <BrowserRouter basename="/">
              <AppNavigator />
            </BrowserRouter>
          </GoogleOAuthProvider>
        </Theme>
      </ThemeProvider>
    </>
  );
}

export default App;
