import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Platform, Image, Dimensions, Button, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_SERVER } from '../constants/urls';
import axios from 'axios';
import { SvgUri } from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function WelcomeSlides({ navigation }) {

    const [numero, setNumero] = useState(0);
    const [slides, setSlides] = useState([]);
    const [hidePagination, setHidePagination] = useState(false)

    useEffect(() => {
        // navigation.navigate('Login');
        axios.get(URL_SERVER + 'rest/intros?_format=json',
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'cookie': '',
                }
            }
        )
            .then(response => {
                // alert("response.data " + JSON.stringify)
                setSlides(response.data)
            })
            .catch(error => {
                //alert("error1 " + error)
            });
    }, [])
    const _renderItem = ({ item, index }) => {
        // setNumero(index)

        return (
            <View style={{
                alignItems: 'center',
                alignSelf: 'center',
                height: '20%',
                width: '50%',
                marginTop: 267,
            }}>
                <SvgUri
                    width="100%"
                    height="100%"
                    uri={item.imagen}
                />
                <View style={{
                    flexDirection: 'column',
                    width: 325,
                    height: 165,
                    marginTop: 8,
                }}>
                    <Text style={{
                        fontSize: 24,
                        color: COLORS.primary,
                        letterSpacing: 0,
                        fontFamily: 'nunito-bold',
                        textAlign: 'center'
                    }}>
                        {item.titulo}
                    </Text>
                    <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            letterSpacing: 0,
                            fontFamily: 'nunito-bold',
                            textAlign: 'center',
                            fontWeight: "normal",
                        }}>
                            {item.descripcion}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
    const _onDone = () => {
        navigation.navigate('Login');
    }
    const _onSlideChange = (index, lastIndex) => {
        if (slides !== null && slides !== undefined) {
            if (index === slides.length - 1) {
                setHidePagination(true);
            } else {
                setHidePagination(false);
            }
        }
        setNumero(index)
    };
    const _renderDoneButton = () => {
        if (slides !== null && slides !== undefined) {
            if (numero === slides.length - 1) {
                return (
                    <View
                        style={{
                            zIndex: 1111111,
                            width: 112,
                            height: 44,
                            marginLeft: Platform.OS === 'android' ? 0 : -250,
                            //marginTop : -150,
                        }}
                    >
                        <TouchableOpacity
                            style={{

                                zIndex: 11111111111,
                                width: 112,
                                height: 44,
                                borderRadius: 25,
                                backgroundColor: 'rgb(80, 23, 49)',
                                shadowColor: "rgba(0, 0, 0, 0.1)",
                                shadowOffset: {
                                    width: 0,
                                    height: 4
                                },
                                shadowRadius: 10,
                                shadowOpacity: 1,
                                alignSelf: 'center',
                                //marginLeft: -380,
                                // marginTop : -100,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignContent: 'center'
                            }}
                            onPress={() => {
                                navigation.navigate('Login');
                            }}
                        >
                            <Text
                                onPress={() => {
                                    navigation.navigate('Login');
                                }}
                                style={{
                                    //zIndex: 11111,
                                    width: 78,
                                    height: 24,
                                    fontFamily: "nunito-bold",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    fontStyle: "normal",
                                    letterSpacing: 0.45,
                                    textAlign: "center",
                                    alignContent: 'center',
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}>
                                ¡Vamos!
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            }
        }
    };
    return (
        <SafeAreaView style={{ zIndex: -11111, flex: 1 }}>
            <View style={{ flex: 1, zIndex: -11111 }}>

                <AppIntroSlider
                    showNextButton={false}
                    activeDotStyle={hidePagination ? styles.hideDot : styles.activeDot}
                    // dotStyle={{
                    //     backgroundColor: '#d8d8d8',
                    //     width: 10,
                    //     height: 10,
                    //     borderRadius: 7
                    // }}
                    dotStyle={hidePagination ? styles.hideDot : styles.inactiveDot}
                    onSlideChange={_onSlideChange}
                    renderDoneButton={_renderDoneButton}
                    // renderNextButton={_renderNextButton}
                    renderItem={_renderItem}
                    data={slides}
                    onDone={_onDone}
                />
                {/* {
                    (numero === slides.length - 1) &&
                    <View>
                        <View style={{
                            alignItems: 'center',
                            alignSelf: 'center',
                            height: '20%',
                            width: '50%',
                            marginTop: 225,
                        }}>
                            <SvgUri
                                width="100%"
                                height="100%"
                                uri={slides[slides.length - 1].imagen}
                            />
                            <View style={{
                                flexDirection: 'column',
                                width: 325,
                                height: 165,
                                marginTop: 8,
                            }}>
                                <Text style={{
                                    fontSize: 24,
                                    color: COLORS.primary,
                                    letterSpacing: 0,
                                    fontFamily: 'nunito-bold',
                                    textAlign: 'center'
                                }}>
                                    {slides[slides.length - 1].titulo}
                                </Text>
                                <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: COLORS.primary,
                                        letterSpacing: 0,
                                        fontFamily: 'nunito-bold',
                                        textAlign: 'center',
                                        fontWeight: "normal",
                                    }}>
                                        {slides[slides.length - 1].descripcion}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                //borderWidth : 2,
                                zIndex: 1111111,
                                width: 112,
                                height: 44,
                                marginLeft: 145,
                                marginTop: Platform.OS ==='ios' ? 240 : 340,
                            }}
                        >
                            <TouchableOpacity
                                style={{

                                    zIndex: 11111111111,
                                    width: 112,
                                    height: 44,
                                    borderRadius: 25,
                                    backgroundColor: 'rgb(80, 23, 49)',
                                    shadowColor: "rgba(0, 0, 0, 0.1)",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4
                                    },
                                    shadowRadius: 10,
                                    shadowOpacity: 1,
                                    alignSelf: 'center',
                                    // marginLeft: 300,
                                    // marginTop: 400,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignContent: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('Login');
                                }}
                            >
                                <Text
                                    onPress={() => {
                                        navigation.navigate('Login');
                                    }}
                                    style={{
                                        //zIndex: 11111,
                                        width: 78,
                                        height: 24,
                                        fontFamily: "nunito-bold",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        fontStyle: "normal",
                                        letterSpacing: 0.45,
                                        textAlign: "center",
                                        alignContent: 'center',
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}>
                                    ¡Vamos!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                } */}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    inactiveDot: {
        backgroundColor: '#d8d8d8',
        width: 10,
        height: 10,
        borderRadius: 7
    },
    hideDot: {
        display: 'none',
    },
    activeDot: {
        backgroundColor: 'rgb(80, 23, 49)',
        width: 18,
        height: 18,
        borderRadius: 10
    },
    buttonCircle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
