import React, { useState, useEffect, useRef, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guardarToken } from '../store/actions/userActions';
//import * as Google from 'expo-auth-session/providers/google';
import { Button, Dimensions, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import { URL_SERVER } from '../constants/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Login({ props, navigation }) {

    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    const dispatch = useDispatch();
    
    useEffect(() => {
        // alert("URL_SERVER " + URL_SERVER)
    }, []);

    async function logIn() {
        
        const data = {
            'name': name,
            'pass': pass
        }
        axios
            .post(URL_SERVER + 'user/login?_format=json', data,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'cookie': ''
                    }
                }
            )
            .then(async response => {
                if (response.status === 200) {
                    //await AsyncStorage.setItem('@access_token', response.data.access_token);
                    //alert("AsyncStorage.setItem('@access_token') " + await AsyncStorage.getItem('@access_token'));
                    dispatch(guardarToken(response.data.access_token))
                    navigation.navigate('Main');

                } else {
                    alert("Usuario o contraseña incorrecto")
                }
            })
            .catch(error => {
                alert("error1 " + error)
            });
    }


    return (
        <View style={{ backgroundColor: COLORS.primary, textAlign: 'center', alignItems: 'center', flex: 1, }}>
            <View style={{
                alignContent: 'center',
                marginTop: ((windowHeight * 12) / 100) - ((812 - 20) - windowHeight),
                // marginTop: 100,
                flexDirection: 'row',
                height: 64,
                width: 228
            }}>
                <Image style={styles.logo} source={require('../assets/group9.png')}></Image>
            </View>
            <View style={{
                //marginTop: (windowHeight * 27) / 100,
                marginTop: 219,
                flexDirection: 'column'
            }}>
                <TextInput
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
                        width: 231,
                        height: 18,
                        fontFamily: 'montserrat-bold',
                        fontSize: 14,
                        fontWeight: "bold",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        textAlign: "center",
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
                        fontSize: 14,
                        fontWeight: "500",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        textAlign: "center",
                        color: 'white',
                        marginTop: 24,
                        //marginBottom: (windowHeight * 15) / 121
                        marginBottom: 121
                    }}>No recuerdo mi contraseña...
                </Text>
                <Text style={{
                    fontFamily: 'montserrat-medium',
                    fontSize: 14,
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
                        width: 105,
                        height: 18,
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
    );
}
const styles = StyleSheet.create({
    logo: {
        width: 228,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80
    },
    inputuser: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 290,
        height: 44,
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
        width: 290,
        height: 44,
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
        marginBottom: 24
    },
    session: {
        width: 290,
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
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: (windowHeight * 3) / 100
    },
});