import React, { useState } from 'react';
import { Text, View, Switch, useColorScheme } from 'react-native';
import styles from '../Styles/styles';
import { showMessage } from "react-native-flash-message";
import { useTheme } from "@react-navigation/native";
import { COLORS } from '../Styles/color';

const Conexion = () => {
  const { colors } = useTheme();

  const [isManual, setIsManual] = useState(false);

  return (
  <View style={[styles.switch.container, {backgroundColor: colors.card}]}>
        
    <Text style={[styles.switch.text, {color: COLORS.dun}]}>Modo manual</Text>
    <Switch 
    value={isManual}
    onValueChange={ 
    isManual ? 
    (() => {
      setIsManual((previousState) => !previousState)
      console.log('Modo automatico')
      showMessage({
        message: "Modo Automatico",
        description: "Activado sistema de riego automatico",
        type: "success",
        animationDuration: 325,
      });
    }):
    (() => {
      setIsManual((previousState) => !previousState)
      console.log("Modo Manual")
      showMessage({
        message: "Modo manual",
        description: "Advertencia. El riego ya no sera automatico",
        type: "warning",
        animationDuration: 325})
    })
    }
    trackColor={{true: 'green', false: 'lightgreen'}}
    thumbColor={'grey'}/>
    
    <Text style={[styles.switch.text, {color: COLORS.dun}]}>Modo oscuro</Text>
    {/* <Switch 
    value={MyTheme}
    onValueChange={DarkTheme}
    trackColor={{true: 'green', false: 'lightgreen'}}
    thumbColor={'grey'}
    /> */}

  </View>
)}

export default Conexion