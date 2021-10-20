import React, { useState, useEffect, useRef, createRef } from 'react';
import { Button, ImageBackground, SafeAreaView, Dimensions, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//import CheckBox from '@react-native-community/checkbox';
// import { Checkbox } from 'react-native-paper';
import { CheckBox } from 'react-native-elements'
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerAccount, getCSRFToken } from '../store/actions/userActions';
import { correoValidar } from '../constants/validation';
import SVG from '../components/svg';
import LOGO from '../components/logo';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CreateAccount({ navigation, props }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [field_nombre, setNombre] = useState('');
    const [field_apellido, setApellido] = useState('');
    const [CSRF, setCSRF] = useState('');

    useEffect(() => {
        getCSRFToken()
            .then(response => {
                setCSRF(response.data);
            })
            .catch(error => {

            });
    }, []);

    async function register() {
        const validoCorreo = correoValidar(mail);
        if (pass !== '' && mail !== '' && field_apellido !== '' && field_nombre !== '') {

            if (validoCorreo) {

                if (checked === true) {
                    const data =
                    {
                        "name": {
                            "value": mail
                        },
                        "mail": {
                            "value": mail
                        },
                        "pass": {
                            "value": pass
                        },
                        "field_nombre": {
                            "value": field_nombre
                        },

                        "field_apellidos": {
                            "value": field_apellido
                        }
                    };
                    registerAccount(data, CSRF)
                        .then(response => {
                            if (checked === true) {
                                if (response.status === 200) {
                                    alert("Registrado correctamente");
                                    navigation.navigate('Login');
                                }
                            } else {
                                alert("No aceptó las políticas de privacidad");
                            }
                        })
                        .catch(error => {
                            
                        });
                } else {
                    alert("No aceptó las políticas de privacidad")
                }
            }
            else {
                alert("Correo inválido");
            }
        } else {
            alert("Tiene campos vacíos");
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                // source={require('../assets/Bitmap.jpg')}
                source={require('../assets/fondo-login.jpg')}
                style={{
                    flex: 1
                }}
            // imageStyle={styles.image}
            >
                <View style={{ flex: 1, }}>
                    <View style={styles.goBack}>
                        <View style={styles.containerSVG}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            >
                                <SVG nombre={'VolverBlanco'} width={20} height={20} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        alignContent: 'center',
                        flexDirection: 'row',
                        marginTop: (windowHeight * 3) / 100,
                        height: (windowHeight * 7.8) / 100,
                        width: (windowWidth * 60.8) / 100,
                        marginLeft: 78,
                        marginRight: 74
                    }}>
                        <View style={{ zIndex: 1111111, width: (windowWidth * 61) / 100, height: (windowHeight * 12.9) / 100 }}>
                            {/* <LOGO /> */}
                            <SVG nombre={'Logo'} width={(windowWidth * 61) / 100} height={(windowHeight * 12.9) / 100} />
                        </View>
                        {/* <Image style={styles.logo} source={require('../assets/group9.png')}></Image> */}
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <TextInput
                            placeholder={'Nombre'}
                            placeholderTextColor={'white'}
                            style={styles.inputuser}
                            onChangeText={(nombre) => {
                                setNombre(nombre)
                            }}
                        />
                        <TextInput
                            placeholder={'Apellidos'}
                            placeholderTextColor={'white'}
                            style={styles.apellidos}
                            onChangeText={(apellidos) => {
                                setApellido(apellidos)
                            }}
                        />
                        <TextInput
                            placeholder={'email'}
                            placeholderTextColor={'white'}
                            style={styles.apellidos}
                            onChangeText={(email) => {
                                setMail(email)
                            }}
                        />
                        <TextInput
                            secureTextEntry={true}
                            placeholder={'contraseña'}
                            placeholderTextColor={'white'}
                            style={styles.pass}
                            onChangeText={(contrasenna) => {
                                setPass(contrasenna)
                            }}
                        />
                        <View style={{
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: 5,
                            marginBottom: 24,
                            flexDirection: 'row'
                        }}>
                            <CheckBox
                                style={{
                                    width: 15,
                                    height: 15,
                                    borderRadius: 2,
                                    borderStyle: "solid",
                                    borderWidth: 1,
                                }}
                                checked={checked}
                                checkedColor={'white'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            />
                            <Text style={{
                                marginLeft: -15,
                                marginTop: 5,
                                fontFamily: 'montserrat-medium',
                                fontSize: 14,
                                fontWeight: "500",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: 'white'

                            }}>Acepto</Text>
                            <Text style={{
                                marginTop: 5,
                                marginLeft: 3,
                                textDecorationLine: 'underline',
                                fontFamily: 'montserrat-medium',
                                fontSize: 14,
                                fontWeight: "500",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: 'white',

                            }}>política de privacidad</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                register();
                            }}
                            style={{
                                marginTop: -15,
                                borderRadius: 10,
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
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
                                borderColor: "#dfdfdf"
                            }}>
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
                            }}> Crear cuenta </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    checkbox: {
        alignSelf: "center",
    },
    containerSVG: {
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary,
    },
    goBack: {
        position: 'relative',
        marginTop: 30,
        marginLeft: 12,
        width: 20,
        height: 20,
    },
    logo: {
        width: 228,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputuser: {
        // marginTop: 75,
        marginTop: (windowHeight * 20.56) / 100,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
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
    },
    apellidos: {
        marginTop: 8,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
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
        borderColor: "#dfdfdf"
    },
    pass: {
        marginTop: 8,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
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
        borderColor: "#dfdfdf"
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