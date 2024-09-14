import {useState} from 'react';
import {UserService} from '../../../services';

const useResetForm = ({initialState = {}, navigation}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const onReset = async () => {
    setIsProcessing(true);
    // api call and passResponse to setAuthAction
    const user = await UserService.resetPassword(formValues);
    if (user.success) {
      navigation.navigate('login');
    }
    setIsProcessing(false);
  };
  return {
    formValues,
    setFormValues,
    onReset,
    isProcessing,
  };
};

export default useResetForm;
