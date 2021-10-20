

import React from 'react'
import { View,Dimensions, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Buscar from '../assets/Buscar.svg'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DrawerContent({ navigation}) {


    return (
        <View style={styles.containerSide}>
                <ScrollView>
                    <View style={{
                        flexDirection: 'row',
                        // borderColor: 'blue',
                        // borderWidth: 3
                    }}>
                        <Icon
                            style={{
                                width: (windowWidth * 4.8) / 18,
                                height: (windowHeight * 2.5) / 20,
                                marginLeft: 12,
                                marginTop: 50,
                            }}
                            onPress={toggleOpen}
                            name="chevron-back-outline"
                            color="white"
                            size={30}
                        />
                        {/* <View style={styles.containerSVGVolver}>
                            <SVG nombre={'Volver'} width={20} height={20} />
                        </View> */}
                        <View style={{
                            alignContent: 'center',
                            height: 64,
                            width: 228,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 0.6,
                            // borderColor: 'green',
                            // borderWidth: 3,
                            marginTop: 34
                        }}>
                            <Image style={styles.logo} source={require('../assets/group9.png')}></Image>
                        </View>
                    </View>
                    <View style={styles.perfil}>
                        {/* <Icon
                            style={{
                                marginLeft: 5,
                                borderStyle: "solid",
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center'
                                // borderWidth: 0.8,
                                //borderColor: COLORS.browngrey
                            }}
                            onPress={() => {
                                navigation.navigate('EditarPerfil')
                            }}
                            name="pencil"
                            color={COLORS.browngrey}
                            size={25}
                        /> */}
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('EditarPerfil')
                            }}
                            style={styles.containerSVGPerfil}>
                            <SVG nombre={'Perfil'} width={20} height={20} />
                        </TouchableOpacity>
                        <Text style={styles.navItemStyle}>
                            Editar perfil
                        </Text>
                    </View>

                    <View>
                        <View style={styles.feedback}>
                            {/* <AntDesign
                                style={{
                                    marginLeft: 5,
                                    borderStyle: "solid",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('Feedback')
                                }}
                                name="message1"
                                color={COLORS.browngrey}
                                size={25}
                            /> */}
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Feedback')
                                }}
                                style={styles.containerSVGFeedback}>
                                <SVG nombre={'Feedback'} width={20} height={20} />
                            </TouchableOpacity>
                            <Text style={styles.navItemStyle}>
                                Feedback
                            </Text>
                        </View>
                        <View style={styles.navSectionStyle}>
                            {/* <Icon
                                style={{
                                    marginLeft: 5,
                                    borderStyle: "solid",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('PreguntasFrecuentes')
                                }}
                                name="pencil"
                                color={COLORS.browngrey}
                                size={25}
                            /> */}
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('PreguntasFrecuentes')
                                }}
                                style={styles.containerSVGFaq}>
                                <SVG nombre={'Faq'} width={20} height={20} />
                            </TouchableOpacity>
                            <Text style={styles.navItemStyle}>
                                Preguntas frecuentes
                            </Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.avisos}>
                            {/* <Icon
                                style={{
                                    marginLeft: 5,
                                    borderStyle: "solid",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('AvisosLegales')
                                }}
                                name="pencil"
                                color={COLORS.browngrey}
                                size={25}
                            /> */}
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('AvisosLegales')
                                }}
                                style={styles.containerSVGAvisos}>
                                <SVG nombre={'Avisos'} width={20} height={20} />
                            </TouchableOpacity>
                            <Text style={styles.navItemStyle}>
                                Avisos legales
                            </Text>
                        </View>
                        <View style={styles.politicas}>
                            {/* <Icon
                                style={{
                                    marginLeft: 5,
                                    borderStyle: "solid",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('Politicas')
                                }}
                                name="pencil"
                                color={COLORS.browngrey}
                                size={25}
                            /> */}
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Politicas')
                                }}
                                style={styles.containerSVGPoliticas}>
                                <SVG nombre={'Politicas'} width={20} height={20} />
                            </TouchableOpacity>
                            <Text style={styles.navItemStyle}>
                                Política de privacidad
                            </Text>
                        </View>
                        <View style={styles.informacion}>
                            {/* <Icon
                                style={{
                                    marginLeft: 5,
                                    borderStyle: "solid",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('InformacionTecnica')
                                }}
                                name="settings-outline"
                                color={COLORS.browngrey}
                                size={25}
                            /> */}
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('InformacionTecnica')
                                }}
                                style={styles.containerSVGInfoTec}>
                                <SVG nombre={'InfoTec'} width={20} height={20} />
                            </TouchableOpacity>
                            <Text style={styles.navItemStyle}>
                                Información técnica
                            </Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.infoproduct}>
                            {/* <Icon
                                // style={{
                                //     marginLeft: 5
                                // }}
                                // onPress={() => {

                                // }}
                                // name="information-circle-outline"
                                // color="brown"
                                // size={30}
                                style={{
                                    marginLeft: 5,
                                    borderStyle: "solid",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('WelcomeSlides')
                                }}
                                name="information-circle-outline"
                                color={COLORS.browngrey}
                                size={25}
                            /> */}
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('WelcomeSlides')
                                }}
                                style={styles.containerSVGInfoProd}
                            >
                                <SVG nombre={'InfoProd'} width={20} height={20} />
                            </TouchableOpacity>
                            <Text style={styles.navItemStyle}>
                                Info de producto
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footerContainer}>
                    <Text style={{
                        // fontWeight: 'bold',
                        // fontSize: 20,
                        // color: 'white'
                        width: 116,
                        height: 24,
                        opacity: 0.5,
                        fontFamily: 'nunito-bold',
                        fontSize: 18,
                        fontWeight: "bold",
                        fontStyle: "normal",
                        letterSpacing: 0.45,
                        textAlign: "center",
                        color: 'rgb(255, 255,255)'
                    }}
                        onPress={() => {
                            // alert("Cerrar sesion")
                        }}
                    >
                        Cerrar sesión
                    </Text>
                </View>
            </View>
    )

}

const styles = StyleSheet.create({
    containerSide: {
        flex: 1,
        height: '100%',
        zIndex: 99999999,
        backgroundColor: COLORS.primary,
        // borderWidth: 3,
        // borderColor: 'pink'
    },
})
