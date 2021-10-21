import React from 'react'
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SVG from '../components/svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HeaderCrearIncidencia({ navigation }) {

    return (
        <View style={styles.containerWebView}>
            <TouchableOpacity
                style={styles.iconBackContainer}
                onPress={() => navigation.goBack()}
            >
                <View style={styles.goBack}>
                    <View style={styles.containerSVG}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <SVG nombre={'VolverBlanco'} width={20} height={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
            <Text style={{
                width: 280,
                height: 27,
                fontFamily: 'nunito-bold',
                fontSize: 20,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                marginLeft: 85,
                textAlign: "center",
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                color: 'white',
                marginTop: 50,
                position: 'absolute'
            }}>
                Crear incidencia
            </Text>
            {/* <Text style={{
                    flex : 0.35,
                    //width: 76,
                    height: 27,
                    fontFamily: 'nunito-bold',
                    fontSize: 20,
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    textAlign: "right",
                    color: 'white',
                    marginTop : 17
                    // textDecorationLine : 'underline'
                }}>
                    1
                </Text>
                <Text style={{
                    // flex: 0,
                    //width: 76,
                    height: 27,
                    fontFamily: 'nunito-bold',
                    fontSize: 20,
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    textAlign: "right",
                    color: "rgba(255, 255, 255, 0.4)",
                    marginRight : 12,
                    marginTop : 17
                }}>
                    /1
                </Text> */}


        </View>
    )
}

const styles = StyleSheet.create({
    containerSVG: {
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary,
    },
    goBack: {
        //position: 'absolute',
        //marginTop: 20,
        // marginLeft: 12,
        // marginTop: (windowHeight * 10) / 100,
        // marginLeft: (windowWidth * 4.3) / 100,
        marginTop: 50,
        marginLeft: (windowWidth * 4.3) / 100,
        width: 30,
        height: 30,
    },
    containerWebView: {
        top: 12,
        width: '100%',
        height: 25,
        zIndex: 9999,
    },
    iconBackContainer: {
        //marginTop : 10,
        backgroundColor: COLORS.primary,
        height: 80,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        // borderColor : 'white',
        // borderWidth: 3
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
