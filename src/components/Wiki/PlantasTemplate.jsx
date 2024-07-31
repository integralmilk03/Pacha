import React, { useState } from "react";
import { Text, ScrollView, View, Modal } from "react-native";
import styles, {height} from "../Styles/styles.js";
import Carousel from "./imagesScroll.js";
import {plantsData} from "./valuesWiki.js";
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome6.js'

// Aqui se encuentra lo que sale en Modal, es decir serie de fotos con la descripcion
// de cada una, igual en base solo a la id logramos sacar todos los valores
// aqui se llama carousel que se encarga de hacer la animacion de cada imagen.

const PlantCard = ({ id }) => {
  const [error, setError] = useState(false);

  plantsData.find((plant) => {
    if (plant.id === id) {
      plantName = plant.name;
      plantDescription = plant.description;
    }
  })

  const iconHeight = 30;
  
  return (
    <View style={styles.plantCard.mainView}>
      {error ? 
      <Image 
      source={plantsData[id-1].imageSource}
      onError={() => setError(true)}
      style={styles.plantCard.image}
      /> : 
      <Carousel name={plantName}/>}
      
      <ScrollView style={{}}>
        <View style={styles.plantCard.credentialContainer}>

          <View style={styles.plantCard.credentialView}>
            <Icon name="plant-wilt" size={height > 850 ? 40 : iconHeight} color="#332D21" style={styles.plantCard.icon}/>
            <Text style={styles.plantCard.credentialName}>Cuidado</Text>
            <Text style={styles.plantCard.credentialLabel}>{plantsData[id-1].care}</Text>
          </View>

          <View style={styles.plantCard.credentialView}>
            <Icon name="faucet-drip" size={height > 850 ? 40 : iconHeight} color="#332D21" style={styles.plantCard.icon}/>
            <Text style={styles.plantCard.credentialName}>Riego</Text>
            <Text style={styles.plantCard.credentialLabel}>{plantsData[id-1].water}</Text>
          </View>

          <View style={styles.plantCard.credentialView}>
            <Icon name="sun" size={height > 850 ? 40 : iconHeight} color="#332D21" style={styles.plantCard.icon}/>
            <Text style={styles.plantCard.credentialName}>Sol</Text>
            <Text style={styles.plantCard.credentialLabel}>{plantsData[id-1].sunLight}</Text>
          </View>
          
        </View>
        
        <Text style={styles.plantCard.description}>{plantDescription}</Text>
      </ScrollView>

    </View>
  );
};
export default PlantCard;