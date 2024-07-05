import React, { useState } from 'react';
import { Text, View, Switch, TextInput, Pressable, Modal, TouchableOpacity, Alert } from 'react-native';
import styles, {width, height} from '../Styles/styles';
import { showMessage } from "react-native-flash-message";
import { COLORS } from '../Styles/color';
import { setPachaNickName } from '../Measurements/Main';

const Politic = 'Rodrigo Sebastian';
const TermsAndUse = 'Ramirez Uño';

const Conexion = () => {


  const [isManual, setIsManual] = useState(false);
  const [changeUserModal, setChangeUserModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changeNickNameModal, setChangeNickNameModal] = useState(false);
  const [newNickName, setNewNickName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  
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

  const handleSaveUser = () => {
    console.log("Nuevo usuario guardado:", newUsername);
    console.log("Nueva contraseña: ", newPassword);
    showMessage({
      message: "Cambios guardados",
      description: `Se actualizaron los datos de usuario y contraseña`,
      type: "success",
      animationDuration: 1500,
    });
    setNewUsername('');
    
    toggleChangeUserModal();
  };

  const handleNickName = () => {
    console.log(newNickName);
    newNickName ? setPachaNickName(newNickName) : Alert.alert('Error', 'No se ha ingresado apodo');
    setNewNickName('');
    toggleNewNickName();
    showMessage({
      message: "Nuevo Apodo",
      description: `Tu Pacha esta feliz con su nuevo nombre`,
      type: "success",
      animationDuration: 1500,
    });
  };

  return (
  <View style={styles.switch.container}>


    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={[styles.switch.text, {color: COLORS.dun}]}>Modo manual</Text>
      <Switch 
      value={isManual}
      onValueChange={ 
      isManual ? 
      (() => {
        setIsManual((previousState) => !previousState)
        console.log('Modo automatico')
        showMessage({
          message: "Modo Automatico",
          description: "Activado sistema de riego automatico",
          type: "success",
          animationDuration: 325,
        });
      }):
      (() => {
        setIsManual((previousState) => !previousState)
        console.log("Modo Manual")
        showMessage({
          message: "Modo manual",
          description: "Advertencia. El riego ya no sera automatico",
          type: "warning",
          animationDuration: 325})
      })
      }
      trackColor={{true: 'green', false: 'lightgreen'}}
      thumbColor={'grey'}/>
    </View>
    
    
    <Pressable
    onPress={toggleChangeUserModal}
    style={({ pressed }) => [
      {width: "100%", },
      pressed ? { backgroundColor: COLORS.apple100} : { backgroundColor: COLORS.apple50 }
    ]}
    >
      <Text style={[styles.switch.text, {color: COLORS.dun}]}>Cambiar Usuario o Contraseña</Text>
    </Pressable>

    {changeUserModal && (
        <View style={{alignItems: 'center'}}>
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
            onPress={handleSaveUser}
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
      {width: "100%", },
      pressed ? { backgroundColor: COLORS.apple100} : { backgroundColor: COLORS.apple50 }
    ]}
    >
      <Text style={[styles.switch.text, {color: COLORS.dun}]}>Cambiar Apodo</Text>
    </Pressable>

    {changeNickNameModal && (
        <View style={{alignItems: 'center'}}>

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
            placeholder="Nuevo Apodo"
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
        {width: "100%", },
        pressed ? { backgroundColor: COLORS.apple100} : { backgroundColor: COLORS.apple50 }
      ]}
      >
        <Text style={[styles.switch.text, {color: COLORS.dun}]}>Terminos de uso</Text>
      </Pressable>

      <Pressable
      onPress={() => toggleModal(Politic)}
      style={({ pressed }) => [
        {width: "100%", },
        pressed ? { backgroundColor: COLORS.apple100} : { backgroundColor: COLORS.apple50 }
      ]}
      >
        <Text style={[styles.switch.text, {color: COLORS.dun}]}>Politica de privacidad</Text>
      </Pressable>

      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
      setModalVisible(!modalVisible);
      }}
        >
          <View style={{flex: 1, backgroundColor: 'lightgray'}}>
            <Text style={{fontFamily: 'open-sans', fontSize: 25, textAlign: 'justify'}}>
              {modalText}
            </Text>
          </View>
        </Modal>

  </View>
)}

export default Conexion;