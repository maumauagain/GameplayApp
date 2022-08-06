import React from 'react';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';

import { useAuth } from '../../hooks/auth';

import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { ButtonIcon } from '../../components/ButtonIcon';

export function SignIn() {
    console.log('SignIn/SignIn');

    const { loading, signIn } = useAuth();

    async function handleSignIn() {
        console.log('SignIn/handleSignin');
        try {
            await signIn();
        } catch (error: any) {
            Alert.alert(error);
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={IllustrationImg}
                style={styles.image}
                resizeMode="stretch"

            />

            <View style={styles.content}>
                <Text style={styles.title}>
                    Conecte-se {`\n`}
                    e organize suas {`\n`}
                    jogatinas
                </Text>

                <Text style={styles.subtitle}>
                    Crie grupos para jogar seu games {`\n`}
                    favoritos com seus amigos
                </Text>
                {
                    loading
                        ? <ActivityIndicator color={theme.colors.primary} />
                        : <ButtonIcon
                            title="Entrar com Discord"
                            onPress={handleSignIn}
                        />
                }


            </View>

        </View>
    );
}
