import React, { useState, useEffect, useRef, createRef } from 'react';
import { Button, Dimensions, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
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

import { URL_SERVER } from '../constants/urls';
import axios from 'axios';

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
    }, []);
    async function getCSRFToken() {
        // fetch('https://ferrovial.creacionwebprofesional.com/session/token', {
        //     method: 'GET'
        // })
        //     .then(response => {
        //         if (response) {
        //             setCSRF(response);
        //             alert(JSON.stringify(response))
        //         } else {
        //             //alert("Usuario o contraseña incorrecto");
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('Error -> ' + error);
        //     })
        axios.get('https://ferrovial.creacionwebprofesional.com/session/token')
            .then(response => {
                //alert("response token " + JSON.stringify(response));
                setCSRF(response.data);
            })
            .catch(error => {

            });
    }
    async function register() {
        await getCSRFToken();
        // fetch('https://ferrovial.creacionwebprofesional.com/user/register?_format=hal_json', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         // 'cookie': '',
        //         'X-CSRF-Token': CSRF
        //     },
        //     body: JSON.stringify(
        //         {
        //             "name": {
        //                 "value": field_nombre
        //             },
        //             "mail": {
        //                 "value": mail
        //             },
        //             "pass": {
        //                 "value": pass
        //             },
        //             "field_nombre": {
        //                 "value": field_nombre
        //             },

        //             "field_apellidos": {
        //                 "value": field_apellido
        //             }

        //             // name : field_nombre,
        //             // mail : mail,
        //             // pass : pass,
        //             // field_nombre : field_nombre,
        //             // field_apellido : field_apellido
        //         }
        //     )
        // })
        //     .then(async response => {
        //         alert(" response register " + JSON.stringify(response));
        //         if (response.status === 200) {
        //             //await AsyncStorage.setItem('access_token', response.accesstoken)
        //             //navigation.navigate('Main');
        //         } else {
        //             //alert("Usuario o contraseña incorrecto");
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('Error -> ' + error);
        //     })

        const data =
        // {
        //     "name": field_nombre,
        //     "mail": mail,
        //     "pass": pass,
        //     "field_nombre": field_nombre
        // }
        {
            "name": {
                "value": field_nombre
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
        }
        //alert("CSRF " + CSRF);
        axios
            .post(URL_SERVER + 'user/register?_format=hal_json', data,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': CSRF
                    }
                }
            )
            .then(response => {
                if(checked === true){
                    if(response.status === 200){
                        alert("Registrado correctamente");
                        navigation.navigate('Login');
                    }
                } else {
                    alert("No aceptó las políticas de privacidad");
                }
            })
            .catch(error => {
                //alert("axios " + JSON.stringify(axios));
                console.log("error ", error)
            });

    }
    return (
        <View style={{ backgroundColor: COLORS.primary, textAlign: 'center', alignItems: 'center', flex: 1, }}>
            <View style={styles.goBack}>
                <Icon
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{
                    }}
                    name="chevron-back-outline"
                    color="white"
                    size={30}
                />
            </View>
            <View style={{
                alignContent: 'center',
                marginTop: ((windowHeight * 12) / 100) - ((812 + 20) - windowHeight),
                // marginTop: 100,
                flexDirection: 'row',
                height: 64,
                width: 228
            }}>
                <Image style={styles.logo} source={require('../assets/group9.png')}></Image>
            </View>
            <View style={{ marginTop: (windowHeight * 20.56) / (167 + 20), flexDirection: 'column' }}>
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
                <View style={{ marginTop: 5, marginBottom: 24, flexDirection: 'row' }}>
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
                        marginTop: 17,
                        // color: 'white',
                        // fontSize: 16,
                        // width: 207,
                        // height: 18,
                        fontFamily: 'montserrat-medium',
                        fontSize: 14,
                        fontWeight: "500",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        textAlign: "center",
                        color: 'white'

                    }}>Acepto</Text>
                    <Text style={{
                        marginTop: 17,
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
                        justifyContent: 'center',
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
    );
}
const styles = StyleSheet.create({
    checkbox: {
        alignSelf: "center",
    },
    goBack: {
        marginTop: 50,
        marginLeft: 12,
        textAlign: 'left',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },
    logo: {
        width: 228,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    inputuser: {
        // marginTop: 75,
        marginTop: (windowHeight * 20.56) / (167 + 20),
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // color: 'white',
        // height: 50,
        // fontSize: 15,
        // borderRadius: 10,
        // backgroundColor: 'brown',
        // borderColor: 'white',
        // borderWidth: 2
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
        // width: 300,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // color: 'white',
        // height: 50,
        // fontSize: 15,
        // borderRadius: 10,
        // backgroundColor: 'brown',
        // borderColor: 'white',
        // borderWidth: 2
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