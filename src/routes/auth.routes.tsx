import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { SignIn } from '../screens/SignIn';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';
import { RootStackParamList } from "../screens/RootStackParams";

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function AuthRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name="SignIn"
                component={SignIn}
            />
            <Screen
                name="Home"
                component={Home}
            />
            <Screen
                name="AppointmentDetails"
                component={AppointmentDetails}
            />
            <Screen
                name="AppointmentCreate"
                component={AppointmentCreate}
            />
        </Navigator>
    )
}
