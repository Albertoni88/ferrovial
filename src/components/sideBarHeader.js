import React from 'react'
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SVG from './svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SideBarHeader({ texto, navigation }) {

    return (
        <View style={styles.containerWebView}>
           
            <View style={styles.goBack}>
                <View style={styles.containerSVGBack}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <SVG nombre={'VolverBlanco'} width={20} height={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{
                marginTop: 30,
                // marginTop: (windowHeight * 3.3) / 100,
                width: 280,
                height: Platform.OS === 'ios' ? 27 : 30,
                fontFamily: 'nunito-bold',
                fontSize: 20,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "center",
                alignSelf: 'center',
                marginLeft: 35,
                color: 'white'
            }}>
                {texto}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerSVGBack: {
        borderStyle: "solid",
        //left: -15,
        zIndex: 1111111,
        width: 15,
        height: 15,
        borderColor: COLORS.primary,
        marginTop: 12
    },
    goBack: {
        //position: 'absolute',
        // marginTop: 30,
        // marginLeft: 12,
        marginLeft: 12,
        //marginTop: 30,
        width: 20,
        height: 20,
    },
    containerWebView: {
        // marginTop: 20,
        // width: '100%',
        // height: 55,
        // zIndex: 9999,
        // backgroundColor: 'brown',
        // borderColor : 'blue',
        // borderWidth : 3

        width: '100%',
        height: 108,
        flexDirection: 'row',
        alignItems: 'center',
        // width: '100%',
        // height: (windowHeight * 11) / 88,
        backgroundColor: COLORS.primary,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 15,
        shadowOpacity: 1
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
