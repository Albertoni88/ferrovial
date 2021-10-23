import React, { useState, useEffect, createRef } from 'react';
import { ActivityIndicator, Platform, Text, View, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import * as Location from 'expo-location';
//import * as Permissions from 'expo-permissions';
import MapView, {
    AnimatedRegion,
    animateCamera,
    PROVIDER_GOOGLE,
} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import { position } from 'styled-system';
//import { Card, ListItem, Button } from 'react-native-elements';
import { Card } from 'react-native-paper';
import CarIncidenciaMapa from './Cards/cardincidenciamapa';
import { COLORS } from '../constants';

export default function Map({ navigation, cantidadIncidencias, incidencias, filtroMapa }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [markers, setMarkers] = useState(Array(incidencias.length).fill(true));
    const [markersOriginals, setMarkersOriginals] = useState(Array(incidencias.length).fill(false));
    const [renderCard, setRenderCard] = useState(false);
    const [incidencia, setIncidencia] = useState({});
    const [indice, setIndice] = useState(0);

    const myRef = createRef();

    useEffect(() => {
        const dir = navigator.geolocation.getCurrentPosition({"latitude": 21.84, "longitude" : -78.76194})
        
        setCurrentLocation();
    }, []);
    const MarkerChoice = async (choice) => {
        
        setIndice(choice);

        var inc = {};
        for(let i = 0; i < incidencias.length; i++){
            if (i === choice) {
                inc = incidencias[i];
                
            }
        }
        var aux = Array(incidencias.length).fill(false);
        aux[choice] = true;
        
        setMarkersOriginals(aux);
        setMarkers(aux);
        setIncidencia(inc);
    }

    // const getLocationAsync = async () => {
        
    //     const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
    //     if (status === 'granted') {
    //         return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    //     } else {
    //         throw new Error('Location permission not granted');
    //     }
    // }
    const setCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };
    const gotToTouch = (lat, lon) => {
        if (myRef) {
            myRef.current.animateCamera(
                {
                    center: {
                        latitude: lat,
                        longitude: lon,
                    },
                    zoom: 10,
                },
                5000,
            );
        }
    };
    

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = location;
    }

    return (
        <View style={styles.container}>
            {
                location &&
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
                    {/* {location && (
                        <MapView.Marker
                            tracksViewChanges={false}
                            coordinate={{ "latitude": location.coords.latitude, "longitude": location.coords.longitude }}
                            style={{ zIndex: 9999 }}
                            title={'Posición Actual'}
                        />
                    )} */}
                    { incidencias !==null && incidencias !==undefined && incidencias.length > 0 &&
                        incidencias.map((marker, i) => {
                            console.log("marker ", marker, " i ", i)
                            // if (!marker.latitude || !marker.longitude) return;
                            const { lat, lng } = marker.geo[0];
                            return (
                                <MapView.Marker
                                    opacity={markers[i] === true ? 1 : 0.5}
                                    onPress={() => {
                                        //gotToTouch(marker.latitude, marker.longitude);
                                        setRenderCard(true);
                                        MarkerChoice(i);
                                        //filtroMapa(marker.nombre);
                                    }}                                    
                                    tracksViewChanges={false}
                                    // coordinate={marker.geo}
                                    // coordinate={{latitude : 21.84, longitude : -78.76194}}
                                    coordinate={{latitude : lat, longitude : lng}}
                                    //title={incidencias[i].nombre}
                                    key={i}
                                />
                            );
                        })}

                </MapView>
            }
            {
                renderCard === true && incidencia !== {} &&
                <CarIncidenciaMapa key={incidencia.id} navigation={navigation} incidencia={incidencia} indice = {indice} />
            }
            {
                (location === null || location === undefined) &&
                <ActivityIndicator
                    size="large"
                    color={COLORS.primary}
                    style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                />
            }
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // zIndex : 1111
    },
    containerCard: {
        top: '58.5%',
        // marginTop : '5%',
        // justifyContent: 'center',
        // alignContent: 'center',
        // alignItems: 'center',
        //borderWidth: 1,
        alignSelf: 'center',
        // height: 200,
        // width: 350,
        borderRadius: 20,
        borderColor: 'blue',
        borderWidth: 3
    },
    imageContainer: {
        // borderWidth : 3

    },
    image: {
        height: 200,
        width: 350,
        borderRadius: 20,
        borderColor: 'orange',
        borderWidth: 3,
        marginTop: 300,
        // top: 230,        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        left: 30,
    },
});