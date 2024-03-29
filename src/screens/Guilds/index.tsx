import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";

import { Guild, GuildProps } from '../../components/Guild';
import { Load } from "../../components/Load";
import { ListDivider } from '../../components/ListDivider';

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { api } from "../../services/api";

type Props = {
    handleSelectedGuild: (guild: GuildProps) => void;
}

export function Guilds({ handleSelectedGuild }: Props) {
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds');

        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchGuilds();
    }, []);

    return (
        <View style={styles.container}>
            {
                loading ?
                    <Load /> :
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
            }

        </View>
    );

}
