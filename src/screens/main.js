import React, { useState, useEffect, useRef, createRef } from 'react';
import { Button, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainHeader from '../components/mainHeader';

export default function Main({ navigation, props }) {
    
    useEffect(() => {
        
    }, []);

    return (
        <View style={styles.container}>
            <MainHeader navigation = {navigation} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});