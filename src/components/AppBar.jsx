import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Link, useLocation } from 'react-router-native';
import styles from "./Styles/styles.js";

const AppBarTab = ({ children, to}) => {
    const { pathname } = useLocation()
    const active = pathname === to
    const textStyles = [
        styles.appBar.text,
        active && styles.appBar.active,
    ]
    return(
        <Link to={to}>
            <Text style={textStyles}>
                {children}
            </Text>
        </Link>
    )
}

const AppBar = () => {
    return(
        <View style={styles.appBar.container}>
            <ScrollView horizontal style={styles.appBar.scroll}>
                <AppBarTab to='/'>Inicio</AppBarTab>
                <AppBarTab to='/Wiki'>Wiki "Conoce Tu Planta :D"</AppBarTab>
                <AppBarTab to='/Expresiones'>Expresiones</AppBarTab>
                <AppBarTab to='/Configuracion'>Configuraciones</AppBarTab>
            </ScrollView>
        </View>
    )
}
export default AppBar