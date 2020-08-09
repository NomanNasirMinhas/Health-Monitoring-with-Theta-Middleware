import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, Image, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import qrScanner from './qrScanner';
import Readings from './Readings';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default ({navigation}) => {
  return (
    <View style={styles.container}>
       <FadeInView style={styles.text}>
  <Text style={[styles.text, {fontWeight:"bold", fontSize: 36 }]}>Patient Monitoring App</Text>
      </FadeInView>

      <FadeInView style={{width: '100%', height: '60%'}}>
      <Image source={require("../assets/splashIcon.png")} style={styles.image} resizeMode="center"></Image>
      </FadeInView>

      <FadeInView style={styles.login}>
      <Button title='Login' onPress={() => navigation.navigate('qrScanner')}></Button>
      </FadeInView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141D2B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
   // fontFamily: "Righteous",
    color: "white",
    textAlign: "center"
  },

  login: {
    fontFamily: "Righteous",
    color: "#52575D",
    textAlign: "center",
    width: '40%',
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: 'white',
    
  },

  subText:{
    fontSize:12,
    color: "#AEB5BC",
    textTransform: "capitalize",
    fontWeight:"500"
  },

  image:{
    flex: 1,
    width: undefined,
    height: undefined
  }
});