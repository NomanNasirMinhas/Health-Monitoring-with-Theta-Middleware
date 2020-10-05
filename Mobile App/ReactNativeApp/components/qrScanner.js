import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Spinner from 'react-native-loading-spinner-overlay';
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
    setScanned(true);
    var response = await fetch(`https://thetamiddleware.herokuapp.com/getAddressInfo/${data}`);
    var resObj = await response.json();
    var result= JSON.stringify(resObj)
    if(result.length === 2)
    {
      setFinished(true)
    Alert.alert("Login Failed")
    }


    else
    {
      setFinished(true)
      // Alert.alert("Login Passed")
      navigation.navigate('Profile', {info: resObj})
    }

  };

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
        justifyContent: 'flex-end',
        backgroundColor: '#141D2B'
      }}>
        <Spinner
          visible={scanned && !finished}
          textContent={'Authenticating...\nPlease Wait...'}
          textStyle={styles.text}
        />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141D2B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:30
  },

  text: {
   // fontFamily: "Righteous",
    color: "white",
    textAlign: "center"
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

  button: {
    //fontFamily: "Righteous",
    color: "#52575D",
    textAlign: "center",
    marginRight: 30,
    marginBottom: 30
  }

});
