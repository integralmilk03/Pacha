import { StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { COLORS } from './color.js';
import { useState } from 'react';


//Variables
export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
//Dimensiones para MAIN
const potHeight = height * 0.5; 
const potWidth = width * 0.4;
const faceTop = potHeight * 0.55;
const faceHeight = potHeight * 0.25;
const faceWidth = potWidth * 0.6;
//Dimensiones para WIKI
const plantasButtonHeight = 275;
const plantasButtonWidth = 295;
const plantasImagenHeight = plantasButtonHeight - 50;
const plantasImagenWidth = plantasButtonWidth - 50;
//Modo Oscuro


/* Lista de Estilos */
const styles = StyleSheet.create({
  text: {
    header: {
      fontSize: height * 0.05,
      color: 'white',
    },
    headerStyle: {
      fontSize: height * 0.05,
      fontFamily: 'perolet',
      color: 'white',
    },
    header2: {
      fontSize: height * 0.03,
      color: 'white',
      paddingHorizontal: 10,
    },
    header2Style: {
      fontSize: height * 0.03,
      fontFamily: 'perolet',
      color: 'white',
      paddingHorizontal: 10,
    },
    text: {

    },
    specialText: {

    },
  },
  mainScreen: {
    // Mitad superior con la maceta
    viewPot: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: COLORS.sky
    },
    imagePot: {
      resizeMode: 'contain',
      width: potWidth,
      height: potHeight
    },
    facePot: {
      position: 'absolute',
      top: faceTop,
      width: faceWidth,
      height: faceHeight,
      resizeMode: 'contain'
    },
    // Mitad inferior con los datos y fondo
    imageBackground: {
      resizeMode: 'strech',
      marginBottom: 80,
    },
    mainView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 15,
      paddingBottom: 15,
    },
    dataText: {
      fontSize: height * 0.05,
      fontFamily: 'perolet',
      color: 'white',
    },
    labelText: {
      fontSize: height * 0.03,
      fontFamily: 'perolet',
      color: 'white',
      paddingHorizontal: 10,
    },
    //Boton de datos extras
    pressLecturaButton: {
      backgroundColor: COLORS.mediumGreen2,
      borderWidth: 1, // Agregar borde
      borderColor: 'black', // Color del borde
      borderRadius: 20,
      padding: 10,
      paddingHorizontal: 50,
      marginBottom: height > 850 ? 60 : 20,
      marginTop: 20,
      elevation: 2,
      alignSelf: 'center',
      alignItems: 'center',
    },
    pressLecturaButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: height > 850 ? 26 : 20,
    },
    //Modal que se abre al apretar saber mas
    containerModal: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      alignItems: 'center',
      paddingHorizontal: 15,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    LecturaTextTitle:{
      color: 'white',
      fontSize: height > 850 ? 40 : 20,
      fontWeight: '900',
      padding: 20,
      textAlign: 'center',
      textShadowColor: 'black', 
    },
    dataSensor: {
      justifyContent: "center",
      alignItems: "center",
      width: width * 0.9,
      height: height > 850 ? height * 0.85 : height * 0.7,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      flexDirection: "column", // Cambiamos a dirección vertical
      paddingHorizontal: "28%",
      borderRadius: 30,
      borderWidth: 1,
      borderColor: 'white',
    },
    maceta: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    dataTextModal: {
      fontSize: height > 850 ? 40 : 20,
      fontWeight: "200",
      color: 'white',
      textAlign: "center",
    },
    title: {
      fontSize: height > 850 ? 40 : 20,
      fontWeight: "bold",
      color: 'white',
      textAlign: "center",
    },
    closeButton: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
      elevation: 2,
      marginTop: 10,
      marginBottom: 15,
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.6,
      height: height > 850 ? height * 0.05 : height * 0.1,
    },
    closeButtonText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: height > 850 ? 22 : 16,
      FontDisplay: 'center',

    },
  },
 
  wikiScreen: {
    scrollView: { },
    viewContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      paddingTop:40,
      paddingBottom: 90,
      paddingHorizontal: 10,
    },
    image: {
      width: width,
      height: height,
    },
  },

  plantas: {
    container: {
      paddingBottom: 10,
    },
    button: {
      width: plantasButtonWidth,
      height: plantasButtonHeight,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 35,
      borderWidth: 2,
      marginBottom: 15,
    },
    shadow: {
      shadowColor: 'black',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 20,
    },
    buttonImage: {
      width: plantasImagenWidth,
      height: plantasImagenHeight,
      borderRadius: 25,
      marginTop: 5,
    },
    buttonText: {
      fontFamily: 'perolet',
      fontSize: 20,
      textTransform: 'lowercase',
      fontWeight: 500,
      marginTop: 5,
      color: COLORS.dun
    },
    circle: {
      backgroundColor: COLORS.violet,
      width: 60,
      height: 60,
      position: 'absolute',
      bottom: 20,
      right: 25,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },



  plantCard: {
    mainView: {
      flex: 1,
      backgroundColor: "lightgrey",
    },
    description: {
      flex: 1,
      backgroundColor: "transparent",
      paddingHorizontal: 20,
      marginTop: 10,
      paddingBottom: 55,
      fontSize: height > 850 ? 38 : 22,
    },
    image: {
      width: "100%",
      height: "50%",
    },
    imageCarousel: {
      height: (height * 0.5),
      width: width,
    }
    
  },
  
  caras: {
    container: {
      flex: 1,
      paddingTop: 20,
      paddingBottom: 80,
      backgroundColor: COLORS.sky,
    },
    viewHeaderText: {
      
    },
    expressionContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      paddingTop: 15,
    },
    expressionButton: {
      borderRadius: 25,
      backgroundColor: 'black',
    },
    expressionButtonShadow: {
      shadowColor: 'black',
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 5,
      shadowRadius: 35,
      elevation: 10,
    },
    expression: {
      resizeMode: 'contain',
      height: plantasButtonHeight,
      width: plantasButtonWidth,
    },
    expressionText: {
      fontFamily: 'perolet',
      marginTop: 5,
      textAlign: 'center',
      fontSize: 25,
      paddingBottom: 35,
      color: COLORS.dun,
    },
    image: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    //Pagina Modal
    modalContaier: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalSubContainer: {
      backgroundColor: '#1d3244',
      width: '100%',
      height: '100%',
    },
    modalImage: {
      resizeMode: 'contain',
      width: '90%',
      height: height * 0.45,
      alignSelf: 'center'
    },
    modalScroll: {
      flex: 1,
      marginTop: 10,
    },
    modalText: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 25,
      paddingHorizontal: 20,
    },
    pressable: {
      marginTop: 10,
    },
    pressableButton: {
      color: '#e8ff65',
      textAlign: 'center',
      fontSize: 22,
      paddingVertical: 10
    },
  },
  switch: {
    container: {
      flex: 1,
      paddingTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      paddingHorizontal: 10,
    },
    text: {
      fontSize: 25,
      padding: 10,
    },
  },
  pacha: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 50,
    },
    body: {
      // Tablet height = 0.35 width = 0.6
      alignItems: 'center',
      justifyContent: 'center',
      height: height * 0.35,
      width: width * 0.6,
      borderWidth: 5,
      borderRadius: 25,
      backgroundColor: 'white',
    },
    image: {
      // Tablet height = 0.25 width = 0.45
      resizeMode: 'contain',
      height: height * 0.25,
      width: width * 0.45,
    },
    text: {
      //Tablet fontSize 60
      fontFamily: 'perolet',
      fontSize: 60,
      textAlign: 'center',
      marginBottom: 15
    }
  },
  NavBar: {
    viewIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 90,
    }
  }
});

export default styles;
