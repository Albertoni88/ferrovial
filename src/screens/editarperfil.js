import React, { useState, useEffect, useRef, createRef } from 'react';
import { Button, SafeAreaView, Dimensions, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox } from 'react-native-elements'
import SideBarHeader from '../components/sideBarHeader';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { height } from 'styled-system';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EditarPerfil({ navigation, props }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [checked, setChecked] = React.useState(false);


    useEffect(() => {
        // alert("navigation " + JSON.stringify(navigation))
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'white', textAlign: 'center', alignItems: 'center', flex: 1, }}>
                <SideBarHeader texto={'Editar perfil'} navigation={navigation} />
                <View style={{
                    alignContent: 'center',
                    flexDirection: 'row',
                    // marginTop: 16
                    marginTop: (windowHeight * 1.9) / 100
                }}>
                    <View style={{ flexDirection: 'column', }}>
                        <Text style={{
                            width: (windowWidth * 94) / 100,
                            height: 22,
                            fontFamily: 'nunito-semibold',
                            fontSize: 16,
                            fontWeight: "600",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: COLORS.browngrey
                        }}>
                            Puedes editar los datos de tu usuario
                        </Text>
                    </View>
                </View>
                <View style={{
                    marginTop: (windowHeight * 25.3) / 100,
                    //marginTop: 206,
                    flexDirection: 'column'
                }}>
                    <TextInput
                        placeholder={'Nombre'}
                        placeholderTextColor={'white'}
                        style={styles.inputuser}
                        onChangeText={(nombre) => {
                        }}
                    />
                    <TextInput
                        placeholder={'Apellidos'}
                        placeholderTextColor={'white'}
                        style={styles.apellidos}
                        onChangeText={(apellidos) => {
                            //this.setState({ email });
                        }}
                    />
                    <TextInput
                        placeholder={'Email'}
                        placeholderTextColor={'white'}
                        style={styles.email}
                        onChangeText={(email) => {
                            //this.setState({ email });
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => {

                        }}
                        style={{
                            marginTop: (windowHeight * 27) / 100,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            width: 114,
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
                            alignSelf: 'center',
                            // fontSize: 15,
                            textAlign: 'center',
                            alignItems: 'center',
                            // color: 'white'
                            width: 75,
                            height: 24,
                            fontFamily: 'nunito-bold',
                            fontSize: 18,
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0.45,
                            textAlign: "center",
                            color: 'white'
                        }}> Guardar </Text>
                    </TouchableOpacity>
                </View>
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
    apellidos: {
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
    email: {
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