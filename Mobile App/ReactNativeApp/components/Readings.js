import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LineChart } from 'react-native-chart-kit'

const heartRateData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [81, 75, 79, 83, 80, 73, 81],
      strokeWidth: 2, // optional
    },
  ],
};

const systolicBP = {
  labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [120, 124, 118, 124, 118, 110, 115],
      strokeWidth: 2, // optional
    },
  ],
};

const bodyTemp = {
  labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [96, 94, 89, 96, 99, 95, 100],
      strokeWidth: 2, // optional
    },
  ],
};

export default function Readings({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={[styles.text, {fontWeight:"bold", fontSize: 30 }]}>
            Heart Rate
          </Text>
          <LineChart
            data={heartRateData}
            width={300} 
            height={300}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#1860FB',
              backgroundGradientTo: '#22D0D8',
              decimalPlaces: 1, 
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 20,
                marginTop: 20,
              }
            }}
            bezierstyle={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
          
        </View>

        <View style={styles.card}>
          <Text style={[styles.text, {fontWeight:"bold", fontSize: 30 }]}>
            Blood Pressure
          </Text>
          <LineChart
            data={systolicBP}
            width={300} 
            height={300}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#1860FB',
              backgroundGradientTo: '#22D0D8',
              decimalPlaces: 1, 
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 20,
                marginTop: 20,
              }
            }}
            bezierstyle={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
          
        </View>

        <View style={styles.card}>
          <Text style={[styles.text, {fontWeight:"bold", fontSize: 30 }]}>
            Body Temperature
          </Text>
          <LineChart 
            data={bodyTemp}
            width={300} 
            height={300}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#1860FB',
              backgroundGradientTo: '#22D0D8',
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 20,
                borderStyle:'solid',
                borderWidth:2,
                marginTop: 20,
              }
            }}
            bezierstyle={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
          
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
  },
  card: {
    borderRadius: 20,
    marginTop: 20,
    alignItems:'center',
    justifyContent:'center',
    borderColor: 'white',
    borderWidth:3,
    
  },

  mediaImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 10
  },

  vitalCount: {
    color: "white",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 100, 
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 20,
    shadowOpacity:1
  },

  text: {
  //  fontFamily: "Righteous",
    color: "white",
    textAlign: "center",
    fontWeight: 'bold'
  },
});
