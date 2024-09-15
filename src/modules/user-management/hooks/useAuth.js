import {useContext} from 'react';
import {AuthContext} from '../../../context/auth/AuthContext';
import {UserService} from '../../../services';
import HttpAuth from '../../../services/HttpAuthService';
import {toast} from 'react-toastify';

export const useAuth = () => {
  const {state, setAuth, clearAuth} = useContext(AuthContext);

  const showError = error => {
    toast(error?.response?.data?.message || 'Something went wrong', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: 'error',
    });
  };

  const login = async credentials => {
    try {
      const {user, tokens} = await UserService.login(credentials);
      localStorage.setItem('access_token', JSON.stringify(tokens.access));
      localStorage.setItem('refresh_token', JSON.stringify(tokens.refresh));
      HttpAuth.access_token = tokens.access;
      HttpAuth.refresh_token = tokens.refresh;
      setAuth({user});
    } catch (error) {
      showError(error);
    }
  };

  const register = async credentials => {
    try {
      const user = await UserService.register(credentials);
      return user;
    } catch (error) {
      showError(error);
    }
  };

  const logout = async () => {
    try {
      await UserService.logout();
      clearAuth();
    } catch (error) {
      showError(error);
    }
  };

  return {
    ...state,
    login,
    logout,
    register,
  };
};
