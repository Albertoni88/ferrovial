import React, { useState, useEffect, useRef, createRef } from 'react';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';
import { Button, Dimensions, ImageBackground, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import { COLORS } from '../../constants';
import SVG from '../svg';
import { favoritoComentario } from '../../store/actions/incidenciaActions';
import {
    getCSRFToken,
    setFavoritoRdux
} from '../../store/actions/userActions';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CarIncidencia({ navigation, props, incidencia, indice }) {

    const dispatch = useReduxDispatch();
    const [toggleFavorito, setToggleFavorito] = useState(false);
    const token = useReduxSelector((state) => state.user.access_token);
    const csrf = useReduxSelector((state) => state.user.csrf);
    const [CSRF, setCSRF] = useState('');
    const [favorito, setFavorito] = useState(0)
    const image = { uri: require("../../assets/1.png") };
    const favoritosRedux = useReduxSelector((state) => state.user.favoritosRedux);

    useEffect(() => {
        getCSRFToken()
            .then(response => {
                setCSRF(response.data);
            })
            .catch(error => {

            });

    }, [favorito]);


    const toggleFavoritoMethod = async () => {

        var incidencia_id = incidencia.id;

        favoritoComentario(token, CSRF, incidencia_id)
            .then(response => {
                //setFavorito(response.data.favorito);
                dispatch(setFavoritoRdux({ "value": response.data.favorito, "indice": indice }))
            })
            .catch(error => {

            });
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            marginTop: 8,
            zIndex: 11111,
            // position : 'relative'
        }}>
            <TouchableOpacity
                style={styles.container}
                onPress={() => {
                    navigation.navigate('IncidenciaDetalles', { incidencia: incidencia, indice: indice });
                }}>


                <ImageBackground
                    source={{ uri: incidencia.imagen }}
                    style={styles.imageContainer}
                    imageStyle={styles.image}>
                    {/* <LinearGradient
                        colors={['transparent', 'transparent', '#cbccd2']}
                        start={{ x: 0, y: 0.7}}
                        end={{ x: 0, y: 1 }}
                        style={styles.linearGradient}
                    > */}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                flexDirection: 'row',
                                width: 95,
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
                                    width: 65,
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
                                    {incidencia?.created}
                                </Text>
                            </View>
                            {/* {
                            favoritosRedux[indice] === 0 &&
                            <TouchableOpacity
                                onPress={() => {
                                    toggleFavoritoMethod();
                                }}
                                style={styles.containerSVGheart}>
                                <SVG nombre={'Corazon'} width={25} height={25} />
                            </TouchableOpacity>
                        }
                        {
                            favoritosRedux[indice] === 1 &&
                            <TouchableOpacity
                                onPress={() => {
                                    toggleFavoritoMethod();
                                }}
                                style={styles.containerSVGheart}>
                                <SVG nombre={'CorazonRelleno'} width={25} height={25} />
                            </TouchableOpacity>
                        } */}
                        </View>
                    {/* </LinearGradient> */}
                </ImageBackground>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>

                <View style={styles.containerSVG}>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                        style={{ marginRight: 5, }}
                    >
                        <SVG nombre={'CardUbicacion'} width={20} height={20} />
                    </TouchableOpacity>
                    {/* <Text style={{
                        fontSize: 15,
                        marginTop: 8,
                        fontFamily: "nunito-regular",
                        fontSize: 15,
                        fontWeight: "normal",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        color: COLORS.browngrey
                    }}>
                        {incidencia?.estado}
                    </Text> */}
                </View>
                {/* <Text style={{
                    fontSize: 15,
                    marginTop: 8,
                    fontFamily: "nunito-regular",
                    fontSize: 15,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: COLORS.browngrey
                }}>
                    {incidencia?.autor_username}
                </Text> */}
                <Text style={{
                    position: 'absolute',
                    fontSize: 15,
                    marginTop: 0,
                    marginLeft: 40,
                    zIndex: 11111,
                    fontFamily: "nunito-regular",
                    fontSize: 15,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: COLORS.browngrey
                }}>
                    {incidencia?.estado}
                </Text>
                {/* <TouchableOpacity
                    onPress={() => {

                    }}
                    style={{
                        marginLeft: 85,
                        marginTop: 5
                    }}
                >
                    <SVG nombre={'Ubicacion'} width={20} height={20} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 15,
                    marginTop: 8,
                    marginLeft : 5,
                    fontFamily: "nunito-regular",
                    fontSize: 15,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: COLORS.browngrey
                }}>
                    {incidencia.categoria}
                </Text>
                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={{
                        marginLeft: 8,
                        marginTop: 5
                    }}
                >
                    <SVG nombre={'Ubicacion'} width={20} height={20} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 15,
                    marginTop: 8,
                    marginLeft : 5,
                    fontFamily: "nunito-regular",
                    fontSize: 15,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: COLORS.browngrey
                }}>
                    {incidencia?.estado}
                </Text> */}
            </View>
            <View
                style={{
                    alignSelf: 'center',
                    marginTop: 0,
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
                color: COLORS.primary,
                marginLeft: 12,
                marginTop: 7
            }}>
                {incidencia?.titulo}
                {/* Nombre de la incidencia que ocupa 2 líneas para tener el ejemplo en el diseño de la app */}
            </Text>

            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={{
                        marginLeft: 12,
                        marginTop: 12,
                        marginRight: 5
                    }}
                >
                    <SVG nombre={'CardUbicacion'} width={20} height={20} />
                </TouchableOpacity>
                <Text style={{
                    color: 'grey',
                    fontSize: 15,
                    //textAlign: 'right',
                    flex: 1,
                    marginTop: 15
                }}>
                    {incidencia?.direccion}
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
                incidencia.tipo_incidencia === 1 &&
                <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row', }}>
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
                incidencia.tipo_incidencia === 2 &&
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
                incidencia.tipo_incidencia === 3 &&
                <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row', }}>
                    <View style={{ borderRadius: 30, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', height: 25, width: 150, marginBottom: 3, }}>
                        <Text style={{ fontSize: 15, color: 'white' }}>
                            850 firmas
                        </Text>
                    </View>

                </View>
            }
            {
                incidencia.tipo_incidencia === 4 &&
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
    );
}
const styles = StyleSheet.create({
    linearGradient: {
        //flex: 1,
        height: 100,
        // borderColor: 'red',
        // borderWidth: 3,
        zIndex: 111111,
        height: (windowHeight * 31.65) / 100,
        width: (windowWidth * 95.7) / 100,
        alignSelf: 'center'
    },
    containerSVG: {
        //borderStyle: "solid",
        // left: 2,
        //zIndex: 1111111,
        marginLeft: 12,
        width: 30,
        height: 35,
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

        //borderColor: COLORS.primary,
        marginTop: -10,
        // borderWidth : 3
    },
    containerSVGheart: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        left: 265,
        marginTop: 5,
        zIndex: 1111111,
        width: 22,
        height: 18,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: (windowHeight * 31.65) / 100,
        width: (windowWidth * 95.7) / 100,
        //borderWidth: 1,
        borderRadius: 20,
        marginVertical: 10,
    },
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