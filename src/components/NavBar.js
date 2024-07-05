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
                height: height > 850 ? 120 : 80,
            },
            
        }}
        >
            <Tab.Screen name="Home" component={Sensors} options={{unmountOnBlur: true, headerShown: false,
            tabBarIcon: ({focused}) => (
                <View style={styles.NavBar.viewIcon}>
                    <Icon 
                    name="home"
                    size={height > 850 ? 50 : 30}
                    color= {focused ? COLORS.apple700 : COLORS.apple950}
                    />
                    <Text style={{color: focused ? COLORS.apple700 : COLORS.apple950, fontFamily: 'open-sans'}}>HOME</Text>
                </View>
            )}}
            />

            <Tab.Screen name="Wiki" component={Wiki} options={{ title: 'Catalago de plantas', headerStyle: {backgroundColor: COLORS.apple50},
            tabBarIcon: ({focused}) => (
                <View style={styles.NavBar.viewIcon}>
                    <Icon 
                        name="book"
                        size={height > 850 ? 50 : 30}
                        color= {focused ? COLORS.apple700 : COLORS.apple950}
                    />
                    <Text style={{color: focused ? COLORS.apple700 : COLORS.apple950, fontFamily: 'open-sans'}}>WIKI</Text>
                </View>
            )}}/>

            <Tab.Screen name="Expresiones" component={Caras} options={{ title: 'Expresiones de tu pacha', headerStyle: {backgroundColor: COLORS.apple50},
            tabBarIcon: ({focused}) => (
                <View style={styles.NavBar.viewIcon}>
                    <Icon 
                        name="smile-o"
                        size={height > 850 ? 50 : 30}
                        color= {focused ? COLORS.apple700 : COLORS.apple950}
                    />
                    <Text style={{color: focused ? COLORS.apple700 : COLORS.apple950, fontFamily: 'open-sans'}}>FACES</Text>
                </View>
            )}}/>

            <Tab.Screen name="Settings" component={Conexion} options={{ headerStyle: {backgroundColor: COLORS.apple50},
            tabBarIcon: ({focused}) => (
                <View style={styles.NavBar.viewIcon}>
                    <Icon 
                        name="gears"
                        size={height > 850 ? 50 : 30}
                        color= {focused ? COLORS.apple700 : COLORS.apple950}
                    />
                    <Text style={{color: focused ? COLORS.apple700 : COLORS.apple950, fontFamily: 'open-sans'}}>SETTINGS</Text>
                </View>
            )}}/>
        </Tab.Navigator>
    );
};

export default Tabs;