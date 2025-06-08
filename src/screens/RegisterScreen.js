import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Button, Divider, Icon } from '@rneui/themed';
import Svg, { Path } from 'react-native-svg';
import { AuthContext } from '../contexts/AuthContext';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
WebBrowser.maybeCompleteAuthSession();

import authStyles from '../styles/authStyles';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register } = useContext(AuthContext);

  const onRegister = async () => {
    if (!name.trim() || name.length < 4 || /\d/.test(name)) {
      Alert.alert('Помилка', 'Введіть повне ім’я (мінімум 4 літери)');
      return;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      Alert.alert('Помилка', 'Некоректний формат email');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Помилка', 'Пароль має містити принаймні 6 символів');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Помилка', 'Паролі не співпадають');
      return;
    }
    try {
      await register(name.trim(), email.trim(), password);
    } catch (err) {
      Alert.alert('Помилка реєстрації', err.message || 'Не вдалося зареєструватися');
    }
  };


  return (
    <View style={authStyles.container}>
      <Text style={authStyles.topText}>Створити акаунт</Text>
      <Text style={authStyles.bottomText}>
        Реєстрація облікового запису CropVision
      </Text>

      <View style={{ marginBottom: 16 }}>
        <Text style={authStyles.inputTitle}>Ім'я</Text>
        <TextInput
          style={authStyles.textInput}
          placeholder="Ваше ім'я"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={{ marginBottom: 16 }}>
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
            secureTextEntry={true}
          />
        </View>
      </View>

      <View>
        <View style={authStyles.passwordHeader}>
          <Text style={authStyles.inputTitle}>Підтвердити пароль</Text>
        </View>
        <View style={authStyles.passwordContainer}>
          <TextInput
            style={authStyles.textInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
        </View>
      </View>

      <Button
        title="Зареєструватися"
        onPress={onRegister}
        loading={false}
        loadingProps={{ size: 'small', color: 'white' }}
        buttonStyle={authStyles.loginButton}
      />

      <View style={authStyles.registerContainer}>
        <Text style={authStyles.registerText}>Маєте обліковий запис?</Text>
        <Text
          onPress={() => navigation.popToTop()}
          style={authStyles.registerLink}
        >
          Увійти
        </Text>
      </View>
    </View>
  );
}
