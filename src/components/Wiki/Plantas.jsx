import React, {useState} from "react";
import { Text, View, Pressable, Modal, TouchableOpacity, Alert, Image, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import PlantCard from "./PlantasTemplate";
import styles, { height } from "../Styles/styles.js";
import { setBackground, setColorBackground, setPachaBackground, getPachaName } from "../Measurements/Main.js";
import { plantsData, plantIds } from "./valuesWiki.js";
import { COLORS } from "../Styles/color.js";

//Variables
let lastPlant = '';

const plants = plantsData.reduce((acc, plant) => {
    acc[plant.id] = plant;
    return acc;
}, {});

export const sendDataToDatabase = (potSunLight, potWater, potWaterTime) => {
  console.log(potSunLight);
  console.log(potWater);
  console.log(potWaterTime);
};

// Boton flotante del modal
const FloatingButton = ( label ) => {

  const [nickName, onChangeNickName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const plantId = plantIds[label.name];
  const plant = plants[plantId];

  const handler = () => {
    if (plant) {
      
      if(lastPlant) {
        lastPlant.selected = false;
      }

      plant.selected = true;
      lastPlant = plants[plantId];
      
      getPachaName(plant.name, nickName); //CAMBIO nickName
      setBackground(plant.imageSourceBackground);
      setColorBackground(plant.color);
      setPachaBackground(plant.imageBackground);
      sendDataToDatabase(plant.potSunLight, plant.potWater, plant.potWaterTime);
    
    }

    else{
      Alert.alert('ADVERTENCIA', `No se encontro planta con el nombre ${label.name}`)
    }
    
  };

  if(plant.selected ){
    return(null)
  } 
  else {
    return (
    <View>
      <TouchableOpacity
      style={styles.plantas.circle}
      onPress={() => {
      Alert.alert('Nueva Planta', '¿Deseas agregar esta planta a tu perfil?',
        [
          // {
          //   text: 'Apodo',
          //   onPress: () => openModal(),
          // },
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
            openModal();
          }},
        ]
      )
      }}>
      <Icon name="plus" size={32} color="#FFFF" />
      </TouchableOpacity>

      <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
      animationOutTiming={1000}
      >
        <View style={{flex: 1, backgroundColor: COLORS.apple950, alignContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'open-sans', fontSize: 20, color: 'white', padding: 15, textAlign: 'center'}}>Deseas agregar un apodo de cariño a tu planta</Text>
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
          placeholder="ej. Bonifacio"
          onChangeText={onChangeNickName}
          value={nickName}
          />

          <TouchableOpacity
          style={styles.plantas.closeButton}
          onPress={() => {
            handler();
            setModalVisible(false);
          }}
          >
            <Text style={styles.plantas.closeButtonText}>Subir</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>)
  };
};


// Aqui usamos plantas para mostrar cada componente, que se ve en wiki
// entones aqui renderizamos cada cuadrado, el tamaño de la imagen de adentro
// que pasa cuando lo apretamos, etc.
// Ademas usamos el floatingButton para manejar cuando una planta es seleccionada
// y cambiamos el fondo de pantalla. Ver funcion en sensors.
// usamos un lista con los nombres e ids de cada planta en plantasTemplate
const Plantas = ({ 
    label='', 
    backgroundColor='white',
    imgSource,
    }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalName, setModalName] = useState(false);

    const [selectedPlantLabel, setSelectedPlantLabel] = useState(null);

    const openModal = (label) => {
      setSelectedPlantLabel(label);
      setModalVisible(true);
    };
    const closeModal = () => {
      setSelectedPlantLabel(null);
      setModalVisible(false);
    };


    const renderPlantComponent = (label) => {
        const plantId = plantIds[label];
        if (!plantId) return null;
        const plant = plants[plantId];
        if (!plant) return null;
        return <PlantCard key={plant.id} id={plant.id} />;
    };
    
    return (
    <View style={styles.plantas.container}>
      <Pressable
        onPress={() => openModal(label)}
        style={({ pressed }) => [
          styles.plantas.button,
          styles.plantas.shadow,
          pressed ? { backgroundColor: COLORS.apple300} : { backgroundColor: backgroundColor }
        ]}
      >
        <Image source={imgSource} style={styles.plantas.buttonImage} />
        <Text style={[styles.plantas.buttonText]}>{label}</Text>
      </Pressable>
      
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
      >
        {selectedPlantLabel && renderPlantComponent(selectedPlantLabel)}
        <FloatingButton name={selectedPlantLabel} />

      </Modal>
    </View>
      );
  };

export default Plantas;