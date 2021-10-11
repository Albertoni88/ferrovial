import React, { useState, useEffect, useRef, createRef } from 'react';
import { Button, ImageBackground, Dimensions, SafeAreaView, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SVG from '../components/svg';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ResetPassword({ navigation, props }) {

    useEffect(() => {
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../assets/fondo.jpg')}
                //source={{ uri: incidencia.imagen }}
                style={{
                    flex: 1
                }}
            // imageStyle={styles.image}
            >
                <View style={{ opacity : 0.8, backgroundColor: COLORS.primary, flex: 1, }}>
                    <View style={styles.goBack}>
                        <View style={styles.containerSVG}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            >
                                <SVG nombre={'Volver'} width={20} height={20} />
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
                        <Image style={styles.logo} source={require('../assets/group9.png')}></Image>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <TextInput
                            placeholder={'email'}
                            placeholderTextColor={'white'}
                            style={styles.inputuser}
                            onChangeText={(email) => {
                                //this.setState({ email });
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {

                            }}
                            style={{
                                width: 290,
                                height: 44,
                                borderRadius: 8,
                                backgroundColor: 'white',
                                justifyContent: 'center',
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
                                alignSelf: 'center',
                            }}>
                            <Text style={{
                                width: 231,
                                height: 18,
                                fontFamily: 'montserrat-bold',
                                fontSize: 14,
                                fontWeight: "bold",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: "#57233b",
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center'
                            }}> Recibir clave </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
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
        //marginTop: 30,
    },
    inputuser: {
        marginTop: (windowHeight * 32.75) / 100,
        marginBottom: 24,
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
});