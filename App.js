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
import {createStackNavigator} from '@react-navigation/stack'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {combineReducers,createStore} from 'redux'
import {Provider} from 'react-redux'

import StudentProfileReducer from './store/reducer/studentProfile'

import Login from './screens/Login'
import CompanyRegister from './screens/CompanyRegister'
import StudentRegister from './screens/StudentRegister'
import JobOverview from './screens/student/JobOverview'
import StudentDrawer from './screens/student/DrawerNavigator'
import StudentProfile from './screens/student/Profile'
import CompanyProfile from './screens/company/Profile'
import Search from "./screens/Search"
import JobDetails from "./screens/company/Job"
import AddJob from "./screens/company/AddJob"

const Drawer=createDrawerNavigator();
const RootStack =createStackNavigator();
const CommonStack=createStackNavigator();

const reducer=combineReducers({
  studentProfile:StudentProfileReducer
})

const store=createStore(reducer);

const theme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary:'violet'
  }
}

const CommonNavigator=()=>{
  return(
    <CommonStack.Navigator >
        <CommonStack.Screen name="Search" options={(props)=>{
          console.log(props)
          let screen=props.route.params['screen']||'students'
          
          return {
            headerTitle:screen
          }
          
        }} component={Search}/>
        <CommonStack.Screen name="details" component={JobDetails}/>
    </CommonStack.Navigator>
  );
}

const StudentNavigator=(props)=>{
  return (
    <Drawer.Navigator drawerContent={(props) => <StudentDrawer {...props}/>}>
      <Drawer.Screen name="Profile" component={Login} />
      <Drawer.Screen name="Jobs" component={AddJob} />
    </Drawer.Navigator>
  );
}

const App = () => {
 //const isDarkMode = useColorScheme() === 'dark';


  return (
    <Provider store={store}>
    <PaperProvider theme={theme}>
     {/* <Login/><CompanyRegister/> <StudentRegister/><JobOverview/>*/}
     <NavigationContainer>
       <RootStack.Navigator headerMode="none">
         <RootStack.Screen name="Home" component={StudentNavigator}/>
         <RootStack.Screen name="common" component={CommonNavigator}/>
         <RootStack.Screen name="Comp" component={CompanyRegister} />
         <RootStack.Screen name="Stud" component={StudentRegister} />
     </RootStack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
});

export default App;
