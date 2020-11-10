import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Text, FlatList } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { DataTable } from 'react-native-paper';
import { AppLoading } from 'expo';
import { Dimensions } from "react-native";
import { useFonts } from 'expo-font';
import { LineChart } from "react-native-chart-kit";

//this.state = {

//}


export default function History({route, navigation}) {
  var [finished, setFinished]=useState(false)
  var [tableState, setTableState]= useState([]);
  var [hashArray, setHashArray] = useState([])
  var [histState, setHistState] = useState('Please Wait...')
  var [txInfo, setTxInfo] = useState([])
  var [tempArray, setTempArray] = useState([])
  var [hrArray, setHrArray] = useState([])
  var [systArray, setSystArray] = useState([])
  var [diastArray, setDiastArray] = useState([])

  var tempData=[]
  var hrData=[]
  var systData=[]
  var diastData=[]

  const { data } = route.params;

  for(var i=0; i<data.length; i++)
    {
    var val = txInfo[i]
      tempData.push(val.Temp)
      hrData.push(val.HR)
      systData.push(val.BP.systolic)
      diastData.push(val.BP.diastolic)
    }

  setTempArray(tempData)
  setHrArray(hrData)
  setSystArray(systData)
  setDiastArray(diastArray)


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

    const Item = ({ item }) => (
      <View style={styles.item}>
        <Text style={styles.text}>At: {item.TimeStamp}</Text>
        <Text style={styles.subText}>Heart Rate: {item.HR}</Text>
        <Text style={styles.subText}>Body Temp: {item.Temp} C</Text>
    <Text style={styles.subText}>Blood Pressure: {item.BP.systolic}/{item.BP.diastolic}</Text>
      </View>
    );

    const renderItem = ({ item }) => (
      <Item item={item} />
    );

  return (
    <View style={styles.container}>
      {/* <Spinner
          visible={!finished}
          textContent={histState}
          textStyle={styles.text}
        /> */}
      <ScrollView horizontal={false} showsVerticalScrollIndicator={true} >

      {finished &&
      <View style={{marginBottom:30, paddingHorizontal:20, paddingTop:40}}>

        <Text style={[styles.text, { color: "white", fontFamily: 'MetropolisBold', fontSize:30 }]}>
              Infographics
            </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View>
            {/* Bar Chart Starts From Here */}
            <Card containerStyle={[styles.card, {borderRadius:0, borderWidth:0, marginRight:20,}]}>
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
              withHorizontalLines={false}
              withVerticalLines={false}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#048bbd",
                backgroundGradientFrom: "#37c1d4",
                backgroundGradientTo: "#1e95a6",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{
                marginVertical: 0,
                paddingHorizontal: "auto",
                borderRadius: 10,
              }}
            />
            </Card>

            </View>

            <View>
            {/* Bar Chart Starts From Here */}
            <Card containerStyle={[styles.card, {borderRadius:0, borderWidth:0, marginRight:20}]}>
            <Card.Title>
            <Text style={[styles.text, { color: "white", fontSize: 20 }]}>
              Blood Pressure
            </Text>

            </Card.Title>
            <LineChart
              data={{
                labels: [],
                datasets: [
                  {
                    data: systArray,
                    strokeWidth:2,
                  },
                ],
              }}
              bezier
              width={maxWidth} // from react-native
              height={250}
              withHorizontalLines={false}
              withVerticalLines={false}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#048bbd",
                backgroundGradientFrom: "#37c1d4",
                backgroundGradientTo: "#1e95a6",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{
                marginVertical: 0,
                paddingHorizontal: "auto",
                borderRadius: 10,
              }}
            />
            </Card>

            </View>

            <View>
            {/* Bar Chart Starts From Here */}
            <Card containerStyle={[styles.card, {borderRadius:0, borderWidth:0, marginRight:20}]}>
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
              withHorizontalLines={false}
              withVerticalLines={false}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#048bbd",
                backgroundGradientFrom: "#37c1d4",
                backgroundGradientTo: "#1e95a6",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{
                marginVertical: 0,
                paddingHorizontal: "auto",
                borderRadius: 10,
              }}
            />
            </Card>

            </View>
      </ScrollView>
      </View>
      }

      <Card containerStyle={styles.card}>
      <Card.Title style={[styles.text, { color: "white", fontFamily: 'MetropolisBold', fontSize:30 }]}>
              Vitals History
            </Card.Title>
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
        </Card>

      <View style={{marginBottom:30, paddingHorizontal:20, paddingTop:40}}>
      <FlatList
        data={data.reverse()}
        renderItem={renderItem}
        keyExtractor={item => item.TimeStamp}
      />
            </View>



      </ScrollView>
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
  },

  card: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width:Dimensions.get("window").width,
    padding: "auto",
    paddingTop: 50,
    margin: "auto",
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: "#154360",
    backgroundColor: "#0B3047",
  },

  text: {
    fontFamily: "PoppinsBold",
    color: "#1F618D",
    fontSize:20,
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
    fontSize: 16,
    color: "#1F618D",
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
  },
  item: {
    backgroundColor: '#AED6F1',
    padding: 10,
    borderRadius:10,
    marginBottom:20
  },
  title: {
    fontSize: 32,
  },
});

