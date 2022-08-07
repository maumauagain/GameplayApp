import React, { useState, useCallback } from "react";
import { View, FlatList, Text } from 'react-native'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { Profile } from "../../components/Profile";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListHeader } from "../../components/ListHeader";
import { ListDivider } from "../../components/ListDivider";
import { Load } from "../../components/Load";

import { styles } from "./styles";
import { RootStackParamList } from "../RootStackParams";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/storage";

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export function Home() {
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<homeScreenProp>();
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);


    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(selectedGuild: AppointmentProps) {
        console.log(selectedGuild);
        navigation.navigate('AppointmentDetails', selectedGuild);
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments() {
        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storageResponse: AppointmentProps[] = storage ? JSON.parse(storage) : [];

        if (category) {
            setAppointments(storageResponse.filter(item => item.category === category));
        } else {
            setAppointments(storageResponse);
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();
    }, [category]));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
            />

            {
                loading
                    ? <Load />
                    :
                    <>
                        <ListHeader
                            title="Partidas agendadas"
                            subtitle={`Total ${appointments.length}`}
                        />

                        <FlatList
                            data={appointments}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Appointment
                                    data={item}
                                    onPress={() => handleAppointmentDetails(item)}
                                />
                            )}
                            ItemSeparatorComponent={() => <ListDivider />}
                            contentContainerStyle={{ paddingBottom: 69 }}
                            style={styles.matches}
                            showsVerticalScrollIndicator={false}
                        />
                    </>
            }
        </View>
    );

}
