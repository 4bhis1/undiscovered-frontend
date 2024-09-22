import {useState} from 'react';
import {useAuth} from './useAuth';
import {showError, successMessage} from '../../../hooks/showError';

export const useRegister = ({initialState = {}, ...props}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const {register} = useAuth();

  const onRegister = async () => {
    try {
      setLoading(true);
      let result = await register(formValues);
      if (result) {
        successMessage('Registered Successfully!!!');
        props.navigation.navigate('login');
      } else {
        setLoading(false);
      }
    } catch (err) {
      showError(err);
    }
  };
  return {
    formValues,
    setFormValues,
    onRegister,
    isProcessing: loading,
  };
};
