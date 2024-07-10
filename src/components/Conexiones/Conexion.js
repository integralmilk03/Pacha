import React, { useState, useRef } from 'react';
import { Text, View, Switch, TextInput, Pressable, Modal, TouchableOpacity, Alert } from 'react-native';
import styles, { width, height } from '../Styles/styles';
import { showMessage } from "react-native-flash-message";
import { COLORS } from '../Styles/color';
import { setPachaNickName } from '../Measurements/Main';
import Slider from '@react-native-community/slider';


import axios from 'axios';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Politic = 'Rodrigo Sebastian';
const TermsAndUse = 'Ramirez Uño';

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
    console.log(newNickName);
    newNickName ? setPachaNickName(newNickName) : Alert.alert('Error', 'No se ha ingresado apodo');
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
        description: "Advertencia. El riego ya no sera automatico",
        type: "warning",
        animationDuration: 325
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

  return (
    <View style={styles.switch.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[styles.switch.text, { color: COLORS.dun }]}>Modo manual</Text>
        <Switch
          value={isManual}
          onValueChange={isManual ? handleAutomatico : handleManual}
          trackColor={{ true: 'green', false: 'lightgreen' }}
          thumbColor={'grey'}
        />
      </View>


      {riegoVisible && <Pressable
        onPress={regadobomba}
        style={({ pressed }) => ({
          backgroundColor: pressed ? COLORS.apple500 : COLORS.apple50,
        })}
      >
        <Text style={[styles.switch.text, { color: COLORS.dun }]}>
          Regar planta
        </Text>
      </Pressable>}


      <Pressable
        onPress={toggleChangeUserModal}
        style={({ pressed }) => [
          { width: "100%", },
          pressed ? { backgroundColor: COLORS.apple100 } : { backgroundColor: COLORS.apple50 }
        ]}
      >
        <Text style={[styles.switch.text, { color: COLORS.dun }]}>Cambiar Usuario o Contraseña</Text>
      </Pressable>

      {changeUserModal && (
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

      <Pressable
        onPress={toggleNewNickName}
        style={({ pressed }) => [
          { width: "100%", },
          pressed ? { backgroundColor: COLORS.apple100 } : { backgroundColor: COLORS.apple50 }
        ]}
      >
        <Text style={[styles.switch.text, { color: COLORS.dun }]}>Cambiar Apodo</Text>
      </Pressable>

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


      <Pressable
        onPress={() => toggleModal(TermsAndUse)}
        style={({ pressed }) => [
          { width: "100%", },
          pressed ? { backgroundColor: COLORS.apple100 } : { backgroundColor: COLORS.apple50 }
        ]}
      >
        <Text style={[styles.switch.text, { color: COLORS.dun }]}>Terminos de uso</Text>
      </Pressable>

      <Pressable
        onPress={() => toggleModal(Politic)}
        style={({ pressed }) => [
          { width: "100%", },
          pressed ? { backgroundColor: COLORS.apple100 } : { backgroundColor: COLORS.apple50 }
        ]}
      >
        <Text style={[styles.switch.text, { color: COLORS.dun }]}>Politica de privacidad</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
          <Text style={{ fontFamily: 'open-sans', fontSize: 25, textAlign: 'justify' }}>
            {modalText}
          </Text>
        </View>
      </Modal>

      <Pressable
        onPress={handlerBrightness}
        style={({ pressed }) => [
          { width: "100%", },
          pressed ? { backgroundColor: COLORS.apple100 } : { backgroundColor: COLORS.apple50 }
        ]}
      >
        <Text style={[styles.switch.text, { color: COLORS.dun }]}>Brillo</Text>
      </Pressable>

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
        </View>
      }

      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          { width: "100%", },
          pressed ? { backgroundColor: COLORS.apple100 } : { backgroundColor: COLORS.apple50 }
        ]}
      >
        <Text style={[styles.switch.text, { color: COLORS.dun }]}>Cerrar Sesión</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
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
      </Modal>

      <Modal
        animationType="slide" // Nueva sección de código para el modal de confirmación
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={() => {
          setConfirmModalVisible(!confirmModalVisible);
        }}
      >
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
  )
}

export default Conexion;