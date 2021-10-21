import React, { useState, useEffect, useRef, createRef } from 'react';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';
import { Button, SafeAreaView, Dimensions, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet, ScrollView } from 'react-native';

import SideBarHeader from '../components/sideBarHeader';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { height } from 'styled-system';
import {
    loadSecciones
} from '../store/actions/incidenciaActions';

import {
    guardarSeccionesPerfil,
} from '../store/actions/userActions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AvisosLegales({ navigation, props }) {
    
    const secciones = useReduxSelector((state) => state.user.secciones);
    const dispatch = useReduxDispatch();
    const [contenido, setContenido] = useState('');

    useEffect(() => {
        loadSecciones()
            .then(response => {
                dispatch(guardarSeccionesPerfil(response.data));
                var tit = response.data[1].contenido.replace(/<p>/g, '');
                while (tit.includes('</p>')) {
                    tit = tit.replace('</p>', '');
                }
                setContenido(tit);
            })
            .catch(error => {
            });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'white', textAlign: 'center', alignItems: 'center', flex: 1, }}>
                <SideBarHeader texto={'Avisos legales'} navigation={navigation} />
                <ScrollView>
                    <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', marginTop: 16 }}>
                            {
                                (secciones !== null && secciones !== undefined && secciones.length > 1) && 
                                <Text style={{
                                    //width: 351,
                                    width: (windowWidth * 93.6) / 100,
                                    // height: (windowHeight * 97.3) / 100,
                                    height: '100%',
                                    fontFamily: 'nunito-semibold',
                                    fontSize: 16,
                                    fontWeight: "600",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "center",
                                    color: COLORS.browngrey
                                }}>
                                    {contenido}
                                </Text>
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    checkbox: {
        alignSelf: "center",
    },
    goBack: {
        marginTop: 30,
        textAlign: 'left',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },
    logo: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputuser: {
        marginTop: 75,
        width: 300,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        height: 50,
        fontSize: 15,
        borderRadius: 10,
        backgroundColor: 'grey',
        // borderColor: 'white',
        // borderWidth: 2
    },
    apellidos: {
        marginTop: 15,
        width: 300,
        textAlign: 'center',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        color: 'white',
        height: 150,
        fontSize: 15,
        borderRadius: 10,
        backgroundColor: 'grey',
        // borderColor: 'white',
        // borderWidth: 2
    },
    inputpass: {
        marginTop: 20,
        width: 300,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        height: 50,
        fontSize: 15,
        borderRadius: 10,
        backgroundColor: 'brown',
        borderColor: 'white',
        borderWidth: 2
    },
});