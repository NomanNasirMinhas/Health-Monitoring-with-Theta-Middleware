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
import DatePicker from 'react-native-datepicker'

//this.state = {

//}


export default function Readings({route, navigation}) {
  var [finished, setFinished]=useState(false)
  var [tableState, setTableState]= useState([]);
  var [hashArray, setHashArray] = useState([])
  var [histState, setHistState] = useState('Please Wait...')
  var [txInfo, setTxInfo] = useState([])
  var [tempArray, setTempArray] = useState([])
  var [hrArray, setHrArray] = useState([])
  var [showDate, setShowDate] = useState(true)
  var [date, setDate] = useState('26-11-2020')
  var [hasDate, setHasDate] = useState(false)
  var [SpO2Array, setSpO2Array] = useState([])
  var [tempArray, setTempArray] = useState([])

  var rawTxs=[]
  var tempData=[]
  var hrData=[]
  var systData=[]
  var diastData=[]
  var spo2Data=[]

  var tableData=[]
  var maxWidth = Dimensions.get("window").width;

  useEffect(() => {
    (async () => {


      try{
        const { address } = route.params;
        setHistState('Fetching Transaction Hashes\nPlease Wait......')
    var response = await fetch(`https://thetamiddleware.herokuapp.com/getAllHash/${address.toString()}&${date}&vitals`);
    var resObj = await response.json();
    // Alert.alert("All Hashes", JSON.stringify(resObj.length));
    if(resObj === false){
      Alert.alert("No Transactions Found", "Please Select another Date");
      // navigation.goBack();
    }
    else{
    setFinished(false)
    setHashArray(resObj.reverse())
    setHistState('Fetching Transactions from IOTA\nPlease Wait..........')
    for(var i=0; i<resObj.length; i++)
    {
      var responseTx = await fetch(`https://thetamiddleware.herokuapp.com/getTx/${resObj[i].toString()}`);
    var resObjTx = await responseTx.json();
    // console.log(resObjTx.response)
    // var parsed = JSON.parse(resObjTx)
    // Alert.alert(JSON.stringify(parsed))
    rawTxs.push(resObjTx.response)
    }
    setTxInfo(rawTxs)
    // Alert.alert("Fetched",JSON.stringify(txInfo))

    for(var i=0; i<rawTxs.length; i++)
    {
    var val = rawTxs[i]
    // console.log(val)
    var row=[]
      row.push(val.TimeStamp.toString());
      row.push(val.HR);
      row.push(val.Temp);
      row.push(val.SpO2)
      // row.push(val.BP.systolic);
      // row.push(val.BP.diastolic);
      tempData.push(val.Temp)
      hrData.push(val.HR)
      spo2Data.push(val.SpO2)
      // systData.push(val.BP.systolic)
      // diastData.push(val.BP.diastolic)
      tableData.push(row)

    }
    setTempArray(tempData)
    setHrArray(hrData)
    setSpO2Array(spo2Data)
    // setSystArray(systData)
    // setDiastArray(diastData)
    setTableState(tableData)
    setFinished(true)
    // console.log(tableData)
  }
  setFinished(true)
      }
      catch(e){
        setFinished(true)
        console.log(e)
        // Alert.alert("Error Has Occurred")
      }



    })();
  }, [date]);


  var tableHead= ['Time','Heart Rate (BpM)', 'Temp (F)', 'SpO2 - %'];

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
      <Text style={[styles.text, { color: "white", fontFamily: 'Secular', fontSize:30 }]}>
              Your Vital Sign's History
            </Text>
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
        <Card.Divider />
        <View>
        <Text style={[styles.text, { color: "white", fontFamily: 'Metropolis', fontSize:18 }]}>
        Please Pick A Date To See History
      </Text>

          <DatePicker
          style={{width: 100, marginLeft: 140}}
          date={date}
          mode="date"
          placeholder="Please Select Transactions Date"
          format="DD-MM-YYYY"
          minDate="01-01-2000"
          maxDate="01-01-2025"
          confirmBtnText="Confirm"
          showIcon = {false}
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'relative',
              margin: 'auto',

            },
            dateText:{
              color:'white',
              margin:'auto',

            },
            placeholderText: {
              color: 'white'
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(dateIn) => {setDate(dateIn); setShowDate(true); console.log("Date ",date)}}

        /></View>

<Spinner
          visible={!finished}
          textContent={histState}
          textStyle={styles.text}
        />

      <ScrollView horizontal={false} showsVerticalScrollIndicator={true} >

      {finished &&
      <View style={{marginBottom:30, paddingHorizontal:5, paddingTop:20}}>
        <Card.Divider />

        <Text style={[styles.text, { color: "white", fontFamily: 'MetropolisBold', fontSize:30 }]}>
              Infographics
            </Text>
            <Card.Divider />
      <ScrollView horizontal={false} showsVerticalScrollIndicator={true}>
        <View>
            {/* Bar Chart Starts From Here */}
            <Card containerStyle={[styles.card, {backgroundColor:'#940101', borderRadius:10, borderWidth:0, marginBottom:20,}]}>
            <Card.Title>
            <Text style={[styles.text, { color: "white", fontSize: 20 }]}>
              Body Temperature
            </Text>

            </Card.Title>
            <LineChart
              data={{
                labels: [],
                datasets: [
                  {
                    data: tempArray,
                    strokeWidth:2,
                  },
                ],
              }}
              bezier
              width={maxWidth} // from react-native
              height={250}
              withHorizontalLines={true}
              withVerticalLines={true}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#048bbd",
                backgroundGradientFrom: "#CD210E",
                backgroundGradientTo: "#FF1900",
                decimalPlaces: 1, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{
                marginVertical: 0,
                paddingHorizontal: "auto",
                borderRadius: 0,
              }}
            />
            </Card>

            </View>

            <View>
            {/* Bar Chart Starts From Here */}
            <Card containerStyle={[styles.card, {backgroundColor:'#126435', borderRadius:10, borderWidth:0, marginBottom:20}]}>
            <Card.Title>
            <Text style={[styles.text, { color: "white", fontSize: 20 }]}>
              Oxygen Saturation
            </Text>

            </Card.Title>
            <LineChart
              data={{
                labels: [],
                datasets: [
                  {
                    data: SpO2Array,
                    strokeWidth:2,
                  },
                ],
              }}
              bezier
              width={maxWidth} // from react-native
              height={250}
              withHorizontalLines={true}
              withVerticalLines={true}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#048bbd",
                backgroundGradientFrom: "#1E8449",
                backgroundGradientTo: "#02A647",
                decimalPlaces: 1, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{
                marginVertical: 0,
                paddingHorizontal: "auto",
                borderRadius: 0,
              }}
            />
            </Card>

            </View>

            <View>
            {/* Bar Chart Starts From Here */}
            <Card containerStyle={[styles.card, {backgroundColor:'#C69E00', borderRadius:10, borderWidth:0, marginBottom:20}]}>
            <Card.Title>
            <Text style={[styles.text, { color: "white", fontSize: 20 }]}>
              Heart Rate
            </Text>

            </Card.Title>
            <LineChart
              data={{
                labels: [],
                datasets: [
                  {
                    data: hrArray,
                    strokeWidth:2,
                  },
                ],
              }}
              bezier
              width={maxWidth} // from react-native
              height={250}
              withHorizontalLines={true}
              withVerticalLines={true}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#048bbd",
                backgroundGradientFrom: "#E1B711",
                backgroundGradientTo: "#F1C40F",
                decimalPlaces: 1, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{
                marginVertical: 0,
                paddingHorizontal: "auto",
                borderRadius: 0,
              }}
            />
            </Card>

            </View>
      </ScrollView>
      </View>
      }
<Card.Divider />
      {finished &&

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

      }

      </ScrollView>
    </View>
  )
}
}


const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 30, backgroundColor: '#034772' },
  head: { height: 40, backgroundColor: '#0E6655' },
  text: { margin: 6, color: "white", alignSelf: 'center', fontFamily:'Righteous'},
  headerText: { margin: 6, color: "white", alignSelf: 'center', fontFamily:'MetropolisBold'},
  tableStyle: { backgroundColor: "#A2D9CE"},
  card: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: "auto",
    paddingTop: 20,
    margin: "auto",
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: "#1F618D",
    backgroundColor: "#0B3047",
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonStyle:{
    backgroundColor:'#F1C40F',
    borderRadius:20,
    borderWidth:3,
    borderColor:'#B7950B'
  },
  buttonText:{
    fontFamily:'PoppinsBold',
    fontSize:20,
    color:'#D35400'
  }

});
