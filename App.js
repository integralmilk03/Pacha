import React, { useCallback, useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import Tabs from './src/components/NavBar.js';
import FlashMessage from 'react-native-flash-message';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/components/Login.jsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './src/components/Styles/color.js';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setInitialRoute('Tabs');
      }
    };

    checkLoginStatus();
  }, []);

  // Valores para el modo oscuro
  // const scheme = useColorScheme();
  // const MyTheme = scheme === 'light' ? DefaultTheme : DarkTheme;

  const [fontsLoaded, fontError] = useFonts({
    'perolet': require('./assets/Fonts/perolet.ttf'),
    'open-sans': require('./assets/Fonts/openSans.ttf'),
    'open-sans-Bold': require('./assets/Fonts/openSans-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const colorStatusBar = initialRoute == 'Login' ? COLORS.apple300 : COLORS.apple1000;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar backgroundColor={colorStatusBar} barStyle="light-content" />
      {/* theme={MyTheme} */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        </Stack.Navigator>
        <FlashMessage position="bottom" />
      </NavigationContainer>
    </View>
  );
}
