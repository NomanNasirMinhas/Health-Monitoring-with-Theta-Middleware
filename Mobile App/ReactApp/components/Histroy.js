import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

//this.state = {

//}


export default function Readings({navigation}) {
  //const state = this.state;
  tableHead= ['Time', 'Heart Rate', 'Temp.', 'Syst. BP', 'Dia. BP'];
  tableData= [
    ["10:00 PM", 82, 90, 81,122],
    ["10:05 PM", 80, 91, 83,121],
    ["10:10 PM", 84, 89, 81,120],
    ["10:15 PM", 83, 88, 82,118],
    ["10:20 PM", 81, 93, 83,119],
    ["10:25 PM", 80, 92, 80,120],
    ["10:30 PM", 79, 90, 84,122]
  ];
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table>
      </View>
    )
  }

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#141D2B' },
  head: { height: 40, backgroundColor: 'black' },
  text: { margin: 6, color: "white", alignSelf: 'center', }
});
