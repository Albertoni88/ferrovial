import React, { useState, useEffect, useRef, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guardarToken } from '../store/actions/userActions';
import { Button, Dimensions, SafeAreaView, ImageBackground, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { URL_SERVER } from '../constants/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../store/actions/userActions';
import { path1, path2, path3, path4, path5 } from '../components/logo';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Svg, { Path } from "react-native-svg";
import LOGO from '../components/logo';
import SVG from '../components/svg';

export default function Login({ props, navigation }) {

    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
    }, []);

    async function logIn() {

        const data = {
            'name': name,
            'pass': pass
        }
        if (name === '' || pass === '') {
            alert("Tiene campos vacíos")
        } else {
            loginUser(data)
                .then(async response => {
                    if (response.status === 200) {
                        dispatch(guardarToken({ "token": response.data.access_token, "csrf": response.data.csrf_token }))
                        navigation.navigate('Main');

                    } else {
                        alert("Usuario o contraseña incorrecto")
                    }
                })
                .catch(error => {
                    alert("error1 " + error)
                });
        }
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                // source={require('../assets/Bitmap.jpg')}
                source={require('../assets/fondo-login.jpg')}
                style={{
                    flex: 1,
                }}
                imageStyle={{}}
            >
                <View style={{ textAlign: 'center', alignItems: 'center', flex: 1, }}>
                    <View style={{
                        alignContent: 'center',
                        // marginTop: 100,
                        marginTop: (windowHeight * 9.85) / 100,
                        flexDirection: 'row',
                        // height: 64,
                        height: (windowHeight * 7.8) / 100,
                        // width: 228
                        width: (windowWidth * 60.8) / 100,
                        marginLeft: 72,
                        marginRight: 74
                    }}>
                        <View style={{ zIndex: 1111111, width: (windowWidth * 61) / 100, height: (windowHeight * 12.9) / 100 }}>
                            {/* <LOGO /> */}
                            <SVG nombre={'Logo'} width={(windowWidth * 61) / 100} height={(windowHeight * 12.9) / 100} />
                        </View>
                        {/* <Image style={styles.logo} source={require('../assets/group9.png')}></Image> */}
                    </View>
                    <View style={{
                        // marginTop: 219,
                        marginTop: (windowHeight * 26.97) / 100,
                        flexDirection: 'column'
                    }}>
                        <TextInput
                            keyboardType={'email-address'}
                            placeholder={'email'}
                            placeholderTextColor={'white'}
                            style={styles.inputuser}
                            onChangeText={(name) => {
                                setName(name);
                            }}
                        />
                        <TextInput
                            secureTextEntry={true}
                            placeholder={'contraseña'}
                            placeholderTextColor={'white'}
                            style={styles.inputpass}
                            onChangeText={(pass) => {
                                setPass(pass);
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                //navigation.navigate('Main');
                                logIn();
                            }}
                            style={styles.session}>
                            <Text style={{
                                alignSelf: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent : 'center',
                                textAlign: "center",
                                // width: 231,
                                // height: 18,
                                height: 25,
                                width: (windowWidth * 61.6) / 100,
                                fontFamily: 'montserrat-bold',
                                fontSize: 14,
                                fontWeight: "bold",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                color: "#57233b"
                            }}>
                                Iniciar sesión
                            </Text>
                        </TouchableOpacity>
                        <Text
                            onPress={() => {
                                navigation.navigate('ResetPassword');
                            }}
                            style={{
                                fontFamily: 'montserrat-medium',
                                // fontSize: 14,
                                fontSize: (windowHeight * 1.72) / 100,
                                fontWeight: "500",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: 'white',
                                marginTop: (windowHeight * 2.9) / 100,
                                //marginBottom: (windowHeight * 15) / 121
                                marginBottom: (windowHeight * 14.9) / 100
                            }}>No recuerdo mi contraseña...
                        </Text>
                        <Text style={{
                            fontFamily: 'montserrat-medium',
                            // fontSize: 14,
                            fontSize: (windowHeight * 1.72) / 100,
                            fontWeight: "500",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            alignSelf: 'center',
                            fontSize: 15,
                            textAlign: 'center',
                            alignItems: 'center',
                            color: 'white'
                        }}>
                            ¿Aún no tienes cuenta?
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('CreateAccount');
                            }}
                            style={
                                styles.crear
                            }>
                            <Text style={{
                                // width: 105,
                                // height: 18,
                                height: 25,
                                width: (windowWidth * 28) / 100,
                                fontFamily: 'montserrat-bold',
                                fontSize: 14,
                                fontWeight: "bold",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: "#57233b"

                            }}> Crear cuenta </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    logo: {
        width: 228,
        height: 64,
    },
    inputuser: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // width: 290,
        // height: 44,
        height: (windowHeight * 5.4) / 100,
        width: (windowWidth * 77.3) / 100,
        borderRadius: 8,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
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
        marginBottom: 8

    },
    crear: {
        width: 146,
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
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 8
    },
    inputpass: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // width: 290,
        // height: 44,
        height: (windowHeight * 5.4) / 100,
        width: (windowWidth * 77.3) / 100,
        borderRadius: 8,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
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
        marginBottom: (windowHeight * 2.9) / 100
    },
    session: {
        // width: 290,
        // height: 44,
        height: (windowHeight * 5.4) / 100,
        width: (windowWidth * 77.3) / 100,
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
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: (windowHeight * 3) / 100
    },
});