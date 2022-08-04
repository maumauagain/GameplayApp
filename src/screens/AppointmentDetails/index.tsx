import React, { useState } from 'react';
import { View, Text, ImageBackground, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';

import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';
import { RootStackParamList } from '../RootStackParams';
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png';

type appointmentDetailsScreenProp = StackNavigationProp<RootStackParamList, 'AppointmentDetails'>;


export function AppointmentDetails() {
    const members = [
        {
            id: '1',
            username: 'Biao',
            avatar_url: 'https://github.com/biancayamee.png',
            status: 'online'
        },
        {
            id: '2',
            username: 'Amauri',
            avatar_url: 'https://github.com/maumauagain.png',
            status: 'offline'
        }
    ]

    const navigation = useNavigation<appointmentDetailsScreenProp>();

    function handleSignIn() {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <Header
                title="Detalhes"
                action={
                    <BorderlessButton>
                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />

                    </BorderlessButton>
                }
            />

            <ImageBackground
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        Lendários
                    </Text>

                    <Text style={styles.subtitle}>
                        É hoje que vamos chegar ao challenger sem perder uma partida da md10
                    </Text>
                </View>
            </ImageBackground>

            <ListHeader
                title="Jogadores"
                subtitle="Total 3"
            />

            <FlatList
                data={members}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Member
                        data={item}
                    />
                )}
                ItemSeparatorComponent={() => <ListDivider />}
                style={styles.member}
            />

            <View style={styles.footer}>
                <ButtonIcon
                    title='Entrar na Partida'
                />
            </View>

        </View>
    );
}
