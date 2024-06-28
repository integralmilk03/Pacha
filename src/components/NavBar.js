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
import { useTheme } from "@react-navigation/native";


const Tab = createBottomTabNavigator();

const Tabs = () => {
    const { colors } = useTheme();
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: COLORS.darkGreen,
            tabBarInactiveTintColor: COLORS.dun,
            tabBarShowLabel: false,
            tabBarStyle:{
                position: 'absolute',
                backgroundColor: colors.card,
                height: height > 850 ? 120 : 80,
            }
        }}
        >
            <Tab.Screen name="Home" component={Sensors} options={{unmountOnBlur: true, headerShown: false,
            tabBarIcon: ({focused}) => (
                <View style={styles.NavBar.viewIcon}>
                    <Icon 
                    name="home"
                    size={height > 850 ? 50 : 30}
                    color= {focused ? COLORS.darkGreen : COLORS.dun}
                    />
                    <Text style={{color: focused ? COLORS.darkGreen : COLORS.dun}}>HOME</Text>
                </View>
            )}}/>
            <Tab.Screen name="Wiki" component={Wiki} options={{ headerShown: false,
            tabBarIcon: ({focused}) => (
                <View style={styles.NavBar.viewIcon}>
                    <Icon 
                        name="book"
                        size={height > 850 ? 50 : 30}
                        color= {focused ? COLORS.darkGreen : COLORS.dun}
                    />
                    <Text style={{color: focused ? COLORS.darkGreen : COLORS.dun}}>WIKI</Text>
                </View>
            )}}/>
            <Tab.Screen name="Expresiones" component={Caras} options={{ headerShown: false,
            tabBarIcon: ({focused}) => (
                <View style={styles.NavBar.viewIcon}>
                    <Icon 
                        name="smile-o"
                        size={height > 850 ? 50 : 30}
                        color= {focused ? COLORS.darkGreen : COLORS.dun}
                    />
                    <Text style={{color: focused ? COLORS.darkGreen : COLORS.dun}}>FACES</Text>
                </View>
            )}}/>
            <Tab.Screen name="Settings" component={Conexion} options={{
            tabBarIcon: ({focused}) => (
                <View style={styles.NavBar.viewIcon}>
                    <Icon 
                        name="gears"
                        size={height > 850 ? 50 : 30}
                        color= {focused ? COLORS.darkGreen : COLORS.dun}
                    />
                    <Text style={{color: focused ? COLORS.darkGreen : COLORS.dun}}>SETTINGS</Text>
                </View>
            )}}/>
        </Tab.Navigator>
    );
};

export default Tabs;