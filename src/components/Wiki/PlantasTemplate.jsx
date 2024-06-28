import React, { useState } from "react";
import { Text, ScrollView, View } from "react-native";
import styles from "../Styles/styles.js";
import Carousel from "./imagesScroll.js";
import {plantsData} from "./valuesWiki.js"

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
        <Text style={styles.plantCard.description}>{plantDescription}</Text>
      </ScrollView>
    </View>
  );
};
export default PlantCard;