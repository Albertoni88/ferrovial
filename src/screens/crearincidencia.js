import React, { useState, useEffect, useRef, createRef } from 'react';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';
import MapView, {
    AnimatedRegion,
    animateCamera,
    PROVIDER_GOOGLE,
} from 'react-native-maps';
import * as Location from 'expo-location';
// import Geocoder from 'react-native-geocoding';
import Geocoder from 'react-native-geocoder';
import { Button, ScrollView, Permission, ActivityIndicator, Dimensions, Image, ImageBackground, TextInput, View, Text, TouchableOpacity, Modal, Alert, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderCrearIncidencia from '../components/headerCrearIncidencia';
import { Camera } from 'expo-camera';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    guardarIncidencia,
    guardarImagen,
    guardarCreada,
    guardarIncidenciaRedux,
    cargarIncidenciaDetalles
} from '../store/actions/incidenciaActions';
import { saveLocation } from '../store/actions/userActions';

import SVG from '../components/svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export default function CrearIncidencia({ navigation, props }) {

    //const [hasPermission, setHasPermission] = useState(null);

    const [habilitar, setHabilitar] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, showCamera] = useState(false);
    const [creada, setCreada] = useState(false);
    const myRef = createRef();
    const cameraRef = useRef();
    //const cameraRef = createRef();
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [photo, setPhoto] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [direccion, setDireccion] = useState('');
    const [geo, setGeo] = useState({});


    const dispatch = useReduxDispatch();
    const token = useReduxSelector((state) => state.user.access_token);
    const locationUser = useReduxSelector((state) => state.user.location);
    const idArchivo = useReduxSelector((state) => state.user.idArchivo);
    const [creadaIncidencia, setCreadaIncidencia] = useState(false);
    const incidenciasRedux = useReduxSelector((state) => state.incidencia.incidencias);
    const [location, setLocation] = useState(null);
    const [mapa, setMapa] = useState(false);
    const [geoGuardada, setgeoGuardada] = useState(false);
    const [tomadaFoto, setTomadaFoto] = useState(false);
    const [were, setWere] = useState('back');

    var uno = createRef();
    var dos = createRef();
    var tres = createRef();
    var cuatro = createRef();
    var cinco = createRef();
    const NY = {
        lat: 40.7809261,
        lng: -73.9637594
    };
    useEffect(() => {
        //Geocoder.init("AIzaSyAqkCacdKeQKy_A3lmqlrZforWvMTLtp64");
        //Geocoder.fallbackToGoogle("AIzaSyAqkCacdKeQKy_A3lmqlrZforWvMTLtp64");



        //   Geocoder.geocodePosition(NY).then(res => {
        //       console.log("res ", res)
        //       // res is an Array of geocoding object (see below)
        //   })
        //   .catch(err => console.log(err))
        // Geocoder.from(21.84, -78.76194)
        // .then(json => {
        // 	var location = json.results[0].geometry.location;
        // 	console.log(location);
        // })
        // .catch(error => console.warn(error));

        // Geocoder.from(21.84, -78.76194)
        // .then(json => {
        //     console.log(json);
        //     var addressComponent = json.results[0].address_components;

        //     console.log(addressComponent);
        // })
        // .catch(error => console.warn(error));

        if (locationUser === null || locationUser === undefined) {
            setCurrentLocation();
        } else {
            setLocation(locationUser);
        }

        onHandlePermission();
    }, []);

    const setCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        dispatch(saveLocation(location));
        setLocation(location);
    };

    const guardarInc = async () => {
        setHabilitar(true)
        var d = new Date();
        var n = d.getMilliseconds();
        const generatedNombre = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + n;

        if (titulo === '' || descripcion === '' || photo === null || photo === undefined || photo === '') {
            alert("El título, la descrición y la foto son obligatorios");
        } else {
            var imagenes = [];
            imagenes.push({
                "filename": generatedNombre,
                "tipemime": "image/png",
                "base64": photo
            })
            console.log("photo ", photo);

            guardarImagen(token, imagenes).then(response => {
                if (response.status === 200) {
                    var data = {
                        "direccion": direccion,
                        "titulo": titulo,
                        "descripcion": descripcion,
                        "imagen": response.data[0],
                        "geo": {
                            "lat": location.coords.latitude,
                            "lng": location.coords.longitude
                        }
                    }
                    guardarIncidencia(token, data).then(respo => {
                        if (respo.status === 200) {
                            setCreadaIncidencia(true);
                            //alert("respo.id " + JSON.stringify(respo.data.id))
                            cargarIncidenciaDetalles(token, respo.data.id)
                                .then(response => {
                                    //alert("res " + JSON.stringify(response))

                                    if (response.status === 200) {
                                        var temporal = {
                                            ...data,
                                            "created": response.data.created,
                                            "description": response.data.description,
                                            "estado": response.data.estado,
                                            "imagen": response.data.imagen,
                                            "imagen_resuelta": response.data.imagen_resuelta
                                        }
                                        data = temporal;
                                        //alert("data " + JSON.stringify(data))
                                        dispatch(guardarIncidenciaRedux(data));
                                        setHabilitar(false)
                                    }
                                })
                        }
                    });
                } else {
                    setHabilitar(false)
                    alert("Hubo error al subir la imagen");
                }
            });
        }


    }
    const onSnap = async () => {

        if (cameraRef.current) {
            const options = { quality: 0.2, base64: true };
            const data = await cameraRef.current.takePictureAsync(options)
                .then(async photo => {
                    setIsPreview(false);
                    showCamera(false);
                    setPhoto(photo.base64);
                    console.log("photo ", photo.base64);
                    setTomadaFoto(true);
                });
        }
    };
    const cancelPreview = async () => {
        await cameraRef.current.resumePreview();
        setIsPreview(false);
    };
    const onHandlePermission = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };
    const onCameraReady = () => {
        setIsCameraReady(true);
    };
    // if (hasPermission === null) {
    //     return <View />;
    // }
    // if (hasPermission === false) {
    //     return <Text style={styles.text}>No access to camera</Text>;
    // }
    const switchCamera = () => {
        if (isPreview) {
            return;
        }
        setCameraType(prevCameraType =>
            prevCameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };
    const closeMap = () => {
        setMapa(false);
        setWere('back');
    }
    return (
        <View style={styles.container}>
            <HeaderCrearIncidencia were={were} closemap={closeMap} navigation={navigation} />
            {
                mapa === false &&
                <KeyboardAwareScrollView
                    style={{ backgroundColor: 'transparent' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={{ flex: 1 }}
                    scrollEnabled={false}
                >
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{}}>
                            <Text style={{
                                textAlign: 'left',
                                marginTop: (windowHeight * 10) / 100,
                                marginLeft: (windowWidth * 4.3) / 100,
                                width: 55,
                                height: 22,
                                fontFamily: 'nunito-semibold',
                                fontSize: 16,
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                color: 'white',


                            }}>
                                *Título
                            </Text>
                            <TextInput
                                onSubmitEditing={() => { dos.focus(); }}
                                blurOnSubmit={false}
                                returnKeyType="next"

                                value={titulo}
                                placeholder={'Pon un título corto y conciso...'}
                                placeholderTextColor={COLORS.primary}
                                style={styles.inputtitulo}
                                placeholderStyle={{
                                    width: 342,
                                    height: 17,
                                    fontSize: 14,
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    color: "#9d9d9d"
                                }}
                                onChangeText={(titulo) => {
                                    setTitulo(titulo)
                                }}
                            />
                            <Text style={{
                                // marginTop: 15,
                                // fontSize: 15,
                                // fontWeight: 'bold',
                                // color: 'white'
                                textAlign: 'left',
                                marginTop: (windowHeight * 1.47) / 100,
                                marginLeft: (windowWidth * 4.3) / 100,
                                width: 95,
                                height: 22,
                                fontFamily: 'nunito-semibold',
                                fontSize: 16,
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                color: 'white',
                            }}>
                                *Descripción
                            </Text>
                            <TextInput
                                ref={(input) => { dos = input; }}
                                // onBlur={()=>{
                                //     if(descripcion === ''){
                                //         setDescripcion('Describe la incidencia de forma clara...') 
                                //         dos.current.reset();                            
                                //         alert("des " + descripcion)
                                //     }
                                //     //tres.focus();
                                // }}
                                onSubmitEditing={() => {
                                    // if(descripcion === ''){
                                    //     setDescripcion('Describe la incidencia de forma clara...')                             
                                    // }                  
                                    // dos.clear();              
                                    // setDescripcion('Describe la incidencia de forma clara...') 
                                    tres.focus();
                                }}
                                blurOnSubmit={false}
                                returnKeyType="next"

                                value={descripcion}
                                multiline={true}
                                numberOfLines={3}
                                placeholder={'Describe la incidencia de forma clara...'}
                                placeholderTextColor={COLORS.primary}
                                style={styles.descripcion}
                                onChangeText={(descripcion) => {
                                    setDescripcion(descripcion)
                                }}
                            />
                            <Text style={{
                                // marginTop: 15,
                                // fontSize: 15,
                                // fontWeight: 'bold',
                                // color: 'white'
                                width: 115,
                                height: 22,
                                fontFamily: 'nunito-semibold',
                                fontSize: 16,
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                color: 'white',
                                marginTop: (windowHeight * 1.47) / 100,
                                marginLeft: (windowWidth * 4.3) / 100,
                            }}>
                                *Sube una foto
                            </Text>
                            <View

                                style={tomadaFoto === true ? styles.descripcion1 : styles.descripcion}
                            >
                                {
                                    tomadaFoto === true &&
                                    // <AntDesign name='checkcircleo' size={32} color={'rgba(0, 0, 0, 0.26)'} />
                                    <View
                                        // ref={(input) => { tres = input; }}
                                        // onSubmitEditing={() => { cuatro.focus(); }}
                                        // blurOnSubmit={false}
                                        // returnKeyType="next"

                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            // flex : 1
                                        }}>
                                        <ImageBackground style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'cover',
                                            borderRadius: 5
                                            // flex: 1
                                        }}
                                            imageStyle={{ borderRadius: 8, width: '100%', height: '100%' }}
                                            // source={{ uri: photo }} />
                                            source={{ uri: `data:image/jpeg;base64,${photo}` }}

                                        />
                                    </View>
                                }
                                {/* <Icon
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                // color: 'brown',
                                alignSelf: 'center',
                                zIndex: 111,
                                width: 73,
                                height: 70,
                                marginTop: 25
                                //backgroundColor: "rgba(0, 0, 0, 0.26)"
                            }}
                            onPress={() => {
                                showCamera(true);
                            }}
                            name="camera-outline" size={75}
                            color={'rgba(0, 0, 0, 0.26)'}
                        /> */}
                                <View
                                    style={{
                                        width: 73,
                                        height: 58,
                                        //alignContent : 'center',
                                        alignItems: 'center',
                                        //justifyContent : 'center',
                                        alignSelf: 'center'
                                    }}>
                                    {
                                        tomadaFoto === false &&

                                        < TouchableOpacity
                                            ref={(input) => { tres = input; }}
                                            onSubmitEditing={() => { cuatro.focus(); }}
                                            blurOnSubmit={false}
                                            returnKeyType="next"

                                            disabled={hasPermission === null || hasPermission === false}
                                            onPress={() => {
                                                //if(hasPermission ===)                                            
                                                showCamera(true);
                                            }}
                                        >

                                            <SVG nombre={'Camara'} width={73} height={58} />
                                        </TouchableOpacity>
                                    }

                                </View>
                            </View>
                            <View
                            //style={styles.localizacion}
                            >
                                <Text style={{
                                    width: 212,
                                    height: 22,
                                    fontFamily: 'nunito-semibold',
                                    fontSize: 16,
                                    fontWeight: "600",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    color: 'white',
                                    marginTop: (windowHeight * 1.47) / 100,
                                    marginLeft: (windowWidth * 4.3) / 100,
                                }}>
                                    Donde ha sido la incidencia?
                                </Text>
                                <View

                                    ref={(input) => { cuatro = input; }}
                                    onSubmitEditing={() => { cinco.focus(); }}
                                    blurOnSubmit={false}
                                    returnKeyType="next"
                                    // blurOnSubmit={false}
                                    // returnKeyType="next"
                                    style={styles.localizacion}
                                >
                                    <Text style={{
                                        marginLeft: 10,
                                        textAlign: 'left',
                                        // fontSize: 15,
                                        // color: 'brown'
                                        // width: 342,
                                        // height: 17,
                                        //fontFamily: "VarelaRound",
                                        fontSize: 14,
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        color: "#9d9d9d"
                                    }}>
                                        {geoGuardada === false ? 'Geolocalización de la ubicación' : 'Ubicación guardada'}
                                    </Text>
                                    {/* <Icon
                                style={{
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    // alignContent: 'center',
                                    color: 'rgb(79, 95, 225)',
                                    textAlign: 'right',
                                    zIndex: 111,
                                    flex: 0.95
                                    //marginLeft: 20
                                }}
                                onPress={() => {
                                    setCurrentLocation();
                                    setMapa(true);
                                }}
                                name="location-outline" size={30}
                            /> */}
                                    <View style={{
                                        marginLeft: 335,
                                        position: 'absolute'
                                    }}>
                                        <TouchableOpacity onPress={() => {
                                            // setCurrentLocation();
                                            setMapa(true);
                                            setWere('map');
                                        }}>
                                            <SVG nombre={'Ubicacion'} width={30} height={30} ></SVG>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TextInput
                                    ref={(input) => { tres = input; }}
                                    // onSubmitEditing={() => { cuatro.focus(); }}
                                    // blurOnSubmit={false}
                                    // returnKeyType="next"

                                    value={direccion}
                                    placeholder={'Nombre amigable para la dirección'}
                                    placeholderTextColor={"#9d9d9d"}
                                    style={styles.direccion}
                                    onChangeText={(direccion) => {
                                        setDireccion(direccion);
                                    }}
                                />
                                <TouchableOpacity
                                    disabled={habilitar}
                                    onPress={() => {
                                        //setCreada(true);
                                        //alert("ss")
                                        guardarInc();
                                    }}
                                    style={styles.siguienteTouch}>
                                    <Text style={{
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                        width: 150,
                                        height: 24,
                                        fontFamily: "nunito-bold",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        fontStyle: "normal",
                                        letterSpacing: 0.45,
                                        textAlign: "center",
                                        color: COLORS.primary
                                    }}>
                                        Crear incidencia
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            }
            {
                camera &&
                (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={true}>

                        <TouchableOpacity
                            onPress={() => {
                                showCamera(false);
                            }}
                            style={styles.buttonExit}>
                            <Text style={styles.textExit}>X</Text>
                        </TouchableOpacity>
                        <View style={[styles.modalBackground]}>
                            {/* <Camera
                                ref={cameraRef}
                                style={styles.camera}
                                type={cameraType}
                                onCameraReady={onCameraReady}
                            >                                
                            </Camera> */}

                            <View style={styles.containerCamera}>
                                <Camera
                                    ref={cameraRef}
                                    style={styles.camera}
                                    type={cameraType}
                                    onCameraReady={onCameraReady}
                                >
                                </Camera>
                                {!isPreview && (
                                    <View style={styles.bottomButtonsContainer}>
                                        <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
                                            <MaterialIcons name='flip-camera-ios' size={28} color='white' />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            disabled={!isCameraReady}
                                            onPress={onSnap}
                                            style={styles.capture}
                                        />
                                    </View>
                                )}
                                {isPreview && (
                                    <TouchableOpacity
                                        onPress={cancelPreview}
                                        style={styles.closeButton}
                                        activeOpacity={0.7}
                                    >
                                        <AntDesign name='close' size={32} color='#fff' />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </Modal>
                )
            }
            {
                creadaIncidencia &&
                (<Modal
                    animationType="slide"
                    transparent={true}
                    visible={true}>
                    <View style={[styles.modalCreada]}>

                        <View style={{
                            alignItems: 'center',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            height: '20%',
                            width: '50%',
                            // marginTop: 267,
                        }}>
                            {/* <Image style={{
                                height: '100%',
                                width: '100%',
                                borderRadius: 20
                            }} source={require('../assets/1.png')} /> */}
                            {/* <View style = {}> */}
                            <SVG nombre={'CreadaIncidencia'} width={296} height={208} />
                            {/* </View> */}
                            <View style={{
                                flexDirection: 'column',
                                width: 325,
                                height: 165,
                                marginTop: 20,
                            }}>
                                <Text style={{
                                    width: 295,
                                    //height: 108,
                                    fontFamily: "nunito-bold",
                                    fontSize: 16,
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    color: 'white',
                                    textAlign: "center",
                                    alignSelf: 'center',
                                    justifyContent: 'center'

                                }}>
                                    ¡Mil gracias por tu aportación!
                                </Text>
                                {/* <Text style={{
                                    width: 295,
                                    fontFamily: "nunito-regular",
                                    fontSize: 16,
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    color: 'white',
                                    marginTop: 40,
                                    textAlign: "center",
                                    alignSelf: 'center',
                                    justifyContent: 'center'
                                }}>
                                    Sigue el estado de las propuestas en cualquier momento.
                                </Text> */}
                                <TouchableOpacity
                                    onPress={() => {
                                        //setCreada(false);
                                        navigation.navigate('Main');
                                        setCreadaIncidencia(false);
                                    }}
                                    style={styles.salir}>
                                    <Text style={{
                                        width: 40,
                                        height: 24,
                                        fontFamily: "nunito-bold",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        fontStyle: "normal",
                                        letterSpacing: 0.45,
                                        textAlign: "center",
                                        color: COLORS.primary,
                                    }}>
                                        Salir
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </Modal>)
            }
            {
                mapa === true && (location === null || location == undefined) &&
                <ActivityIndicator
                    size="large"
                    color={'white'}
                    style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                />
            }
            {
                mapa === true && location &&
                <View style={{ flex: 1, marginTop: 80, zIndex: 11111 }}>
                    <MapView
                        ref={myRef}
                        style={{
                            flex: 1,
                            width: '100%',
                            // borderWidth : 3
                        }}
                        provider={PROVIDER_GOOGLE}
                        //onMapReady={() => this._onMapReady()}
                        // onLayout={ ()=> this._onMapReady()}
                        loadingEnabled={true}
                        loadingIndicatorColor={'brown'}
                        initialRegion={{
                            "latitude": location.coords.latitude,
                            "longitude": location.coords.longitude,
                            "latitudeDelta": 0.0922,
                            "longitudeDelta": 0.0421,
                        }}
                    // onRegionChange={this.onRegionChange}                    
                    >


                        <MapView.Marker
                            onDragEnd={(e) => {
                                console.log("e.nativeEvent ", e.nativeEvent);

                                setLocation({
                                    "coords": {
                                        "latitude": e.nativeEvent.coordinate.latitude,
                                        "longitude": e.nativeEvent.coordinate.longitude
                                    }
                                });

                                Alert.alert(
                                    'Ubicación',
                                    'Desea esta ubicación?',
                                    [
                                        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                        // { text: 'Yes', onPress: () => BackHandler.exitApp() },
                                        {
                                            text: 'Si', onPress: () => {
                                                setgeoGuardada(true);
                                                setMapa(false);
                                                setWere('back');
                                            }
                                        },
                                    ],
                                    { cancelable: false });
                            }}
                            draggable
                            onPress={() => {
                            }}
                            tracksViewChanges={false}
                            coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                        >
                            {/* <View style={{ zIndex: 1111, justifyContent: 'center', alignItems: 'center', height: 35, width: 35, borderWidth: 3 }}>
                                <Image source={require('../assets/navigate-icon.png')} style={{ zIndex : 11111, borderWidth: 3, height: 35, width: 35 }} />
                            </View> */}
                            <MaterialCommunityIcons name="map-marker-radius-outline" size={40} color={COLORS.primary} />
                        </MapView.Marker>
                    </MapView>
                    <TouchableOpacity
                        onPress={() => {
                            setgeoGuardada(true);
                            setMapa(false);
                            setWere('back');
                        }}
                        style={styles.save}>
                        <Text style={{
                            alignItems: 'center',
                            alignSelf: 'center',
                            textAlign: 'center',
                            alignItems: 'center',
                            width: 175,
                            height: 24,
                            fontFamily: "nunito-bold",
                            fontSize: 18,
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0.45,
                            textAlign: "center",
                            color: 'white'
                        }}>
                            Guardar ubicación
                        </Text>
                    </TouchableOpacity>
                </View>
            }
        </View >
    );
}
const styles = StyleSheet.create({
    text: {
        color: '#fff'
    },
    closeButton: {
        position: 'absolute',
        top: 35,
        right: 20,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5A45FF',
        opacity: 0.7
    },
    bottomButtonsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 28,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    capture: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        height: CAPTURE_SIZE,
        width: CAPTURE_SIZE,
        borderRadius: Math.floor(CAPTURE_SIZE / 2),
        marginBottom: 28,
        marginHorizontal: 30
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        // flexDirection: 'column',
        // alignContent: 'center',
        // alignItems: 'center'
    },
    containerCamera: {
        flex: 1,
        backgroundColor: COLORS.primary,
        width: '100%'
        // flexDirection: 'column',
        // alignContent: 'center',
        // alignItems: 'center'
    },
    inputtitulo: {
        // marginTop: 20,
        // width: 300,
        // alignItems: 'center',
        // justifyContent: 'center',
        // color: 'white',
        // height: 50,
        // fontSize: 15,
        // borderRadius: 10,
        // backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 8,
        width: (windowWidth * 92) / 100,
        height: (windowHeight * 5.42) / 100,
        borderRadius: 8,
        backgroundColor: 'white',
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
        marginTop: 4,
        marginLeft: 15,
        // fontFamily: 'varelaround',
    },
    descripcion: {
        paddingLeft: 10,
        paddingRight: 8,
        paddingTop: 14,
        // width: 345,
        // height: 157,
        width: (windowWidth * 92) / 100,
        height: (windowHeight * 19.3) / 100,
        borderRadius: 8,
        backgroundColor: 'white',
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
        marginTop: 4,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    descripcion1: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        // width: 345,
        // height: 157,
        width: (windowWidth * 92) / 100,
        height: (windowHeight * 19.3) / 100,
        borderRadius: 8,
        backgroundColor: 'white',
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
        marginTop: 4,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    direccion: {
        // marginTop: 15,
        // width: 300,
        //textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginLeft: 15,
        zIndex: -111,
        // width: 345,
        width: (windowWidth * 92) / 100,
        height: 44,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 15,
        shadowOpacity: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dfdfdf"
    },
    siguienteTouch: {
        marginTop: 145,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 185,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    save: {
        bottom: 20,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 210,
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
    },
    salir: {
        position: 'absolute',
        bottom: -150,
        width: 83,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        //position : 'absolute',
        // bottom : 20
        // marginTop: (windowHeight * 21.5) / 100
        // marginTop: 175
    },
    localizacion: {
        alignItems: 'center',
        zIndex: -111,
        flexDirection: 'row',
        // width: 345,
        width: (windowWidth * 92) / 100,
        height: 44,
        borderRadius: 8,
        backgroundColor: 'white',
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
        marginTop: 4,
        marginLeft: 15,
    },
    camera: {
        //flex: 1
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        height: '100%',
        width: '100%',
    },
    button: {
        //marginLeft: 15,
        marginTop: 15,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 150,
        height: 50,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
    },
    siguiente: {
        //marginLeft: 15,
        marginTop: 45,
        borderRadius: 25,
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 150,
        height: 50,
        alignSelf: 'center',
        bottom: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1
    },
    buttonExit: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        color: 'white'
    },
    textExit: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    modalCreada: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
});