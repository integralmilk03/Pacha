import React, {useState} from "react";

export const expresionId = {
    'Feliz': '1',
    'Triste': '2',
    'Me estoy ahogando': '3',
    'Quiero tomar sol': '4',

};
export const expresiones = [
    {
        label: 'Feliz',
        imageSource: require('../../../img/expresiones/expresionFelizImg.jpg'),
        gifSource: require('../../../img/expresiones/expresionFeliz.gif'),
        description: 'Este es un indicativo de que estas cuidando bien tu planta',
    },
    {
        label: 'Triste',
        imageSource: require('../../../img/expresiones/expresionTristeImg.jpg'),
        gifSource: require('../../../img/expresiones/expresionTriste.gif'),
        description: 'Tal vez no estas teniendo los mejores cuidados',
    },
    {
        label: 'Sed',
        imageSource: require('../../../img/expresiones/aguaMuchoImg.jpg'),
        gifSource: require('../../../img/expresiones/aguaMucho.gif'),
        description: 'Riega a tu planta, no queremos que se deshidrate',
    },
    {
        label: 'Calor',
        imageSource: require('../../../img/expresiones/solMuchoImg.jpg'),
        gifSource: require('../../../img/expresiones/solMucho.gif'),
        description: 'Tu planta estuvo mucho rato expuesta al sol, Resguardala'
    },
];