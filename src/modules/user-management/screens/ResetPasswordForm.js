import React from 'react';
import {Button} from '@unthinkable/react-button';
import {View, Text, TextInput} from '@unthinkable/react-core-components';
import {loginFormStyle} from '../styles/LoginForm.styles';

import useResetForm from '../hooks/useResetPassword';

const ResetPassword = props => {
  const {route, navigation} = props || {};
  const {email} = route?.params || {};

  const {formValues, setFormValues, onReset, isProcessing} = useResetForm({
    initialState: {email},
    navigation,
  });
  const {OTP, newPassword, confirmNewPassword} = formValues || {};
  const isLoginActionDisabled =
    !OTP?.trim() ||
    !newPassword?.trim() ||
    !confirmNewPassword?.trim() ||
    confirmNewPassword !== newPassword ||
    isProcessing;
  return (
    <View style={loginFormStyle.container}>
      <View>
        <Text style={loginFormStyle.header}>Enter OTP, and new Password</Text>
        <TextInput
          style={loginFormStyle.input}
          placeholder={'Your OTP here.'}
          onChangeText={value => {
            setFormValues(v => {
              v.OTP = value;
              return {...v};
            });
          }}
          value={OTP}
        />
        <TextInput
          type="password"
          placeholder="Password"
          style={loginFormStyle.input}
          onChangeText={value => {
            setFormValues(v => {
              v.newPassword = value;
              return {...v};
            });
          }}
          secureTextEntry={true}
          value={newPassword}
        />
        <TextInput
          type="password"
          placeholder="Confirm Password"
          style={loginFormStyle.input}
          onChangeText={value => {
            setFormValues(v => {
              v.confirmNewPassword = value;
              return {...v};
            });
          }}
          secureTextEntry={true}
          value={confirmNewPassword}
        />
        <Button
          text={'Reset password'}
          onPress={() => {
            onReset();
          }}
          disabled={isLoginActionDisabled}
          disabledContainerStyle={{opacity: 0.5}}
          containerStyle={loginFormStyle.button}
          textStyle={loginFormStyle.buttonText}
        />
      </View>
    </View>
  );
};

export default ResetPassword;
