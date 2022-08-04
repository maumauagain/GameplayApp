import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';

import { styles } from './styles';
import { RootStackParamList } from '../RootStackParams';
import { theme } from '../../global/styles/theme';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';

type appointmentCreateScreenProp = StackNavigationProp<RootStackParamList, 'AppointmentCreate'>;


export function AppointmentCreate() {
    const [category, setCategory] = useState('');
    const [openGuildsModal, setOpenGuildsModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
    const navigation = useNavigation<appointmentCreateScreenProp>();

    function handleSignIn() {
        navigation.navigate('Home');
    }

    function handleOpenGuilds() {
        setOpenGuildsModal(true);
    }

    function handleGuildSelect(selectedGuild: GuildProps) {
        setGuild(selectedGuild);
        setOpenGuildsModal(false);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}

        >
            <ScrollView>
                <View>
                    <Header
                        title="Agendar Partida"
                    />

                    <Text style={[
                        styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}
                    >
                        Categoria
                    </Text>

                    <CategorySelect
                        hasCheckBox
                        setCategory={setCategory}
                        categorySelected={category}
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                {
                                    guild.icon ? <GuildIcon /> : <View style={styles.image} />
                                }

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name ? guild.name : 'Selecione um sevidor'}
                                    </Text>
                                </View>

                                <Feather
                                    name="chevron-right"
                                    color={theme.colors.heading}
                                    size={18}
                                />


                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            <View>
                                <Text style={styles.label}>
                                    Dia e mês
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput />

                                </View>
                            </View>

                            <View>
                                <Text style={styles.label}>
                                    Hora e minuto
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput />

                                </View>
                            </View>

                        </View>

                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>
                                Descrição
                            </Text>

                            <Text style={styles.caracteresLimit}>
                                Max 100 caracteres
                            </Text>
                        </View>

                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                        />

                        <View style={styles.footer}>
                            <Button
                                title='Agendar'
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <ModalView visible={openGuildsModal}>
                <Guilds handleSelectedGuild={handleGuildSelect} />
            </ModalView>
        </KeyboardAvoidingView>
    );
}
