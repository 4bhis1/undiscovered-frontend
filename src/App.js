import React from 'react';
import {AppNavigator} from './routes/AppNavigator';
import {BrowserRouter} from 'react-router-dom';

import {ThemeProvider, createTheme} from '@mui/material';

import theme from './theme/MaterialTheme';

function App() {
  return (
    <>
      <ThemeProvider theme={createTheme(theme)}>
        <BrowserRouter basename="/">
          <AppNavigator />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
