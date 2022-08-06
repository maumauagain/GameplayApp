import React from "react";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { SignIn } from "../screens/SignIn";

import { AuthRoutes } from './auth.routes';
import { useAuth } from "../hooks/auth";

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent'
    },
};

export function Routes() {
    const { user } = useAuth();
    return (
        <NavigationContainer
            theme={navTheme}
        >
            <AuthRoutes />
            {/* <SignIn /> */}

        </NavigationContainer>
    );
}
