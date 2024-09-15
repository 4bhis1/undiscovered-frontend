import React from 'react';
import {useIntl} from 'react-intl';
import {TextField, Button} from '@mui/material';
import {Box, Stack} from '@mui/joy';
import {useRegister} from '../hooks/useRegister';
import {loginFormStyle} from '../styles/LoginForm.styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {makeStyles} from '@mui/styles';
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
          // overflow: 'hidden',
        }}></div>
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '400px',
          margin: 'auto',
          position: 'relative',
          top: '40%',
        }}>
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
          </Box>
          <Stack gap={1}>
            <Button
              variant="contained"
              color="newVariant"
              fullWidth
              style={{cursor: 'pointer'}}
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
      </div>
    </>
  );
};

export default RegisterForm;
