import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

import { RootStackParamList } from '../../screens/RootStackParams';
import { useNavigation } from "@react-navigation/native";

type appointmentDetailsScreenProp = StackNavigationProp<RootStackParamList, 'AppointmentDetails'>;

type Props = {
    title: string;
    action?: ReactNode;
}

export function Header({ title, action }: Props) {
    const { secondary100, secondary40, heading } = theme.colors
    const navigation = useNavigation<appointmentDetailsScreenProp>();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <LinearGradient
            colors={[secondary100, secondary40]}
            style={styles.container}
        >
            <BorderlessButton onPress={handleGoBack}>
                <Feather
                    name="arrow-left"
                    size={24}
                    color={heading}
                />
            </BorderlessButton>

            <Text style={styles.title}>
                {title}
            </Text>

            {
                action ?
                    <View>
                        {action}
                    </View>
                    :
                    <View style={{ width: 24 }} />
            }

        </LinearGradient>
    );

}
