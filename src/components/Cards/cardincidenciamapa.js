import React, { useState, useEffect, useRef, createRef } from 'react';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';
import { Dimensions, Button, ImageBackground, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import { marginTop } from 'styled-system';
import SVG from '../svg';
import { COLORS } from '../../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { height } from 'styled-system';
import { favoritoComentario } from '../../store/actions/incidenciaActions';
import {
    getCSRFToken,
    setFavoritoRdux
} from '../../store/actions/userActions';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CarIncidenciaMapa({ navigation, props, incidencia, indice }) {

    const dispatch = useReduxDispatch();
    const token = useReduxSelector((state) => state.user.access_token);
    const csrf = useReduxSelector((state) => state.user.csrf);
    const [CSRF, setCSRF] = useState('');

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const image = { uri: require("../../assets/1.png") };
    const favoritosRedux = useReduxSelector((state) => state.user.favoritosRedux);

    useEffect(() => {
        getCSRFToken()
            .then(response => {
                setCSRF(response.data);
            })
            .catch(error => {

            });
    }, []);

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

        <View style={styles.containerMain}>
            <View style={styles.bottomView}>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => {
                        //navigation.navigate('IncidenciaDetalles', { incidencia: incidencia });
                    }}>
                    <ImageBackground
                        source={{ uri: incidencia.imagen }}
                        style={styles.imageContainer}
                        imageStyle={styles.image}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                flexDirection: 'row',
                                width: Platform.OS === 'ios' ? 84 : 92,
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
                                    width: Platform.OS === 'ios' ? 54 : 65,
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
                            {
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
                            }
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                        style={{
                            marginLeft: 12,
                            marginTop: 5,
                            marginRight: 5
                        }}
                    >
                        <SVG nombre={'Ubicacion'} width={20} height={20} />
                    </TouchableOpacity>
                    <Text style={{
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
                    <TouchableOpacity
                        onPress={() => {

                        }}
                        style={{
                            marginLeft: 50,
                            marginTop: 5,
                            marginRight: 5
                        }}
                    >
                        <SVG nombre={'Ubicacion'} width={20} height={20} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 15,
                        marginTop: 8,
                        fontFamily: "nunito-regular",
                        fontWeight: "normal",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        color: COLORS.browngrey
                    }}>
                        {incidencia.tipo_incidencia}
                        {/* {'incidencia'} */}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                        style={{
                            marginLeft: 12,
                            marginTop: 5,
                            marginRight: 5
                        }}
                    >
                        <SVG nombre={'Ubicacion'} width={20} height={20} />
                    </TouchableOpacity>
                    <Text style={{
                        marginTop: 8,
                        fontFamily: "nunito-regular",
                        fontSize: 15,
                        fontWeight: "normal",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        color: COLORS.browngrey
                    }}>
                        {incidencia.estado}
                        {/* {'incidencia'} */}
                    </Text>
                </View>
                <View
                    style={{
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
                    color: COLORS.primary, 
                    marginLeft: 12,
                    marginTop : 7
                }}>
                    {incidencia.titulo}
                    {/* Nombre de la incidencia que ocupa 2 l??neas para tener el ejemplo en el dise??o de la app */}
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
                        <SVG nombre={'Ubicacion'} width={20} height={20} />
                    </TouchableOpacity>
                    <Text style={{
                        color: 'grey',
                        fontSize: 15,
                        flex: 1,
                        marginTop: 15
                    }}>
                        {incidencia.direccion}
                    </Text>
                </View>
                <View
                    style={{
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
        </View >
    );
}
const styles = StyleSheet.create({
    containerSVGheart: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        left: 270,
        marginTop : 10,
        zIndex: 1111111,
        width: 22,
        height: 18,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerMain: {
        backgroundColor: 'white',
        width: '100%',
        height: 480,
    },
    bottomView: {
    },
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: (windowHeight * 22) / 100,
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
    },
});