import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';

import Wiki from "./Wiki/Wiki";
import Caras from "./Expresiones/Caras";
import Sensors from "./Measurements/Sensors";
import Conexion from "./Conexiones/Conexion";
import { StyleSheet, View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                tabBarStyle:{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: 'white',
                    borderRadius: 15,
                    height: 70,
                    ...styles.shadow,
                }
            }}
        >
            <Tab.Screen name="Home" component={Sensors} options={{unmountOnBlur: true, headerShown: false,
            tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Icon 
                        name="home"
                        size={30}
                        color= {focused ? 'tomato' : 'black'}
                    />
                    <Text style={{color: focused ? 'tomato' : 'black'}}>HOME</Text>
                </View>
            )}}/>
            <Tab.Screen name="Wiki" component={Wiki} options={{ headerShown: false,
            tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Icon 
                        name="book"
                        size={30}
                        color= {focused ? 'tomato' : 'black'}
                    />
                    <Text style={{color: focused ? 'tomato' : 'black'}}>WIKI</Text>
                </View>
            )}}/>
            <Tab.Screen name="Expresiones" component={Caras} options={{ headerShown: false,
            tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Icon 
                        name="smile-o"
                        size={30}
                        color= {focused ? 'tomato' : 'black'}
                    />
                    <Text style={{color: focused ? 'tomato' : 'black'}}>FACES</Text>
                </View>
            )}}/>
            <Tab.Screen name="Settings" component={Conexion} options={{
            tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Icon 
                        name="gears"
                        size={30}
                        color= {focused ? 'tomato' : 'black'}
                    />
                    <Text style={{color: focused ? 'tomato' : 'black'}}>SETTINGS</Text>
                </View>
            )}}/>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 10,
    }
});

export default Tabs;