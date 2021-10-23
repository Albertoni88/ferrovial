import React, { useEffect, useState } from 'react';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';
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
import { SvgUri } from 'react-native-svg';
import { tomarIntros, loginUser, guardarToken } from '../store/actions/userActions';
import Splash from './splash';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function WelcomeSlides({ navigation }) {

    const dispatch = useReduxDispatch();
    const [numero, setNumero] = useState(0);
    const [splash, setSplash] = useState(false)
    const [slides, setSlides] = useState([]);
    const [hidePagination, setHidePagination] = useState(false)
    const token = useReduxSelector((state) => state.user.access_token);
    const user = useReduxSelector((state) => state.user.userInfo);
    const userlogin = useReduxSelector((state) => state.user.userlogin);
    const contra = useReduxSelector((state) => state.user.pass);
    const csrf = useReduxSelector((state) => state.user.csrf);

    useEffect(() => {
        setTimeout(()=>{
            setSplash(true);
        },2000)
        tomarIntros()
            .then(response => {
                setSlides(response);
            })
            .catch(error => {
            });

    }, [])
    const _renderItem = ({ item, index }) => {
        var tit = item.titulo.replace(/<p>/g, '');
        while (tit.includes('</p>')) {
            tit = tit.replace('</p>', '');
        }

        var des = item.descripcion.replace(/<p>/g, '');
        while (des.includes('</p>')) {
            des = des.replace('</p>', '');
        }
        // setNumero(index)

        return (
            <View style={{

                alignItems: 'center',
                alignSelf: 'center',
                height: '20%',
                width: '50%',
                marginTop: 267,
                // position : 'absolute'
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
                        {tit}
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
                            {des}
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
                            width: 112,
                            height: 44,
                            alignSelf: 'center',
                            position: 'absolute',
                            bottom: 20
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                bottom: 0,
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
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignContent: 'center'
                            }}
                            onPress={() => {
                                if (token !== null && token !== undefined) {
                                    const data = {
                                        'name': userlogin,
                                        'pass': contra
                                    }

                                    loginUser(data)
                                        .then(async response => {
                                            if (response.status === 200) {
                                                dispatch(guardarToken({ "userlogin" : userlogin, "pass": contra, "token": response.data.access_token, "csrf": response.data.csrf_token }))
                                                navigation.navigate('Main');

                                            } else {
                                                alert("Usuario o contraseña incorrecto")
                                            }
                                        })
                                        .catch(error => {
                                            
                                        });
                                } else {
                                    navigation.navigate('Login');
                                }
                            }}
                        >
                            <Text
                                // onPress={() => {
                                //     if (token !== null && token !== undefined) {
                                //         navigation.navigate('Main');
                                //     } else {
                                //         navigation.navigate('Login');
                                //     }
                                // }}
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

    // <SafeAreaView style={{ zIndex: -11111, flex: 1 }}>
    if (splash === false) {
        return (<Splash />);
    }
    else
        return (
            <View style={{ flex: 1, zIndex: -11111,  }}>

                {
                    slides !== null && slides !== undefined &&
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
                        renderPagination={hidePagination === false ? numero : _renderDoneButton}
                        // renderNextButton={_renderNextButton}
                        renderItem={_renderItem}
                        // keyExtractor={(item, index) => index.toString()}
                        data={slides}
                        onDone={_onDone}
                    />
                }
            </View>
        )
    // </SafeAreaView>
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
