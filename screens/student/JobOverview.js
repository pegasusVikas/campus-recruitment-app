import React, { useState ,useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator} from 'react-native-paper';
import JobCard from '../components/JobCardCompany'
import AppBar from '../components/AppBar'
import {
    StyleSheet,
    View,
    FlatList,
    SafeAreaView
} from 'react-native';
import { getJob,getInternship,getTraining, getCurrentJob } from '../../store/action/job';





const App = ({navigation,route}) => {

    const dispatch = useDispatch();
    const loading =useSelector(state=>state.loading)
    const _id =useSelector(state=>state.profile._id)
    let jobs =[]
    if(route.params.type=="job")jobs=useSelector(state=>state.job.jobs)     
    else if(route.params.type=="internship")jobs=useSelector(state=>state.job.internships)
    else if(route.params.type=="training")jobs=useSelector(state=>state.job.trainings)
    
    
    useEffect(()=>{
            dispatch(getCurrentJob(route.params.type))   
    },[route.params])

    return (
        <>
        <AppBar navigation={navigation}/>
        {
            loading?
            <ActivityIndicator animating={true} style={{marginTop:"20%"}} size={"large"}color={"purple"}/>
            :<SafeAreaView styles={{flex:1,}}>
            
            <FlatList
            data={jobs}
            renderItem={(props)=><JobCard {...props} navigation={navigation}/>}
            keyExtractor={(item)=>item._id}
            />
        </SafeAreaView>
        }
        </>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "grey"
    }
});

export default App;