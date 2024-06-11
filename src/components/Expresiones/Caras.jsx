import React, {useState} from "react";
import { View, Text, Image, Pressable, ScrollView, ImageBackground, Modal, Dimensions } from "react-native";
import background from "../../../assets/Pacha-fondo8.jpeg";
import styles from "../Styles/styles.js";
import { expresiones } from "./valuesCaras.js";

const { width, height } = Dimensions.get('window');

const Caras = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExpresion, setSelectedExpresion] = useState(null);

    const openModal = (expresion) => {
        setSelectedExpresion(expresion);
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const carasImage = (expresion) => {
        return (
            <View key={expresion.label}>
                <Pressable onPress={() => openModal(expresion)} style={[styles.caras.expressionButton, styles.caras.expressionButtonShadow]}>
                    <View>
                        {/* No funciona si pasamos a styles los valores de arriba */}
                        <Image source={expresion.imageSource} style={styles.caras.expression} />
                    </View>
                </Pressable>
                <Text style={styles.caras.expressionText}>{expresion.label}</Text>
            </View>
        );
    };

    const carasHeader = () => {
        return (
            <View style={styles.caras.viewHeaderText}>
                <Text style={styles.caras.headertText}>
                    Expresiones de tu maceta
                </Text>
            </View>
        );
    };

    return (
    <ImageBackground source={background} style={styles.caras.image}>
    <View style={{paddingTop: 30, paddingBottom: 80,}}>    
        <ScrollView>
            {carasHeader()}
            <View style={styles.caras.expressionContainer}>
                {expresiones.map((expresion, index) => carasImage(expresion))}
            </View>
        </ScrollView>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        >
        <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            {selectedExpresion && (
            <View style={{ backgroundColor: '#1d3244', borderRadius: 10, width: '100%', height: '100%' }}>
            <Image
                style={{
                resizeMode: 'contain',
                width: '90%',
                height: height * 0.45,
                alignSelf: 'center'
                }}
                source={selectedExpresion.gifSource}
            />
            <ScrollView style={{ flex: 1, marginTop: 10 }}>
                <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 25, paddingHorizontal: 20 }}>
                {selectedExpresion.description}
                </Text>
            </ScrollView>
            <Pressable onPress={closeModal} style={{ marginTop: 10 }}>
                <Text style={{ color: '#e8ff65', textAlign: 'center', fontSize: 22, paddingVertical: 10 }}>
                Cerrar
                </Text>
            </Pressable>
            </View>)}
        </View>
        </Modal>
    </View>
    </ImageBackground>
    );
};

export default Caras;
