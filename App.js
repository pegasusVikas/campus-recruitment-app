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
import StudentDrawer from './screens/student/DrawerNavigator'
import Profile from './screens/student/Profile'

const Drawer=createDrawerNavigator();

const theme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary:'violet'
  }
}

function DrawerContent() {
  return (
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Drawer content</Text>
    </View>
  );
}
function HomeScreen(props) {
  return (
    <Profile {...props} screen="main"/>
  );
}

const StudentNavigator=()=>{
  return (
    <Drawer.Navigator drawerContent={(props) => <StudentDrawer {...props}/>}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Comp" component={CompanyRegister} />
      <Drawer.Screen name="Stud" component={StudentRegister} />
    </Drawer.Navigator>
  );
}

const App = () => {
 //const isDarkMode = useColorScheme() === 'dark';


  return (
    <PaperProvider theme={theme}>
     {/* <Login/><CompanyRegister/> <StudentRegister/><JobOverview/>*/}
     <NavigationContainer>
     <StudentNavigator/>
    </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
