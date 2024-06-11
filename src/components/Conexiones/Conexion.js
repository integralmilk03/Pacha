import React, { useState } from 'react';
import { Text, View, Switch, Alert } from 'react-native';
import styles from '../Styles/styles';
import { showMessage } from "react-native-flash-message";

const Conexion = () => {
  const [isManual, setIsManual] = useState(false);

  return (
    <View style={{padding: 10}}>
      <View style={styles.switch.container}>
        
        <Text style={styles.switch.text}>Modo manual</Text>
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
      </View>
    </View>
  )
}

export default Conexion