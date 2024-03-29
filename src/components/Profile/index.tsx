import React from "react";
import { Text, View, Alert } from "react-native";
import { useAuth } from "../../hooks/auth";
import { Avatar } from "../Avatar";
import { styles } from "./styles";
import { RectButton } from 'react-native-gesture-handler';

export function Profile() {
    const { user, SignOut } = useAuth();

    function handleSignOut() {
        Alert.alert('Logout', 'Deseja realmente sair?',
            [{
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: () => SignOut()
            }]);
    }

    return (
        <View style={styles.container}>

            <RectButton onPress={handleSignOut}>
                <Avatar urlImage={user.avatar} />
            </RectButton>

            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>

                    <Text style={styles.username}>
                        {user.firstName}
                    </Text>
                </View>

                <Text style={styles.message}>
                    Hoje é dia de vitória
                </Text>
            </View>


        </View>
    );

}
