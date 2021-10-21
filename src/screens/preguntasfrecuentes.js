import React, { useState, useEffect, } from 'react';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';
import { Button, SafeAreaView, Dimensions, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';


import Accordion from 'react-native-collapsible/Accordion';
import SideBarHeader from '../components/sideBarHeader';
import { COLORS } from '../constants';
import { getFaqs } from '../store/actions/userActions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PreguntasFrecuentes({ navigation, props }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const [SECTIONS, SetSections] = useState([]);
    const [acordiones, setAcordiones] = useState(Array(SECTIONS.length).fill(false));
    const [acordionesOriginals, setAcordionesOriginals] = useState(Array(SECTIONS.length).fill(false));
    const token = useReduxSelector((state) => state.user.access_token);

    const [activeSections, setActiveSections] = useState([]);

    useEffect(() => {
        getFaqs(token)
            .then(response => {
                SetSections(response.data);
                setAcordiones(Array(response.data.length).fill(false));
            })
            .catch(error => {
            });
    }, []);


    const _renderSectionTitle = (section) => {
        return null;
    };

    const _renderHeader = (section, index) => {

        if (acordiones[index] === false) {
            return (
                <View style={{
                    marginTop: 12,
                    width: (windowWidth * 93.6) / 100,
                    height: 44,
                    borderRadius: 8,
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    alignSelf: 'center',
                    borderRadius: 12,
                    backgroundColor: 'white',
                    shadowColor: "rgba(0, 0, 0, 0.2)",
                    shadowOffset: {
                        width: 0,
                        height: 0
                    },
                    shadowRadius: 15,
                    shadowOpacity: 1,

                }}>
                    <Text style={{
                        width: 305,
                        height: Platform.OS === 'ios' ? 19 : 25,
                        fontFamily: 'montserrat-medium',
                        fontSize: 16,
                        fontWeight: "500",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        color: COLORS.primary,
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }}>{section.nombre}</Text>
                </View>
            );
        } else {
            return (
                <View style={{
                    width: (windowWidth * 93.6) / 100,
                    height: 43,
                    marginTop: 12,
                    borderRadius: 8,
                    backgroundColor: COLORS.primary,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}>
                    <Text style={{
                        width: 305,
                        height: Platform.OS === 'ios' ? 19 : 25,
                        fontFamily: 'montserrat-medium',
                        fontSize: 16,
                        fontWeight: "500",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        color: 'white',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}>{section.nombre}</Text>
                </View>
            );
        }
    };

    const _renderContent = (section) => {
        return (
            <View style={{
                width: (windowWidth * 93.6) / 100,
                height: 107,
                marginTop: 12,
                borderRadius: 8,
                backgroundColor: 'white',
                shadowColor: "rgba(0, 0, 0, 0.2)",
                shadowOffset: {
                    width: 0,
                    height: 0
                },
                shadowRadius: 8,
                shadowOpacity: 0.5,

                alignSelf: 'center',
                marginTop: 12,
                height: (windowHeight * 9.35) / 100,
                width: (windowWidth * 93.6) / 100,
            }}>
                <Text style={{
                    width: 305,
                    height: 40,
                    fontFamily: 'montserrat-medium',
                    fontSize: 14,
                    fontWeight: "500",
                    fontStyle: "normal",
                    lineHeight: 20,
                    letterSpacing: 0,
                    color: "#646464",
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 12
                }}>{section.descripcion}</Text>
            </View>
        );
    };

    const _updateSections = (activeSections) => {
        var aux = Array(SECTIONS.length).fill(false);
        for (let i = 0; i < activeSections.length; i++) {
            aux[activeSections[i]] = true;
        }
        setAcordiones(aux);
        setActiveSections(activeSections)
    };

    return (
        // <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'rgb(247, 247, 247)', textAlign: 'center', alignItems: 'center', flex: 1, }}>
                <SideBarHeader texto={'Preguntas frecuentes'} navigation={navigation} />
                <View style={{ alignItems: 'center', width: '100%', height: '100%' }}>
                    <View style={{
                        marginTop: 16,
                    }}>
                        <Text
                            style={{
                                width: 351,
                                height: 44,
                                fontFamily: 'nunito-semibold',
                                fontSize: 16,
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: COLORS.browngrey
                            }}>
                            Si tienes una duda esperamos tener una respuesta para ella...
                        </Text>
                    </View>
                    <View style={{
                        marginTop: 22,
                    }}>

                        {
                            SECTIONS !== null && SECTIONS !== undefined &&
                            <Accordion
                                expandMultiple={true}
                                underlayColor={'transparent'}
                                sections={SECTIONS}
                                activeSections={activeSections}
                                renderSectionTitle={_renderSectionTitle}
                                renderHeader={_renderHeader}
                                renderContent={_renderContent}
                                onChange={_updateSections}
                            />
                        }
                    </View>
                </View>

                {/* <View style={[styles.card, styles.shadowProp]}>
                <View>
                    <Text style={styles.heading}>
                        React Native Box Shadow (Shadow Props)
                    </Text>
                </View>
                <Text>
                    Using the elevation style prop to apply box-shadow for iOS devices
                </Text>
            </View> */}

            </View>
        // </SafeAreaView>
    );
}
const styles = StyleSheet.create({

    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 45,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 10,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    checkbox: {
        alignSelf: "center",
    },
    goBack: {
        marginTop: 30,
        textAlign: 'left',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },
    logo: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputuser: {
        marginTop: 75,
        width: 300,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        height: 50,
        fontSize: 15,
        borderRadius: 10,
        backgroundColor: 'grey',
        // borderColor: 'white',
        // borderWidth: 2
    },
    apellidos: {
        marginTop: 15,
        width: 300,
        textAlign: 'center',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        color: 'white',
        height: 150,
        fontSize: 15,
        borderRadius: 10,
        backgroundColor: 'grey',
        // borderColor: 'white',
        // borderWidth: 2
    },
    inputpass: {
        marginTop: 20,
        width: 300,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        height: 50,
        fontSize: 15,
        borderRadius: 10,
        backgroundColor: 'brown',
        borderColor: 'white',
        borderWidth: 2
    },
});