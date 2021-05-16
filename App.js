/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { DefaultTheme,Provider as PaperProvider, TextInput } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Login from './screens/Login'
import CompanyRegister from './screens/CompanyRegister'
import StudentRegister from './screens/StudentRegister'
import JobOverview from './screens/student/JobOverview'

const Drawer=createDrawerNavigator();

const theme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary:'violet'
  }
}




const App = () => {
 //const isDarkMode = useColorScheme() === 'dark';


  return (
    <PaperProvider theme={theme}>
      
     {/* <Login/><CompanyRegister/> <StudentRegister/><JobOverview/>*/}
     <Drawer.Navigator>
       
     </Drawer.Navigator>
    
    </PaperProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
