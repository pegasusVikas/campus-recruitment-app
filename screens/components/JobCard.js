import React from 'react';
import {  Button,Card, Avatar, IconButton, Chip } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';



const App = ({uri,title,subtitle,salary,date,type}) => {
  //const isDarkMode = useColorScheme() === 'dark';

  /*uri="https://img-authors.flaticon.com/google.jpg"
  title="Web Development SDE"
  subtitle="Google"
  salary=12.3
  type="JOB"
  date=new Date()*/
  date=date.toDateString()
  const pfp=()=>{
    return (
        <Avatar.Image size={40} source={{uri:uri}}/>
    );
  }

  return (
    <Card>
        <Card.Title title={title} subtitle={subtitle} left={pfp} />
        <Card.Content style={{flexDirection:"row",justifyContent:"space-between"}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
            <IconButton size={20} color="green" icon="cash"/>
            <Text>{"₹"+salary+"/LPA"}</Text>
        </View>
        <View style={{alignItems:"center"}}>
            <Text style={{fontSize:10}}>apply by</Text>
        <View style={{flexDirection:"row",alignItems:"center",margin:0,padding:0}}>
            <IconButton size={15} icon="calendar-blank"/>
            <Text>{date}</Text>
        </View>
        </View>
        </Card.Content>
        <Card.Content style={{flexDirection:"row",justifyContent:"space-between",marginTop:4}}>
         <Chip>{type}</Chip>
         <Button mode="contained">Apply</Button>
        </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({});

export default App;