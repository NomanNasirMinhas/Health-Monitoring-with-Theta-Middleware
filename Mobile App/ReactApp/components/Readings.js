import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Readings({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Readings Screen</Text>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={true}>
        <View style={styles.mediaImageContainer}>
          <Image source={require("../assets/img.jpg")} style={styles.image} resizeMode="cover"></Image>
          <Text style={styles.vitalCount}>80 PBM</Text>
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
  }
});
