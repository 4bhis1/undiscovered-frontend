import {useState} from 'react';
import {useAuth} from './useAuth';

export const useLogin = ({initialState = {}} = {}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();
  const onLogin = async () => {
    setLoading(true);
    await login(formValues);
    setLoading(false);
  };
  return {
    formValues,
    setFormValues,
    onLogin,
    isProcessing: loading,
  };
};
