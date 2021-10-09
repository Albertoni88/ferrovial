import React, { useState, useEffect, useRef, createRef } from 'react';
import { Button, Dimensions, Image, TextInput, View, Text, TouchableOpacity, Modal, Alert, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderCrearIncidencia from '../components/headerCrearIncidencia';
import { Camera } from 'expo-camera';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CrearIncidencia({ navigation, props }) {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, showCamera] = useState(false);
    const [creada, setCreada] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    return (
        <View style={styles.container}>
            <HeaderCrearIncidencia navigation={navigation} />
            <View style={{}}>
                <Text style={{
                    textAlign: 'left',
                    marginTop: (windowHeight * 10) / 100,
                    marginLeft: (windowWidth * 4.3) / 100,
                    width: 42,
                    height: 22,
                    fontFamily: 'nunito-semibold',
                    fontSize: 16,
                    fontWeight: "600",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: 'white',


                }}>
                    Título
                </Text>
                <TextInput
                    placeholder={'*Pon un título corto y conciso...'}
                    placeholderTextColor={COLORS.primary}
                    style={styles.inputtitulo}
                    placeholderStyle={{
                        width: 342,
                        height: 17,
                        fontSize: 14,
                        fontWeight: "normal",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        color: "#9d9d9d"
                    }}
                    onChangeText={(titulo) => {
                        //this.setState({ email });
                    }}
                />
                <Text style={{
                    // marginTop: 15,
                    // fontSize: 15,
                    // fontWeight: 'bold',
                    // color: 'white'
                    textAlign: 'left',
                    marginTop: (windowHeight * 1.47) / 100,
                    marginLeft: (windowWidth * 4.3) / 100,
                    width: 85,
                    height: 22,
                    fontFamily: 'nunito-semibold',
                    fontSize: 16,
                    fontWeight: "600",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: 'white',
                }}>
                    Descripción
                </Text>
                <TextInput
                    multiline={true}
                    numberOfLines={3}
                    placeholder={'*Describe la incidencia de forma clara...'}
                    placeholderTextColor={COLORS.primary}
                    style={styles.descripcion}
                    onChangeText={(descripcion) => {
                        //this.setState({ email });
                    }}
                />
                <Text style={{
                    // marginTop: 15,
                    // fontSize: 15,
                    // fontWeight: 'bold',
                    // color: 'white'
                    width: 102,
                    height: 22,
                    fontFamily: 'nunito-semibold',
                    fontSize: 16,
                    fontWeight: "600",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: 'white',
                    marginTop: (windowHeight * 1.47) / 100,
                    marginLeft: (windowWidth * 4.3) / 100,
                }}>
                    Sube una foto
                </Text>
                <View
                    style={styles.descripcion}
                >
                    <Icon
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            // color: 'brown',
                            alignSelf: 'center',
                            zIndex: 111,
                            width: 73,
                            height: 70,
                            marginTop: 25
                            //backgroundColor: "rgba(0, 0, 0, 0.26)"
                        }}
                        onPress={() => {
                            showCamera(true);
                        }}
                        name="camera-outline" size={75}
                        color={'rgba(0, 0, 0, 0.26)'}
                    />
                </View>
                <View
                //style={styles.localizacion}
                >
                    <Text style={{
                        width: 212,
                        height: 22,
                        fontFamily: 'nunito-semibold',
                        fontSize: 16,
                        fontWeight: "600",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        color: 'white',
                        marginTop: (windowHeight * 1.47) / 100,
                        marginLeft: (windowWidth * 4.3) / 100,
                    }}>
                        Donde ha sido la incidencia?
                    </Text>
                    <View
                        style={styles.localizacion}
                    >
                        <Text style={{
                            marginLeft: 10,
                            textAlign: 'left',
                            // fontSize: 15,
                            // color: 'brown'
                            // width: 342,
                            // height: 17,
                            //fontFamily: "VarelaRound",
                            fontSize: 14,
                            fontWeight: "normal",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            color: "#9d9d9d"
                        }}>
                            Geolocalización de la ubicación
                        </Text>
                        <Icon
                            style={{
                                // justifyContent: 'center',
                                // alignItems: 'center',
                                // alignContent: 'center',
                                color: 'rgb(79, 95, 225)',
                                textAlign: 'right',
                                zIndex: 111,
                                flex: 0.95
                                //marginLeft: 20
                            }}
                            onPress={() => {
                            }}
                            name="location-outline" size={30}
                        />
                    </View>
                    <TextInput
                        placeholder={'Nombre amigable para la dirección'}
                        placeholderTextColor={"#9d9d9d"}
                        style={styles.direccion}
                        onChangeText={(descripcion) => {
                            //this.setState({ email });
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setCreada(true);
                        }}
                        style={styles.siguienteTouch}>
                        <Text style={{
                            // fontSize: 15,
                            // color: 'brown'
                            alignItems: 'center',
                            alignSelf: 'center',
                            textAlign: 'center',
                            alignItems: 'center',
                            width: 83,
                            height: 24,
                            fontFamily: "nunito-bold",
                            fontSize: 18,
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0.45,
                            textAlign: "center",
                            color: COLORS.primary
                        }}>
                            Siguiente
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                camera &&
                (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={true}>

                        <TouchableOpacity
                            onPress={() => {
                                showCamera(false);
                            }}
                            style={styles.buttonExit}>
                            <Text style={styles.textExit}>X</Text>
                        </TouchableOpacity>
                        <View style={[styles.modalBackground]}>
                            <Camera style={styles.camera} type={type}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setType(
                                                type === Camera.Constants.Type.back
                                                    ? Camera.Constants.Type.front
                                                    : Camera.Constants.Type.back
                                            );
                                        }}
                                        style={styles.button}>
                                        <Text style={{
                                            alignSelf: 'center',
                                            position: 'absolute',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            fontSize: 15,
                                            textAlign: 'center',
                                            alignItems: 'center',
                                            color: 'brown'
                                        }}>
                                            Cambiar cámara
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Camera>
                        </View>
                    </Modal>
                )
            }
            {
                creada &&
                (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={true}>
                        <View style={[styles.modalCreada]}>

                            <View style={{
                                alignItems: 'center',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                height: '20%',
                                width: '50%',
                                // marginTop: 267,
                            }}>
                                <Image style={{
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: 20
                                }} source={require('../assets/1.png')} />
                                <View style={{
                                    flexDirection: 'column',
                                    width: 325,
                                    height: 165,
                                    marginTop: 8,
                                }}>
                                    <Text style={{
                                        width: 295,
                                        //height: 108,
                                        fontFamily: "nunito-bold",
                                        fontSize: 16,
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        color: 'white',
                                        textAlign: "center",
                                        alignSelf: 'center',
                                        justifyContent: 'center'

                                    }}>
                                        ¡Mil gracias por tu aportación!
                                    </Text>
                                    <Text style={{
                                        width: 295,
                                        fontFamily: "nunito-regular",
                                        fontSize: 16,
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        color: 'white',
                                        marginTop: 40,
                                        textAlign: "center",
                                        alignSelf: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        Sigue el estado de las propuestas en cualquier momento.
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCreada(false);
                                            navigation.navigate('MainHeader');
                                        }}
                                        style={styles.salir}>
                                        <Text style={{
                                            // fontSize: 15,
                                            // color: 'brown'

                                            // alignItems: 'center',
                                            // alignSelf: 'center',
                                            // textAlign: 'center',
                                            // alignItems: 'center',
                                            // width: 83,
                                            // height: 24,
                                            // fontFamily: "nunito-bold",
                                            // fontSize: 18,
                                            // fontWeight: "bold",
                                            // fontStyle: "normal",
                                            // letterSpacing: 0.45,
                                            // textAlign: "center",
                                            // color: COLORS.primary
                                            width: 40,
                                            height: 24,
                                            fontFamily: "nunito-bold",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            fontStyle: "normal",
                                            letterSpacing: 0.45,
                                            textAlign: "center",
                                            color: COLORS.primary,
                                        }}>
                                            Salir
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </Modal>
                )
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        // flexDirection: 'column',
        // alignContent: 'center',
        // alignItems: 'center'
    },
    inputtitulo: {
        // marginTop: 20,
        // width: 300,
        // alignItems: 'center',
        // justifyContent: 'center',
        // color: 'white',
        // height: 50,
        // fontSize: 15,
        // borderRadius: 10,
        // backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 8,
        width: (windowWidth * 92) / 100,
        height: (windowHeight * 5.42) / 100,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 15,
        shadowOpacity: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dfdfdf",
        marginTop: 4,
        marginLeft: 15,
        // fontFamily: 'varelaround',
    },
    descripcion: {
        paddingLeft: 10,
        paddingRight: 8,
        // width: 345,
        // height: 157,
        width: (windowWidth * 92) / 100,
        height: (windowHeight * 19.3) / 100,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 15,
        shadowOpacity: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dfdfdf",
        marginTop: 4,
        marginLeft: 15,
    },
    direccion: {
        // marginTop: 15,
        // width: 300,
        //textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginLeft: 15,
        zIndex: -111,
        // width: 345,
        width: (windowWidth * 92) / 100,
        height: 44,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 15,
        shadowOpacity: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dfdfdf"
    },
    siguienteTouch: {
        marginTop: (windowHeight * 3) / 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 126,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    salir: {
        width: 83,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop : (windowHeight * 27.8) / 100
    },
    localizacion: {
        alignItems: 'center',
        zIndex: -111,
        flexDirection: 'row',
        // width: 345,
        width: (windowWidth * 92) / 100,
        height: 44,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 15,
        shadowOpacity: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dfdfdf",
        marginTop: 4,
        marginLeft: 15,
    },
    camera: {
        //flex: 1
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        height: '100%',
        width: '100%',
    },
    button: {
        //marginLeft: 15,
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
        //marginLeft: 15,
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
    modalCreada: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
});