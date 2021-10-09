import React, { useState, useEffect, useRef, createRef } from 'react';
import { Modal, Button, Dimensions, ImageBackground, ScrollView, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import HeaderIncidenciaDetalles from '../components/headerincidenciadetalles';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function IncidenciaDetalles({ navigation, props, route, incidencia }) {

    const [votado, setVotado] = useState(false);
    const [showModal, setShowModal] = useState(false);
    // Tipo1
    const [votoChoice, setVotoChoice] = useState([1, 1]);
    const [votoMarcado, setVotoMarcado] = useState([0, 0]);
    // Tipo1

    // Tipo2
    const [votoChoiceBarras, setVotoChoiceBarras] = useState([1, 1, 1, 1, 1]);
    const [votoMarcadoBarras, setVotoMarcadoBarras] = useState([0, 0, 0, 0, 0]);
    // Tipo2
    // Tipo3
    const [firmado, setFirmado] = useState(false);
    // Tipo3
    // Tipo4
    const [apoyado, setApoyado] = useState(false);
    // Tipo4
    useEffect(() => {
        //alert("incidencia " + JSON.stringify(route.params))
    }, []);

    const MarcarVoto1 = (choice) => {

        if (choice === 0) {
            setVotoMarcado([1, 0]);
            setVotoChoice([1, 0]);
        }
        if (choice === 1) {
            setVotoMarcado([0, 1]);
            setVotoChoice([0, 1]);
        }
    }
    const MarcarVoto2 = (choice) => {

        if (choice === 0) {
            setVotoMarcadoBarras([1, 0, 0, 0, 0]);
            setVotoChoiceBarras([1, 0, 0, 0, 0]);
        }
        if (choice === 1) {
            setVotoMarcadoBarras([0, 1, 0, 0, 0]);
            setVotoChoiceBarras([0, 1, 0, 0, 0]);
        }
        if (choice === 2) {
            setVotoMarcadoBarras([0, 0, 1, 0, 0]);
            setVotoChoiceBarras([0, 0, 1, 0, 0]);
        }
        if (choice === 3) {
            setVotoMarcadoBarras([0, 0, 0, 1, 0]);
            setVotoChoiceBarras([0, 0, 0, 1, 0]);
        }
        if (choice === 4) {
            setVotoMarcadoBarras([0, 0, 0, 0, 1]);
            setVotoChoiceBarras([0, 0, 0, 0, 1]);
        }
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            {showModal === false && <HeaderIncidenciaDetalles navigation={navigation} />}
            {showModal === false &&
                <ScrollView
                    style={{
                        marginTop: 8
                    }}
                >
                    <TouchableOpacity
                        style={styles.container}
                        onPress={() => {
                            //navigation.navigate('IncidenciaDetalles', { incidencia: incidencia });
                        }}>
                        <ImageBackground
                            source={require('../assets/1.png')}
                            style={styles.imageContainer}
                            imageStyle={styles.image}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{
                                    flexDirection: 'row',
                                    width: 84,
                                    height: 24,
                                    opacity: 0.9,
                                    borderRadius: 12,
                                    backgroundColor: COLORS.primary,
                                    alignSelf: 'center',
                                    marginLeft: 8,
                                    marginTop: 8
                                }}>
                                    <Feather
                                        onPress={() => {

                                        }}
                                        style={{
                                            alignSelf: 'center',
                                            marginLeft: 8
                                        }}
                                        name="calendar"
                                        color="white"
                                        size={15}
                                    />
                                    <Text style={{
                                        textAlign: 'left',
                                        width: 54,
                                        height: 14,
                                        fontFamily: "nunito-regular",
                                        fontSize: 10,
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        color: 'white',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'center'
                                    }}>
                                        {route.params.incidencia.fecha}
                                    </Text>
                                </View>
                                <Icon
                                    onPress={() => {

                                    }}
                                    style={{
                                        flex: 1,
                                        textAlign: 'right',
                                        marginRight: 11,
                                        marginTop: 8
                                    }}
                                    name="heart-outline"
                                    color="white"
                                    size={30}
                                />
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            onPress={() => {

                            }}
                            style={{
                                marginLeft: 12,
                                // marginTop: 3
                            }}
                            name="location-outline"
                            color="grey"
                            size={30}
                        />
                        <Text style={{
                            fontSize: 15,
                            marginTop: 8,
                            fontFamily: "nunito-regular",
                            fontSize: 15,
                            fontWeight: "normal",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            color: COLORS.browngrey
                        }}>
                            {route.params.incidencia.autor}
                        </Text>
                        <Icon
                            onPress={() => {

                            }}
                            style={{
                                marginLeft: 100,
                            }}
                            name="location-outline"
                            color="grey"
                            size={30}
                        />
                        <Text style={{
                            fontSize: 15,
                            marginTop: 8,
                            fontFamily: "nunito-regular",
                            fontSize: 15,
                            fontWeight: "normal",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            color: COLORS.browngrey
                        }}>
                            {route.params.incidencia.categoria}
                        </Text>
                        <Icon
                            onPress={() => {

                            }}
                            style={{
                                marginLeft: 8,
                                // marginTop: 10,
                                textAlign: 'right',
                                // flex: 3,
                            }}
                            name="location-outline"
                            color="grey"
                            size={30}
                        />
                        <Text style={{
                            fontSize: 15,
                            marginTop: 8,
                            fontFamily: "nunito-regular",
                            fontSize: 15,
                            fontWeight: "normal",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            color: COLORS.browngrey
                        }}>
                            {route.params.incidencia.estado}
                        </Text>
                    </View>
                    <View
                        style={{
                            // borderBottomColor: 'black',
                            // borderBottomWidth: 1,
                            // marginHorizontal: 10,
                            alignSelf: 'center',
                            marginTop: 6,
                            width: (windowWidth * 95.7) / 100,
                            height: 1,
                            opacity: 0.2,
                            borderStyle: "solid",
                            borderWidth: 1,
                            borderColor: COLORS.browngrey
                        }}
                    />
                    <Text style={{
                        width: (windowWidth * 93.6) / 100,
                        height: 44,
                        fontFamily: "nunito-semibold",
                        fontSize: 16,
                        fontWeight: "600",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        color: COLORS.primary, marginLeft: 12
                    }}>
                        {/* {incidencia.nombre} */}
                        Nombre de la incidencia que ocupa 2 líneas para tener el ejemplo en el diseño de la app
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            onPress={() => {

                            }}
                            style={{
                                marginLeft: 12,
                                marginTop: 10,
                                textAlign: 'left',
                                // flex: 1,
                            }}
                            name="location-outline"
                            color="grey"
                            size={30}
                        />
                        <Text style={{
                            color: 'grey',
                            fontSize: 15,
                            //textAlign: 'right',
                            flex: 1,
                            marginTop: 15
                        }}>
                            {route.params.incidencia.direccion}
                        </Text>
                    </View>
                    <View
                        style={{
                            // borderBottomColor: 'black',
                            // borderBottomWidth: 1,
                            // marginHorizontal: 10,
                            alignSelf: 'center',
                            marginTop: 6,
                            width: (windowWidth * 95.7) / 100,
                            height: 1,
                            opacity: 0.2,
                            borderStyle: "solid",
                            borderWidth: 1,
                            borderColor: COLORS.browngrey,
                            marginBottom: 8
                        }}
                    />
                    <Text
                        style={{
                            // color: 'grey',
                            // fontSize: 15,
                            // flex: 1,
                            textAlign: 'center',
                            alignSelf: 'center',
                            // marginBottom: 5
                            width: 351,
                            height: 95,
                            fontFamily: "nunito-regular",
                            fontSize: 14,
                            fontWeight: "normal",
                            fontStyle: "normal",
                            letterSpacing: 0.16,
                            color: COLORS.GREYISH_BROWN
                        }}
                    >
                        Con una población de 570 006 habitantes en 2017,8​ Málaga es la sexta ciudad más poblada de España, la segunda de Andalucía y la número cuarenta y seis de la Unión Europea, así como la mayor de entre las que no son capitales autonómicas.
                    </Text>
                    <View
                        style={{
                            // borderBottomColor: 'black',
                            // borderBottomWidth: 1,
                            // marginHorizontal: 10,
                            alignSelf: 'center',
                            marginTop: 43,
                            width: (windowWidth * 95.7) / 100,
                            height: 1,
                            opacity: 0.2,
                            borderStyle: "solid",
                            borderWidth: 1,
                            borderColor: COLORS.browngrey,
                            marginBottom: 8
                        }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TextInput
                            placeholder='Escribe un comentario...'
                            placeholderTextColor={COLORS.primary}
                            style={{
                                // marginTop: 25,
                                // backgroundColor: 'grey',
                                // height: 45,
                                // width: '80%',
                                // alignItems: 'center',
                                // justifyContent: 'center',
                                // alignContent: 'center',
                                // alignSelf: 'center',
                                // textAlign: 'center',
                                // borderRadius: 30

                                width: 351,
                                height: 34,
                                width: (windowWidth * 93.6) / 100,
                                height: 34,
                                borderRadius: 20,
                                backgroundColor: "rgba(77, 94, 225, 0.1)",
                                paddingLeft: 17
                            }}
                        >
                        </TextInput>
                        <Icon
                            onPress={() => {

                            }}
                            style={{
                                marginLeft: -40,
                                //marginTop: 25,
                                textAlign: 'right',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                            }}
                            name="camera-outline"
                            color={COLORS.primary}
                            size={30}
                        />
                    </View>

                    <View style={{
                        // flex : 0.5,
                        marginTop: 12,
                        marginBottom: 200,
                        backgroundColor: 'grey',
                        height: (windowHeight * 9.35) / 100,
                        width: (windowWidth * 93.6) / 100,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderRadius: 30,
                        backgroundColor: 'white',
                        borderWidth: 0.5,
                        borderColor: 'grey',
                        flexDirection: 'row',
                        shadowRadius: 5,
                        shadowColor: 'grey',
                        shadowOpacity: 0.8
                    }}>

                        <Icon
                            onPress={() => {

                            }}
                            style={{
                                flex: 0,
                                marginTop: 10,
                                textAlign: 'left',
                                marginLeft: 14
                            }}
                            name="person-outline"
                            color={COLORS.primary}
                            size={20}
                        />
                        <Text
                            style={{
                                // color: COLORS.primary,
                                // fontSize: 15,
                                // flex : 0.2,
                                marginTop: 12,
                                flex: 0.9,
                                textAlign: 'left',
                                width: 79.7,
                                height: 19,
                                fontFamily: "nunito-regular",
                                fontSize: 14,
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0.16,
                                color: COLORS.GREYISH_BROWN,
                            }}
                        >
                            Autor
                        </Text>
                        <Icon
                            onPress={() => {

                            }}
                            style={{
                                // flex: 0,
                                marginTop: 15,
                                textAlign: 'right',
                                left: (route.params.incidencia.tipo === 1 || route.params.incidencia.tipo === 2) ? 150 : 140
                                // marginLeft : 310
                            }}
                            name="construct-outline"
                            color={COLORS.primary}
                            size={20}
                        />
                        <Icon
                            onPress={() => {

                            }}
                            style={{
                                // flex: 1,
                                marginTop: 15,
                                left: (route.params.incidencia.tipo === 1 || route.params.incidencia.tipo === 2) ? 150 : 140
                                // textAlign: 'left',
                                // marginLeft : 100
                            }}
                            name="trash-outline"
                            color={COLORS.primary}
                            size={20}
                        />
                        <View style={{ flexDirection: 'column' }}>
                            <Text
                                style={{
                                    // color: COLORS.primary,
                                    // fontSize: 15,
                                    left: -200,
                                    marginTop: 45,
                                    // width: 79.7,
                                    // height: 19,
                                    fontFamily: "nunito-regular",
                                    fontSize: 14,
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0.16,
                                    color: COLORS.GREYISH_BROWN
                                }}
                            >
                                {'Muchas gracias '}{route.params.incidencia.autor}{'!'}
                            </Text>
                        </View>
                    </View>
                    {/* Tipo 1            */}
                    {
                        (votado === false && route.params.incidencia.tipo === 1) &&
                        <TouchableOpacity
                            onPress={() => {
                                // navigation.navigate('CrearIncidencia');
                                setShowModal(true);
                            }}
                            style={{
                                // alignItems: 'center',
                                // zIndex: 11111,
                                // borderRadius: 30,
                                // backgroundColor: COLORS.primary,
                                // width: 100,
                                // height: 50

                                justifyContent: 'center',
                                alignSelf: 'center',
                                position: 'absolute',
                                bottom: 30,
                                width: 93,
                                height: 44,
                                borderRadius: 22,
                                backgroundColor: COLORS.primary,
                                shadowColor: "rgba(0, 0, 0, 0.1)",
                                shadowOffset: {
                                    width: 0,
                                    height: 4
                                },
                                shadowRadius: 10,
                                shadowOpacity: 1
                            }}>
                            <Text style={{
                                // fontSize: 20,
                                // color: 'white'

                                alignSelf: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                                width: 50,
                                height: 24,
                                fontFamily: "nunito-bold",
                                fontSize: 18,
                                fontWeight: "bold",
                                fontStyle: "normal",
                                letterSpacing: 0.45,
                                textAlign: "center",
                                color: 'white'
                            }}>
                                Votar
                            </Text>
                        </TouchableOpacity>
                    }
                    {
                        (votado === true && route.params.incidencia.tipo === 1) &&
                        // <TouchableOpacity
                        //     onPress={() => {
                        //         // navigation.navigate('CrearIncidencia');
                        //     }}
                        //     style={{ borderWidth: 2, borderColor: COLORS.primary, alignSelf: 'center', position: 'absolute', bottom: 30, alignItems: 'center', zIndex: 11111, borderRadius: 30, justifyContent: 'center', backgroundColor: 'white', width: 150, height: 50 }}>
                        //     <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center', alignItems: 'center', color: COLORS.primary }}> Ya has votado </Text>
                        // </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // navigation.navigate('CrearIncidencia');
                                setShowModal(true);
                            }}
                            style={{
                                // alignItems: 'center',
                                // zIndex: 11111,
                                // borderRadius: 30,
                                // backgroundColor: COLORS.primary,
                                // width: 100,
                                // height: 50

                                justifyContent: 'center',
                                alignSelf: 'center',
                                position: 'absolute',
                                bottom: 30,
                                width: 93,
                                height: 44,
                                borderRadius: 22,
                                backgroundColor: COLORS.primary,
                                shadowColor: "rgba(0, 0, 0, 0.1)",
                                shadowOffset: {
                                    width: 0,
                                    height: 4
                                },
                                shadowRadius: 10,
                                shadowOpacity: 1
                            }}>
                            <Text style={{
                                // fontSize: 20,
                                // color: 'white'

                                alignSelf: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                                width: 50,
                                height: 24,
                                fontFamily: "nunito-bold",
                                fontSize: 18,
                                fontWeight: "bold",
                                fontStyle: "normal",
                                letterSpacing: 0.45,
                                textAlign: "center",
                                color: 'white'
                            }}>
                                Votar
                            </Text>
                        </TouchableOpacity>
                    }
                    {/* Tipo 2            */}
                    {
                        (votado === false && route.params.incidencia.tipo === 2) &&
                        // <TouchableOpacity
                        //     onPress={() => {
                        //         // navigation.navigate('CrearIncidencia');
                        //         setShowModal(true);
                        //     }}
                        //     style={{ alignSelf: 'center', position: 'absolute', bottom: 30, alignItems: 'center', zIndex: 11111, borderRadius: 30, justifyContent: 'center', backgroundColor: COLORS.primary, width: 100, height: 50 }}>
                        //     <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center', alignItems: 'center', color: 'white' }}> Votar </Text>
                        // </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // navigation.navigate('CrearIncidencia');
                                setShowModal(true);
                            }}
                            style={{
                                // alignItems: 'center',
                                // zIndex: 11111,
                                // borderRadius: 30,
                                // backgroundColor: COLORS.primary,
                                // width: 100,
                                // height: 50

                                justifyContent: 'center',
                                alignSelf: 'center',
                                position: 'absolute',
                                bottom: 30,
                                width: 93,
                                height: 44,
                                borderRadius: 22,
                                backgroundColor: COLORS.primary,
                                shadowColor: "rgba(0, 0, 0, 0.1)",
                                shadowOffset: {
                                    width: 0,
                                    height: 4
                                },
                                shadowRadius: 10,
                                shadowOpacity: 1
                            }}>
                            <Text style={{
                                // fontSize: 20,
                                // color: 'white'

                                alignSelf: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                                width: 50,
                                height: 24,
                                fontFamily: "nunito-bold",
                                fontSize: 18,
                                fontWeight: "bold",
                                fontStyle: "normal",
                                letterSpacing: 0.45,
                                textAlign: "center",
                                color: 'white'
                            }}>
                                Votar
                            </Text>
                        </TouchableOpacity>
                    }
                    {
                        (votado === true && route.params.incidencia.tipo === 2) &&
                        <TouchableOpacity
                            onPress={() => {
                                // navigation.navigate('CrearIncidencia');
                                setShowModal(true);
                            }}
                            style={{
                                // alignItems: 'center',
                                // zIndex: 11111,
                                // borderRadius: 30,
                                // backgroundColor: COLORS.primary,
                                // width: 100,
                                // height: 50

                                justifyContent: 'center',
                                alignSelf: 'center',
                                position: 'absolute',
                                bottom: 30,
                                width: 93,
                                height: 44,
                                borderRadius: 22,
                                backgroundColor: COLORS.primary,
                                shadowColor: "rgba(0, 0, 0, 0.1)",
                                shadowOffset: {
                                    width: 0,
                                    height: 4
                                },
                                shadowRadius: 10,
                                shadowOpacity: 1
                            }}>
                            <Text style={{
                                // fontSize: 20,
                                // color: 'white'

                                alignSelf: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                                width: 50,
                                height: 24,
                                fontFamily: "nunito-bold",
                                fontSize: 18,
                                fontWeight: "bold",
                                fontStyle: "normal",
                                letterSpacing: 0.45,
                                textAlign: "center",
                                color: 'white'
                            }}>
                                Votar
                            </Text>
                        </TouchableOpacity>
                    }
                    {/* Tipo 3            */}
                    {
                        (firmado === false && route.params.incidencia.tipo === 3) &&
                        <TouchableOpacity
                            onPress={() => {
                                // navigation.navigate('CrearIncidencia');
                                //setShowModal(true);
                                setFirmado(true)
                            }}
                            style={{ alignSelf: 'center', position: 'absolute', bottom: 30, alignItems: 'center', zIndex: 11111, borderRadius: 30, justifyContent: 'center', backgroundColor: COLORS.primary, width: 100, height: 50 }}>
                            <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center', alignItems: 'center', color: 'white' }}> Firmar </Text>
                        </TouchableOpacity>
                    }
                    {
                        (firmado === true && route.params.incidencia.tipo === 3) &&
                        <TouchableOpacity
                            disabled={true}
                            onPress={() => {
                                // navigation.navigate('CrearIncidencia');
                            }}
                            style={{
                                shadowRadius: 5,
                                shadowColor: 'grey',
                                shadowOpacity: 0.8,
                                borderWidth: 2,
                                borderColor: COLORS.primary,
                                alignSelf: 'center',
                                position: 'absolute',
                                bottom: 30,
                                alignItems: 'center',
                                zIndex: 11111,
                                borderRadius: 30,
                                justifyContent: 'center',
                                backgroundColor: 'white',
                                width: 150,
                                height: 50
                            }}>
                            <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center', alignItems: 'center', color: 'grey' }}> Ya has firmado </Text>
                        </TouchableOpacity>
                    }
                    {/* Tipo 4            */}
                    {
                        (apoyado === false && route.params.incidencia.tipo === 4) &&
                        // <TouchableOpacity
                        //     onPress={() => {
                        //         // navigation.navigate('CrearIncidencia');
                        //         //setShowModal(true);
                        //         setApoyado(true)
                        //     }}
                        //     style={{ alignSelf: 'center', position: 'absolute', bottom: 30, alignItems: 'center', zIndex: 11111, borderRadius: 30, justifyContent: 'center', backgroundColor: COLORS.primary, width: 100, height: 50 }}>
                        //     <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center', alignItems: 'center', color: 'white' }}> Apoyar </Text>
                        // </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // navigation.navigate('CrearIncidencia');
                                setApoyado(true);
                            }}
                            style={{
                                // alignItems: 'center',
                                // zIndex: 11111,
                                // borderRadius: 30,
                                // backgroundColor: COLORS.primary,
                                // width: 100,
                                // height: 50

                                justifyContent: 'center',
                                alignSelf: 'center',
                                position: 'absolute',
                                bottom: 30,
                                width: 105,
                                height: 44,
                                borderRadius: 22,
                                backgroundColor: COLORS.primary,
                                shadowColor: "rgba(0, 0, 0, 0.1)",
                                shadowOffset: {
                                    width: 0,
                                    height: 4
                                },
                                shadowRadius: 10,
                                shadowOpacity: 1
                            }}>
                            <Text style={{
                                // fontSize: 20,
                                // color: 'white'

                                alignSelf: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                                width: 65,
                                height: 24,
                                fontFamily: "nunito-bold",
                                fontSize: 18,
                                fontWeight: "bold",
                                fontStyle: "normal",
                                letterSpacing: 0.45,
                                textAlign: "center",
                                color: 'white'
                            }}>
                                Apoyar
                            </Text>
                        </TouchableOpacity>
                    }
                    {
                        (apoyado === true && route.params.incidencia.tipo === 4) &&
                        <TouchableOpacity
                            disabled={true}
                            onPress={() => {
                                // navigation.navigate('CrearIncidencia');
                            }}
                            style={{
                                shadowRadius: 5,
                                shadowColor: 'grey',
                                shadowOpacity: 0.8,
                                borderWidth: 2,
                                borderColor: COLORS.primary,
                                alignSelf: 'center',
                                position: 'absolute',
                                bottom: 30,
                                alignItems: 'center',
                                zIndex: 11111,
                                borderRadius: 30,
                                justifyContent: 'center',
                                backgroundColor: 'white',
                                width: 150,
                                height: 50
                            }}>
                            <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center', alignItems: 'center', color: 'grey' }}> Ya has apoyado </Text>
                        </TouchableOpacity>
                    }
                    {/* Segun tipo */}
                    {
                        route.params.incidencia.tipo === 1 &&
                        <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row', }}>
                            <Text style={{ fontSize: 15, color: 'red' }}>
                                30%
                            </Text>
                            <View style={{ height: 25, marginTop: 5 }}>
                                <Progress.Bar unfilledColor={'green'} style={{ marginHorizontal: 10 }} color={'red'} borderWidth={0} progress={0.3} width={300} height={10} />
                            </View>
                            <Text style={{ fontSize: 15, color: 'green' }}>
                                70%
                            </Text>
                        </View>
                    }
                    {
                        route.params.incidencia.tipo === 2 &&
                        <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row', }}>
                            <View style={{ borderRadius: 30, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', height: 25, width: 65, marginBottom: 3, }}>
                                <Text style={{ fontSize: 15, color: 'white' }}>
                                    A) 20%
                                </Text>
                            </View>
                            <View style={{ marginLeft: 3, borderRadius: 30, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', height: 25, width: 65, marginBottom: 3, }}>
                                <Text style={{ fontSize: 15, color: 'white' }}>
                                    B) 6%
                                </Text>
                            </View>
                            <View style={{ marginLeft: 3, borderRadius: 30, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'center', height: 25, width: 65, marginBottom: 3, }}>
                                <Text style={{ fontSize: 15, color: 'white' }}>
                                    C) 44%
                                </Text>
                            </View>
                            <View style={{ marginLeft: 3, borderRadius: 30, backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center', height: 25, width: 65, marginBottom: 3, }}>
                                <Text style={{ fontSize: 15, color: 'white' }}>
                                    D) 19%
                                </Text>
                            </View>
                            <View style={{ marginLeft: 3, borderRadius: 30, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', height: 25, width: 65, marginBottom: 3, }}>
                                <Text style={{ fontSize: 15, color: 'white' }}>
                                    E) 11%
                                </Text>
                            </View>
                        </View>
                    }
                    {
                        route.params.incidencia.tipo === 3 &&
                        <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row', }}>
                            <View style={{ borderRadius: 30, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', height: 25, width: 150, marginBottom: 3, }}>
                                <Text style={{ fontSize: 15, color: 'white' }}>
                                    850 firmas
                                </Text>
                            </View>

                        </View>
                    }
                    {
                        route.params.incidencia.tipo === 4 &&
                        <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row', }}>
                            <Text style={{ fontSize: 15, color: 'blue' }}>
                                50
                            </Text>
                            <View style={{ height: 25, marginTop: 5 }}>
                                <Progress.Bar unfilledColor={'green'} style={{ marginHorizontal: 10 }} color={'blue'} borderWidth={0} progress={0.3} width={300} height={10} />
                            </View>
                            <Text style={{ fontSize: 15, color: 'green' }}>
                                100
                            </Text>
                        </View>
                    }
                </ScrollView>
            }
            {
                showModal &&
                (
                    // <View style={{ top: 10, height: '100%', width: '100%', borderColor: 'red', borderWidth: 3 }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={true}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                onPress={() => {
                                    setShowModal(false);
                                }}
                                style={{
                                    marginTop: 20,
                                }}
                                name="chevron-back-outline"
                                color={COLORS.primary}
                                size={30}
                            />
                            <Text style={{ fontWeight: 'bold', flex: 0.9, textAlign: 'center', color: COLORS.primary, marginTop: 25, fontSize: 20, }}>Qué quieres votar?</Text>
                        </View>
                        <View style={[styles.modalBackground]}>
                            {
                                route.params.incidencia.tipo === 1 &&
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        height: 100,
                                        width: 100,
                                        borderRadius: 60,
                                        backgroundColor: votoChoice[0] === 1 ? 'green' : '#d9dce4',
                                        marginHorizontal: 5
                                    }}
                                    >
                                        <Icon
                                            onPress={() => {
                                                MarcarVoto1(0);
                                            }}
                                            style={{
                                                //marginTop: 20,
                                                alignContent: 'center',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignSelf: 'center'
                                                //textAlign: 'left',
                                            }}
                                            name="hand-left-outline"
                                            color="white"
                                            size={30}
                                        />
                                    </View>
                                    <View style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        height: 100,
                                        width: 100,
                                        borderRadius: 60,
                                        backgroundColor: votoChoice[1] === 1 ? 'red' : '#d9dce4',
                                        marginHorizontal: 5,
                                        transform: [{ rotate: '180deg' }]
                                    }}
                                    >
                                        <Icon
                                            onPress={() => {
                                                MarcarVoto1(1);
                                            }}
                                            style={{
                                                //marginTop: 20,
                                                alignContent: 'center',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignSelf: 'center'
                                                //textAlign: 'left',
                                            }}
                                            name="hand-left-outline"
                                            color="white"
                                            size={30}
                                        />
                                    </View>
                                </View>
                            }
                            {
                                route.params.incidencia.tipo === 2 &&
                                <View style={{ flexDirection: 'column', }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            MarcarVoto2(0);
                                        }}
                                        style={{
                                            alignSelf: 'center',
                                            borderRadius: 20,
                                            justifyContent: 'center',
                                            backgroundColor: votoChoiceBarras[0] === 1 ? 'white' : 'grey',
                                            width: 380,
                                            height: 50,
                                            shadowRadius: 5,
                                            shadowColor: 'grey',
                                            shadowOpacity: 0.8,
                                            marginBottom: 5,
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 15, textAlign: 'left', color: COLORS.primary }}> Opción 1 </Text>
                                            <Text style={{ marginTop: 15, marginRight: 5, flex: 1, fontSize: 15, textAlign: 'right', color: COLORS.primary }}> 20% </Text>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', width: 20, height: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}></View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            MarcarVoto2(1);
                                        }}
                                        style={{
                                            alignSelf: 'center',
                                            //alignItems: 'center',
                                            borderRadius: 20,
                                            justifyContent: 'center',
                                            backgroundColor: votoChoiceBarras[1] === 1 ? 'white' : 'grey',
                                            width: 380,
                                            height: 50,
                                            shadowRadius: 5,
                                            shadowColor: 'grey',
                                            shadowOpacity: 0.8,
                                            marginBottom: 5
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 15, textAlign: 'left', color: COLORS.primary }}> Opción 2 </Text>
                                            <Text style={{ marginTop: 15, marginRight: 5, flex: 1, fontSize: 15, textAlign: 'right', color: COLORS.primary }}> 20% </Text>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', width: 20, height: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}></View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            MarcarVoto2(2);
                                        }}
                                        style={{
                                            alignSelf: 'center',
                                            //alignItems: 'center',
                                            borderRadius: 20,
                                            justifyContent: 'center',
                                            backgroundColor: votoChoiceBarras[2] === 1 ? 'white' : 'grey',
                                            width: 380,
                                            height: 50,
                                            shadowRadius: 5,
                                            shadowColor: 'grey',
                                            shadowOpacity: 0.8,
                                            marginBottom: 5,
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 15, textAlign: 'left', color: COLORS.primary }}> Opción 3 </Text>
                                            <Text style={{ marginTop: 15, marginRight: 5, flex: 1, fontSize: 15, textAlign: 'right', color: COLORS.primary }}> 20% </Text>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink', width: 20, height: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}></View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            MarcarVoto2(3);
                                        }}
                                        style={{
                                            alignSelf: 'center',
                                            //alignItems: 'center',
                                            borderRadius: 20,
                                            justifyContent: 'center',
                                            backgroundColor: votoChoiceBarras[3] === 1 ? 'white' : 'grey',
                                            width: 380,
                                            height: 50,
                                            shadowRadius: 5,
                                            shadowColor: 'grey',
                                            shadowOpacity: 0.8,
                                            marginBottom: 5
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 15, textAlign: 'left', color: COLORS.primary }}> Opción 4 </Text>
                                            <Text style={{ marginTop: 15, marginRight: 5, flex: 1, fontSize: 15, textAlign: 'right', color: COLORS.primary }}> 20% </Text>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange', width: 20, height: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}></View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            MarcarVoto2(4);
                                        }}
                                        style={{
                                            alignSelf: 'center',
                                            //alignItems: 'center',
                                            borderRadius: 20,
                                            justifyContent: 'center',
                                            backgroundColor: votoChoiceBarras[4] === 1 ? 'white' : 'grey',
                                            width: 380,
                                            height: 50,
                                            shadowRadius: 5,
                                            shadowColor: 'grey',
                                            shadowOpacity: 0.8,
                                            marginBottom: 5
                                        }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 15, textAlign: 'left', color: COLORS.primary }}> Opción 5 </Text>
                                            <Text style={{ marginTop: 15, marginRight: 5, flex: 1, fontSize: 15, textAlign: 'right', color: COLORS.primary }}> 20% </Text>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', width: 20, height: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}></View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                route.params.incidencia.tipo === 1 &&
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModal(false);
                                    }}
                                    style={{ alignSelf: 'center', position: 'absolute', bottom: 10, alignItems: 'center', zIndex: 11111, borderRadius: 20, justifyContent: 'center', backgroundColor: (votoMarcado[0] === 1 || votoMarcado[1] === 1) ? COLORS.primary : 'grey', width: 200, height: 50 }}>
                                    <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center', alignItems: 'center', color: 'white' }}> Enviar mi votación </Text>
                                </TouchableOpacity>
                            }
                            {
                                route.params.incidencia.tipo === 2 &&
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModal(false);
                                    }}
                                    style={{ alignSelf: 'center', position: 'absolute', bottom: 10, alignItems: 'center', zIndex: 11111, borderRadius: 20, justifyContent: 'center', backgroundColor: (votoMarcadoBarras[0] === 1 || votoMarcadoBarras[1] === 1 || votoMarcadoBarras[2] === 1 || votoMarcadoBarras[3] === 1 || votoMarcadoBarras[4] === 1) ? COLORS.primary : 'grey', width: 200, height: 50 }}>
                                    <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center', alignItems: 'center', color: 'white' }}> Enviar mi votación </Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </Modal>
                    // </View>
                )
            }
        </View >

    );
}
const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center',
        // height: 200,
        // width: 350,
        // borderWidth: 1,
        // borderRadius: 20,
        // marginVertical: 10,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: (windowHeight * 31.65) / 100,
        width: (windowWidth * 95.7) / 100,
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 10,
    },
    imageContainer: {
        //flex: 1,
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        //resizeMode: 'contain',
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