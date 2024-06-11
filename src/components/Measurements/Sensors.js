import { Animated, Modal, ImageBackground, View, Image, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React, {useEffect, useState} from 'react';
import { db, ref, onValue } from "../../firebase.js";
import styles from '../Styles/styles.js';
import { expresiones } from '../Expresiones/valuesCaras.js';
import { showMessage } from "react-native-flash-message";

export let background;
const backgroundDefault = require('../../../assets/Pacha-fondo7.jpeg');

export const setBackground = (newBackground) => {
    background = newBackground;
};

const screenHeight = Dimensions.get("window").height;
const screenwidth = Dimensions.get("window").width;

const pachaHeigth = screenHeight * 0.25;
const pachaWidth = screenwidth * 0.55;


// Constantes para el firebase

const expresionesFirebase = {
    '1': 'Feliz',
    '2': 'Triste',
    '3': 'Sed',
    '4': 'Calor',
};

const feliz = () => {showMessage({
    message: "Holi UwU",
    description: "Tus cuidados son excelentes gracias",
    type: "success",
    animationDuration: 325,})};

const triste = () => {showMessage({
    message: "Triste",
    description: "No estoy recibiendo los mejores cuidados",
    type: "danger",
    animationDuration: 325,})};

const sediento = () => {showMessage({
        message: "Dame agua",
        description: "Por favor dame un poco de agua que me muero de sed",
        type: "danger",
        animationDuration: 325,})};

const muchoCalor = () => {showMessage({
            message: "Llevame a la sombra",
            description: "Por favor el sol esta demasiado fuerte",
            type: "warning",
            animationDuration: 325,})};
  
const muchaAgua = () => {showMessage({
    message: "Demasiada Agua",
    description: "Me estoy ahogando",
    type: "warning",
    animationDuration: 325,})};

  const frio = () => {showMessage({
    message: "Tengo frio",
    description: "Prende la calefacción para que pueda calentarme",
    type: "warning",
    animationDuration: 325,})};
  
  const muyOscuro = () => {showMessage({
    message: "Hola hay alguien ahi?",
    description: "No puedo ver nada",
    type: "warning",
    animationDuration: 325,})};
    

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
  //Humedad y temp exterio
  //humedad interior
  //Luz
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

  const labelToFind = expresionesFirebase[firebaseExpresion];
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
        <ImageBackground source={background ? background : backgroundDefault} 
        style={styles.sensors.image}>
        <View style={{backgroundColor: background ? "rgba(164, 230, 142, 0.20)":"rgba(164, 230, 142, 0.40)", paddingBottom: 100, paddingTop: 25,}}>
            
            {notification(firebaseExpresion)}

            <View style={{ height: screenHeight * 0.37, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{ borderWidth: 5, borderRadius: 15, paddingHorizontal: 10, paddingTop: 10, backgroundColor: 'white'}}>
                    <Image source={expresionImageSource} style={{resizeMode: 'contain', height: 200, width: 215}}/>
                    <Text style={{fontSize: 22, textAlign: 'center', marginBottom: 15}}>Pacha</Text>    
                </View>
            </View>
            
            <Progress step={calculateStep(capacitive, capacitiveConditions)} steps={10} medida={"Húmedad de tu Planta"} height={20} color={'rgba(135, 206, 235, 1)'} backcolor={'rgba(135, 206, 235, 0.1)'} backcolortext={'rgba(135, 206, 235, 0.25)'} colorborder={'rgba(0,0,0,1)'} /> 
            <Progress step={calculateStep(temp, tempConditions)} steps={10} medida={"Temperatura de tu Casa"} height={20} color={'rgba(255, 69, 0, 1)'} backcolor={'rgba(255, 69, 0, 0.1)'} backcolortext={'rgba(255, 69, 0, 0.25)'} colorborder={'rgba(0,0,0,1)'}/> 
            <Progress step={calculateStep(humidity, humidityConditions)} steps={10} medida={"Húmedad de tu Casa"} height={20} color={'rgba(0, 128, 128, 1)'} backcolor={'rgba(0, 128, 128, 0.1)'} backcolortext={'rgba(0, 128, 128, 0.25)'} colorborder={'rgba(0,0,0,1)'}/> 
            <Progress step={calculateStep(light, lightConditions)} steps={10} medida={"Iluminación de tu Planta"} height={20} color={'rgba(255, 255, 0, 1) '} backcolor={'rgba(255, 255, 0, 0.1) '} backcolortext={'rgba(255, 255, 0, 0.25) '} colorborder={'rgba(0,0,0,1)'}/> 
        
            <TouchableOpacity
            style={styles.sensors.pressLecturaButton}
            title="Conoce los Datos de tu Planta :)"
            onPress={() => setModalVisible(true)}
            >
                <Text style={styles.sensors.pressLecturaButtonText}>Conoce los Datos de tu Planta :D</Text>
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
                        <Text style={styles.sensors.LecturaTextTitle}>Estos Son Los Datos Técnicos De Tu Planta :D</Text>
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
        </View>
        </ImageBackground>
        
        );
}

export default Sensor