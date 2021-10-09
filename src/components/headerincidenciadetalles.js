import React, { useState, useEffect, useRef, createRef } from 'react';
import { View, Dimensions, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { height } from 'styled-system';



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
                <Icon
                    style={{
                        flex: 0.2
                    }}
                    onPress={() => {
                        navigation.goBack()
                    }}
                    name="chevron-back-outline"
                    color={COLORS.primary}
                    size={30}
                />
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
                <Icon
                    style={{
                        flex: 0.2
                    }}
                    onPress={() => {

                    }}
                    name="cloud-upload-outline"
                    color={COLORS.primary}
                    size={40}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    containerWebView: {
        top: 12,
        width: '100%',
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
