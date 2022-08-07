import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, FlatList, Alert, Share, Platform } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';

import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';
import { RootStackParamList } from '../RootStackParams';
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png';
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { Load } from '../../components/Load';

type appointmentDetailsScreenProp = StackNavigationProp<RootStackParamList, 'AppointmentDetails'>;

type Params = {
    selectedGuild: AppointmentProps
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number;
}

export function AppointmentDetails() {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    const route = useRoute<RouteProp<RootStackParamList, 'AppointmentDetails'>>();
    //const { selectedGuild } = route.params;
    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${route.params.guild.id}/widget.json`);
            setWidget(response.data);
        } catch {
            Alert.alert('Verifique as configurações do servidor. Será que o widget está habilitado? ');
        } finally {
            setLoading(false);
        }
    }

    // const members = [
    //     {
    //         id: '1',
    //         username: 'Biao',
    //         avatar_url: 'https://github.com/biancayamee.png',
    //         status: 'online'
    //     },
    //     {
    //         id: '2',
    //         username: 'Amauri',
    //         avatar_url: 'https://github.com/maumauagain.png',
    //         status: 'offline'
    //     }
    // ]

    const navigation = useNavigation<appointmentDetailsScreenProp>();

    function handleSignIn() {
        navigation.navigate('Home');
    }

    function handleShareInvitation() {
        const message = Platform.OS === 'ios'
            ? `Junte-se a ${route.params.guild.name}`
            : widget.instant_invite;

        Share.share({
            message,
            url: widget.instant_invite
        });
    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite);
    }

    useEffect(() => {
        fetchGuildWidget();
    }, []);

    return (
        <View style={styles.container}>
            <Header
                title="Detalhes"
                action={
                    route.params.guild.owner &&
                    <BorderlessButton onPress={handleShareInvitation}>
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
                        {route.params.guild.name}
                    </Text>

                    <Text style={styles.subtitle}>
                        {route.params.description}
                    </Text>
                </View>
            </ImageBackground>

            {
                loading ? <Load /> :
                    <>
                        <ListHeader
                            title="Jogadores"
                            subtitle={`Total ${widget.presence_count}`}
                        />

                        <FlatList
                            data={widget.members}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Member
                                    data={item}
                                />
                            )}
                            ItemSeparatorComponent={() => <ListDivider isCentered />}
                            style={styles.member}
                        />

                        <View style={styles.footer}>
                            <ButtonIcon
                                title='Entrar na Partida'
                                onPress={handleOpenGuild}
                            />
                        </View>
                    </>
            }

        </View>
    );
}
