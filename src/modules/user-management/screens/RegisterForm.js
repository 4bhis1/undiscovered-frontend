import React from 'react';
import {useIntl} from 'react-intl';
import {TextField, Button} from '@mui/material';
import {Box, Stack} from '@mui/joy';
import {useRegister} from '../hooks/useRegister';
import {loginFormStyle} from '../styles/LoginForm.styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles(theme => {
  return {
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      borderRadius: '50%',
      padding: theme.spacing(1),
    },
    lockIcon: {
      color: theme.palette.background.paper,
    },
  };
});

const RegisterForm = props => {
  const {navigation} = props;
  const intl = useIntl();
  const {formValues, setFormValues, onRegister, loading} = useRegister(props);

  const {email, password, name} = formValues || {};
  const isLoginActionDisabled =
    !name?.trim() || !email?.trim() || !password?.trim() || loading;

  const handleChange = e => {
    const {name, value} = e.target;
    setFormValues(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const classes = useStyles();

  return (
    <Stack style={loginFormStyle.container}>
      <Box className={classes.avatar}>
        <LockOutlinedIcon className={classes.lockIcon} />
      </Box>
      <Box>
        {/* <Box style={loginFormStyle.header}>
          {intl.formatMessage({id: 'label.welcome'})}
        </Box> */}

        <TextField
          label="Name"
          name="name"
          variant="outlined"
          onChange={handleChange}
          value={name}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          onChange={handleChange}
          value={email}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          onChange={handleChange}
          fullWidth
          value={password}
          margin="normal"
        />
        <Button
          text={'Register'}
          onClick={() => {
            console.log('>>> formValues', formValues);
            onRegister();
          }}
          disabled={isLoginActionDisabled}
          disabledContainerStyle={{opacity: 0.5}}
          containerStyle={loginFormStyle.button}
          textStyle={loginFormStyle.buttonText}>
          Register
        </Button>
      </Box>
      <Stack gap={4}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{cursor: 'pointer'}}
          onClick={() => {
            navigation.navigate('login');
          }}>
          Login
        </Button>
      </Stack>
    </Stack>
  );
};

export default RegisterForm;
