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

  const scheme = useColorScheme();
  const MyTheme = scheme === 'light' ? DefaultTheme : DarkTheme;

  const [fontsLoaded, fontError] = useFonts({
    'perolet': require('./assets/Fonts/perolet.ttf'),
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
      <NavigationContainer theme={MyTheme}>
        <Tabs/>
        <FlashMessage position="center" />
      </NavigationContainer>
    </View>
  );
}
