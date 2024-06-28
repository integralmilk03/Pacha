import { Animated, Modal, ImageBackground, View, Image, Text, TouchableOpacity, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import React, {useEffect, useState} from 'react';
import { db, ref, onValue } from "../../firebase.js";
import styles from '../Styles/styles.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { expresiones } from '../Expresiones/valuesCaras.js';
import { COLORS } from '../Styles/color.js';

export let background;
const backgroundDefault = require('../../../assets/Pacha-fondo7.jpeg');
const screenHeight = Dimensions.get("window").height;
const screenwidth = Dimensions.get("window").width;
const fillTemperature = 10;
const fillHumedity = 50;

// Constantes para el firebase
const expresionesFirebase = {
    '1': 'Feliz',
    '2': 'Triste',
    '3': 'Sed',
    '4': 'Calor',
};

export const setBackground = (newBackground) => {
    background = newBackground;
};

const Progress = ({ step, steps, medida, height, color, backcolor, backcolortext, colorborder}) => {
    const [width, setWidth] = React.useState(0);
    const animatedValue = React.useRef(new Animated.Value(-1000)).current;
    const reactive = React.useRef(new Animated.Value(-1000)).current;
    
    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    React.useEffect(() => {
        //reactive.setValue(-width + (width*step) / steps);
        const newValue = -width + (width * step) / steps;
        Animated.timing(reactive, {
            toValue: newValue,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [step, width]);

    return (
        <>
            <View style={{paddingHorizontal: 25}}>
                <Text style={[styles.sensors.progressbarText, {backgroundColor: backcolortext, borderRadius: 20}]}>{medida}:{step}/{steps}</Text>
            </View>
            <View onLayout={(e) => {const newWidth = e.nativeEvent.layout.width;
                setWidth(newWidth);
            }} style={styles.sensors.progressbarContainer}>
                <View style={{height, 
                backgroundColor: backcolor, 
                borderColor: colorborder, 
                borderWidth: 1.5, 
                borderRadius: height, 
                overflow: 'hidden',}}>
                    <Animated.View style={{height, 
                    width: "100%", 
                    borderRadius: height,
                    backgroundColor: color, 
                    position: 'absolute', 
                    left: 0, top: 0,
                    transform: [
                        {
                            translateX: animatedValue,
                        },
                    ],}}/>
                </View>
            </View>
        </>
    );
};

const Sensor = () => {
const [modalVisible, setModalVisible] = useState(false);
  const [temp, setTemp] = useState(80);   
  const [humidity, setHumext] = useState(20);
  const [capacitive, setHumint] = useState(10);
  const [light, setLuz] = useState(50);   
  const [firebaseExpresion, setFirebaseExpresion] = useState(1);

  useEffect(() => {
      const data = ref(db);
      onValue(data, (snapshot) => {
          setTemp(snapshot.val().temp);
          setHumext(snapshot.val().humidity);
          setHumint(snapshot.val().capacitive);
          setLuz(snapshot.val().light);
          setFirebaseExpresion(snapshot.val().firebaseExpresion);
      });
  }, [db]);

  const notification = (firebaseExpresion) => {
    switch (firebaseExpresion) {
        case "1":
          return feliz();
        case "2":
          return triste();
        case "3":
          return sediento();
        case "4":
          return muchoCalor();
        default:
          return null;
      }};

  const labelToFind = expresionesFirebase[1]; //firebaseExpression
  const expresion = expresiones.find(expresion => expresion.label === labelToFind);
  const expresionImageSource = expresion ? expresion.imageSource : null;
  

  //En la sección progress color es la barra de progreso y backcolor es la barra completa de atrás medio transparente
  const interpolateCapacitive = (value) => {
    // Convertir el rango de 0 a 4095 a un rango de 0 a 100
    const newValue = 100 - (value * 100) / 4095;
    return Math.max(0, Math.min(100, newValue)); // Asegurarse de que esté en el rango correcto
  };

    // Función para calcular el paso de la barra de progreso basado en las condiciones dadas
    const calculateStep = (value, conditions) => {
        for (const condition of conditions) {
            if (value <= condition.value) {
                return condition.step;
            }
        }
        return conditions[conditions.length - 1].step; // Valor por defecto
    };

    // Condiciones para la temperatura
    const tempConditions = [
        { value: 10, step: 2 },
        { value: 15, step: 3 },
        { value: 20, step: 5 },
        { value: 22, step: 7 },
        { value: 28, step: 10 }
    ];

    // Condiciones para la humedad
    const humidityConditions = [
        { value: 4000, step: 8 },
        { value: 3500, step: 5 },
        { value: 0, step: 3 }
    ];

    // Condiciones para la capacitiva
    const capacitiveConditions = [
        { value: 4000, step: 3 },
        { value: 3000, step: 8 },
        { value: 0, step: 5 }
    ];

    // Condiciones para la luz
    const lightConditions = [
        { value: 50, step: 2 },
        { value: 52, step: 10 }
    ];

    return(
        <SafeAreaView style={{flex: 1}}>
        <ScrollView>

            {notification(firebaseExpresion)}

            <View style={{width: screenwidth, height: screenHeight * 0.50, alignItems: 'center', justifyContent: 'space-around',}}>
                <Image source={require('../../../assets/pacha_cactus.png')} style={{resizeMode: 'contain',width: screenwidth * 0.55, height: screenHeight * 0.45}}/>
                <Image source={expresionImageSource} style={{position: 'absolute', top: 175, width: 90, height: 90, resizeMode: 'contain'}}/> 
            </View>
            
            <ImageBackground source={background ? background : backgroundDefault} style={{width: screenwidth, height: screenHeight * 0.60, resizeMode: 'strech', marginBottom: 80,}}>
            
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 5,}}>
            <AnimatedCircularProgress
            size={screenHeight * 0.23}
            width={15}
            fill={fillTemperature}
            tintColor={COLORS.tomato}
            backgroundColor="rgba(69, 69, 69, 0.01)">
            {
                () => (
                <Text style={{fontSize: 30, fontFamily: 'perolet', color: COLORS.white}}>
                    {`${fillTemperature} °C`}
                </Text>
                )
            }
            </AnimatedCircularProgress>
            <Text style={{fontSize: 23, fontFamily: 'perolet', color: COLORS.white, paddingHorizontal: 10, }}>Temperatura</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 5, }}>
            <AnimatedCircularProgress
            size={screenHeight * 0.23}
            width={15}
            fill={fillHumedity}
            tintColor={COLORS.water}
            backgroundColor="rgba(69, 69, 69, 0.01)">
            {
                () => (
                <Text style={{fontSize: 30, fontFamily: 'perolet', color: COLORS.white}}>
                    {`${fillHumedity} %`}
                </Text>
                )
            }
            </AnimatedCircularProgress>
            <Text style={{fontSize: 23, fontFamily: 'perolet', color: COLORS.white, paddingHorizontal: 10, }}>Humedad</Text>
            </View>

            <TouchableOpacity
            style={styles.sensors.pressLecturaButton}
            title="Saber Mas"
            onPress={() => setModalVisible(true)}
            >
                <Text style={styles.sensors.pressLecturaButtonText}>Saber Mas</Text>
            </TouchableOpacity>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
            >
                <View style={styles.sensors.containerModal}>
                    <View style={styles.sensors.centeredViewSensors}>
                        <View style={styles.modalView}>
                        <Text style={styles.sensors.LecturaTextTitle}>Datos Técnicos De Tu Planta</Text>
                            <View style={styles.sensors.data}>
                                <View style={styles.sensors.dataSensor}>
                                    <View style={styles.sensors.tempmaceta}>
                                        <Text style={styles.sensors.dataText}>{temp}ºC</Text>
                                        <Text style={styles.sensors.title}>Temperatura Ambiental</Text>
                                    </View>
                                    <View style={styles.sensors.humidmaceta}>
                                        <Text style={styles.sensors.dataText}>{humidity}%</Text>
                                        <Text style={styles.sensors.title}>Humedad Ambiental</Text>
                                    </View>
                                    <View style={styles.sensors.humidmaceta}>
                                        <Text style={styles.sensors.dataText}>{interpolateCapacitive(capacitive)}%</Text>
                                        <Text style={styles.sensors.title}>Humedad De La Maceta</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.sensors.closeButton}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.sensors.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            </ImageBackground>
        
        </ScrollView>
        </SafeAreaView>
        );
}

export default Sensor