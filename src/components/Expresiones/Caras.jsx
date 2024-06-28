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

    return (
    // <ImageBackground source={background} style={styles.caras.image}>
    <View style={styles.caras.container}>    
        <ScrollView>
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
        <View style={ styles.caras.modalContaier }>
            {selectedExpresion && (
            <View style={styles.caras.modalSubContainer}>
            <Image
                style={styles.caras.modalImage}
                source={selectedExpresion.gifSource}
            />
            <ScrollView style={styles.caras.modalScroll}>
                <Text style={styles.caras.modalText}>
                {selectedExpresion.description}
                </Text>
            </ScrollView>
            <Pressable onPress={closeModal} style={styles.caras.pressable}>
                <Text style={styles.caras.pressableButton}>
                Cerrar
                </Text>
            </Pressable>
            </View>)}
        </View>
        </Modal>
    </View>
    // </ImageBackground>
    );
};

export default Caras;
