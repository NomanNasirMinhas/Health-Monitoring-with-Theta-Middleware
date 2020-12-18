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
import {
  BarChart,
} from "react-native-chart-kit";
const io = require('socket.io-client');

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
  var [current, setCurrent] = useState('Not Found')
  const [currentTemp, setCurrentTemp] = useState(0)
  const [currentHR, setCurrentHR] = useState(0)
  const [currentSpO2, setCurrentSpO2] = useState(0)

  const socket = io.connect('http://172.20.10.3:7000/');

  var tempData=[]
  var hrData=[]
  var systData=[]
  var diastData=[]

  var tableData=[]
  var maxWidth = Dimensions.get("window").width;

  useEffect(() => {
    (async () => {

      try{

    socket.on("connect", () => console.log("hello", `Connected to Server`));
    socket.on("vitals", data => {
      console.log(data)
      data = JSON.parse(data)
      setCurrentTemp(data.Temp)
      setCurrentHR(data.HR)
      setCurrentSpO2(data.SpO2)

    });
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

<Card containerStyle={styles.card}>

          <View>
            {/* Bar Chart Starts From Here */}

            <Card.Title>
          <Text style={[styles.text, { color: 'white', fontWeight: "900", fontSize: 26, fontFamily:'Righteous' }]}>
            Live Readings
          </Text>
        </Card.Title>

            <BarChart
              data={{
                labels: ["Temp (F)", "HR (BPM)", "SpO2"],
                datasets: [
                  {
                    data: [currentTemp, currentHR, currentSpO2],
                  },
                ],
              }}
              width={maxWidth} // from react-native
              height={250}
              fromZero={true}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#103952",
                backgroundGradientFrom: "#02395A",
                backgroundGradientTo: "#074164",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 6,
                },
              }}
              style={{
                marginVertical: 0,
                paddingHorizontal: "auto",
                borderRadius: 0,
              }}
            />

            <View style={styles.lastTxContainer}>
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 20 }]}>
                  Heart{"\n"}Beat
                </Text>
                <Text style={[styles.text, styles.subText]}>
                  {currentHR} BPM
                </Text>
              </View>
              <View
                style={[
                  styles.statsBox,
                  {
                    borderColor: "#DFD8C8",
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                  },
                ]}
              >
                <Text style={[styles.text, { fontSize: 20 }]}>
                  Body{"\n"}Temp.
                </Text>
                <Text style={[styles.text, styles.subText]}>
                  {currentTemp} F
                </Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 20 }]}>
                  Oxygen{"\n"}Saturation
                </Text>
                <Text style={[styles.text, styles.subText]}>
                  {currentSpO2} %
                </Text>
              </View>

            </View>

          </View>
          <View style={styles.buttonContainer}>
          <Button
            title="Go Back"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonText}
            style={{ width: 150}}
            onPress={
              () => {
                socket.disconnect()
                navigation.goBack()
              }
              // navigation.navigate('Readings')
            }
          ></Button>
        </View>
        </Card>
    </View>
  )
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#034772",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },

  card: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: "auto",
    paddingTop: 20,
    margin: "auto",
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: "#154360",
    backgroundColor: "#0B3047",
  },

  spinnerText: { margin: 6, color: "white", alignSelf: 'center', fontFamily:'Righteous'},

  text: {
    fontFamily: "Metropolis",
    color: "white",
    textAlign: "center",
    fontWeight: "900",
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

  subText: {
    fontSize: 14,
    color: "#e3e1dc",
    fontFamily:'Secular',
    textTransform: "capitalize",
    fontWeight: "500",
  },

  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 0,
  },

  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 0,
    marginBottom: 20,
  },

  lastTxContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  statusOnline:{
    color:'#1E8449'
  },
  statusOffline:{
    color:'#C0392B'
  }
});
