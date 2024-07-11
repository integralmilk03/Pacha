import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
// Our Components
import Wiki from "./Wiki/Wiki";
import Caras from "./Expresiones/Caras";
import Sensors from "./Measurements/Main.js";
import Conexion from "./Conexiones/Conexion";
import { View, Text } from "react-native";
import { COLORS } from './Styles/color.js';
import styles, {height} from "./Styles/styles.js";

// Screen1.navigationOptions = {
//     headerStyle: {
//       backgroundColor: 'blue',
//     },
// };

const iconHeight = height > 850 ? 55 : 25;



const Tab = createBottomTabNavigator();

const Tabs = () => {
    
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: COLORS.apple700,
            tabBarInactiveTintColor: COLORS.apple950,
            tabBarShowLabel: false,
            tabBarStyle:{
                backgroundColor: 'white',
                height: height > 850 ? 110 : 60,
            },
        }}
        >
            <Tab.Screen name="Home" component={Sensors} options={{unmountOnBlur: true, headerShown: false,
            tabBarIcon: ({focused}) => (
                <View style={styles.NavBar.viewIcon}>
                    <Icon 
                    name="home"
                    size={iconHeight}
                    color= {focused ? COLORS.apple700 : COLORS.apple950}
                    />
                    <Text style={[styles.NavBar.text, {color: focused ? COLORS.apple700 : COLORS.apple950}]}>HOME</Text>
                </View>
            )}}
            />

            <Tab.Screen name="Wiki" component={Wiki} options={{ title: 'Catalago de plantas', headerTitleStyle: {fontSize: height > 850 ? height * 0.015 : height * 0.025}, headerStyle: {backgroundColor: COLORS.apple50},
            tabBarIcon: ({focused}) => (
                <View style={styles.NavBar.viewIcon}>
                    <Icon 
                        name="book"
                        size={iconHeight}
                        color= {focused ? COLORS.apple700 : COLORS.apple950}
                    />
                    <Text style={[styles.NavBar.text, {color: focused ? COLORS.apple700 : COLORS.apple950}]}>WIKI</Text>
                </View>
            )}}/>

            <Tab.Screen name="Expresiones" component={Caras} options={{ title: 'Expresiones de tu pacha', headerTitleStyle: {fontSize: height > 850 ? height * 0.015 : height * 0.025}, headerStyle: {backgroundColor: COLORS.apple50},
            tabBarIcon: ({focused}) => (
                <View style={styles.NavBar.viewIcon}>
                    <Icon 
                        name="smile-o"
                        size={iconHeight}
                        color= {focused ? COLORS.apple700 : COLORS.apple950}
                    />
                    <Text style={[styles.NavBar.text, {color: focused ? COLORS.apple700 : COLORS.apple950}]}>FACES</Text>
                </View>
            )}}/>

            <Tab.Screen name="Settings" component={Conexion} options={{ headerStyle: {backgroundColor: COLORS.apple50},
            tabBarIcon: ({focused}) => (
                <View style={styles.NavBar.viewIcon}>
                    <Icon 
                        name="gears"
                        size={iconHeight}
                        color= {focused ? COLORS.apple700 : COLORS.apple950}
                    />
                    <Text style={[styles.NavBar.text, {color: focused ? COLORS.apple700 : COLORS.apple950}]}>SETTINGS</Text>
                </View>
            )}}/>
        </Tab.Navigator>
    );
};

export default Tabs;