import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

//this.state = {

//}


export default function Readings({route, navigation}) {
  var [finished, setFinished]=useState(false)
  // var [tableData, setTableData]= useState([]);
  var [hashArray, setHashArray] = useState([])
  var [txInfo, setTxInfo] = useState([])
  var tableData=[]

  useEffect(() => {
    (async () => {
      const { address } = route.params;


    var response = await fetch(`https://thetamiddleware.herokuapp.com/getAllHash/${address.toString()}&29-9-2020`);
    var resObj = await response.json();
    Alert.alert("All Hashes", JSON.stringify(resObj.length));
    setHashArray(resObj)

    for(var i=0; i<resObj.length; i++)
    {
      var responseTx = await fetch(`https://thetamiddleware.herokuapp.com/getTx/${resObj[i].toString()}`);
    var resObjTx = await responseTx.json();
    var parsed = JSON.parse(resObjTx)
    setTxInfo(txInfo.push(parsed))

    }

    for(var i=0; i<txInfo.length; i++)
    {
    var val = txInfo[i]
    var row=[]
      row.push(val.HR.toString());
      row.push(val.BPM.toString());
      row.push(val.BP.systolic.toString());
      row.push(val.BP.diastolic.toString());
      tableData.push(row)

    }

    setFinished(true)
    Alert.alert(JSON.stringify(tableData))

    })();
  }, []);

  //const state = this.state;
  var tableHead= ['Heart Rate', 'Temp.', 'Syst. BP', 'Dia. BP'];

if(finished === false)
{
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      {/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
        <Rows data={tableData} textStyle={styles.text}/>
      </Table> */}
    </View>
  )
}

else{
  return (
    <View style={styles.container}>
      {/* <Text>Hello</Text> */}
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
        <Rows data={tableData} textStyle={styles.text}/>
      </Table>
    </View>
  )
}



  }

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#141D2B' },
  head: { height: 40, backgroundColor: 'black' },
  text: { margin: 6, color: "white", alignSelf: 'center', }
});
