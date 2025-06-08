import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { AuthProvider, AuthContext } from './src/contexts/AuthContext';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import ResultScreen from './src/screens/ResultScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home"
    screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#4CAE4F',
        headerShadowVisible: false,
        headerStyle:{
          borderBottomWidth: 0,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Home') {
            iconName = 'leaf';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: 'Аналіз', tabBarActiveTintColor: '#4CAE4F' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профіль', tabBarActiveTintColor: '#4CAE4F' }} />
    </Tab.Navigator>
  );
}

function Navigation() {
  const { authToken, checkingAuth } = useContext(AuthContext);

  if (checkingAuth) {
    return null;
  }

  return (
    <NavigationContainer>
      {authToken ? <MainTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
