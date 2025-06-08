import React, { useState, useContext  } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { Button, Divider, Icon  } from '@rneui/themed';
import Svg, {Path} from 'react-native-svg';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
WebBrowser.maybeCompleteAuthSession();

import authStyles from '../styles/authStyles';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginProcessing, setLoginProcessing] = useState(false);

  const { login } = useContext(AuthContext);

  const onLogin = async () => {

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      Alert.alert('Помилка', 'Некоректний формат email');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Помилка', 'Пароль має містити принаймні 6 символів');
      return;
    }
    
    try {
      await login(email, password);
    } catch (err) {
      Alert.alert('Помилка входу', err.message || 'Не вдалося залогінитися');
    }
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.topText}>Ласкаво просимо</Text>
      <Text style={authStyles.bottomText}>
        Увійдіть до свого облікового запису CropVision
      </Text>

      <View style={{ marginBottom: 16}}>
        <Text style={authStyles.inputTitle}>Email</Text>
        <TextInput
          style={authStyles.textInput}
          placeholder="name@example.com"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View>
        <View style={authStyles.passwordHeader}>
          <Text style={authStyles.inputTitle}>Пароль</Text>
        </View>
        <View style={authStyles.passwordContainer}>
          <TextInput
            style={authStyles.textInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          {password.length > 0 && (
            <Icon
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              type="feather"
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              containerStyle={authStyles.eyeIcon}
            />
          )}
        </View>
      </View>

      <Button
        title="Увійти"
        onPress={onLogin}
        loading={loginProcessing}
        loadingProps={{ size: 'small', color: 'white' }}
        buttonStyle={authStyles.loginButton}
      />

      <View style={authStyles.registerContainer}>
        <Text style={authStyles.registerText}>Не маєте облікового запису?</Text>
        <Text
          onPress={() => navigation.navigate('Register')}
          style={authStyles.registerLink}
        >
          Зареєструватися
        </Text>
      </View>
    </View>
  );
}