import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
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

// const slides = [
//     {
//         key: 'one',
//         title: 'Title 1',
//         text: 'Description.\nSay something cool',
//         image: require('../assets/1.png'),
//         backgroundColor: '#59b2ab',
//     },
//     {
//         key: 'two',
//         title: 'Title 2',
//         text: 'Other cool stuff',
//         image: require('../assets/2.png'),
//         backgroundColor: '#febe29',
//     },
//     {
//         key: 'three',
//         title: 'Rocket guy',
//         text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
//         image: require('../assets/3.png'),
//         backgroundColor: '#22bcb5',
//     }
// ];

export default function WelcomeSlides({ navigation }) {

    const [numero, setNumero] = useState(0);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        axios
            .get(URL_SERVER + 'rest/intros?_format=json',
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'cookie': '',
                    }
                }
            )
            .then(response => {
                //alert("response register " + JSON.stringify(response.data))
                setSlides(response.data)
                //alert("slides " + JSON.stringify(slides));
            })
            .catch(error => {
                alert("error1 " + error)
            });

        // fetch(URL_SERVER + 'rest/intros?_format=json', {
        //     method: 'GET',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'cookie': '',
        //     }
        // })
        //     .then(async response => {
        //         alert("response.accesstoken " + JSON.stringify(response))
        //         if (response.status === 200) {
        //             // await AsyncStorage.setItem('access_token', response.accesstoken)
        //             // navigation.navigate('Main');
        //         } else {
        //             alert("Usuario o contraseña incorrecto");
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('Error -> ' + error);
        //     })
    }, [])
    const _renderItem = ({ item, index }) => {
        setNumero(index)
        // alert("item " + JSON.stringify(item));        
        // if (index === 0) {
        //     setNumero(0);
        //     return (
        //         <View style={{
        //             alignItems: 'center',
        //             alignSelf: 'center',
        //             height: '20%',
        //             width: '50%',
        //             marginTop: 267,
        //         }}>
        //             {/* <Image style={{
        //                 height: '100%',
        //                 width: '100%',
        //                 borderRadius: 20
        //             }} source={item.imagen} /> */}
        //             <SvgUri
        //                 width="100%"
        //                 height="100%"
        //                 uri={item.imagen}
        //             />
        //             <View style={{
        //                 flexDirection: 'column',
        //                 width: 325,
        //                 height: 165,
        //                 marginTop: 8,
        //             }}>
        //                 <Text style={{
        //                     fontSize: 24,
        //                     color: COLORS.primary,
        //                     letterSpacing: 0,
        //                     fontFamily: 'nunito-bold',
        //                     textAlign: 'center'
        //                 }}>
        //                     {item.titulo}
        //                 </Text>
        //                 {/* <Text style={{
        //                     fontSize: 24,
        //                     color: COLORS.primary,
        //                     letterSpacing: 0,
        //                     fontFamily: 'nunito-bold',
        //                     marginBottom: 30,
        //                     textAlign: 'center'
        //                 }}>
        //                     desperfecto para arreglar?
        //                 </Text> */}
        //                 <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        //                     <Text style={{
        //                         fontSize: 16,
        //                         color: COLORS.primary,
        //                         letterSpacing: 0,
        //                         fontFamily: 'nunito-bold',
        //                         textAlign: 'center',
        //                         fontWeight: "normal",
        //                     }}>
        //                         {/* {'Crea una incidencia' + ' '} */}
        //                         {item.descripcion}
        //                     </Text>
        //                     {/* <Text style={{
        //                         fontSize: 16,
        //                         color: COLORS.primary,
        //                         letterSpacing: 0,
        //                         fontFamily: 'nunito-regular',
        //                         textAlign: 'center',
        //                     }}>
        //                         en menos de 2
        //                     </Text> */}
        //                 </View>
        //                 <Text style={{
        //                     fontSize: 16,
        //                     color: COLORS.primary,
        //                     letterSpacing: 0,
        //                     fontFamily: 'nunito-regular',
        //                     textAlign: 'center',
        //                 }}>
        //                     minutos para informar al ayuntamiento.
        //                 </Text>
        //             </View>
        //         </View>
        //     );
        // }
        // if (index === 1) {
        //     setNumero(1);
        //     return (
        //         <View style={{
        //             alignItems: 'center',
        //             alignSelf: 'center',
        //             height: '20%',
        //             width: '50%',
        //             marginTop: 267,
        //         }}>
        //             {/* <Image style={{
        //                 height: '100%',
        //                 width: '100%',
        //                 borderRadius: 20
        //             }} source={item.imagen} /> */}
        //             <SvgUri
        //                 width="100%"
        //                 height="100%"
        //                 uri={item.imagen}
        //             />
        //             <View style={{
        //                 flexDirection: 'column',
        //                 width: 345,
        //                 height: 195,
        //                 marginTop: 8,
        //             }}>
        //                 <Text style={{
        //                     fontSize: 24,
        //                     color: COLORS.primary,
        //                     letterSpacing: 0,
        //                     fontFamily: 'nunito-bold',
        //                     textAlign: 'center'
        //                 }}>
        //                     Participa, tu opinión es ...
        //                 </Text>
        //                 <Text style={{
        //                     fontSize: 24,
        //                     color: COLORS.primary,
        //                     letterSpacing: 0,
        //                     fontFamily: 'nunito-bold',
        //                     marginBottom: 30,
        //                     textAlign: 'center'
        //                 }}>
        //                     muy importante
        //                 </Text>
        //                 <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        //                     <Text style={{
        //                         fontSize: 16,
        //                         color: COLORS.primary,
        //                         letterSpacing: 0,
        //                         fontFamily: 'nunito-bold',
        //                         textAlign: 'center',
        //                         fontWeight: "normal",
        //                     }}>
        //                         Vota
        //                     </Text>
        //                     <Text style={{
        //                         fontSize: 16,
        //                         color: COLORS.primary,
        //                         letterSpacing: 0,
        //                         fontFamily: 'nunito-regular',
        //                         textAlign: 'center',
        //                     }}>
        //                         {' ' + 'otras incidencias para atender a las'}
        //                     </Text>
        //                 </View>
        //                 <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        //                     <Text style={{
        //                         fontSize: 16,
        //                         color: COLORS.primary,
        //                         letterSpacing: 0,
        //                         fontFamily: 'nunito-regular',
        //                         textAlign: 'center',
        //                     }}>
        //                         que realmente sean útiles.
        //                     </Text>
        //                 </View>
        //             </View>
        //         </View>
        //     );
        // }
        // if (index === 2) {
        //     setNumero(2);
        //     return (
        //         <View style={{
        //             alignItems: 'center',
        //             alignSelf: 'center',
        //             height: '20%',
        //             width: '50%',
        //             marginTop: 267,
        //         }}>
        //             {/* <Image style={{
        //                 height: '100%',
        //                 width: '100%',
        //                 borderRadius: 20
        //             }} source={item.imagen} /> */}
        //             <SvgUri
        //                 width="100%"
        //                 height="100%"
        //                 uri={item.imagen}
        //             />
        //             <View style={{
        //                 flexDirection: 'column',
        //                 width: 345,
        //                 height: 195,
        //                 marginTop: 8,
        //             }}>
        //                 <Text style={{
        //                     fontSize: 24,
        //                     color: COLORS.primary,
        //                     letterSpacing: 0,
        //                     fontFamily: 'nunito-bold',
        //                     textAlign: 'center'
        //                 }}>
        //                     Comparte y ayúdanos a
        //                 </Text>
        //                 <Text style={{
        //                     fontSize: 24,
        //                     color: COLORS.primary,
        //                     letterSpacing: 0,
        //                     fontFamily: 'nunito-bold',
        //                     marginBottom: 30,
        //                     textAlign: 'center'
        //                 }}>
        //                     mejorar tu cuidad.
        //                 </Text>
        //                 <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        //                     <Text style={{
        //                         fontSize: 16,
        //                         color: COLORS.primary,
        //                         letterSpacing: 0,
        //                         fontFamily: 'nunito-bold',
        //                         textAlign: 'center',
        //                         fontWeight: "normal",
        //                     }}>
        //                         Envía
        //                     </Text>
        //                     <Text style={{
        //                         fontSize: 16,
        //                         color: COLORS.primary,
        //                         letterSpacing: 0,
        //                         fontFamily: 'nunito-regular',
        //                         textAlign: 'center',
        //                     }}>
        //                         {' ' + 'a tus contactos cualquier'}
        //                     </Text>
        //                 </View>
        //                 <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        //                     <Text style={{
        //                         fontSize: 16,
        //                         color: COLORS.primary,
        //                         letterSpacing: 0,
        //                         fontFamily: 'nunito-regular',
        //                         textAlign: 'center',
        //                     }}>
        //                         incidencia para que te den tu apoyo.
        //                     </Text>
        //                 </View>
        //             </View>
        //         </View>
        //     );
        // }

        return (
            <View style={{
                alignItems: 'center',
                alignSelf: 'center',
                height: '20%',
                width: '50%',
                marginTop: 267,
            }}>
                {/* <Image style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 20
                }} source={item.imagen} /> */}
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
                    {/* <Text style={{
                        fontSize: 24,
                        color: COLORS.primary,
                        letterSpacing: 0,
                        fontFamily: 'nunito-bold',
                        marginBottom: 30,
                        textAlign: 'center'
                    }}>
                        desperfecto para arreglar?
                    </Text> */}
                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            letterSpacing: 0,
                            fontFamily: 'nunito-bold',
                            textAlign: 'center',
                            fontWeight: "normal",
                        }}>
                            {/* {'Crea una incidencia' + ' '} */}
                            {item.descripcion}
                        </Text>
                        {/* <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            letterSpacing: 0,
                            fontFamily: 'nunito-regular',
                            textAlign: 'center',
                        }}>
                            en menos de 2
                        </Text> */}
                    </View>
                    <Text style={{
                        fontSize: 16,
                        color: COLORS.primary,
                        letterSpacing: 0,
                        fontFamily: 'nunito-regular',
                        textAlign: 'center',
                    }}>
                        minutos para informar al ayuntamiento.
                    </Text>
                </View>
            </View>
        );
    }
    const _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        //this.setState({ showRealApp: true });
        navigation.navigate('Login');
    }
    const _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="arrow-forward-outline"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                />
            </View>
        );
    };
    const _renderDoneButton = () => {
        if (numero === slides.length - 1) {
            return (
                // <View style={{
                //     //position: 'absolute',
                //     borderWidth : 3,
                //     marginLeft: -380,
                //     justifyContent: 'center',
                //     alignItems: 'center',
                //     marginBottom : 5
                //     // alignSelf : 'center'
                // }}>
                <TouchableOpacity
                    style={{
                        width: 112,
                        height: 44,
                        //position: 'absolute',

                        // width: 122,
                        // height: 54,
                        // top : 2,
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
                        marginLeft: -380,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <Text style={{
                        // width: 77,
                        // height: 24,
                        // fontFamily: 'nunito-bold',
                        // fontSize: 18,
                        // // fontWeight: "bold",
                        // // fontStyle: "normal",
                        // letterSpacing: 0.45,
                        // textAlign: "center",
                        // color: 'white'

                        width: 69,
                        height: 24,
                        fontFamily: "nunito-bold",
                        fontSize: 18,
                        fontWeight: "bold",
                        fontStyle: "normal",
                        letterSpacing: 0.45,
                        textAlign: "center",
                        color: 'white'
                    }}>
                        ¡Vamos!
                    </Text>
                </TouchableOpacity>
                // </View>
            );
        }
    };
    return (
        <AppIntroSlider
            activeDotStyle={{
                backgroundColor: 'rgb(80, 23, 49)',
                width: 18,
                height: 18,
                borderRadius: 10
            }}
            dotStyle={{
                backgroundColor: '#d8d8d8',
                width: 10,
                height: 10,
                borderRadius: 7
            }}
            renderDoneButton={_renderDoneButton}
            renderNextButton={_renderNextButton}
            renderItem={_renderItem}
            data={slides}
            onDone={_onDone}
        />
    )
}
const styles = StyleSheet.create({
    buttonCircle: {
        // width: 40,
        // height: 40,
        // backgroundColor: 'rgba(0, 0, 0, .2)',
        // borderRadius: 20,
        //flex : 1,
        //marginLeft : 15, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    //[...]
});
