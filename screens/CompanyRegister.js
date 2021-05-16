import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,

} from 'react-native';


const App = () => {
  //const isDarkMode = useColorScheme() === 'dark';
  const [form, setForm] = useState(
      {
          email:"",
          password:"",
          name:""
      }
  );

  const onChange = (label,text) => {
      console.log(form)
      let state={...form}
      state[label]=text
      setForm(state)
  }

  const onSubmit=()=>{
      //submit
  }

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/logo(2).png")}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 30, fontFamily: "comic_sans" }}>campus</Text>
          <Text style={{ fontSize: 30, fontFamily: "comic_sans" }}>recruit</Text>
        </View>
      </View>

      <KeyboardAvoidingView style={styles.body}>
        <View style={styles.loginCard}>
          <Text style={{ fontSize:20, margin: 10 }}>Company Register</Text>
          <TextInput style={styles.inputContainer}
            label="Name"
            selectionColor="red"
            underlineColor="pink"
            onChangeText={(text) => {onChange("name",text)}}
          />
          <TextInput style={styles.inputContainer}
            label="Email"
            selectionColor="red"
            underlineColor="pink"
            onChangeText={(text) => {onChange("email",text)}}
          />
          <TextInput style={styles.inputContainer}
            label="password"
            selectionColor="red"
            secureTextEntry={true}
            underlineColor="pink"
            onChangeText={(text) => {onChange("password",text)}}
          />
          <Button mode="contained" onPress={()=>{}}>Submit</Button>

        </View>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",

  },
  logo: {
    width: 90,
    height: 90,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    //backgroundColor:"red",
    height: 100,

  },
  body: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 7,
    marginTop: "15%"
  },
  loginCard: {
    backgroundColor: "white",
    padding: 20,
    elevation: 6,
    borderRadius: 20,
    borderColor: "violet",
    borderWidth: 2,
    maxWidth: "95%",
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  inputContainer: {
    width: 230,
    maxWidth: "100%",
    maxHeight: 60,
    margin: 5
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "grey"
  },

});

export default App;