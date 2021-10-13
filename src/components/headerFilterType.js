import React, { useState, useEffect, useRef, createRef } from 'react';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';
import { View, Platform, Dimensions, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { marginTop } from 'styled-system';
import SVG from './svg';
import {
    guardarIncidencias,
} from '../store/actions/incidenciaActions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HeaderFilterType({ navigation, filtrar }) {


    const dispatch = useReduxDispatch();

    const [searchString, setsearchString] = useState('');
    const [cruz, setCruz] = useState(false);
    const marcados = useReduxSelector((state) => state.user.marcados);
    const incidenciasOriginals = useReduxSelector((state) => state.incidencia.incidenciasOriginals);
    const filtros = useReduxSelector((state) => state.user.filtros);

    const FiltrarTipo = () => {
        
        var filtradasIncidencias = [];
        marcados.forEach((element, index) => {
            if(element === true){                
                incidenciasOriginals.forEach((inc, index1) => {                
                   if(inc.tipo_incidencia === filtros[index].nombre){
                       filtradasIncidencias.push(incidenciasOriginals[index1]);
                   }
               });
            }
        });
        navigation.navigate('Main');
        dispatch(guardarIncidencias(filtradasIncidencias));
    }
    return (
        <View style={styles.containerWebView}>
            <TouchableOpacity
                style={styles.iconBackContainer}
                onPress={() => navigation.goBack()}
            >
                <View style={styles.containerSVG}>
                    <SVG nombre={'VolverPrimario'} width={20} height={20} />
                </View>
                {/* <Icon style={{ marginTop: 40, left: 35, zIndex: 111 }} name="ios-search" size={20} color="#000" /> */}
                <View style={{ marginTop: 37, left: 20, zIndex: 111 }}>
                    <SVG nombre={'Buscar'} width={20} height={20} />
                </View>
                <TextInput
                    value={searchString}
                    autoFocus={true}
                    style={styles.input}
                    placeholder="Buscar..."
                    placeholderTextColor={COLORS.browngrey}
                    onChangeText={(searchString) => {
                        setsearchString(searchString);
                        if (searchString !== '') {
                            setCruz(true);
                        }
                        if (searchString === '') {
                            setCruz(false);
                        }
                        filtrar(searchString);
                    }}
                    underlineColorAndroid="transparent"
                >
                </TextInput>
                {
                    cruz === true &&
                    <Icon
                        style={{
                            marginLeft: -45,
                            marginTop: 32,
                            //textAlign: 'right',
                            flex: 0.9
                        }}
                        onPress={() => {
                            setsearchString('');
                            setCruz(false);
                            filtrar('');
                        }}
                        name="close-outline"
                        color={COLORS.browngrey}
                        size={27}
                    />
                    // <View style={styles.containerSVGCLOSE}>
                    //     <SVG nombre={'Cerrar'} width={20} height={20} />
                    // </View>
                }
                <Text
                    onPress={() => {
                        FiltrarTipo();
                    }}
                    style={{
                        marginLeft: cruz === true ? -30 : 0,
                        marginTop: 30,
                        marginRight: 0,
                        width: Platform.OS === 'ios' ? 43 : 50,
                        height: 17,
                        fontFamily: "poppins-medium",
                        fontSize: Platform.OS === 'ios' ? 12 : 11,
                        fontWeight: "500",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        textAlign: "left",
                        color: COLORS.primary
                    }}>
                    Aplicar
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    containerSVG: {

        marginLeft: 12,
        zIndex: 1111111,
        width: 15,
        height: 15,
        borderStyle: "solid",
        borderColor: COLORS.primary,
        marginTop: 31
    },
    containerSVGCLOSE: {
        //borderWidth : 3,
        marginLeft: -5,
        zIndex: 1111111,
        width: 30,
        height: 30,
        borderStyle: "solid",
        borderColor: COLORS.primary,
        marginTop: 51
    },
    containerWebView: {
        // top: 12,
        height: 108,
        zIndex: 9999,
        width: '100%',
        height: 88,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 10,
        shadowOpacity: 1,

    },
    input: {
        left: -10,
        marginTop: 35,
        paddingLeft: 45,
        width: 315,
        height: 44,
        borderRadius: 12,
        backgroundColor: COLORS.VERY_LIGHT_PINK
    },
    iconBackContainer: {
        backgroundColor: 'white',
        height: 108,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    close: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 30,
        top: 5,
    },
    logo: {
        width: '25%',
        height: '60%',
        marginTop: 10,
        resizeMode: 'contain',
        marginLeft: 120,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
