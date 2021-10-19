

import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import SvgUri from 'react-native-svg-uri'; // SVG Package

export default function SVG({ navigation, width, height, nombre }) {


    return (
        <View>
            {
                nombre === 'Buscar' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/Lupa.svg')}
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
                    source={require('../assets/Group2.svg')}
                />
            }
            {
                nombre === 'OjoNoVisible' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/ojo.svg')}
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
            {
                nombre === 'Corazon' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/like.svg')}
                />
            }
            {
                nombre === 'CorazonRelleno' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/like2.svg')}
                />
            }
            {
                nombre === 'Subir' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/Subir.svg')}
                />
            }
            {
                nombre === 'Menu2' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/Group11.svg')}
                />
            }
            {
                nombre === 'Ubicacion' &&
                <SvgUri
                    width={width}
                    height={height}
                    source={require('../assets/ubicacion.svg')}
                />
            }
        </View>
    )

}

const styles = StyleSheet.create({

})
