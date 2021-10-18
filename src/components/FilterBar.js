import React from 'react'
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Buscar from '../assets/Buscar.svg'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function FilterBar({ texto, navigation, showMap }) {

    return (
        <View style={styles.containerWebView}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('FilterType', { filtro: 'tipo' });
                }}
                style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: 55,
                    height: 30,
                    opacity: 0.4,
                    borderRadius: 22,
                    shadowColor: "rgba(0, 0, 0, 0.1)",
                    shadowOffset: {
                        width: 0,
                        height: 4
                    },
                    shadowRadius: 10,
                    shadowOpacity: 1,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: 'white',
                    marginLeft: 6
                }}>
                <Text style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 35,
                    height: 14,
                    opacity: 0.4,
                    fontFamily: "poppins-medium",
                    fontSize: 12,
                    fontWeight: "500",
                    fontStyle: "normal",
                    lineHeight: (windowHeight * 2.2) / 100,
                    letterSpacing: 0.3,
                    color: 'white',

                }}>
                    Tipo
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('FilterType', { filtro: 'estado' });
                }}
                style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: 75,
                    height: 30,
                    opacity: 0.4,
                    borderRadius: 22,
                    shadowColor: "rgba(0, 0, 0, 0.1)",
                    shadowOffset: {
                        width: 0,
                        height: 4
                    },
                    shadowRadius: 10,
                    shadowOpacity: 1,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: 'white',
                    marginLeft: 8
                }}>
                <Text style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 55,
                    height: 14,
                    opacity: 0.4,
                    fontFamily: "poppins-medium",
                    fontSize: 12,
                    fontWeight: "500",
                    fontStyle: "normal",
                    lineHeight: 17,
                    letterSpacing: 0.5,
                    color: 'white'
                }}>
                    Estado
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('FilterType', { filtro: 'interaccion' });
                }}
                style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: 110,
                    height: 30,
                    opacity: 0.4,
                    borderRadius: 22,
                    shadowColor: "rgba(0, 0, 0, 0.1)",
                    shadowOffset: {
                        width: 0,
                        height: 4
                    },
                    shadowRadius: 10,
                    shadowOpacity: 1,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: 'white',
                    marginLeft: 8
                }}>
                <Text style={{
                    // fontSize: 15,
                    // color: 'white'
                    textAlign: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: 85,
                    height: 14,
                    opacity: 0.4,
                    fontFamily: "poppins-medium",
                    fontSize: 12,
                    fontWeight: "500",
                    fontStyle: "normal",
                    lineHeight: 17,
                    letterSpacing: 0.3,
                    color: 'white'
                }}>
                    Interacción
                </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', marginLeft : 90, marginRight : 10}}>
                <View style={{
                    width: 22,
                    height: 7,
                    borderRadius: 2,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: 'white',
                }}>
                    <View style={{
                        width: 22,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: 'white'

                    }} />
                </View>
                <View style={{
                    width: 22,
                    height: 7,
                    borderRadius: 2,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: 'white',
                }}>
                    <View style={{
                        width: 22,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: 'white'

                    }} />
                </View>
                <View style={{
                    width: 22,
                    height: 7,
                    borderRadius: 2,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: 'white',   
                }}>
                    <View style={{
                        width: 22,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: 'white'

                    }} />
                </View>
            </View>
            {/* <Icon
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    color: 'white',                    
                    textAlign: 'right'
                }}
                onPress={() => { }}
                name="ios-menu"
                size={30}
            /> */}
            <Icon
                style={{
                    //flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    color: 'white',
                    textAlign: 'right',
                    opacity: 0.3,
                }}
                onPress={() => {
                    showMap()
                }}
                name="location-outline" size={30}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerWebView: {
        width: '100%',
        height: 44,
        zIndex: 9999,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBackContainer: {
        backgroundColor: 'rgb(113, 197, 232)',
        height: 45,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    close: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 30,
        top: 5,
    },
    logo: {
        width: '25%',
        height: '60%',
        marginTop: 10,
        resizeMode: 'contain',
        marginLeft: 120,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
