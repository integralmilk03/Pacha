import React from "react";
import Plantas from "./Plantas.jsx";
import { View, ScrollView } from 'react-native';
//our components
import styles from "../Styles/styles.js";
import { plantsData } from "./valuesWiki.js";

const Wiki = ({ }) => {
    return (
    <ScrollView >
      <View style={styles.wiki.viewContainer}>
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
      </View>
    </ScrollView>
    );
  };


export default Wiki;