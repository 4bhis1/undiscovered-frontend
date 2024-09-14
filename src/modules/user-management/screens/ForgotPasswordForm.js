import React from 'react';
import {Button} from '@unthinkable/react-button';
import {View, Text, TextInput} from '@unthinkable/react-core-components';
import useForgotPasswordForm from '../hooks/useForgotPassword';
import {loginFormStyle} from '../styles/LoginForm.styles';

const ForgotPassword = props => {
  const {navigation} = props || {};
  const {formValues, setFormValues, onForgotPassword, isProcessing} =
    useForgotPasswordForm({initialState: {}, navigation});
  const {email} = formValues || {};
  const isChangePasswordDisabled = !email?.trim() || isProcessing;
  return (
    <View style={loginFormStyle.container}>
      <View>
        <Text style={loginFormStyle.header}>Forgot Password</Text>
        <TextInput
          value={email}
          style={loginFormStyle.input}
          placeholder={'User email'}
          onChangeText={value => {
            setFormValues(v => {
              v.email = value;
              return {...v};
            });
          }}
        />
        <Button
          text={'Submit'}
          onPress={() => {
            onForgotPassword();
          }}
          disabled={isChangePasswordDisabled}
          disabledContainerStyle={{opacity: 0.5}}
          containerStyle={loginFormStyle.button}
          textStyle={loginFormStyle.buttonText}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
