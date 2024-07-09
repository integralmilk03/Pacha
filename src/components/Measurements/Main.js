import React, { useEffect, useState } from 'react';
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
import { expresiones } from '../Expresiones/valuesCaras.js';
import styles, { height } from '../Styles/styles.js';
import { COLORS } from '../Styles/color.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Fondos de pantalla
export let background;
export let colorBackground;
export let pachaBackground;
export let pachaName = '';
export let PachaNickName = '';

// Dimensiones de la pantalla
const defaultPacha = require('../../../img/pachas/pacha_empty.png');

// Constantes para el firebase
const expresionesPacha = {
    '1': 'Alegre',
    '2': 'Triste',
    '3': 'Sedienta',
    '4': 'Calor',
};

export const setBackground = (newBackground) => {
    background = newBackground;
};
export const setColorBackground = (newColorBackground) => {
    colorBackground = newColorBackground;
};
export const setPachaBackground = (newPachaBackground) => {
    pachaBackground = newPachaBackground;
};
export const getPachaName = (newPachaName, newPachaNickName) => {
    pachaName = newPachaName;
    PachaNickName = newPachaNickName;
};
export const setPachaNickName = (newPachaNickName) => {
    PachaNickName = newPachaNickName;
};

const circularProgress = (data, label, color, fillValue) => {
    return (
        <View style={styles.mainScreen.mainView}>
            <AnimatedCircularProgress
                size={height * 0.2}
                width={height * 0.015}
                fill={fillValue}
                tintColor={color}
                backgroundColor={COLORS.mediumGray}>
                {
                    () => (
                        <Text style={styles.mainScreen.dataText}>
                            {data}
                        </Text>
                    )
                }
            </AnimatedCircularProgress>
            <Text style={styles.mainScreen.labelText}>{label}</Text>
        </View>
    )
};

const dataModal = (value, unit, label, description) => {
    return (
        <View style={styles.mainScreen.maceta}>
            <Text style={styles.mainScreen.dataTextModal}>{value}{unit}</Text>
            <Text style={styles.mainScreen.title}>{label}</Text>
            <Text style={styles.mainScreen.descriptionDataTextModal}>{description}</Text>
        </View>
    );
};

const Sensor = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [expresionImage, setExpresionImage] = useState(null);
    // Sensores
    const [temperatureExt, setTemperatureExt] = useState(0);
    const [humidityInt, setHumidityInt] = useState(0); //Capacitivo
    const [humidityExt, setHumidityExt] = useState(0);
    const [luz, setLuz] = useState(0);
    const [luzUV, setLuzUV] = useState(0);
    const [nivel, setNivel] = useState(0);

    // const [actExpresion, SetActExpresion] = useState(0);
    // const toggleExpresion = (newExpresion) => {
    //     SetActExpresion(newExpresion);
    // }


    //Función para obtener los datos de la base de datos
    const fetchData = async () => {

        try {
            // Obtener usuario y contraseña desde AsyncStorage

            const preuser = await AsyncStorage.getItem('userToken');
            //console.log(preuser);

            if (preuser) {
                const preuserData = JSON.parse(preuser);
                const { usuario, password } = preuserData;

                // Aquí puedes usar usuario y password como necesites
                //console.log('Usuario:', usuario);
                //console.log('Password:', password);

                const response = await axios.get('https://django-render-kmzl.onrender.com/users/usuario/');
                const userData = response.data;

                const user = userData.find(u => u.usuario === usuario && u.password === password);

                if (user) {
                    // toggleExpresion(1);

                    console.log('User found:', user);
                    setNivel(parseFloat(user.nivel));
                    setHumidityInt(parseFloat(user.humInt));
                    setLuzUV(parseFloat(user.luzUV));
                    setTemperatureExt(parseFloat(user.tempExt));
                    setHumidityExt(parseFloat(user.humExt));
                    setLuz(parseFloat(user.luz));

                    // Verificación de los datos obtenidos
                    console.log('Nivel:', user.nivel);
                    console.log('Humedad Interna:', user.humInt);
                    console.log('Luz UV:', user.luzUV);
                    console.log('Temperatura:', user.tempExt);
                    console.log('Húmedad Externa:', user.humExt);
                    console.log('Luz General:', user.luz);
                } else {
                    console.log('User not found');
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Fetch data initially
        fetchData();
        //SetActExpresion(1);

        // Fetch data every 30 seconds
        const interval = setInterval(fetchData, 30000);

        // Logica para la image facePot
        const delay = setTimeout(() => {
            setExpresionImage(expresionImageSource);
        }, 200);

        return () => {
            clearInterval(interval);
            clearTimeout(delay);
        };
    }, []);

    // Obtener la imagen de fondo
    const labelToFind = expresionesPacha[1]; //firebaseExpression
    const expresion = expresiones.find(expresion => expresion.label === labelToFind);
    const expresionImageSource = expresion ? expresion.imageSource : null;

    // const interpolate = (value, minValue, maxValue) => {
    //     const range = maxValue - minValue;
    //     const newValue = Math.round(100 - ((value - minValue) * 100) / range);
    //     return Math.max(0, Math.min(100, newValue));
    // };

    return (
        <ScrollView style={{ flex: 1 }}>

            <View style={[styles.mainScreen.viewPot, { backgroundColor: colorBackground ? colorBackground : COLORS.lightGray }]}>
                <Image source={pachaBackground ? pachaBackground : defaultPacha} style={styles.mainScreen.imagePot} />
                {expresionImage && (
                    <Image source={expresionImage} style={styles.mainScreen.facePot} />
                )}
                {/* Credencial de identificación */}

                {pachaBackground && <View style={styles.mainScreen.credentialView}>
                    <Text style={styles.mainScreen.credentialName}>{pachaName}</Text>
                    <Text style={styles.mainScreen.credentialLabel}>{PachaNickName}</Text>
                </View>}

            </View>

            <ImageBackground source={background ? background : null} style={styles.mainScreen.imageBackground}>
                {circularProgress(`${nivel} %`, 'Nivel de Agua', COLORS.water, nivel)}
                {circularProgress(`${humidityInt} %`, 'Humedad', COLORS.humidity, humidityInt)}
                {circularProgress(`${luzUV} %`, 'Ultra Violeta', COLORS.uvLight, luzUV)}

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
                            <ScrollView>
                                {dataModal(temperatureExt, 'ºC', 'Temperatura ambiental', 'Esta medida es la temperatura de donde se encuentra tu Pacha.')}
                                {dataModal(humidityExt, '%', 'Humedad Relativa', 'Esta medida es la humedad externa de donde se encuentra tu Pacha.')}
                                {dataModal(humidityInt, '%', 'Humedad de la maceta', 'Esta medida es la humedad que tiene la tierra de tu Pacha. Los rangos son los siguientes: .')}
                                {dataModal(luz, '%', 'Luz General', 'El sensor detecta la luz del ambiente, artificial o natural. Los rangos son los siguientes: ')}
                                {dataModal(luzUV, '%', 'Luz UV', 'El sensor detecta lo rayos UV del sol en uW/cm2. Pacha toma este valor y lo transforma en los siguientes rangos:\n0-20% Bajo \n30-50% Medio \n60-70% Alto\n80-100% Muy Alto')}
                                {dataModal(nivel, '%', 'Nivel de agua', 'Esta medida representa el porcentaje de agua en el tanque.')}
                            </ScrollView>
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
    )
};

export default Sensor