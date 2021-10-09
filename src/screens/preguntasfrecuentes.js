import React, { useState, useEffect, useRef, createRef } from 'react';
import { Button, Dimensions, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';
import SideBarHeader from '../components/sideBarHeader';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { height } from 'styled-system';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PreguntasFrecuentes({ navigation, props }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const SECTIONS = [
        {
            title: '¿Cuando tengo que pagar mi cuota?',
            content: 'Al final de cada mes se te cobrará el importe correspondiente a tu suscripción.',
        },
        {
            title: 'Second',
            content: 'Lorem ipsum...',
        },
    ];
    const [acordiones, setAcordiones] = useState(Array(SECTIONS.length).fill(false));
    const [acordionesOriginals, setAcordionesOriginals] = useState(Array(SECTIONS.length).fill(false));

    const [activeSections, setActiveSections] = useState([]);


    const _renderSectionTitle = (section) => {
        return null;
        // return (
        //     <View style={{ marginVertical: 5 }}>
        //         <Text style={{ fontWeight: 'bold' }}>{section.content}</Text>
        //     </View>
        // );
    };

    const _renderHeader = (section, index) => {
        //alert("header section " + JSON.stringify(section) + " index " + index);
        //alert("acordiones[index] " + acordiones[index]);
        if (acordiones[index] === false) {
            return (
                <View style={{
                    width: 343,
                    height: 44,
                    borderRadius: 8,
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    shadowColor: "rgba(0, 0, 0, 0.1)",
                    shadowOffset: {
                        width: 0,
                        height: 5
                    },
                    shadowRadius: 10,
                    shadowOpacity: 1,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    //marginBottom: 12

                }}>
                    <Text style={{
                        width: 305,
                        height: 19,
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
                    }}>{section.title}</Text>
                </View>
            );
        } else {
            return (
                <View style={{
                    width: 343,
                    height: 43,
                    borderRadius: 8,
                    backgroundColor: COLORS.primary,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    // borderWidth: 3
                }}>
                    <Text style={{
                        width: 305,
                        height: 19,
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
                        //marginBottom: 12
                    }}>{section.title}</Text>
                </View>
            );
        }
    };

    const _renderContent = (section) => {
        return (
            <View style={{
                width: 343,
                height: 107,
                borderRadius: 8,
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowRadius: 10,
                shadowOpacity: 1,
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
                }}>{section.content}</Text>
            </View>
        );
    };

    const _updateSections = (activeSections) => {
        // alert("activeSections " + JSON.stringify(activeSections));
        var aux = Array(SECTIONS.length).fill(false);
        for (let i = 0; i < activeSections.length; i++) {
            aux[activeSections[i]] = true;
        }
        setAcordiones(aux);
        setActiveSections(activeSections)
    };


    useEffect(() => {
        // alert("navigation " + JSON.stringify(navigation))
    }, []);

    return (
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
                </View>
            </View>

        </View>
        // <View style={{ backgroundColor: 'white', textAlign: 'center', alignItems: 'center', flex: 1, }}>
        //     <SideBarHeader texto={'Preguntas frecuentes'} navigation={navigation} />
        //     <View style={{ alignContent: 'center', marginTop: 10, flexDirection: 'row' }}>
        //         <View style={{ flexDirection: 'column', }}>
        // <AccordionList
        //     list={list}
        //     header={_head}
        //     body={_body}
        //     keyExtractor={item => `${item.id}`}
        // />
        //         </View>
        //     </View>
        // </View>
    );
}
const styles = StyleSheet.create({
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