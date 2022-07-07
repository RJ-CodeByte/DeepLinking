
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Profile } from '../screens';
import React, { Component } from 'react'
import navigationStrings from '../constants/navigationStrings';
import { NavigationContainer } from '@react-navigation/native';
import navigationService from './navigationService';
import Camera from '../screens/Camera/Camera';



const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer ref={ref => {
            navigationService.setTopLevelNavigator(ref)
        }}>
            <Stack.Navigator>
                <Stack.Screen name={navigationStrings.Home} component={Home} />
                <Stack.Screen name={navigationStrings.Profile} component={Profile} />
                <Stack.Screen name={navigationStrings.Camera} options={{ headerShown: false }} component={Camera} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
