import React from 'react'
import {Text,Drawer,Divider} from 'react-native-paper'
import {View,StyleSheet, Image} from 'react-native'

export default ({navigation})=>{
   
    return (
    <View style={{ flex:1, alignItems: 'center', justifyContent: "space-between" }}>
      <View style={{width:"100%"}}>
      <Drawer.Section style={styles.section}>
      <View style={styles.header}>
          <Image style={styles.logo} source={require("../../assets/logo(2).png")}/>
          <Text style={{ fontSize: 30, fontFamily: "comic_sans" }}>campus</Text>
          <Text style={{ fontSize: 30, fontFamily: "comic_sans" }}>recruit</Text>
      </View>
      </Drawer.Section>
      <Drawer.Section style={styles.section}>
          <Drawer.Item icon="account" label="Profile" onPress={()=>{navigation.navigate("Home",{screen:"Profile"})}} active={true} />
          <Drawer.Item icon="account-plus" label="Add Job" onPress={()=>{navigation.navigate("AddJob")}}/>
          <Drawer.Item icon="briefcase" label="Jobs" onPress={()=>{navigation.navigate("Jobs",{type:"job"})}}/>
          <Drawer.Item icon="laptop" label="Internships" onPress={()=>{navigation.navigate("Jobs",{type:"internship"})}}/>
          <Drawer.Item icon="book" label="Training programs" onPress={()=>{navigation.navigate("Jobs",{type:"training"})}}/>
      </Drawer.Section>
      </View>
      <Drawer.Section style={styles.section}>
          <Drawer.Item icon="logout" label="Log out"/>
      </Drawer.Section>
    </View>
    );
}

const styles=new StyleSheet.create({
    header:{
        width:"100%",
        padding:10,
        paddingTop:30,
        alignItems:"center",
        flexDirection:"column",
        backgroundColor:"orange"
    },
    logo:{
        width:110,
        height:110
    },
    section:{
        width:"100%"
    }
})