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
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { height } from 'styled-system';
import axios from 'axios';
import { URL_SERVER } from '../../constants/urls';
import { favoritoComentario } from '../../store/actions/incidenciaActions';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CarIncidencia({ navigation, props, incidencia }) {

    const [toggleFavorito, setToggleFavorito] = useState(false);
    const token = useReduxSelector((state) => state.user.access_token);
    const csrf = useReduxSelector((state) => state.user.csrf);
    const [CSRF, setCSRF] = useState('');

    const image = { uri: require("../../assets/1.png") };

    useEffect(() => {
        getCSRFToken()
    }, []);

    async function getCSRFToken() {
        axios.get('https://ferrovial.creacionwebprofesional.com/session/token')
            .then(response => {
                setCSRF(response.data);
            })
            .catch(error => {

            });
    }
    const toggleFavoritoMethod = async () => {

        //await getCSRFToken();
        var incidencia_id = incidencia.id;

        favoritoComentario(token, csrf, incidencia_id)
            .then(response => {
                alert("toggle " + JSON.stringify(response))
            })
            .catch(error => {
                alert("error1 " + error)
            });
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            //marginTop: 16
            marginTop: (windowHeight * 2) / 100
        }}>
            <TouchableOpacity
                style={styles.container}
                onPress={() => {
                    navigation.navigate('IncidenciaDetalles', { incidencia: incidencia });
                }}>
                <ImageBackground
                    // source={require('../../assets/1.png')}
                    source={{ uri: incidencia.imagen }}
                    style={styles.imageContainer}
                    imageStyle={styles.image}>
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
                                // color: 'white',
                                // fontSize: 15,
                                textAlign: 'left',
                                // marginTop: 5
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
                                {incidencia.created}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                toggleFavoritoMethod();
                            }}
                            style={styles.containerSVGheart}>
                            <SVG nombre={'Corazon'} width={25} height={25} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Icon
                    onPress={() => {

                    }}
                    style={{
                        marginLeft: 12,
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
                    {incidencia.autor_username}
                </Text>
                <Icon
                    onPress={() => {

                    }}
                    style={{
                        // marginLeft: 100,
                        marginLeft: Platform.OS === 'ios' ? 50 : 40,
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
                    {/* {incidencia.categoria} */}
                    {incidencia.tipo_incidencia}
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
                {incidencia.titulo}
                {/* Nombre de la incidencia que ocupa 2 líneas para tener el ejemplo en el diseño de la app */}
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
    containerSVGheart: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        left: 265,
        marginTop : 5,
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
        borderWidth: 1,
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