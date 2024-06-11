import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import Constants from 'expo-constants';
import {  useFonts, Inter_900Black } from '@expo-google-fonts/inter';

/* Valores constantes para ajustar el tamaño de la fuente*/
const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;

const width = Dimensions.get("window").width;


//Valores para el boton
const plantasButtonHeight = 290;
const plantasButtonWidth = 310;
const plantasImagenHeight = plantasButtonHeight - 50;
const plantasImagenWidth = plantasButtonWidth - 50;

//Fuentes personalizadas


/* Lista de Estilos */
const styles = StyleSheet.create({

  appBar: {
    container: {
      backgroundColor: '#0B5345',
      flexDirection: 'row',
      paddingTop: Constants.statusBarHeight + 10,
    },
    scroll: {
      paddingBottom: 15,
    },
    text: {
      color: '#ECF0F1',
      paddingHorizontal: 26,
    },
    active: {
      color: '#2ECC71',
    }
  },



  sensors: {
    image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    containerModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    centeredViewSensors: {
      justifyContent: 'center',
      alignItems: 'center', // Fondo negro semi-transparente
    },
    modalView: {
      width: '80%', // Reducir el ancho del modal
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    LecturaTextTitle:{
      color: 'white',
      fontSize: 22,
      fontWeight: '900',
      marginTop: 2,
      textAlign: 'center',
      textShadowColor: 'black', 
      textShadowOffset: { width: 1, height: 1 }, 
      textShadowRadius: 5,
    },
    pressLecturaButton: {
      backgroundColor: '#006400',
      borderWidth: 1.5, // Agregar borde
      borderColor: 'black', // Color del borde
      borderRadius: 20,
      padding: 10,
      marginBottom: 10,
      marginTop: 10,
      elevation: 2,
      alignSelf: 'center',
      alignItems: 'center',
      width: '80%', // Reducir el ancho del botón
    },
    pressLecturaButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      textShadowColor: 'black', // Color del borde simulado
      textShadowOffset: { width: -1, height: 1 }, // Desplazamiento de la sombra
      textShadowRadius: 1, // Radio de la sombra
    },
    closeButton: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
      paddingHorizontal: 120,
      elevation: 2,
      marginTop: 10,
      alignSelf: 'center',
      alignItems: 'center',
      width: '100%', // Ancho del botón close
    },
    closeButtonText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 16,
    },
    tempamb: {
      flex: 1,
      justifyContent: "center",
    },
    text: {
      fontSize: 100,
      fontWeight: "100",
      textAlign: "right",
      color: "white",
      paddingRight: 35,
    },
    data: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    spacerprogressbar: {
      height: "1%",
    },
    progressbarContainer: {
      height: 50,
      width: '100%',
      padding: 20,
      justifyContent: 'center',
    },
    progressbarTextTitle:{
      fontSize: 25,
      fontWeight: '900',
      textAlign: 'center',
      padding: 10,
      textShadowColor: 'white', 
      textShadowOffset: { width: 4, height: 4 }, 
      textShadowRadius: 5,
    },
    progressbarText:{
      fontSize: 16,
      fontWeight: '900',
      marginTop: 2,
      textAlign: 'center',
      textShadowColor: 'white', 
      textShadowOffset: { width: 3, height: 3 }, 
      textShadowRadius: 5,
    },



    dataSensor: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      flexDirection: "column", // Cambiamos a dirección vertical
      justifyContent: "center",
      alignItems: "center",
      height: "95%",
      paddingHorizontal: "28%",
      width: "100%",
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "white",
    },
    humidmaceta: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    tempmaceta: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    dataText: {
      fontSize: 22,
      fontWeight: "200",
      color: "white",
      textAlign: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
    },
  },


  wiki: {
    scrollView: {  },
    viewContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      paddingTop: 40,
      paddingBottom: 90,
    },
    image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  },



  plantas: {
    container: {  },
    button: {
      width: plantasButtonWidth,
      height: plantasButtonHeight,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 35,
      borderWidth: 1,
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
      fontSize: 20,
      textTransform: 'lowercase',
      fontWeight: 500,
      marginTop: 5,
    },
    circle: {
      backgroundColor: '#f52d56',
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
    description: {
      flex: 1,
      backgroundColor: "transparent",
      paddingHorizontal: 20,
      marginTop: 10,
      paddingBottom: 55,
      fontSize: getFontSize(25),
    },
    plantImage: {
      width: "100%",
      height: "50%",
    },
    scrollView: {
      backgroundColor: "lightgrey",
    },
  },



  caras: {
    container: {
      flex: 1,
    },
    viewHeaderText: {
      
    },
    headertText: {
      textAlign: 'center',
      fontSize: 35,
      color: '#e8ff65'
    },
    expressionContainer: {
      height: '100%',
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
      height: 300,
      width: 315,
    },
    expressionText: {
      marginTop: 5,
      textAlign: 'center',
      fontSize: 25,
      paddingBottom: 35,
      color: '#e8ff65'
    },
    image: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  },
  switch: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    text: {
      fontSize: 25,
      padding: 10,
    },
  },
});

export default styles;
