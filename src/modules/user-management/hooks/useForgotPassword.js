import {useState} from 'react';
import {UserService} from '../../../services';

const useForgotPasswordForm = ({initialState = {}, navigation}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const onForgotPassword = async () => {
    setIsProcessing(true);
    // api call and passResponse to setAuthAction
    const data = await UserService.forgotPassword(formValues);
    if (data?.success) {
      navigation.navigate('reset-password', {email: formValues.email});
    }

    setIsProcessing(false);
  };
  return {
    formValues,
    setFormValues,
    onForgotPassword,
    isProcessing,
  };
};

export default useForgotPasswordForm;
