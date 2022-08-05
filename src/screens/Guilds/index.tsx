import React from "react";
import { Text, View, FlatList } from "react-native";

import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

type Props = {
    handleSelectedGuild: (guild: GuildProps) => void;
}

export function Guilds({ handleSelectedGuild }: Props) {
    const guilds = [
        {
            id: '1',
            name: 'Lendarios',
            icon: 'imagem.png',
            owner: true
        },
        {
            id: '2',
            name: 'Galera do Game',
            icon: 'imagem.png',
            owner: true
        }
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={guilds}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Guild
                        data={item}
                        onPress={() => handleSelectedGuild(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider isCentered />}
                ListHeaderComponent={() => <ListDivider isCentered />}
                contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
                style={styles.guilds}
            />

        </View>
    );

}
