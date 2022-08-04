declare module "*.svg" {
    import React from "react";
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>; //Dizendo que o conteúdo é um Functional Component de SvgProps
    export default content;
}
