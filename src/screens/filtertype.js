import React, { useState, useEffect, useRef, createRef } from 'react';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';
import {
    guardarFiltros,
    guardarFiltrosOriginals,
    guardarMarcados,
    guardarMarcadosArray,
    guardarMarcadosOriginals
} from '../store/actions/userActions';
import { Button, ScrollView, Dimensions, Image, TextInput, View, Text, TouchableOpacity, Modal, Alert, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderFilterType from '../components/headerFilterType';
import CardFilterType from '../components/Cards/cardfiltertype';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Buscar from '../assets/Buscar.svg'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { URL_SERVER } from '../constants/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from '../store/reducers/userReducer';
import {
    filtroTipo,
    filtroEstado,
    filtroInteraccion
} from '../store/actions/incidenciaActions';

export default function FilterType({ navigation, route, props }) {

    const dispatch = useReduxDispatch();



    const filtros = useReduxSelector((state) => state.user.filtros);
    const filtrosOriginals = useReduxSelector((state) => state.user.filtrosOriginals);
    const marcados = useReduxSelector((state) => state.user.marcados);
    const marcadosAuxiliar = useReduxSelector((state) => state.user.marcadosOriginals);

    const token = useReduxSelector((state) => state.user.access_token);
    //const filtros = useState(useReduxSelector((state) => state.user.filtros));

    useEffect(() => {
        if (route.params.filtro === 'tipo') {
            filtroTipo(token)
                .then(async response => {
                    dispatch(guardarFiltros(response.data))
                    dispatch(guardarFiltrosOriginals(response.data))
                    dispatch(guardarMarcados(true))
                    dispatch(guardarMarcadosOriginals(false))
                })
                .catch(error => {
                    
                });
        }
        if (route.params.filtro === 'estado') {
            filtroEstado(token)
                .then(async response => {
                    dispatch(guardarFiltros(response.data))
                    dispatch(guardarFiltrosOriginals(response.data))
                    dispatch(guardarMarcados(true))
                    dispatch(guardarMarcadosOriginals(false))
                })
                .catch(error => {
                    
                });
        }
        if (route.params.filtro === 'interaccion') {
            filtroInteraccion(token)
                .then(async response => {
                    dispatch(guardarFiltros(response.data))
                    dispatch(guardarFiltrosOriginals(response.data))
                    dispatch(guardarMarcados(true))
                    dispatch(guardarMarcadosOriginals(false))
                })
                .catch(error => {
                    
                });
        }
    }, []);
    const Filtrar = (searchString) => {
        if (searchString === '') {
            dispatch(guardarFiltros(filtrosOriginals))
            dispatch(guardarMarcados(true))
        } else {
            var filtrados = [];
            filtros.forEach(element => {
                if (element.nombre.toLowerCase().includes(searchString.toLowerCase())) {
                    filtrados.push(element);
                }
            });
            dispatch(guardarFiltros(filtrados));
        }
    }
    const ChangeMarcado = (indice, marcado) => {
        var cantidadMarcados = 0;
        var array = [];
        if (marcado === false) {

            marcados.forEach((element, index) => {
                if (indice === index) {
                    array.push(true);
                }
                else {
                    array.push(marcados[index])
                }
            });
            dispatch(guardarMarcadosArray(array));
        }
        if (marcado === true) {
            marcados.forEach((element, index) => {
                if (indice === index) {
                    array.push(false);
                }
                else {
                    if (marcados[index] === false) {
                        cantidadMarcados++;
                    }
                    array.push(marcados[index])
                }
            });
            if (cantidadMarcados === marcados.length - 1) {
                const marcadosOriginals = marcadosAuxiliar
                dispatch(guardarMarcados(true));
            } else {
                dispatch(guardarMarcadosArray(array));
            }
        }
    }
    return (
        <View style={styles.container}>
            <HeaderFilterType filtronombre={route.params.filtro} filtrar={Filtrar} navigation={navigation} />
            <View style={{ marginBottom: 27 }}></View>
            {
                (filtros !== null && filtros !== undefined && marcadosAuxiliar !== null && marcadosAuxiliar !== undefined) &&
                <ScrollView style={{ flex: 1, height: '100%', width: '100%' }}>
                    <View style={{ width: '100%' }}>
                        {
                            filtros.map((fil, indice) => {
                                return (
                                    <View style={{ width: '100%' }} key={indice}>
                                        <CardFilterType filtronombre={route.params.filtro} filter={fil} changemarcado={ChangeMarcado} indice={indice} marcadoauxiliar={marcados[indice]} marcado={marcados[indice]} />
                                    </View>
                                );
                            })
                        }
                    </View>
                </ScrollView>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.PALE_GREY,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    },
    inputtitulo: {
        marginTop: 20,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        height: 50,
        fontSize: 15,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    descripcion: {
        marginTop: 15,
        width: 300,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        height: 100,
        fontSize: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        zIndex: -111
    },
    direccion: {
        marginTop: 15,
        width: 300,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        height: 50,
        fontSize: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        zIndex: -111
    },
    localizacion: {
        marginTop: 15,
        width: 300,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        height: 50,
        fontSize: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        zIndex: -111,
        flexDirection: 'row'
    },
    camera: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        height: '100%',
        width: '100%',
    },
    button: {
        marginTop: 15,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 150,
        height: 50,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
    },
    siguiente: {
        marginTop: 45,
        borderRadius: 25,
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 150,
        height: 50,
        alignSelf: 'center',
        bottom: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1
    },
    buttonExit: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        color: 'white'
    },
    textExit: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
});