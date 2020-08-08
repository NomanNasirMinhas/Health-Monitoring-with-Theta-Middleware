import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { Ionicons, MaterialIcons} from '@expo/vector-icons'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

const getFonts = () => Font.loadAsync({
  'Righteous':require('../assets/fonts/Righteous-Regular.ttf')
});

export default function Profile({navigation}) {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
    <AppLoading 
    startAsync={getFonts}
    onFinish = {()=> setFontsLoaded(true)}
    />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} >
        {/* <View style={styles.titleBar}>
          <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
          <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
        </View> */}

        <View style={{alignSelf: "center"}}>
          <View style={styles.profileImage}>
            <Image source={require('../assets/favicon.png')} style={styles.image} resizeMode="center"></Image>
          </View>
        </View>

        <View style={styles.infoContainer}>
            <Text style={[styles.text, {fontWeight:"200", fontSize: 36 }]}>Patient Name</Text>
            <Text style={[styles.text, {color:"#AEB5BC", fontSize: 20 }]}>Patient's Seed</Text> 
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
      <Text style={[styles.text, {fontSize: 24}]}>Heart{"\n"}Beat</Text>
              <Text style={[styles.text, styles.subText]}>80 BPM</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, {fontSize: 24}]}>Body{"\n"}Temp.</Text>
              <Text style={[styles.text, styles.subText]}>80 BPM</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, {fontSize: 24}]}>Blood{"\n"}Pressure</Text>
              <Text style={[styles.text, styles.subText]}>80 BPM</Text>
            </View>
          </View>

          {/* <View style={{marginTop: 32}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.mediaImageContainer}>
                <Image source={require("../assets/splash.png")} style={styles.image} resizeMode="cover"></Image>
              </View>

              <View style={styles.mediaImageContainer}>
                <Image source={require("../assets/splash.png")} style={styles.image} resizeMode="cover"></Image>
              </View>

              <View style={styles.mediaImageContainer}>
                <Image source={require("../assets/splash.png")} style={styles.image} resizeMode="cover"></Image>
              </View>
            </ScrollView>
            
            <View style={styles.vitalCount}>
              <Text style={[styles.text, {fontSize: 24, color: "#DFC8D8", fontWeight:"300" }]}>Avg Heart Beat</Text>
              <Text style={[styles.text, {fontSize: 24, color: "#DFC8D8", fontWeight:"300" }]}>80 BPM</Text>
            </View>
          </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  text: {
    fontFamily: "Righteous",
    color: "#52575D",
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
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  
  profileImage: {
    width: 200,
    height: 200,
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
    marginTop: 32
  },

  statsBox: {
    alignItems: "center",
    flex: 1
  },

  mediaImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 10
  },

  vitalCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30, 
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 20,
    shadowOpacity:1
  }

});
