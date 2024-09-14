import {colors} from '@mui/material';
import {createTheme} from '@mui/material/styles';

const muiTheme = createTheme();
const {palette} = muiTheme;
const theme = {
  ...muiTheme,
  palette: {
    ...palette,
    newVariant: {
      main: colors.green[400],
    },
    // mode: 'dark',
  },
};

export default theme;
