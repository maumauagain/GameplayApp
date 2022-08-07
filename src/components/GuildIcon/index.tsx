import React, { ReactNode } from "react";
import { Image } from 'react-native';

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

const { CDN_IMAGE } = process.env;

type Props = {
    guildId: string | null;
    iconId: string | null;
}

export function GuildIcon({ guildId, iconId }: Props) {
    let uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
    if (!iconId) {
        uri = 'https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png';
    }

    return (
        <Image
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
        />
    )

}
