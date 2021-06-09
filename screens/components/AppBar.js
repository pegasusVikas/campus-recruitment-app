import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';

const MyComponent = ({navigation}) => (
 <Appbar style={{backgroundColor:"white"}}>
    <View>
   <Appbar.Action
     icon="menu"
     onPress={() => navigation.openDrawer()}
    />
    </View>
    <View style={{flex:5}}/>
    <View>
        <Image style={styles.logo} source={require("../../assets/logo(2).png")}/>
    </View>
    <View style={{flex:6}}/>
  </Appbar>
 );

export default MyComponent

const styles = StyleSheet.create({
 
  body:{
      width:"100%",
      alignItems:"center",
      justifyContent:"center",
  },
  logo:{
    width:40,
    height:40
  }
});