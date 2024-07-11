import React, { useState } from "react";
import Plantas from "./Plantas.jsx";
import {
  View,
  ScrollView,
  Pressable,
  Image,
  Text,
  Modal,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
//our components
import styles, { height } from "../Styles/styles.js";
import { plantsData } from "./valuesWiki.js";
import { COLORS } from "../Styles/color.js";
import { sendDataToDatabase } from "./Plantas.jsx";
import { getPachaName, setColorBackground, setBackground, setPachaBackground } from "../Measurements/Main.js";


const Wiki = ({ }) => {

const [modalVisible, setModalVisible] = useState(false);

//Variables para planta personalzida
const [name, onChangeName] = useState('');
const [genre, onChangeGenre] = useState('');
const [sunLight, setSunLight] = useState(1);
//Variables para riego
const [water, setWater] = useState(1);
const [hours, setHours] = useState('');
const [minutes, setMinutes] = useState('');

const validateTime = (hh, mm) => {
  const hoursValid = hh === '' || (hh >= 0 && hh <= 23);
  const minutesValid = mm === '' || (mm >= 0 && mm <= 59);
  return hoursValid && minutesValid;
};

const handleHoursChange = (text) => {
  const value = text.replace(/[^0-9]/g, ''); // Permitir solo números
  if (value.length <= 2) {
    setHours(value);
    if (validateTime(value, minutes)) {
      console.log('')
    } else {
      setHours(0);
    }
  }
};

const handleMinutesChange = (text) => {
  const value = text.replace(/[^0-9]/g, ''); // Permitir solo números
  if (value.length <= 2) {
    setMinutes(value);
    if (validateTime(hours, value)) {
      console.log('');
    } else {
      setMinutes(0);
    }
  }
}

//Dias de la semana

const daysOfWeek = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

const openModal = () => {
  setModalVisible(true);
};
const closeModal = () => {
  setModalVisible(false);
};

return (
<ScrollView style={styles.wikiScreen.scrollView}>

  <View style={styles.wikiScreen.viewContainer}>
    {/* En las lineas de abajo mapeamos todo plantsData (ver plantasTemplate) y 
    recorremos cada elemento para en base a su id, name y description mostrarlos 
    en la pantalla. Para ajustar tamaño, forma y como se muestran en pantalla
    ajustar el wiki.Container*/}
    {plantsData.map(plant => (
    <Plantas
    key={plant.id}
    label={plant.name}
    imgSource={plant.imageSource}
    />))}

    <Pressable
    onPress={() => {
      Alert.alert('Bienvenido a Personalizado', 'Aqui podras editar y personalizar tu planta. Escogiendo los horarios de riego, nombre, etc.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => openModal()},
        ]
      )
    }}
    style={({ pressed }) => [
      styles.plantas.button,
      styles.plantas.shadow,
      pressed ? { backgroundColor: COLORS.apple300} : { backgroundColor: 'white' }
    ]}
    >
      <Image source={require('../../../img/plantasWiki/personalizado.jpg')} style={styles.plantas.buttonImage} />
      <Text style={[styles.plantas.buttonText]}>Personalizado</Text>
    </Pressable>

  </View>

  <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={closeModal}
  animationOutTiming={1000}
  animationOut={'slideOutUp'}
  >
    {/* behavior="position" enabled */}
    
    <View style={styles.customCard.container}>

      <Text style={styles.customCard.textTitle}>Nombre:</Text>
      <TextInput
      style={styles.customCard.inputText}
      placeholder="ej. Tulio"
      onChangeText={onChangeName}
      value={name}
      />

      <View
      style={{
      borderBottomColor: COLORS.apple200,
      borderBottomWidth: 1,
      height: 1,
      width: '80%',
      }}/>

      <Text style={styles.customCard.textTitle}>Tipo de planta:</Text>
      <TextInput
      style={styles.customCard.inputText}
      placeholder="ej. Cactus Cebra"
      onChangeText={onChangeGenre}
      value={genre}
      />

      <View
      style={{
      borderBottomColor: COLORS.apple200,
      borderBottomWidth: 1,
      height: 1,
      width: '80%',
      }}/>

      <View style={styles.customCard.touchableContainer}>
        <Text style={{
        fontFamily: 'open-sans',
        fontSize: height > 850 ? 25 : 18,
        color: 'white',
        padding: 5,
        // width: '40%',
        }}>Periodo de riego por día</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>
          <Pressable style={styles.customCard.touchableSign}
          onPress={() => water == 1 ? setWater(1) : setWater(water - 1)}
          >
            <Icon name="minus" size={20} color={COLORS.apple950Inverse} />
          </Pressable>

          <TextInput
          style={styles.customCard.touchableLabelButton}
          editable={false}
          placeholder={water.toString()}
          placeholderTextColor={'white'}
          keyboardType="numeric"
          onChangeText={water}
          value={water}
          />

          <Pressable style={styles.customCard.touchableSign}
            onPress={() => setWater(water + 1)}
          >
            <Icon name="plus" size={20} color={COLORS.apple950Inverse} />
          </Pressable>
        </View>
      </View>


      <View
      style={{
      borderBottomColor: COLORS.apple200,
      borderBottomWidth: 1,
      height: 1,
      width: '80%',
      }}/>


      <View style={styles.customCard.touchableContainer}>
        <Text style={{
        fontFamily: 'open-sans',
        fontSize: height > 850 ? 25 : 18,
        color: 'white',
        padding: 5,
        }}>Hora de riego</Text>
        <View style={{flexDirection: 'row', alignItems: 'center',}}> 
            <TextInput
            value={hours}
            onChangeText={handleHoursChange}
            keyboardType="numeric"
            maxLength={2}
            placeholderTextColor={'gray'}
            style={styles.customCard.inputTextTime}
            />
            <Text style={{alignItems: 'center', paddingHorizontal: 10, fontFamily: 'open-sans', fontSize: 15, color: (hours || minutes) ? 'white' : 'gray', textAlign: 'center'}}>:</Text>
            <TextInput
              value={minutes}
              onChangeText={handleMinutesChange}
              keyboardType="numeric"
              maxLength={2}
              placeholderTextColor={'gray'}
              style={styles.customCard.inputTextTime}
            />
          </View>
      </View>

      <View
      style={{
      borderBottomColor: COLORS.apple200,
      borderBottomWidth: 1,
      height: 1,
      width: '80%',
      }}/>

      <View style={styles.customCard.touchableContainer}>

        <Text style={styles.customCard.textTitle}>Horas al sol:</Text>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>

        <Pressable style={styles.customCard.touchableSign}
          onPress={() => sunLight == 1 ? setSunLight(1) : setSunLight(sunLight - 1)}
        >
          <Icon name="minus" size={20} color={COLORS.apple950Inverse} />
        </Pressable>

        <TextInput
        style={styles.customCard.touchableLabelButton}
        editable={false}
        placeholder={sunLight.toString()}
        placeholderTextColor={'white'}
        keyboardType="numeric"
        onChangeText={sunLight}
        value={sunLight}
        />

        <Pressable style={styles.customCard.touchableSign}
          onPress={() => setSunLight(sunLight + 1)}
        >
          <Icon name="plus" size={20} color={COLORS.apple950Inverse} />
        </Pressable>
        </View>
      </View>
      
      <TouchableOpacity
      style={styles.customCard.closeButton}
      onPress={() => {
        if(!(name && sunLight && hours && minutes && water)) {
          Alert.alert('Error','Nombre, días de riego y horas de sol deben tener un valor.')
        }
        else{
          Alert.alert('Valores registrados');
          
          getPachaName(genre, name);
          setColorBackground('#EFCE98');
          setBackground(require('../../../img/plantasWiki/personalizadoFondo.png'));
          setPachaBackground(require('../../../img/pachas/pacha_generica.png'));
          
          let time = `${hours}:${minutes}`;
          sendDataToDatabase(sunLight, water, time);

          onChangeName('');
          onChangeGenre('');
          setWater(1);
          setHours('');
          setMinutes('');
          setSunLight(1);

          console.log(`${name}, ${genre}, ${water}, ${time}, ${sunLight}`);

          closeModal();
        }
      }}
      >
        <Text style={styles.customCard.closeButtonText}>Subir</Text>
      </TouchableOpacity>
    </View>
  
  </Modal>
    
</ScrollView>
)};


export default Wiki;