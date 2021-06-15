/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import Login from '../screens/Login'
import CompanyRegister from '../screens/CompanyRegister'
import StudentRegister from '../screens/StudentRegister'
import JobOverview from '../screens/student/JobOverview'
import StudentDrawer from '../screens/student/DrawerNavigator'
import StudentProfile from '../screens/student/Profile'
import CompanyProfile from '../screens/company/Profile'
import Search from "../screens/Search"
import JobDetails from "../screens/company/Job"
import AddJob from "../screens/company/AddJob"

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();
const CommonStack = createStackNavigator();

const CommonNavigator = () => {
    return (
        <CommonStack.Navigator >
            <CommonStack.Screen name="details" component={JobDetails} />
            <CommonStack.Screen name="Search" options={(props) => {
                console.log(props)
                let screen = props.route.params['screen'] || 'students'

                return {
                    headerTitle: screen
                }

            }} component={Search} />
            
        </CommonStack.Navigator>
    );
}

const StudentNavigator = (props) => {
    return (
        <Drawer.Navigator drawerContent={(props) => <StudentDrawer {...props} />}>
            <Drawer.Screen name="AddJob" component={AddJob} />
            <Drawer.Screen name="Profile" component={StudentProfile} />
            <Drawer.Screen name="Jobs" component={JobOverview} />
        </Drawer.Navigator>
    );
}

const App = () => {
    const profile = useSelector(state => state.profile);
    console.log(profile)
    return (
        <NavigationContainer>
            <RootStack.Navigator headerMode="none">
            {profile.role == "student" && <RootStack.Screen name="Home" component={StudentNavigator} />}
                {profile._id
                    ? 
                    <RootStack.Screen name="common" component={CommonNavigator} />
                    :
                    <>
                        <RootStack.Screen name="login" component={Login}/>
                        <RootStack.Screen name="CompanyRegister" component={CompanyRegister} />
                        <RootStack.Screen name="StudentRegister" component={StudentRegister} />
                    </>
                }
                
            </RootStack.Navigator>
        </NavigationContainer>

    );
};

const styles = StyleSheet.create({
});

export default App;
