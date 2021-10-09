import React, { useState, useEffect, useRef, createRef } from 'react';
import axios from 'axios';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';
import { Button, Dimensions, ScrollView, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
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
    guardarIncidenciasOriginals
} from '../store/actions/incidenciaActions';
import { URL_SERVER } from '../constants/urls';

export default function MainHeader({ navigation, props }) {



    const dispatch = useReduxDispatch();
    const [open, setOpen] = useState(false);
    const [find, setFind] = useState(false);
    const [map, setMap] = useState(false);
    const [showBody, setShowBody] = useState(true);
    const [searchString, setSearchString] = useState('');
    const myRef = createRef();
    // const [incidencias, setIncidencias] = useState(useReduxSelector((state) => state.incidencia.incidencias));
    const incidencias = useReduxSelector((state) => state.incidencia.incidencias);
    const [incidenciasOriginals, setIncidenciasOriginals] = useState(useReduxSelector((state) => state.incidencia.incidenciasOriginals));
    const token = useReduxSelector((state) => state.user.access_token);



    useEffect(() => {
        axios
            .get(URL_SERVER + 'rest/incidencias?_format=json',
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }
            )
            .then(response => {
                dispatch(guardarIncidencias(response.data.rows));
                dispatch(guardarIncidenciasOriginals(response.data.rows));
                //alert("response incidencias " + JSON.stringify(incidencias));
                //alert("token " + JSON.stringify(token));
            })
            .catch(error => {
                alert(error)
            });
    }, []);

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
            <View style={styles.containerSide}>
                <ScrollView>
                    <View style={{
                        flexDirection: 'row',
                        // borderColor: 'blue',
                        // borderWidth: 3
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
                        {/* <View style={styles.containerSVGVolver}>
                            <SVG nombre={'Volver'} width={20} height={20} />
                        </View> */}
                        <View style={{
                            alignContent: 'center',
                            height: 64,
                            width: 228,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 0.6,
                            // borderColor: 'green',
                            // borderWidth: 3,
                            marginTop: 34
                        }}>
                            <Image style={styles.logo} source={require('../assets/group9.png')}></Image>
                        </View>
                    </View>
                    <View style={styles.perfil}>
                        {/* <Icon
                            style={{
                                marginLeft: 5,
                                borderStyle: "solid",
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center'
                                // borderWidth: 0.8,
                                //borderColor: COLORS.browngrey
                            }}
                            onPress={() => {
                                navigation.navigate('EditarPerfil')
                            }}
                            name="pencil"
                            color={COLORS.browngrey}
                            size={25}
                        /> */}
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
                            {/* <AntDesign
                                style={{
                                    marginLeft: 5,
                                    borderStyle: "solid",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('Feedback')
                                }}
                                name="message1"
                                color={COLORS.browngrey}
                                size={25}
                            /> */}
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
                            {/* <Icon
                                style={{
                                    marginLeft: 5,
                                    borderStyle: "solid",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('PreguntasFrecuentes')
                                }}
                                name="pencil"
                                color={COLORS.browngrey}
                                size={25}
                            /> */}
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
                            {/* <Icon
                                style={{
                                    marginLeft: 5,
                                    borderStyle: "solid",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('AvisosLegales')
                                }}
                                name="pencil"
                                color={COLORS.browngrey}
                                size={25}
                            /> */}
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
                            {/* <Icon
                                style={{
                                    marginLeft: 5,
                                    borderStyle: "solid",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('Politicas')
                                }}
                                name="pencil"
                                color={COLORS.browngrey}
                                size={25}
                            /> */}
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
                            {/* <Icon
                                style={{
                                    marginLeft: 5,
                                    borderStyle: "solid",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('InformacionTecnica')
                                }}
                                name="settings-outline"
                                color={COLORS.browngrey}
                                size={25}
                            /> */}
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
                            {/* <Icon
                                // style={{
                                //     marginLeft: 5
                                // }}
                                // onPress={() => {

                                // }}
                                // name="information-circle-outline"
                                // color="brown"
                                // size={30}
                                style={{
                                    marginLeft: 5,
                                    borderStyle: "solid",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('WelcomeSlides')
                                }}
                                name="information-circle-outline"
                                color={COLORS.browngrey}
                                size={25}
                            /> */}
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
                        // fontWeight: 'bold',
                        // fontSize: 20,
                        // color: 'white'
                        width: 116,
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
        );
    };
    const ShowMap = () => {
        toggleMap();
    }
    const FiltrarIncidencia = (searchStringInput) => {
        //alert("searchStringInput " + searchStringInput);
        if (searchString === '') {
            setIncidencias(incidenciasOriginals);
        } else {
            var filtrados = [];
            incidenciasOriginals.forEach(element => {
                if (element.autor.toLowerCase().includes(searchStringInput.toLocaleLowerCase())
                    || element.categoria.toLowerCase().includes(searchStringInput.toLocaleLowerCase())
                    || element.nombre.toLowerCase().includes(searchStringInput.toLocaleLowerCase())) {
                    filtrados.push(element);
                }
            });
            setIncidencias(filtrados);
        }
        //alert("searchString " + searchString + " incidencias " + JSON.stringify(incidencias));
    }

    const pressOut = () => {
        myRef.current.blur();
        toggleFind();
    }


    return (
        <View style={styles.container}>
            {
                (open === false && find === false) &&
                <View style={{
                    zIndex: 11111
                }}>
                    <View style={styles.containerWebView}>
                        <Icon
                            style={{
                                flex: 0.7,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                color: COLORS.primary,
                                marginLeft: 12,
                                marginTop: 0,
                                alignSelf: 'center'
                                //alignSelf: 'center',
                            }}
                            onPress={toggleOpen}
                            name="ios-menu"
                            size={30}
                        />
                        <Text style={{
                            // fontSize: 15,
                            // fontWeight: 'bold',
                            // color: 'brown'
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
                            alignSelf: 'center'
                        }}>
                            Valdepeñas
                        </Text>
                        <View style={styles.containerSVG}>
                            <SVG nombre={'Buscar'} width={20} height={20} />
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        zIndex: 9999,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        height: 60,
                        flexDirection: 'row'
                    }}>
                        <FilterBar navigation={navigation} showMap={ShowMap} />
                    </View>
                </View>

            }
            {
                (open === false && find === true) &&
                <View style={styles.searchSection}>
                    <Icon style={styles.searchIcon} name="ios-search" size={20} color={COLORS.primary} />
                    <TextInput
                        ref={myRef}
                        autoFocus={true}
                        style={styles.input}
                        placeholder="Buscar..."
                        onChangeText={(searchStringInput) => {
                            setSearchString(searchStringInput);
                            // alert("searchStringInput " + searchStringInput);
                            FiltrarIncidencia(searchStringInput);
                        }}
                        underlineColorAndroid="transparent"
                        onBlur={pressOut}
                    />
                    <Text
                        onPress={() => {
                            FiltrarIncidencia('')
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
                <ScrollView
                    style={{ flex: 1, opacity: find === false ? 1 : 0.3, }}
                    persistentScrollbar={true}
                    indicatorStyle={{ color: 'grey', }}
                >
                    {(showBody && map === false && incidencias !== null && incidencias !== undefined) &&
                        <View style={{}}>
                            {incidencias.map((incidencia, indice) => {
                                return (
                                    <View style={{ marginTop: 8 }} key={incidencia.id}>
                                        <CarIncidencia key={incidencia.id} navigation={navigation} incidencia={incidencia} />
                                    </View>
                                );
                            })}
                        </View>
                    }

                </ScrollView>
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
                        width: 155,
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
            }
        </View>
    );
}
const styles = StyleSheet.create({

    searchSection: {
        //flex: 1,
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
        zIndex: 9999,
    },
    logo: {
        width: 228,
        height: 64,
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginTop: 32,
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
        //flex: 1,
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
        marginTop: 20,
        flex: 1,
        zIndex: 1111111,
        width: '100%',
        height: 88,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 15,
        shadowOpacity: 1,
    },
    containerSVG: {

        left: -15,
        zIndex: 1111111,
        width: 15,
        height: 15,
        borderStyle: "solid",
        borderColor: COLORS.primary
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
        //alignContent: 'center',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
        height: 60,
        flexDirection: 'row'
    },
    containerInput: {
        width: '100%',
        zIndex: 9999,
        //alignContent: 'center',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
        height: 60,
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
    // logo: {
    //     width: '25%',
    //     height: '60%',
    //     marginTop: 10,
    //     resizeMode: 'contain',
    //     marginLeft: 120,
    //     alignContent: 'center',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    containerSide: {
        flex: 1,
        height: '100%',
        zIndex: 99999999,
        backgroundColor: COLORS.primary,
        // borderWidth: 3,
        // borderColor: 'pink'
    },
    navItemStyle: {
        // padding: 10,
        // color: 'brown'
        width: 305,
        height: 19,
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
        // backgroundColor: 'lightgrey',
        // flexDirection: 'row',
        // height: 50,
        // marginBottom: 5
        //marginTop: (windowWidth * 31) / 250,
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
        // backgroundColor: 'lightgrey',
        // flexDirection: 'row',
        // height: 50,
        marginBottom: 25,
        //marginTop: (windowWidth * 31) / 250,
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
        // backgroundColor: 'lightgrey',
        // flexDirection: 'row',
        // height: 50,
        // marginBottom: 5
        //marginTop: (windowWidth * 31) / 250,
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