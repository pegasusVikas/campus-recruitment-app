import * as React from 'react';
import { Appbar,Caption,Headline,Text, TextInput, Title } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppBar from "../components/AppBar"

export default (props) => {
 return(
 <>
 <AppBar {...props}/>
 <ScrollView contentContainerStyle={styles.screen}>
     <Headline style={{marginTop:20}}>Post an Offer</Headline>
     <Caption>Add a Job, Internship or Training program</Caption>
     <View style={styles.form}>
     <TextInput label="Title" mode="outlined" style={styles.inputContainer}/>
     <TextInput label="Salary" keyboardType="number-pad" mode="outlined" style={{...styles.inputContainer,width:100}} right={<TextInput.Affix text="LPA"/>}/>
     <TextInput label="Description" multiline={true} numberOfLines={10} mode="flat" style={{...styles.inputContainer,maxHeight:150}}/>
     <TextInput label="Name" mode="outlined" style={styles.inputContainer}/>
     </View>
 </ScrollView>
 </>
 );
 }

const styles = StyleSheet.create({
 screen:{
     alignItems:"center",
     backgroundColor:"white",
     flex:1
 },
 form:{
    alignItems:"center",
    elevation:10,
    backgroundColor:"white",
    padding:20,
    marginVertical:10,
    borderRadius:20
 },
 inputContainer: {
    width: 230,
    maxWidth: "100%",
    maxHeight: 60,
    margin: 10
  }
 
});