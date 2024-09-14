import React, {useEffect, useReducer} from 'react';
import {UserService} from '../../services';
import {
  AuthContext,
  CLEAR_AUTH,
  SET_AUTH,
  SET_LOADING,
  authReducer,
  initialState,
} from './AuthContext';

export const AuthProvider = props => {
  const {children} = props || {};
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setAuth = payload => {
    dispatch({type: SET_AUTH, payload});
  };

  const clearAuth = () => {
    dispatch({type: CLEAR_AUTH});
  };

  const setLoading = isLoading => {
    dispatch({type: SET_LOADING, payload: isLoading});
  };

  // Effect to run once on component mount
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const user = await UserService.verifyToken();
        if (user) {
          setAuth({user});
        } else {
          clearAuth();
        }
      } catch (error) {
        // Handle error (e.g., token might be invalid or expired)
        clearAuth();
      }
    };
    loadAuthState();
  }, []);

  // The value provided to the context consumers
  const authContextValue = {
    state,
    dispatch,
    setAuth,
    clearAuth,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
