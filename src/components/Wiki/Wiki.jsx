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

const WeekdaySelector = () => {
  const [selectedDays, setSelectedDays] = useState([]);

  const daysOfWeek = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

  const handleDayPress = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  return (
    <View style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,}}>
      {daysOfWeek.map((day) => (
        <TouchableOpacity
          key={day}
          style={[{
            backgroundColor: '#ceeac8', // apple200
            borderRadius: 10,
            padding: 10,
            margin: 5,
            width: '17%', // adjust this to fit 3 boxes per row
            alignItems: 'center'},
            selectedDays.includes(day) && {backgroundColor: '#78be6a',},
          ]}
          onPress={() => handleDayPress(day)}
        >
          <Text style={[{
            color: '#274522', // apple900
            fontWeight: 'bold',
          },
            selectedDays.includes(day) && {color: '#ffffff',}
          ]}>{day}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


const Wiki = ({ }) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  //Variables para planta personalzida
  const [name, onChangeName] = useState('');
  const [genre, onChangeGenre] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [sunLight, setSunLight] = useState(0);

  const daysOfWeek = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

  const handleDayPress = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

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
      
      <View style={{flex: 1, backgroundColor: COLORS.apple950, alignContent: 'center', alignItems: 'center'}}>
        <Text style={{fontFamily: 'open-sans', fontSize: 20, color: 'white', padding: 20,}}>Nombre (Apodo):</Text>
        <TextInput
        style={{
          marginTop: 20,
          width: 300,
          height: 40,
          paddingHorizontal: 10,
          borderRadius: 50,
          backgroundColor: COLORS.apple300,
          marginBottom: 10,
        }}
        placeholder="ej. Pachasaurio"
        onChangeText={onChangeName}
        value={name}
        />

        <Text style={{fontFamily: 'open-sans', fontSize: 20, color: 'white', padding: 15}}>Genero (opcional):</Text>
        <TextInput
        style={{
          marginTop: 20,
          width: 300,
          height: 40,
          paddingHorizontal: 10,
          borderRadius: 50,
          backgroundColor: COLORS.apple300,
          marginBottom: 10,
        }}
        placeholder="ej. Cactus Cebra"
        onChangeText={onChangeGenre}
        value={genre}
        />

        <Text style={{fontFamily: 'open-sans', fontSize: 20, color: 'white', padding: 15}}>Dias de Riego:</Text>
        <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 10,}}>
          {daysOfWeek.map((day) => (
            <TouchableOpacity
              key={day}
              style={[{
                backgroundColor: '#ceeac8', // apple200
                borderRadius: 10,
                padding: 10,
                margin: 5,
                width: '17%', // adjust this to fit 3 boxes per row
                alignItems: 'center'},
                selectedDays.includes(day) && {backgroundColor: '#78be6a',},
              ]}
              onPress={() => handleDayPress(day)}
            >
              <Text style={[{
                color: '#274522', // apple900
                fontWeight: 'bold',
              },
                selectedDays.includes(day) && {color: '#ffffff',}
              ]}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: 15,
          paddingBottom: 15,
        }}>

          <Text style={{fontFamily: 'open-sans', fontSize: 20, color: 'white'}}>Horas al sol:</Text>

          <Pressable style={{backgroundColor: COLORS.apple800, height: 50, width: 50, borderRadius: 50, marginHorizontal: 20, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => sunLight == 0 ? setSunLight(0) : setSunLight(sunLight - 1)}
          >
            <Icon name="minus" size={30} color={COLORS.apple950Inverse} />
          </Pressable>

          <TextInput
          style={{
            height: 50,
            backgroundColor: COLORS.apple950,
            fontSize: 30,
            fontFamily: 'open-sans',
          }}
          editable={false}
          placeholder={sunLight.toString()}
          placeholderTextColor={'white'}
          keyboardType="numeric"
          onChangeText={sunLight}
          value={sunLight}
          />

          <Pressable style={{backgroundColor: COLORS.apple800, height: 50, width: 50, borderRadius: 50, marginHorizontal: 20, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => setSunLight(sunLight + 1)}
          >
            <Icon name="plus" size={30} color={COLORS.apple950Inverse} />
          </Pressable>
        </View>
        
        <TouchableOpacity
        style={styles.mainScreen.closeButton}
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