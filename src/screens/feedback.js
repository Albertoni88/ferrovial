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

export default function Feedback({ navigation, props }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [checked, setChecked] = React.useState(false);


    useEffect(() => {
        // alert("navigation " + JSON.stringify(navigation))
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'white', textAlign: 'center', alignItems: 'center', flex: 1, }}>
                <SideBarHeader texto={'Feedback'} navigation={navigation} />
                <View style={{
                    alignContent: 'center',
                    flexDirection: 'row',
                    marginTop: 16,
                    // marginBottom : 158,
                    marginBottom: (windowHeight * 19.5) / 100
                }}>
                    <View style={{ flexDirection: 'column', }}>
                        {/* <Text style={{ marginTop: 20, marginLeft: 15, color: 'black', fontSize: 16 }}>Si crees que hay algo que pueda ayudarnos a </Text>
                    <Text style={{ marginLeft: 15, color: 'black', fontSize: 16 }}>mejorar, cuentános... </Text> */}
                        {/* <Text style={{ marginTop: 20, marginLeft: 15, color: 'black', fontSize: 16 }}>Si crees que hay algo que pueda ayudarnos a </Text> */}
                        <Text style={{
                            // marginLeft: 15,
                            // color: 'black',
                            // fontSize: 16
                            width: 351,
                            height: 44,
                            fontFamily: 'nunito-semibold',
                            fontSize: 16,
                            fontWeight: "600",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: COLORS.browngrey
                        }}>
                            Si crees que hay algo que pueda ayudarnos a mejorar, cuéntanos…
                        </Text>
                    </View>
                </View>
                <View style={{ marginTop: 5, flexDirection: 'column' }}>
                    <TextInput
                        placeholder={'Asunto'}
                        placeholderTextColor={'white'}
                        style={styles.inputuser}
                        onChangeText={(asunto) => {
                        }}
                    />
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder={'Descripción'}
                        placeholderTextColor={'white'}
                        style={styles.descripcion}
                        onChangeText={(descripcion) => {
                            //this.setState({ email });
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => {

                        }}
                        style={{
                            // marginTop: 200,
                            // borderRadius: 30,
                            // backgroundColor: 'brown',
                            // width: 100,
                            // height: 50

                            alignItems: 'center',
                            alignContent: 'center',
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
                            // alignSelf: 'center',
                            // fontSize: 15,
                            // textAlign: 'center',
                            // alignItems: 'center',
                            // color: 'white'
                            width: 71,
                            height: 24,
                            fontFamily: 'nunito-bold',
                            fontSize: 18,
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0.45,
                            textAlign: "center",
                            color: 'white'
                        }}>
                            Guardar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View >
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
        // marginTop: 75,
        // width: 300,
        // color: 'white',
        // height: 50,
        // fontSize: 15,
        // borderRadius: 10,
        // backgroundColor: 'grey',

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
    descripcion: {
        // marginTop: 15,
        // width: 300,
        // color: 'white',
        // height: 150,
        // fontSize: 15,
        // borderRadius: 10,
        // backgroundColor: 'grey',

        textAlign: 'center',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 290,
        height: 148,
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
        marginBottom: (windowHeight * 22) / 100
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