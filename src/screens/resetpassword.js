import React, { useState, useEffect, useRef, createRef } from 'react';
import { Button, Dimensions, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ResetPassword({ navigation, props }) {

    useEffect(() => {
    }, []);
    
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
                marginTop: ((windowHeight * 12) / 100) - ((812 - 20) - windowHeight),
                // marginTop: 100,
                flexDirection: 'row',
                height: 64,
                width: 228
            }}>
                <Image style={styles.logo} source={require('../assets/group9.png')}></Image>
            </View>
            <View style={{ marginTop: (windowHeight * 32.75) / 266, flexDirection: 'column' }}>
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
                        borderColor: "#dfdfdf"
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
                        alignItems : 'center',
                        justifyContent: 'center',
                        alignSelf : 'center'
                    }}> Recibir clave </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
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
        marginTop: (windowHeight * 32.75) / 266,
        // marginBottom: (windowHeight * 3) / 24,
        marginBottom: 24,
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