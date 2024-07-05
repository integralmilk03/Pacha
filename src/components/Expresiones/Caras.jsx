import React, {useRef, useState, useEffect} from "react";
import { View, Text, Image, Pressable, ScrollView, Dimensions, FlatList, Button } from "react-native";
import { showMessage } from "react-native-flash-message";
import styles from "../Styles/styles.js";
import { expresiones } from "./valuesCaras.js";

const { width, height } = Dimensions.get('window');

const expresionesFirebase = {
    '1': 'Alegre',
    '2': 'Triste',
    '3': 'Sedienta',
    '4': 'Calor',
};

const Caras = () => {
  const [expresionImage, setExpresionImage] = useState(null);
  const [visible, setVisible] = useState(false);

  const [selectedExpresion, setSelectedExpresion] = useState(null);

  const handleShowImage = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };
    
  const carasImage = (expresion) => {
    return (
      <View key={expresion.label} style={styles.caras.expressionContainer}>
        <Pressable onPress={() => {
            setExpresionImage(expresion.gifSource);
            handleShowImage();
            showMessage({
                message: "Expresion Pacha",
                description: expresion.description,
                type: "success",
                animationDuration: 1500,
            });
        }}
        style={[styles.caras.expressionButton, styles.caras.expressionButtonShadow]}>
          <Image source={expresion.imageSource} style={styles.caras.expression} />
        </Pressable>

        <Text style={styles.caras.expressionText}>{expresion.label}</Text>
      </View>
  )};

  return (
  <View style={styles.caras.container}>    
    <ScrollView>
      
      <View style={styles.caras.viewFlatList}>
        <FlatList
        data={expresiones}
        renderItem={({ item }) => carasImage(item)}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        />
      </View>

      <View style={styles.caras.viewPotExpression}>
        <Image
        source={require('../../../img/pachas/pacha_empty.png')}
        style={styles.caras.pot}
        />

        {visible && (
        <Image source={expresionImage ? expresionImage : null} style={[styles.caras.facePot]}/>
        )} 
      </View>
     
    </ScrollView>
  </View>
)};

export default Caras;
