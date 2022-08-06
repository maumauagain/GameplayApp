import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { SignIn } from '../screens/SignIn';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';
import { RootStackParamList } from "../screens/RootStackParams";
import { useAuth } from "../hooks/auth";

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function AuthRoutes() {
    const { user } = useAuth();
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {
                user.id ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <Screen
                            name="SignIn"
                            component={SignIn}
                        />
                    </>
                )
            }


        </Navigator>
    )
}
