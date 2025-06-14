import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

export const AuthContext = createContext();
WebBrowser.maybeCompleteAuthSession();

export function AuthProvider({ children }) {
  
  const [authToken, setAuthToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '1079403956058-31eumotq3p6134co7bu72d4gr1sf9tj7.apps.googleusercontent.com',
    iosClientId: '1079403956058-m2pnb7bfedvjs9diheuvnjgda05iaotg.apps.googleusercontent.com',
  });

  useEffect(() => {
    AsyncStorage.getItem('auth').then(storedData => {
      if (storedData) {
        const { token, user } = JSON.parse(storedData);
        setAuthToken(token);
        setUserInfo(user);
      }
      setCheckingAuth(false);
    });
  }, []);

  const login = async (email, password) => {
    const res = await fetch('https://cropvisionapi.onrender.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      throw new Error('Невірний email або пароль');
    }
    const { access_token, token_type, user } = await res.json();
    const { full_name, email: userEmail } = user;
    const authData = {
      token: access_token,
      token_type,
      user: { name: full_name, email: userEmail }
    };
    await AsyncStorage.setItem('auth', JSON.stringify(authData));

    setAuthToken(access_token);
    setUserInfo({ name: full_name, email: userEmail });
  };

  const register = async (name, email, password) => {
    const res = await fetch('https://cropvisionapi.onrender.com/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: name, email, password })
    });
    if (!res.ok) {
      const errTxt = await res.text();
      throw new Error(errTxt || 'Помилка реєстрації');
    }
    const { access_token, token_type } = await res.json();
    const authData = { token: access_token, token_type, user: { name: name, email } };
    await AsyncStorage.setItem('auth', JSON.stringify(authData));
    setAuthToken(access_token);
    setUserInfo({ name, email });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('auth');
    setAuthToken(null);
    setUserInfo(null);
  };

  const deleteAccount = async () => {
    const res = await fetch(`https://cropvisionapi.onrender.com/auth/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!res.ok) {
      throw new Error('Не вдалося видалити акаунт');
    }

    await AsyncStorage.removeItem('auth');
    setAuthToken(null);
    setUserInfo(null);
  };

  const value = { authToken, userInfo, checkingAuth, login, register, logout, deleteAccount };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
