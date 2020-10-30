import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Spinner from 'react-native-loading-spinner-overlay';
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import Profile from './Profile'

export default function qrScanner({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  var [finished, setFinished]=useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    try{

      setScanned(true);
    var response = await fetch(`https://thetamiddleware.herokuapp.com/getAddressInfo/${data}`);
    var resObj = await response.json();
    var result= JSON.stringify(resObj)
    // Alert.alert(result.toString())
    if(resObj == false)
    {
      setFinished(true)
    Alert.alert("Login Failed")
    }

    else
    {
      setFinished(true)
      // Alert.alert(resObj.toString())
      navigation.navigate('Profile', {info: resObj})
    }

    } catch(e)
    {
      setFinished(true)
      Alert.alert("Unable to Login", "Please Try Again....")
    }


  };

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

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#09344F',
      }}>
        <Spinner
          visible={scanned && !finished}
          textContent={'Authenticating...\nPlease Wait...'}
          textStyle={styles.text}
        />
        <Text style={styles.text}>
          Please Scan QR Code on Patient's Machine to Login
        </Text>

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.container}
      />

      {scanned && <Button buttonStyle={styles.button} titleStyle={{fontFamily:"PoppinsBold"}} title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#034772',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50,
    marginBottom:20,
    borderRadius:100,
    borderColor: "#DFD8C8",
    borderLeftWidth: 2,
    borderRightWidth: 2
  },

  text: {
    // paddingHorizontal:20,
    marginTop:20,
    fontSize:20,
    fontFamily:"PoppinsBold",
    color: "white",
    textAlign: "center"
  },

  subText:{
    fontSize:12,
    color: "#154360",
    textTransform: "capitalize",
    fontWeight:"500"
  },

  image:{
    flex: 1,
    width: undefined,
    height: undefined
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden"
  },

  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20
  },

  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
    width:350

  },

  statsBox: {
    alignItems: "center",
    flex: 1
  },

  button:{
    backgroundColor:"#076BAA",
    color: 'white',
    height:50,
    width:200,
    borderRadius:10,
    borderWidth:5,
    borderColor:'#004068',
    marginLeft:'auto',
    marginRight:'auto'
  },

});
