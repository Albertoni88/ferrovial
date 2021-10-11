import React, { useState, useEffect, useRef, createRef } from 'react';
import { View, Dimensions, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { height } from 'styled-system';
import SVG from './svg';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HeaderIncidenciaDetalles({ navigation, filtrar }) {


    const [searchString, setsearchString] = useState('');
    const [cruz, setCruz] = useState(false);

    return (
        <View style={styles.containerWebView}>
            <TouchableOpacity
                style={styles.iconBackContainer}
                onPress={() => navigation.goBack()}
            >
                {/* <Icon
                    style={{
                        flex: 0.2
                    }}
                    onPress={() => {
                        navigation.goBack()
                    }}
                    name="chevron-back-outline"
                    color={COLORS.primary}
                    size={30}
                /> */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={styles.containerSVGBack}
                >
                    <SVG nombre={'VolverPrimario'} width={22} height={18} />
                </TouchableOpacity>
                <Text
                    style={{
                        flex: 1,
                        fontSize: 15,
                        color: COLORS.primary,
                        padding: 20,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                    Valdepeñas
                </Text>
                {/* <Icon
                    style={{
                        flex: 0.2
                    }}
                    onPress={() => {

                    }}
                    name="cloud-upload-outline"
                    color={COLORS.primary}
                    size={40}
                /> */}
                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={styles.containerSVGSubir}
                >
                    <SVG nombre={'Subir'} width={22} height={25} />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    containerSVGBack: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // left: 15,
        marginLeft: (windowWidth * 4) / 100,
        zIndex: 1111111,
        width: 22,
        height: 18,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGSubir: {
        // alignContent: 'center',
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center',
        left: -15,
        marginLeft: 10,
        zIndex: 1111111,
        width: 22,
        height: 25,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerWebView: {
        // flexDirection : 'row',
        // width : '100%',
        top: 12,        
        height: 65,
        zIndex: 9999,
    },
    input: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#c7c4c4',
        color: '#424242',
        textAlign: 'center',
        borderRadius: 10,
        width: 250
    },
    iconBackContainer: {
        backgroundColor: 'white',
        height: 60,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
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
