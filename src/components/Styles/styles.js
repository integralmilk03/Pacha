import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from './color.js';


//Variables
export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
//Dimensiones para MAIN
const potHeight = height * 0.6; 
const potWidth = width ;
const faceHeight = height > 850 ? potHeight * 0.3 : potHeight * 0.2;
const faceWidth = width > 500 ? potWidth * 0.53 : potWidth * 0.55;
//Dimensiones para WIKI
const plantasButtonHeight = 275;
const plantasButtonWidth = 295;
const plantasImagenHeight = plantasButtonHeight - 50;
const plantasImagenWidth = plantasButtonWidth - 50;
//Dimensiones NavBar
const navbarHeight = height > 850 ? 120 : 80;

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
      paddingTop: 30,
      paddingBottom: 20,
    },
    imagePot: {
      // resizeMode: 'contain',
      width: potWidth,
      height: potHeight,
    },
    facePot: {
      position: 'absolute',
      width: faceWidth,
      height: faceHeight,
      resizeMode: 'contain',
    },
    //Credencial
    credentialView: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 20,
      borderWidth: 5,
      borderColor: '#C69C6D',
      alignContent: 'center',
      justifyContent: 'center',
      marginBottom: height > 850 ? 20 : 10,
      marginTop: height > 850 ? 50 : 10,
    },
    credentialName: {
      fontFamily: 'perolet',
      fontSize: height > 850 ? 25 : 18,
      color: '#332D21',
      textAlign: 'center',
    },
    credentialLabel: {
      fontFamily: 'perolet',
      fontSize: height > 850 ? 25 : 18,
      color: '#332D21',
      textAlign: 'center',
    },
    // Mitad inferior con los datos y fondo
    imageBackground: {
      backgroundColor: COLORS.darkGray,
      resizeMode: 'contain',
    },
    mainView: {
      flexDirection: 'row',
      //justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 15,
      paddingBottom: 15,
      paddingHorizontal: 20,
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
      paddingLeft: 40,
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
      fontFamily: 'perolet',
      fontSize: height > 850 ? 35 : 20,
      
    },
    //Modal que se abre al apretar saber mas
    containerModal: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 15,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    LecturaTextTitle:{
      fontFamily: 'open-sans-Bold',
      color: 'white',
      fontSize: height > 850 ? 40 : 20,
      padding: 20,
      TextAlign: 'center',
    },
    dataSensor: {
      justifyContent: "center",
      alignItems: "center",
      width: width * 0.9,
      height: height > 850 ? height * 0.9 : height * 0.83,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      flexDirection: "column", // Cambiamos a dirección vertical
      paddingHorizontal: 50,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: 'white',
    },
    maceta: {
      flex: 1,
      paddingTop: 30,
      alignItems: "center",
    },
    dataTextModal: {
      fontSize: height > 850 ? 45 : 25,
      fontWeight: "200",
      color: 'white',
      textAlign: "center",
    },
    descriptionDataTextModal: {
      textAlign: 'justify',
      fontSize: height > 850 ? 20 : 15,
      fontFamily: 'open-sans',
      color: 'white'
    },
    title: {
      fontFamily: 'open-sans-Bold',
      fontSize: height > 850 ? 35 : 20,
      color: 'white',
      textAlign: "center",
    },
    closeButton: {
      backgroundColor: 'white',
      fontFamily: 'open-sans',
      borderRadius: 20,
      padding: 15,
      elevation: 2,
      marginTop: 40,
      marginBottom: 15,
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.6,
      height: height > 850 ? height * 0.05 : height * 0.07,
    },
    closeButtonText: {
      color: 'black',
      fontFamily: 'open-sans-Bold',
      fontSize: height > 850 ? 22 : 16,
      FontDisplay: 'center',

    },
  },
 
  wikiScreen: {
    scrollView: { 
      backgroundColor: COLORS.apple50,
    },
    viewContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      paddingTop: 20, 
    },
    image: {
      width: width,
      height: height,
    },
  },

  plantas: {
    container: {
      paddingBottom: 10,
      paddingHorizontal: 50,
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
      fontSize: 23,
      marginTop: 5,
      color: COLORS.apple950
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
    closeButton: {
      backgroundColor: 'white',
      fontFamily: 'open-sans',
      borderRadius: 20,
      padding: 15,
      elevation: 2,
      marginTop: 10,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.6,
      height: height > 850 ? height * 0.05 : height * 0.07,
    },
  },

  plantCard: {
    mainView: {
      flex: 1,
      backgroundColor: "lightgrey",
    },
    description: {
      flex: 1,
      fontFamily: 'open-sans',
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
    },
    //LOGOS
    credentialContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
    },
    credentialView: {
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor: COLORS.apple300,

      height: height > 850 ? 130 : 100,
      width: '30%',
      height: height * 0.2,
      alignContent: 'center',
      justifyContent: 'center',

      borderRadius: height > 850 ? 20 : 20,
      
      marginBottom: height > 850 ? 20 : 10,
      marginTop: height > 850 ? 40 : 20,
    },
    credentialName: {
      fontFamily: 'perolet',
      fontSize: height > 850 ? 25 : 15,
      marginLeft: height > 850 ? 15 : 5,
      color: '#332D21',
      marginBottom: 5,
    },
    credentialLabel: {
      width: '90%',
      borderRadius: 10,
      fontFamily: 'perolet',
      fontSize: height > 850 ? 25 : 15,
      textAlign: 'center',
      color: '#332D21',
      backgroundColor: COLORS.apple200,
    },
    icon: {
      marginBottom: 5,
    },
    
  },
  
  caras: {
    container: {
      flex: 1,
      backgroundColor: COLORS.apple50,
    },
    viewFlatList:{
      flex: 1,
      backgroundColor: COLORS.apple50,
      paddingTop: 20,
    },
    viewPotExpression: {
      flex: 1,
      alignItems: 'center',
      paddingBottom: 20,
    },
    screenContainer: {
      flex: 1,
      flexDirection: 'Column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingTop: 15,
    },
    expressionButton: {
      borderRadius: 10,
      backgroundColor: 'black',
    },
    expressionContainer: {
      width: width,
      alignItems: 'center',
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
      height: height * 0.28,
      width: width * 0.58,
    },
    expressionText: {
      fontFamily: 'perolet',
      marginTop: 5,
      textAlign: 'center',
      fontSize: 25,
      paddingBottom: 10,
      color: COLORS.apple950,
    },
    image: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    //Maceta con expresiones:
    pot: {      
      width: width * 0.55,
      height: height * 0.35,
    },
    facePot: {
      position: 'absolute',
      width: 140,
      height: 90,
      top: 65,
      left: 107,
      resizeMode: 'contain',
    },
  },

  switch: {
    container: {
      flex: 1,
      paddingTop: 10,
      flexDirection: 'column',
      //justifyContent: 'space-between',
      flexWrap: 'wrap',
      backgroundColor: COLORS.apple50,
    },
    text: {
      fontFamily: 'open-sans',
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
