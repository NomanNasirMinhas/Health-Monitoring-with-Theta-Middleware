import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, Image, StyleSheet} from 'react-native';
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';



const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 5000,
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
  let [fontsLoaded] = useFonts({
        // Load a font `Montserrat` from a static resource
        'Righteous': require('./../assets/fonts/Righteous-Regular.ttf'),
        'Secular': require('./../assets/fonts/SecularOne-Regular.ttf'),
        'Nunito': require('./../assets/fonts/Nunito-Regular.ttf'),
        'Poppins': require('./../assets/fonts/Poppins-Regular.ttf'),
        'NunitoBold': require('./../assets/fonts/Nunito-Bold.ttf'),
        'PoppinsBold': require('./../assets/fonts/Poppins-Bold.ttf'),
        'NunitoBlack': require('./../assets/fonts/Nunito-Black.ttf'),
        'PoppinsBlack': require('./../assets/fonts/Poppins-Black.ttf'),
        'MetropolisBlack': require('./../assets/fonts/Metropolis-Black.otf'),
        'MetropolisBold': require('./../assets/fonts/Metropolis-Bold.otf'),
        'MetropolisSemiBold': require('./../assets/fonts/Metropolis-SemiBold.otf'),
        'Metropolis': require('./../assets/fonts/Metropolis-Regular.otf'),

      });

      if (!fontsLoaded) {
        return <AppLoading />;
      } else {

  return (
    <View style={styles.container}>
       <FadeInView style={styles.text}>
  <Text style={[styles.text, {fontWeight:"900", fontSize: 30 }]}>Patient Monitoring App</Text>
      </FadeInView>

      <View style={{width: '100%', height: '50%'}}>
      <Image source={require("../assets/IOTALogoWhite.png")} style={styles.image} resizeMode="center"></Image>
      </View>

      <FadeInView>
      <Button buttonStyle={styles.button} title='Scan QR' titleStyle={{fontFamily:'MetropolisBold'}} onPress={() => navigation.navigate('qrScanner')}></Button>
      </FadeInView>
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002943",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingHorizontal:30,
    borderWidth:10,
    borderColor:'#154360'
  },

  button:{
    backgroundColor:"#076BAA",
    color: 'white',
    height:80,
    width:200,
    borderRadius:10,
    borderWidth:5,
    borderColor:'#004068'
  },
  text: {
   fontFamily: "Metropolis",
    color: "white",
    textAlign: "center"
  },

  image:{
    flex: 1,
    width: undefined,
    height: undefined
  }
});