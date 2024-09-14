import React from 'react';
import {Button} from '@unthinkable/react-button';
import {View, Text, TextInput} from '@unthinkable/react-core-components';
import useChangePasswordForm from '../hooks/useChangePassword';
import {loginFormStyle} from '../styles/LoginForm.styles';

const ChangePassword = props => {
  const {navigation} = props || {};
  const {formValues, setFormValues, onChangePassword, isProcessing} =
    useChangePasswordForm({initialState: {}, navigation});
  const {oldPassword, newPassword, confirmNewPassword} = formValues || {};
  const isChangePasswordDisabled =
    !oldPassword?.trim() ||
    !newPassword?.trim() ||
    newPassword !== confirmNewPassword ||
    isProcessing;
  return (
    <View style={loginFormStyle.container}>
      <View>
        <Text style={loginFormStyle.header}>Change Password</Text>
        <TextInput
          value={oldPassword}
          type="password"
          style={loginFormStyle.input}
          placeholder={'Old Password'}
          onChangeText={value => {
            setFormValues(v => {
              v.oldPassword = value;
              return {...v};
            });
          }}
        />
        <TextInput
          value={newPassword}
          type="password"
          secureTextEntry={true}
          style={loginFormStyle.input}
          placeholder={'New Password'}
          onChangeText={value => {
            setFormValues(v => {
              v.newPassword = value;
              return {...v};
            });
          }}
        />
        <TextInput
          value={confirmNewPassword}
          type="password"
          secureTextEntry={true}
          style={loginFormStyle.input}
          placeholder={'Confirm New Password'}
          onChangeText={value => {
            setFormValues(v => {
              v.confirmNewPassword = value;
              return {...v};
            });
          }}
        />
        <Button
          text={'Submit'}
          onPress={() => {
            onChangePassword();
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

export default ChangePassword;
