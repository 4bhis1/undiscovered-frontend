import {useState} from 'react';
import {UserService} from '../../../services';

const useChangePasswordForm = ({initialState = {}, navigation}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const onChangePassword = async () => {
    setIsProcessing(true);
    // api call and passResponse to setAuthAction
    await UserService.changePassword(formValues);

    setIsProcessing(false);
  };
  return {
    formValues,
    setFormValues,
    onChangePassword,
    isProcessing,
  };
};

export default useChangePasswordForm;
