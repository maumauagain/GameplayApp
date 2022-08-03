import React from "react";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent'
    },
};

export function Routes() {
    return (
        <NavigationContainer
            theme={navTheme}
        >
            <AuthRoutes />
        </NavigationContainer>
    );
}
