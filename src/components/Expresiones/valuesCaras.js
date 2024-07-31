import React, {useState} from "react";

export const expresionId = {
    'Feliz': '1',
    'Triste': '2',
    'Me estoy ahogando': '3',
    'Quiero tomar sol': '4',

};
export const expresiones = [
    {
        label: 'Alegre',
        imageSource: require('../../../img/expresiones/expresionFelizImg.jpg'),
        gifSource: require('../../../img/expresiones/expresionFelizImg.jpg'),
        description: 'Este es un indicativo de que estas cuidando bien tu planta',
    },
    {
        label: 'Triste',
        imageSource: require('../../../img/expresiones/expresionTristeImg.jpg'),
        gifSource: require('../../../img/expresiones/expresionTristeImg.jpg'),
        description: 'Tal vez no estas teniendo los mejores cuidados',
    },
    {
        label: 'Ahogado',
        imageSource: require('../../../img/expresiones/aguaMuchoImg.jpg'),
        gifSource: require('../../../img/expresiones/aguaMuchoImg.jpg'),
        description: 'Hechaste demasiada agua a tu planta.',
    },
    {
        label: 'Calor',
        imageSource: require('../../../img/expresiones/solMuchoImg.jpg'),
        gifSource: require('../../../img/expresiones/solMuchoImg.jpg'),
        description: 'Tu planta estuvo mucho rato expuesta al sol, Resguardala'
    },
    {
        label: 'Sedienta',
        imageSource: require('../../../img/expresiones/Sedienta.png'),
        gifSource: require('../../../img/expresiones/Sedienta.png'),
        description: 'Riega a tu planta.',
    },
    {
        label: 'Frio',
        imageSource: require('../../../img/expresiones/muchoFrio.png'),
        gifSource: require('../../../img/expresiones/muchoFrio.png'),
        description: 'Esta haciendo mucho frio, resguarda a tu planta.',
    },
    {
        label: 'Vampiro',
        imageSource: require('../../../img/expresiones/ceroLuz.png'),
        gifSource: require('../../../img/expresiones/ceroLuz.png'),
        description: 'No hay luz',
    },
    {
        label: 'Aburrido',
        imageSource: require('../../../img/expresiones/Aburrido.png'),
        gifSource: require('../../../img/expresiones/Aburrido.png'),
        description: '...',
    },
];