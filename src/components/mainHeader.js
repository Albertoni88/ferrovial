import React, { useState, useEffect, useRef, useMemo, createRef } from 'react';
import axios from 'axios';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';
import { Button, ImageBackground, SafeAreaView, Dimensions, ScrollView, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuDrawer from 'react-native-side-drawer'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CarIncidencia from './Cards/cardincidencia';
import FilterBar from './FilterBar';
import Map from './Map';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Buscar from '../assets/Buscar.svg'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import SvgUri from 'react-native-svg-uri';
import SVG from './svg';
import {
    guardarIncidencias,
    guardarIncidenciasOriginals,
    loadIncidencias, loadSecciones
} from '../store/actions/incidenciaActions';
import {
    guardarSeccionesPerfil,
    guardarUsuario
} from '../store/actions/userActions';
import { URL_SERVER } from '../constants/urls';
import { LinearGradient } from 'expo-linear-gradient';
import { backgroundColor } from 'styled-system';

export default function MainHeader({ navigation, props }) {


    const memoIncidencias = React.useMemo(() =>
        // listOfItems.map(item => ({
        //     ...item,
        //     itemProp1: expensiveFunction(props.first),
        //     itemProp2: anotherPriceyFunction(props.second)
        // }))
        mapeoIncidencias
        , [incidencias]
    )
    const dispatch = useReduxDispatch();
    const [open, setOpen] = useState(false);
    const [find, setFind] = useState(false);
    const [map, setMap] = useState(false);
    const [showBody, setShowBody] = useState(true);
    const [searchString, setSearchString] = useState('');
    const myRef = createRef();
    const incidencias = useReduxSelector((state) => state.incidencia.incidencias);
    const incidenciasOriginals = useReduxSelector((state) => state.incidencia.incidenciasOriginals);
    const token = useReduxSelector((state) => state.user.access_token);




    useEffect(() => {

        dispatch(guardarUsuario(token));

        loadSecciones(token)
            .then(response => {
                dispatch(guardarSeccionesPerfil(response.data));
            })
            .catch(error => {
                // alert("error1 " + error)
            });

        loadIncidencias(token)
            .then(response => {
                dispatch(guardarIncidencias(response.data.rows));
                dispatch(guardarIncidenciasOriginals(response.data.rows));
            })
            .catch(error => {
                // alert("Error " + error)
            });
    }, []);


    const mapeoIncidencias = () => {

        return incidencias.map((incidencia, indice) => {
            return (
                <View style={{ marginTop: 8 }} key={incidencia.id}>
                    <CarIncidencia key={incidencia.id} navigation={navigation} incidencia={incidencia} />
                </View>
            );
        })

    }
    const toggleOpen = () => {
        setShowBody(!showBody);
        setOpen(!open);
        setMap(false);

    };
    const toggleFind = () => {
        setFind(!find);
    };
    const toggleMap = () => {
        setMap(!map);
    };
    const drawerContent = () => {
        return (
            <ImageBackground
                source={require('../assets/fondo.jpg')}
                //source={{ uri: incidencia.imagen }}
                style={{
                    flex: 1
                }}
            // imageStyle={styles.image}
            >
                <View style={styles.containerSide}>
                    <ScrollView>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Icon
                                style={{
                                    width: (windowWidth * 4.8) / 18,
                                    height: (windowHeight * 2.5) / 20,
                                    marginLeft: 12,
                                    marginTop: 50,
                                }}
                                onPress={toggleOpen}
                                name="chevron-back-outline"
                                color="white"
                                size={30}
                            />
                            <View style={{
                                alignContent: 'center',
                                height: 64,
                                width: 228,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 0.6,
                                marginTop: 34
                            }}>
                                <Image style={styles.logo} source={require('../assets/group9.png')}></Image>
                            </View>
                        </View>
                        <View style={styles.perfil}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('EditarPerfil')
                                }}
                                style={styles.containerSVGPerfil}>
                                <SVG nombre={'Perfil'} width={20} height={20} />
                            </TouchableOpacity>
                            <Text style={styles.navItemStyle}>
                                Editar perfil
                            </Text>
                        </View>

                        <View>
                            <View style={styles.feedback}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('Feedback')
                                    }}
                                    style={styles.containerSVGFeedback}>
                                    <SVG nombre={'Feedback'} width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={styles.navItemStyle}>
                                    Feedback
                                </Text>
                            </View>
                            <View style={styles.navSectionStyle}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('PreguntasFrecuentes')
                                    }}
                                    style={styles.containerSVGFaq}>
                                    <SVG nombre={'Faq'} width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={styles.navItemStyle}>
                                    Preguntas frecuentes
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.avisos}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('AvisosLegales')
                                    }}
                                    style={styles.containerSVGAvisos}>
                                    <SVG nombre={'Avisos'} width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={styles.navItemStyle}>
                                    Avisos legales
                                </Text>
                            </View>
                            <View style={styles.politicas}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('Politicas')
                                    }}
                                    style={styles.containerSVGPoliticas}>
                                    <SVG nombre={'Politicas'} width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={styles.navItemStyle}>
                                    Política de privacidad
                                </Text>
                            </View>
                            <View style={styles.informacion}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('InformacionTecnica')
                                    }}
                                    style={styles.containerSVGInfoTec}>
                                    <SVG nombre={'InfoTec'} width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={styles.navItemStyle}>
                                    Información técnica
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.infoproduct}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('WelcomeSlides')
                                    }}
                                    style={styles.containerSVGInfoProd}
                                >
                                    <SVG nombre={'InfoProd'} width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={styles.navItemStyle}>
                                    Info de producto
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.footerContainer}>
                        <Text style={{
                            width: 135,
                            height: 24,
                            opacity: 0.5,
                            fontFamily: 'nunito-bold',
                            fontSize: 18,
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0.45,
                            textAlign: "center",
                            color: 'rgb(255, 255,255)'
                        }}
                            onPress={() => {
                                // alert("Cerrar sesion")
                            }}
                        >
                            Cerrar sesión
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        );
    };
    const ShowMap = () => {
        toggleMap();
    }
    const FiltrarIncidencia = (searchStringInput) => {

        if (searchStringInput === '') {
            dispatch(guardarIncidencias(incidenciasOriginals));
        } else if (searchStringInput !== null && searchStringInput !== undefined) {
            var filtrados = [];
            incidenciasOriginals.forEach(element => {
                if (element.autor_fullname.toLowerCase().includes(searchStringInput.toLowerCase())
                    || element.autor_username.toLowerCase().includes(searchStringInput.toLowerCase())
                    || element.direccion.toLowerCase().includes(searchStringInput.toLowerCase())
                    || element.tipo_incidencia.toLowerCase().includes(searchStringInput.toLowerCase())
                    || element.estado.toLowerCase().includes(searchStringInput.toLowerCase())
                    || element.titulo.toLowerCase().includes(searchStringInput.toLowerCase())) {
                    filtrados.push(element);
                }
            });
            dispatch(guardarIncidencias(filtrados));
        }
    }

    const pressOut = () => {
        myRef.current.blur();
        toggleFind();
    }


    return (

        <SafeAreaView
            style={{ flex: 1, height: '100%' }}
        >
            {/* <LinearGradient
                colors={[COLORS.PALE_GREY, COLORS.PALE_GREY, 'grey']}
                style={styles.linearGradient}
            > */}
            {/* <View style={styles.container}> */}
            {
                (open === false && find === false) &&
                <View style={{
                    zIndex: 111111
                }}>
                    <View style={styles.containerWebView}>
                        {/* <Icon
                            style={{
                                flex: 0.55,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                color: COLORS.primary,
                                marginLeft: 12,
                                marginTop: 31,
                                alignSelf: 'center'
                            }}
                            onPress={toggleOpen}
                            name="ios-menu"
                            size={30}
                        /> */}
                        <View style={{ flexDirection: 'column', marginLeft :12, marginTop : 30, marginRight : 120 }}>
                            <View style={{
                                width: 18,
                                height: 1,
                                borderStyle: "solid",
                                borderWidth: 2,
                                borderColor: COLORS.primary,
                                // marginBottom : (windowHeight * 0.98) /100
                                marginBottom : 5
                            }} />
                            <View style={{
                                width: 18,
                                height: 1,
                                borderStyle: "solid",
                                borderWidth: 2,
                                borderColor: COLORS.primary,
                                marginBottom : 5
                            }} />
                            <View style={{
                                width: 18,
                                height: 1,
                                borderStyle: "solid",
                                borderWidth: 2,
                                borderColor: COLORS.primary
                            }} />
                        </View>

                        <Text style={{
                            flex: 1,
                            width: 280,
                            height: 27,
                            fontFamily: "nunito-bold",
                            fontSize: 20,
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: COLORS.primary,
                            textAlign: 'left',
                            alignSelf: 'center',
                            marginTop: 27
                        }}>
                            Valdepeñas
                        </Text>
                        <View style={styles.containerSVG}>
                            <TouchableOpacity
                                onPress={toggleFind}
                            >
                                <SVG nombre={'Buscar'} width={20} height={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            }
            {
                (open === false && find === true) &&
                <View style={styles.searchSection}>
                    <Icon style={styles.searchIcon} name="ios-search" size={20} color={COLORS.primary} />
                    <TextInput
                        value={searchString}
                        ref={myRef}
                        autoFocus={true}
                        style={styles.input}
                        placeholder="Buscar..."
                        onChangeText={(searchStringInput) => {
                            setSearchString(searchStringInput);
                            FiltrarIncidencia(searchStringInput);
                        }}
                        underlineColorAndroid="transparent"
                        onBlur={pressOut}
                    />
                    <Text
                        onPress={() => {
                            FiltrarIncidencia(searchString)
                            toggleFind();
                        }}
                        style={{
                            flex: 1,
                            fontSize: 15,
                            color: COLORS.primary,
                            padding: 10,

                        }}>
                        Aplicar
                    </Text>
                </View>

            }
            <View
                style={{
                    width: '100%',
                    zIndex: 9999,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    height: open === true ? 0 : 44,
                    flexDirection: 'row',
                }}
                pointerEvents={find === true ? 'none' : 'auto'}
            >
                {
                    open === false &&
                    <FilterBar navigation={navigation} showMap={ShowMap} />
                }
            </View>
            <MenuDrawer
                open={open}
                drawerContent={drawerContent()}
                drawerPercentage={100}
                animationTime={250}
                overlay={true}
                opacity={0.4}
            >
            </MenuDrawer>
            {(showBody && map === false) &&
                <View style={{ flex: 1 }}>
                    <ScrollView
                        style={{ flex: 1, opacity: find === false ? 1 : 0.3, }}
                        persistentScrollbar={true}
                        indicatorStyle={{ color: 'grey', }}
                    >
                        {(showBody && map === false && incidencias !== null && incidencias !== undefined) &&
                            <View style={{
                                zIndex: -1,
                                marginBottom: 125
                                // borderWidth: 3,
                                // borderColor: 'pink'
                            }}
                            >

                                {incidencias.map((incidencia, indice) => {
                                    console.log("inc ", incidencia)
                                    return (
                                        <CarIncidencia key={incidencia.id} navigation={navigation} incidencia={incidencia} />
                                    );
                                })}
                            </View>
                        }
                    </ScrollView>
                    {/* <View style= {{ backgroundColor : 'transparent', marginBottom : 100}} /> */}
                </View>
            }
            {
                map === true &&
                <View style={{
                    height: '100%'
                }}>
                    <Map filtroMapa={FiltrarIncidencia} cantidadIncidencias={incidenciasOriginals.length} incidencias={incidencias} />
                </View>
            }
            {(showBody && map === false) &&

                <View style={{ position: 'absolute', bottom: 0, height: 100, width: '100%', zIndex: 0, backgroundColor: 'transparent' }}>
                    <LinearGradient
                        colors={['transparent', 'transparent', '#e1e4e6']}
                        style={styles.linearGradient}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('CrearIncidencia');
                            }}
                            style={{
                                justifyContent: 'center',
                                alignSelf: 'center',
                                position: 'absolute',
                                bottom: 10,
                                alignItems: 'center',
                                zIndex: 11111,
                                width: 198,
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
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                width: Platform.OS === 'ios' ? 155 : 175,
                                height: 24,
                                fontFamily: 'nunito-bold',
                                fontSize: 18,
                                fontWeight: "bold",
                                fontStyle: "normal",
                                letterSpacing: 0.45,
                                textAlign: "center",
                                color: 'white'
                            }}> Crear incidencia </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            }
            {/* </View> */}
            {/* </LinearGradient> */}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    linearGradient: {
        //flex: 1,
        height: 100,
        // borderColor: 'red',
        // borderWidth: 3,
        zIndex: -111111,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 88,
        zIndex: 9999,
    },
    logo: {
        width: 228,
        height: 64,
    },
    searchIcon: {
        padding: 10,
        left: 40,
        zIndex: 15
    },
    searchIconValdepennas: {
        padding: 10,
        left: 0,
        zIndex: 15
    },
    input: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
        textAlign: 'center',
        borderWidth: 0.2,
        borderRadius: 15,
        width: 300
    },

    container: {
        //marginTop: 20,
        flex: 1,
        // zIndex: 1111111,
        width: '100%',
        height: 88,
        backgroundColor: COLORS.PALE_GREY,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 15,
        shadowOpacity: 1,
    },
    containerSVG: {
        borderStyle: "solid",
        left: -15,
        zIndex: 1111111,
        width: 15,
        height: 15,
        borderColor: COLORS.primary,
        marginTop: 30
    },
    containerSVGVolver: {
        left: 15,
        zIndex: 1111111,
        width: 15,
        height: 15,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGPerfil: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        left: 5,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGFeedback: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        left: 5,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGFaq: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        left: 5,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGAvisos: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        left: 5,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGPoliticas: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        left: 5,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGInfoTec: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        left: 5,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGInfoProd: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        left: 5,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    inputfind: {
        width: 300,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        height: 50,
        fontSize: 15,
        borderRadius: 10,
        backgroundColor: "grey",
        borderColor: 'white',
        borderWidth: 2
    },
    animatedBox: {
        padding: 10,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow'
    },
    containerWebView: {
        width: '100%',
        zIndex: 9999,
        alignItems: 'center',
        backgroundColor: 'white',
        height: 88,
        flexDirection: 'row',

    },
    containerInput: {
        width: '100%',
        zIndex: 9999,
        alignItems: 'center',
        backgroundColor: 'white',
        height: 88,
        flexDirection: 'row'
    },
    iconBackContainer: {
        backgroundColor: 'rgb(113, 197, 232)',
        height: 55,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    close: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 30,
        top: 5,
    },
    containerSide: {
        flex: 1,
        opacity: 0.8,
        height: '100%',
        zIndex: 99999999,
        backgroundColor: COLORS.primary,
    },
    navItemStyle: {
        width: 305,
        height: 25,
        fontFamily: 'montserrat-medium',
        fontSize: 16,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        color: COLORS.primary,
        alignSelf: 'center',
        marginLeft: 12
    },
    perfil: {
        marginTop: (windowWidth * 31) / 250,
        marginBottom: 25,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    politicas: {
        alignItems: 'center',
        marginBottom: 5,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    avisos: {
        alignItems: 'center',
        marginBottom: 5,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    infoproduct: {
        alignItems: 'center',
        marginBottom: 25,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    navSectionStyle: {
        alignItems: 'center',
        marginBottom: 25,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    informacion: {
        marginBottom: 25,
        alignItems: 'center',
        marginBottom: 25,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    feedback: {
        alignItems: 'center',
        marginBottom: 5,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    footerContainer: {
        padding: 30,
        alignItems: 'center',
    }
});