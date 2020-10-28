import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import Readings from "./Readings";
import History from "./Histroy";
import { Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const getFonts = () =>
  Font.loadAsync({
    Righteous: require("../assets/fonts/Righteous-Regular.ttf"),
  });

export default function Profile({ route, navigation }) {
  // const [fontsLoaded, setFontsLoaded] = useState(false);
  const [patientName, setPatientName] = useState("Loading....");
  const [patientAge, setPatientAge] = useState("Loading....");
  const [patientGender, setPatientGender] = useState("Loading....");
  const [patientDate, setPatientDate] = useState("Loading....");
  const [patientHR, setPatientHR] = useState("Loading....");
  const [patientTemp, setPatientTemp] = useState("Loading....");
  const [patientBPsys, setPatientBPsys] = useState("Loading....");
  const [patientBPdiast, setPatientBPdiast] = useState("Loading....");
  const [patientAddress, setPatientAddress] = useState("Loading....");
  const [patientDeviceID, setPatientDeviceID] = useState("Loading....");
  const [hasLastTx, setHasLastTx] = useState(false);
  const [lastTx, setLastTx] = useState([0, 0, 0, 0,0]);
  var [finished, setFinished] = useState(false);
  var maxWidth = Dimensions.get("window").width;

  useEffect(() => {
    (async () => {
      try {
        const { info } = route.params;
        // Alert.alert(JSON.stringify(info))
        setPatientName(info.Profile.name.toString());
        setPatientAge(info.Profile.age.toString());
        setPatientGender(info.Profile.gender.toString());
        setPatientDate(info.Profile.date.toString());

        setPatientAddress(info.ADDRESS.toString());
        setPatientDeviceID(info.ID.toString());

        var response = await fetch(
          `https://thetamiddleware.herokuapp.com/getLastTx/${info.ADDRESS}`
        );
        var resObj = await response.json();
        // Alert.alert(resObj.toString())
        // var lastTxHash = JSON.stringify(resObj)
        // Alert.alert("Last TX Hash", resObj);
        if (resObj !== false) {
          var responseTx = await fetch(
            `https://thetamiddleware.herokuapp.com/getTx/${resObj}`
          );
          var resObjTx = await responseTx.json();
          resObjTx = JSON.parse(resObjTx);
          // Alert.alert(JSON.stringify(resObjTx))
          setPatientHR(resObjTx.HR.toString());
          setPatientTemp(resObjTx.Temp.toString());
          setPatientBPsys(resObjTx.BP.systolic.toString());
          setPatientBPdiast(resObjTx.BP.diastolic.toString());
          setLastTx([resObjTx.HR, resObjTx.Temp, resObjTx.BP.systolic,resObjTx.BP.diastolic, 0]);
          setHasLastTx(true);
          setFinished(true);
        }
        // alert("Finished")
        else {
          setPatientHR("N/A");
          setPatientTemp("N/A");
          setPatientBPsys("N/A");
          setPatientBPdiast("N/A");
          setFinished(true);
        }
      } catch (e) {
        setFinished(true);
        Alert.alert("Error has Ocurred", JSON.stringify(e));
      }
      // Alert.alert(JSON.stringify(info))
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
    'PoppinsBlack': require('./../assets/fonts/Poppins-Black.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

  return (
    <View style={styles.container}>
      <Spinner
        visible={!finished}
        color='white'
        textContent={"Fetching from IoTA...\nPlease Wait..."}
      />

      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <Card.Title>
          <Text style={[styles.text, { fontWeight: "900", fontSize: 36 }]}>
            {patientName}
          </Text>
        </Card.Title>
        <Card.Divider />
        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.text,
              { color: "white", fontSize: 20, marginBottom: 10 },
            ]}
          >
            Device ID: {patientDeviceID}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 20 }]}>Age</Text>
            <Text style={[styles.text, styles.subText]}>{patientAge}</Text>
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
            <Text style={[styles.text, { fontSize: 20 }]}>Gender</Text>
            <Text style={[styles.text, styles.subText]}>
              {patientGender.toUpperCase()}
            </Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 20 }]}>Admitted</Text>
            <Text style={[styles.text, styles.subText]}>{patientDate}</Text>
          </View>
        </View>

        <Card.Divider />
        <View style={styles.buttonContainer}>
          <Button
            title="Live Readings"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonText}
            style={{ width: 150, marginRight: 10 }}
            onPress={
              () => Alert.alert("This Feature is being under development")
              // navigation.navigate('Readings')
            }
          ></Button>
          <Button
            style={{ width: 150, marginLeft: 10 }}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonText}
            title="View History"
            onPress={() =>
              navigation.navigate("History", { address: patientAddress })
            }
          ></Button>
        </View>

        <Card containerStyle={styles.card}>
          <Card.Title>
            <Text style={[styles.text, { color: "white", fontSize: 20 }]}>
              Last Readings
            </Text>
          </Card.Title>

          <View>
            {/* Bar Chart Starts From Here */}

            <BarChart
              data={{
                labels: ["Temp (F)", "HR (BPM)", "BP-Syst", "BP-Diast",""],
                datasets: [
                  {
                    data: lastTx,
                  },
                ],
              }}
              width={maxWidth} // from react-native
              height={250}
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
                  {patientHR} BPM
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
                  {patientTemp} F
                </Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 20 }]}>
                  Blood{"\n"}Pressure
                </Text>
                <Text style={[styles.text, styles.subText]}>
                  {patientBPsys}/{patientBPdiast} Hg
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* <View style={{alignSelf: "center"}}>
          <View style={styles.profileImage}>
            <Image source={require('../assets/iota.png')} style={styles.image} resizeMode="center"></Image>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
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

  text: {
    fontFamily: "Righteous",
    color: "white",
    textAlign: "center",
    fontWeight: "900",
  },

  buttonStyle:{
    backgroundColor:'#00619E',
    borderWidth:1,
    borderColor:'white'
  },
  buttonText: {
    fontFamily: "Righteous",
    color: "white",
    textAlign: "center",
  },

  subText: {
    fontSize: 14,
    color: "gray",
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
});
