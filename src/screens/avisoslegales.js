import React, { useState, useEffect, useRef, createRef } from 'react';
import { Button, SafeAreaView, Dimensions, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox } from 'react-native-elements'
import SideBarHeader from '../components/sideBarHeader';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { height } from 'styled-system';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AvisosLegales({ navigation, props }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [checked, setChecked] = React.useState(false);


    useEffect(() => {
        // alert("navigation " + JSON.stringify(navigation))
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'white', textAlign: 'center', alignItems: 'center', flex: 1, }}>
                <SideBarHeader texto={'Avisos legales'} navigation={navigation} />
                <ScrollView>
                    <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', marginTop: 16 }}>
                            <Text style={{
                                //width: 351,
                                width: (windowWidth * 93.6) / 100,
                                // height: (windowHeight * 97.3) / 100,
                                height: '100%',
                                fontFamily: 'nunito-semibold',
                                fontSize: 16,
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: COLORS.browngrey
                            }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis sapien quis quam accumsan, nec ultrices tellus dictum. Nam tincidunt nulla eget fermentum aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec interdum et lacus vitae aliquet. Pellentesque auctor egestas sem ut venenatis. Proin rutrum orci purus, vitae rutrum turpis pretium at. Sed pulvinar molestie lorem non fermentum. Cras mattis nisl ac est cursus, maximus tincidunt ligula pulvinar. Nam at erat libero.

                                Quisque a risus at lectus ultrices pretium a a arcu. Donec rutrum molestie metus. Quisque convallis lacinia nisi sit amet molestie. Sed sed eleifend tellus. Phasellus sit amet maximus mauris. Pellentesque condimentum erat nec molestie dictum. Morbi pharetra lectus ac tincidunt tincidunt.

                                Curabitur viverra lorem at erat luctus, et rutrum ante consectetur. Phasellus molestie massa vel ex eleifend, posuere viverra est fermentum. Duis nec laoreet ex. Etiam posuere egestas ex sit amet sagittis. Donec pellentesque nulla odio, sed hendrerit eros pretium venenatis. Suspendisse lorem nisl, ultrices sit amet vehicula vel, aliquet ac orci. Donec porttitor libero risus, in interdum massa rhoncus et. Proin vel odio eu libero luctus tristique non ut tellus. Donec ac gravida magna.

                                Curabitur accumsan eu lectus vitae pharetra. Donec vestibulum ipsum at feugiat vulputate. Morbi enim metus, sagittis eu tellus eu, congue tempus arcu. Nunc vel vehicula tellus. Phasellus blandit mauris ut augue egestas ultrices non ut sem. Sed at neque commodo purus eleifend suscipit non eu ipsum. Morbi nunc tellus, gravida non est ut, laoreet ultrices metus. Ut vitae laoreet magna. Cras semper dapibus posuere. Curabitur accumsan lectus id sagittis tincidunt.

                                Proin ut placerat eros. Cras maximus massa ut porta molestie. Proin non scelerisque neque. In eget tortor ante. Quisque pretium, neque vitae bibendum consequat, nisi ligula efficitur quam, ac faucibus elit dui et ante. Aenean vitae ullamcorper libero. Curabitur vel hendrerit urna. Quisque dapibus laoreet lacinia. Suspendisse id tincidunt dui. Quisque vitae enim placerat, rutrum massa id, sagittis ipsum. Nullam eu lacus et nisl aliquam convallis.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
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