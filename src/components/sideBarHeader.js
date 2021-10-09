import React from 'react'
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SideBarHeader({ texto, navigation }) {

    return (
        <View style={styles.containerWebView}>
            <Icon
                onPress={() => {
                    navigation.goBack();
                }}
                style={{
                    marginTop: 50,
                    marginLeft: 12,
                    //marginTop : (windowHeight * 6.16) / 90,
                    flex: 0.6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                }}
                name="chevron-back-outline"
                color="white"
                size={30}
            />
            <Text style={{
                marginTop: 47,
                width: 280,
                height: 27,
                fontFamily: 'nunito-bold',
                fontSize: 20,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "center",
                color: 'white'
            }}>
                {texto}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    goBack: {
        marginTop: 50,
        marginLeft: 12,
        textAlign: 'left',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
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
        height: 88,
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
