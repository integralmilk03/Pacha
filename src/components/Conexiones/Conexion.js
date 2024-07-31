import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  Switch,
  TextInput,
  Pressable,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import styles, { width, height } from '../Styles/styles';
import { showMessage } from "react-native-flash-message";
import { COLORS } from '../Styles/color';
import { setPachaNickName } from '../Measurements/Main';
import Slider from '@react-native-community/slider';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';

import axios from 'axios';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const privacyPolicyText = `
1. Información que Recopilamos
Información Personal: Recopilamos información que los usuarios proporcionan voluntariamente, como direcciones de correo electrónico, nombres de usuario y contraseñas.
Información Automáticamente Recopilada: Recopilamos datos como direcciones IP, características del navegador y del dispositivo, y datos de uso cuando los usuarios interactúan con nuestros servicios.

2. Cómo Procesamos su Información
Utilizamos la información para proveer, mejorar y administrar nuestros servicios, comunicarnos con los usuarios, garantizar la seguridad y prevenir fraudes, y cumplir con las leyes aplicables.

3. Cuándo y con Quién Compartimos su Información Personal
Podemos compartir información en situaciones específicas, como transferencias comerciales o durante negociaciones de fusiones, ventas de activos de la empresa, financiaciones o adquisiciones.

4. Cómo Manejamos sus Inicios de Sesión en Redes Sociales
Ofrecemos la opción de registrarse o iniciar sesión usando cuentas de redes sociales. Recibimos cierta información del perfil del proveedor de redes sociales, como nombre, dirección de correo electrónico y foto de perfil.

5. Cuánto Tiempo Conservamos su Información
Conservamos la información personal durante el tiempo necesario para cumplir con los propósitos descritos en la política de privacidad, a menos que la ley requiera un período de retención más largo.

6. Sus Derechos de Privacidad
Los usuarios pueden revisar, cambiar o terminar su cuenta en cualquier momento. Tienen el derecho de retirar su consentimiento para el procesamiento de sus datos personales y de solicitar acceso, corrección o eliminación de su información personal.

7. Controles para Características de No Rastrear
No respondemos a señales de "No rastrear" en navegadores web o dispositivos móviles, ya que no hay un estándar uniforme para reconocer y aplicar estas señales.

8. Actualizaciones de esta Política
Podemos actualizar la política de privacidad para cumplir con las leyes aplicables. Notificaremos a los usuarios sobre cambios materiales mediante la publicación de un aviso prominente o enviando una notificación directa.

9. Cómo Contactarnos sobre esta Política
Los usuarios pueden contactar a PACHA a través del correo electrónico pachasmartpot@gmail.com o por correo postal a la dirección proporcionada en la política.
`;
const termsOfUse = `
ACUERDO LEGAL: Al usar los servicios de PACHA, aceptas estar legalmente vinculado por estos términos. Si no estás de acuerdo, no debes usar los servicios.

MODIFICACIONES: PACHA se reserva el derecho de modificar estos términos en cualquier momento. Es tu responsabilidad revisar periódicamente las actualizaciones.

PROPIEDAD INTELECTUAL: PACHA posee o tiene licencia de todos los derechos de propiedad intelectual de los servicios, incluyendo el contenido y las marcas. Se te otorga una licencia limitada para usar los servicios de manera personal y no comercial.

REPRESENTACIONES DEL USUARIO: Al usar los servicios, garantizas que tienes la capacidad legal para cumplir estos términos, no eres menor de edad, y no usarás los servicios para fines ilegales.

ACTIVIDADES PROHIBIDAS: No puedes usar los servicios para actividades prohibidas como: obtener datos sistemáticamente, engañar a otros usuarios, interferir con las características de seguridad, acosar a otros, usar scripts automatizados, entre otras.

CONTRIBUCIONES GENERADAS POR EL USUARIO: Aunque los servicios no permiten publicar contenido, cualquier contribución enviada por los usuarios será propiedad de PACHA y podrá ser usada sin compensación.

GESTIÓN DE SERVICIOS: PACHA puede monitorear y tomar acciones legales contra violaciones de estos términos, restringir el acceso a contenido excesivo o gestionarlo para proteger sus derechos.

DURACIÓN Y TERMINACIÓN: Estos términos son válidos mientras uses los servicios. PACHA puede denegar el acceso y eliminar cuentas por cualquier motivo, sin previo aviso.

MODIFICACIONES E INTERRUPCIONES: PACHA puede cambiar, suspender o interrumpir los servicios en cualquier momento sin responsabilidad.

LEY APLICABLE Y RESOLUCIÓN DE DISPUTAS: Estos términos se rigen por la ley de Bolivia. Las disputas se resolverán mediante arbitraje en La Paz, Bolivia, en español.

EXCEPCIONES A LA RESOLUCIÓN DE DISPUTAS: Ciertas disputas relacionadas con derechos de propiedad intelectual, piratería, invasión de privacidad o uso no autorizado no están sujetas a arbitraje y se resolverán en un tribunal competente.
`;

const Conexion = () => {
  const navigation = useNavigation();

  const [isManual, setIsManual] = useState(false);
  const [changeUserModal, setChangeUserModal] = useState(false);

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newNickName, setNewNickName] = useState('');

  const [changeNickNameModal, setChangeNickNameModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const [sliderValue, setSliderValue] = useState(100);
  const [sliderVisible, setSliderVisible] = useState(false);

  const [riegoVisible, setRiegoVisible] = useState(false);

  const toggleNewNickName = () => {
    setChangeNickNameModal(!changeNickNameModal)
  }

  const toggleChangeUserModal = () => {
    setChangeUserModal(!changeUserModal);
  };

  const toggleModal = (text) => {
    setModalText(text);
    setModalVisible(!modalVisible);
  };

  const toggleConfirmModal = () => {
    setConfirmModalVisible(!confirmModalVisible);
  };

  const handlerBrightness = () => {
    setSliderVisible(!sliderVisible);
  };

  const handleSaveUser = async () => {

    try {
      const preusuario = await AsyncStorage.getItem('userToken');
      const preusuarioData = JSON.parse(preusuario);
      const { usuario, password } = preusuarioData;
      console.log(usuario);
      console.log(password);


      const res = await axios.get('https://django-render-pacha-web.onrender.com/users/usuario/');
      const userData = res.data;
      const user = userData.find(u => u.usuario === usuario && u.password === password);
      const userId = user.id;
      console.log(userId);

      const response = await axios.patch(`https://django-render-pacha-web.onrender.com/users/usuario/${userId}/`, {
        usuario: newUsername,
        password: newPassword,
      });
      if (response.status === 200 || response.status === 204) {
        console.log('Si')
        showMessage({
          message: "Cambios guardados",
          description: `Se actualizaron los datos de usuario y contraseña`,
          type: "success",
          animationDuration: 1500,
        });
        setNewUsername('');
        setNewPassword('');
        toggleChangeUserModal();
        await handleLogout(); // Llama a handleLogout después de actualizar los datos
      }
    } catch (error) {
      console.error('Error al actualizar usuario y contraseña:', error);
      Alert.alert('Error', 'Hubo un problema al actualizar los datos. Inténtalo nuevamente.');
    }
  };

  const handleNickName = () => {
    newNickName ? setPachaNickName(newNickName) : Alert.alert('Error', 'No se ha ingresado nombre o no se tiene un nombre');
    setNewNickName('');
    toggleNewNickName();
    showMessage({
      message: "Nuevo Nombre",
      description: `Tu Pacha esta feliz con su nuevo nombre`,
      type: "success",
      animationDuration: 1500,
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.replace('Login');
    console.log('Sesión Cerrada');
  };

  const handleConfirmChange = () => {
    toggleConfirmModal();
    handleSaveUser();
  };

  const regadobomba = async () => {
    try {
      const preusuarioregar = await AsyncStorage.getItem('userToken');
      const preusuarioDataregar = JSON.parse(preusuarioregar);
      const { usuario, password } = preusuarioDataregar;

      const resregar = await axios.get('https://django-render-pacha-web.onrender.com/users/usuario/');
      const userDataregar = resregar.data;
      const userregar = userDataregar.find(u => u.usuario === usuario && u.password === password);
      const userIdregar = userregar.id;

      const responseregar = await axios.patch(`https://django-render-pacha-web.onrender.com/users/usuario/${userIdregar}/`, {
        riego: 1,
      });
      if (responseregar.status === 200 || responseregar.status === 204) {
        console.log('Si')
        showMessage({
          message: "Regado",
          description: `Tu planta acaba de ser regada`,
          type: "success",
          animationDuration: 1500,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar los datos. Inténtalo nuevamente.');
    }
  };

  const handleAutomatico = async () => {
    try {
      setIsManual((previousState) => !previousState);
      console.log('Modo automatico');
      setRiegoVisible(false);
      showMessage({
        message: "Modo Automatico",
        description: "Activado sistema de riego automatico",
        type: "success",
        animationDuration: 325,
      });
      const preusuario = await AsyncStorage.getItem('userToken');
      const preusuarioData = JSON.parse(preusuario);
      const { usuario, password } = preusuarioData;

      const res = await axios.get('https://django-render-pacha-web.onrender.com/users/usuario/');
      const userData = res.data;
      const user = userData.find(u => u.usuario === usuario && u.password === password);
      const userId = user.id;

      const response = await axios.patch(`https://django-render-pacha-web.onrender.com/users/usuario/${userId}/`, {
        modo: 0,
      });
      if (response.status === 200 || response.status === 204) {
        console.log('modo a 0 (Automático)')
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar los datos. Inténtalo nuevamente.');
    }
  };

  const handleManual = async () => {
    try {
      setIsManual((previousState) => !previousState);
      console.log("Modo Manual");
      setRiegoVisible(true);
      showMessage({
        message: "Modo manual",
        description: "Advertencia. El riego ya no sera automatico. Se puede usar 'regar planta' para activar el riego",
        type: "warning",
        animationDuration: 1500
      });
      const preusuario = await AsyncStorage.getItem('userToken');
      const preusuarioData = JSON.parse(preusuario);
      const { usuario, password } = preusuarioData;

      const res = await axios.get('https://django-render-pacha-web.onrender.com/users/usuario/');
      const userData = res.data;
      const user = userData.find(u => u.usuario === usuario && u.password === password);
      const userId = user.id;

      const response = await axios.patch(`https://django-render-pacha-web.onrender.com/users/usuario/${userId}/`, {
        modo: 1,
      });
      if (response.status === 200 || response.status === 204) {
        console.log('modo a 1 (Manual)')
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar los datos. Inténtalo nuevamente.');
    }
  };

  const handleSliderChange = async (value) => {
    try {
      setSliderValue(Math.round(value)); // Actualiza el estado con el valor redondeado del slider
      const preusuario = await AsyncStorage.getItem('userToken');
      const preusuarioData = JSON.parse(preusuario);
      const { usuario, password } = preusuarioData;

      const res = await axios.get('https://django-render-pacha-web.onrender.com/users/usuario/');
      const userData = res.data;
      const user = userData.find(u => u.usuario === usuario && u.password === password);
      const userId = user.id;

      const response = await axios.patch(`https://django-render-pacha-web.onrender.com/users/usuario/${userId}/`, {
        brillo: sliderValue,
      });
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar los datos. Inténtalo nuevamente.');
    }

  };

  //COSAS NUEVAS 

  //COMPONENTES EXTAS
  const SwitchManualAutomatic = () => {
    return(
    <Switch
    value={isManual}
    onValueChange={isManual ? handleAutomatico : handleManual}
    trackColor={{ true: 'lightgreen', false: 'skyblue' }}
    thumbColor={'grey'}
    style={{justifyContent: 'flex-end'}}
    />
  )};

  const iconColor = COLORS.dun;
  const paddingSmall = 10;
  const paddingMedium = 40;

  const Element = ({title, iconLabel, sizeIcon, component}) => {
    return(
    <View style={{ flexDirection: 'row', height: height * 0.15,}}>
      <View style={{width: '20%', justifyContent: 'center', alignItems: 'flex-end', paddingRight: paddingSmall}}>
        <Icon name={iconLabel} size={sizeIcon} color={iconColor}/>
      </View>
      <View style={{width: '60%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: paddingSmall}}>
        <Text style={styles.normalTextSettings}>{title}</Text>
      </View>
      <View style={{width: '20%', justifyContent: 'center', alignItems: 'flex-end',}}>
        {component}
      </View>
    </View>
  )};

  const ElementPressable = ({title, iconLabel, sizeIcon, component, onPress}) => {
    return(
    <Pressable
      onPress={onPress}
      style={[({ pressed }) => (
      {backgroundColor: pressed ? COLORS.apple500 : COLORS.apple50,}),
      {flexDirection: 'row', height: height * 0.15}]}
    >
      <View style={{width: '20%', justifyContent: 'center', alignItems: 'flex-end', paddingRight: paddingSmall}}>
        <Icon name={iconLabel} size={sizeIcon} color={iconColor}/>
      </View>
      <View style={{width: '60%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: paddingSmall}}>
        <Text style={styles.normalTextSettings}>{title}</Text>
      </View>
      <View style={{width: '20%', justifyContent: 'center', alignItems: 'flex-end',}}>
        {component}
      </View>
    </Pressable>
  )};


  const divider = () => {
  return(
    <View
    style={{
    borderBottomColor: COLORS.apple700,
    borderBottomWidth: 2,
    height: 2,
    width: '100%',
    }}/>
  )};

  return (
    
    <ScrollView >
    <View style={{backgroundColor: COLORS.apple50}}>


      {/* CONFIGURACIONES DE TU PACHA */}
      <Text style={styles.headerTextSettings}>Configuraciones de tu pacha</Text>
      {divider()}

      <Element
      title={riegoVisible ? "Modo Manual" : "Modo Automatico"}
      iconLabel= {riegoVisible ? "hand-paper" : "robot"} 
      sizeIcon={35}
      component={<SwitchManualAutomatic />}
      />

        {riegoVisible &&
        <ElementPressable
        title="Regar planta"
        iconLabel= {null}
        sizeIcon={0}
        component={null}
        onPress={regadobomba}
        />}


      <ElementPressable
      title="Brillo"
      iconLabel="lightbulb"
      sizeIcon={35}
      component={null}
      onPress={handlerBrightness}
      />

        {sliderVisible &&
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, }}>
          <Slider
            style={{ width: '75%', height: 50 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={COLORS.apple600}
            maximumTrackTintColor={COLORS.apple400}
            onValueChange={handleSliderChange}
            value={sliderValue}
          />
          <Text style={{ fontFamily: 'open-sans', fontSize: 20, }}>
            {sliderValue} %
          </Text>
        </View>}

      {/* OPCIONES DE PERFIL Y USUARIO */}

      <Text style={styles.headerTextSettings}>Opciones de perfil y usuario</Text>
      {divider()}

      <ElementPressable
      title="Cambiar usuario y/o contraseña"
      iconLabel="user-circle"
      sizeIcon={35}
      component={null}
      onPress={toggleChangeUserModal}
      />

        {changeUserModal && (
          <View style={{ alignItems: 'center'}}>
            <TextInput
              style={{
                marginTop: 10,
                width: 300,
                height: 40,
                paddingHorizontal: 10,
                borderRadius: 50,
                backgroundColor: COLORS.apple300,
                marginBottom: 15,
              }}
              placeholder="Nuevo Usuario"
              value={newUsername}
              onChangeText={setNewUsername}
            />

            <TextInput
              style={{
                marginTop: 10,
                width: 300,
                height: 40,
                paddingHorizontal: 10,
                borderRadius: 50,
                backgroundColor: COLORS.apple300,
                marginBottom: 15,
              }}
              placeholder="Nuevo Contraseña"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={true}
            />

            <TouchableOpacity
              onPress={toggleConfirmModal}
              style={{
                backgroundColor: 'white',
                fontFamily: 'open-sans',
                borderRadius: 20,
                padding: 15,
                elevation: 2,
                marginBottom: 15,
                justifyContent: 'center',
                alignItems: 'center',
                width: width * 0.6,
                height: height > 850 ? height * 0.05 : height * 0.07,
              }}
            >
              <Text>Guardar</Text>
            </TouchableOpacity>
          </View>
        )}

      <ElementPressable
      title="Cambiar nombre de tu Pacha"
      iconLabel="seedling"
      sizeIcon={35}
      component={null}
      onPress={toggleNewNickName}
      />

      {changeNickNameModal && (
        <View style={{ alignItems: 'center' }}>

          <TextInput
            style={{
              marginTop: 10,
              width: 300,
              height: 40,
              paddingHorizontal: 10,
              borderRadius: 50,
              backgroundColor: COLORS.apple300,
              marginBottom: 15,
            }}
            placeholder="Nuevo Nombre"
            value={newNickName}
            onChangeText={setNewNickName}
          />

          <TouchableOpacity
            onPress={handleNickName}
            style={{
              backgroundColor: 'white',
              fontFamily: 'open-sans',
              borderRadius: 20,
              padding: 15,
              elevation: 2,
              marginBottom: 15,
              justifyContent: 'center',
              alignItems: 'center',
              width: width * 0.6,
              height: height > 850 ? height * 0.05 : height * 0.07,
            }}
          >
            <Text>Guardar</Text>
          </TouchableOpacity>
        </View>
      )}

      <ElementPressable 
      title="Cerrar Sesion"
      iconLabel="user-slash"
      sizeIcon={30}
      component={null}
      onPress={handleLogout}
      />



      {/* LEGAL */}

      <Text style={styles.headerTextSettings}>Legal</Text>
      {divider()}

      <ElementPressable 
      title="Terminos de uso"
      iconLabel="file-contract"
      sizeIcon={30}
      component={null}
      onPress={() => toggleModal(termsOfUse)}
      />

      <ElementPressable 
      title="Politica de privacidad"
      iconLabel="file-alt"
      sizeIcon={30}
      component={null}
      onPress={() => toggleModal(privacyPolicyText)}
      />


      {/* PAGINAS MODALES */}

      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
        <ScrollView>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22
        }}>
          <View style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          }}>
            <Text style={styles.modalText}>{modalText}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 10,
                elevation: 2,
                marginTop: 15,
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{ color: 'black' }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </Modal>

      <Modal
      animationType="slide" // Nueva sección de código para el modal de confirmación
      transparent={true}
      visible={confirmModalVisible}
      onRequestClose={() => {
        setConfirmModalVisible(!confirmModalVisible);
      }}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22
        }}>
          <View style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          }}>
            <Text style={styles.modalText}>¿Estás seguro de que quieres cambiar el usuario y la contraseña?</Text>
            <Text style={styles.modalText}>Se te pedirá que vuelvas a ingresar con tus nuevas credenciales</Text>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  marginRight: 10,
                }}
                onPress={() => setConfirmModalVisible(!confirmModalVisible)}
              >
                <Text style={{ color: 'black' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  marginLeft: 10,
                }}
                onPress={handleConfirmChange}
              >
                <Text style={{ color: 'black' }}>Cambiar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


    </View>
    </ScrollView>
    
  )
}

export default Conexion;