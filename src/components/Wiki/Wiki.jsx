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
import { getPachaName, setColorBackground, setBackground, setPachaBackground } from "../Measurements/Main.js";


const Wiki = ({ }) => {

const [modalVisible, setModalVisible] = useState(false);

//Variables para planta personalzida
const [name, onChangeName] = useState('');
const [genre, onChangeGenre] = useState('');
const [selectedDays, setSelectedDays] = useState([]);
const [sunLight, setSunLight] = useState(1);
//Variables para riego
const [water, setWater] = useState(1);
const [hours, setHours] = useState('');
const [minutes, setMinutes] = useState('');
const [error, setError] = useState('');

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
      setError('');
    } else {
      setError('Hora o minutos inválidos.');
    }
  }
};

const handleMinutesChange = (text) => {
  const value = text.replace(/[^0-9]/g, ''); // Permitir solo números
  if (value.length <= 2) {
    setMinutes(value);
    if (validateTime(hours, value)) {
      setError('');
    } else {
      setError('Hora o minutos inválidos.');
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
    />))
    }

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
      placeholder="ej. Pachasaurio"
      onChangeText={onChangeName}
      value={name}
      />

      <Text style={styles.customCard.textTitle}>Genero (opcional):</Text>
      <TextInput
      style={styles.customCard.inputText}
      placeholder="ej. Cactus Cebra"
      onChangeText={onChangeGenre}
      value={genre}
      />

      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',}}>
        <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{
          fontFamily: 'open-sans',
          fontSize: height > 850 ? 25 : 20,
          color: 'white',
          padding: 20,
          }}>Riego</Text>
        </View>

        <View style={{width: '60%', flexDirection: 'column',}}>
          <View style={{width: '100%', height: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>
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
          <View style={{flex: 1, width: '100%', height: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}> 
            <TextInput
            value={hours}
            onChangeText={handleHoursChange}
            placeholder="HH"
            keyboardType="numeric"
            maxLength={2}
            placeholderTextColor={'gray'}
            style={{ width: 50, textAlign: 'center', marginHorizontal: 20,}}
            />
            <Text style={{fontFamily: 'open-sans', fontSize: 20, color: 'gray'}}>:</Text>
            <TextInput
              value={minutes}
              onChangeText={handleMinutesChange}
              placeholder="MM"
              keyboardType="numeric"
              maxLength={2}
              placeholderTextColor={'gray'}
              style={{ width: 50, textAlign: 'center', marginHorizontal: 20,}}
            />
          </View>
        </View>
      </View>

      <View style={styles.customCard.touchableContainer}>

        <Text style={styles.customCard.textTitle}>Horas al sol:</Text>

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
      
      <TouchableOpacity
      style={styles.customCard.closeButton}
      onPress={() => {
        console.log(selectedDays.length)
        if(!(name && sunLight && selectedDays.length)) {
          Alert.alert('Error','Nombre, días de riego y horas de sol deben tener un valor.')
        }
        else{
          Alert.alert('Valores registrados');
          
          getPachaName(name, genre);
          setColorBackground('#EFCE98');
          setBackground(require('../../../img/plantasWiki/personalizado.png'));
          setPachaBackground(require('../../../img/pachas/pacha_generica.png'));

          onChangeGenre('');
          onChangeName('');
          setSelectedDays([]);
          setSunLight(0);
          console.log(`${name}, ${genre}, ${selectedDays}, ${sunLight}`);

          closeModal();
        }
      }}
      >
        <Text style={styles.mainScreen.closeButtonText}>Subir</Text>
      </TouchableOpacity>
    </View>
  
  </Modal>
    
</ScrollView>
)};


export default Wiki;