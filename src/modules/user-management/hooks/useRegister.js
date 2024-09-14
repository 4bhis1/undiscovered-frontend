import {useState} from 'react';
import {useAuth} from './useAuth';

export const useRegister = ({initialState = {}, ...props}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const {register} = useAuth();

  const onRegister = async () => {
    setLoading(true);
    let result = await register(formValues);
    if (result) {
      props.navigation.navigate('login');
    } else {
      setLoading(false);
    }
  };
  return {
    formValues,
    setFormValues,
    onRegister,
    isProcessing: loading,
  };
};
