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
import { Button, Dimensions, Image, TextInput, View, Text, TouchableOpacity, Modal, Alert, Platform, StyleSheet } from 'react-native';
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
import axios from 'axios';
import { URL_SERVER } from '../constants/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from '../store/reducers/userReducer';

export default function FilterType({ navigation, route, props }) {

    const dispatch = useReduxDispatch();

    // const [filtros, setFiltros] = useState(useReduxSelector((state) => state.user.filtros));
    // const [filtrosOriginals, setFiltrosOriginals] = useState(useReduxSelector((state) => state.user.filtrosOriginals));
    // const [marcados, setMarcados] = useState(useReduxSelector((state) => state.user.marcados));
    // const [marcadosAuxiliar, setMarcadosAuxiliar] = useState(useReduxSelector((state) => state.user.marcadosOriginals));

    const filtros = useState(useReduxSelector((state) => state.user.filtros));
    const filtrosOriginals = useState(useReduxSelector((state) => state.user.filtrosOriginals));
    const marcados = useState(useReduxSelector((state) => state.user.marcados));
    const marcadosAuxiliar = useState(useReduxSelector((state) => state.user.marcadosOriginals));

    const token = useReduxSelector((state) => state.user.access_token);
    //const filtros = useState(useReduxSelector((state) => state.user.filtros));

    useEffect(() => {
        // const token = await AsyncStorage.getItem('@access_token');
        //alert("JSON.stringify(state)" + JSON.stringify(token));
        // const token = useSelector((state) => state.access_token)

        // alert("token " + JSON.stringify(token))
        if (route.params.filtro === 'tipo') {
            axios
                .get(URL_SERVER + 'rest/tipo-incidencia?_format=json&nombre=ad',
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        }
                    }
                )
                .then(async response => {
                    //alert("response.tipo " + JSON.stringify(response))  
                    // if (response.status === 200) {

                    // setFiltros(response.data);
                    dispatch(guardarFiltros(response.data))
                    dispatch(guardarFiltrosOriginals(response.data))
                    dispatch(guardarMarcados(true))
                    dispatch(guardarMarcadosOriginals(false))
                    //alert("filtrossss " + JSON.stringify(filtros))  


                    // } else {
                    //     //alert("else")
                    // }
                })
                .catch(error => {
                    alert("error1 " + error)
                });
        }
        // alert("filtros " + JSON.stringify(marcados))
    }, []);
    const Filtrar = (searchString) => {
        if (searchString === '') {
            // setFiltros(filtrosOriginals);
            dispatch(guardarFiltros(useReduxSelector((state) => state.user.filtrosOriginals)))
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

            marcadosAuxiliar.forEach((element, index) => {
                if (indice === index) {
                    //alert("indice " + indice + " marcado " + marcado)
                    array.push(true);
                }
                else {
                    array.push(marcadosAuxiliar[index])
                }
            });
            //setMarcadosAuxiliar(array);
            // setMarcados(array);
            dispatch(guardarMarcadosArray(array));
        }
        if (marcado === true) {

            marcadosAuxiliar.forEach((element, index) => {
                if (indice === index) {
                    //alert("indice " + indice + " marcado " + marcado)
                    array.push(false);
                }
                else {
                    if (marcadosAuxiliar[index] === false) {
                        cantidadMarcados++;
                    }
                    array.push(marcadosAuxiliar[index])
                }
            });
            if (cantidadMarcados === marcadosAuxiliar.length - 1) {
                // setMarcadosAuxiliar([false, false, false, false]);
                // setMarcados([true, true, true, true]);
                const marcadosOriginals = useReduxSelector((state) => state.user.marcadosOriginals)
                setMarcadosAuxiliar(marcadosOriginals);
                setMarcados(Array(marcadosOriginals.length).fill(true));
            } else {
                //setMarcadosAuxiliar(array);
                // setMarcados(array);
                dispatch(guardarMarcadosArray(array));
            }
        }
    }
    return (
        <View style={styles.container}>
            <HeaderFilterType filtrar={Filtrar} navigation={navigation} />
            <View style={{ marginBottom: 27 }}></View>
            {
                (filtros !== null && filtros !== undefined) &&
                <View>
                    {
                        filtros.map((fil, indice) => {
                            // alert("filtros " + JSON.stringify(filtros))
                            //alert("marcados " + JSON.stringify(marcados))
                            return (
                                <View key = {indice}>
                                    <CardFilterType filter={fil} changemarcado={ChangeMarcado} indice={indice} marcadoauxiliar={marcadosAuxiliar[indice]} marcado={marcados[indice]} />
                                </View>
                            );
                        })}
                </View>
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
        //marginLeft: 15
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