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
import Icon from 'react-native-vector-icons/FontAwesome';
import { expresiones } from '../Expresiones/valuesCaras.js';
import { db, ref, onValue } from "../../firebase.js";
import styles, { height, width } from '../Styles/styles.js';
import { COLORS } from '../Styles/color.js';

// Fondos de pantalla
export let background;
export let colorBackground;
export let pachaBackground;
export let pachaName = '';
export let PachaNickName = '';

// Dimensiones de la pantalla
const potHeight = height * 0.5;
const defaultPacha = require('../../../img/pachas/pacha_empty.png');
// const defaultPacha = require('../../../img/plantasWiki/karaconcha.png');

// Valores de temperatura ** DEBEN SER LEIDOS DESDE LA FIREBASE
const fillLevel = 20;
const fillHumedity = 50;
const filluvLight = 75;

// Constantes para el firebase
const expresionesFirebase = {
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
export const setPachaNickName = ( newPachaNickName ) => {
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
    const [firebaseExpresion, setFirebaseExpresion] = useState(1);
    // PAGINA PRINCIPAL
    const [temperatureExt, setTemperatureExt] = useState(35);   
    const [humidityInt, sethumidityInt] = useState(50); //Capacitivo
    // PAGINA MODAL
    const [humidityExt, setHumidityExt] = useState(10);
    const [light, setLuz] = useState(5);
    const [uvLight, setUvLight] = useState(75);
    const [level, setLevel] = useState(90);


    useEffect(() => {
        //Logica para el firebase
        const data = ref(db);
        onValue(data, (snapshot) => {
            setTemperatureExt(snapshot.val().temperatureExt);
            setHumidityExt(snapshot.val().humidityExt);
            sethumidityInt(snapshot.val().humidityInt);
            setLuz(snapshot.val().light);
            setFirebaseExpresion(snapshot.val().firebaseExpresion);
        });
        //Logica para la image facePot
        const delay = setTimeout(() => {
            setExpresionImage(expresionImageSource);
        }, 200);

        return () => clearTimeout(delay);
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

    <View style={[styles.mainScreen.viewPot, {backgroundColor: colorBackground ? colorBackground : COLORS.lightGray}]}>
        <Image source={pachaBackground ? pachaBackground : defaultPacha} style={styles.mainScreen.imagePot}/>
        {expresionImage && (
        <Image source={expresionImage} style={styles.mainScreen.facePot} />
        )}
        {/* Crendencial de indentificacion */}
        
        {pachaBackground && <View style={styles.mainScreen.credentialView}>
            <Text style={styles.mainScreen.credentialName}>{pachaName}</Text>
            <Text style={styles.mainScreen.credentialLabel}>{PachaNickName}</Text>
        </View>}
        
    </View>
        
    <ImageBackground source={background ? background : null} style={styles.mainScreen.imageBackground}>
        {circularProgress(`${fillLevel} %`, 'Nivel de Agua', COLORS.water, fillLevel)}
        {circularProgress(`${fillHumedity} %`, 'Humedad', COLORS.humidity, fillHumedity)}
        {circularProgress(`${filluvLight} %`, 'Ultra Violeta', COLORS.uvLight, filluvLight)}

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
                {dataModal(light, '%', 'Luz General', 'El sensor detecta la luz del ambiente, artificial o natural. Los rangos son los siguientes: ')}
                {dataModal(uvLight, '%', 'Luz UV', 'El sensor detecta lo rayos UV del sol en uW/cm2. Pacha toma este valor y lo transforma en los siguientes rangos:\n0-20% Bajo \n30-50% Medio \n60-70% Alto\n80-100% Muy Alto')}
                {dataModal(level, '%', 'Nivel de agua', 'Esta medida representa el porcentaje de agua en el tanque.')}
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
)};

export default Sensor