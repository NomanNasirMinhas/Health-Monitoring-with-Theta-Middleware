import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { DataTable } from 'react-native-paper';
import { AppLoading } from 'expo';
import { Dimensions } from "react-native";
import { useFonts } from 'expo-font';
import { LineChart } from "react-native-chart-kit";
import { io } from 'socket.io-client';

//this.state = {

//}


export default function LiveReadings({route, navigation}) {
  var [finished, setFinished]=useState(false)
  var [tableState, setTableState]= useState([]);
  var [hashArray, setHashArray] = useState([])
  var [histState, setHistState] = useState('Please Wait...')
  var [txInfo, setTxInfo] = useState([])
  var [tempArray, setTempArray] = useState([])
  var [hrArray, setHrArray] = useState([])
  var [systArray, setSystArray] = useState([])
  var [diastArray, setDiastArray] = useState([])
  var [BPArray, setBPArray] = useState([])
  var [tempArray, setTempArray] = useState([])
  var [streamRoot, setStreamRoot] = useState('')
  const socket = io('https://thetamiddleware.herokuapp.com/');

  var tempData=[]
  var hrData=[]
  var systData=[]
  var diastData=[]

  var tableData=[]
  var maxWidth = Dimensions.get("window").width;

  useEffect(() => {
    (async () => {

      try{
        const { address } = route.params;
        const { seed } = route.params;


        setHistState('Fetching Transaction Hashes\nPlease Wait......')
        var root = await fetch(
          `https://thetamiddleware.herokuapp.com/getMAMroot/${seed}&${address}`
        );
        root = await root.json();
        console.log("Root is ", root);
        
    setFinished(true)
      }
      catch(e){
        setFinished(true)
        console.log(e)
        // Alert.alert("Error Has Occurred")
      }



    })();
  }, []);

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
      <Spinner
          visible={!finished}
          textContent={histState}
          textStyle={styles.text}
        />
      <ScrollView horizontal={false} showsVerticalScrollIndicator={true} >

      {finished &&
      <View style={{marginBottom:30, paddingHorizontal:20, paddingTop:40}}>
        <Text>Hello</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Go Back"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonText}
            style={{ width: 150}}
            onPress={
              () => navigation.goBack()
              // navigation.navigate('Readings')
            }
          ></Button>
        </View>
      </View>
      }

      {/* {finished &&

      <Card containerStyle={[styles.card, {borderTopLeftRadius: 20, borderTopRightRadius: 20,}]}>
        <Card.Title>
            <Text style={[styles.text, { color: "white", fontSize: 20 }]}>
              Your Readings are shown below
            </Text>
            </Card.Title>

      <Table  style={styles.tableStyle} borderStyle={{borderWidth: 2, borderColor: 'white'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.headerText}/>
        <Rows data={tableState} textStyle={styles.text}/>
      </Table>
      </Card>

      } */}

      </ScrollView>
    </View>
  )
}
}


const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 30, backgroundColor: '#034772' },
  head: { height: 40, backgroundColor: '#154360' },
  text: { margin: 6, color: "white", alignSelf: 'center', fontFamily:'Righteous'},
  headerText: { margin: 6, color: "white", alignSelf: 'center', fontFamily:'MetropolisBold'},
  tableStyle: { backgroundColor: "#485776"},
  card: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: "auto",
    paddingTop: 20,
    margin: "auto",
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: "#F6F8FC",
    backgroundColor: "#0B3047",
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonStyle:{
    backgroundColor:'#00619E',
    borderWidth:2,
    borderColor:'white'
  },
  buttonText: {
    fontFamily: "MetropolisBold",
    color: "white",
    textAlign: "center",
  },

});
