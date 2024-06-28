import {
    Modal,
    ImageBackground,
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import React, {useEffect, useState} from 'react';

import { expresiones } from '../Expresiones/valuesCaras.js';
import { db, ref, onValue } from "../../firebase.js";

import styles, { height, width } from '../Styles/styles.js';
import { COLORS } from '../Styles/color.js';

// Fondos de pantalla
export let background;
const backgroundDefault = require('../../../assets/Pacha-fondo7.jpeg');
// Dimensiones de la pantalla
const potHeight = height * 0.5; 
const potWidth = width * 0.4;

// Valores de temperatura ** DEBEN SER LEIDOS DESDE LA FIREBASE
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

const Sensor = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [firebaseExpresion, setFirebaseExpresion] = useState(1);
    // PAGINA PRINCIPAL
    const [temperatureExt, setTemperatureExt] = useState(80);   
    const [humidityInt, sethumidityInt] = useState(10); //Capacitivo
    // PAGINA MODAL
    const [humidityExt, setHumidityExt] = useState(20);
    const [light, setLuz] = useState(50);

    useEffect(() => {
        const data = ref(db);
        onValue(data, (snapshot) => {
            setTemperatureExt(snapshot.val().temperatureExt);
            setHumidityExt(snapshot.val().humidityExt);
            sethumidityInt(snapshot.val().humidityInt);
            setLuz(snapshot.val().light);
            setFirebaseExpresion(snapshot.val().firebaseExpresion);
        });
    }, [db]);

    // Obtener la imagen de fondo
    const labelToFind = expresionesFirebase[1]; //firebaseExpression
    const expresion = expresiones.find(expresion => expresion.label === labelToFind);
    const expresionImageSource = expresion ? expresion.imageSource : null;
    
    const interpolate = (value, minValue, maxValue) => {
        const range = maxValue - minValue;
        const newValue = Math.round(100 - ((value - minValue) * 100) / range);
        return Math.max(0, Math.min(100, newValue));
    };

    return(
    <ScrollView style={{flex: 1}}>

    <View style={styles.mainScreen.viewPot}>
        <Image source={require('../../../assets/pacha_cactus.png')} style={styles.mainScreen.imagePot}/>
        <Image source={expresionImageSource} style={styles.mainScreen.facePot}/> 
    </View>
        
    <ImageBackground source={background ? background : backgroundDefault} style={styles.mainScreen.imageBackground}>   
        <View style={styles.mainScreen.mainView}>
        <AnimatedCircularProgress
        size={height * 0.25}
        width={height * 0.02}
        fill={fillTemperature}
        tintColor={COLORS.lemon}
        backgroundColor="rgba(69, 69, 69, 0.5)">
        {
            () => (
            <Text style={styles.mainScreen.dataText}>
                {`${fillTemperature} %`}
            </Text>
            )
        }
        </AnimatedCircularProgress>
        <Text style={styles.mainScreen.labelText}>Nivel Agua</Text>
        </View>

        <View style={styles.mainScreen.mainView}>
        <AnimatedCircularProgress
        size={height * 0.25}
        width={height * 0.02}
        fill={fillHumedity}
        tintColor={COLORS.lemon}
        backgroundColor="rgba(69, 69, 69, 0.5)">
        {
            () => (
            <Text style={styles.mainScreen.dataText}>
                {`${fillHumedity} %`}
            </Text>
            )
        }
        </AnimatedCircularProgress>
        <Text style={styles.mainScreen.labelText}>Humedad</Text>
        </View>

        <TouchableOpacity
        style={styles.mainScreen.pressLecturaButton}
        title="Saber Mas"
        onPress={() => setModalVisible(true)}
        >
            <Text style={styles.mainScreen.pressLecturaButtonText}>Saber Mas</Text>
        </TouchableOpacity>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.mainScreen.containerModal}>
            <Text style={styles.mainScreen.LecturaTextTitle}>Datos Técnicos De Tu Planta</Text>
            <View style={styles.mainScreen.dataSensor}>
                <View style={styles.mainScreen.maceta}>
                    <Text style={styles.mainScreen.dataTextModal}>{temperatureExt}ºC</Text>
                    <Text style={styles.mainScreen.title}>Temperatura Ambiental</Text>
                </View>
                <View style={styles.mainScreen.maceta}>
                    <Text style={styles.mainScreen.dataTextModal}>{humidityExt}%</Text>
                    <Text style={styles.mainScreen.title}>Humedad Ambiental</Text>
                </View>
                <View style={styles.mainScreen.maceta}>
                    <Text style={styles.mainScreen.dataTextModal}>{interpolate(2047, 0, 4095)}%</Text>
                    <Text style={styles.mainScreen.title}>Humedad De La Maceta</Text>
                </View>

                <TouchableOpacity
                style={styles.mainScreen.closeButton}
                onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.mainScreen.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
        </Modal>
    </ImageBackground>
            
    </ScrollView>
)};

export default Sensor