import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import { exp } from 'react-native-reanimated';

export default function Header(){
    return(
        <View style={StyleSheet.header}>
            <View>
    <Text style={StyleSheet.headerText}>Hello</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        backgroundColor: '#042f66',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        letterSpacing: 1,
    }
});