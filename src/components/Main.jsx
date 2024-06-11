import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './NavBar.js';
import FlashMessage from 'react-native-flash-message';

const Main = () => {
  return (
    <NavigationContainer>
      <Tabs/>
      <FlashMessage position="center" />
    </NavigationContainer>
  )
}

export default Main
