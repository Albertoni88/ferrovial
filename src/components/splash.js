import React, { useState, useEffect, useRef, createRef } from 'react';
import { Button, ScrollView, ImageBackground, Dimensions, SafeAreaView, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import SVG from '../components/svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Splash({ navigation, props }) {


    useEffect(() => {
    }, []);



    return (
        <ImageBackground
            source={require('../assets/fondo-login.jpg')}
            style={{
                flex: 1
            }}
        >
            <View
                style={{
                    flex: 1,
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                }}>
                {/* <LOGO /> */}
                <SVG
                    nombre={'Logo'}
                    width={(windowWidth * 61) / 100}
                    height={(windowHeight * 12.9) / 100}
                />
            </View>
        </ImageBackground>
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
        marginTop: 50,
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
        color: 'white',
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