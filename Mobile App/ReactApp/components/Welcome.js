import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Welcome({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Welcome Screen</Text>
      <Button title="Go to QR Code" onPress={
          ()=> navigation.navigate('qrScanner') 
      }/>

        <Button title="Go to Profile" onPress={
                ()=> navigation.navigate('Profile') 
            }/>

        <Button title="Go to Readings" onPress={
                ()=> navigation.navigate('Readings') 
            }/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
