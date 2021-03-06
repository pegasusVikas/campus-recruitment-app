import React from 'react';
import {  Button,Card, Avatar, IconButton, Chip } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import config from '../../config';
import { setLoading } from '../../store/action/loading';
import { useDispatch } from 'react-redux';



const App = ({item,navigation}) => {
  //const isDarkMode = useColorScheme() === 'dark';
  //const {uri,title,subtitle,date,salary,type} =item
  const {_id,title,_companyId,deadline,salary,type,qualified,applicants} =item
  const subtitle=_companyId.companyName
  const shortlisted = qualified.length
  const applied = applicants.length
  
  /*uri="https://img-authors.flaticon.com/google.jpg"
  title="Web Development SDE"
  subtitle="Google"
  salary=12.3
  type="JOB"
  date=new Date()*/
  const onPress =()=>{
    const bool=true
    //dispatch(setLoading("sss"))
    navigation.push("common",{screen:"details",params:{job:item,screen:item?.title}})
  }

  const pfp=()=>{
    return (
        <Avatar.Image size={40} source={{uri:config.url+"/api/file/profile/"+_companyId._id}}/>
    );
  }
  return (
    <Card style={{marginVertical:2}}>
        <Card.Title title={title} subtitle={subtitle} left={pfp}  />
        <Card.Content style={{flexDirection:"row",justifyContent:"space-between"}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
            <IconButton size={20} color="green" icon="cash"/>
            <Text>{"₹"+salary+"/LPA"}</Text>
        </View>
        <View style={{alignItems:"center"}}>
            <Text style={{fontSize:10}}>apply by</Text>
        <View style={{flexDirection:"row",alignItems:"center",margin:0,padding:0}}>
            <IconButton size={15} icon="calendar-blank"/>
            <Text>{new Date(deadline).toDateString()}</Text>
        </View>
        </View>
        </Card.Content>
        <Card.Content style={{flexDirection:"row",justifyContent:"space-between",marginTop:4}}>
         <Chip>{type}</Chip>
         <Button mode="contained" onPress={onPress}>View</Button>
        </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({});

export default App;