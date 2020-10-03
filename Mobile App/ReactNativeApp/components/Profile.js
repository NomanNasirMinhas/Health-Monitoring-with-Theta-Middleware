import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { Ionicons, MaterialIcons} from '@expo/vector-icons'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Readings from './Readings';
import History from './Histroy';

const getFonts = () => Font.loadAsync({
  'Righteous':require('../assets/fonts/Righteous-Regular.ttf')
});

export default function Profile({route, navigation}) {

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [patientName, setPatientName] = useState("Loading....")
  const [patientHR, setPatientHR] = useState("Loading....")
  const [patientTemp, setPatientTemp] = useState("Loading....")
  const [patientBPsys, setPatientBPsys] = useState("Loading....")
  const [patientBPdiast, setPatientBPdiast] = useState("Loading....")
  const [patientAddress, setPatientAddress] = useState("Loading....")
  const [patientDeviceID, setPatientDeviceID] = useState("Loading....")

  useEffect(() => {
    (async () => {
      const { info } = route.params;
      setPatientName(info.Profile.name.toString())
      setPatientAddress(info.ADDRESS.toString())
      setPatientDeviceID(info.ID.toString())

    var response = await fetch(`https://thetamiddleware.herokuapp.com/getLastTx/${info.ADDRESS}`);
    var resObj = await response.json();
    // var lastTxHash = JSON.stringify(resObj)
    // Alert.alert("Last TX Hash", resObj);
    var responseTx = await fetch(`https://thetamiddleware.herokuapp.com/getTx/${resObj}`);
    var resObjTx = await responseTx.json();
      resObjTx = JSON.parse(resObjTx)
      // Alert.alert(JSON.stringify(resObjTx))
    setPatientHR(resObjTx.HR.toString())
    setPatientTemp(resObjTx.BPM.toString())
    setPatientBPsys(resObjTx.BP.systolic.toString())
    setPatientBPdiast(resObjTx.BP.diastolic.toString())

    // Alert.alert(info)


    })();
  }, []);




  if (!fontsLoaded) {
    return (
    <AppLoading 
    startAsync={getFonts}
    onFinish = {()=> setFontsLoaded(true)}
    />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false} >
        {/* <View style={styles.titleBar}>
          <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
          <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
        </View> */}

        <View style={{alignSelf: "center"}}>
          <View style={styles.profileImage}>
            <Image source={require('../assets/monitor.png')} style={styles.image} resizeMode="center"></Image>
          </View>
        </View>

        <View style={styles.infoContainer}>
      <Text style={[styles.text, {fontWeight:"200", fontSize: 36 }]}>{patientName}</Text>
      <Text style={[styles.text, {color:"white", fontSize: 20 }]}>Device ID: {patientDeviceID}</Text>
          </View>

          <View style={{marginTop:20, alignSelf:'center', }}>
            <Button style={[styles.button, {marginBottom: 20,}]} title='Get Live Readings' onPress={() => navigation.navigate('Readings')}></Button>
            {/* <Button style={styles.button} title='View History' onPress={() => navigation.navigate('History')}></Button> */}
          </View>
          <View style={{marginTop:20, alignSelf:'center', }}>
            {/* <Button style={[styles.button, {marginBottom: 20,}]} title='Get Live Readings' onPress={() => navigation.navigate('Readings')}></Button> */}
            <Button style={styles.button} title='View History' onPress={() => navigation.navigate('History', {address: patientAddress})}></Button>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, {fontSize: 20}]}>Heart{"\n"}Beat</Text>
              <Text style={[styles.text, styles.subText]}>{patientHR} BPM</Text>
            </View>
            <View style={[styles.statsBox, {borderColor: "#DFD8C8", borderLeftWidth: 2, borderRightWidth: 2}]}>
              <Text style={[styles.text, {fontSize: 20}]}>Body{"\n"}Temp.</Text>
              <Text style={[styles.text, styles.subText]}>{patientTemp} F</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, {fontSize: 20}]}>Blood{"\n"}Pressure</Text>
      <Text style={[styles.text, styles.subText]}>{patientBPsys}/{patientBPdiast} Hg</Text>
            </View>
          </View>
         

      </ScrollView>
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
