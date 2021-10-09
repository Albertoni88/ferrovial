

import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native'
// import { SvgXml } from 'react-native-svg';
// import Svg, { Circle } from 'react-native-svg';

// import SvgUri from 'react-native-svg-uri';
// import Buscar from '../assets/Buscar.svg';
// import { SvgXml } from 'react-native-svg'

import SvgUri from 'react-native-svg-uri'; // SVG Package

export default function SVG({ navigation, width, height, nombre }) {


    return (
        <View>
            {
                nombre === 'Buscar' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/Buscar.svg')}
                />
            }
            {
                nombre === 'VolverPrimario' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/Volver-primario.svg')}
                />
            }
            {
                nombre === 'Volver' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/Volver-gris.svg')}
                />
            }
            {
                nombre === 'Cerrar' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/Cerrar.svg')}
                />
            }
            {
                nombre === 'OjoVisible' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/Visible.svg')}
                />
            }
            {
                nombre === 'OjoNoVisible' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/No-visible.svg')}
                />
            }
            {
                nombre === 'Perfil' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/perfil/perfil.svg')}
                />
            }
            {
                nombre === 'Feedback' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/perfil/feedback.svg')}
                />
            }
            {
                nombre === 'Faq' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/perfil/faq.svg')}
                />
            }
            {
                nombre === 'Avisos' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/perfil/legal.svg')}
                />
            }
            {
                nombre === 'Politicas' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/perfil/politicapriv.svg')}
                />
            }
            {
                nombre === 'InfoTec' &&
                <SvgUri                
                    width={width}
                    height={height}
                    source={require('../assets/perfil/infotec.svg')}
                />
            }
            {
                nombre === 'InfoProd' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/perfil/infoprod.svg')}
                />
            }
        </View>
    )

}

const styles = StyleSheet.create({

})
