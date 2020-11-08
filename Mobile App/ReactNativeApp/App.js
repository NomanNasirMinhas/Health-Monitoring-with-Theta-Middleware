import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from './shared/header';

import Welcome from './components/Welcome';
import qrScanner from './components/qrScanner';
import Profile from './components/Profile';
import Readings from './components/Readings';
import History from './components/Histroy';
import Notifications from './components/Notifications'
import Prescriptions from './components/Prescription'


function DetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const Stack = createStackNavigator();


function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
        name="ThetaMiddleware"
        component={Welcome}
        options={{
          title: 'Patient Monitoring App',
          headerTitleAlign:'center',
          backgroundColor: '#019490',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#154360',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            alignItems: 'center'
          },
        }} />

        <Stack.Screen
        name="qrScanner"
        component={qrScanner}
        options={{
          title: 'Scan QR to Login',
          backgroundColor: '#019490',
          headerStyle: {
            backgroundColor: '#154360',
          },
          headerTitleAlign:'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          },
        }}
         />

        <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Patients Profile',
          headerLeft:null,
          headerTitleAlign:'center',
          backgroundColor: '#019490',

          headerStyle: {
            backgroundColor: '#154360',
            height:70
          },

          headerTintColor: '#fff',
          headerShown:false,
          headerTitleStyle: {
            color: 'white',
            fontSize:28,
            fontWeight: '700',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          },
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Logout"
              color="#fff"
            />
          ),
        }} />

        <Stack.Screen
        name="Readings"
        component={Readings}
        options={{
          title: 'Patient Vital Readings',
          headerTitleAlign:'center',
          backgroundColor: '#019490',
          headerStyle: {
            backgroundColor: '#154360',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          },
        }} />

<Stack.Screen
        name="History"
        component={History}
        options={{
          title: 'Patient Readings History',
          headerShown:false,
          headerTitleAlign:'center',
          backgroundColor: '#019490',
          headerStyle: {
            backgroundColor: '#154360',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          },
        }} />

<Stack.Screen
        name="Prescriptions"
        component={Prescriptions}
        options={{
          title: 'Patient Prescriptions',
          headerShown:false,
          headerTitleAlign:'center',
          backgroundColor: '#019490',
          headerStyle: {
            backgroundColor: '#154360',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          },
        }} />

<Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notifications from Doctor',
          headerShown:false,
          headerTitleAlign:'center',
          backgroundColor: '#019490',
          headerStyle: {
            backgroundColor: '#154360',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          },
        }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

