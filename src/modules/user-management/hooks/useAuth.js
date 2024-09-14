import {useContext} from 'react';
import {AuthContext} from '../../../context/auth/AuthContext';
import {UserService} from '../../../services';

export const useAuth = () => {
  const {state, setAuth, clearAuth} = useContext(AuthContext);

  const showError = error => {
    console.log(error);
  };

  const login = async credentials => {
    try {
      const user = await UserService.login(credentials);
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
