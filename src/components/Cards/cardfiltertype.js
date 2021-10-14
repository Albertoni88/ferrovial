import React, { useState, useEffect, useRef, createRef } from 'react';
import { Button, ImageBackground, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import { COLORS } from '../../constants';
import SVG from '../svg';
import { SvgCssUri } from 'react-native-svg';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';

export default function CardFilterType({ filter, filtronombre, navigation, props, marcado, marcadoauxiliar, changemarcado, indice }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const image = { uri: require("../../assets/1.png") };
    const filtroProps = filtronombre;
    const marcados = useReduxSelector((state) => state.user.marcados);

    useEffect(() => {
        // alert("marcado " + JSON.stringify(marcado));
        //alert("filter.nombre " + JSON.stringify(filter));
    }, []);

    if (filter !== null && filter !== undefined && filter !== []) {
        return (
            // <View style = {{flex : 1 }}>
            //     <Text style = {{ fontSize :12}}>asasd</Text>
            // </View>

            <View style={{
                // marginTop: 5,
                // backgroundColor: 'white',
                // borderWidth : 3,
                // width: '100%',
                // height: 60,
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                height: 44,
                backgroundColor: 'white',
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: {
                    width: 0,
                    height: -10
                },
                shadowRadius: 10,
                shadowOpacity: 1,
                marginBottom: 2,
            }}>
                {/* <Icon style={{ marginLeft: 10, alignItems: 'center', justifyContent: 'center', }} name="ios-search" size={20} color={marcado ? COLORS.primary : COLORS.browngrey} /> */}
                {/* <SVG nombre={'Perfil'} width={20} height={20} /> */}
                {
                    filtronombre === 'tipo' &&
                    <View style={{ width: 45, height: 45, }}>
                        <SvgCssUri
                            width="100%"
                            height="100%"
                            uri={filter.imagen}
                        />
                    </View>
                }
                {
                    (marcados !== null && marcados !== undefined) &&
                    <Text style={{
                        // fontSize: 15,
                        // alignItems: 'center',
                        color: marcados[indice] ? COLORS.primary : COLORS.browngrey,
                        width: 200,
                        height: 22,
                        fontFamily: "nunito-semibold",
                        fontSize: 16,
                        fontWeight: "600",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        marginLeft: 6,
                        marginRight: 125
                    }}>
                        {filter.nombre}
                    </Text>
                }
                {
                    // ((marcados !== null && marcados !==undefined) && marcados[indice] === true) &&
                    (marcado === true) &&
                    <View style={filtronombre === 'tipo' ? styles.containerSVG : styles.containerSVG1}>
                        <TouchableOpacity
                            onPress={() => {
                                //alert("indice " + indice);
                                changemarcado(indice, marcadoauxiliar);
                            }}
                        >
                            <SVG
                                nombre={'OjoVisible'}
                                width={25} height={25}
                            />
                        </TouchableOpacity>
                    </View>
                }
                {
                    // ((marcados !== null && marcados !==undefined) && marcados[indice] === false) &&
                    (marcado === false) &&
                    <View style={filtronombre === 'tipo' ? styles.containerSVG : styles.containerSVG1}>
                        <TouchableOpacity
                            onPress={() => {
                                //alert("indiceno " + indice);
                                changemarcado(indice, marcadoauxiliar);
                            }}
                        >
                            <SVG
                                nombre={'OjoNoVisible'}
                                width={25} height={25}
                            />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    } else {
        return null;
    }

}
const styles = StyleSheet.create({
    containerSVG: {
        marginRight: 15,
        zIndex: 1111111,
        width: 25,
        height: 25,
        borderStyle: "solid",
        borderColor: COLORS.primary,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15,        
    },
    containerSVG1: {
        marginRight: 15,
        zIndex: 1111111,
        width: 25,
        height: 25,
        borderStyle: "solid",
        borderColor: COLORS.primary,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15,
        left : 50,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 200,
        width: 350,
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 10,
    },
    imageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        //resizeMode: 'contain',
    },
});