import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.get('https://django-render-pacha-web.onrender.com/users/usuario/');
            const users = response.data;
            const user = users.find(u => u.usuario === usuario && u.password === password);

            if (user) {
                await AsyncStorage.setItem('userToken', JSON.stringify({ usuario, password }));
                navigation.replace('Tabs');
            } else {
                Alert.alert('Credenciales incorrectas', 'Por favor verificar');
            }
        } catch (error) {
            console.error('Error al autenticar:', error);
            Alert.alert('Error', 'Hubo un problema con la autenticación. Inténtalo de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/icon.png')} style={styles.logo} />
            <Text style={styles.welcomeText}>Empecemos esta aventura</Text>
            <Text style={styles.loginText}>Inicia Sesión</Text>
            <TextInput
                placeholder="Usuario"
                value={usuario}
                onChangeText={setUsuario}
                style={styles.input}
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a8d89d',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    loginText: {
        fontSize: 18,
        marginBottom: 30,
    },
    input: {
        width: '100%',
        marginBottom: 20,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login;
