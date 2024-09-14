import React, {useContext} from 'react';
import {TextField, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Box, Stack} from '@mui/joy';
import {useLogin} from '../hooks/useLogin';
import {GoogleLogin} from '@react-oauth/google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HttpAuth from '../../../services/HttpAuthService';
import {AuthContext} from '../../../context/auth/AuthContext';
import backgroundImage from '../../../assets/loginImage.jpg';

const useStyles = makeStyles(theme => {
  return {
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      alignItems: 'center',
      gap: 8,
    },
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

const Login = props => {
  const {navigation = {}} = props || {};
  // const intl = useIntl();
  const {formValues, setFormValues, onLogin, loading} = useLogin();
  const {email, password} = formValues;
  const handleChange = e => {
    const {name, value} = e.target;
    setFormValues(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const classes = useStyles();
  const isLoginActionDisabled = !email?.trim() || !password?.trim() || loading;
  const {setAuth} = useContext(AuthContext);
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
        }}></div>
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '400px',
          margin: 'auto',
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
        }}>
        <Stack className={classes.container}>
          <Box className={classes.avatar}>
            <LockOutlinedIcon className={classes.lockIcon} />
          </Box>
          <Box>Login</Box>
          <Box>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
          <Stack gap={1}>
            <Button
              onClick={onLogin}
              disabled={isLoginActionDisabled}
              loading={loading}
              type="submit"
              variant="contained"
              color="primary">
              Login
            </Button>
            <Button
              variant="contained"
              color="newVariant"
              onClick={() => {
                navigation.navigate('register');
              }}>
              Register Now
            </Button>
            {/* <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigation.navigate('forgot-password');
          }}>
          Forgot Password
        </Button> */}
            <GoogleLogin
              onSuccess={async credentialResponse => {
                const {user} = await HttpAuth.post('/v1/auth/google-login', {
                  idToken: credentialResponse.credential,
                });
                setAuth({user: user});
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default Login;
