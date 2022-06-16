
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Profile } from '../screens';
import React, { Component } from 'react'
import navigationStrings from '../constants/navigationStrings';
import { NavigationContainer } from '@react-navigation/native';
import navigationService from './navigationService';



const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer ref={ref => {
            navigationService.setTopLevelNavigator(ref)
        }}>
            <Stack.Navigator>
                <Stack.Screen name={navigationStrings.Home} component={Home} />
                <Stack.Screen name={navigationStrings.Profile} component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
