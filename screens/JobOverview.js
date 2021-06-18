import React, { useState ,useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator} from 'react-native-paper';
import JobCard from '../screens/components/JobCard'
import {
    StyleSheet,
    View,
    FlatList,
    SafeAreaView
} from 'react-native';
import { fetchJobArray } from '../store/action/job';





const App = ({navigation,route:{params}}) => {

    const dispatch = useDispatch();
    const loading =useSelector(state=>state.loading)
    const _id =useSelector(state=>state.profile._id)
    let jobs =[]
    jobs=useSelector(state=>state.job.jobs)     
    
    
    
    useEffect(()=>{
        dispatch(fetchJobArray(params.jobs))
    },[])

    return (
        <>
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