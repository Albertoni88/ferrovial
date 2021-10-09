import React, { useState, useEffect, useRef, createRef } from 'react';
import { Dimensions, Button, ImageBackground, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import { marginTop } from 'styled-system';

import { COLORS } from '../../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { height } from 'styled-system';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CarIncidenciaMapa({ navigation, props, incidencia }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const image = { uri: require("../../assets/1.png") };

    useEffect(() => {
    }, []);

    return (

        <View style={styles.containerMain}>
            <View style={styles.bottomView}>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => {
                        navigation.navigate('IncidenciaDetalles', { incidencia: incidencia });
                    }}>
                    <ImageBackground
                        source={require('../../assets/1.png')}
                        style={styles.imageContainer}
                        imageStyle={styles.image}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                flexDirection: 'row',
                                width: 84,
                                height: 24,
                                opacity: 0.9,
                                borderRadius: 12,
                                backgroundColor: COLORS.primary,
                                alignSelf: 'center',
                                marginLeft: 8,
                                marginTop: 8
                            }}>
                                <Feather
                                    onPress={() => {

                                    }}
                                    style={{
                                        alignSelf: 'center',
                                        marginLeft: 8
                                    }}
                                    name="calendar"
                                    color="white"
                                    size={15}
                                />
                                <Text style={{
                                    // color: 'white',
                                    // fontSize: 15,
                                    textAlign: 'left',
                                    // marginTop: 5
                                    width: 54,
                                    height: 14,
                                    fontFamily: "nunito-regular",
                                    fontSize: 10,
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    color: 'white',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center'
                                }}>
                                    {incidencia.fecha}
                                </Text>
                            </View>
                            <Icon
                                onPress={() => {

                                }}
                                style={{
                                    flex: 1,
                                    textAlign: 'right',
                                    marginRight: 11,
                                    marginTop: 8
                                }}
                                name="heart-outline"
                                color="white"
                                size={30}
                            />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        onPress={() => {

                        }}
                        style={{
                            marginLeft: 12,
                            // marginTop: 3
                        }}
                        name="location-outline"
                        color="grey"
                        size={30}
                    />
                    <Text style={{
                        fontSize: 15,
                        marginTop: 8,
                        fontFamily: "nunito-regular",
                        fontSize: 15,
                        fontWeight: "normal",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        color: COLORS.browngrey
                    }}>
                        {incidencia.autor}
                    </Text>
                    <Icon
                        onPress={() => {

                        }}
                        style={{
                            marginLeft: 100,
                        }}
                        name="location-outline"
                        color="grey"
                        size={30}
                    />
                    <Text style={{
                        fontSize: 15,
                        marginTop: 8,
                        fontFamily: "nunito-regular",
                        fontSize: 15,
                        fontWeight: "normal",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        color: COLORS.browngrey
                    }}>
                        {incidencia.categoria}
                    </Text>
                    <Icon
                        onPress={() => {

                        }}
                        style={{
                            marginLeft: 8,
                            // marginTop: 10,
                            textAlign: 'right',
                            // flex: 3,
                        }}
                        name="location-outline"
                        color="grey"
                        size={30}
                    />
                    <Text style={{
                        fontSize: 15,
                        marginTop: 8,
                        fontFamily: "nunito-regular",
                        fontSize: 15,
                        fontWeight: "normal",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        color: COLORS.browngrey
                    }}>
                        {incidencia.estado}
                    </Text>
                </View>
                <View
                    style={{
                        // borderBottomColor: 'black',
                        // borderBottomWidth: 1,
                        // marginHorizontal: 10,
                        alignSelf: 'center',
                        marginTop: 6,
                        width: (windowWidth * 95.7) / 100,
                        height: 1,
                        opacity: 0.2,
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderColor: COLORS.browngrey
                    }}
                />
                <Text style={{
                    width: (windowWidth * 93.6) / 100,
                    height: 44,
                    fontFamily: "nunito-semibold",
                    fontSize: 16,
                    fontWeight: "600",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: COLORS.primary, marginLeft: 12
                }}>
                    {/* {incidencia.nombre} */}
                    Nombre de la incidencia que ocupa 2 líneas para tener el ejemplo en el diseño de la app
                </Text>

                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        onPress={() => {

                        }}
                        style={{
                            marginLeft: 12,
                            marginTop: 10,
                            textAlign: 'left',
                            // flex: 1,
                        }}
                        name="location-outline"
                        color="grey"
                        size={30}
                    />
                    <Text style={{
                        color: 'grey',
                        fontSize: 15,
                        //textAlign: 'right',
                        flex: 1,
                        marginTop: 15
                    }}>
                        {incidencia.direccion}
                    </Text>
                </View>
                <View
                    style={{
                        // borderBottomColor: 'black',
                        // borderBottomWidth: 1,
                        // marginHorizontal: 10,
                        alignSelf: 'center',
                        marginTop: 6,
                        width: (windowWidth * 95.7) / 100,
                        height: 1,
                        opacity: 0.2,
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderColor: COLORS.browngrey,
                        marginBottom: 8
                    }}
                />
                {/* Segun tipo */}
                {
                    incidencia.tipo === 1 &&
                    <View style={{ justifyContent: 'center', flexDirection: 'row', }}>
                        <Text style={{ fontSize: 15, color: 'red' }}>
                            30%
                        </Text>
                        <View style={{ height: 25, marginTop: 5 }}>
                            <Progress.Bar unfilledColor={'green'} style={{ marginHorizontal: 10 }} color={'red'} borderWidth={0} progress={0.3} width={300} height={10} />
                        </View>
                        <Text style={{ fontSize: 15, color: 'green' }}>
                            70%
                        </Text>
                    </View>
                }
                {
                    incidencia.tipo === 2 &&
                    <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row', }}>
                        <View style={{ borderRadius: 30, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', height: 25, width: 65, marginBottom: 3, }}>
                            <Text style={{ fontSize: 15, color: 'white' }}>
                                A) 20%
                            </Text>
                        </View>
                        <View style={{ marginLeft: 3, borderRadius: 30, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', height: 25, width: 65, marginBottom: 3, }}>
                            <Text style={{ fontSize: 15, color: 'white' }}>
                                B) 6%
                            </Text>
                        </View>
                        <View style={{ marginLeft: 3, borderRadius: 30, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'center', height: 25, width: 65, marginBottom: 3, }}>
                            <Text style={{ fontSize: 15, color: 'white' }}>
                                C) 44%
                            </Text>
                        </View>
                        <View style={{ marginLeft: 3, borderRadius: 30, backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center', height: 25, width: 65, marginBottom: 3, }}>
                            <Text style={{ fontSize: 15, color: 'white' }}>
                                D) 19%
                            </Text>
                        </View>
                        <View style={{ marginLeft: 3, borderRadius: 30, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', height: 25, width: 65, marginBottom: 3, }}>
                            <Text style={{ fontSize: 15, color: 'white' }}>
                                E) 11%
                            </Text>
                        </View>
                    </View>
                }
                {
                    incidencia.tipo === 3 &&
                    <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row', }}>
                        <View style={{ borderRadius: 30, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', height: 25, width: 150, marginBottom: 3, }}>
                            <Text style={{ fontSize: 15, color: 'white' }}>
                                850 firmas
                            </Text>
                        </View>

                    </View>
                }
                {
                    incidencia.tipo === 4 &&
                    <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row', }}>
                        <Text style={{ fontSize: 15, color: 'blue' }}>
                            50
                        </Text>
                        <View style={{ height: 25, marginTop: 5 }}>
                            <Progress.Bar unfilledColor={'green'} style={{ marginHorizontal: 10 }} color={'blue'} borderWidth={0} progress={0.3} width={300} height={10} />
                        </View>
                        <Text style={{ fontSize: 15, color: 'green' }}>
                            100
                        </Text>
                    </View>
                }
            </View>
            {/* <Text style={styles.textStyle}>Bottom View</Text> */}
        </View >
    );
}
const styles = StyleSheet.create({
    containerMain: {
        //flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        // borderWidth: 3,
        // borderColor: 'red',
        backgroundColor: 'white',
        width: '100%',
        height: 480,
        // marginTop: 265
    },
    bottomView: {
        // width: '100%',
        // height: 325,
        // backgroundColor: 'transparent',
        // justifyContent: 'center',
        // alignItems: 'center',
        // position: 'absolute', //Here is the trick
        // bottom: 120, //Here is the trick
        // borderWidth : 3,
        // borderColor : 'blue'
    },
    textStyle: {
        color: '#fff',
        fontSize: 18,
    },
    container: {
        // justifyContent: 'center',
        // alignContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center',
        // height: 200,
        // width: 350,
        // height: 150,
        // borderRadius: 20,
        // marginTop: 5,
        //flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // height: (windowHeight * 31.65) / 100,
        height: (windowHeight * 22) / 100,
        width: (windowWidth * 95.7) / 100,
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 10,
    },
    // imageContainer: {
    //     //flex: 1,
    //     width: '80%',
    //     height: 150,
    //     // borderColor: 'green',
    //     // borderWidth: 3,
    //     marginTop: 5,
    //     alignItems: 'center',
    //     alignSelf: 'center'
    // },
    // image: {
    //     width: '100%',
    //     height: 150,
    //     borderRadius: 15,
    //     marginTop: 0,
    //     marginLeft: 0
    //     //marginTop : 145,
    //     //resizeMode: 'contain',
    // },
    imageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        //resizeMode: 'contain',
    },
});