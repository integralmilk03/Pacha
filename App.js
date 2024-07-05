import { useCallback } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useColorScheme} from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import Tabs from './src/components/NavBar.js';
import FlashMessage from 'react-native-flash-message';

SplashScreen.preventAutoHideAsync();


export default function App() {

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

  return (
    <View style={{flex: 1}} onLayout={onLayoutRootView}>
      {/* theme={MyTheme} */}
      <NavigationContainer>
        <Tabs/>
        <FlashMessage position="bottom" />
      </NavigationContainer>
    </View>
  );
}
