import React, {useState} from "react";
import { Text, View, Pressable, Modal, TouchableOpacity, Alert, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import PlantCard from "./PlantasTemplate";
import styles from "../Styles/styles.js";
import { setBackground } from "../Measurements/Sensors.js";
import {db, ref, set, child} from '../../firebase.js';
import { plantsData, plantIds } from "./valuesWiki.js";

//Variables
let lastPlant = '';

const plants = plantsData.reduce((acc, plant) => {
    acc[plant.id] = plant;
    return acc;
}, {});

//Mandar datos al Firebase
const sendPlantIdToDatabase = (plantId) => {
    const regarRef = child(ref(db), 'regar');
    set(regarRef, plantId)
      .then(() => {
        console.log(`Valor ${plantId} enviado a la base de datos`);
      })
      .catch((error) => {
        console.error('Error al enviar el valor a la base de datos:', error);
      });
};

// Boton flotante del modal
const FloatingButton = ( label ) => {
    const plantId = plantIds[label.name];
    const plant = plants[plantId];

    if(plant.selected){
        return(null)
    } else {
        const handler = () => {
            if (plant) {

                if(lastPlant){
                    lastPlant.selected = false;
                }
        
                plant.selected = true;
                lastPlant = plants[plantId];
        
                Alert.alert(`${label.name} fue agregado a su perfil`);
                setBackground(plant.imageSource);
                sendPlantIdToDatabase(plantId);
        
            } else {
                Alert.alert('ADVERTENCIA', `No se encontro planta con el nombre ${label.name}`,
                [
                    {
                      text: 'Cancel',
                      onPress: () => Alert.alert('Cancel Pressed'),
                      style: 'cancel',
                    },
                ]
                )
            }
        }
        return (
            <View>
                <TouchableOpacity
                    style={styles.plantas.circle}
                    onPress={handler}>
                    <Icon name="plus" size={32} color="#FFFF" />
                </TouchableOpacity>
            </View>
        );
    }
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
              pressed ? { backgroundColor: '#13957b' } : { backgroundColor: backgroundColor }
            ]}
          >
            <Image source={imgSource} style={styles.plantas.buttonImage} />
            <Text style={[styles.plantas.buttonText, { color: 'black' }]}>{label}</Text>
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